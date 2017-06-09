'use strict';
var vows = require('vows');
var glob = require('glob');
var jsonlint = require('jsonlint');
var path = require('path');
var fs = require('fs');
var Validator = require('jsonschema').Validator;

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

function isValidSchema(err, txt)
{
    var v = new Validator();
    var schema = JSON.parse(txt.toString());
    var parts = this.context.title.split('/');
    var filename = parts[1];
    v.addSchema(schema, 'http://redfish.dmtf.org/schemas/v1/'+filename);
}

function isCorrectSchemaType(err, txt)
{
    var schema = JSON.parse(txt.toString());
    if(schema['$schema'] === undefined) {
        throw new Error('Missing $schema property!');
    }
    if(this.context.title.indexOf('redfish-schema')) {
        //Don't test redfish-schema files
        return;
    }
    var oldStyle = (this.context.title.indexOf('1.0') !== -1);
    if(!oldStyle && schema['$schema'] !== 'http://redfish.dmtf.org/schemas/v1/redfish-schema.v1_1_0.json') {
        throw new Error('$schema property doesn\'t point to correct redfish schema!');
    }
    else if(oldStyle && schema['$schema'] !== 'http://redfish.dmtf.org/schemas/v1/redfish-schema.1.0.0.json') {
        throw new Error('$schema property doesn\'t point to correct redfish schema!');
    }
}

function testJSONSchema(schema)
{
    var validBatch = {};
    validBatch[schema] = {
      topic: function() {fs.readFile(schema, this.callback);}, 
      'is valid JSON': isValidJSON,
      'is valid schema': isValidSchema,
      'is correct schema type': isCorrectSchemaType
    };
    jsonSuite.addBatch(validBatch);
}

glob.sync('json-schema/*.json').forEach(testJSONSchema);

jsonSuite.export(module);
