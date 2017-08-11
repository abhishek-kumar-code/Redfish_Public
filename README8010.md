---
DocTitle: Redfish API Schema Readme
DocNumber: '8010'
DocClass: Normative
DocVersion: '2017.2'
modified: '2017-08-11'
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


# Redfish Schema Change log

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| Memory | 1.3.0 | 2017-08-11 | Deprecated "FunctionClasses".  Added memory module-centric identification properties "ModuleManufacturerID", "ModuleProductID", "MemorySubsystemControllerManufacturerID", and "MemorySubsystemControllerProductID".  Deprecated the PCIe-centric identification properties "VendorID", "DeviceID", "SubsystemVendorID", and "SubsystemDeviceID". |
| PhysicalContext | 1.2.0 | 2017-08-11 | Added "Chassis" and "Fan" as enumerations to "PhysicalContext". |
| Power | 1.4.0 | 2017-08-11 | Added "PhysicalContext" to the "PowerControl" object. |
| Resource | 1.5.0 | 2017-08-11 | Added several objects and properties to "Location" to enable reporting of physical locations at the building, room and intra-chassis levels.  Deprecated "Info" and "InfoFormat" in favor of the new, structured Location properties. |
| Role | 1.2.0 | 2017-08-11 | Added "RoleId" property to enable references from ManagerAccount resources. |
| Settings | 1.1.0 | 2017-08-11 | Added "SupportedApplyTimes" to allow control over the application of Settings to a resource. This includes support for specifying maintenance windows. |
| Storage | 1.2.0 | 2017-08-11 | Added common "Name" property to "StorageController" object. |
| AccountService | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "ServiceEnabled" usage. |
| Chassis | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| ComputerSystem | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| EventDestination | 1.x.x | 2017-08-11 | Errata release. Added clarifications to "OriginResources" and "MessageId" usage. |
| EventService | 1.x.x | 2017-08-11 | Errata release. Added clarifications to "DeliveryRetryAttempts" usage. |
| Manager | 1.x.x | 2017-08-11 | Errata release. Corrected enumeration descriptions for "CommandShell". |
| ManagerAccount | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "RoleId" usage. |
| Power | 1.x.x | 2017-08-11 | Errata release.  Removed the errant auto-expand annotation within "Redundancy". |
| Resource | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| SerialInterface | 1.x.x | 2017-08-11 | Errata release.  Removed errant periods in enumeration strings. |
| SessionService | 1.x.x | 2017-08-11 | Errata release.  Added clarifications to "ServiceEnabled" usage. |
| Thermal | 1.x.x | 2017-08-11 | Errata release.  Removed the errant auto-expand annotation within "Redundancy". |
| CollectionCapabilities | 1.0.0 | 2017-04-14 | Initial release. Describes the capabilities of a collection in terms of how a client is able to create new resources within the collection. |
| CompositionService | 1.0.0 | 2017-04-14 | Initial release. Describes a Composition Service used to create systems from available resources or Resource Blocks.  It includes the properties of the Service as well as links to the actual resources available for composition. |
| ResourceBlock | 1.0.0 | 2017-04-14 | Initial release. Represents a Resource Block, its components, and any affinity to a composed device. |
| ResourceBlockCollection | 1.0.0 | 2017-04-14 | Initial release. A collection of Resource Blocks. |
| Chassis | 1.5.0 | 2017-04-14 | Added link to ResourceBlocks. |
| ComputerSystem | 1.4.0 | 2017-04-14 | Added "TotalSystemPersistentMemoryGiB" to "MemorySummary".  Added link to ResourceBlocks. |
| Drive | 1.2.0 | 2017-04-14 | Added link to Chassis. |
| EthernetInterface | 1.3.0 | 2017-04-14 | Added link to Chassis. |
| Memory | 1.2.0 | 2017-04-14 | Added properties for describing and allocating memory regions. |
| PhysicalContext | 1.1.0 | 2017-04-14 | Added "Memory" as an enumeration value. |
| Resource | 1.4.0 | 2017-04-14 | Added "PowerCycle" as an enumeration value for "ResetType". Modified descriptions of "ResetType" to remove system-centric text. Corrected the validation pattern for properties using the UUID format (only JSON Schema versions). |
| ServiceRoot | 1.2.0 | 2017-04-14 | Added link to CompositionService. |
| Storage | 1.2.0 | 2017-04-14 | Added "FCP" and "FICON" as enumeration values for "Protocol". |
| UpdateService | 1.2.0 | 2017-04-14 | Added "HttpPushUriTargets" and "HttpPushUriTargetsBusy" properties and "Targets" optional parameter (for "SimpleUpdate") to allow selection of a particular target device or devices. |
|Endpoint | 1.0.2 | 2017-04-14 | Errata release.  Corrected validation pattern on PCI ID-related properties.  Removed unnecessary schema reference inclusions from CSDL schema. |
| EventDestination | 1.1.3, 1.0.4 | 2017-04-14 | Marked "Context" property as Required instead of RequiredOnCreate.  Service is required to provide the "Context" (may be NULL), but clients are not required to specify a context when creating a new Event Destination. |
|PCIeFunction | 1.0.2 | 2017-04-14 | Errata release.  Corrected validation pattern on PCI ID-related properties. | 
| (many) | various | 2017-04-14 | Minor release.  Added Actions and OemActions objects to allow for OEM extensions. |
| (many) | various | 2017-04-14 | Errata release.  Corrected integer type properties in CSDL schemas to Int64 (from Int16 or Int32) for consistency.  Added missing descriptions in Complex Type definitions.  Added Actions and OemActions objects to allow for OEM extensions. Corrected Links and "Members" properties (Collection schemas) in all schemas to be non-nullable. |
| HostInterface | 1.0.0 | 2016-12-07 | Intial release. Contains properties for describing and configuring a Redfish Host Interface. |
| HostInterfaceCollection | 1.0.0 | 2016-12-07 | Initial release. Collection of Redfish Host Interfaces. |
| NetworkAdapter | 1.0.0 | 2016-12-07 | Intial release. Describes general-purpose network adapters. |
| NetworkAdapterCollection | 1.0.0 | 2016-12-07 | Intial release. Collection of Network Adapters. |
| NetworkInterface | 1.0.0 | 2016-12-07 | Intial release. Provides linkages between NetworkAdapter, NetworkPort, and NetworkDeviceFunction instances. |
| NetworkInterfaceCollection | 1.0.0 | 2016-12-07 | Intial release. Collection of Network Interfaces. |
| NetworkDeviceFunction | 1.0.0 | 2016-12-07 | Intial release. Describes a logical interface exposed by a Network Adapter. |
| NetworkDeviceFunctionCollection | 1.0.0 | 2016-12-07 | Intial release. Collection of Network Device Functions. |
| NetworkPort | 1.0.0 | 2016-12-07 | Intial release. Describes a discrete physical port capable of connecting to a network. |
| NetworkPortCollection | 1.0.0 | 2016-12-07 | Intial release. Collection of Network Ports. |
| PrivilegeRegistry | 1.0.0 | 2016-12-07 | Initial release. Schema for definition of HTTP Operation to Privilege mapping. |
| AccountService | 1.1.0 | 2016-12-07 | Added link to "PrivilegeMap". |
| Chassis | 1.4.0  | 2016-12-07 | Added "RackGroup" to "ChassisType" enumeration.  Added link to "NetworkAdapters" resource collection. Added "HeightMm", "WidthMm", "DepthMm", and "WeightKg" properties. Added Link to "PCIeDevices". |
| ComputerSystem | 1.3.0  | 2016-12-07 | Added link to "NetworkDevices" resource collection. Added "FirmwareVersion2" and "InterfaceTypeSelection" to "TrustedModules" object. |
| EthernetInterface | 1.2.0 | 2016-12-07 | Added link to "HostInterface" to support Redfish Host Interface specification. |
| Manager | 1.3.0 | 2016-12-07 | Added link to "HostInterfaces" resource collection. |
| ManagerNetworkProtocol | 1.1.0 | 2016-12-07 | Added "DHCP" protocol object. |
| Memory     | 1.1.0 | 2016-12-07 | Added "Status" object.  |
| MemoryDomain   | 1.1.0 | 2016-12-07 | Added "AllowsMirroring" and "AllowsSparing" properties.  |
| Resource | 1.3.0 | 2016-12-07 | Added "PostalAddress" and "Placement" objects to "Location", each contaning numerous properties for detailed location information. |
| SoftwareInventory | 1.1.0 | 2016-12-07 | Added "SoftwareId", "LowestSupportedVersion", "UefiDevicePaths" and "RelatedItem" properties. |
| Thermal | 1.2.0 | 2016-12-07 | Added "Manufacture", "Model", "SerialNumber", "PartNumber", "SparePartNumber" and "IndicatorLED" to "Fan" object. |
| UpdateService | 1.1.0 | 2016-12-07 | Added "HttpPushUri" property. |
| (all files) | various | 2016-12-07 | Errata release.  Added explicit permissions annotations to all properties to clearly show which properties are read-write vs. read-only. Corrected Permission annotation with invalid enumeration references. Removed permissions annotation from embedded objects (permissions now on every property).  Removed permission annotations from CSDL Type definitions to avoid conflicts with property definitions. Corrected all property descriptions to always end with a period. |
| ComputerSystem | 1.0.4  | 2016-12-07 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| ComputerSystem | 1.1.2  | 2016-12-07 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| ComputerSystem | 1.2.1  | 2016-12-07 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| Port | 1.0.1 | 2016-12-07 | Corrected CSDL Type of "CurrentSpeedGbps" and "MaxSpeedGbps" from 'Int64' to 'Decimal'. |
| Power | 1.2.1 | 2016-12-07 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| Power | 1.1.1 | 2016-12-07 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| Power | 1.0.3 | 2016-12-07 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| ServiceRoot | 1.1.1 | 2016-12-07 | Added missing EntityContainer for "ServiceContainer" in CSDL schema. |
| (all files) | various | 2016-8-12 | Corrected Reference URI links to OData v4 (errata 3) and added Capabilities annotations to CSDL files. |
| ActionInfo | 1.0.0 | 2016-8-12 | Initial release.  ActionInfo describes the parameters and other information necessary to perform a Redfish Action to a particular Action target.  |
| Endpoint | 1.0.0 | 2016-8-12 | Initial release.  An Endpoint is an entity that sends or receives protocol defined messages over a transport. |
| EndpointCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Endpoints. |
| Fabric | 1.0.0 | 2016-8-12 | Initial release.  A Fabric consists of one or more Switches and may include  Endpoints and Zones. |
| FabricCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Fabric resources.|
| MemoryChunks | 1.0.0 | 2016-8-12 | Initial release.  Describes a Memory Chunk and memory Interleve Sets. |
| MemoryChunksCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Memory Chunks. |
| MemoryDomain | 1.0.0 | 2016-8-12 | Initial release.  Memory Domains are used to indicate to the client which Memory (DIMMs) can be grouped together in Memory Chunks to form interleave sets or otherwise grouped together. |
| MemoryDomainCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Memory Domains. |
| PCIeDevice | 1.0.0 | 2016-8-12 | Initial release.  Describes a PCIe Device attached to a system. |
| PCIeFunction | 1.0.0 | 2016-8-12 | Initial release.  Describes a PCIe Function. |
| Port | 1.0.0 | 2016-8-12 | Initial release.  Describes a Port of a Switch. |
| PortCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Ports. |
| SoftwareInventory | 1.0.0 | 2016-8-12 | Initial release.  Describes an inventory of software components. |
| SoftwareInventoryCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Software components. |
| Switch | 1.0.0 | 2016-8-12 | Initial release.  Describes a simple fabric Switch. |
| SwitchCollection| 1.0.0 | 2016-8-12 | Initial release.  Collection of Switches. |
| UpdateService | 1.0.0 | 2016-8-12 | Initial release.  Describes the Redfish Update Service. |
| VolumeCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Volumes. |
| Zone | 1.0.0 | 2016-8-12 | Initial release.  Describes a simple fabric Zone. |
| ZoneCollection | 1.0.0 | 2016-8-12 | Initial release.  Collection of Zones. |
| Chassis | 1.3.0 | 2016-8-12 | Added "IPBasedDrive" to "ChassisType" enumerations.  |
| ComputerSystem | 1.2.0 | 2016-8-12 | Added "HostedServices" and "HostingRoles" properties.  Added  "MemoryDomains", "PCIeDevices", "PCIFunctions", and "Endpoints" links. Added "RemoteDrive" enumeration to "BootSourceOverrideTarget". |
| Drive | 1.1.0 | 2016-8-12 | Added "Operations" property and "Endpoints" link. |
| EthernetInterface | 1.1.0 | 2016-8-12 | Added "LinkStatus" property and "Endpoints" link. |
| EventDestination | 1.1.0 | 2016-8-12 | Added "OriginResources" and "MessageIds" properties. |
| LogEntry | 1.1.0 | 2016-8-12 | Added "EventType", "EventId", and "EventTimeStamp" properties. |
| Manager | 1.2.0 | 2016-8-12 | Added "PowerState" property. |
| MemoryMetrics | 1.1.0 | 2016-8-12 | Added "PredictedMediaLifeLeftPercent" property to the "HealthData" object. |
| Power | 1.2.0 | 2016-8-12 | Added "IndicatorLED" property to "PowerSupply" object. |
| Redundancy | 1.1.0 | 2016-8-12 | Added "RedundancyEnabled" property. |
| Resource | 1.2.0 | 2016-8-12 |  Added "Deferring", "Quiesced", and "Updating" to "State" enumerations. |
| ServiceRoot | 1.1.0 | 2016-8-12 | Added links to "Fabrics", "StorageSystems", "StorageServices" and "UpdateService".  |
| SessionService | 1.1.0 | 2016-8-12 | Added OEM Action capabilities. |
| Storage | 1.1.0| 2016-8-12 | Added "Links" object and "Endpoints" link. |
| ComputerSystem | 1.1.1 | 2016-8-12 | Errata release.  Clarified description of ComputerSystem and the "UUID" property. |
| ComputerSystem | 1.0.3 | 2016-8-12 | Errata release.  Clarified description of ComputerSystem and the "UUID" property. |
| Drive | 1.0.1 | 2016-8-12 | Errata release.  Added "Unencrypted" enumeration to EncryptionStatus and deprecated misspelled enumeration. |
| Event | 1.1.1 | 2016-8-12 | Errata release.  Deprecated "Context" property in favor of the Event-specific "Context" contained within each Event. |
| Event | 1.0.3 | 2016-8-12 | Errata release.  Deprecated "Context" property in favor of the Event-specific "Context" contained within each Event.  |
| IPAddresses | 1.0.3 | 2016-8-12 | Errata release.  Corrected validation patterns for "IPv4Address" and "SubnetMask".  Added validation pattern for "Gateway". |
| Message | 1.0.3 | 2016-8-12 | Errata release.  Corrected "MessageId" to mark it as a required property. |
| Resource | 1.1.1 | 2016-8-12 | Errata release.  Removed errant "ReferenceableMember" entity type. |
| ServiceRoot | 1.0.3 | 2016-8-12 | Corrected validation pattern annotation for "RedfishVersion".  |
| Storage | 1.0.1 | 2016-8-12 | Corrected type definition of the "Volumes" link. |
| Volume  | 1.0.1 | 2016-8-12 | Corrected description of "VolumeType". |
| AttributeRegistry | 1.0.0  | 2016-5-14 | Initial release.  An Attribute Registry is a set of key-value pairs that are specific to a particular implementation or product, such that creating standardized property names would be impractical.  This schema describes the structure of a Registry, and also includes mechanisms for building user interfaces (menus) allowing consistent navigation of the contents.|
| Bios    | 1.0.0  | 2016-5-14 | Initial release.  Bios contains properties surrounding a BIOS Attribute Registry (where the system-specific BIOS attributes are described) and the Actions needed to perform changes to BIOS settings, which typically require a system reset to apply.|
| Drive     | 1.0.0  | 2016-5-14 | Initial release.  Drive contains properties describing a single physical disk drive for any system, along with links to associated Volumes. |
| Memory    | 1.0.0  | 2016-5-14 | Initial release.  Memory describes a memory module or similar memory device as part of a system. |
| MemoryCollection | 1.0.0 | 2016-5-14 | Initial release.  A Collection of Memory resource instances. |
| MemoryMetrics | 1.0.0 | 2016-5-14 | Initial release.  MemoryMetrics contains usage and health statistics for a single Memory module or device instance. |
| SecureBoot | 1.0.0  | 2016-5-14 | Initial release.  This resource contains UEFI Secure Boot information. It represents properties for managing the UEFI Secure Boot functionality of a system. |
| Storage    | 1.0.0  | 2016-5-14 | Initial release.  Storage defines a storage subsystem and its respective properties.  A storage subsystem represents a set of storage controllers (physical or virtual) and the resources such as volumes that can be accessed from that subsystem. |  
| StorageCollection    | 1.0.0  | 2016-5-14 | Initial release.  A Collection of Storage resource instances. |
| Volume    | 1.0.0  | 2016-5-14 | Initial release.  Volume contains properties used to describe a volume, virtual disk, LUN, or other logical storage entity for any system. |
| (all files) | 1.0.2   | 2016-3-31 | Errata release of all schema files to adjust file naming conventions. CSDL schema files now have the major version appended to the end of the schema name (e.g., Chassis_v1), and json-schema files include the major/minor/errata version number (matching the namespace definitions in the schema as they did previously) in the filename, but are now prefaced with a 'v' and with underscore separators (e.g., Chassis.v1_0_2.json) to match the corrected namespace naming rules.  Added LongDescriptions to 'Links' and 'Actions' objects throughout.  Added 'Unit', 'Minimum', and 'Maximum' annotations throughout.  Defined all unversioned resources in CSDL as 'abstract'.  Corrected all string properties with enumerations to allow use of null (nullable).  Marked all 'Links' and other NavigationProperties and embedded objects (ComplexTypes) as non-nullable.  Improved schema description text, updated RFC references, and whitespace consistency throughout.  |
| (all Collections) | n/a | 2016-3-31 | Corrected URI of the schema locations to the /schemas/v1 repository instead of the /schema location, which contains only the latest version of each schema. Corrected missing 'anyOf' structure to allow 'idref' references to collections. |
| (all files) | (various) | 2016-3-31 | Copies of all previously-released Redfish json-schema files have been created to follow the corrected json-schema filename format (v1_n_n instead of 1.n.n).  The internal schema name references were updated to match this style, but otherwise the files are identical to their originally released content. |
| Chassis    | 1.2.0   | 2016-3-31  | Added Links for ManagersInChassis, Drives, and Storage. |
| Chassis | 1.1.2   | 2016-3-31 | Errata release (see 1.0.2 errata description above).  Corrected description for ManagedBy link.  Deprecated 'Unknown' enumeration value for 'IndicatorLED'. |
| ComputerSystem | 1.1.0 | 2016-3-31 | Added Links for 'Bios', 'Memory', 'Storage', and 'SecureBoot'.  Added 'MemoryMirroring' to the 'MemorySummary' object.  Added 'TrustedModule' object.  Added 'BootSourceOverrideMode' to 'Boot' object.  Added 'SDCard' and 'UefiHttp' enumerations to 'BootSourceOverrideTarget' in 'Boot' object. |
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
| Manager     | 1.0.1   | 2015-9-17 | Errata release.  Corrected longDescription text for both 'ManagerForChassis' and 'ManagerForSystem'. |
| Power       | 1.0.1  | 2015-9-17 | Errata release.  Corrected longDescription text for 'IntervalInMin'.  |
| VLanNetworkInterface | 1.0.1  | 2015-9-17 | Errata release.  Corrected maximum VLAN ID value.  |
| (all files) | 1.0.0   | various   | Initial release. |
