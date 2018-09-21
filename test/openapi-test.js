'use strict';
var vows = require('vows');
var glob = require('glob');
var yamllint = require('yaml-lint');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');
var SwaggerParser = require('swagger-parser');

var yamlSuite = vows.describe('YAML');

function isValidYAML(err, txt)
{
    yamllint.lint(txt).then(function() {
    }).catch(function(err) {
      throw Error('Invalid YAML!\n' + err.message);
    });
}

function isValidOpenAPI(err, txt)
{
    let doc = yaml.safeLoad(txt);
    SwaggerParser.validate(doc).then().catch(function(err){
      throw err;
    });
}

function testOpenAPISchema(schema)
{
    var validBatch = {};
    validBatch[schema] = {
      topic: function() {fs.readFile(schema, this.callback);}, 
      'is valid YAML': isValidYAML,
      'is valid OpenAPI': isValidOpenAPI
    };
    yamlSuite.addBatch(validBatch);
}

glob.sync('openapi/*.yaml').forEach(testOpenAPISchema);

yamlSuite.export(module);
