var vows = require('vows');
var glob = require('glob');
var path = require('path');
var jsonlint = require('jsonlint');
var fs = require('fs');
var xmljs = require('libxmljs-mt');
var assert = require('assert');
var request = require('request');

var files = glob.sync(path.join('{metadata,mockups}', '**', '*.xml'))
var syntaxBatch = {}, schemaBatch = {};

var ucum = null;

function getUcumXML(callback, context, end)
{
    request('http://unitsofmeasure.org/ucum-essence.xml', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        ucum = xmljs.parseXml(body);
      }
      callback(context, end);
    });
}

function readFile(file, callback)
{
    fs.readFile(file, 'utf-8', callback);
}

files.forEach(function(file) {
  syntaxBatch[file] = {
    topic: function() {
      if(ucum === null)
      {
          getUcumXML(readFile, file, this.callback);
      }
      else
      {
          readFile(file, this.callback);
      }
    },
    'is valid syntax': function(err, txt) {
      xmljs.parseXml(txt);
    },
    'units are valid': function(err, txt) {
      if(this.context.title.indexOf('_v') === -1)
      {
           return;
      }
      var doc = xmljs.parseXml(txt);
      var measures = doc.find('//*[local-name()="Annotation"][@Term="Measures.Unit"]/@String');
      if(measures.length === 0)
      {
          return;
      }
      for(var i = 0; i < measures.length; i++)
      {
          var unitName = measures[i].value();
          var ucumTypes = ucum.get('//*[@Code="'+unitName+'"]');
          if(ucumTypes === undefined)
          {
              prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName[0]+'"]');
              if(prefix !== undefined)
              {
                  var tmp = unitName.substring(1);
                  ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                  if(ucumTypes === undefined)
                  {
                      prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
                      if(prefix !== undefined)
                      {
                          var tmp = unitName.substring(2);
                          ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                      }
                  }
              }
              else
              {
                  prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
                  if(prefix !== undefined)
                  {
                      var tmp = unitName.substring(2);
                      ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                  }
              }
              if(ucumTypes === undefined)
              {
                  throw new Error('Unit name '+unitName+' is not a valid UCUM measure');
              }
          }
      }
    }
  }
})

vows.describe('Metadata')
  .addBatch(syntaxBatch)
  .export(module);
