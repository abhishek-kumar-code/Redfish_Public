---
DocTitle: Redfish Interoperability Profiles
DocNumber: '0xxx'
DocClass: Normative
DocVersion: '0.9.0'
modified: '2017-4-28'
status: work in progress
released: false
copyright: '2017'
---

# Redfish Interoperability Profiles

## Introduction

Because the Redfish Schemas are designed to provide signifcant flexibility, and allow conforming implementations on a wide variety of products, very few properties within the Schemas are required by the Specification.  But consumers and software developers need a more rigidly defined set of required properties (features) in order to accomplish management tasks.  This set allows users to compare implementations, specify needs to vendors, and allows software to rely on the availability of data.  To provide that "common ground", a Redfish Interoperabilty Profile allows the definition of a set of schemas and property requirements, which meet the needs of a particluar class of product or service.

The Redfish Interoperability Profile is a JSON document which contains Schema-level, Property-level, and Registry-level requirements.  At the property level, these requirements can include a variety of conditions under which the requirement applies. 

## Design Tenets

All profile entries (at the Profile, Resource, or Property level) are "additive".  That is, each requirement can only apply more rigid requirements which override less rigid requirements.

The profile document is a JSON document designed to minimize the work necessary to define a profile, by defining default values that allow the majority of requirements to be stated with minimal effort.    

The JSON document structure is intended to align easily with JSON payloads retreived from Redfish Service implementations, to allow for easy comparisons and conformance testing. 

Profile requirements do not allow for exclusions of data.  Implementations are able to provide more data in their resources than required by a profile, as an implementation likely addresses multiple use cases or Profiles.  This include both standard properties and OEM extensions.
   
## Profile Definition

### Basic functions

At the top level of the JSON document are the basic properties which describe the profile, including authorship and contact information, versioning, and other profiles to include in order to build upon previous work.

| property | type | description | 
| --- | --- | --- |
| ProfileName | string | The name of this Redfish Profile. |
| Author | string | The author(s) of this Redfish Profile. |
| Version | string | The version of this Redfish Profile. |
| Purpose | string | A description of the purpose of this Redfish Profile, such as its intended target audience, product segments, etc.|
| ContactInfo | string | An email address that can be used to provide feedback about this Redfish Profile. |
| RequiredProfiles | object | A set of Redfish Profiles which serve as a basis for this Profile.  The requirements set forth in these Profiles are included in this Profile. |

#### Required Profiles

The RequiredProfiles object contains properties (of type object) that are named to match the name of the profile to be included.  Each of these sub-objects contains the properties listed below.

| property | type | description | 
| --- | --- | --- |
| Repository | string | A URI providing the location of the repository which contains the file(s) to be included.  If absent, the location shall be the Redfish Schema Repository at redfish.dmtf.org |
| OwningEntity | string | Indicates whether this resource is defined by schema published by a standards body or an OEM. If this property is absent, the value shall be 'DMTF'.The author(s) of this Redfish Profile. |
| OwningEntityName | string | Name of the owning entity, when used with 'Other', follows 'Oem Property Naming' in the Redfish Specification |
| MinVersion | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|

### Example

The following is an example of the top-level properties in a Profile, with two Required profiles included.

~~~
	"@odata.type": "RedfishProfile.v1_0_0.RedfishProfile",
	"ProfileName": "Anchovy",
	"Version": "1.0.2",
	"Author": "Pizza Box Project",
	"Purpose": "This is a sample Redfish Interoperability profile.",
	"ContactInfo": "pizza@contoso.com",
	"RequiredProfiles": {
		"DMTFBasic": {
			"MinVersion": "1.0.0"
		},
		"ContosoPizza": {
			"OwningEntity": "Other",
			"OwningEntityName": "Contoso",
			"Repository": "contoso.com/profiles",
			"MinVersion": "1.0.0"
		}
	}
~~~

### Protocol requirements

An object named 'Protocol' contains properties which describe Redfish protocol functionality that is not related to the supported schemas or properties.  Therefore, these functions cannot be validated by comparing retreived JSON payloads.

| property | type | description | 
| --- | --- | --- |
| RedfishMinVersion | string |  The minimum version of the Redfish Specification protocol support required by this Profile. This version shall be reported by the Redfish Service in the ServiceRoot property 'RedfishVersion'.  If this property is absent, the minimum value shall be '1.0.0'. |
| DiscoveryRequired | boolean | Indicates that support of the Redfish SSDP Discovery protocol is required for this Profile. If this property is absent, the value shall be false. |

### Example 

~~~
	"Protocol": {
		"RedfishMinVersion": "1.2",
		"DiscoveryRequired": true
	}
~~~

## Resource (Schema) requirements

The primary content in a Redfish Profile is the set of supported property requirements.  As Redfish is organized and defined by schema-backed JSON resources, these requirements are also organized by schema.

For each schema, an object is created in the JSON document, named to match the schema's name.  Within this object, properties describe the location of the schema file, and schema-level requirements.  Within each schema-level object is a "PropertyRequirements" object that describes the property-level requirements for that schema.  The definition of both the schema/resource-level and property-level requirements are accomplished using the same mechanisms, which are described in the next section.  

The structure of the resource and property requirements is:
~~~
{
    <Schema Name>: {
       "MinVersion": "<version>"
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
		}
    },
	<Additional Schemas...>
~~~

### Schema level functions

The following options are available at the schema level:

| property | type | description | 
| --- | --- | --- |
| Repository | string | A URI providing the location of the repository which contains the file(s) to be included.  If absent, the location shall be the Redfish Schema Repository at redfish.dmtf.org |
| OwningEntity | string | Indicates whether this resource is defined by schema published by a standards body or an OEM. If this property is absent, the value shall be 'DMTF'.The author(s) of this Redfish Profile. |
| OwningEntityName | string | Name of the owning entity, when used with 'Other', follows 'Oem Property Naming' in the Redfish Specification |
| MinVersion | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|
| Requirement | object | Resource-level requirement for this schema, see Requirement section below. |
| Conditions | object | Resource-level conditional requirements that apply to instances of this schema, see Conditions section below. |

#### Example

This example shows a simple required schema 
~~~
	"ComputerSystem": {
		"MinVersion": "1.2.0",
		"PropertyRequirements": {
			"SerialNumber": {},
			"Manufacturer": {},
			"Model": {
				"Requirement": "Recommended"
			},
~~~

### Property level functions

Within the 'PropertyRequirements' object are additional objects which are named to match the property name in the parent object's schema definition.  This object then contains the property-level requirements, which account for the bulk of a Profile's definition.  One additional level of JSON objects may be embedded, essentially nesting a 'PropertyRequirements' object.

The following options are available at the property level:

| property | type | description | 
| --- | --- | --- |
| Requirement | string | Property-level requirement for this property, see Requirement section below. |
| Conditions | object | Property-level conditional requirements that apply to instances of this property, see Conditions section below. |
| Writeable | boolean | True if the property is required to be writeable by the user.  False or not present if the property may be read-only. |
| MinCount | integer | For array type properties, the minimum number of non-NULL instances within the array. |
| AllowableValues |  array | The minimum set of enumerations that must be supported for this writeable property. |
| EnumValues | array | The minimum set of enumerations which must be supported for this property. |
| PropertyRequirements | object | For Redfish properties of type 'object', this object contains requirements for the properties contained within the specified object. This specification allows for only one level of nested objects and requirements.|

#### Example

This example shows property-level requirements, including one of type 'object' containing further requirements on that object's properties.  For each 'Power' resource, the 'PowerSupplies' and 'Voltages' array properties are required.  'Voltages' has no further requirements (by default, this property is mandatory, and as an array type, must have at least one item in the array. The 'PowerSupplies' array must contain at least two (object) items.  Within the array, at least one item's 'PowerSupplyType' property must have a value of 'AC' or 'DC'.

~~~
	"Power": {
		"PropertyRequirements": {
			"PowerSupplies": {
				"Requirement": "Mandatory",
				"MinCount": 2,
				"PropertyRequirements": {
					"Status": {},
					"PowerSupplyType": {
						"Requirement": "AnyOf",
						"EnumValues": [ "AC", "DC" ]
					},
					"LineinputVoltage": {},
					"PowerCapacityWatts": {},
					"InputRanges": {
						"Requirement": "Recommended"
					}
				}
			},
			"Voltages": {}
		}
	},
~~~		
		

### Requirement

This function specifies the level of requirement applied to the resource or property.  

| value | description |
| --- | --- |
| Mandatory |  This property is required in all instances of this resource. For properties of type 'array', the property is required in all non-NULL array items. If 'EnumValues' are listed, at least one instance of each enumeration value is required among instance(s) of this property.|
| AnyOf | This property is required and at least one of the values listed in 'EnumValues' must be present in an instances of this property.  One of the enumerations listed must be present in one or more instances of this property in this resource. |
| Recommended | It is recommended, but not required, that this property be supported. |
| IfImplemented | This property is required if the underlying functionality is implemented. For properties of type 'object', requirements on embedded properties within the object will only apply if the object is present. |
| Conditional | This property is only required if one or more 'Condition' items apply to this instance of the resource. |
| None | This property is not required by this profile.  It is listed here for clarity. |


### Condition

The most flexible aspect of the Redfish Profile definition is the ability to make resource or property-level requirements that are dependent on one or more conditions within the resource and the parent resource(s) in the resource tree.

The 'Condition' array function specifies these conditional requirements, which add to any requirements also defined for the resource or property.  Note that a condition cannot override or weaken a requirement already specified.  For example, if a property requirement is marked as 'Mandatory', no conditional requirement could mark the property as 'None'.  Instead, the property would be specified with a 'None' requirement, and with one or more conditions that would specify when the property requirement becomes 'Mandatory'.

The following options are available for each conditional requirement:

| property | type | description | 
| --- | --- | --- |
| Requirement | string | The requirement to apply to the resource or property if the condition is met.|
| Purpose | string | Text describing the purpose of this conditional requirement. |
| Writeable | boolean | Condition applies if the property is writeable. |
| SubordinateToResource | array | An ordered list (from top of heirarchy to bottom) of resources where this resource is linked as as subordinate resource.  The conditional requirements listed for the resource apply only to instances which are subordinate to the listed parent resource list.  See Parent and subordinate resources section below. |
| KeyProperty | string | The name of the property in this resource whose value is used to test this condition. The property name will be evaluated at the current object level within the resource.  If the property name is not found at the current level, upper levels will be searched until the root level is reached. See the Key and Values section below.|
| KeyCondition | string | The condition used to compare the value of the property named by 'KeyProperty' to the value of 'KeyValues'.  If the comparison is true, then this conditional requirement applies. See the Key and Values section below. |
| KeyValues | array | Values of the KeyProperty used to test this condition. See the Key and Values section below.|


#### Parent and subordinate resources

##### Example

~~~
	"HostName": {
		"Requirement": "Recommended",
		"Conditions": [{
			"SubordinateToResource": ["ComputerSystem", "EthernetInterfaceCollection"],
			"Requirement": "Mandatory"
		}]
	},
	"IPv6Addresses": {
		"Requirement": "Mandatory",
		"MinCount": 1,
		"Conditions": [{
			"SubordinateToResource": ["ComputerSystem", "EthernetInterfaceCollection"],
			"MinCount": 2
		}]
	},
~~~
#### Keys and Values

#### Example

This example shows a Key Property condition applied to a single property.  

~~~
	"IndicatorLED": {
		"Requirement": "Recommended",
		"Conditions": [{
			"Purpose": "Physical and composed Systems must have a writable Indicator LED",
			"Requirement": "Mandatory",
			"KeyCondition": "AnyOf",
			"KeyProperty": "SystemType",
			"KeyValues": ["Physical", "Composed"],
			"Writeable": true
		}]
	},
~~~

### Action Requirements
#### Parameters

## Registry level functions

# Change Log

| version | date | changes |
| --- | --- | --- |
| v0.9 | 5-14-17 | Work In Progress release. |
