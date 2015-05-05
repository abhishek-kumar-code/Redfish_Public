#!/usr/bin/python

#===============================================================================
#
#  CSDL to JSON Convertor
#
#  Copyright (c) Microsoft Corporation
# 
#  Licensed under the Apache License, Version 2.0 (the "License"); you may not 
#  use this file except in compliance with the License. You may obtain a copy 
#  of the License at 
#
#      http://www.apache.org/licenses/LICENSE-2.0 
#
#  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
#  OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY 
#  IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
#  MERCHANTABLITY OR NON-INFRINGEMENT. 
#
#  See the Apache 2 License for the specific language governing permissions 
#  and limitations under the License.
#
#===============================================================================

import cgi
import cgitb
import xml.etree.ElementTree as ET
import Utilities as UT

# Enable the printing of error information
cgitb.enable()
enable_debugging = False

if enable_debugging == True:
    import pdb

###############################################################################
# Name: Scenario                                                              #
# Description:                                                                #
#   Enumeration for various scenarios supported by the JsonSchemaGenerator    #
###############################################################################
from enum import Enum
class Scenario(Enum):
    none = 1
    single_entityType = 2
    multiple_entityTypes = 3
    only_complexTypes = 4
    only_entities_derived_from_refrencableMembers = 5


#########################################################################################################
# Class Name: JsonSchemaGenerator                                                                       #
# Description:                                                                                          #
#  This class to performs conversion of CSDL (XML) schema into JSON schema.                             #
#########################################################################################################
class JsonSchemaGenerator:

    # Static member variables
    schema_version = ''                 # Schema version for which the generation is being done
    parsed = []                         # List of URIs that have been parsed
    current_schema_classname = ''       # Class for which the schema is being generated
    definition_block_contents = []

    #################################################################
    # Name: __init__                                                #
    # Description:                                                  #n
    #   Constructor for JsonSchemaGeneratorUtils class              #
    #################################################################
    def __init__(self, schema_version_value):

        JsonSchemaGenerator.schema_version = schema_version_value

        
    #################################################################################
    # Name: extract_filenamefrom_url                                                #
    # Description:                                                                  #
    #  The method consumes a URL and extracts filename from it. The implementation  #
    #  is tightly bound to the format in which URL is expected.                     #
    #################################################################################
    @staticmethod
    def extract_filenamefrom_url(url):
    
        url_parts = url.rsplit("/", 1)
        return url_parts[-1]

        
    ############################################################################################
    # Name: get_typename_without_namespace                                                     #
    # Description:                                                                             #
    #   The method consumes a typename and returns strips out the namespace name.              #
    #   The name of the type excluding the namespace name is returned back.                    #
    #   The implementation is tightly bound to the format in which the type names are defined. #
    ############################################################################################
    @staticmethod
    def get_typename_without_namespace(fullyqualifiedtypename):
        
        typename_parts = fullyqualifiedtypename.rsplit('.', 1)
        return typename_parts[-1]


    ##############################################################################
    # Name: get_schemaversion_from_typename                                      #
    # Description:                                                               #
    #   Extracts schema version from the typename that is passed in.             #
    ##############################################################################
    @staticmethod
    def get_schemaversion_from_typename(typename):

        version = ''
        # Typename is defined in the following format: Chassis.0.95.0.Chassis
        # Extract the namespace part of the type
        typename_parts = typename.rsplit('.', 1)
        version = JsonSchemaGenerator.get_schemaversion_from_namespace(typename_parts[0])
        return version


    ##############################################################################
    # Name: get_schemaversion_from_namespace                                     #
    # Description:                                                               #
    #  Extracts schema version from the namespace that has been specified.       #
    ##############################################################################
    @staticmethod
    def get_schemaversion_from_namespace(namespace):

        version = ''
        # Namespace is in the following format namespace.0.95.0
        # We look for the first dot. 
        namespace_parts = namespace.split('.', 1);
        version = namespace_parts[-1]
        return version


    ###############################################################################################################
    # Name: extract_underlyingtype_from_collectiontype                                                            #
    # Description:                                                                                                #
    #  Takes name of the collection type and returns the underlying type for which the colleciton was created.    #
    #  Based on the input, the return value might or might not contain the namespace of the underlying type       #
    ###############################################################################################################
    @staticmethod
    def extract_underlyingtype_from_collectiontype(collection_typename, excludenamespace = False):
    
        underlyingtype = collection_typename
        if(collection_typename.startswith("Collection(")):
            underlyingtype = collection_typename[11:]
            underlyingtype = underlyingtype[:-1]

            if excludenamespace == True:
                underlyingtype_parts = underlyingtype.rsplit('.', 1)
                underlyingtype = underlyingtype_parts[-1]

        # Return the processed value. If the typename did not contain "Collection" keywork, it will be returned as-is
        return underlyingtype

    
    ###################################################################################################
    # Name: parse_url                                                                                 #
    # Description:                                                                                    #
    #  Parses the input URL and extracts the filename, namespace and classname from the URL           #
    #  Also reports an error if the URL is not formed correctly.                                      #
    ###################################################################################################
    @staticmethod
    def parse_url(url):

        result = {}
        namespaceStart = -1
        incorrect_url = False
    
        # Look for first # in the URL
        filename_end = url.rfind("#")

        # If there is a # in the url then continue processing else report an error
        if filename_end > 0:
            filename = url[: filename_end]
            result.update({'filename' : filename})

            # Extract prefixURI from the filename
            lastindex = filename.rfind("/")
            prefixuri = filename[:lastindex + 1]
            result.update({'prefixuri' : prefixuri})

            # Using post_filename_string figureout what was passed i.e. typename or namespace.
            post_filename_string = url[filename_end + 1:]

            # Check if there is anything after #
            if len(post_filename_string) > 0:
                
                # Split the string based on dots .
                post_filename_string_list = post_filename_string.split('.')
                
                # If the length of the list is greater than 1 and the last item in the list is not a number then we have a typename else its a namespace
                if( (len(post_filename_string_list) > 1) and ( post_filename_string_list[-1].isdigit() == False )):
                    result.update({'typename' : post_filename_string})
                else:
                    result.update({'namespace' : post_filename_string})                
            else:
                incorrect_url = True

        elif url.endswith("odata"):
            result.update({'generateOdataFile' : "True"})        
        else:
            incorrect_url = True 

        if incorrect_url == True:
            result.update({'error' : 'Incorrect URL - Please specify a URL like:\n 1. http://<filename>#<namespace> or \n 2. http://<filename>#<datatype>\n e.g. http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.Chassis'})

        return result


    ##########################################################################################################
    # Name: geneate_json_files                                                                               #
    # Description:                                                                                           #
    #  Consumes the results that were returned as final output and generates the corresponsing JSON files.   #
    ##########################################################################################################
    @staticmethod
    def geneate_json_files(jsonresults):

        screenoutput = ''
        depth = 0

        # Loop through all the results and 
        for result in jsonresults.keys():                
                    screenoutput += "\nContent-type: application/json\n"
                    # return the JSON result
                    fileoutput  = ''
                    # Insert the starting bracket
                    fileoutput += UT.Utilities.indent(depth) + "{\n"
                    # Add the Schema tag
                    fileoutput += UT.Utilities.indent(depth+1) + "\"$schema\": \"http://schemas.dmtf.org/redfish/v1/redfish-schema.0.96.0\",\n"
                    fileoutput += UT.Utilities.indent(depth+1) + "\"title\": \"" + result + "\",\n"
                    # Fill in the result
                    fileoutput += jsonresults[result]
                    # End starting bracket
                    fileoutput += "\n" + UT.Utilities.indent(depth) + "}\n"
                    screenoutput += fileoutput
                    filename = result + ".json"
                    file = open(filename, "wb")
                    file.write(bytes(fileoutput, 'utf-8'))
                    file.close()
            
        return screenoutput

    #################################################################
    # Name: is_navigation_link                                      #
    # Description:                                                  #
    #  Returns True if it is a navigation link else returns False    #
    #################################################################
    def is_navigation_link(self, typetable, property):

        if not property.attrib["Type"].startswith("Collection("):
            return False

        scalarname = property.attrib["Type"][11:-1]

        if not scalarname in typetable.keys():
            return False

        proptypedata = typetable[scalarname]

        if not proptypedata["TypeType"] == "EntityType":
            return False

        for annotation in property:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            if annotation.attrib["Term"] == "DMTF.ExpandReferences":
                if "Boolean" in annotation.attrib.keys():
                    if annotation.attrib["Boolean"].upper() == "FALSE":
                        return True

                return False

        return True


    ##########################################################################
    # Name: is_required_property                                             # 
    # Description:                                                           #
    #  Returns True if the property being evaulated is a required property.  #
    ##########################################################################
    def is_required_property(self, property):

        for annotation in property:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            if annotation.attrib["Term"] == "DMTF.Required":
                if "Boolean" in annotation.attrib.keys():
                    if annotation.attrib["Boolean"].upper() == "FALSE":
                        break

                return True

        return False


    #####################################################################################
    # Name: get_dynamic_property_patterns_content                                       # 
    # Description:                                                                      #
    #  Parses the contents of the XML and return contents of a dynamic property pattern #
    #####################################################################################
    def get_dynamic_property_patterns_content(self, annotation):
    
        patterncontent = {}
        for collection in annotation:
            for record in collection:
                for propertyvalue in record:
                    patterncontent.update({propertyvalue.attrib["Property"] : propertyvalue.attrib["String"]})

        return patterncontent


    ##########################################################################
    # Name: get_edmtype_to_jsontype                                          # 
    # Description:                                                           #
    #  Takes a type and returns the corresponding json type                  #
    ##########################################################################
    def get_edmtype_to_jsontype(self, inputType):
    
        edmtojson = {
                        "Edm.String": "string",
                        "Edm.Int16": "integer",
                        "Edm.Int32": "integer",
                        "Edm.Int64": "integer",
                        "Edm.Boolean": "boolean",
                        "Edm.Decimal": "string",
                        "Edm.DateTimeOffset": "string"
                    }

        if not inputType in edmtojson:
            return "object"
    
        return edmtojson[inputType]


    ##############################################################################
    # Name: get_scenario                                                         #
    # Description:                                                               #
    #  Define scenarios according to which the code path will be defined.        #
    ##############################################################################
    def get_scenario(self, typetable):
    
        current_scenario = Scenario.none

        # Get entries in the typetable
        typevalues = typetable.values()
        entityTypeCount = 0
        visitedTypes = []
        derived_from_ReferenceableMember = 0
    
        for typevalue in typevalues:
            typetype = typevalue["TypeType"]
            if typetype == "EntityType" and typevalue["IsFromRefUri"] == False :
                try :
                    # If this type has been parsed already do nothing
                    index = visitedTypes.index(typevalue["Name"])
                except :
                    visitedTypes.append(typevalue["Name"])
                    entityTypeCount += 1
                    if typevalue["BaseType"] == "Resource.ReferenceableMember":
                        derived_from_ReferenceableMember += 1

        # Find out what type of scenario is it. Based on this the JSON will be generated.
        if entityTypeCount == 0:
            # If no entity types are there, then only complex types will be present
            current_scenario = Scenario.only_complexTypes

        elif entityTypeCount >=1 and entityTypeCount == derived_from_ReferenceableMember:
            # If CSDL contains only entities which derive from Resource.ReferenceableMember
            current_scenario = Scenario.only_entities_derived_from_refrencableMembers

        elif entityTypeCount == 1:
            # If there is only one entity type, this is the basic scenario
            current_scenario = Scenario.single_entityType

        elif entityTypeCount > 1:
            # If there are more than one entity types, then it needs special handling and will generate two files.
            current_scenario = Scenario.multiple_entityTypes

        return current_scenario
        
    ##############################################################################
    # Name: get_types_for_definition_block                                       #
    # Description:                                                               #
    #  Goes through all the types present in the typetable and extracts types    #
    #  that can be added to definition block                                     #
    ##############################################################################
    @staticmethod
    def get_types_for_definition_block(typetable, namespace):
        definition_block_types = []
        
        # Loop through the data types and capture those which derive from "Resource.ReferenceableMember" and belong to the same namespace 
        typenames = typetable.keys()
        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            currentNamespace = typedata["Namespace"] 

            if typetype == "EntityType" and typedata["BaseType"] == "Resource.ReferenceableMember":
                if(JsonSchemaGenerator.compare_namespaces(currentNamespace, namespace) == True):
                    definition_block_types.append(currentType)

        # Remove duplicate before returning
        definition_block_types = JsonSchemaGenerator.remove_duplicate_types(definition_block_types)
        return definition_block_types

    ##########################################################################################################
    # Name: generate_json_for_file_with_entitytypes                                                          #
    # Description:                                                                                           #
    #  - Generates the output json for the file that contains at least one entity type.                      #
    #  - For the scenario where there are more than one entity types, this method returns a list of outputs. #
    #    Each entry in the list corresponds to an entity type.                                               #
    #  - It also handles the scenario where there are entities but one is used as a sub-type/complex type.   #
    ##########################################################################################################
    def generate_json_for_file_with_entitytypes(self, currentscenario, typetable, depth, isnullable, filename, namespace, unreferenced_types, prefixuri, ignoreannotations = []):

        typenames = typetable.keys()
        output = ''
        outputs = {}
        parsedtypes = []
        effective_unreferenced_types = []
        definition_block_contents = []

        # Loop through all the types defined in the file and generate output
        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            currentNamespace = typedata["Namespace"]
        
            try :
                # If this type has been parsed already do nothing
                index = parsedtypes.index(typedata["Name"] + ":" + currentNamespace)
            except :
                # This type has not been parsed yet
                if ( (namespace == currentNamespace) and (typetype == "EntityType") ):
                        parsedtypes.append(typedata["Name"] + ":" + currentNamespace)
                        
                        # Check if the type being processed is derived from Resource.ReferenceableMember
                        if typedata["BaseType"] != "Resource.ReferenceableMember" or currentscenario == Scenario.only_entities_derived_from_refrencableMembers:
                            JsonSchemaGenerator.current_schema_classname = JsonSchemaGenerator.get_typename_without_namespace(currentType)

                            # If the type is not derived from Resource.Resource or Resource.Resource itself skip adding unreferenced_types
                            if (typedata["BaseType"] == "Resource.Resource") or (typedata["Name"] == "Resource.Resource") or (typedata["Name"] == "Resource"):
                                # Assign the applicable unreferenced types
                                effective_unreferenced_types = unreferenced_types
                                
                                # Now check if there are any other EntityTypes in the same namespace that derive from ReferenceableMember
                                # These EntityTypes will be added to the #definition block which will be a asibling of properties block
                                JsonSchemaGenerator.definition_block_contents = JsonSchemaGenerator.get_types_for_definition_block(typetable, currentNamespace)

                            else:
                                effective_unreferenced_types = []
                                definition_block_contents = []
                            
                            # Generate Json for the type
                            output = self.generate_json_for_type(typetable, currentType, depth, "", effective_unreferenced_types, prefixuri, False, False)
                            
                            # If we found anything that should go into definition block, then generate the block and append it to the type
                            output += self.generate_definition_block(typetable, JsonSchemaGenerator.definition_block_contents, depth, prefixuri)

                            #pdb.set_trace()
                            keyname = JsonSchemaGenerator.current_schema_classname + "." + JsonSchemaGenerator.schema_version
                            outputs[keyname] = output

        return outputs


    ##############################################################################################
    # Name: generate_definition_block                                                            #
    # Description:                                                                               #
    #  Generates the json for definition block                                                   #
    ##############################################################################################
    def generate_definition_block(self, typetable, definition_block_types, depth, prefixuri):
        output = ""

        # If nothing was passed in, nothing should go back
        if not definition_block_types:
            return output
        else:
            output += ",\n"
            output += UT.Utilities.indent(depth)
            output += "\"#definitions\": {\n"
            
            firstitem = True
            # Loop through types that should be in defintion block and add them one by one
            for typename in definition_block_types:

                # If it is the first type just set the flag so that next time we could add a comma
                if firstitem == True:
                    firstitem = False
                else:
                    output += ",\n"
                    
                # Get typename without namespace
                typename_without_namespace = JsonSchemaGenerator.get_typename_without_namespace(typename) 
                # Create the block specific to the type
                output += UT.Utilities.indent(depth + 1) + "\"" + typename_without_namespace + "\":{\n"
                # Generate json for the type
                output += self.generate_json_for_type(typetable, typename, depth+2, "", [], prefixuri, False, False)
                # Close the type block
                output += "\n" + UT.Utilities.indent(depth+1) + "}"
            
            # Close the definitions block
            output += "\n" + UT.Utilities.indent(depth) + "}"

        return output

    ##########################################################################################################
    # Name: generate_json_for_file_with_only_complextypes                                                    #
    # Description:                                                                                           #
    #  Generates the output json for the file that contains only complex types. The file being processed     #
    #  will not have any entity types                                                                        #
    ##########################################################################################################
    def generate_json_for_file_with_only_complextypes(self, typetable, depth, isnullable, filename, namespace, prefixuri, ignoreannotations = []):
    
        typenames = typetable.keys()
        output = ''
        outputs = {}
        parsedtypes = []
        complextype_count = 0
        filename = JsonSchemaGenerator.extract_filenamefrom_url(filename)

        # Start the definitions block
        output += UT.Utilities.indent(depth) + "\"definitions\":{\n"

        # Loop though all the types defined and generate them one by one.
        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            currentNamespace = typedata["Namespace"]
        
            try :
                # If this type has been parsed already do nothing
                index = parsedtypes.index(typedata["Name"] + ":" + currentNamespace)
            except :
                # This type has not been parsed yet. Process it now.
                if (( namespace == currentNamespace) and (typetype == "ComplexType")):
                    # Add comma if this is not the first complex type.
                    if complextype_count > 0:
                        output += ",\n"
                    
                    # Start type definition
                    output += UT.Utilities.indent(depth) + "\"" + typedata["Name"] + "\":{\n"
                
                    # Add it to the list so that it does not get generated again.
                    parsedtypes.append(typedata["Name"] + ":" + currentNamespace)

                    # Generate JSON for the type and append it to the output
                    output += self.generate_json_for_type(typetable, currentType, depth+2, "", [], prefixuri, False, False)
                    output += UT.Utilities.indent(depth) + "\n}"
                    complextype_count += 1
                
        # Close the definitions block
        output += "\n" + UT.Utilities.indent(depth) + "}\n"

        # Put it in a list as the function that will generate file/output on screen expects it to come out as a list.
        outputs = {filename : output}

        return outputs

    
    ##############################################################################
    # Name: generate_json_for_file                                               #
    # Description:                                                               #
    #  Convert all types in given file                                           #
    ##############################################################################
    def generate_json_for_file(self, typetable, depth, isnullable, filename, namespace, unreferenced_types, prefixuri, ignoreannotations = []):

        outputs = {}
    
        # Get the scenario for which the Json is to be generated.
        current_scenario = Scenario.none
        current_scenario = self.get_scenario(typetable)
        
        # If it is the case of no entity types present and only complex types, call into complex type specific implementation
        if( current_scenario == Scenario.only_complexTypes ):
            outputs = self.generate_json_for_file_with_only_complextypes(typetable, depth, isnullable, filename, namespace, prefixuri, ignoreannotations)
        else:
            outputs = self.generate_json_for_file_with_entitytypes(current_scenario, typetable, depth, isnullable, filename, namespace, unreferenced_types, prefixuri, ignoreannotations)

        return outputs


    ##########################################################################
    # Name: emit_annotations                                                 # 
    # Description:                                                           #
    #  Emits annotations that are to be added to JSON                        #
    ##########################################################################
    def emit_annotations(self, typetable, namespace, annotated, depth, prefixuri, isnullable = False, ignoreannotations = []):

        output = ""

        for annotation in annotated:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            if (annotation.attrib["Term"] == "OData.Description") and (not "OData.Description" in ignoreannotations):
                output += ",\n"
                output += UT.Utilities.indent(depth) + "\"description\": \"" + annotation.attrib["String"] + "\""

            elif (annotation.attrib["Term"] == "OData.LongDescription") and (not "OData.Description" in ignoreannotations):
                output += ",\n"
                output += UT.Utilities.indent(depth) + "\"longDescription\": \"" + annotation.attrib["String"] + "\""

            elif annotation.attrib["Term"] == "OData.Permissions":
                if annotation.attrib["EnumMember"] == "OData.Permissions/Read":
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"readonly\": true"
                elif annotation.attrib["EnumMember"] == "OData.Permissions/ReadWrite":
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"readonly\": false"
            elif (annotation.attrib["Term"] == "Validation.Pattern") or (annotation.attrib["Term"] == "DMTF.Pattern"):
                output += ",\n"
                output += UT.Utilities.indent(depth) + "\"pattern\": \"" + annotation.attrib["String"] + "\""
            elif annotation.attrib["Term"] == "DMTF.DynamicPropertyPatterns":
                content = self.get_dynamic_property_patterns_content(annotation)
                output += ",\n"
                output += UT.Utilities.indent(depth) + "\"dynamicPropertyPattern\":{ \n"
                output += UT.Utilities.indent(depth+1) + "\"pattern\":\"" + content["Pattern"] + "\",\n"
                jsontype = self.get_edmtype_to_jsontype(content["Type"])
            
                if jsontype == "object":
                    output += self.generate_json_for_type(typetable, content["Type"], depth + 1, namespace, [], prefixuri, isnullable, False)
                else:
                    output += UT.Utilities.indent(depth+1) + "\"type\":\"" + jsontype + "\"\n"
                output += UT.Utilities.indent(depth) + "}"
                                                        
        return output

    ###################################################################################################
    # Name: get_property_annotation_terms                                                             #
    # Description:                                                                                    #
    #  Extracts Term from the annotations                                                             #
    ###################################################################################################
    def get_property_annotation_terms(self, property):

        result = []

        for annotation in property:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            result.append(annotation.attrib["Term"])

        return result


    #########################################################################################################
    # Name: get_payload_actionentry                                                                         #
    # Description:                                                                                          #
    #  Generates JSON for actions                                                                           #
    #########################################################################################################
    def get_payload_actionentry(self, typetable, actionentry, depth, prefixuri):
        output = ""
        
        propname = "#" + JsonSchemaGenerator.current_schema_classname + "." + actionentry["Name"] 
        output += UT.Utilities.indent(depth)   + "\"" + propname + "\": {\n"
        output += UT.Utilities.indent(depth+1) +     "\"type\": \"object\",\n"
        output += UT.Utilities.indent(depth+1) +     "\"additionalProperties\": false,\n"
        output += UT.Utilities.indent(depth+1) +     "\"properties\": {\n"

        output += UT.Utilities.indent(depth+2) + "\"title\": {\n"
        output += UT.Utilities.indent(depth+3) +     "\"type\": \"string\",\n"
        output += UT.Utilities.indent(depth+3) +     "\"description\": \"Friendly action name\"\n"
        output += UT.Utilities.indent(depth+2) + "},\n"

        output += UT.Utilities.indent(depth+2) + "\"target\": {\n"
        output += UT.Utilities.indent(depth+3) +     "\"type\": \"string\",\n"
        output += UT.Utilities.indent(depth+3) +     "\"description\": \"Link to invoke action\"\n"
        output += UT.Utilities.indent(depth+2) + "}"

        isfirstparam = True
        for param in actionentry["Node"]:
            if not param.tag == "{http://docs.oasis-open.org/odata/ns/edm}Parameter":
                continue

            if isfirstparam:
                isfirstparam = False
                continue

            paramname = param.attrib["Name"]
            paramtype = "Collection(" + param.attrib["Type"] + ")"

            output += ",\n"
            output += UT.Utilities.indent(depth+2) + "\"" + paramname + "@DMTF.AllowableValues" + "\": {\n"
            output += self.generate_json_for_type(typetable, paramtype, depth + 3, actionentry["Namespace"], [], prefixuri, False, False)
            output += self.emit_annotations(typetable, actionentry["Namespace"],  param, depth + 3, prefixuri, False)
            output += "\n"
            output += UT.Utilities.indent(depth+2) + "}"

        output += "\n"
        output += UT.Utilities.indent(depth+1) +     "}\n"
        output += UT.Utilities.indent(depth)   + "}"

        return output


    ################################################################################################################
    # Name: get_json_for_special_properties                                                                        #
    # Description:                                                                                                 #
    #  There are a bunch of properties that need special handling. Such properties are handled by this function.   #
    ################################################################################################################
    def get_json_for_special_properties(self, propertyname, depth, prefixuri):
        output = ""

        # If the prefix URI is not set, set it to a blank string 
        if (prefixuri is None):
            prefixuri = ""
        
        if propertyname == "@odata.context":
            output += UT.Utilities.indent(depth+1) + "\"@odata.context\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "odata.4.0.0.json#context\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

        elif propertyname == "@odata.id":
            output += UT.Utilities.indent(depth+1) + "\"@odata.id\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "odata.4.0.0.json#id\"\n"
            output += UT.Utilities.indent(depth+1) + "}"
            
        elif propertyname == "@odata.type":
            output += UT.Utilities.indent(depth+1) + "\"@odata.type\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "odata.4.0.0.json#type\"\n"
            output += UT.Utilities.indent(depth+1) + "}"
            
        elif propertyname == "Description":
            output += UT.Utilities.indent(depth+1) + "\"Description\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "Resource." + JsonSchemaGenerator.schema_version +".json#Description\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

        elif propertyname == "Name":
            output += UT.Utilities.indent(depth+1) + "\"Name\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "Resource." + JsonSchemaGenerator.schema_version +".json#Name\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

        elif propertyname == "Modified":
            output += UT.Utilities.indent(depth+1) + "\"Modified\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "Resource." + JsonSchemaGenerator.schema_version +".json#Modified\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

        elif propertyname == "Id":
            output += UT.Utilities.indent(depth+1) + "\"Id\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + "Resource." + JsonSchemaGenerator.schema_version +".json#Id\"\n"
            output += UT.Utilities.indent(depth+1) + "}"
        
        return output


    ##############################################################################
    # Name: generate_odata_json_file                                             #
    # Description:                                                               #
    #  Generates contents of odata.4.0.0.json                                    #
    ##############################################################################
    @staticmethod
    def generate_odata_json_file(depth):
        output =""
        output += UT.Utilities.indent(depth) + "\"definitions\": {\n"
        output += UT.Utilities.indent(depth+1) + "\"context\": {\n"
        output += UT.Utilities.indent(depth+2) + "\"type\": \"string\",\n"
        output += UT.Utilities.indent(depth+2) + "\"format\": \"uri\",\n"
        output += UT.Utilities.indent(depth+2) + "\"readonly\": true,\n"
        output += UT.Utilities.indent(depth+2) + "\"longDescription\": \"The value of this property shall be the context URL that describes the resource according to OData-Protocol and shall be of the form defined in the SPMF specification.\"\n"
        output += UT.Utilities.indent(depth+1) + "},\n"
        output += UT.Utilities.indent(depth+1) + "\n"
        output += UT.Utilities.indent(depth+1) + "\"id\":{\n"
        output += UT.Utilities.indent(depth+2) + "\"type\": \"string\",\n"
        output += UT.Utilities.indent(depth+2) + "\"format\": \"uri\",\n"
        output += UT.Utilities.indent(depth+2) + "\"readonly\": true,\n"
        output += UT.Utilities.indent(depth+2) + "\"longDescription\": \"The value of this property shall be the unique identifier for the resource and it shall be of the form defined in the SPMF specification.\"\n"
        output += UT.Utilities.indent(depth+1) + "},\n"
        output += UT.Utilities.indent(depth+1) + "\n"
        output += UT.Utilities.indent(depth+1) + "\"type\":{\n"
        output += UT.Utilities.indent(depth+2) + "\"type\": \"string\",\n"
        output += UT.Utilities.indent(depth+2) + "\"readonly\": true,\n"
        output += UT.Utilities.indent(depth+2) + "\"longDescription\": \"The value of this property shall be an absolute URL that specifies the type of the resource and it shall be of the form defined in the SPMF specification.\"\n"
        output += UT.Utilities.indent(depth+1) + "}\n"
        output += UT.Utilities.indent(depth) + "}"

        return output


    ########################################################################################################
    # Name: generate_json_for_propertybag_actions                                                          #
    # Description:                                                                                         #
    #  Generated JSON corresponding to an action entry                                                     #
    ########################################################################################################
    def generate_json_for_propertybag_actions(self, typetable, typedata, depth, prefixuri):

        output = ''
        for typekey in typetable:
            typeentry = typetable[typekey]

            if not typeentry["TypeType"] == "Action":
                continue

            if not "Isbound" in typeentry["Node"].attrib.keys():
                continue

            if typeentry["Node"].attrib["Isbound"].upper() == "FALSE":
                continue

            # we have two entries for each action. we need to consider only one of this pair
            # we'll consider the one that starts with the namespace to be canonical
            if not typekey == typeentry["Namespace"] + "." + typeentry["Name"]:
                continue

            # we have a bound action; is it bound to this type?
            isboundtotype = False

            for param in typeentry["Node"].iter("{http://docs.oasis-open.org/odata/ns/edm}Parameter"):
                if not param.attrib["Type"] in typetable:
                    break

                if not typetable[param.attrib["Type"]] == typedata:
                    break

                isboundtotype = True
                break

            if isboundtotype:
                output += ",\n"
                output += self.get_payload_actionentry(typetable, typeentry, depth + 1, prefixuri)
            
        return output
    
    ########################################################################################################
    # Name: get_ref_value_for_type                                                                         #
    # Description:                                                                                         #
    #  Generate the value of ref based on the name of the type and namespace/file of the type              #
    ########################################################################################################
    @staticmethod 
    def get_ref_value_for_type(typetable, current_typename):

        refvalue = ""
        simplename = current_typename[current_typename.rfind(".") + 1 :]

        present = False
        # Check if current type is in the list of types listed in the definitions block
        for definition_block_type in JsonSchemaGenerator.definition_block_contents:
            if (JsonSchemaGenerator.compare_typenames(definition_block_type, current_typename) == True ):
                present = True

        if present == True:
            refvalue = "#/definitions/" + simplename
        else:
            # Extract the file name from the URL
            current_typedata = typetable[current_typename]
            url_parts = current_typedata["Url"].rsplit('/', 1)
            url_filename = url_parts[-1]
            refvalue = url_filename + ".json#" + simplename

        return refvalue


    ########################################################################################################
    # Name: generate_json_for_propertybag                                                                  #
    # Description:                                                                                         #
    #  Generates JSON for all the properties that are defined inside a type                                #
    ########################################################################################################
    def generate_json_for_propertybag(self, typetable, typedata, depth, namespace, unreferenced_types, prefixuri, isnullable):

        if isnullable:
            output  = UT.Utilities.indent(depth)   + "\"type\": [\n"
            output += UT.Utilities.indent(depth+1) +     "\"object\",\n"
            output += UT.Utilities.indent(depth+1) +     "\"null\"\n"
            output += UT.Utilities.indent(depth)   + "],\n"
        else:
            output = UT.Utilities.indent(depth) + "\"type\": \"object\",\n"

        isopentype = False

        if "OpenType" in typedata["Node"].attrib.keys():
            if typedata["Node"].attrib["OpenType"].upper() == "TRUE":
                isopentype = True

        #if ( (typedata["Name"].endswith("collection") == True) or  (typedata["Name"].endswith("Collection") == True)):
        if ( typedata["BaseType"] == "Resource.ResourceCollection" ):
            output += UT.Utilities.indent(depth) + "\"additionalProperties\": true,\n"
        elif not isopentype:
            output += UT.Utilities.indent(depth) + "\"additionalProperties\": false,\n"

        nodes = [typedata["Node"]]
        currenttype = typedata
    
        while "BaseType" in currenttype["Node"].attrib.keys():
            basetypename = currenttype["Node"].attrib["BaseType"]

            if basetypename in typetable:
                currenttype = typetable[basetypename]
                nodes.append(currenttype["Node"])

            else:
                break

        output += UT.Utilities.indent(depth)  + "\"properties\": {\n"
        requiredproperties = []
        firstproperty = True

        # Generate special properties for EntityType
        if typedata["TypeType"] == "EntityType":
            output += self.get_json_for_special_properties("@odata.context", depth, prefixuri)
            output += ",\n"
            output += self.get_json_for_special_properties("@odata.id", depth, prefixuri)
            output += ",\n"
            output += self.get_json_for_special_properties("@odata.type", depth, prefixuri)
            output += ",\n"
            firstproperty = True

        bindingparameter = True

        # Loop through the nodes in the parsed XML
        for propbag in reversed(nodes):
            propkinds = ["Property", "NavigationProperty", "Parameter"]
            for propkind in propkinds:
                for property in propbag.iter("{http://docs.oasis-open.org/odata/ns/edm}" + propkind):
                    if firstproperty:
                        firstproperty = False
                    else:
                        output += ",\n"

                    if typedata["TypeType"] == "Action" and bindingparameter:
                        bindingparameter = False
                        firstproperty = True
                        continue

                    # Handle navigaitonLinks/NavigationProperty
                    if ( self.is_navigation_link(typetable, property) or propkind == "NavigationProperty"):
                        propname = property.attrib["Name"]
                        output += UT.Utilities.indent(depth+1) + "\"" + propname + "\": {\n"

                        # Figure out if DMTF.ExpandReferences is set or "DMTF.ExpandResources"
                        termvalue = ""
                        for annotation in property.iter("{http://docs.oasis-open.org/odata/ns/edm}Annotation"):
                            if annotation.attrib["Term"] == "DMTF.ExpandResources":
                                termvalue = "DMTF.ExpandResources"
                            elif annotation.attrib["Term"] == "DMTF.ExpandReferences":
                                termvalue = "DMTF.ExpandReferences"
                           
                       # Handle "DMTF.ExpandResources"
                        if termvalue == "DMTF.ExpandResources":
                            # Check if it is a collection or not
                            attribtype = property.attrib["Type"]

                            if ( not (attribtype is None)) and (attribtype.startswith("Collection")):
                                output += UT.Utilities.indent(depth+2) + "\"type\": \"array\",\n"
                                output += UT.Utilities.indent(depth+2) + "\"items\": {\n"
                                current_typename = JsonSchemaGenerator.extract_underlyingtype_from_collectiontype(attribtype)

                                # Get the reference value
                                refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable,current_typename)
                                output += UT.Utilities.indent(depth+3)+ "\"$ref\": \"" + refvalue + "\""
                                output += "\n"
                                output += UT.Utilities.indent(depth+2) + "}"
                            else:
                                refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, attribtype)
                                output += UT.Utilities.indent(depth+3)+ "\"$ref\": \"" + refvalue + "\""

                        elif termvalue == "DMTF.ExpandReferences":
                            attribtype = property.attrib["Type"]
                            if ( not (attribtype is None)) and (attribtype.startswith("Collection")):
                                output += UT.Utilities.indent(depth+2) + "\"type\": \"array\",\n"
                                output += UT.Utilities.indent(depth+2) + "\"items\": {\n"
                            
                            output += UT.Utilities.indent(depth+2) + "\"type\": \"object\",\n"
                            output += UT.Utilities.indent(depth+2) + "\"properties\": {\n"
                            output += UT.Utilities.indent(depth+3) + "\"@odata.id\" :{\n"
                            output += UT.Utilities.indent(depth+4) + "\"$ref\": \"" + "odata.4.0.0.json#Id\"\n"
                            output += UT.Utilities.indent(depth+3) + "}\n"                   
                            output += UT.Utilities.indent(depth+2) + "}"
                            if ( not (attribtype is None)) and (attribtype.startswith("Collection")):
                                output += "\n"
                                output += UT.Utilities.indent(depth+2) + "}"
                    else:
                        # Extract Name, Type and namespace
                        propname = property.attrib["Name"]
                        proptypename = property.attrib["Type"]

                        # Special handling of ["Description", "id", "Name", "Modified"] defined in Resource type.
                        specialproperties = ["Description", "Id", "Name", "Modified"]
                        if (propname in specialproperties) and (typedata["Name"] != "Resource"):
                             output += self.get_json_for_special_properties(propname, depth, prefixuri)
                             continue
                        else:    
                            output += UT.Utilities.indent(depth+1) + "\"" + propname + "\": {\n"    
                            propertyisnullable = True

                            if "Nullable" in property.attrib.keys():
                                if property.attrib["Nullable"] == "false":
                                    propertyisnullable = False                    
                            ignoreannotations = self.get_property_annotation_terms(property)
                            output += self.generate_json_for_type(typetable, proptypename, depth + 2, typedata["Namespace"], [], prefixuri, propertyisnullable, False, ignoreannotations)

                    if self.is_required_property(property):
                        requiredproperties.append(propname)

                    output += self.emit_annotations(typetable, typedata["Namespace"], property, depth + 2, prefixuri, False)
                    output += "\n"
                    output += UT.Utilities.indent(depth+1) + "}"

        # Add unreferenced types as properties if specified.
        if( len(unreferenced_types) > 0 ):
            for unreferenced_type in unreferenced_types:
                unreferenced_type_data = typetable[unreferenced_type]
                output += ",\n"
                output += UT.Utilities.indent(depth+1) + "\"" + unreferenced_type_data["Name"] + "\": {\n"
                output += self.generate_json_for_type(typetable, unreferenced_type, depth + 2, unreferenced_type_data["Namespace"], [], prefixuri, False, False, ignoreannotations)
                output += "\n" + UT.Utilities.indent(depth+1) +"}"

        # Handles actions
        output += self.generate_json_for_propertybag_actions(typetable, typedata, depth, prefixuri)

        # Close property block
        output += "\n"
        output += UT.Utilities.indent(depth) + "}"

        if len(requiredproperties) > 0:
            output += ",\n"
            output += UT.Utilities.indent(depth)  + "\"required\": [\n"
            firstrequiredproperty = True

            for propname in requiredproperties:
                if firstrequiredproperty:
                    firstrequiredproperty = False

                else:
                    output += ",\n"

                output += UT.Utilities.indent(depth+1) + "\"" + propname + "\""

            output += "\n"
            output += UT.Utilities.indent(depth)  + "]"
 
        return output

    
    ##############################################################################
    # Name: generate_json_for_type                                               #
    # Description:                                                               #
    #  Generates JSON for a particular type                                      #
    ##############################################################################
    def generate_json_for_type(self, typetable, typename, depth, namespace, unreferenced_types, prefixuri, isnullable, as_supportingtype, ignoreannotations = []):

        output = ""
        # collections
        if typename.startswith("Collection("):
            scalarname = typename[11:-1]
            output  = UT.Utilities.indent(depth) + "\"type\": \"array\",\n"
            output += UT.Utilities.indent(depth) + "\"items\": {\n"
            output += self.generate_json_for_type(typetable, scalarname, depth + 1, namespace, [], prefixuri, isnullable, as_supportingtype)
            output += "\n"
            output += UT.Utilities.indent(depth) + "}"
            return output

        # "primitive" types
        if typename.startswith("Edm."):
            edmtojson = {
                "Edm.String": "string",
                "Edm.Int16": "integer",
                "Edm.Int32": "integer",
                "Edm.Int64": "integer",
                "Edm.Boolean": "boolean",
                "Edm.Decimal": "string",
                "Edm.DateTimeOffset": "string"
            }

            if typename in edmtojson.keys():
                jsontype = edmtojson[typename]

                if isnullable:
                    output  = UT.Utilities.indent(depth)   + "\"type\": [\n"
                    output += UT.Utilities.indent(depth+1) +     "\"" + jsontype + "\",\n"
                    output += UT.Utilities.indent(depth+1) +     "\"null\"\n"
                    output += UT.Utilities.indent(depth)   + "]"
                else:
                    output = UT.Utilities.indent(depth) + "\"type\": \"" + jsontype + "\""

                return output

        if not typename in typetable.keys():
            return UT.Utilities.indent(depth)  + "\"ERROR\": \"type " + typename + " unrecognized.\""

        typedata = typetable[typename]
        typetype = typedata["TypeType"]

        if typetype == "EnumType":
            if isnullable:
                output  = UT.Utilities.indent(depth)   + "\"type\": [\n"
                output += UT.Utilities.indent(depth+1) +     "\"string\",\n"
                output += UT.Utilities.indent(depth+1) +     "\"null\"\n"
                output += UT.Utilities.indent(depth)   + "],\n"

            else:
                output = UT.Utilities.indent(depth) + "\"type\": \"string\",\n"

            output += UT.Utilities.indent(depth) + "\"enum\": [\n"
            firstenumvalue = True
            foundmemberannotations = False

            for member in typedata["Node"].iter("{http://docs.oasis-open.org/odata/ns/edm}Member"):
                if firstenumvalue:
                    firstenumvalue = False

                else:
                    output += ",\n"

                for annotation in member.iter("{http://docs.oasis-open.org/odata/ns/edm}Annotation"):
                    foundmemberannotations = True
                    break

                output += UT.Utilities.indent(depth+1) + "\"" + member.attrib["Name"] + "\""

            output += "\n"
            output += UT.Utilities.indent(depth) + "]"

            if foundmemberannotations:
                output += ",\n"
                output += UT.Utilities.indent(depth) + "\"enumDescriptions\": {\n"
                firstenumvalue = True

                for member in typedata["Node"].iter("{http://docs.oasis-open.org/odata/ns/edm}Member"):
                    if firstenumvalue:
                        firstenumvalue = False

                    else:
                        output += ",\n"

                    for annotation in member.iter("{http://docs.oasis-open.org/odata/ns/edm}Annotation"):
                        if annotation.attrib["Term"] == "OData.Description":
                            output += UT.Utilities.indent(depth+1) + "\"" + member.attrib["Name"] + "\": \"" + annotation.attrib["String"] + "\""
                            break

                output += "\n"
                output += UT.Utilities.indent(depth)  + "}"

        elif typetype == "EntityType":
            if ( (len(namespace) == 0) or (as_supportingtype == True) ):
                output += self.generate_json_for_propertybag(typetable, typedata, depth, namespace, unreferenced_types, prefixuri, isnullable)
            else:
                simplename = typename[typename.rfind(".") + 1 :]
                output = UT.Utilities.indent(depth) + "\"@odata.id\": \"" + typedata["Name"] + "." + JsonSchemaGenerator.schema_version + ".json#" + simplename + "\""
                return output

        elif typetype == "ComplexType":
            if len(namespace) == 0 or namespace == typedata["Namespace"]:
                output = self.generate_json_for_propertybag(typetable, typedata, depth, namespace, [], prefixuri, isnullable)

            else:
                simplename = typename[typename.rfind(".") + 1 :]
                # Extract the file name from the URL
                url_parts = typedata["Url"].rsplit('/', 1)
                url_filename = url_parts[-1]
                output = UT.Utilities.indent(depth) + "\"$ref\": \"" + url_filename + ".json#" + simplename + "\""
                return output

        elif typetype == "Action":
            if len(namespace) == 0 or namespace == typedata["Namespace"]:
                output = self.generate_json_for_propertybag(typetable, typedata, depth, namespace, [], prefixuri, isnullable)
            else:
                simplename = typename[typename.rfind(".") + 1 :]
                output = UT.Utilities.indent(depth) + "\"@odata.id\": \"" + typedata["Url"] + "#" + simplename + "\""
                return output

        elif typetype == "TypeDefinition":
            underlyingtype = typedata["Node"].attrib["UnderlyingType"]
            output = self.generate_json_for_type(typetable, underlyingtype, depth, namespace, [], prefixuri, isnullable, False)

        else:
            return UT.Utilities.indent(depth) + "ERROR: unknown TypeType " + typetype

        # Emit type annotations
        output += self.emit_annotations(typetable, namespace, typedata["Node"], depth, prefixuri, isnullable, ignoreannotations)

        return output


    ################################################################################
    # Name: generate_typetable                                                     #
    # Description:                                                                 #
    #  Populates the collection that contains information related to               #
    #  all the data types relevent to generation of JSON                           #
    ################################################################################
    @staticmethod
    def generate_typetable(url, is_from_refuri):

        JsonSchemaGenerator.parsed.append(url)
        data = UT.Utilities.open_url(url)
    
        if len(data) == 0:
            return {}

        root = ET.fromstring(data)
        typetable = {}

        for reference in root.iter("{http://docs.oasis-open.org/odata/ns/edmx}Reference"):
            refuri = reference.attrib["Uri"]
            
            if enable_debugging == True:
                # This is for compatibility with the mockup and must be removed for
                # the convertor to function against a real service hosting CSDL metadata
                refuri = "http://localhost:9080/rest/v1/" + refuri[refuri.find("//") + 2:]
        
            if not refuri in JsonSchemaGenerator.parsed:
                typetable = dict(list(typetable.items()) + list(JsonSchemaGenerator.generate_typetable(refuri, True).items()))
    
        for dataservices in root.iter("{http://docs.oasis-open.org/odata/ns/edmx}DataServices"):
            for schema in dataservices.iter("{http://docs.oasis-open.org/odata/ns/edm}Schema"):
                namespace = schema.attrib["Namespace"]
                alias = namespace

                if "Alias" in schema.attrib.keys():
                    alias = schema.attrib["Alias"]
 
                typekinds = ["EntityType", "ComplexType", "TypeDefinition", "EnumType", "Action"]

                for typekind in typekinds:
                    for typedata in schema.iter("{http://docs.oasis-open.org/odata/ns/edm}" + typekind):
                        # Populate data related to the type
                        typename = typedata.attrib["Name"]
                        typeentry = {}
                        typeentry["TypeType"] = typekind
                        typeentry["Url"] = url
                        typeentry["Namespace"] = namespace
                        typeentry["Alias"] = alias
                        typeentry["Name"] = typename
                        typeentry["Node"] = typedata
                        
                        # Set base type
                        if "BaseType" in typedata.attrib:
                            typeentry["BaseType"] = typedata.attrib["BaseType"]
                        else:
                            typeentry["BaseType"] = ""

                        if is_from_refuri == False:
                            reftypes = JsonSchemaGenerator.get_referenced_types_from_same_namespace(typedata, namespace)
                            typeentry["ReferencedType"] = reftypes
                        else:
                            typeentry["ReferencedType"] = []

                        typeentry["RefUri"] = refuri
                        typeentry["IsFromRefUri"] = is_from_refuri
                        typetable[namespace + "." + typename] = typeentry
                        typetable[alias + "." + typename] = typeentry

        return typetable

    ################################################################################################################
    # Name: get_referenced_types_from_same_namespace                                                               #
    # Description:                                                                                                 #
    #  Loops through all the properties and navigationProperties and returns a list of types that were used        #
    #  and belong to the same namespace.                                                                           #
    ################################################################################################################
    @staticmethod 
    def get_referenced_types_from_same_namespace(typedata, type_namespace):
        referenced_types = []
        
        typename = typedata.attrib["Name"]

        # Navigation Properties
        # Loop though the nodes and find the type of Navigation propeties.
        for navproperty in typedata.iter("{http://docs.oasis-open.org/odata/ns/edm}NavigationProperty"):
            property_typename = navproperty.attrib["Type"]
            # If it is a collection, then we get the underlying type else we get back our input
            property_typename = JsonSchemaGenerator.extract_underlyingtype_from_collectiontype(property_typename, False)

            # Extract namespace from property typename
            property_typename_parts = property_typename.rsplit(".", 1)
            property_type_namespace = property_typename_parts[0]
            if( ( property_type_namespace == type_namespace) or 
                ( (property_type_namespace + "." + JsonSchemaGenerator.schema_version) == type_namespace) or 
                ( property_type_namespace == (type_namespace + "." + JsonSchemaGenerator.schema_version) ) ):
                referenced_types.append(property_typename)


        # Properties
        # Loop though the nodes and find the type of Navigation propeties.
        for property in typedata.iter("{http://docs.oasis-open.org/odata/ns/edm}Property"):
            property_typename = property.attrib["Type"]
            property_typename = JsonSchemaGenerator.extract_underlyingtype_from_collectiontype(property_typename)

            # Extract namespace from property typename
            property_typename_parts = property_typename.rsplit(".", 1)
            property_type_namespace = property_typename_parts[0]
            
            if( ( property_type_namespace == type_namespace) or 
                ((property_type_namespace + "." + JsonSchemaGenerator.schema_version) == type_namespace) or 
                (property_type_namespace == (type_namespace + "." + JsonSchemaGenerator.schema_version) ) ):
                referenced_types.append(property_typename)
        
        return referenced_types

    ################################################################################################################
    # Name: get_unreferenced_types_in_namespace                                                                    #
    # Description:                                                                                                 #
    #  Gets the list of types which are defined in a file but not referenced by any other types in the same file.  #
    ################################################################################################################
    @staticmethod 
    def get_unreferenced_types_in_namespace(typetable, namespace):
        analyzed_types = []
        unreferenced_types = []
        typenames = typetable.keys()

        # Loop through all the types defined in the file and generate output
        for currentType in typenames:
            success = False
            # Gather some data about the data type in question
            current_typedata = typetable[currentType]
            current_typetype = current_typedata["TypeType"]
            current_typenamespace = current_typedata["Namespace"]
            
            # If we find a ComplexType or EnumType check if it is from the same namespace
            if(current_typetype == "ComplexType" or current_typetype == "EnumType"):
                if(JsonSchemaGenerator.compare_namespaces(current_typenamespace, namespace) == True):
                    # If the Complex or Enum type belongs to the same namespace then find atleast one type having this type as a referencedType
                    for typename in typenames:
                        # Get data about the type that is up for comparison
                        typedata = typetable[typename]
                        typenamespace = typedata["Namespace"]
                        # Proceed only if the type that is up for comparison is from the same namespace
                        if(JsonSchemaGenerator.compare_namespaces(typenamespace, namespace) == True):
                            referenced_types = typedata["ReferencedType"]
                            for referenced_type_name in referenced_types:
                                if (JsonSchemaGenerator.compare_typenames(referenced_type_name, currentType) == True):
                                    success = True

                    # If no other class refers to current type, add it to the list of unreferenced types
                    if success == False:
                        unreferenced_types.append(currentType)
        
        typelist = JsonSchemaGenerator.remove_duplicate_types(unreferenced_types)
        return typelist


    ##########################################################################################################
    # Name: remove_duplicate_types                                                                           #
    # Description:                                                                                           #
    #  Goes through a list of types and removes the duplicates from the list                                 #
    ##########################################################################################################
    @staticmethod
    def remove_duplicate_types(types):
        final_typelist = []
        visited = []
        for current_type in types:
            typename = JsonSchemaGenerator.get_typename_without_namespace(current_type)
            if typename not in visited:
                visited.append(typename)
                final_typelist.append(current_type)

        return final_typelist


    ##########################################################################################################
    # Name: compare_namespaces                                                                               #
    # Description:                                                                                           #
    #  Compares the two namespaces and returns true if namespaces are aliases of each other                  #
    ##########################################################################################################
    @staticmethod
    def compare_namespaces(namespace1, namespace2):
        if( ( namespace1 == namespace2) or 
            ((namespace1 + "." + JsonSchemaGenerator.schema_version) == namespace2) or 
            ( namespace1 == (namespace2 + "." + JsonSchemaGenerator.schema_version) ) ):
            return True

        return False


    ###################################################################################################
    # Name: compare_typenames                                                                         #
    # Description:                                                                                    #
    #  Compares the two classes and returns true if classes are aliases of each other                 #
    ###################################################################################################
    @staticmethod 
    def compare_typenames(typename1, typename2):
        # If they are same no processing is needed
        if typename1 == typename2:
            return True

        # If 
        if ( JsonSchemaGenerator.schema_version not in typename1 ):
            # Extract namespace from typename
            typename_parts = typename1.rsplit(".", 1)
            type_namespace = typename_parts[0]
            typename1 = type_namespace + "." + JsonSchemaGenerator.schema_version + "." + typename_parts[-1]

        if ( JsonSchemaGenerator.schema_version not in typename2 ):
            # Extract namespace from typename
            typename_parts = typename2.rsplit(".", 1)
            type_namespace = typename_parts[0]
            typename2 = type_namespace + "." + JsonSchemaGenerator.schema_version + "." + typename_parts[-1]

        if typename1 == typename2:
            return True

        # If nothing matches
        return False


#################################################################
# Name: main                                                    #
# Description:                                                  #
#  Method where the execution of webservice is inititated.      # 
#################################################################
def main():

    if enable_debugging == True:
        pdb.set_trace()

    # read the arguments passed to the service
    form = cgi.FieldStorage()

    # Various URL formats supported.
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.0.96.0.Chassis'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Resource#Resource.0.96.0'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/IPAddresses#IPAddresses.0.96.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/odata'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Power#Power.0.96.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Thermal#Thermal.0.96.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.0.96.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Processor#Processor.0.96.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Redundancy#Redundancy.0.96.0'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Manager#Manager.0.96.0'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/DMTFExtensions#DMTFExtensions.0.96.0'} 
    
    if 'url' in form:
        
        if enable_debugging == True:
            url = form['url']
        else:
            url = form["url"].value
        
        # Parse the URL and extract input values from the URL
        url_inputs = JsonSchemaGenerator.parse_url(url)
       
        typename = ''
        namespace = ''
        filename = ''
        prefixuri = ''
        error = ''
        specialodatatype = ''
        generateOdataFile = ''
        screenoutput = ''
        depth = 0
        
        if 'error' in url_inputs:
            error = url_inputs['error']
            result = UT.Utilities.show_interactive_mode(error)
        else:
            if 'filename' in url_inputs:
                filename = url_inputs['filename']
            
            if 'namespace' in url_inputs:
                namespace = url_inputs['namespace']

            if 'typename' in url_inputs:
                typename = url_inputs['typename']

            if 'prefixuri' in url_inputs:
                prefixuri = url_inputs['prefixuri']

            if 'generateOdataFile' in url_inputs:
                generateOdataFile = url_inputs['generateOdataFile']

            # create a dictionary from type names to type data
            
            jsonresults = {}
            
            current_schema = ''
            # We support three scenarios:
            # 1. Filename ending with odata is provided - We generate odata.4.0.0.json 
            # 2. Filename and Typename provided - service will convert the specific type in the file.
            # 3. FileName and Namespace provided - service will convert only types in given namespace.

            if ( (not ( generateOdataFile is None )) and ( generateOdataFile != '') and (generateOdataFile == "True")):
                # If odata.json file is to be generated
                jsonresult = JsonSchemaGenerator.generate_odata_json_file(depth+1)
                jsonresults["odata.4.0.0"] = jsonresult

            elif len(typename) > 0:
                # Create JSON schema for a specific type
                schema_version_value = JsonSchemaGenerator.get_schemaversion_from_typename(typename)

                # Create an object of JsonSchemaGenerator
                current_schema = JsonSchemaGenerator(schema_version_value)
                
                # Create the type table
                typetable = JsonSchemaGenerator.generate_typetable(filename, False)
                
                # Get list of Unreferenced Types
                unreferenced_types = JsonSchemaGenerator.get_unreferenced_types_in_namespace(typetable, namespace)

                # Generate JSON for type
                jsonresult = current_schema.generate_json_for_type(typetable, typename, depth+1, "", unreferenced_types, prefixuri, False, False)
                targetfilename = typename + "_type"
                jsonresults[targetfilename] = jsonresult

            else:
                # Create a JSON schema representation of the indicated file/namespace
                schema_version_value = JsonSchemaGenerator.get_schemaversion_from_namespace(namespace)
                
                # Create an object of JsonSchemaGenerator
                current_schema = JsonSchemaGenerator(schema_version_value)
                
                # Create the type table
                typetable = JsonSchemaGenerator.generate_typetable(filename, False)
                
                # Get list of Unreferenced Types
                unreferenced_types = JsonSchemaGenerator.get_unreferenced_types_in_namespace(typetable, namespace)
                
                # Get Json results
                jsonresults = current_schema.generate_json_for_file(typetable, depth+1, "", filename, namespace, unreferenced_types, prefixuri, False)

            # Generate the files with the results and then get the screen output
            screenoutput = JsonSchemaGenerator.geneate_json_files(jsonresults)
                
    else:
        result = UT.Utilities.show_interactive_mode("Please specify URL as part of the input")
        return result

    return screenoutput



if __name__ == "__main__":
    result = main()
    print(result)