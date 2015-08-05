var vows = require('vows');
var glob = require('glob');
var path = require('path');
var jsonlint = require('jsonlint');
var fs = require('fs');
var assert = require('assert');
var traverse = require('traverse');
var url = require('url');
var jptr = require('json8-pointer');

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
  var syntaxBatch = {}, consistencyBatch = {};
  var linkToFile = {}
  var fileToJSON = {};

  files.forEach(function(file) {
    var decomp = path.parse(file);

    // Get everything after mockups/<type> in path
    var link = decomp.dir.split(path.sep).slice(2)

    // Prepend with /redfish/v1
    link.unshift('', 'redfish', 'v1', '');

    linkToFile[path.normalize(link.join('/'))] = file;

    syntaxBatch[file] = {
      topic: function() {
        var self = this;

        fs.readFile(file, 'utf-8', function(err, txt) {
          try {
            var json = jsonlint.parse(txt);
            fileToJSON[file] = json;
            self.callback(null, json);
          } catch(e) {
            self.callback('Failed to parse\n' + e.message);
          }
        });
      },
      'is valid JSON': function(err, json) {
        assert.isNull(err);
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

            assert(refd !== undefined, 'invalid link at path /' + this.path.join('/') + ' with content ' + this.node + '. No such file exists at path.');
            if (link.hash) {
              refd = jptr.find(refd, link.hash.slice(1));
              assert(refd !== undefined, 'invalid fragment component at path /' + this.path.join('/') + ' with content ' + link.hash);
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
