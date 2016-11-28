const vows = require('vows');
const glob = require('glob');
const path = require('path');
const xmljs = require('libxmljs-mt');
const assert = require('assert');
const request = require('request');
const CSDL = require('CSDLParser');
const fs = require('fs');
const jsonlint = require('jsonlint');

const PascalRegex = new RegExp('^([A-Z][a-z0-9]*)+$', 'm');

const files = glob.sync(path.join('{metadata,mockups}', '**', '*.xml'));
var mockupFiles = [];
if(process.env.TRAVIS === undefined || process.env.TRAVIS_BRANCH === 'master') {
  mockupFiles = glob.sync(path.join('mockups', '**', 'index.json'));
}
const syntaxBatch = {};
const mockupsCSDL = {};
var options = {useLocal: [path.normalize(__dirname+'/../metadata'), path.normalize(__dirname+'/fixtures')], useNetwork: true};

//Setup a global cache for speed
options.cache = new CSDL.cache(options.useLocal, options.useNetwork);

let ucum = null;
let ucumError = false;

/***************** White lists ******************************/
//Units that don't exist in UCUM
const unitsWhiteList = ['RPM'];
//Enumeration Member names that are non-Pascal Cased
const NonPascalCaseEnumWhiteList = ['iSCSI', 'iQN', 'FC_WWN', 'TX_RX', 'EIA_310', 'string', 'number', 'NVDIMM_N', 
                                    'NVDIMM_F', 'NVDIMM_P', 'DDR4_SDRAM', 'DDR4E_SDRAM', 'LPDDR4_SDRAM', 'DDR3_SDRAM',
                                    'LPDDR3_SDRAM', 'DDR2_SDRAM', 'DDR2_SDRAM_FB_DIMM', 'DDR2_SDRAM_FB_DIMM_PROBE', 
                                    'DDR_SGRAM', 'DDR_SDRAM', 'SO_DIMM', 'Mini_RDIMM', 'Mini_UDIMM', 'SO_RDIMM_72b',
                                    'SO_UDIMM_72b', 'SO_DIMM_16b', 'SO_DIMM_32b', 'TPM1_2', 'TPM2_0', 'TCM1_0'];
//Properties names that are non-Pascal Cased
const NonPascalCasePropertyWhiteList = ['iSCSIBoot'];
/************************************************************/

const setupBatch = {
  'get UCUM file': {
    topic: function() {
      request({url: 'http://unitsofmeasure.org/ucum-essence.xml', timeout: 5000}, this.callback);
    },
    'parse UCUM file': function(error, response, body) {
      if (!error && response.statusCode == 200) {
        ucum = xmljs.parseXml(body);
      }
      else {
        ucumError = true;
      }
    }
  }
}

files.forEach(constructTest);

function constructTest(file) {
  syntaxBatch[file] = {
    topic: function() {
      CSDL.parseMetadataFile(file, options, this.callback);
    },
    'is valid syntax': function(err, csdl) {
      if(err) {
        throw err;
      }
      assert.notEqual(csdl, null);
    },
    'units are valid': validUnitsTest,
    /* The next two tests have a side effect of ensure all explict types are present*/
    'has permission annotations': permissionsCheck,
    'complex types should not have permissions': complexTypesPermissions,
    'descriptions have trailing periods': descriptionPeriodCheck,
    'no empty Schema tags': checkForEmptySchemas,
    'BaseTypes are valid': checkBaseTypes,
    'All Annotation Terms are valid': checkAnnotationTerms,
    'Enum Members are valid names': checkEnumMembers,
    'Properties are Pascal-cased': checkPropertiesPascalCased
  }
}

mockupFiles.forEach(constructMockupTest);

function constructMockupTest(file) {
  mockupsCSDL[file] = {
    topic: function() {
      var txt = fs.readFileSync(file);
      try {
        var json = jsonlint.parse(txt.toString());
        this.callback(null, json);
      }
      catch(e) {
        this.callback(e, null);
      }
    },
    'is Valid JSON': function(err, json) {
      if(err) {
        throw err;
      }
      if(json === null || json === undefined) {
        throw new Error('Unable to parse JSON!');
      }
    },
    'is Valid Type': validCSDLTypeInMockup
  };
}

function validUnitsTest(err, csdl) {
  if(err) {
    return;
  }
  if(ucum === null) {
    process.stderr.write('Skipping units test due to inability to obtain UCUM file...');
    return;
  }
  if(this.context.title.indexOf('_v') === -1) {
    return;
  }
  let measures = CSDL.search(csdl, 'Annotation', 'Measures.Unit');
  if(measures.length === 0) {
    return;
  }
  for(let i = 0; i < measures.length; i++) {
    let unitName = measures[i].String;
    if(unitsWhiteList.indexOf(unitName) !== -1) {
      continue;
    }
    let pos = unitName.indexOf('/s');
    if(pos !== -1) {
      unitName = unitName.substring(0, pos);
    }
    let ucumTypes = ucum.get('//*[@Code="'+unitName+'"]');
    if(ucumTypes === undefined) {
      let prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName[0]+'"]');
      if(prefix !== undefined) {
        let tmp = unitName.substring(1);
        ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
        if(ucumTypes === undefined) {
          prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
          if(prefix !== undefined) {
            tmp = unitName.substring(2);
            ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
          }
        }
      }
      else {
        prefix = ucum.get('//*[local-name()="prefix"][@Code="'+unitName.substring(0,2)+'"]');
        if(prefix !== undefined) {
          let tmp = unitName.substring(2);
          ucumTypes = ucum.get('//*[@Code="'+tmp+'"]');
        }
      }
      if(ucumTypes === undefined) {
        throw new Error('Unit name '+unitName+' is not a valid UCUM measure');
      }
    }
  }
}

function permissionsCheck(err, csdl) {
  if(err) {
    return;
  }
  if(this.context.name.includes('RedfishExtensions_v1.xml')) {
    //Ignore the RedfishExtensions file. It's just about annotations
    return;
  }
  let schemas = CSDL.search(csdl, 'Schema');
  if(schemas.length === 0) {
    return;
  }
  for(let i = 0; i < schemas.length; i++) {
    if(schemas[i]._Name.startsWith('Org.OData') || schemas[i]._Name.startsWith('RedfishExtensions')) {
      continue;
    }
    checkPermissionsInSchema(schemas[i], csdl);
  }
}

function checkPermissionsInSchema(schema, csdl) {
  let properties = CSDL.search(schema, 'Property');
  if(properties.length === 0) {
    return;
  }
  for(let i = 0; i < properties.length; i++) {
    let permissions = CSDL.search(properties[i], 'Annotation', 'OData.Permissions');
    if(permissions.length === 0) {
      let propType = properties[i].Type;
      if(propType.startsWith('Collection(')) {
        propType = propType.substring(11, propType.length-1);
      }
      let type = CSDL.findByType(csdl, propType);
      if(type === null) {
        throw new Error('Unable to locate type "'+propType+'"');
      }
      else {
        if(type.constructor.name !== 'ComplexType') {
          throw new Error('Property '+properties[i].Name+' in Schema '+schema._Name+' of '+propType+' lacks permission!');
        }
      }
    }
  }
}

function complexTypesPermissions(err, csdl) {
  if(err) {
    return;
  }
  if(this.context.name.includes('RedfishExtensions_v1.xml')) {
    //Ignore the RedfishExtensions file. It's just about annotations
    return;
  }
  let schemas = CSDL.search(csdl, 'Schema');
  if(schemas.length === 0) {
    return;
  }
  for(let i = 0; i < schemas.length; i++) {
    if(schemas[i]._Name.startsWith('Org.OData') || schemas[i]._Name.startsWith('RedfishExtensions')) {
      continue;
    }
    checkComplexTypePermissionsInSchema(schemas[i], csdl);
  }
}

function checkComplexTypePermissionsInSchema(schema, csdl) {
  let properties = CSDL.search(schema, 'Property');
  if(properties.length === 0) {
    return;
  }
  for(let i = 0; i < properties.length; i++) {
    let permissions = CSDL.search(properties[i], 'Annotation', 'OData.Permissions');
    if(permissions.length !== 0) {
      let propType = properties[i].Type;
      if(propType.startsWith('Collection(')) {
        propType = propType.substring(11, propType.length-1);
      }
      let type = CSDL.findByType(csdl, propType);
      if(type === null) {
        throw new Error('Unable to locate type "'+propType+'"');
      }
      else {
        if(type.constructor.name === 'ComplexType') {
          throw new Error('Property '+properties[i].Name+' in Schema '+schema._Name+' of '+propType+' has permissions!');
        }
      }
    }
  }
}

function descriptionPeriodCheck(err, csdl) {
  if(err) {
    return;
  }
  let descriptions = CSDL.search(csdl, 'Annotation', 'OData.Description');
  if(descriptions.length !== 0) {
    for(let i = 0; i < descriptions.length; i++) {
      descriptionEndsInPeriod(descriptions[i]);
    }
  }
  let long_descriptions = CSDL.search(csdl, 'Annotation', 'OData.LongDescription');
  if(long_descriptions.length !== 0) {
    for(let i = 0; i < long_descriptions.length; i++) {
      descriptionEndsInPeriod(long_descriptions[i]);
    }
  }
}

function descriptionEndsInPeriod(desc) {
  let str = desc.String;
  if(str.slice(-1) !== '.') {
    throw new Error('"' + str + '" does not end in a period!');
  }
}

function checkForEmptySchemas(err, csdl) {
  if(err) {
    return;
  }
  let schemas = CSDL.search(csdl, 'Schema');
  if(schemas.length === 0) {
    return;
  }
  for(let i = 0; i < schemas.length; i++) {
    if(schemas[i]._Name.startsWith('Org.OData')) {
      continue;
    }
    if(this.context.name.includes('mockups')) {
      continue;
    }
    var properties = Object.keys(schemas[i]).filter(function(value) {
      if(value[0] === '_') {
        return false;
      }
      return true;
    });
    if(properties.length === 0) {
      throw new Error('Schema '+schemas[i]._Name+' is empty!');
    }
    if(properties.length === 1 && schemas[i].Annotations !== undefined) {
      trivialNamespaceCheck(schemas[i]);
    }
  }
}

function trivialNamespaceCheck(schema) {
  if(Object.keys(schema.Annotations).length === 0) {
    throw new Error('Schema '+schema._Name+' lacks Annotations!');
  }
  if(schema.Annotations['OData.Description'] === undefined) {
    throw new Error('Schema '+schema._Name+' lacks OData.Description!');
  }
}

function checkBaseTypes(err, csdl) {
  if(err) {
    return;
  }
  let entityTypes =  CSDL.search(csdl, 'EntityType');
  for(let i = 0; i < entityTypes.length; i++) {
    verifyBaseType(entityTypes[i], csdl);
  }
  let complexTypes =  CSDL.search(csdl, 'ComplexType');
  for(let i = 0; i < complexTypes.length; i++) {
    verifyBaseType(complexTypes[i], csdl);
  }
}

function verifyBaseType(entityType, csdl) {
  if(entityType.BaseType === undefined) {
    /*No base type. This is valid.*/
    return;
  }
  let baseType = CSDL.findByType(csdl, entityType.BaseType);
  if(baseType === null) {
    throw new Error('Unable to locate type "'+entityType.BaseType+'"');
  }
}

function checkAnnotationTerms(err, csdl) {
  if(err) {
    return;
  }
  let annotations = CSDL.search(csdl, 'Annotation');
  for(let i = 0; i < annotations.length; i++) {
    let type = CSDL.findByType(csdl, annotations[i].Name);
    if(type === null) {
      throw new Error('Unable to locate annotation term "'+annotations[i].Name+'"');
    }
  }
}

function checkEnumMembers(err, csdl) {
  if(err) {
    return;
  }
  let enums = CSDL.search(csdl, 'EnumType');
  for(let i = 0; i < enums.length; i++) {
    let keys = Object.keys(enums[i].Members);
    for(let j = 0; j < keys.length; j++) {
      if(keys[j].match(PascalRegex) === null && NonPascalCaseEnumWhiteList.indexOf(keys[j]) === -1) {
        throw new Error('Enum member "'+keys[j]+'" of EnumType '+enums[i].Name+' is invalid!');
      }
    }
  }
}

function checkPropertiesPascalCased(err, csdl) {
  if(err) {
    return;
  }
  let properties = CSDL.search(csdl, 'Property');
  for(let i = 0; i < properties.length; i++) {
    if(properties[i].Name.match(PascalRegex) === null && NonPascalCasePropertyWhiteList.indexOf(properties[i].Name) === -1) {
      throw new Error('Property Name "'+properties[i].Name+'" is not Pascal-cased');
    }
  }
  let navproperties = CSDL.search(csdl, 'NavigationProperty');
  for(let i = 0; i < navproperties.length; i++) {
    if(navproperties[i].Name.match(PascalRegex) === null) {
      throw new Error('Property Name "'+navproperties[i].Name+'" is not Pascal-cased');
    }
  }
}

function validCSDLTypeInMockup(err, json) {
  if(err) {
    return;
  }
  if(this.context.name.includes('$ref') || this.context.name.includes('/ExtErrorResp')) {
    //Ignore the paging file and the external error example
    return;
  }
  if(json['@odata.type'] === undefined) {
    if(json['v1'] !== undefined) {
      /*This is probably a root json, ignore it*/
      return;
    }
    if(json['@odata.context'] === '/redfish/v1/$metadata') {
      /*This is an Odata service doc, ignrore it*/
      return;
    }
    throw new Error('No Type defined!');
  }
  let type = json['@odata.type'].substring(1);
  let CSDLType = CSDL.findByType({_options: options}, type);
  if(CSDLType === null) {
    throw new Error('Could not locate type '+type);
  }
  for(let propName in json) {
    if(propName[0] === '@' || propName === 'Members@odata.count' || propName === 'Members@odata.nextLink') {
      continue;
    }
    let CSDLProperty = CSDLType.Properties[propName];
    if(CSDLProperty === undefined) {
      if(CSDLType.BaseType !== undefined) {
        CSDLProperty = searchInParentTypes(CSDLType, propName);
      }
      if(CSDLProperty === undefined) {
        throw new Error('Unknown property "'+propName+'" in type '+type);
      }
    }
  }
}

function searchInParentTypes(type, propName) {
  /* We do resource a little oddly in that we reference the Abstrct type everywhere that \
   * doesn't have Id, Name, or Description*/
  if(propName === 'Id' || propName === 'Name' || propName === 'Description') {
    type = CSDL.findByType({_options: options}, 'Resource.v1_0_0.Resource');
    return type.Properties[propName];
  }
  //console.log('Searching for "'+propName+'" in ');
  //console.log(type.Properties);
  let parentType = CSDL.findByType({_options: options}, type.BaseType);
  if(parentType.Properties[propName] !== undefined) {
    return parentType.Properties[propName];
  }
  if(parentType.BaseType !== undefined) {
    return searchInParentTypes(parentType, propName);
  }
  return undefined;
}

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason);
});

vows.describe('CSDL').addBatch(setupBatch).addBatch(syntaxBatch).addBatch(mockupsCSDL).export(module);
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
