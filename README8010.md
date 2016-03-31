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

Per DMTF policy, the following new schema files are currently undergoing a 30-day call for Essential Patent Rights.  Once completed and then approved by the DMTF Board of Directors, these schema files will be added to the Redfish schema repository.  They are currently available in the 'WorkInProgress' directory within the DSP8010 ZIP archive file.

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| Bios    | 1.0.0  | 2016-3-31 | Initial release.  Provides access to BIOS settings as part of a system, typically incorporating a Bios Attribute Registry. |
| BiosAttributeRegistry | 1.0.0  | 2016-3-31 | Initial release.  |
| Drive     | 1.0.0  | 2016-3-31 | Initial release. |
| Memory    | 1.0.0  | 2016-3-31 | Initial release.  Memory describes a memory module or similar memory device as part of a system. |  
| Storage    | 1.0.0  | 2016-3-31 | Initial release.  Describes a storage subsystem, including the controllers, disks and volumes associated with the subsystem. |  
| Volume    | 1.0.0  | 2016-3-31 | Initial release.  Describes a single Volume as part of a storage subsystem, disk, or other storage device. |

# Redfish Schema Change Log

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| (all files) | 1.0.2   | 2016-3-31 | Errata release of all schema files to adjust file naming conventions. CSDL schema files now have the major version appended to the end of the schema name (e.g. Chassis_v1), and json-schema files include the major/minor/errata version number (matching the namespace definitions in the schema as they did previously) in the filename, but are now prefaced with a 'v' and with underscore separators (e.g. Chassis.v1_0_2.json) to match the corrected namespace naming rules.  Added LongDescriptions to 'Links' and 'Actions' objects throughout.  Added 'Unit' annotations throughout.  Improved schema description text and whitespace consistency throughout.  |
| Chassis    | 1.2.0   | 2016-3-31  | Added Links for ManagersInChassis, Drives and Storage. |
| Chassis | 1.1.2   | 2016-3-31 | Errata release (see 1.0.2 errata description above).|
| ComputerSystem | 1.1.0 | 2016-3-31 | Added Links for 'Bios', 'Memory', 'Storage' and 'SecureBoot'.  Added 'MemoryMirroring' to the 'MemorySummary' object.  Added 'TrustedModule' object.  Added 'BootSourceOverrideMode' to 'Boot' object.  Added 'SDCard' and 'UefiHttp' enumerations to 'BootSourceOverrideTarget' in 'Boot' object. |
| Event      | 1.1.0  | 2016-3-31 | Added 'Context' property. |
| EventService | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected Unit annotations to use UCUM unit definitions. |
| Manager     | 1.1.0  | 2016-3-31 | Added Link for 'ManagerInChassis'. |
| ManagerNetworkProtocol | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. |  
| Power       | 1.1.0  | 2016-3-31 | Added 'InputRanges' array and 'Manufacturer' to 'PowerSupply' object.  Added enumerations to the 'LineInputVoltageType' property in 'PowerSupply' that promote better interoperability and deprecated others whose terminology differs in meaning among vendors. | 
| Power       | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. | 
| Resource    | 1.1.0 | 2016-3-31 | Added 'Identifier' object, 'Location' object and 'IndicatorLED' definition for use throughout the Redfish data model. |
| SessionService | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Added Unit annotations. |
| SimpleStorage | 1.1.0  | 2016-3-31 | Added 'CapacityBytes' to 'Device' object. |
| SimpleStorage | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected Unit annotations to use UCUM unit definitions. |
| Thermal     | 1.1.0  | 2016-3-31 | Added 'Name' to 'Fan' object.  Deprecated inconsistent 'FanName' in 'Fan'. |
| Thermal     | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. | 
| Chassis    | 1.1.0   | 2015-11-25 | Added 'PhysicalSecurity' object for Intrusion Detection sensor support. |
| Thermal     | 1.0.1  | 2015-9-17 | Errata release.  Renamed Fan 'ReadingRPM' property to 'Reading' as it was determined that the initial definition was too limiting. Added Fan property 'ReadingUnits' to allow for either RPM or percent-based fan readings.  Corrected spelling errors throughout. Any future property name changes will result in a major version change to the schema file. |
| Chassis     | 1.0.1   | 2015-9-17 | Errata release.  Added missing 'PowerState' property intended for inclusion in v1.0.0.  Corrected longDescription text of 'CooledBy'.  Clarified longDescription of 'Reset' action.  |
| ComputerSystem | 1.0.1  | 2015-9-17 | Errata release.  Changed enumeration values of 'PowerState' to reflect a better set of real-world use cases.  Corrected annotation name in longDescription of 'UefiTargetBootSourceOverride'. |
| Manager     | 1.0.1   | 2015-9-17 | Errata release.  Corrected longDescription text for both 'ManagerForChassis' and 'ManagerForSystem' |
| Power       | 1.0.1  | 2015-9-17 | Errata release.  Corrected longDescription text for 'IntervalInMin'  |
| VLanNetworkInterface | 1.0.1  | 2015-9-17 | Errata release.  Corrected maximum VLAN ID value.  |
| (all files) | 1.0.0   | various   | Initial release |
