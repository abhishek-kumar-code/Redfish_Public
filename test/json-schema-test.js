'use strict';
var vows = require('vows');
var glob = require('glob');
var jsonlint = require('jsonlint');
var path = require('path');
var fs = require('fs');

var jsonSuite = vows.describe('JSON');

function isValidJSON(err, txt)
{
    try{
        jsonlint.parse(txt.toString());
    }
    catch(e) {
        throw Error('Invalid JSON!\n' + e.message);
    }
}

function testJSONSchema(schema)
{
    var validBatch = {};
    validBatch[schema] = {topic: function() {fs.readFile(schema, this.callback);}, 'is valid': isValidJSON};
    jsonSuite.addBatch(validBatch);
}

glob.sync('json-schema/*.json').forEach(testJSONSchema);

jsonSuite.export(module);
