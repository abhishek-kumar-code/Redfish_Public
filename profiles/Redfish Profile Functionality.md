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

Profile requirements do not allow for exclusions of data.  Implementations are always able to provide more data in their resources than required by a profile, as an implementation likely addresses multiple use cases or Profiles.
   
## Profile features

- Versioning
- #include other Profiles as a base
- Allow for standard or OEM profiles

## Protocol features
- Define protocol feature support
- Min spec version

## Resource (Schema) Level features

- Min version of schema def
- Allow for standard or OEM schema
- Locate schema definition from web

## Property Level features
- All requirements based on property name
- Support for one level of embedded object 
- Conditional requirement for subordinates
- Support for array instances
    - Min count
- 
	