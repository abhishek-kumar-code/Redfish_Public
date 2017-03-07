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

const ODataSchemaFileList = [ 'Org.OData.Core.V1.xml', 'Org.OData.Capabilities.V1.xml', 'Org.OData.Measures.V1.xml' ];
const SwordfishSchemaFileList = [ 'HostedStorageServices_v1.xml','StorageServiceCollection_v1.xml', 'StorageSystemCollection_v1.xml' ];
const EntityTypesWithNoActions = [ 'ServiceRoot', 'Item', 'ReferenceableMember', 'Resource', 'ResourceCollection', 'ActionInfo' ];
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
    'Properties are Pascal-cased': checkPropertiesPascalCased,
    'Reference URIs are valid': checkReferenceUris,
    'All EntityType defintions have Actions': entityTypesHaveActions,
    'NavigationProperties for Collections cannot be Nullable': navigationPropNullCheck
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

function checkReferenceUris(err, csdl) {
    if(err) {
        return;
    }

    // Find all external schema references
    let references = CSDL.search(csdl, 'Reference', undefined, true);

    // Go through each reference
    for(let i = 0; i < references.length; i++) {
        // Find the last / character to break apart the file name from its directory
        let uri_index = references[i].Uri.lastIndexOf('/');
        if(uri_index === -1) {
            // Should never happen; all URIs need to have some / characters
            throw new Error('Reference "'+references[i].Uri+'" does not contain any / characters');
        }

        // Break the string apart
        let file_name = references[i].Uri.substring(uri_index+1);
        if(file_name === '') {
            throw new Error('Reference "'+references[i].Uri+'" has an empty file name');
        }
        let directory = references[i].Uri.substring(0, uri_index);
        if(directory === '') {
            throw new Error('Reference "'+references[i].Uri+'" has an empty directory');
        }

        // Check the directory against what it should be
        if(ODataSchemaFileList.indexOf(file_name) !== -1) {
            if(directory !== 'http://docs.oasis-open.org/odata/odata/v4.0/errata03/csd01/complete/vocabularies') {
                throw new Error('Reference "'+references[i].Uri+'" does not point to OData schema directory');
            }
        }
        else if(SwordfishSchemaFileList.indexOf(file_name) !== -1) {
            if(directory !== 'http://redfish.dmtf.org/schemas/swordfish/v1') {
                throw new Error('Reference "'+references[i].Uri+'" does not point to Swordfish schema directory');
            }
        }
        else {
            if(directory !== 'http://redfish.dmtf.org/schemas/v1') {
                throw new Error('Reference "'+references[i].Uri+'" does not point to DMTF schema directory');
            }
        }
    }
}

function entityTypesHaveActions(err, csdl) {
    if(err) {
        return;
    }

    let entityTypes = CSDL.search(csdl, 'EntityType');
    for(let i = 0; i < entityTypes.length; i++) {
      let entityType = entityTypes[i];
      if(entityType.Properties['Actions'] !== undefined) {
        continue;
      }
      //Exclude collction types...
      if(entityType.BaseType === 'Resource.v1_0_0.ResourceCollection') {
        continue;
      }
      if(EntityTypesWithNoActions.indexOf(entityType.Name) !== -1) {
        continue;
      }
      let sameNames = CSDL.search(csdl, 'EntityType', entityType.Name);
      if(sameNames.length > 1) {
        let found = false;
        for(let j = 0; j < sameNames.length; j++) {
          if(sameNames[j].Properties['Actions'] !== undefined) {
            found = true;
            break;
          }
        }
        if(found) {
          continue;
        }
      }
      throw new Error('Entity Type "'+entityType.Name+'" does not contain an Action');
    }
}

function navigationPropNullCheck(err, csdl) {
    if(err) {
        return;
    }

    let navProps = CSDL.search(csdl, 'NavigationProperty');
    for(let i = 0; i < navProps.length; i++) {
      let navProp = navProps[i];
      if(navProp.Type.startsWith('Collection(') && navProp.Nullable !== undefined) {
        throw new Error('NavigationProperty "'+navProp.Name+'" is Nullable and should not be!');
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
    let CSDLProperty = getCSDLProperty(propName, CSDLType);
    if(CSDLProperty === undefined) {
      throw new Error('Unknown property "'+propName+'" in type '+type);
    }
    if(CSDLProperty.Type.startsWith('Collection(')) {
      if(!Array.isArray(json[propName])) {
        throw new Error('Property "'+propName+'" is a collection, but the value in the mockup is not a valid JSON array.');
      }
    }
    else {
      let propType = CSDL.findByType({_options: options}, CSDLProperty.Type);
      let propValue = json[propName];
      if(typeof propType === 'string') {
        simpleTypeCheck(propType, propValue, CSDLProperty, propName);
      }
      else {
        if(propType.constructor.name === 'EnumType') {
          enumTypeCheck(propType, propValue, CSDLProperty, propName);
        }
        else if(propType.constructor.name === 'TypeDefinition') {
          simpleTypeCheck(propType.UnderlyingType, propValue, CSDLProperty, propName)
        }
        else if(propType.constructor.name === 'ComplexType') {
          if(typeof propValue !== 'object') {
            throw new Error('Property "'+propName+'" is a ComplexType, but the value in the mockup is not a valid JSON object.');
          }
          //Ignore Oem and Actions types...
          if(propType.Name === 'Actions') {
            validateActions(propValue);
          }
          else if(propType.Name !== 'Oem') {
            complexTypeCheck(propType, propValue, propName, type);
          }
        }
        else if(propType.constructor.name === 'EntityType') {
          if(typeof propValue !== 'object') {
            throw new Error('Property "'+propName+'" is an EntityType, but the value in the mockup is not a valid JSON object.');
          }
          //This should be a NavigationProperty pointing to an EntityType, make sure it is a link...
          if(propValue['@odata.id'] === undefined) {
            throw new Error('Property "'+propName+'" is an EntityType, but the value does not contain an @odata.id!');
          }
        }
      }
    }
  }
}

function complexTypeCheck(propType, propValue, propName, type) {
  let realType = propType;
  if(propValue['@odata.type'] === undefined) {
    //Need to calculate the odata.type value...
    realType = constructODataType(propType, type);
  }
  else {
    realType = CSDL.findByType({_options: options}, propValue['@odata.type']);
  }
  for(let childPropName in propValue) {
    if(childPropName[0] === '@') {
      continue;
    }
    if(childPropName.indexOf('@Redfish.AllowableValues') !== -1) {
      //TODO Make sure all AllowableValues are valid
    }
    else {
      checkProperty(childPropName, realType, propValue[childPropName], type, propName);
    }
  }
}

function getNextLowerVersion(version) {
  let versionParts = version.split('_');
  if(versionParts[2] === '0') {
    if(versionParts[1] === '0') {
      return 'v1_0_0';
    }
    else {
      versionParts[1] = ((versionParts[1]*1)-1)+'';
    }
  }
  else {
    versionParts[2] = ((versionParts[2]*1)-1)+'';
  }
  return versionParts.join('_');
}

function constructODataType(propType, type) {
  let index = type.lastIndexOf('.');
  if(index === -1) {
    throw new Error('');
  }
  let parentNamespace = type.substring(0, index);
  if(parentNamespace === '') {
    throw new Error('');
  }
  //console.log('Searching for '+parentNamespace+'.'+propType.Name);
  let testType = CSDL.findByType({_options: options}, parentNamespace+'.'+propType.Name);
  if(testType !== null && testType !== undefined) {
    return testType;
  }
  index = parentNamespace.lastIndexOf('.');
  let version = parentNamespace.substring(index+1);
  if(version === 'v1_0_0') {
    return propType;
  }
  parentNamespace = parentNamespace.substring(0, index);
  //console.log('About to search in '+parentNamespace+'.'+getNextLowerVersion(version));
  return constructODataType(propType, parentNamespace+'.'+getNextLowerVersion(version)+'.');
}

function simpleTypeCheck(propType, propValue, CSDLProperty, propName) {
  switch(propType) {
    case 'Edm.Boolean':
      if(typeof propValue !== 'boolean' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.Boolean, but the value in the mockup is not a valid JSON boolean.');
      }
      break;
    case 'Edm.DateTimeOffset':
      if(typeof propValue !== 'string' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.DateTimeOffset, but the value in the mockup is not a valid JSON string.');
      }
      if(propValue.match('[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]') === null) {
        throw new Error('Property "'+propName+'" is an Edm.DateTimeOffset, but the value in the mockup does not conform to the correct syntax.');
      }
      break;
    case 'Edm.Decimal':
    case 'Edm.Double':
      if(typeof propValue !== 'number' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an floating point type, but the value in the mockup is not a valid JSON number.');
      }
      break;
    case 'Edm.Guid':
      if(typeof propValue !== 'string' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.Guid, but the value in the mockup is not a valid JSON string.');
      }
      if(propValue.match('([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})') === null) {
        throw new Error('Property "'+propName+'" is an Edm.Guid, but the value in the mockup does not conform to the correct syntax.');
      }
      break;
    case 'Edm.Int64':
      if(typeof propValue !== 'number' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.Int64, but the value in the mockup is not a valid JSON number.');
      }
      if(!Number.isInteger(propValue) && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.Int64, but the value in the mockup is not an integer.');
      }
      break;
    case 'Edm.String':
      if(typeof propValue !== 'string' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.String, but the value in the mockup is not a valid JSON string.');
      }
      if(CSDLProperty.Annotations['Validation.Pattern']) {
        let regex = CSDLProperty.Annotations['Validation.Pattern'].String;
        if(regex[0] === '/') {
          regex = regex.substring(1);
        }
        if(propValue.match(regex) === null) {
          throw new Error('Property "'+propName+'" is an Edm.String, but the value in the mockup does not match the pattern.');
        }
      }
      break;
    default:
      throw new Error('Property "'+propName+'" is type "'+propType+'" which is not allowed by the Redfish spec.');
  }
}

function enumTypeCheck(propType, propValue, CSDLProperty, propName) {
  if(typeof propValue !== 'string' && propValue !== null) {
    throw new Error('Property "'+propName+'" is an EnumType, but the value in the mockup is not a valid JSON string.');
  }
  if(propValue !== null && propType.Members[propValue] === undefined) {
    throw new Error('Property "'+propName+'" is an EnumType, but the value in the mockup "'+propValue+'" is not a valid member of the enum.');
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

function getCSDLProperty(propName, CSDLType) {
  let CSDLProperty = CSDLType.Properties[propName];
  if(CSDLProperty === undefined) {
    if(CSDLType.BaseType !== undefined) {
      CSDLProperty = searchInParentTypes(CSDLType, propName);
    }
  }
  return CSDLProperty;
}

function checkProperty(propName, CSDLType, propValue, parentType, parentPropName) {
  let CSDLProperty = getCSDLProperty(propName, CSDLType);
  if(CSDLProperty === undefined) {
    if((CSDLType.Annotations['OData.AdditionalProperties'] !== undefined && CSDLType.Annotations['OData.AdditionalProperties'].Bool === true) ||
        CSDLType.Annotations['Redfish.DynamicPropertyPatterns'] !== undefined) {
      return;
    }
    else {
      let string = 'Unknown property "'+propName+'" in type '+CSDLType.Name;
      if(parentPropName) {
        string+=' under parent property "'+parentPropName+'"';
      }
      throw new Error(string);
    }
  }
  if(CSDLProperty.Type.startsWith('Collection(')) {
    if(!Array.isArray(propValue)) {
      throw new Error('Property "'+propName+'" is a collection, but the value in the mockup is not a valid JSON array.');
    }
    //TODO do a check for each entry in the array...
  }
  else {
    let propType = CSDL.findByType({_options: options}, CSDLProperty.Type);
    if(typeof propType === 'string') {
      simpleTypeCheck(propType, propValue, CSDLProperty, propName);
    }
    else if(propType.constructor.name === 'EnumType') {
      enumTypeCheck(propType, propValue, CSDLProperty, propName);
    }
    else if(propType.constructor.name === 'TypeDefinition') {
      simpleTypeCheck(propType.UnderlyingType, propValue, CSDLProperty, propName)
    }
    else if(propType.constructor.name === 'ComplexType') {
      if(typeof propValue !== 'object') {
        throw new Error('Property "'+propName+'" is a ComplexType, but the value in the mockup is not a valid JSON object.');
      }
      //Ignore Oem and Actions types...
      if(propType.Name !== 'Oem' && propType.Name !== 'Actions') {
        complexTypeCheck(propType, propValue, propName, parentType);
      }
    }
    else if(propType.constructor.name === 'EntityType') {
      if(Array.isArray(propValue) || typeof propValue !== 'object') {
        throw new Error('Property "'+propName+'" is an EntityType, but the value in the mockup is not a valid JSON object.');
      }
      //This should be a NavigationProperty pointing to an EntityType, make sure it is a link...
      if(propValue['@odata.id'] === undefined && Object.keys(propValue).length > 0) {
        throw new Error('Property "'+propName+'" is an EntityType, but the value does not contain an @odata.id!');
      }
    }
  }
}

function validateActions(actions) {
 for(let propName in actions) {
   if(propName === 'Oem') {
     continue;
   }
   let actionType = CSDL.findByType({_options: options}, propName.substring(1));
   if(actionType === undefined || actionType === null) {
     throw new Error('Action "'+propName+'" is not present in the CSDL');
   }
   if(actionType.constructor.name !== 'Action') {
     throw new Error('Action "'+propName+'" is not an action in the CSDL');
   }
   let action = actions[propName];
   if(action['Target'] !== undefined) {
     throw new Error('Action "'+propName+'" has invalid property "Target"');
   }
 } 
}

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason);
});

vows.describe('CSDL').addBatch(setupBatch).addBatch(syntaxBatch).addBatch(mockupsCSDL).export(module);
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
