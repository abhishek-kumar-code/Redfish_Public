---
DocTitle: Redfish API Schema Readme
DocNumber: '8010'
DocClass: Informative
DocVersion: '1.0.2'
modified: '2016-03-31'
status: published
released: true
copyright: '2015-2016'
---
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - this file is the main Redfish Scalable Platforms Management API Specification.
* DSP2044 - Redfish Whitepaper - this is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - this is a mockup that can be used as sample of output from GETs from A Redfish service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - this contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.

# Redfish Work in Progress Schemas

The following new schema files are released as Work In Progress documents. 

IMPORTANT: This document is not final. It does not necessarily reflect the views of the DMTF or its members. Because this document is a Work in Progress, this document may still change, perhaps profoundly and without notice. This document is available for public review and comment until superseded.


| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| FirmwareInventory  | 0.9.0  | 2016-4-13 | An entry for a single Firmware entity managed by a Redfish Service. |
| FirmwareInventoryCollection  | 0.9.0  | 2016-4-13 | A collection of Firmware entities managed by a Redfish Service. |
| PCIeDevice  | 0.9.0  | 2016-4-13 | This is the schema definition for the PCIeDevice resource.  It represents the properties of a PCIeDevice attached to a System. |
| PCIeDeviceCollection  | 0.9.0  | 2016-4-13 | A collection of PCIeDevice resources. |
| PCIeFunction  | 0.9.0  | 2016-4-13 | This is the schema definition for the PCIeFunction resource.  It represents the properties of a PCIeFunction attached to a System. |
| PCIeFunctionCollection | 0.9.0  | 2016-4-13 | A collection of PCIeFunction resources. |
| PCIePort  | 0.9.0  | 2016-4-13 | This is the schema definition for the PCIePort resource.  It represents the properties of a PCIePort attached to a System.|
| PCIePortCollection  | 0.9.0  | 2016-4-13 | A collection of PCIePort resources. |
| PCIeSwitch  | 0.9.0  | 2016-4-13 |This schema defines a PCIeSwitch and its respective properties. |
| PCIeSwitchCollection | 0.9.0  | 2016-4-13 | A collection of PCIeSwitch resources.|
| PCIeZone  | 0.9.0  | 2016-4-13 | This is the schema definition for the PCIe zone resource. It represents the properties of a PCIe zone created on the PCIe switch.|
| PCIeZoneCollection  | 0.9.0  | 2016-4-13 | A collection of PCIeZone resources. |
| ServiceRoot  | 1.1.0  | 2016-4-13 | Update to add link to the UpdateService. |
| UpdateService  | 0.9.0  | 2016-4-13 | The Firmware Update Service. It represents the properties for the service itself and has link to a collection of inventory. |
