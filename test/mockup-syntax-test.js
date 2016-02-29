'use strict';
var vows = require('vows');
var glob = require('glob');
var path = require('path');
var jsonlint = require('jsonlint');
var fs = require('fs');
var assert = require('assert');
var traverse = require('traverse');
var url = require('url');
var jptr = require('json8-pointer');
var fuzzy = require('fuzzy');

var mockupSuite = vows.describe('Mockups');

var LinkProperties = [
  /^@odata\.id$/,
  /^[^@]*@odata\.navigationLink$/,
  /^[^@]*@odata\.nextLink$/
]

function isLink(key) {
  for (var i = 0, llen = LinkProperties.length - 1; i < llen; i++) {
    if (LinkProperties[i].test(key)) return true
  }
}


glob.sync(path.join('mockups', '*/')).forEach(function(mockup) {
  var files = glob.sync(path.join(mockup, '**', 'index.json'));
  var consistencyBatch = {}, syntaxBatch = {};
  var linkToFile = {};
  var fileToJSON = {};

  files.forEach(function(file) {
    var decomp = path.parse(file);

    linkToFile[path2Redfish(decomp.dir)] = file;

    syntaxBatch[file] = {
      topic: function() {
        fs.readFile(file, this.callback);
      },
      'is utf-8 encoded': function(err, txt) {
        var utf8 = txt.toString('utf-8');
        // Exploit the fact illegal byte codes are dropped from the text stream
        // on conversion to detect an invalid file
        assert(txt.equals(new Buffer(utf8, 'utf-8')), 'contains invalid utf-8 byte code');
      },
      'is valid JSON': function(err, txt) {
        try {
          var json = jsonlint.parse(txt.toString());
          fileToJSON[file] = json;
        } catch(e) {
          throw Error('Failed to parse\n' + e.message);
        }
      }
    }

    consistencyBatch[file] = {
      'links are internally consistent': function() {
        var json = fileToJSON[file];
        if (!json) return;

        var walker = traverse(json);

        walker.forEach(function() {
          if (!this.isLeaf) return;

          if (isLink(this.key)) {
            var link = url.parse(this.node);
            var refd = fileToJSON[linkToFile[link.pathname]];

            let errorMsg = 'invalid link in JSON at property /' + this.path.join('/') + ' with value ' + this.node + '. No such file exists in mockup at path.';

            if (!refd) {
              let invalidPath = this.node.replace('/redfish/v1/', mockup).split('/');
              let possible = fuzzy.filter(path.join(...invalidPath), files)
              .map(x => path2Redfish(x.string, true));

              if (possible.length) {
                errorMsg += `\nPerhaps you meant one of:\n${possible.join('\n')}`;
              }
            }

            assert(refd !== undefined, errorMsg);
            if (link.hash) {
              refd = jptr.find(refd, link.hash.slice(1));
              assert(refd !== undefined, 'invalid fragment component in JSON at property /' + this.path.join('/') + ' with fragment value ' + link.hash);
            }
          }
        });
      }
    }
  })

  // vows.describe(mockup.replace(/^[a-z]/i, function(x) { return x.toUpperCase() }) + ' Mockup')
  mockupSuite
    .addBatch(syntaxBatch)
    .addBatch(consistencyBatch)
    // .export(module);
});

mockupSuite.export(module);

function path2Redfish(p, removeIndex) {
  let link = p.split(path.sep).slice(2, removeIndex ? -1 : void 0);
  link.unshift('', 'redfish', 'v1', '');
  return path.normalize(link.join('/'));
}
