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
import sys
import xml.etree.ElementTree as ET
import Utilities as UT
import os

# Enable the printing of error information
#cgitb.enable()
enable_debugging = False

if enable_debugging == True:
    import pdb

###############################################################################
# Name: Constants                                                             #
# Description:                                                                #
#   Defines constants used in the script                                      #
###############################################################################

schemaLocation = "http://schemas.dmtf.org/redfish/" 
schemaBaseLocation = schemaLocation + "v1/"
odataSchema = schemaBaseLocation + "odata.4.0.0.json"
redfishSchema = schemaLocation + "v1/redfish-schema.1.0.0.json"

#########################################################################################################
# Class Name: JsonSchemaGenerator                                                                       #
# Description:                                                                                          #
#  This class to performs conversion of CSDL (XML) schema into JSON schema.                             #
#########################################################################################################
class JsonSchemaGenerator:

    # Static member variables
    schemaname = ''                     # Schema name for which the generation is being done
    parsed = []                         # List of URIs that have been parsed
    current_schema_classname = ''       # Class for which the schema is being generated
    definition_block_contents = []

    #################################################################
    # Name: __init__                                                #
    # Description:                                                  #
    #   Constructor for JsonSchemaGeneratorUtils class              #
    #################################################################
    def __init__(self, schema_name_value):

        JsonSchemaGenerator.schemaname = schema_name_value

    ########################################################################################################
    # Name: get_ref_value_for_type                                                                         #
    # Description:                                                                                         #
    #  Generate the value of ref based on the name of the type and namespace/file of the type              #
    ########################################################################################################
    @staticmethod 
    def get_ref_value_for_type(typetable, current_typename, root_namespace):

        refvalue = ""
        current_typedata = typetable[current_typename]
        simplename = current_typename[current_typename.rfind(".") + 1 :]

#todo: fix logic to be more generic post-v1
        # If the current type is defined in this namespace
        if root_namespace == current_typedata["Namespace"]:
            refvalue = "#/definitions/" + simplename
        else:
            refvalue = schemaBaseLocation + current_typedata["Alias"] + ".json#/definitions/" + simplename

        return refvalue

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

    #################################################################
    # Name: is_inline_type                                      #
    # Description:                                                  #
    #  Returns True if property should be written inline            #
    #################################################################
    def is_inline_type(self, type):

        #todo: use "has_basetype" post-v1
        if(type["BaseType"] != "Resource.Links" and type["Name"] != "Actions" and type["Name"] != "OemActions"):
            return True;

        return False

    ##########################################################################
    # Name: is_required_property                                             # 
    # Description:                                                           #
    #  Returns True if the property being evaulated is a required property.  #
    ##########################################################################
    def is_required_property(self, property):

        for annotation in property:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            if annotation.attrib["Term"] == "Redfish.Required":
                if "Bool" in annotation.attrib.keys():
                    if annotation.attrib["Bool"].upper() == "FALSE":
                        break

                return True

        return False

    ##########################################################################
    # Name: has_basetype                                                     # 
    # Description:                                                           #
    #  Returns True if the type has the specified base type n its hierarchy. #
    ##########################################################################
    def has_basetype(self, typetable, type, basetype):

        # does it have the base type anywhere in it's hierarchy?
        while True:
            if "BaseType" in type["Node"].attrib.keys():
                basetypename = type["Node"].attrib["BaseType"]
                if basetypename == basetype:
                    return True
                else:
                    if basetypename == type["Namespace"] + "." + type["Name"]:
                        print("Circular Reference Error in base type of " + basetypename )
                        return False
                    else:
                       type = typetable[basetypename]
            else:
                break

        # by default, types allow additional properties
        return False


    ##########################################################################
    # Name: allows_additional_properties                                     # 
    # Description:                                                           #
    #  Returns True if the type allows additional properties.                #
    ##########################################################################
    def allows_additional_properties(self, type, typetable):

        # if type is abstract, it must allow additional properties
        if "Abstract" in type["Node"].attrib.keys():
            if type["Node"].attrib["Abstract"].upper() == "TRUE":
                return True
				
        # if type is open, it must allow additional properties
        if "OpenType" in type["Node"].attrib.keys():
            if type["Node"].attrib["OpenType"].upper() == "TRUE":
                return True

        # does it have the AdditionalProperties attribute anywhere in it's hierarchy?
        while True:
            for annotation in type["Node"]:
                if annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                    if annotation.attrib["Term"] == "OData.AdditionalProperties":
                        if "Bool" in annotation.attrib.keys():
                            if annotation.attrib["Bool"].upper() == "FALSE":
                                return False
                            else:
                                return True
                        else:
                            return True
								 
            if "BaseType" in type["Node"].attrib.keys():
                basetypename = type["Node"].attrib["BaseType"]
                if basetypename in typetable:
                    type = typetable[basetypename]
                else:
                    break
            else:
                break

        # by default, types allow additional properties
        return True

    ##########################################################################
    # Name: is_requiredOnCreate_property                                     # 
    # Description:                                                           #
    #  Returns True if the property being evaulated is required on create.   #
    ##########################################################################
    def is_requiredOnCreate_property(self, property):

        for annotation in property:
            if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                continue

            if annotation.attrib["Term"] == "Redfish.RequiredOnCreate":
                if "Bool" in annotation.attrib.keys():
                    if annotation.attrib["Bool"].upper() == "FALSE":
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
                        "Edm.Int16": "number",
                        "Edm.Int32": "number",
                        "Edm.Int64": "number",
                        "Edm.Boolean": "boolean",
                        "Edm.Decimal": "number",
                        "Edm.DateTimeOffset": "string"
                    }

        if not inputType in edmtojson:
            return "object"
    
        return edmtojson[inputType]

    ##########################################################################
    # Name: emit_annotations                                                 # 
    # Description:                                                           #
    #  Emits annotations that are to be added to JSON                        #
    ##########################################################################
    def emit_annotations(self, typetable, namespace, annotated, depth, prefixuri, isnullable = False, ignoreannotations = []):

        output = ""
        fcontinue = True
        written = []

        #for each type in the heirarchy
        while ( fcontinue == True ):
            for annotation in annotated:
                if not annotation.tag == "{http://docs.oasis-open.org/odata/ns/edm}Annotation":
                    continue

                if ( (annotation.attrib["Term"] in ignoreannotations) or (annotation.attrib["Term"] in written ) ):
                    continue

                #don't add annotation more than once'
                written.append(annotation.attrib["Term"])

                if (annotation.attrib["Term"] == "OData.Description"):
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"description\": \"" + annotation.attrib["String"] + "\""

                elif (annotation.attrib["Term"] == "OData.LongDescription"):
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"longDescription\": \"" + annotation.attrib["String"] + "\""

                elif (annotation.attrib["Term"] == "OData.Permissions"):
                    if annotation.attrib["EnumMember"] == "OData.Permissions/Read":
                        output += ",\n"
                        output += UT.Utilities.indent(depth) + "\"readonly\": true"
                    elif annotation.attrib["EnumMember"] == "OData.Permissions/ReadWrite":
                        output += ",\n"
                        output += UT.Utilities.indent(depth) + "\"readonly\": false"

                elif ((annotation.attrib["Term"] == "Validation.Pattern") or (annotation.attrib["Term"] == "Redfish.Pattern") ):
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"pattern\": \"" + annotation.attrib["String"] + "\""

                elif annotation.attrib["Term"] == "Redfish.DynamicPropertyPatterns":
                    content = self.get_dynamic_property_patterns_content(annotation)
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"patternProperties\": { \n"
                    output += UT.Utilities.indent(depth+1) + "\"" + content["Pattern"] + "\": { \n"
                    jsontype = self.get_edmtype_to_jsontype(content["Type"])
            
                    if jsontype == "object":
                        output += self.generate_json_for_type(typetable, content["Type"], depth + 2, namespace, prefixuri, isnullable, False)
                        output += "\n" + UT.Utilities.indent(depth + 1) + "}\n"
                    else:
                        output += UT.Utilities.indent(depth + 2) + "\"type\":\"" + jsontype + "\"\n"
                    output += UT.Utilities.indent(depth) + "}"

                elif (annotation.attrib["Term"] == "Validation.Minimum"):
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"minimum\": " + annotation.attrib["Int"]

                elif (annotation.attrib["Term"] == "Validation.Maximum"):
                    output += ",\n"
                    output += UT.Utilities.indent(depth) + "\"maximum\": " + annotation.attrib["Int"]
                                                      
            if "BaseType" in annotated.attrib.keys():
                #todo: make more robust
                annotated = typetable[annotated.attrib["BaseType"]]["Node"]
            else:
                fcontinue = False

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
        
        propname = "#" + actionentry["Namespace"] + "." + actionentry["Name"] 
        output += UT.Utilities.indent(depth)   + "\"" + propname + "\": {\n"
        output += self.get_action_definition(typetable, actionentry, depth, prefixuri)
        output += UT.Utilities.indent(depth)   + "}"

        return output

    #########################################################################################################
    # Name: get_action_definition                                                                           #
    # Description:                                                                                          #
    #  Generates JSON for action definitions                                                                #
    #########################################################################################################
    def get_action_definition(self, typetable, actionentry, depth, prefixuri):

        output = ""
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
            output += UT.Utilities.indent(depth+2) + "\"" + paramname + "@Redfish.AllowableValues" + "\": {\n"
            output += self.generate_json_for_type(typetable, paramtype, depth + 3, actionentry["Namespace"], prefixuri, False, False)
            output += self.emit_annotations(typetable, actionentry["Namespace"],  param, depth + 3, prefixuri, False)
            output += "\n"
            output += UT.Utilities.indent(depth+2) + "}"

        output += "\n"
        output += UT.Utilities.indent(depth+1) +     "}\n"

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
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + odataSchema + "#/definitions/context\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

        elif propertyname == "@odata.id":
            output += UT.Utilities.indent(depth+1) + "\"@odata.id\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + odataSchema + "#/definitions/id\"\n"
            output += UT.Utilities.indent(depth+1) + "}"
            
        elif propertyname == "@odata.type":
            output += UT.Utilities.indent(depth+1) + "\"@odata.type\": {\n"
            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + odataSchema + "#/definitions/type\"\n"
            output += UT.Utilities.indent(depth+1) + "}"

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

            if not "IsBound" in typeentry["Node"].attrib.keys():
                continue

            if typeentry["Node"].attrib["IsBound"].upper() == "FALSE":
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
    # Name: generate_json_for_propertybag                                                                  #
    # Description:                                                                                         #
    #  Generates JSON for all the properties that are defined inside a type                                #
    ########################################################################################################
    def generate_json_for_propertybag(self, typetable, typedata, depth, namespace, prefixuri, isnullable, in_definitions_block):

        if isnullable:
            output  = UT.Utilities.indent(depth)   + "\"type\": [\n"
            output += UT.Utilities.indent(depth+1) +     "\"object\",\n"
            output += UT.Utilities.indent(depth+1) +     "\"null\"\n"
            output += UT.Utilities.indent(depth)   + "],\n"
        else:
            output = UT.Utilities.indent(depth) + "\"type\": \"object\",\n"

        # allow odata and redfish annotations
        output += UT.Utilities.indent(depth) + "\"patternProperties\": { \n"
        output += UT.Utilities.indent(depth+1) + "\"^([a-zA-Z_][a-zA-Z0-9_]*)?@(odata|redfish|Message|Privileges)\\.[a-zA-Z_][a-zA-Z0-9_.]+$\" : {\n"
        output += UT.Utilities.indent(depth+2) + "\"type\": [\"array\", \"boolean\", \"number\", \"null\", \"object\", \"string\"],\n"
        output += UT.Utilities.indent(depth+2) + "\"description\": \"This property shall specify a valid odata or redfish property.\"\n"
        output += UT.Utilities.indent(depth+1) + "}\n"
        output += UT.Utilities.indent(depth)   + "},\n"
		
        nodes = [typedata["Node"]]
        currenttype = typedata

        while "BaseType" in currenttype["Node"].attrib.keys():
            basetypename = currenttype["Node"].attrib["BaseType"]
            if basetypename in typetable:
                currenttype = typetable[basetypename]
                nodes.append(currenttype["Node"])

            else:
                break

        # Write out Additional Properties
        if ( self.allows_additional_properties(typedata, typetable) ):
            output += UT.Utilities.indent(depth) + "\"additionalProperties\": true,\n"
        else:
            output += UT.Utilities.indent(depth) + "\"additionalProperties\": false,\n"

        output += UT.Utilities.indent(depth)  + "\"properties\": {\n"
        requiredproperties = []
        requiredcreateproperties = []
        firstproperty = True

        # Generate special properties for EntityType
        if typedata["TypeType"] == "EntityType" and not self.has_basetype(typetable, typedata, "Resource.ReferenceableMember"):
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

                    # Handle navigationLinks/NavigationProperty
                    if ( propkind == "NavigationProperty"):
                        propname = property.attrib["Name"]
                        attribtype = property.attrib["Type"]

                        if ( not (attribtype is None)) and (attribtype.startswith("Collection") and typedata["Name"]=="Members"):
                            output += UT.Utilities.indent(depth+1) + "\"" + propname + "@odata.count\": {\n"
                            output += UT.Utilities.indent(depth+2) + "\"$ref\": \"" + odataSchema + "#/definitions/count\"\n"
                            output += UT.Utilities.indent(depth+1) + "},\n"
                        output += UT.Utilities.indent(depth+1) + "\"" + propname + "\": {\n"

                        # Figure out if OData.AutoExpandReferences is set or "OData.AutoExpand"
                        termvalue = ""
                        for annotation in property.iter("{http://docs.oasis-open.org/odata/ns/edm}Annotation"):
                            if annotation.attrib["Term"] == "OData.AutoExpandReferences":
                                termvalue = "OData.AutoExpandReferences"
                            elif annotation.attrib["Term"] == "OData.AutoExpand":
                                termvalue = "OData.AutoExpand"
                          
                        # Check if it is a collection or not
                        if ( not (attribtype is None)) and (attribtype.startswith("Collection")):
                            output += UT.Utilities.indent(depth+2) + "\"type\": \"array\",\n"
                            output += UT.Utilities.indent(depth+2) + "\"items\": {\n"
                            current_typename = JsonSchemaGenerator.extract_underlyingtype_from_collectiontype(attribtype)

                            # Get the reference value
                            simplename = current_typename[current_typename.rfind(".") + 1 :]
                            refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, current_typename, namespace)
                            output += UT.Utilities.indent(depth+3)+ "\"$ref\": \"" + refvalue + "\"\n"
                            output += UT.Utilities.indent(depth+2) + "}"
                        else:
                            refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, attribtype, namespace)
                            output += UT.Utilities.indent(depth+2)+ "\"$ref\": \"" + refvalue + "\""

					# Handle regular property
                    else:
                        # Extract Name, Type and namespace
                        propname = property.attrib["Name"]
                        proptypename = property.attrib["Type"]
                        output += UT.Utilities.indent(depth+1) + "\"" + propname + "\": {\n"    
                        propertyisnullable = True

                        if "Nullable" in property.attrib.keys():
                            if property.attrib["Nullable"] == "false":
                                propertyisnullable = False                    
                        ignoreannotations = self.get_property_annotation_terms(property)

                        # Get all keys and extract typedata for the property
                        typetablekeys = typetable.keys()
                        if (proptypename in typetablekeys):
                            if(self.is_inline_type(typetable[proptypename]) ):
                                refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, proptypename, namespace)
                                output += UT.Utilities.indent(depth+2)+ "\"$ref\": \"" + refvalue + "\""
                            # write Links, Actions, OemActions inline
                            else:
                                output += self.generate_json_for_type(typetable, proptypename, depth + 2, typedata["Namespace"], prefixuri, propertyisnullable, False, ignoreannotations)

                        # type not in loaded; probably primitive type
                        else:
                            output += self.generate_json_for_type(typetable, proptypename, depth + 2, typedata["Namespace"], prefixuri, propertyisnullable, False, ignoreannotations)

                    if self.is_required_property(property):
                        requiredproperties.append(propname)

                    if self.is_requiredOnCreate_property(property):
                        requiredcreateproperties.append(propname)

                    output += self.emit_annotations(typetable, typedata["Namespace"], property, depth + 2, prefixuri, False)
                    output += "\n"
                    output += UT.Utilities.indent(depth+1) + "}"

        # Handles actions
        output += self.generate_json_for_propertybag_actions(typetable, typedata, depth, prefixuri)

        # Close property block
        output += "\n"
        output += UT.Utilities.indent(depth) + "}"

        # Write Required Properties
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
 
        # Write Required On Create Properties
        if len(requiredcreateproperties) > 0:
            output += ",\n"
            output += UT.Utilities.indent(depth)  + "\"requiredOnCreate\": [\n"
            firstproperty = True

            for propname in requiredcreateproperties:
                if firstproperty:
                    firstproperty = False

                else:
                    output += ",\n"

                output += UT.Utilities.indent(depth+1) + "\"" + propname + "\""

            output += "\n"
            output += UT.Utilities.indent(depth)  + "]"

        return output


    ############################################################################################
    # Name: generate_json_for_collection_type                                                  #
    # Description:                                                                             #
    #   Generates JSON corresponding to a collection type                                      #
    ############################################################################################
    def generate_json_for_collection_type(self, typetable, typename, depth, namespace, prefixuri, isnullable):
        output = ""
        scalarname = typename[11:-1]
        output  = UT.Utilities.indent(depth) + "\"type\": \"array\",\n"
        output += UT.Utilities.indent(depth) + "\"items\": {\n"
        output += self.generate_json_for_type(typetable, scalarname, depth + 1, namespace, prefixuri, isnullable, False)
        output += "\n"
        output += UT.Utilities.indent(depth) + "}"

        return output

    ############################################################################################
    # Name: generate_json_for_premitive_types                                                  #
    # Description:                                                                             #
    #   Generates JSON corresponding to premitive types                                        #
    ############################################################################################
    def generate_json_for_premitive_types(self, typename, isnullable, depth):
        output = ""
        edmtojson = {
            "Edm.String": "string",
            "Edm.Int16": "number",
            "Edm.Int32": "number",
            "Edm.Int64": "number",
            "Edm.Boolean": "boolean",
            "Edm.Decimal": "number",
            "Edm.DateTimeOffset": "string",
            "Edm.Guid": "string"
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

            if typename == "Edm.DateTimeOffset":
                output += ",\n" + UT.Utilities.indent(depth) + "\"format\": \"date-time\""

            if typename == "Edm.Guid":
                output += ",\n" + UT.Utilities.indent(depth) + "\"pattern\": \"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\""

        return output

    ############################################################################################
    # Name: generate_json_for_EnumTypes                                                        #
    # Description:                                                                             #
    #   Generates JSON corresponding to a Enum type                                            #
    ############################################################################################
    def generate_json_for_EnumTypes(typetable, typedata, typename, namespace, depth, isnullable):

        output = ""

        if len(namespace) != 0 and namespace != typedata["Namespace"]:
                refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, typename, namespace)
                output += UT.Utilities.indent(depth)+ "\"$ref\": \"" + refvalue + "\""

        else:
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

        return output


    ##############################################################################
    # Name: generate_json_for_type                                               #
    # Description:                                                               #
    #  Generates JSON for a particular type                                      #
    ##############################################################################
    def generate_json_for_type(self, typetable, typename, depth, namespace, prefixuri, isnullable, in_definitions_block, ignoreannotations = []):

        output = ""
        # Collections
        if typename.startswith("Collection("):
            output = self.generate_json_for_collection_type(typetable, typename, depth, namespace, prefixuri, isnullable)
            return output

        # "Primitive" types
        if typename.startswith("Edm."):
            output = self.generate_json_for_premitive_types(typename, isnullable, depth)
            return output

        # Throw error if the type is not found
        if not typename in typetable.keys():
            print("Error: " + typename + " not found.")
            return UT.Utilities.indent(depth)  + "\"ERROR\": \"type " + typename + " unrecognized.\""

        typedata = typetable[typename]
        typetype = typedata["TypeType"]

        if typetype == "EnumType":
            output += JsonSchemaGenerator.generate_json_for_EnumTypes(typetable, typedata, typename, namespace, depth, isnullable)
   
        elif typetype == "EntityType":
            if namespace == typedata["Namespace"]:
                output += self.generate_json_for_propertybag(typetable, typedata, depth, namespace, prefixuri, isnullable, in_definitions_block)
            else:
                output = UT.Utilities.indent(depth) + "\"@odata.id\": \"" + typedata["JsonUrl"] + "#" + typename + "\""
                return output

        elif typetype == "ComplexType":
            if namespace == typedata["Namespace"]:
                output = self.generate_json_for_propertybag(typetable, typedata, depth, namespace, prefixuri, isnullable, in_definitions_block)
            else:
                refvalue = JsonSchemaGenerator.get_ref_value_for_type(typetable, typename, namespace)
                output += UT.Utilities.indent(depth)+ "\"$ref\": \"" + refvalue + "\""
                
                return output

        elif typetype == "Action":
            if namespace == typedata["Namespace"]:
                output = self.generate_json_for_propertybag(typetable, typedata, depth, namespace, prefixuri, isnullable, in_definitions_block)
            else:
                simplename = typename[typename.rfind(".") + 1 :]
                output = UT.Utilities.indent(depth) + "\"@odata.id\": \"" + typedata["JsonUrl"] + "#" + simplename + "\""
                return output

        elif typetype == "TypeDefinition":
            underlyingtype = typedata["Node"].attrib["UnderlyingType"]
            output = self.generate_json_for_type(typetable, underlyingtype, depth, namespace, prefixuri, isnullable, False)

        else:
            return UT.Utilities.indent(depth) + "ERROR: unknown TypeType " + typetype

        # Emit type annotations
        output += self.emit_annotations(typetable, namespace, typedata["Node"], depth, prefixuri, isnullable, ignoreannotations)

        return output

    ################################################################################
    # Name: generate_json_for_reference_type                                       #
    # Description:                                                                 #
    #  generates a json payload for an unversioned reference to the specified type #
    ################################################################################
    def generate_json_for_reference_type(self, typetable, typename, schemaname, depth, prefixuri):

        output = ""
        output += UT.Utilities.indent(depth+2) + "\"oneOf\": [ \n"
        output += UT.Utilities.indent(depth+3) + "{\n"
        output += UT.Utilities.indent(depth+4) + "\"$ref\": \"" + odataSchema + "#/definitions/idRef\"\n"
        output += UT.Utilities.indent(depth+3) + "}"

        #for each type that derives from this type
        derivedtypes = self.get_derived_types(typetable, typename, schemaname)
        for derivedtype in derivedtypes:
            output += ",\n"
            output += UT.Utilities.indent(depth+3) + "{\n"
            output += UT.Utilities.indent(depth+4) + "\"$ref\": \"" + prefixuri + derivedtype["Namespace"] + ".json#/definitions/" + derivedtype["Name"] + "\"\n"
            output += UT.Utilities.indent(depth+3) + "}"

        output += "\n"
        output += UT.Utilities.indent(depth+2) + "]\n"
        output += UT.Utilities.indent(depth+1) + "}\n"
        output += UT.Utilities.indent(depth) + "}"
  
        return output

    ################################################################################
    # Name: get_derived_types                                                      #
    # Description:                                                                 #
    #  Generates a list of all types derived from current type                     #
    ################################################################################
    def get_derived_types(self, typetable, basetypename, basetypenamespace):

        basetypename = basetypenamespace + "." + basetypename
        typenames = typetable.keys()
        parsedtypes=[]
        derivedtypes = []

        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            typename = typedata["Name"]
            typenamespace = typedata["Namespace"]
        
            try :
                # If this type has been parsed already do nothing
                index = parsedtypes.index(typename + ":" + typenamespace)

            except :
                # This type has not been parsed yet
                parsedtypes.append(typename + ":" + typenamespace)
                if ( typetype == "EntityType" ):
                    # Check if the type being processed is derived from Resource or ResourceCollection
                    if ( self.has_basetype(typetable, typedata, basetypename) ): 
                        derivedtypes.append(typedata)

        return derivedtypes

    ################################################################################
    # Name: generate_typetable                                                     #
    # Description:                                                                 #
    #  Populates the collection that contains information related to               #
    #  all the data types relevent to generation of JSON                           #
    ################################################################################
    @staticmethod
    def generate_typetable(url, directory, is_from_refuri):

        JsonSchemaGenerator.parsed.append(url)
        data = UT.Utilities.open_url(url, directory)
    
        if len(data) == 0:
            return {}

        root = ET.fromstring(data)
        typetable = {}
        namespaces = []

        refuri = ""

        for reference in root.iter("{http://docs.oasis-open.org/odata/ns/edmx}Reference"):
            refuri = reference.attrib["Uri"]

            #todo: only load types from referenced namespaces			      
            if not refuri in JsonSchemaGenerator.parsed:
                typetable = dict(list(typetable.items()) + list(JsonSchemaGenerator.generate_typetable(refuri, directory, True)["Typetable"].items()))
    
        for dataservices in root.iter("{http://docs.oasis-open.org/odata/ns/edmx}DataServices"):
            current_file_typetable = {}
            namespace = ""
            alias = ""
            for schema in dataservices.iter("{http://docs.oasis-open.org/odata/ns/edm}Schema"):
                namespace = schema.attrib["Namespace"]
                if(is_from_refuri == False):
                   namespaces.append(namespace)

                alias = namespace
                if "Alias" in schema.attrib.keys():
                    alias = schema.attrib["Alias"]

                jsonurl = schemaBaseLocation + alias + ".json"
 
                typekinds = ["EntityType", "ComplexType", "TypeDefinition", "EnumType", "Action"]

                for typekind in typekinds:
                    for typedata in schema.iter("{http://docs.oasis-open.org/odata/ns/edm}" + typekind):

                        # Populate data related to the type
                        typename = typedata.attrib["Name"]
                        typeentry = {}
                        typeentry["TypeType"] = typekind
                        typeentry["JsonUrl"] = jsonurl 
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

                        # Put it in a temporary dictionary so that we only process a small number of types if any extra processing is required.
                        current_file_typetable[namespace + "." + typename] = typeentry
                        current_file_typetable[alias + "." + typename] = typeentry
            
            typetable.update(current_file_typetable)

        typeinfo = {}
        typeinfo["Namespaces"] = namespaces
        typeinfo["Typetable"] = typetable
        return typeinfo

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
            if (property_type_namespace == type_namespace):  
                referenced_types.append(property_typename)

        # Properties
        # Loop though the nodes and find the type of propeties.
        for property in typedata.iter("{http://docs.oasis-open.org/odata/ns/edm}Property"):
            property_typename = property.attrib["Type"]
            property_typename = JsonSchemaGenerator.extract_underlyingtype_from_collectiontype(property_typename)

            # Extract namespace from property typename
            property_typename_parts = property_typename.rsplit(".", 1)
            property_type_namespace = property_typename_parts[0]
            
            if ( property_type_namespace == type_namespace):  
                referenced_types.append(property_typename)
        
        return referenced_types

    ################################################################################################################
    # Name: generate_definition_block                                                                              #
    # Description:                                                                                                 #
    #  Generates the definitions block and adds all the complexTypes and types that derive from ReferenceableMember #
    #  into it.                                                                                                    #
    ################################################################################################################
    def generate_definition_block(self, typetable, depth, isnullable, namespace, prefixuri):

        typenames = typetable.keys()
        parsedtypes = []
        type_count = 0
        output = ""

        # Loop though all the types defined and generate them one by one.
        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            currentNamespace = typedata["Namespace"]
            basetype = typedata["BaseType"]
            typename = typedata["Name"]
        
            try :
                # If this type has been parsed already do nothing
                index = parsedtypes.index(typename + ":" + currentNamespace)
            except :
                # This type has not been parsed yet. Process it now.
                if (namespace == currentNamespace and self.is_inline_type(typedata) ):
                    # Add comma if this is not the first definition, otherwise write start of definitions block
                    if (type_count > 0):
                        output += ",\n"
                    else:
                        output += UT.Utilities.indent(depth) + "\"definitions\":{\n"

                    # Start type definition
                    output += UT.Utilities.indent(depth+1) + "\"" + typename + "\":{\n"
                    # Add it to the list so that it does not get generated again.
                    parsedtypes.append(typename + ":" + currentNamespace)

                    # Generate JSON for the type and append it to the output
                    if (typetype == "Action"):
                        output += self.get_action_definition(typetable, typedata, depth + 1, prefixuri)
                    elif ( basetype == "Resource.Resource" ):
                        output += self.generate_json_for_reference_type(typetable, typename, namespace, depth + 1, prefixuri)
                    else:
                        output += self.generate_json_for_type(typetable, currentType, depth+2, namespace, prefixuri, False, True)

                    output += "\n" + UT.Utilities.indent(depth + 1) + "}"
                    type_count += 1
                
        # Close the definitions block
        if (type_count > 0):
            output += "\n" + UT.Utilities.indent(depth) + "}"

        return output

    ##############################################################################
    # Name: generate_json_for_file                                               #
    # Description:                                                               #
    #  Convert all types in given file                                           #
    ##############################################################################
    def generate_json_for_file(self, typetable, depth, isnullable, filename, namespace, prefixuri, ignoreannotations = []):

        output = ""

        # If there are any types that derive from Resource.Resource, reference them
        typenames = typetable.keys()
        parsedtypes = []
        validationtypes = []
        validationtypecount = 0

        # Loop through all the types defined in the file and generate output
        for currentType in typenames:
            typedata = typetable[currentType]
            typetype = typedata["TypeType"]
            typename = typedata["Name"]
            typenamespace = typedata["Namespace"]
        
            try :
                # If this type has been parsed already do nothing
                index = parsedtypes.index(typename + ":" + typenamespace)

            except :
                # This type has not been parsed 
                parsedtypes.append(typename + ":" + typenamespace)
                if ( (typenamespace == namespace) and (typedata["IsFromRefUri"] == False) and (typetype == "EntityType") and ( self.has_basetype(typetable, typedata, "Resource.Resource" ) or self.has_basetype(typetable, typedata, "Resource.ResourceCollection") ) ): 
                    validationtypecount += 1
                    validationtypes.append(JsonSchemaGenerator.get_ref_value_for_type(typetable, currentType, namespace))

        if(validationtypecount > 1):
           output += UT.Utilities.indent(depth) + "\"oneOf\": [\n"
           first = True
           for validationtype in validationtypes:
               if (first == True):
                   first=False
               else:
                   output += ",\n"
               output += UT.Utilities.indent(depth + 1) + "{ \"$ref\": \"" + validationtype + "\" }"
           output += "\n"
           output += UT.Utilities.indent(depth) + "],\n"

#todo: clean up conditional logic
        elif validationtypecount == 1:
           output += UT.Utilities.indent(depth) + "\"$ref\": \"" + validationtypes[0] + "\",\n"

		#now generate definition block
        output += self.generate_definition_block(typetable, depth, isnullable, namespace, prefixuri)

        return output

    ##########################################################################################################
    # Name: generate_json_files                                                                               #
    # Description:                                                                                           #
    #  Consumes the results that were returned as final output and generates the corresponsing JSON files.   #
    ##########################################################################################################
    @staticmethod
    def generate_json_files(name, results):
        screenoutput = ''
        depth = 0

        # Loop through all the results and 
        screenoutput += "\nContent-type: application/json\n"
        # return the JSON result
        fileoutput  = ''
        # Insert the starting bracket
        fileoutput += UT.Utilities.indent(depth) + "{\n"
        # Add the Schema tag
        fileoutput += UT.Utilities.indent(depth+1) + "\"$schema\": \"" + redfishSchema + "\",\n"
        fileoutput += UT.Utilities.indent(depth+1) + "\"title\": \"" + name + "\",\n"
        # Fill in the result
        fileoutput += results
        # Add Copyright
        fileoutput += ",\n"
        fileoutput += UT.Utilities.indent(depth+1) + "\"copyright\": \"Copyright 2014-2015 Distributed Management Task Force, Inc. (DMTF). All rights reserved.\"\n"
        # End starting bracket
        fileoutput += UT.Utilities.indent(depth) + "}\n"
        screenoutput += fileoutput
        filename = name + ".json"

#fix this for web use
        filename="json" + "\\" + filename
        file = open(filename, "wb")
        file.write(bytes(fileoutput, 'utf-8'))
        file.close()
            
        return screenoutput

    ###################################################################################################
    # Name: parse_url                                                                                 #
    # Description:                                                                                    #
    #  Parses the input URL and extracts the filename, namespace and classname from the URL           #
    #  Also reports an error if the URL is not formed correctly.                                      #
    ###################################################################################################
    @staticmethod
    #fix this - get the namespace and alias from the file
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
            result.update({'namespace' : post_filename_string})                

        #hack to deal emulate parse logic -- todo: fix parse logic
        elif url.endswith(".xml"):
            prefixuri =  schemaLocation
            lastindex = url.find(".xml")
            filename=url
            result.update({'filename' : prefixuri + filename})
            result.update({'prefixuri' : prefixuri})
            result.update({'namespace' : filename[:lastindex] + ".1.0.0"})

        if incorrect_url == True:
            result.update({'error' : 'Incorrect URL - Please specify a URL like:\n 1. http://<filename>#<namespace> or \n 2. http://<filename>#<datatype>\n e.g. http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.Chassis'})

        return result


#################################################################
# Name: main                                                    #
# Description:                                                  #
#  Method where the execution of webservice is inititated.      # 
#################################################################
def main():

    directory=""
    url=""
    for arg in sys.argv:
        keyvalue = arg.split("=")
        if(keyvalue[0])=="directory":
            directory=keyvalue[1]
        if(keyvalue[0])=="url":
            url=keyvalue[1]

    if enable_debugging == True:
        pdb.set_trace()

    # read the arguments passed to the service
    form = cgi.FieldStorage()

    # Sample URL formats supported by the convertor tool
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.1.0.0.Chassis'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/ChassisCollection#ChassisCollection.1.0.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Resource#Resource.1.0.0'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/IPAddresses#IPAddresses.1.0.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/odata'}
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Power#Power.1.0.0'};
    #form = {'url': 'http://localhost:9080/rest/v1/schemas.dmtf.org/redfish/v1/Chassis#Chassis.1.0.0'};

    if 'directory' in form:
        if enable_debugging == True:
            directory=form['directory']
        else:
            directory=form['directory'].value

    if 'url' in form:
        if enable_debugging == True:
            url = form['url']
        else:
            url = form['url'].value

    if len(url) > 0:
        return generate_json(url, directory)
		                
    elif (directory != ""):
         for file in os.listdir(directory):
             if ( file.endswith(".xml") ):
               print("generating JSON for: " + file)
               JsonSchemaGenerator.parsed = []
               generate_json(file, directory)          

    else:
         result = UT.Utilities.show_interactive_mode("Please specify URL as part of the input")
         return result


#################################################################
# Name: generate_json                                           #
# Description:                                                  #
#  Generate JSON from inputs.                                   # 
#################################################################
def generate_json(url, directory):

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

        # create a dictionary from type names to type data
            
        jsonresults = {}
            
        # Create the type table
        typeinfo = JsonSchemaGenerator.generate_typetable(filename, directory, False)
        typetable = typeinfo["Typetable"]
        namespaces = typeinfo["Namespaces"]
			    
        # Create a JSON schema representation of the indicated file/namespace
        for currentnamespace in namespaces:
            # Create an object of JsonSchemaGenerator
            current_schema = JsonSchemaGenerator(currentnamespace)

            # Get Json results
            jsonresults = current_schema.generate_json_for_file(typetable, depth+1, "", filename, currentnamespace, prefixuri, False)

            # Generate the files with the results and then get the screen output
            screenoutput = JsonSchemaGenerator.generate_json_files(currentnamespace, jsonresults)
                
    return screenoutput


if __name__ == "__main__":
    result = main()
#    print(result)