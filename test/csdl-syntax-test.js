const vows = require('vows');
const glob = require('glob');
const path = require('path');
const xmljs = require('libxmljs-mt');
const assert = require('assert');
const request = require('request');
const CSDL = require('CSDLParser');
const fs = require('fs');
const jsonlint = require('jsonlint');
const published = require('./published_schema');

const PascalRegex = new RegExp('^([A-Z][a-z0-9]*)+$', 'm');

const files = glob.sync(path.join('{metadata,mockups}', '**', '*.xml'));
var mockupFiles = [];
if(process.env.TRAVIS === undefined || process.env.TRAVIS_BRANCH === 'master') {
  mockupFiles = glob.sync(path.join('{mockups,registries}', '**', '*.json'));
}
const syntaxBatch = {};
const mockupsCSDL = {};
var options = {useLocal: [path.normalize(__dirname+'/../metadata'), path.normalize(__dirname+'/fixtures'),
                          path.normalize(__dirname+'/../mockups/public-oem-examples/Contoso.com')],
               useNetwork: true};

//Setup a global cache for speed
options.cache = new CSDL.cache(options.useLocal, options.useNetwork);

let ucum = null;
let ucumError = false;
let publishedSchemas = {};

/***************** White lists ******************************/
//Units that don't exist in UCUM
const unitsWhiteList = ['RPM', 'kWh', 'kVAR'];    // Need to fix UCUM checking so that kWh passes, and need to double check kVAR
//Enumeration Member names that are non-Pascal Cased
const NonPascalCaseEnumWhiteList = ['iSCSI', 'iQN', 'FC_WWN', 'TX_RX', 'EIA_310', 'string', 'number', 'NVDIMM_N', 
                                    'NVDIMM_F', 'NVDIMM_P', 'DDR4_SDRAM', 'DDR4E_SDRAM', 'LPDDR4_SDRAM', 'DDR3_SDRAM',
                                    'LPDDR3_SDRAM', 'DDR2_SDRAM', 'DDR2_SDRAM_FB_DIMM', 'DDR2_SDRAM_FB_DIMM_PROBE', 
                                    'DDR_SGRAM', 'DDR_SDRAM', 'SO_DIMM', 'Mini_RDIMM', 'Mini_UDIMM', 'SO_RDIMM_72b',
                                    'SO_UDIMM_72b', 'SO_DIMM_16b', 'SO_DIMM_32b', 'TPM1_2', 'TPM2_0', 'TCM1_0', 'iWARP'];
//Properties names that are non-Pascal Cased
const NonPascalCasePropertyWhiteList = ['iSCSIBoot'];

const ODataSchemaFileList = [ 'Org.OData.Core.V1.xml', 'Org.OData.Capabilities.V1.xml', 'Org.OData.Measures.V1.xml' ];
const SwordfishSchemaFileList = [ 'HostedStorageServices_v1.xml', 'StorageServiceCollection_v1.xml', 'StorageSystemCollection_v1.xml', 'StorageService_v1.xml' ];
const ContosoSchemaFileList = [ 'ContosoExtensions_v1.xml', 'TurboencabulatorService_v1.xml' ];
const EntityTypesWithNoActions = [ 'ServiceRoot', 'ItemOrCollection', 'Item', 'ReferenceableMember', 'Resource', 'ResourceCollection', 'ActionInfo', 'TurboencabulatorService' ];
const OldRegistries = ['registries/Base.1.0.0.json', 'registries/ResourceEvent.1.0.0.json', 'registries/TaskEvent.1.0.0.json'];
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
  },
  'get Published Schemas': {
    topic: function() {
      published.getPublishedSchemaVersionList('http://redfish.dmtf.org/schemas/v1/', this.callback);
    },
    'store Data': function(err, list) {
      if(list !== null) {
        publishedSchemas = list;
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
    'All References Used': checkReferencesUsed,
    'All EntityType defintions have Actions': entityTypesHaveActions,
    'NavigationProperties for Collections cannot be Nullable': navigationPropNullCheck,
    'All new schemas are one version off published': schemaVersionCheck,
    'All definitions shall include Description and LongDescription annotations': definitionsHaveAnnotations,
    'All namespaces have OwningEntity': schemaOwningEntityCheck
  }
}

mockupFiles.forEach(constructMockupTest);

function constructMockupTest(file) {
  if(OldRegistries.includes(file) || file.includes('explorer_config.json')) {
    return;
  }
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
        else if(ContosoSchemaFileList.indexOf(file_name) !== -1) {
            // These files are for OEM examples and don't need to resolve to anything; they are never published
        }
        else {
            if(directory !== 'http://redfish.dmtf.org/schemas/v1') {
                throw new Error('Reference "'+references[i].Uri+'" does not point to DMTF schema directory');
            }
        }
    }
}

function checkReferencesUsed(err, csdl) {
    if(err) {
        return;
    }

    if(this.context.name.includes('$metadata')) {
      //Skip $metadata docs. They should include everything...
      return;
    }

    let schemas = CSDL.search(csdl, 'Schema');

    let nameSpaceAliases = [];

    // Find all external schema references
    let references = CSDL.search(csdl, 'Reference', undefined, true);
    for(let i = 0; i < references.length; i++) {
        nameSpaceAliases = nameSpaceAliases.concat(Object.keys(references[i].Includes));
    }
    nameSpaceAliases.sort(function (a,b) {
        if(a.length > b.length) {
            return -1;
        }
        else if(b.length > a.length) {
            return 1;
        }
        return a.localeCompare(b);
    });

    for(let i = 0; i < schemas.length; i++) {
        if(nameSpaceAliases.length === 0) {
            break;
        }
        for(let propName in schemas[i]) {
            if(propName === '_Name') {
                continue;
            }
            else if(propName === 'Annotations') {
                nameSpaceAliases = annotationsHaveNamespace(schemas[i].Annotations, nameSpaceAliases);
            }
            else if(propName === 'Service') {
                for(let j = 0; j < nameSpaceAliases.length; j++) {
                    if(schemas[i].Service.Extends.startsWith(nameSpaceAliases[j])) {
                        nameSpaceAliases.splice(j, 1);
                        break;
                    }
                }
            }
            else {
                let entity = schemas[i][propName];
                switch(entity.constructor.name) {
                    case 'EntityType':
                        nameSpaceAliases = entityTypeHasNamespace(entity, nameSpaceAliases);
                        break;
                    case 'EntityContainer':
                        if(entity.Extends !== undefined) {
                          for(let j = 0; j < nameSpaceAliases.length; j++) {
                            if(entity.Extends.startsWith(nameSpaceAliases[j])) {
                              nameSpaceAliases.splice(j, 1);
                              break;
                            }
                          }
                        }
                        break;
                    case 'EnumType':
                        nameSpaceAliases = annotationsHaveNamespace(entity.Annotations, nameSpaceAliases);
                        for(let memberName in entity.Members) {
                           let member = entity.Members[memberName];
                           if(member.Annotations !== undefined) {
                             nameSpaceAliases = annotationsHaveNamespace(member.Annotations, nameSpaceAliases);
                           }
                        }
                        break;
                    case 'ComplexType':
                        nameSpaceAliases = complexTypeHasNamespace(entity, nameSpaceAliases);
                        break;
                    case 'TypeDefinition':
                        nameSpaceAliases = annotationsHaveNamespace(entity.Annotations, nameSpaceAliases);
                        if(entity.UnderlyingType !== undefined) {
                          for(let j = 0; j < nameSpaceAliases.length; j++) {
                            if(entity.UnderlyingType.startsWith(nameSpaceAliases[j])) {
                              nameSpaceAliases.splice(j, 1);
                              break;
                            }
                          }
                        }
                        break;
                    case 'Action':
                        nameSpaceAliases = annotationsHaveNamespace(entity.Annotations, nameSpaceAliases);
                        nameSpaceAliases = propertiesHaveNamespace(entity.Parameters, nameSpaceAliases);
                        if(entity.ReturnType !== null) {
                          for(let j = 0; j < nameSpaceAliases.length; j++) {
                            if(entity.ReturnType.startsWith(nameSpaceAliases[j])) {
                              nameSpaceAliases.splice(j, 1);
                              break;
                            }
                          }
                        }
                        break;
                    case 'Term':
                        nameSpaceAliases = annotationsHaveNamespace(entity.Annotations, nameSpaceAliases);
                        if(entity.Type !== null) {
                          for(let j = 0; j < nameSpaceAliases.length; j++) {
                            if(entity.Type.startsWith(nameSpaceAliases[j])) {
                              nameSpaceAliases.splice(j, 1);
                              break;
                            }
                          }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    if(nameSpaceAliases.length > 0) {
        // TODO: This is a workaround until we process annotations on members
        // within enums (some use Redfish.Deprecated)
        if(nameSpaceAliases.toString() !== 'Redfish') {
            throw new Error('Namespaces '+nameSpaceAliases.toString()+' are unused!');
        }
    }
}

function entityTypeHasNamespace(entityType, nameSpaceAliases) {
    if(entityType.BaseType !== undefined) {
        for(let i = 0; i < nameSpaceAliases.length; i++) {
            if(entityType.BaseType.startsWith(nameSpaceAliases[i])) {
                nameSpaceAliases.splice(i, 1);
                break;
            }
        }
    }
    nameSpaceAliases = annotationsHaveNamespace(entityType.Annotations, nameSpaceAliases);
    nameSpaceAliases = propertiesHaveNamespace(entityType.Properties, nameSpaceAliases);
    return nameSpaceAliases;
}

function complexTypeHasNamespace(complexType, nameSpaceAliases) {
    if(complexType.BaseType !== undefined) {
        for(let i = 0; i < nameSpaceAliases.length; i++) {
            if(complexType.BaseType.startsWith(nameSpaceAliases[i])) {
                nameSpaceAliases.splice(i, 1);
                break;
            }
        }
    }
    nameSpaceAliases = annotationsHaveNamespace(complexType.Annotations, nameSpaceAliases);
    nameSpaceAliases = propertiesHaveNamespace(complexType.Properties, nameSpaceAliases);
    return nameSpaceAliases;
}

function annotationsHaveNamespace(annotations, nameSpaceAliases) {
  if(annotations.length === 0) {
    return nameSpaceAliases;
  }
  let annotationIDs = Object.keys(annotations);
  for(let j = 0; j < annotationIDs.length; j++) {
    for(let k = 0; k < nameSpaceAliases.length; k++) {
      if(annotationIDs[j].startsWith(nameSpaceAliases[k])) {
        nameSpaceAliases.splice(k, 1);
        break;
      }
    }
  }
  return nameSpaceAliases;
}

function propertiesHaveNamespace(props, nameSpaceAliases) {
  let propKeys = Object.keys(props);
  for(let i = 0; i < propKeys.length; i++) {
    let prop = props[propKeys[i]];
    nameSpaceAliases = annotationsHaveNamespace(prop.Annotations, nameSpaceAliases);
    for(let k = 0; k < nameSpaceAliases.length; k++) {
      if(prop.Type.startsWith(nameSpaceAliases[k]) || prop.Type.startsWith('Collection('+nameSpaceAliases[k])) {
        nameSpaceAliases.splice(k, 1);
        break;
      }
    }
  }
  return nameSpaceAliases;
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

function schemaVersionCheck(err, csdl) {
  if(err) {
    return;
  }

  let schemas = CSDL.search(csdl, 'Schema');
  for(let i = 0; i < schemas.length; i++) {
    let schema = schemas[i];
    if(schema._Name.indexOf('.v') === -1) {
      //Unversioned schema skip...
      continue;
    }
    let parts = schema._Name.split('.');
    let publishedEntry = publishedSchemas[parts[0]];
    if(publishedEntry === undefined) {
      //No published schemas of this namespace... Skip...
      continue;
    }
    checkVersionInPublishedList(parts[1], publishedEntry, schema._Name);
  }
}

function checkVersionInPublishedList(version, publishedList, schemaName) {
  let parts = version.split('_');
  if(publishedList[parts[0]] === undefined) {
    //Major version not present... TODO
    throw new Error('Test does not currently handle major version change detected in Schema '+schemaName);
  }
  let major = publishedList[parts[0]];
  if(major[parts[1]] === undefined) {
    //Minor version not present...
    if(parts[2] !== '0') {
      throw new Error('Schema version '+parts[0]+'_'+parts[1]+' is not published, but minor version other than 0 exists in '+schemaName);
    }
    let prevMinor = ((parts[1]*1)-1)+'';
    if(major[prevMinor] === undefined) {
      throw new Error('Schema version '+parts[0]+'_'+parts[1]+' is not published and neither is '+parts[0]+'_'+prevMinor+' in '+schemaName);
    }
    return;
  }
  let minor = major[parts[1]];
  if(minor.indexOf(parts[2]) === -1) {
    let prevMaint = ((parts[2]*1)-1)+'';
    if(minor.indexOf(prevMaint) === -1) {
      throw new Error('Schema version '+parts[0]+'_'+parts[1]+'_'+parts[2]+' is not published and neither is '+parts[0]+'_'+parts[1]+'_'+prevMaint+' in '+schemaName);
    }
  }
}

function definitionsHaveAnnotations(err, csdl) {
  if(err) {
    return;
  }

  let fileName = this.context.name.substring(this.context.name.lastIndexOf('/')+1);
  if(ContosoSchemaFileList.indexOf(fileName) !== -1 || fileName === 'index.xml' || fileName === 'Volume_v1.xml') {
    //Ignore OEM extensions and metadata files
    return;
  }

  let entityTypes = CSDL.search(csdl, 'EntityType');
  for(let i = 0; i < entityTypes.length; i++) {
    let entityType = entityTypes[i];
    if(entityType.Abstract === true) {
      continue;
    }

    typeOrBaseTypesHaveAnnotations(entityType, ['OData.Description', 'OData.LongDescription'], entityType.Name, 'EntityType');
  }

  let complexTypes = CSDL.search(csdl, 'ComplexType');
  for(let i = 0; i < complexTypes.length; i++) {
    let complexType = complexTypes[i];
    if(complexType.Abstract === true) {
      continue;
    }

    typeOrBaseTypesHaveAnnotations(complexType, ['OData.Description', 'OData.LongDescription'], complexType.Name, 'ComplexType');
  }

  let properties = CSDL.search(csdl, 'Property');
  for(let i = 0; i < properties.length; i++) {
    let property = properties[i];
    if(property.Name === "Id" || property.Name === "Name" || property.Name === "Description") {
      // Special case for properties that reference TypeDefinitions; annotations get carried over in these cases, and these ones already have descriptions
      continue;
    }

    typeOrBaseTypesHaveAnnotations(property, ['OData.Description', 'OData.LongDescription'], property.Name, 'Property');
  }

  let navProperties = CSDL.search(csdl, 'NavigationProperty');
  for(let i = 0; i < navProperties.length; i++) {
    let navProperty = navProperties[i];

    typeOrBaseTypesHaveAnnotations(navProperty, ['OData.Description', 'OData.LongDescription'], navProperty.Name, 'NavigationProperty');
  }

  let actions = CSDL.search(csdl, 'Action');
  for(let i = 0; i < actions.length; i++) {
    let action = actions[i];

    typeOrBaseTypesHaveAnnotations(action, ['OData.Description', 'OData.LongDescription'], action.Name, 'Action');
  }

  let parameters = CSDL.search(csdl, 'Parameter');
  for(let i = 0; i < parameters.length; i++) {
    let parameter = parameters[i];
    if(parameter.Type.endsWith('.Actions')) {
      // This is the binding parameter; no descriptions needed since it's not part of the client's payload
      continue;
    }

    typeOrBaseTypesHaveAnnotations(parameter, ['OData.Description', 'OData.LongDescription'], parameter.Name, 'Parameter');
  }
}

function typeOrBaseTypesHaveAnnotations(type, annotations, typeName, typeType) {
  for(let i = 0; i < annotations.length; i++) {
    if(type.Annotations[annotations[i]] === undefined) {
      if(type.BaseType === undefined) {
        throw new Error(typeType+' "'+typeName+'" lacks an '+annotations[i]+' Annotation!');
      }
      let baseType = CSDL.findByType({_options: options}, type.BaseType);
      typeOrBaseTypesHaveAnnotations(baseType, annotations, typeName, typeType);
    }
  }
}

function validCSDLTypeInMockup(err, json) {
  if(err) {
    return;
  }
  if(this.context.name.includes('$ref') || this.context.name.includes('/ExtErrorResp') || this.context.name.includes('/ConstrainedCompositionCapabilities')) {
    //Ignore the paging file and the external error example
    return;
  }
  if(json["$schema"] !== undefined) {
    //Ignore JSON schema files
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
    else if(propName.indexOf('@Redfish.') !== -1) {
      //TODO Check other annotations; for now, just let them pass
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
      let typeLookup = CSDLProperty.Type
      let namespaceIndex = typeLookup.indexOf('.');
      if(namespaceIndex === -1) {
        throw new Error('Cannot get namespace of "' + typeLookup + '"');
      }
      let namespace = typeLookup.substring(0, namespaceIndex);
      if(namespace === '') {
        throw new Error('Cannot get namespace of "' + typeLookup + '"');
      }
      if(namespace === 'Resource' || namespace === 'IPAddresses' || namespace === 'VLanNetworkInterface' || namespace === 'Schedule' || namespace === 'PCIeDevice') {
        let typeNameIndex = typeLookup.lastIndexOf('.');
        if(typeNameIndex === -1) {
          throw new Error('Cannot get type of "' + typeLookup + '"');
        }
        let typeName = typeLookup.substring(typeNameIndex+1);
        if(namespace === '') {
          throw new Error('Cannot get type of "' + typeLookup + '"');
        }
        typeLookup = getLatestTypeVersion(typeLookup, namespace, typeName, 1, 10)
      }
      let propType = CSDL.findByType({_options: options}, typeLookup);
      let propValue = json[propName];
      if(propType === null || propType === undefined) {
        throw new Error('Cannot locate property type '+typeLookup+'.');
      }
      else if(typeof propType === 'string') {
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
          if((propValue['@odata.id'] === undefined) && (propValue['DataSourceUri'] === undefined)) {
            throw new Error('Property "'+propName+'" is an EntityType, but the value does not contain an @odata.id or DataSourceUri!');
          }
        }
      }
    }
  }
}

function getLatestTypeVersion(defaultType, namespace, type, majorVersion, minorVersion) {
  if(minorVersion < 0) {
    return defaultType
  }
  let typeName = namespace + '.v' + majorVersion.toString() + '_' +  minorVersion.toString() + '_0.' + type
  let propType = CSDL.findByType({_options: options}, typeName)
  if(propType === null || propType === undefined) {
    return getLatestTypeVersion(defaultType, namespace, type, majorVersion, minorVersion - 1)
  }
  return typeName
}

function complexTypeCheck(propType, propValue, propName, type) {
  let realType = propType;
  if(propValue['@odata.type'] === undefined) {
    //Need to calculate the odata.type value...
    realType = constructODataType(propType, type);
  }
  else {
    realType = CSDL.findByType({_options: options}, propValue['@odata.type'].substring(1));
  }
  for(let childPropName in propValue) {
    if(childPropName[0] === '@') {
      continue;
    }
    if(childPropName.indexOf('@Redfish.AllowableValues') !== -1) {
      //TODO Make sure all AllowableValues are valid
    }
    else if(childPropName.indexOf('@Redfish.') !== -1) {
      //TODO Check other annotations; for now, just let them pass
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
    case 'Edm.Duration':
      if(typeof propValue !== 'string' && propValue !== null) {
        throw new Error('Property "'+propName+'" is an Edm.Duration, but the value in the mockup is not a valid JSON string.');
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
    let typeLookup = CSDLProperty.Type
    let namespaceIndex = typeLookup.indexOf('.');
    if(namespaceIndex === -1) {
      throw new Error('Cannot get namespace of "' + typeLookup + '"');
    }
    let namespace = typeLookup.substring(0, namespaceIndex);
    if(namespace === '') {
      throw new Error('Cannot get namespace of "' + typeLookup + '"');
    }
    if(namespace === 'Resource' || namespace === 'IPAddresses' || namespace === 'VLanNetworkInterface' || namespace === 'Schedule' || namespace === 'PCIeDevice') {
      let typeNameIndex = typeLookup.lastIndexOf('.');
      if(typeNameIndex === -1) {
        throw new Error('Cannot get type of "' + typeLookup + '"');
      }
      let typeName = typeLookup.substring(typeNameIndex+1);
      if(namespace === '') {
        throw new Error('Cannot get type of "' + typeLookup + '"');
      }
      typeLookup = getLatestTypeVersion(typeLookup, namespace, typeName, 1, 10)
    }
    let propType = CSDL.findByType({_options: options}, typeLookup);
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
      if(propValue['@odata.id'] === undefined && propValue['DataSourceUri'] === undefined && Object.keys(propValue).length > 0) {
        throw new Error('Property "'+propName+'" is an EntityType, but the value does not contain an @odata.id or DataSourceUri!');
      }
    }
  }
}

function validateActions(actions) {
 for(let propName in actions) {
   if(propName === 'Oem') {
     continue;
   }
   if(propName === '@odata.type') {
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

function schemaOwningEntityCheck(err, csdl) {
  if(err) {
    return;
  }

  if(this.context.name.includes('index.xml')) {
    // Ignore the $metadata resource in mockups
    return;
  }

  let schemas = CSDL.search(csdl, 'Schema');
  for(let i = 0; i < schemas.length; i++) {
    let owningEntity = CSDL.search(schemas[i], 'Annotation', 'Redfish.OwningEntity');
    if(owningEntity.length === 0) {
      let owningEntity = CSDL.search(schemas[i], 'Annotation', 'RedfishExtensions.v1_0_0.OwningEntity');
      if(owningEntity.length === 0) {
        throw new Error('Namespace '+schemas[i]._Name+' lacks OwningEntity!');
      }
    }
  }
}

process.on('unhandledRejection', (reason, promise) => {
});

vows.describe('CSDL').addBatch(setupBatch).addBatch(syntaxBatch).addBatch(mockupsCSDL).export(module);
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
