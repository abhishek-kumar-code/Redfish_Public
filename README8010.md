---
DocTitle: Redfish API Schema Readme
DocNumber: '8010'
DocClass: Informative
DocVersion: '2016 Release 1'
modified: '2016-03-31'
status: published
released: True
copyright: '2015-2016'
---
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - this file is the main Redfish Scalable Platforms Management API Specification.
* DSP2044 - Redfish Whitepaper - this is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - this is a mockup that can be used as sample of output from GETs from A Redfish service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - this contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.

# Redfish Work in Progress Schemas

The following new schema files are released as Work In Progress documents.  They have also been submitted to the DMTF Board of Directors for approval, with a final release expected in May 2016.  Upon release, these schemas will be added to a new revision of the DSP8010-2016.1a.ZIP schema bundle, and the individual schema files will be added to the public schema repository at http://redfish.dmtf.org/schemas at that time.

IMPORTANT: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| AttributeRegistry | 1.0.0  | 2016-3-31 | Initial release.  An Attribute Registry is a set of key-value pairs which are specific to a particular implementation or product, such that creating standardized property names would be impractical.  This schema describes the structure of a Registry, and also includes mechanisms for building user interfaces (menus) allowing consistent navigation of the contents.|
| Bios    | 1.0.0  | 2016-3-31 | Initial release.  Bios contains properties surrounding a BIOS Attribute Registry (where the system-specific BIOS attributes are described) and the Actions needed to perform changes to BIOS settings, which typically require a system reset to apply.|
| Drive     | 1.0.0  | 2016-3-31 | Initial release.  Drive contains properties describing a single physical disk drive for any system, along with links to associated Volumes. |
| Memory    | 1.0.0  | 2016-3-31 | Initial release.  Memory describes a memory module or similar memory device as part of a system. |
| MemoryCollection | 1.0.0 | 2016-3-31 | Initial release.  A Collection of Memory resource instances. |
| MemoryMetrics | 1.0.0 | 2016-3-31 | Initial release.  MemoryMetrics contains usage and health statistics for a single Memory module or device instance. |
| SecureBoot | 1.0.0  | 2016-3-31 | Initial release.  This resource contains UEFI Secure Boot information. It represents properties for managing the UEFI Secure Boot functionality of a system. |
| Storage    | 1.0.0  | 2016-3-31 | Initial release.  Storage defines a storage subsystem and its respective properties.  A storage subsystem represents a set of storage controllers (physical or virtual) and the resources such as volumes that can be accessed from that subsystem. |  
| StorageCollection    | 1.0.0  | 2016-3-31 | Initial release.  A Collection of Storage resource instances. |
| Volume    | 1.0.0  | 2016-3-31 | Initial release.  Volume contains properties used to describe a volume, virtual disk, LUN, or other logical storage entity for any system. |

# Redfish Schema Change Log

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| (all files) | 1.0.2   | 2016-3-31 | Errata release of all schema files to adjust file naming conventions. CSDL schema files now have the major version appended to the end of the schema name (e.g. Chassis_v1), and json-schema files include the major/minor/errata version number (matching the namespace definitions in the schema as they did previously) in the filename, but are now prefaced with a 'v' and with underscore separators (e.g. Chassis.v1_0_2.json) to match the corrected namespace naming rules.  Added LongDescriptions to 'Links' and 'Actions' objects throughout.  Added 'Unit', 'Minimum' and 'Maximum' annotations throughout.  Defined all un-versioned resources in CSDL as 'abstract'.  Corrected all string properties with enumerations to allow use of null (nullable).  Marked all 'Links' and other NavigationProperties and embedded objects (ComplexTypes) as non-nullable.  Improved schema description text, updated RFC references and whitespace consistency throughout.  |
| (all Collections) | n/a | 2016-3-31 | Corrected URI of the schema locations to the /schemas/v1 repository instead of the /schema location, which contains only the latest version of each schema. |
| (all files) | (various) | 2016-3-31 | Copies of all previously-released Redfish json-schema files have been created to follow the corrected json-schema filename format (v1_n_n instead of 1.n.n).  The internal schema name references were updated to match this style, but otherwise the files are identical to their originally released content. |
| Chassis    | 1.2.0   | 2016-3-31  | Added Links for ManagersInChassis, Drives and Storage. |
| Chassis | 1.1.2   | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected description for ManagedBy link.  Deprecated 'Unknown' enumeration value for 'IndicatorLED'. |
| ComputerSystem | 1.1.0 | 2016-3-31 | Added Links for 'Bios', 'Memory', 'Storage' and 'SecureBoot'.  Added 'MemoryMirroring' to the 'MemorySummary' object.  Added 'TrustedModule' object.  Added 'BootSourceOverrideMode' to 'Boot' object.  Added 'SDCard' and 'UefiHttp' enumerations to 'BootSourceOverrideTarget' in 'Boot' object. |
| ComputerSystem | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Deprecated 'Unknown' enumeration value for 'IndicatorLED'. |
| Event      | 1.1.0  | 2016-3-31 | Added 'Context' property. |
| EventService | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected Unit annotations to use UCUM unit definitions. |
| JsonSchemaFile | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected text in 'Schema' property descriptions to reference "@odata.type" instead of "Type". | 
| Manager     | 1.1.0  | 2016-3-31 | Added Link for 'ManagerInChassis'. |
| Manager     | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected descriptions for 'ServiceEntryPointUUID' to correctly match the intent of the property. |
| ManagerNetworkProtocol | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. |  
| Power       | 1.1.0  | 2016-3-31 | Added 'InputRanges' array and 'Manufacturer' to 'PowerSupplies' object.  Added enumerations to the 'LineInputVoltageType' property in 'PowerSupplies' that promote better interoperability and deprecated others whose terminology differs in meaning among vendors. | 
| Power       | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. | 
| Resource    | 1.1.0 | 2016-3-31 | Added 'Identifier' object, 'Location' object and 'IndicatorLED' definitions for use throughout the Redfish data model.  Added 'UnavailableOffline' enumeration to 'State' in 'Status' object. |
| Resource   | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected missing Required annotation on 'Id' property. Added 'Pattern' Redfish annotation for 'Oem' property names. | 
| SessionService | 1.0.2 | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Added Unit annotations. |
| SimpleStorage | 1.1.0  | 2016-3-31 | Added 'CapacityBytes' to 'Devices' object. |
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
