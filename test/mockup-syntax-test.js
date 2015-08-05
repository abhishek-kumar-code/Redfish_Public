var vows = require('vows');
var glob = require('glob');
var join = require('path').join;
var jsonlint = require('jsonlint');
var fs = require('fs');
var assert = require('assert');

var files = glob.sync(join('mockups', 'development', '**', 'index.json'));
var suite = {};

files.forEach(function(file) {
  suite[file] = {
    topic: function() { fs.readFile(file, 'utf-8', this.callback) },
    'is valid JSON': function(err, txt) {
      try {
        jsonlint.parse(txt);
      } catch(e) {
        assert(false, 'Failed to parse\n' + e.message);
      }
    }
  }
})

vows.describe('Development Mockup').addBatch(suite).export(module);
