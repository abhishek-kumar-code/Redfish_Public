const vows = require('vows');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const xmljs = require('libxmljs-mt');
const assert = require('assert');
const request = require('request');

const files = glob.sync(path.join('{metadata,mockups}', '**', '*.xml'))
const syntaxBatch = {}, schemaBatch = {};

let ucum = null;
let ucumError = false;
const unitsWhiteList = ['RPM'];
//This does not contain a full CSDL parser. This whitelist lists complex types that are utilized across files
const complexTypeWhitelist = ['Resource.Status', 'Resource.Oem', 'Resource.v1_1_0.Location',
                              'Resource.v1_1_0.Identifier', 'VLanNetworkInterface.v1_0_0.VLAN',
                              'Message.Message'];

function getUcumXML(callback, context, end)
{
    request({url: 'http://unitsofmeasure.org/ucum-essence.xml', timeout: 5000}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        ucum = xmljs.parseXml(body);
      }
      else {
          ucumError = true;
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
      if(ucum === null && ucumError === false)
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
      if(ucum === null)
      {
           process.stderr.write('Skipping units test due to inability to obtain UCUM file...');
           return;
      }
      if(this.context.title.indexOf('_v') === -1)
      {
           return;
      }
      let doc = xmljs.parseXml(txt);
      let measures = doc.find('//*[local-name()="Annotation"][@Term="Measures.Unit"]/@String');
      if(measures.length === 0)
      {
          return;
      }
      for(let i = 0; i < measures.length; i++)
      {
          let unitName = measures[i].value();
          if(unitsWhiteList.indexOf(unitName) !== -1)
          {
              continue;
          }
          let pos = unitName.indexOf('/s');
          if(pos !== -1)
          {
              unitName = unitName.substring(0, pos);
          }
          let ucumTypes = ucum.get('//*[@Code="'+unitName+'"]');
          if(ucumTypes === undefined)
          {
              prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName[0]+'"]');
              if(prefix !== undefined)
              {
                  let tmp = unitName.substring(1);
                  ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                  if(ucumTypes === undefined)
                  {
                      prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
                      if(prefix !== undefined)
                      {
                          let tmp = unitName.substring(2);
                          ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                      }
                  }
              }
              else
              {
                  prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
                  if(prefix !== undefined)
                  {
                      let tmp = unitName.substring(2);
                      ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
                  }
              }
              if(ucumTypes === undefined)
              {
                  throw new Error('Unit name '+unitName+' is not a valid UCUM measure');
              }
          }
      }
    },
    'has permission annotations': function(err, txt) {
      if(this.context.name.includes('RedfishExtensions_v1.xml'))
      {
        //Ignore the RedfishExtensions file. It's just about annotations
        return;
      }
      let doc = xmljs.parseXml(txt);
      let properties = doc.find('//*[local-name()="Property"]');
      if(properties.length === 0)
      {
        //No properties are perfectly acceptable
        return;
      }
      for(let i = 0; i < properties.length; i++)
      {
          var property = properties[i];
          var permissions = property.find('*[local-name()="Annotation"][@Term="OData.Permissions"]');
          if(permissions.length === 0)
          {
              var propName = property.attr('Name').value();
              var propType = property.attr('Type').value(); 
              if(propType.startsWith('Collection('))
              {
                propType = propType.substring(11, propType.length-1);
              }
              if(complexTypeWhitelist.indexOf(propType) !== -1)
              {
                continue;
              }
              var propArray = propType.split('.');
              var elemName = propArray[propArray.length - 1];
              let complexTypes = doc.find('//*[local-name()="ComplexType"][@Name="'+elemName+'"]');
              if(complexTypes.length === 0)
              {
                throw new Error('Property '+propName+' of '+propType+' lacks permission!');
              }
          }
      }
    },
    'complex types should not have permissions':  function(err, txt) {
      if(this.context.name.includes('RedfishExtensions_v1.xml'))
      {
        //Ignore the RedfishExtensions file. It's just about annotations
        return;
      }
      let doc = xmljs.parseXml(txt);
      let properties = doc.find('//*[local-name()="Property"]');
      if(properties.length === 0)
      {
        //No properties are perfectly acceptable
        return;
      }
      for(let i = 0; i < properties.length; i++)
      {
        var property = properties[i];
        var permissions = property.find('*[local-name()="Annotation"][@Term="OData.Permissions"]');
        if(permissions.length !== 0)
        {
          var propName = property.attr('Name').value();
          var propType = property.attr('Type').value();
          if(propType.startsWith('Collection('))
          {
            propType = propType.substring(11, propType.length-1);
          }
          if(complexTypeWhitelist.indexOf(propType) !== -1)
          {
            throw new Error('Property '+propName+' of '+propType+' has permission!');
          }
          var propArray = propType.split('.');
          var elemName = propArray[propArray.length - 1];
          let complexTypes = doc.find('//*[local-name()="ComplexType"][@Name="'+elemName+'"]');
          if(complexTypes.length !== 0)
          {
            throw new Error('Property '+propName+' of '+propType+' has permission!');
          }
        }
      }
    },
    'no empty Schema tags': function(err, txt) {
      let doc = xmljs.parseXml(txt);
      let schemas = doc.find('//*[local-name()="Schema"]');
      if(schemas.length === 0)
      {
          //No Schema tags... that's fine
          return;
      }
      for(let i = 0; i < schemas.length; i++)
      {
        let children = schemas[i].childNodes();
        if(children.length === 0)
        {
          var schemaName = schemas[i].attr('Namespace').value();
          throw new Error('Schema '+schemaName+' is empty!');
        }
        children = schemas[i].find('//*[local-name()="Annotation"]');
        if(children.length === 0)
        {
          //$metadata docs don't require this. Let's just skip those.
          if(this.context.name.includes('mockups'))
          {
            continue;
          }
          var schemaName = schemas[i].attr('Namespace').value();
          throw new Error('Schema '+schemaName+' has no Annotations!');
        }
      }
    }
  }
})

vows.describe('Metadata')
  .addBatch(syntaxBatch)
  .export(module);
