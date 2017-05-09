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

|     |     |     |
| --- | --- | --- |
| ProfileName | string | The name of this Redfish Profile. |
| Author | string | The author(s) of this Redfish Profile. |
| Version | string | The version of this Redfish Profile. |
| Purpose | string | A description of the purpose of this Redfish Profile, such as its intended target audience, product segments, etc.|
| ContactInfo | string | An email address that can be used to provide feedback about this Redfish Profile. |
| RequiredProfiles | object | A set of Redfish Profiles which serve as a basis for this Profile.  The requirements set forth in these Profiles are included in this Profile. |

#### Required Profiles

The RequiredProfiles object contains properties (of type object) that are named to match the name of the profile to be included.  Each of these sub-objects contains the properties listed below.

|     |     |     |
| --- | --- | --- |
| Repository | string | A URI providing the location of the repository which contains the file(s) to be included.  If absent, the location shall be the Redfish Schema Repository at redfish.dmtf.org |
| OwningEntity | string | Indicates whether this resource is defined by schema published by a standards body or an OEM. If this property is absent, the value shall be 'DMTF'.The author(s) of this Redfish Profile. |
| OwningEntityName | string | Name of the owning entity, when used with 'Other', follows 'Oem Property Naming' in the Redfish Specification |
| MinVersion | string | The minimum version required by this Redfish Profile. If this property is absent, the minimum value shall be '1.0.0'.|

### Protocol requirements

An object named 'Protocol' contains properties which describe Redfish protocol functionality that is not related to the supported schemas or properties.  Therefore, these functions cannot be validated by comparing retreived JSON payloads.

|     |     |     |
| --- | --- | --- |
| RedfishVersionMinimum | string |  The minimum version of the Redfish Specification protocol support required by this Profile. This version shall be reported by the Redfish Service in the ServiceRoot property 'RedfishVersion'.  If this property is absent, the minimum value shall be '1.0.0'. |
| DiscoveryRequired | boolean | Indicates that support of the Redfish SSDP Discovery protocol is required for this Profile. If this property is absent, the value shall be false. |


## Resource (Schema) requirements

- Min version of schema def
- Allow for standard or OEM schema
- Locate schema definition from web

## Property Level requirements
- All requirements based on property name
- Support for one level of embedded object 
- Conditional requirement for subordinates
- Support for array instances
    - Min count

## Registry requirements

	