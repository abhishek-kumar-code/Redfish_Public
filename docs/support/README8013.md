---
DocTitle: Redfish Interoperability Profiles Bundle
DocNumber: '8013'
DocClass: Normative
DocVersion: '2019.1'
modified: '2019-02-26'
status: published
released: true
copyright: '2017-2019'
---

# Foreword

The following files are part of the Redfish development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP0272 - Redfish Interoperability Profile Specification - Specifies the structure and JSON document used to define and publish an interoperability profile used to check an implementation's conformance to a defined minimum set of functionality.
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - This is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.
* DSP8011 - Redfish Standard Registries - This contains the Redfish Registry definitions.  This bundle of Redfish registries includes Message registries used for Redfish-defined messages (including events) and Privilege maps.
* DSP8013 - Redfish Interoperability Profiles - A bundle of published Redfish Interoperability Profile documents as well as supporting schema and sample documents used for creating profiles.


# Redfish Interoperability Profile bundle contents

## Profile Construction Documents

The root folder of this bundle contains tools useful for constructing a new Redfish Interoperability Profile.  

* RedfishInteroperabilityProfile.v1_n_n.json - A JSON schema definition for a Redfish Interoperability Profile JSON document. This schema file can be used with a JSON schema validator to ensure that a created profile conforms to the Redfish Interoperability Profile Specification.
* SampleProfile.json - A sample profile JSON document that shows the features available in the profile definition.

## Profile folders

As Profiles are defined, approved and published, they will be added to folders in this bundle.  Each published profile is expected to include at least two files: the JSON document, which conforms to the profile schema, and a Profile Guide to document the contents of the profile.

As of this publication, there are no normative profiles (work-in-progress profiles are available separately).

## Utilities 

The DMTF has published several open source utilities to aid in the development of Redfish Interoperability Profiles. In addition, questions can also be posted in the Redfish User Forum (www.redfishforum.com).

### Redfish Interop Validator

https://github.com/DMTF/Redfish-Interop-Validator

The Redfish Interop Validator is a python3 tool that will validate a service based on an Interoperability profile given to the tool. The purpose of the tool is to guarantee that a specific service is compatible with vendor systems or system tools based on a vendor's specification in a profile.

### Documentation Generator

https://github.com/DMTF/Redfish-Tools

Creates end user documentation by combining the Redfish Schemas with a Profile document and any supplemental text provided by the profile author.


# Change log

| File                           | Version | Date       | Description |
| ---                            | ---     | ---        | ---         |
| RedfishInteroperabilityProfile | 1.1.0   | 2019-02-26 | Added support for basing requirements on URIs when applied with Redfish Specification v1.6 OpenAPI support.  Corrected the format of the 'Repository' property to use 'uri-reference' and clarified its description to reflect usage for profiles, schemas, and registries. |
| RedfishInteroperabilityProfile | 1.0.3   | 2018-11-29 | Errata release.  Corrected the type for 'CompareType' to allow for booleans, numbers, and strings. |
| RedfishInteroperabilityProfile | 1.0.2   | 2018-11-29 | Errata release.  Corrected the depth of 'additionalProperties' found in 'Parameters' for 'ActionProfile'. |
| RedfishInteroperabilityProfile | 1.0.1   | 2018-05-01 | Errata release.  Corrected inconsistent usage of the 'Comparison' property within Conditional Requirements.  Added missing 'Values' property to Conditional Requirements to enable specification of property values when a condition is met. |
| SampleProfile.json             | 1.0.3   | 2018-05-01 | Errata release.  Updated examples to reflect errata with v1.0.1 of the specification.  Added example to show a condition that also places requirements on the value of a property when a condition is met. |
| RedfishInteroperabilityProfile | 1.0.0   | 2017-11-17 | Initial release.  JSON schema used to define a Redfish Interoperability Profile. |
| SampleProfile.json             | 1.0.0   | 2017-11-17 | Initial release.  Sample document to show examples of the various profile features. |
