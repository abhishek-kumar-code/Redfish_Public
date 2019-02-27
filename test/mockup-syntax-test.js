'use strict';
const vows = require('vows');
const glob = require('glob');
const path = require('path');
const jsonlint = require('jsonlint');
const fs = require('fs');
const assert = require('assert');
const traverse = require('traverse');
const url = require('url');
const jptr = require('json8-pointer');
const fuzzy = require('fuzzy');

const mockupSuite = vows.describe('Mockups');

const LinkProperties = [
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
  const files = glob.sync(path.join(mockup, '**', 'index.json'));
  const consistencyBatch = {}, syntaxBatch = {};
  const linkToFile = {};
  const fileToJSON = {};

  files.forEach(function(file) {
    const decomp = path.parse(file);

    linkToFile[path2Redfish(decomp.dir)] = file;

    syntaxBatch[file] = {
      topic: function() {
        fs.readFile(file, this.callback);
      },
      'is utf-8 encoded': function(err, txt) {
        const utf8 = txt.toString('utf-8');
        // Exploit the fact illegal byte codes are dropped from the text stream
        // on conversion to detect an invalid file
        assert(txt.equals(new Buffer.from(utf8, 'utf-8')), 'contains invalid utf-8 byte code');
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
        const json = fileToJSON[file];
        if (!json) return;

        const walker = traverse(json);

        walker.forEach(function() {
          if (!this.isLeaf) return;

          if (isLink(this.key)) {
            const link = url.parse(this.node);
            let refd = fileToJSON[linkToFile[link.pathname]];

            let errorMsg = 'invalid link in JSON at property /' + this.path.join('/') + ' with value ' + this.node + '. No such file exists in mockup at path.';

            if (!refd) {
              const invalidPath = this.node.replace('/redfish/v1/', mockup).split('/');
              const possible = fuzzy.filter(path.join(...invalidPath), files)
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
  let myP = path.normalize(p);
  const link = myP.split(path.sep).slice(2, removeIndex ? -1 : void 0);
  link.unshift('', 'redfish', 'v1', '');
  //Need unix style pathing...
  return path.posix.normalize(link.join('/'));
}
