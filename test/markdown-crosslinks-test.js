var vows = require('vows');
var glob = require('glob');
var join = require('path').join;
var jsonlint = require('jsonlint');
var fs = require('fs');
var assert = require('assert');
var execAll = require('./utils').execAll;

var files = glob.sync('*.md');

var suite = {}
files.forEach(function(file) {
  var data = fs.readFileSync(file, 'utf-8')
  var links = execAll(/\[([^\]]+)\]\(#([^\)]+)\)/gm, data);

  var headers = execAll(/^#+\s*(.*)/gm, data) || [];

  var headerAnchors = {}
  for (var header of headers) {
    var id = header[1].trim().toLowerCase().replace(/[^a-z0-9-]/gi, '-').replace(/-+/, '-');
    if (id !== '') headerAnchors[id] = true;
  }

  var ids = execAll(/<a id="([^"]+)">/gim, data) || [];
  for (var header of ids) {
    var id = header[1].trim().toLowerCase();
    headerAnchors[id] = true;
  }

  if (links) {
    var anchorTests = {};

    links.forEach(function(link) {
      var anchor = link[2].toLowerCase();
      var txt = link[1];

      var name = "line " + link.lineNumber + " link with text '" + txt + "'";
      anchorTests[name + ' is valid anchor'] = function() {
        assert(headerAnchors[anchor], 'No header with anchor "' + anchor + '" in document');
        }
    });

    suite[file] = anchorTests;
  }
});

vows.describe('Markdown Internal Cross-References').addBatch(suite).export(module);
