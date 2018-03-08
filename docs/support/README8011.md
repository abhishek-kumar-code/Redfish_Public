---
DocTitle: Redfish Standard Registries
DocNumber: '8011'
DocClass: Normative
DocVersion: '2017.2'
modified: '2017-09-22'
status: published
released: True
copyright: '2015-2017'
---
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Scalable Platforms Management API Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - This is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.
* DSP8011 - Redfish Standard Registries - This contains a bundle of Redfish Standard Registry definitions.  This includes Message and Privilege Mapping registries.


# Redfish Registry Change log

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| Base | 1.2.0 | 2017-08-18 | Added 'ResourceNotFound', 'ResourceExhaustion', 'StringValueTooLong' and 'EmptyJSON' messages. Clarified description for 'PropertyValueFormatError'.  Corrected parameters for 'ResourceAlreadyExists'. |
| Redfish Privilege Registry | 1.0.2 | 2017-08-18 | Errata release.  Corrected 'ConfigureUsers' plurality privilege throughout. |
| Base | 1.1.0 | 2017-05-19 | Added 'ResourceInStandby' message. |
| Redfish Privilege Registry | 1.0.1 | 2017-05-19 | Initial release. |
| Base | 1.0.0 | 2015-11-25 | Initial release. |
