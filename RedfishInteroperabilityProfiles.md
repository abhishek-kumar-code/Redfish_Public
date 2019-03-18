---
DocTitle: Redfish Interoperability Profiles
DocNumber: '0272'
DocClass: Normative
DocVersion: '1.1.0'
SupersedesVersion: '1.0.1'
modified: '2019-02-26'
status: published
released: True
copyright: '2017-2019'
---

# Foreword

The Redfish Interoperability Profile specification was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.

# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:
* Jeff Autor - Hewlett Packard Enterprise
* George Ericson - Dell Inc.
* Tomas Gonzalez - Majec Systems, Inc.
* Jon Hass - Dell Inc.
* Jeff Hilland - Hewlett Packard Enterprise
* John Leung - Intel Corporation
* Michael Raineri - Dell Inc.
* Paul Vancil - Dell Inc.

## Abstract

As Schema definitions for the Redfish Specification ("Redfish") are designed to provide significant flexibility, and allow conforming implementations on a wide variety of products, very few properties within the Schemas are required by the Redfish specification.  But consumers and software developers need a more rigidly defined set of required properties (features) in order to accomplish management tasks.  This set allows users to compare implementations, specify needs to vendors, and allows software to rely on the availability of data.  To provide that "common ground", a Redfish Interoperability Profile allows the definition of a set of schemas and property requirements, which meet the needs of a particular class of product or service.

The Redfish Interoperability Profile is a JSON document that contains Schema-level, Property-level, and Registry-level requirements.  At the property level, these requirements can include a variety of conditions under which the requirement applies.

## Overview

The Redfish Specification separates the definition of the protocol from the data model (schema), and in addition, allows each resource defined in the data model to be revised independently.  While this creates significant flexibility and extensibility, it can cause confusion when developers and end users attempt to answer the question "What version of Redfish does your product support?"  The answer is not a simple one, because fully describing a Redfish implementation would require listing each property supported in each schema implemented, as well as the protocol version and supported features.  That level of detail and version reporting would be extremely cumbersome to create or maintain, and difficult to use to compare implementations across products or vendors.  

The Redfish Interoperability Profile concept was created to simplify that process, by providing a means to communicate the functionality provided with a single statement - that an implementation meets the requirements set forth in a Redfish Interoperability Profile.

## Normative references

The following referenced documents are indispensable for the application of this document. For dated or versioned references, only the edition cited (including any corrigenda or DMTF update versions) applies. For references without a date or version, the latest published edition of the referenced document (including any corrigenda or DMTF update versions) applies.

* <a id="RFC3986">IETF RFC 3986</a>  T. Berners-Lee et al, Uniform Resource Identifier (URI): Generic Syntax, [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt "http://www.ietf.org/rfc/rfc3986.txt")
* <a id="Directives">ISO/IEC Directives</a>, Part 2, Rules for the structure and drafting of International Standards, [http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH](http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH "http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH")
* <a id="RFC6901">IETF RFC 6901</a>, P. Bryan, Ed. et al, JavaScript Object Notation (JSON) Pointer, [http://www.ietf.org/rfc/rfc6901.txt](http://www.ietf.org/rfc/rfc6901.txt "http://www.ietf.org/rfc/rfc6901.txt")
* <a id="JSONSchema-Core">JSON Schema: A Media Type for Describing JSON Documents, Draft 7</a>
[https://tools.ietf.org/html/draft-handrews-json-schema-01](https://tools.ietf.org/html/draft-handrews-json-schema-01 "https://tools.ietf.org/html/draft-handrews-json-schema-01")
* <a id="JSONSchema-Validation">JSON Schema Validation: A Vocabulary for Structural Validation of JSON, Draft 7</a>
[https://tools.ietf.org/html/draft-handrews-json-schema-validation-01](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01 "https://tools.ietf.org/html/draft-handrews-json-schema-validation-01")
* <a id="Redfish">DMTF Redfish Specification, DSP0266</a> [http://www.dmtf.org/sites/default/files/standards/documents/DSP0266_1.6.0.pdf](http://www.dmtf.org/sites/default/files/standards/documents/DSP0266_1.6.0.pdf "http://www.dmtf.org/sites/default/files/standards/documents/DSP0266_1.6.0.pdf")
* <a id="OpenAPI-Spec">OpenAPI Specification</a> [https://github.com/OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification "https://github.com/OAI/OpenAPI-Specification")

## Terms and definitions
In this document, some terms have a specific meaning beyond the normal English meaning. Those terms are defined in this clause.

The terms "shall" ("required"), "shall not", "should" ("recommended"), "should not" ("not recommended"), "may", "need not" ("not required"), "can" and "cannot" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Annex H. The terms in parenthesis are alternatives for the preceding term, for use in exceptional cases when the preceding term cannot be used for linguistic reasons. Note that ISO/IEC Directives, Part 2, Annex H specifies additional alternatives. Occurrences of such additional alternatives shall be interpreted in their normal English meaning.

The terms "clause", "subclause", "paragraph", and "annex" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 5.

The terms "normative" and "informative" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 3. In this document, clauses, subclauses, or annexes labeled "(informative)" do not contain normative content. Notes and examples are always informative elements.
 
## Design tenets

All profile entries (at the Profile, Resource, or Property level) are "additive".  That is, each requirement can only apply more rigid requirements that override less rigid requirements.

Profile requirements do not allow for exclusions of data.  Implementations are able to provide more data in their resources than required by a profile, as an implementation likely addresses multiple use cases or Profiles.  This includes both standard properties and OEM extensions.
   
## Profile tools

A free, open source utility has been created by the Redfish Forum to verify that a Redfish Service implementation conforms to the requirements included in a Redfish Interoperability Profile.  The Redfish Interop Validator is available for download from the DMTF's organization on Github at: https://github.com/DMTF/Redfish-Interop-Validator

## Profile repository

Redfish Interoperability Profiles published or re-distributed by the DMTF are available for download from the Redfish Profile Repository located at: http://redfish.dmtf.org/profiles 

## Profile document definition

A Redfish Interoperability Profile is specified in a JSON document.  The JSON objects and properties contained in the document are described in this specification, and are also available in a JSON-schema form (RedfishInteroperabilityProfile.v1_x_x.json) from the DMTF's Redfish Schema repository at http://redfish.dmtf.org/profiles for download.  The json-schema can be used to validate a Profile document to ensure compatibility with automated conformance tools or utilities.

The JSON document structure is intended to align easily with JSON payloads retrieved from Redfish Service implementations, to allow for easy comparisons and conformance testing.  Many of the properties defined within this structure have assumed default values that correspond with the most common use case, so that those properties can be omitted from the document for brevity.

### Filename conventions

The JSON document describing a Profile follows the Redfish Schema file naming conventions from the Redfish Specification. The filename format for Profiles shall be formatted as:

  *ProfileName.vMajorVersion_MinorVersion_Errata.json*

For example, version 1.2.0 of the BasicServer profile would be named "BasicServer.v1_2_0.json". The filename shall include the Profile name and Profile version matching those property values within the document.

### Basic functions

At the top level of the JSON document are the basic properties, which describe the profile, including authorship and contact information, versioning, and other profiles to include in order to build upon previous work.

| Property | Type | Description | 
| --- | --- | --- |
| `SchemaDefinition` | string | The JSON schema that defines this Redfish Interoperability Profile document and can be used to validate its contents. |
| `ProfileName` | string | The name of this Redfish Profile. |
| `ProfileVersion` | string | The version of this Redfish Profile. |
| `Purpose` | string | A description of the purpose of this Redfish Profile, such as its intended target audience, product segments, etc.|
| `ContactInfo` | string | An email address that can be used to provide feedback about this Redfish Profile. |
| `OwningEntity` | string | The name of the owning entity that defined this Redfish Interoperability Profile. |
| `RequiredProfiles` | object | A set of Redfish Profiles that serve as a basis for this Profile.  The requirements set forth in these Profiles are included in this Profile. |

#### Required profiles

The RequiredProfiles object contains properties (of type object) that are named to match the name of the profile to be included.  Each of these sub-objects contains the properties listed below.

| Property | Type | Description | 
| --- | --- | --- |
| `Repository` | string | A URI providing the location of the repository that contains the JSON file(s) to be included.  The filenames of the JSON files contained in the repository are expected to follow the Redfish Interoperability Profile filename conventions. If absent, the repository location shall be the Redfish Profile Repository (http://redfish.dmtf.org/profiles).|
| `MinVersion` | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|

#### Example

The following is an example of the top-level properties in a Profile, with two Required profiles included.

~~~
    "SchemaDefinition": "RedfishInteroperabilityProfile.v1_0_0",
    "ProfileName": "Anchovy",
    "ProfileVersion": "1.0.2",
    "OwningEntity": "Pizza Box Consortium",
    "Purpose": "This is a sample Redfish Interoperability profile.",
    "ContactInfo": "pizza@contoso.com",
    "RequiredProfiles": {
        "DMTFBasic": {
            "MinVersion": "1.0.0"
        },
        "ContosoPizza": {
            "Repository": "http://contoso.com/profiles",
            "MinVersion": "1.0.0"
        }
    }
~~~

### Protocol requirements

An object named `Protocol` contains properties which describe Redfish protocol functionality that is not related to the supported schemas or properties.  Therefore, these functions cannot be validated by comparing retrieved JSON payloads.

| Property | Type | Description | 
| --- | --- | --- |
| `MinVersion` | string |  Indicates the minimum version of the Redfish Specification protocol support required by this Profile. This version shall be reported by the Redfish Service in the ServiceRoot property `RedfishVersion`.  If this property is absent, the minimum value shall be '1.0.0'. |
| `Discovery` | string | Indicates support requirements for the Redfish SSDP Discovery protocol. If this property is absent, there is no requirement for SSDP. See the [Requirement values](#requirement-values) clause. |
| `HostInterface` | string | Indicates support requirements for the Redfish Host Interface. If this property is absent, there is no requirement for a Host Interface. See the [Requirement values](#requirement-values) clause.|
| `ExpandQuery` | string | Indicates support requirements for the `$expand` query parameter. Additional Expand support requirements may be specified in the Resource entry for the `ProtocolFeaturesSupported` object within `ServiceRoot`. If this property is absent, there is no requirement for support of the `$expand` query parameter. See the [Requirement values](#requirement-values) clause. |
| `FilterQuery` | string | Indicates support requirements for the `$filter` query parameter. If this property is absent, there is no requirement for support of the `$filter` query parameter. See the [Requirement values](#requirement-values) clause. |
| `SelectQuery` | string | Indicates support requirements for the `$select` query parameter. If this property is absent, there is no requirement for support of the `$select` query parameter. See the [Requirement values](#requirement-values) clause. |
| `OnlyQuery` | string | Indicates support requirements for the `only` query parameter. If this property is absent, there is no requirement for support of the `only` query parameter. See the [Requirement values](#requirement-values) clause. |
| `ExcerptQuery` | string | Indicates support requirements for the `excerpt` query parameter. If this property is absent, there is no requirement for support of the `excerpt` query parameter. See the [Requirement values](#requirement-values) clause. |

#### Example 

~~~
    "Protocol": {
        "MinVersion": "1.6",
        "Discovery": "Mandatory",
        "HostInterface": "Recommended",
        "ExpandQuery": "Mandatory",
        "SelectQuery": "None",
        "FilterQuery": "Recommended",
        "OnlyQuery": "Mandatory",
        "ExcerptQuery": "Recommended"
    }
~~~

#### Requirement values

| Value | Description |
| --- | --- |
| `Mandatory` | This protocol feature is required for this Profile. |
| `Recommended` | It is recommended, but not required, that this protocol feature be supported. |
| `None` | This feature is not required by this Profile.  It is listed here for clarity. |


### Resource (Schema) requirements

The primary content in a Redfish Profile is the set of supported property requirements.  As Redfish is organized and defined by schema-backed JSON resources, these requirements are also organized by schema.

For each schema, an object is created in the JSON document, named to match the schema's name.  Within this object, properties describe the location of the schema file, and schema-level requirements.  Within each schema-level object is a `PropertyRequirements` object that describes the property-level requirements for that schema.  The definition of both the schema/resource-level and property-level requirements are accomplished using the same mechanisms, which are described in the next clause.  

The structure of the resource and property requirements is:
~~~
    <Schema Name>: {
        "MinVersion": <version>,
        "CreateResource": <boolean>,
        "DeleteResource": <boolean>,
        "UpdateResource": <boolean>,
        "URIs": [ <uri pattern>, <uri pattern> ],
        "PropertyRequirements": {
            <Property Name>: { 
                <Requirements for this property>
            },
            <Property Name>: {
            }
        },
        "ActionRequirements": {
            <Action Name>: {
                <Requirements for this action>
            }
        },
        "ConditionalRequirements": [
	    { <Conditional Requirement> },
	    { <Conditional Requirement> }
        }
    },
    <Additional Schemas...>
~~~

#### Schema-level functions

The following options are available at the schema level:

| Property | Type | Description | 
| --- | --- | --- |
| `Repository` | string | A URI providing the location of the repository that contains the JSON file(s) to be included.  The filenames of the JSON files contained in the repository are expected to follow the Redfish Schema filename conventions. If absent, the repository location shall be the Redfish Schema Repository (http://redfish.dmtf.org/schemas). |
| `MinVersion` | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|
| `ReadRequirement` | string | Resource-level requirement for this schema; see [ReadRequirement](#readrequirement) clause. |
| `Purpose` | string | A description of the purpose of this requirement.  This text can provide justification or reasoning behind the requirement for use in the profile documentation. |
| `ConditionalRequirements` | object | Resource-level conditional requirements that apply to instances of this schema; see [Conditional requirements](#conditional-requirements) clause. |
| `CreateResource` | boolean | Specifies a requirement that a user may create an instance of this resource type. This normally applies to Redfish Collections. If this property is absent, there is no requirement to support creation of instances of this resource type. |
| `DeleteResource` | boolean | Specifies a requirement that a user may delete an instance of this resource type. This normally applies to Redfish Collections. If this property is absent, there is no requirement to support deletion of instances of this resource type. |
| `UpdateResource` | boolean | Specifies a requirement that a user may update an instance of this resource type. If this property is absent, there is no requirement to support updating instances of this resource type, but individual property-level read-write requirements apply. |
| `URIs` | array | An array of URI references to which the `ReadRequirement` and `WriteRequirement` are applied. The values shall follow the Resource URI pattern definition specified in the Redfish Specification. |

###### URI patterns

As the Redfish Specification version 1.6 or higher defines the set of possible URIs for each resource type, this fact can be used to easily create requirements or conditional requirements for resource types that occur at multiple locations in the resource tree. This method is preferred for any profile that will also desire OpenAPI compatibility, which requires Redfish v1.6 protocol support and therefore the URIs of any conforming implementation will match those listed in the profile.

Profiles which intend to apply to implementations conforming to Redfish Specification versions 1.0-1.5 cannot use this URI pattern matching in their profile definition.  Profiles containing URI pattern requirements shall require a Redfish Specification version 1.6 or higher in the profile's 'Protocol' object 'MinVersion' property.

##### Example

This example shows a simple required schema: 
~~~
    "ComputerSystem": {
        "MinVersion": "1.2.0",
        "Purpose": "Every instance must have a logical-view ComputerSystem resource.",
        "PropertyRequirements": {
            "SerialNumber": {},
            "Manufacturer": {},
            "Model": {
                "ReadRequirement": "Recommended"
            },
~~~

#### Property-level functions

Within the `PropertyRequirements` object are additional objects that are named to match the property name in the parent object's schema definition.  This object then contains the property-level requirements, which account for the bulk of a Profile's definition.  One additional level of JSON objects may be embedded, essentially nesting a `PropertyRequirements` object.

The following options are available at the property level:

| Property | Type | Description | 
| --- | --- | --- |
| `ReadRequirement` | string | Property-level requirement for this property; see [ReadRequirement](#readrequirement) clause. |
| `WriteRequirement` | string | Property-level write (HTTP PATCH or PUT) requirement for this property; see [WriteRequirement](#writerequirement) clause. |
| `ConditionalRequirements` | object | Property-level conditional requirements that apply to instances of this property; see [Conditional Requirements](#conditional-requirements) clause. |
| `MinCount` | integer | For array type properties, the minimum number of non-NULL instances within the array. |
| `MinSupportValues` |  array | The minimum set of enumerations that must be supported for this writable property. |
| `Comparison` | string | The condition used to compare the value of the property to `Values`. See the [Comparison](#comparison) clause. |
| `Purpose` | string | A description of the purpose of this requirement.  This text can provide justification or reasoning behind the requirement for use in the profile documentation. |
| `Values` | array | The value(s) used to perform a `Comparison`. Multiple values are only allowed for `AnyOf` or `AllOf` comparisons.  If no `Comparison` property is present, the comparison is assumed to be an `AnyOf` comparison. |
| `PropertyRequirements` | object | For Redfish properties of type 'object', this object contains requirements for the properties contained within the specified object. This specification allows for only one level of nested objects and requirements.|

##### Example

This example shows property-level requirements, including one of type 'object' containing further requirements on that object's properties.  For each `Power` resource, the `PowerSupplies` and `Voltages` array properties are required.  `Voltages` has no further requirements (by default, this property is mandatory, and as an array type, must have at least one item in the array. The `PowerSupplies` array must contain at least two (object) items.  Within the array, at least one item's `PowerSupplyType` property must have a value of `AC` or `DC`.

~~~
   "Power": {
      "PropertyRequirements": {
         "PowerSupplies": {
            "ReadRequirement": "Mandatory",
            "MinCount": 2,
            "PropertyRequirements": {
               "Status": {},
               "PowerSupplyType": {
                  "Comparison": "AnyOf",
                  "Purpose": "Need to know AC vs. DC supplies to match input readings to expected values.",
                  "Values": [ "AC", "DC" ]
               },
               "LineinputVoltage": {},
               "PowerCapacityWatts": {},
               "InputRanges": {
                  "ReadRequirement": "Recommended"
               }
            }
         },
         "Voltages": {}
      }
   },
~~~      

##### Comparison

The Comparison function uses the following enumerations to represent the various comparisons available:

| Value | Description |
| --- | --- |
| `Absent` | The property is not present in this resource. |
| `AnyOf` | At least one instance of the property in this resource must be equal to one of the values listed. |
| `AllOf` | At least one instance of the property in this resource must be equal to each of the values listed. |
| `Equal` | The value must be equal to the KeyValue. |
| `NotEqual` | The value of the property must not be equal to the value(s) listed. |
| `GreaterThan` | The value of the property must be greater than the Values. This comparison is only valid for properties of type 'number'. |
| `GreaterThanOrEqual` | The value of the property must be greater than or equal to the Values. This comparison is only valid for properties of type 'number'.|
| `LessThan` | The value of the property must be less than the Values. This comparison is only valid for properties of type 'number'.|
| `LessThanOrEqual` | The value of the property must be less than or equal to the Values. This comparison is only valid for properties of type 'number'.|
| `Present` | The property is present in this resource. |
| `LinkToResource` | The object contains a link to a resource with a Type equal to one of the schema names listed in Values. The Type is the unversioned schema name (e.g., `Thermal` or `Memory`).|

Many of these Comparison types are simple arithmetic, boolean or string value comparisons.  In addition, `Absent` and `Present` allow for comparisons concerning the existence or absence of a property.  The `LinkToResource` comparison specifies that the object property contains an `@odata.id` property to a resource whose schema name (Type) is listed in the `Values` array. 

##### ReadRequirement

This function specifies the level of basic read (HTTP GET) requirement applied to the resource or property.  The default value, or if no `ReadRequirement` is present, is `Mandatory`. For properties of type 'object', requirements of the embedded properties will apply only if the object is present.

| Value | Description |
| --- | --- |
| `Mandatory` |  This property is required in all instances of this resource. For properties of type 'array', the property is required in all non-NULL array items. If `Values` are listed, at least one instance of each enumeration value is required among instance(s) of this property.|
| `Recommended` | It is recommended, but not required, that this property be supported. |
| `IfImplemented` | This property is required if the underlying functionality is implemented. For properties of type 'object', requirements on embedded properties within the object will only apply if the object is present. |
| `Conditional` | This property is only required if `ConditionalRequirements` items apply to this instance of the resource. |
| `None` | This property is not required by this profile.  It is listed here for clarity. |

##### WriteRequirement

This function specifies the level of write support (HTTP PATCH or PUT) applied to a property.  The default value, or if no `WriteRequirement` is present, is `None`.  

| Value | Description |
| --- | --- |
| `Mandatory` |  This property is required to be writable in all instances of this resource. |
| `Recommended` | It is recommended, but not required, that this property be writable. |
| `None` | This property is not required to be writable by this profile.  It is listed here for clarity, and is the default value used if `WriteRequirement` is not present. |


##### Conditional requirements

The most flexible aspect of the Redfish Profile definition is the ability to make resource or property-level requirements that are dependent on one or more ConditionalRequirements within the resource and the parent resource(s) in the resource tree.

The `ConditionalRequirements` array function specifies these conditional requirements, which add to any requirements also defined for the resource or property.  Note that a condition cannot override or weaken a requirement already specified.  For example, if a property requirement is marked as `Mandatory`, no conditional requirement could mark the property as `None`.  Instead, the property would be specified with a `None` requirement, and with one or more `ConditionalRequirements` that would specify when the property requirement becomes `Mandatory`.

The following options are available for each conditional requirement:

| Property | Type | Description | 
| --- | --- | --- |
| `ReadRequirement` | string | The requirement to apply to the resource or property if the condition is met.|
| `WriteRequirement` | string | Property-level write (HTTP PATCH or PUT) requirement for this property; see [WriteRequirement](#writerequirement) clause. |
| `Purpose` | string | Text describing the purpose of this conditional requirement. |
| `URIs`    | array  | An array of URI references to which the `ReadRequirement` and `WriteRequirement` is applied. The values shall follow the Resource URI pattern definition specified in the Redfish Specification. |
| `SubordinateToResource` | array | An ordered list (from top of hierarchy to bottom) of resources where this resource is linked as a subordinate resource.  The conditional requirements listed for the resource apply only to instances which are subordinate to the listed parent resource list.  See [Parent and subordinate resources](#parent-and-subordinate-resources) clause. |
| `Comparison` | string | The condition used to compare the value of the property to `Values`. See the [Comparison](#comparison) clause. |
| `Values` | array | The value(s) used to perform a `Comparison`. Multiple values are only allowed for `AnyOf` or `AllOf` comparisons.  If no `Comparison` property is present, the comparison is assumed to be an `AnyOf` comparison. |
| `CompareProperty` | string | The name of the property in this resource whose value is used to test this condition. The property name will be evaluated at the current object level within the resource.  If the property name is not found at the current level, upper levels will be searched until the root level is reached. See the [Compare Property](#compare-property) clause.|
| `CompareValues` | array | Values of the CompareProperty used to test this condition. See the [Compare Property](#compare-property) clause. |
| `CompareType` | string | The condition used to compare the value of the property named by `CompareProperty` to the value of `CompareValues`.  If the comparison is true, this conditional requirement applies. See the [Compare Property](#compare-property) clause. |


###### Parent and subordinate resources

Because there can be several instances of a particular Redfish schema in the resource tree, the requirements placed on those resources may vary depending on their usage.  Since the Profile is schema-centric, the `SubordinateToResource` function allows a Profile to specify requirements based a resource instance's placement in the resource tree.

`SubordinateToResource` allows specifying the schema (resource) path from parent resources to the resource to which the requirements apply.  This property contains an array of schema names, in the top-down order that they appear in the path to the required resource.


###### Example

For the property `HostName` in the `EthernetInterface` schema, the example shows it as `Recommended` property.  But if an instance of `EthernetInterface` is linked from a `ComputerSystem` resource, through the `EthernetInterfaceCollection`,  the `Condition` is met, which changes the `HostName` property requirement to `Mandatory`.

In the second part of the example, the `IPv6Addresses` array property is required to have at least one item (`MinCount`) in the array.  But if, as above, the instance is subordinate to a `ComputerSystem` (and `EthernetInterfaceCollection`) resource,  at least two items are required in the array.

~~~
   "EthernetInterface": {
      "PropertyRequirements": {
         "HostName": {
            "ReadRequirement": "Recommended",
            "WriteRequirement": "Recommended",
            "ConditionalRequirements": [{
               "SubordinateToResource": ["ComputerSystem", "EthernetInterfaceCollection"],
               "ReadRequirement": "Mandatory",
               "Purpose": "Host Name is used to match this instance to other data sources.",
            }]
         },
         "IPv6Addresses": {
            "ReadRequirement": "Mandatory",
            "MinCount": 1,
            "ConditionalRequirements": [{
               "SubordinateToResource": ["ComputerSystem", "EthernetInterfaceCollection"],
               "MinCount": 2
            }]
         }
      }
   }
~~~

###### Compare property

A typical need for a conditional requirement is a dependency on the value of another property within the resource.  This type of dependency can be used when several different product variations share a common schema definition.  In that case, Redfish schemas normally define a type-specifying property with enumerations (for a variety of product categories) that can be used to differentiate Profile requirements by product category.

To accomplish this, there are three Profile properties related to this function:

| Property | Type | Description | 
| --- | --- | --- |
| `CompareProperty` | string | The name of the property in this resource whose value is used to test this condition. The property name will be evaluated at the current object level within the resource.  If the property name is not found at the current level, upper levels will be searched until the root level is reached.|
| `CompareType` | string |The condition used to compare the value of the property named by `CompareProperty` to the value of `Values`.  If the comparison is true,  this conditional requirement applies.|
| `CompareValues` | array | Values of the `CompareProperty` used to test this condition. |


###### Examples

Simple dependencies can be expressed using the conditional requirement and a comparison.  This example shows a `CompareProperty` condition applied to the `Pepperoni` property.  If the `PizzaType` property is not equal to `Cheese`, then the `Pepperoni` property becomes both mandatory and must have a value of `true`.

~~~
   "Pepperoni": {
      "ReadRequirement": "Recommended",
      "ConditionalRequirements": [{
         "Purpose": "Pepperoni is required on all pizza types except Cheese.",
         "CompareProperty": "PizzaType",
         "CompareType": "NotEqual",
         "CompareValues": ["Cheese"],
         "ReadRequirement": "Mandatory",
         "Comparison": "Equal",
         "Values": [ true ]
      }]
   },
~~~

This example shows a `CompareProperty` condition applied to the `IndicatorLED` property, which has a base `Recommended` requirement, but becomes `Mandatory` if the `SystemType` property has a value of `Physical` or `Composed`.

~~~
   "IndicatorLED": {
      "ReadRequirement": "Recommended",
      "ConditionalRequirements": [{
         "Purpose": "Physical and composed Systems must have a writable Indicator LED",
         "CompareProperty": "SystemType",
         "CompareType": "AnyOf",
         "CompareValues": ["Physical", "Composed"],
         "ReadRequirement": "Mandatory",
         "WriteRequirement": "Mandatory"
      }]
   },
~~~

#### Action requirements

Because several critical functions of a Redfish Service are implemented as `Actions`, the Profile may place requirements for support of these Actions.  The requirements can specify which Parameters must be supported, and may specify Allowable Values for those parameters.

The following functions are available to specify requirements for an Action within a Resource requirement:

| Property | Type | Description | 
| --- | --- | --- |
| `ReadRequirement` | string | The requirement to apply to this Action.|
| `Parameters` | object | The requirements for any parameter available for this Action. |
| `Purpose` | string | A description of the purpose of this requirement.  This text can provide justification or reasoning behind the requirement for use in the profile documentation. |

##### Parameters

The following functions are available to specify requirements for a parameter on a particular Action:

| Property | Type | Description | 
| --- | --- | --- |
| `ReadRequirement` | string | The requirement to apply to this parameter. |
| `ParameterValues` | array | The minimum set of enumerations that must be supported for this parameter to meet the Requirement. |
| `RecommendedValues` | array | For Mandatory parameters, the set of enumerations, in addition to those listed in `ParameterValues`, that are recommended for this parameter. |

##### Example

This example shows the `Reset` action as required for this resource, along with the required parameter `ResetType`, which must support the values of `ForceOff` and `PowerCycle`.

~~~
   "ActionRequirements": {
      "Reset": {
         "ReadRequirement": "Mandatory",
         "Purpose": "Ability to reset the unit is a core requirement of most users.",
         "Parameters": {
            "ResetType": {
               "ParameterValues": ["ForceOff", "PowerCycle", "On"],
               "RecommendedValues": ["GracefulShutdown", "GracefulRestart", "ForceRestart", "PushPowerButton"],
               "ReadRequirement": "Mandatory"
            }
         }
      }
   }
~~~         
         
### Registry-level requirements

While not normally part of the JSON resources, the Redfish-defined Message Registries are important for interoperability, as they indicate what functionality has been implemented for Events, and are also a useful method for setting expectations on the use of Extended Info error messages when interacting with a Redfish Service implementation.

The following functions are available to specify Registry-level requirements:

| Property | Type | Description | 
| --- | --- | --- |
| `Repository` | string | A URI providing the location of the repository which contains the JSON file(s) to be included.  The filenames of the JSON files contained in the repository are expected to follow the Redfish Message Registry filename conventions. If absent, the repository location shall be the Redfish Registry Repository (http://redfish.dmtf.org/registries).  |
| `MinVersion` | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|
| `ReadRequirement` | string | Resource-level requirement for this Registry; see [ReadRequirement](#readrequirement) clause. |
| `Purpose` | string | A description of the purpose of this requirement.  This text can provide justification or reasoning behind the requirement for use in the profile documentation. |
| `Messages` | object | The Messages in this Registry which have support requirements for this Redfish Profile. If this property is absent, all Messages in this Registry follow the registry-level `ReadRequirement`. |

#### Messages

Within the Registry object are additional objects that are named to match the Message name in the Registry definition.  This object then contains the message-level requirements.

The following options are available at the property level:

| Property | Type | Description | 
| --- | --- | --- |
| `ReadRequirement` | string | Message-level requirement for this Message; see the [ReadRequirement](#readrequirement) clause. |


#### Example

This example shows requirements for two Message Registries, including one OEM-defined registry.  The 'Base' Registry is a DMTF standard Registry (by default since no `OwningEntity` is listed) and therefore can be retrieved by default from the DMTF Repository. The 'Base' Registry lists only four Messages that are required. 

In the case of the OEM-defined Registry `ContosoPizzaMessages`, the `Mandatory` requirement set at the Registry level specifies that all Messages defined in that Registry are required.

~~~
   "Registries": {
      "Base": {
         "MinVersion": "1.1.0",
         "Messages": {
            "Success": {},
            "GeneralError": {},
            "Created": {},
            "PropertyDuplicate": {}
         }
      },
      "ContosoPizzaMessages": {
         "OwningEntity": "Other",
         "OwningEntityName": "Contoso",
         "Repository": "http://contoso.com/registries",
         "ReadRequirement": "Mandatory"
      }
   }
~~~
   
## Change log

| Version | Date | Description |
| --- | --- | --- |
| 1.1.0 | 2019-02-26 |  Added support for new protocol features from Redfish Specification v1.6. Added ability to make requirements based on URI patterns as specified in Redfish schema files.  Updated normative references to current versions.  Clarified that `Repository` value may indicate a Profile or Schema file location, as appropriate.  Formatting improvements. |
| 1.0.1 | 2018-05-15 |  Errata release.  Corrected definition of `Comparison` for Conditional Requirements to match the schema usage (and consistent with other usage).  Added missing `Values` property for Conditional Requirements and added new `CompareType` property to replace the inconsisent usage of `Comparison`.  Added example for a Conditional Requirement that uses the `Values` array. |
| 1.0.0 | 2018-01-02 |  Initial release. |
|   |   |   |
