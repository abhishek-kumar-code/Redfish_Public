var vows = require('vows');
var glob = require('glob');
var path = require('path');
var jsonlint = require('jsonlint');
var fs = require('fs');
var xmljs = require('libxmljs-mt');
var assert = require('assert');

var files = glob.sync(path.join('{metadata,mockups}', '**', '*.xml'))
var syntaxBatch = {}, schemaBatch = {};

files.forEach(function(file) {
  syntaxBatch[file] = {
    topic: function() {
      fs.readFile(file, 'utf-8', this.callback)
    },
    'is valid syntax': function(err, txt) {
      xmljs.parseXml(txt);
    }
  }
})

vows.describe('Metadata')
  .addBatch(syntaxBatch)
  .export(module);
