---
DocTitle: Redfish Standard Registries
DocNumber: '8011'
DocClass: Normative
DocVersion: '2019.1'
modified: '2019-04-03'
status: published
released: true
copyright: '2015-2019'
---

# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Scalable Platforms Management API Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP0272 - Redfish Interoperability Profile Specification - Specifies the structure and JSON document used to define and publish an interoperability profile used to check an implementation's conformance to a defined minimum set of functionality.
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - This is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are three Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML), JSON Schema, and OpenAPI schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.
* DSP8011 - Redfish Standard Registries - This contains the Redfish Registry definitions.  This bundle of Redfish registries includes Message registries used for Redfish-defined messages (including events) and Privilege maps.
* DSP8013 - Redfish Interoperability Profiles - A bundle of published Redfish Interoperability Profile documents as well as supporting schema and sample documents used for creating profiles.


# Redfish Registry Change log

| Registry File              | Version | Date       | Description |
| ---                        | ---     | ---        | ---         |
| Base                       | 1.5.0   | 2019-04-03 | Added 'SubscriptionTerminated' and 'PasswordChangeRequired' messages. |
| ResourceEvent              | 1.0.1   | 2018-11-29 | Corrected '@odata.type' and 'Id' property formats.  Corrected cases where 'ParamTypes' was incorrectly using 'value'. |
| TaskEvent                  | 1.0.1   | 2018-11-29 | Corrected '@odata.type' and 'Id' property formats.  Corrected cases where 'ParamTypes' was incorrectly using 'value'.  Fixed spelling of the 'TaskProgressChanged' event. |
| ResourceEvent              | 1.0.0   | 2018-08-10 | Initial release.  Defines messages to use for resource events. |
| TaskEvent                  | 1.0.0   | 2018-08-10 | Initial release.  Defines messages to use for task events. |
| Base                       | 1.4.0   | 2018-08-10 | Added 'NoOperation' message. |
| Base                       | 1.3.1   | 2018-08-10 | Errata release.  Clarified description and message text for 'GeneralError'. Implementations are expected to provide specific 'Resolution' for this message. |
| Redfish Privilege Registry | 1.0.3   | 2018-08-10 | Errata release.  Corrected 'ConfigureComponents' plurality privilege throughout. Corrected JSON object structure throughout.  |
| Base                       | 1.3.0   | 2018-04-05 | Added 'PropertyValueOutOfRange' and 'SessionTerminated' messages. |
| Base                       | 1.2.0   | 2017-08-18 | Added 'ResourceNotFound', 'ResourceExhaustion', 'StringValueTooLong' and 'EmptyJSON' messages. Clarified description for 'PropertyValueFormatError'.  Corrected parameters for 'ResourceAlreadyExists'. |
| Redfish Privilege Registry | 1.0.2   | 2017-08-18 | Errata release.  Corrected 'ConfigureUsers' plurality privilege throughout. |
| Base                       | 1.1.0   | 2017-05-19 | Added 'ResourceInStandby' message. |
| Redfish Privilege Registry | 1.0.1   | 2017-05-19 | Initial release. |
| Base                       | 1.0.0   | 2015-11-25 | Initial release. |
