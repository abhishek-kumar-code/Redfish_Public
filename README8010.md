---
DocTitle: Redfish API Schema Readme
DocNumber: '8010'
DocClass: Normative
DocVersion: '2017.3'
modified: '2017-11-17'
status: published
released: True
copyright: '2015-2017'
---
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Scalable Platforms Management API Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP0272 - Redfish Interoperability Profile Specification - Specifies the structure and JSON document used to define and publish an interoperability profile used to check an implementation's conformance to a defined minimum set of functionality.
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - This is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.
* DSP8011 - Redfish Standard Registries - This contains the Redfish Registry definitions.  This bundle of Redfish registries includes Message registries used for Redfish-defined messages (including events) and Privilege maps.
* DSP8013 - Redfish Interoperability Profiles - A bundle of published Redfish Interoperability Profile documents as well as supporting schema and sample documents used for creating profiles.


# Redfish Schema Change log

| Schema Name | Version | Release   | Description     |
| ---         | ---     | ---       | ---             |
| Assembly | 1.0.0 | 2017.3 | Initial release.  Contains manufacturing and assembly information for a piece of equipment. |
| BootOption | 1.0.0 | 2017.3 | Initial release. Contains information about a Boot Option contained within a system. |
| BootOptionCollection | 1.0.0 | 2017.3 | Initial release. A collection of Boot Options. |
| Protocol | 1.0.0 | 2017.3 | Initial release. Supporting schema file to hold definition of the common "Protocol" property. |
| Chassis | 1.6.0 | 2017.3 | Added link to Assembly resource. Added "StorageEnclosure" to "ChassisType". |
| ComputerSystem | 1.5.0 | 2017.3 | Added support for managing the boot order (Boot Options). Added "SubModel" to describe product model variations. Added Action for "SetDefaultBootOrder". Added "LogicalProcessorCount" to "ProcessorSummary".  Added links for "ConsumingComputerSystems" and "SupplyingComputerSystems". |
| Drive | 1.3.0 | 2017.3 | Added link to Assembly resource. |
| Endpoint | 1.1.0 | 2017.3 | Added "IPTransportDetails" object. |
| EthernetInterface | 1.4.0 | 2017.3 | Added multiple objects to allow for full configuration of DHCPv4 and DHCPv6. Added "IPv4StaticAddresses" to provide mechanism for specifying static IP addresses regardless of DHCP settings. Added "StaticNameServers" and "StatelessAddressAutoConfig" objects to support their configuration. |
| LogEntry | 1.3.0 | 2017.3 | Added "OemLogEntryCode" and "OemSensorType" properties to allow for legacy IPMI OEM definitions. |
| LogService | 1.1.0 | 2017.3 |  Added "LogEntryType" to describe the content type of a log. |
| Memory | 1.4.0 | 2017.3 | Added "VolatileSizeMib", "NonVolatileSizeMiB", "CacheSizeMiB", "LogicalSizeMiB" properties. Added "Location" object. |
| MemoryChunks | 1.2.0 | 2017.3 | Added "Status" object. |
| NetworkAdapter | 1.1.0 | 2017.3 | Added "Assembly" link. Added "Location" object to "Controllers" object. |
| NetworkDeviceFunction | 1.2.0 | 2017.3 | Added "Endpoints" to "Links" object. |
| PCIeDevice | 1.2.0 | 2017.3 | Added "Assembly" link. |
| PhysicalContext | 1.3.0 | 2017.3 | Added additional enumerations for "PhysicalContext". |
| Port | 1.1.0 | 2017.3 | Added "Location" object. |
| Power | 1.5.0 |  2017.3 | Added "PowerInputWatts", "PowerOutputWatts", and "EffciencyPercent" properties, "Location" object, and "Assembly" link to "PowerSupply" object. |
| Processor | 1.2.0 | 2017.3 | Added "Assembly" link. |
| Redundancy | 1.3.0 | 2017.3 | Added "NotRedundant" enumeration to "Mode".  Changed "Mode" to be writable. Removed duplicate description text that appears in the enumeration definitions. |
| Resource | 1.6.0 | 2017.3 | Added "Latitude", "Longitude" and "AltitudeMeters" to "Location" object. Added "NQN" and "NSID" to "DurableNameFormat". |
| ServiceRoot | 1.3.0 | 2017.3 | Added "Product" property for general product identification. Added "ProtocolFeaturesSupported" object to allow for discovery of supported optional Redfish protocol features. |
| Storage | 1.4.0 | 2017.3 | Added "Assembly" link. |
| Switch | 1.1.0 | 2017.3 | Added "Location" object. |
| Thermal | 1.4.0 | 2017.3 | Added "Assembly" links to "Fan" objects. Added "DeltaReadingCelsius", "DeltaPhysicalContext", "MaxAllowableOperatingValue", "MinAllowableOperatingValue", "AdjustedMaxAllowableOperatingValue", and "AdjustedMinAllowableOperatingValue" to "Temperatures" object. |
| VirtualMedia | 1.2.0 | 2017.3 | Added "InsertMedia" and "EjectMedia" Actions to provide standardized means for using virtual media features. Changed "Image", "Inserted", and "WriteProtected" to be writable. |
| Zone | 1.2.0 | 2017.3 | Added "Identifiers" property. |
| Bios | 1.0.3 | 2017.3 | Errata release. Corrected parameter descriptions in Actions. |
| Chassis | 1.x.x | 2017.3 | Errata release. Corrected parameter descriptions in Actions. |
| ComputerSystem | 1.x.x | 2017.3 | Errata release. Corrected parameter descriptions in Actions. Added descriptions for SystemType enumerations. |
| Drive | 1.x.x | 2017.3 | Errata release. Migrated definition of "Operations" object to the Drive schema. Corrected parameter descriptions in Actions. |
| Endpoint | 1.0.3 | 2017.3 | Errata release. Added schema annotations to prevent additional property definitions in "ConnectedEntity" and "PciId" definitions. |
| EthernetInterface | 1.x.x | 2017.3 | Errata release. Changed internal schema references to "IPAddresses" and "VLanNetworkInterface" to use abstract base types. |
| Event | 1.x.x | 2017.3 | Errata release. Changed internal schema location for "EventType" definitions. |
| EventDestination | 1.x.x | 2017.3 | Errata release. Changed internal schema location for "EventType" definitions. |
| EventService | 1.0.6 | 2017.3 | Errata release. Corrected parameter descriptions in Actions. |
| Fabric | 1.0.3 | 2017.3 | Errata release. Changed internal schema location for "FabricType" definitions. |
| IPAddresses | 1.0.6 | 2017.3 | Errata release. Changed internal schema references for "IPAddresses" and "VLanNetworkInterface" to use abstract base types. Corrected "PrefixLength" in "IPv6StaticAddresses" to be a read-write property. |
| LogEntry | 1.2.1 | 2017.3 | Errata release. Changed internal schema location for "EventType" definitions. Added descriptions to all enumerations. |
| LogService | 1.0.5 | 2017.3 | Errata release. Corrected parameter descriptions in Actions. |
| Manager | 1.x.x | 2017.3 | Errata release. Corrected parameter descriptions in Actions. |
| Memory | 1.x.x. | 2017.3 | Errata release. Corrected description of "OperatingSpeedMHz" to reflect changes in memory device reporting (value may be in MHz or MT/s, but will match published specifications in either case). Corrected parameters in Actions to show they are mandatory. |
| MemoryMetrics | 1.x.x | 2017.3 | Errata release. Corrected description of "AlarmTrips" regarding behavior upon system reset. |
| NetworkDeviceFunction | 1.x.x | 2017.3 | Errata release. Clarified descriptions "InitiatorName", "PrimaryTargetName", and "SecondaryTargetName" properties in the "iSCSIBoot" object. |
| PCIeFunction | 1.x.x | 2017.3 | Errata release. Changed internal schema references to "StorageController" to use abstract base types. |
| PhysicalContext | 1.x.x | 2017.3 | Errata release. Changed internal schema location for "PhysicalContext" definition. |
| Port | 1.0.3 | 2017.3 | Errata release. Changed internal schema location for "PortProtocol" definitions. Corrected parameter descriptions in Actions. |
| Power | 1.x.x | 2017.3 | Errata release. Changed internal schema references to "PhysicalContext" and "IndicatorLED" definitions. |
| PrivilegeRegistry | 1.x.x | 2017.3 | Errata release. Changed internal schema references to "PrivilegeType" definitions. |
| Privileges | 1.x.x | 2017.3 | Errata release. Changed internal schema location for "PrivilegeType". |
| Resource | 1.x.x | 2017.3 | Errata release. Changed internal schema location for numerous definitions. |
| Role | 1.x.x | 2017.3 | Errata release. Changed internal schema references to "PrivilegeType" definitions. |
| SecureBoot | 1.0.3 | 2017.3 | Errata release. Corrected parameters in Actions to show they are mandatory. |
| Storage | 1.x.x | 2017.3 | Errata release. Corrected parameters in Actions to show they are mandatory. Changed internal schema references to "Identifier" and "Protocol" definitions. |
| Switch | 1.0.3 | 2017.3 | Errata release. Changed internal schema references to "IndicatorLED", "PowerState", and "Protocol" definitions. Corrected descriptions of Actions. |
| TaskService | 1.x.x | 2017.3 | Errata release. Updated description of "LifeCycleEventOnTaskStateChange" to remove obsolete terminology. |
| VLanNetworkInterface | 1.x.x | 2017.3 | Errata release. Changed internal schema definition for "VLAN". |
| Memory | 1.3.0 | 2017.2 | Deprecated "FunctionClasses".  Added memory module-centric identification properties "ModuleManufacturerID", "ModuleProductID", "MemorySubsystemControllerManufacturerID", and "MemorySubsystemControllerProductID".  Deprecated the PCIe-centric identification properties "VendorID", "DeviceID", "SubsystemVendorID", and "SubsystemDeviceID". |
| PhysicalContext | 1.2.0 | 2017.2 | Added "Chassis" and "Fan" as enumerations to "PhysicalContext". |
| Power | 1.4.0 | 2017.2 | Added "PhysicalContext" to the "PowerControl" object. |
| Resource | 1.5.0 | 2017.2 | Added several objects and properties to "Location" to enable reporting of physical locations at the building, room and intra-chassis levels.  Deprecated "Info" and "InfoFormat" in favor of the new, structured Location properties. |
| Role | 1.2.0 | 2017.2 | Added "RoleId" property to enable references from ManagerAccount resources. |
| Settings | 1.1.0 | 2017.2 | Added "SupportedApplyTimes" to allow control over the application of Settings to a resource. This includes support for specifying maintenance windows. |
| Storage | 1.3.0 | 2017.2 | Added common "Name" property to "StorageController" object. |
| AccountService | 1.x.x | 2017.2 | Errata release.  Added clarifications to "ServiceEnabled" usage. |
| Chassis | 1.x.x | 2017.2 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| ComputerSystem | 1.x.x | 2017.2 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| EventDestination | 1.x.x | 2017.2 | Errata release. Added clarifications to "OriginResources" and "MessageId" usage. |
| EventService | 1.x.x | 2017.2 | Errata release. Added clarifications to "DeliveryRetryAttempts" usage. |
| Manager | 1.x.x | 2017.2 | Errata release. Corrected enumeration descriptions for "CommandShell". |
| ManagerAccount | 1.x.x | 2017.2 | Errata release.  Added clarifications to "RoleId" usage. |
| Power | 1.x.x | 2017.2 | Errata release.  Removed the errant auto-expand annotation within "Redundancy". |
| Resource | 1.x.x | 2017.2 | Errata release.  Added clarifications to "IndicatorLED" usage. |
| SerialInterface | 1.x.x | 2017.2 | Errata release.  Removed errant periods in enumeration strings. |
| SessionService | 1.x.x | 2017.2 | Errata release.  Added clarifications to "ServiceEnabled" usage. |
| Thermal | 1.x.x | 2017.2 | Errata release.  Removed the errant auto-expand annotation within "Redundancy". |
| CollectionCapabilities | 1.0.0 | 2017.1 | Initial release. Describes the capabilities of a collection in terms of how a client is able to create new resources within the collection. |
| CompositionService | 1.0.0 | 2017.1 | Initial release. Describes a Composition Service used to create systems from available resources or Resource Blocks.  It includes the properties of the Service as well as links to the actual resources available for composition. |
| ResourceBlock | 1.0.0 | 2017.1 | Initial release. Represents a Resource Block, its components, and any affinity to a composed device. |
| ResourceBlockCollection | 1.0.0 | 2017.1 | Initial release. A collection of Resource Blocks. |
| Chassis | 1.5.0 | 2017.1 | Added link to ResourceBlocks. |
| ComputerSystem | 1.4.0 | 2017.1 | Added "TotalSystemPersistentMemoryGiB" to "MemorySummary".  Added link to ResourceBlocks. |
| Drive | 1.2.0 | 2017.1 | Added link to Chassis. |
| EthernetInterface | 1.3.0 | 2017.1 | Added link to Chassis. |
| Memory | 1.2.0 | 2017.1 | Added properties for describing and allocating memory regions. |
| PhysicalContext | 1.1.0 | 2017.1 | Added "Memory" as an enumeration value. |
| Resource | 1.4.0 | 2017.1 | Added "PowerCycle" as an enumeration value for "ResetType". Modified descriptions of "ResetType" to remove system-centric text. Corrected the validation pattern for properties using the UUID format (only JSON Schema versions). |
| ServiceRoot | 1.2.0 | 2017.1 | Added link to CompositionService. |
| Storage | 1.2.0 | 2017.1 | Added "FCP" and "FICON" as enumeration values for "Protocol". |
| UpdateService | 1.2.0 | 2017.1 | Added "HttpPushUriTargets" and "HttpPushUriTargetsBusy" properties and "Targets" optional parameter (for "SimpleUpdate") to allow selection of a particular target device or devices. |
|Endpoint | 1.0.2 | 2017.1 | Errata release.  Corrected validation pattern on PCI ID-related properties.  Removed unnecessary schema reference inclusions from CSDL schema. |
| EventDestination | 1.1.3, 1.0.4 | 2017.1 | Marked "Context" property as Required instead of RequiredOnCreate.  Service is required to provide the "Context" (may be NULL), but clients are not required to specify a context when creating a new Event Destination. |
|PCIeFunction | 1.0.2 | 2017.1 | Errata release.  Corrected validation pattern on PCI ID-related properties. | 
| (many) | various | 2017.1 | Minor release.  Added Actions and OemActions objects to allow for OEM extensions. |
| (many) | various | 2017.1 | Errata release.  Corrected integer type properties in CSDL schemas to Int64 (from Int16 or Int32) for consistency.  Added missing descriptions in Complex Type definitions.  Added Actions and OemActions objects to allow for OEM extensions. Corrected Links and "Members" properties (Collection schemas) in all schemas to be non-nullable. |
| HostInterface | 1.0.0 | 2016.3 | Initial release. Contains properties for describing and configuring a Redfish Host Interface. |
| HostInterfaceCollection | 1.0.0 | 2016.3 | Initial release. Collection of Redfish Host Interfaces. |
| NetworkAdapter | 1.0.0 | 2016.3 | Initial release. Describes general-purpose network adapters. |
| NetworkAdapterCollection | 1.0.0 | 2016.3 | Initial release. Collection of Network Adapters. |
| NetworkInterface | 1.0.0 | 2016.3 | Initial release. Provides linkages between NetworkAdapter, NetworkPort, and NetworkDeviceFunction instances. |
| NetworkInterfaceCollection | 1.0.0 | 2016.3 | Initial release. Collection of Network Interfaces. |
| NetworkDeviceFunction | 1.0.0 | 2016.3 | Initial release. Describes a logical interface exposed by a Network Adapter. |
| NetworkDeviceFunctionCollection | 1.0.0 | 2016.3 | Initial release. Collection of Network Device Functions. |
| NetworkPort | 1.0.0 | 2016.3 | Initial release. Describes a discrete physical port capable of connecting to a network. |
| NetworkPortCollection | 1.0.0 | 2016.3 | Initial release. Collection of Network Ports. |
| PrivilegeRegistry | 1.0.0 | 2016.3 | Initial release. Schema for definition of HTTP Operation to Privilege mapping. |
| AccountService | 1.1.0 | 2016.3 | Added link to "PrivilegeMap". |
| Chassis | 1.4.0  | 2016.3 | Added "RackGroup" to "ChassisType" enumeration.  Added link to "NetworkAdapters" resource collection. Added "HeightMm", "WidthMm", "DepthMm", and "WeightKg" properties. Added Link to "PCIeDevices". |
| ComputerSystem | 1.3.0  | 2016.3 | Added link to "NetworkDevices" resource collection. Added "FirmwareVersion2" and "InterfaceTypeSelection" to "TrustedModules" object. |
| EthernetInterface | 1.2.0 | 2016.3 | Added link to "HostInterface" to support Redfish Host Interface specification. |
| Manager | 1.3.0 | 2016.3 | Added link to "HostInterfaces" resource collection. |
| ManagerNetworkProtocol | 1.1.0 | 2016.3 | Added "DHCP" protocol object. |
| Memory     | 1.1.0 | 2016.3 | Added "Status" object.  |
| MemoryDomain   | 1.1.0 | 2016.3 | Added "AllowsMirroring" and "AllowsSparing" properties.  |
| Resource | 1.3.0 | 2016.3 | Added "PostalAddress" and "Placement" objects to "Location", each contaning numerous properties for detailed location information. |
| SoftwareInventory | 1.1.0 | 2016.3 | Added "SoftwareId", "LowestSupportedVersion", "UefiDevicePaths" and "RelatedItem" properties. |
| Thermal | 1.2.0 | 2016.3 | Added "Manufacture", "Model", "SerialNumber", "PartNumber", "SparePartNumber" and "IndicatorLED" to "Fan" object. |
| UpdateService | 1.1.0 | 2016.3 | Added "HttpPushUri" property. |
| (all files) | various | 2016.3 | Errata release.  Added explicit permissions annotations to all properties to clearly show which properties are read-write vs. read-only. Corrected Permission annotation with invalid enumeration references. Removed permissions annotation from embedded objects (permissions now on every property).  Removed permission annotations from CSDL Type definitions to avoid conflicts with property definitions. Corrected all property descriptions to always end with a period. |
| ComputerSystem | 1.0.4  | 2016.3 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| ComputerSystem | 1.1.2  | 2016.3 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| ComputerSystem | 1.2.1  | 2016.3 | Errata release.  Corrected CSDL Type of "TotalSystemMemoryGiB" from 'Int64' to 'Decimal'. |
| Port | 1.0.1 | 2016.3 | Corrected CSDL Type of "CurrentSpeedGbps" and "MaxSpeedGbps" from 'Int64' to 'Decimal'. |
| Power | 1.2.1 | 2016.3 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| Power | 1.1.1 | 2016.3 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| Power | 1.0.3 | 2016.3 | Corrected descriptions for voltage-related properties and changed sensor descriptions to avoid use of term 'current', instead referring to 'present value'. |
| ServiceRoot | 1.1.1 | 2016.3 | Added missing EntityContainer for "ServiceContainer" in CSDL schema. |
| (all files) | various | 2016.2 | Corrected Reference URI links to OData v4 (errata 3) and added Capabilities annotations to CSDL files. |
| ActionInfo | 1.0.0 | 2016.2 | Initial release.  ActionInfo describes the parameters and other information necessary to perform a Redfish Action to a particular Action target.  |
| Endpoint | 1.0.0 | 2016.2 | Initial release.  An Endpoint is an entity that sends or receives protocol defined messages over a transport. |
| EndpointCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Endpoints. |
| Fabric | 1.0.0 | 2016.2 | Initial release.  A Fabric consists of one or more Switches and may include  Endpoints and Zones. |
| FabricCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Fabric resources.|
| MemoryChunks | 1.0.0 | 2016.2 | Initial release.  Describes a Memory Chunk and memory Interleve Sets. |
| MemoryChunksCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Memory Chunks. |
| MemoryDomain | 1.0.0 | 2016.2 | Initial release.  Memory Domains are used to indicate to the client which Memory (DIMMs) can be grouped together in Memory Chunks to form interleave sets or otherwise grouped together. |
| MemoryDomainCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Memory Domains. |
| PCIeDevice | 1.0.0 | 2016.2 | Initial release.  Describes a PCIe Device attached to a system. |
| PCIeFunction | 1.0.0 | 2016.2 | Initial release.  Describes a PCIe Function. |
| Port | 1.0.0 | 2016.2 | Initial release.  Describes a Port of a Switch. |
| PortCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Ports. |
| SoftwareInventory | 1.0.0 | 2016.2 | Initial release.  Describes an inventory of software components. |
| SoftwareInventoryCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Software components. |
| Switch | 1.0.0 | 2016.2 | Initial release.  Describes a simple fabric Switch. |
| SwitchCollection| 1.0.0 | 2016.2 | Initial release.  Collection of Switches. |
| UpdateService | 1.0.0 | 2016.2 | Initial release.  Describes the Redfish Update Service. |
| VolumeCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Volumes. |
| Zone | 1.0.0 | 2016.2 | Initial release.  Describes a simple fabric Zone. |
| ZoneCollection | 1.0.0 | 2016.2 | Initial release.  Collection of Zones. |
| Chassis | 1.3.0 | 2016.2 | Added "IPBasedDrive" to "ChassisType" enumerations.  |
| ComputerSystem | 1.2.0 | 2016.2 | Added "HostedServices" and "HostingRoles" properties.  Added  "MemoryDomains", "PCIeDevices", "PCIFunctions", and "Endpoints" links. Added "RemoteDrive" enumeration to "BootSourceOverrideTarget". |
| Drive | 1.1.0 | 2016.2 | Added "Operations" property and "Endpoints" link. |
| EthernetInterface | 1.1.0 | 2016.2 | Added "LinkStatus" property and "Endpoints" link. |
| EventDestination | 1.1.0 | 2016.2 | Added "OriginResources" and "MessageIds" properties. |
| LogEntry | 1.1.0 | 2016.2 | Added "EventType", "EventId", and "EventTimeStamp" properties. |
| Manager | 1.2.0 | 2016.2 | Added "PowerState" property. |
| MemoryMetrics | 1.1.0 | 2016.2 | Added "PredictedMediaLifeLeftPercent" property to the "HealthData" object. |
| Power | 1.2.0 | 2016.2 | Added "IndicatorLED" property to "PowerSupply" object. |
| Redundancy | 1.1.0 | 2016.2 | Added "RedundancyEnabled" property. |
| Resource | 1.2.0 | 2016.2 |  Added "Deferring", "Quiesced", and "Updating" to "State" enumerations. |
| ServiceRoot | 1.1.0 | 2016.2 | Added links to "Fabrics", "StorageSystems", "StorageServices" and "UpdateService".  |
| SessionService | 1.1.0 | 2016.2 | Added OEM Action capabilities. |
| Storage | 1.1.0| 2016.2 | Added "Links" object and "Endpoints" link. |
| ComputerSystem | 1.1.1 | 2016.2 | Errata release.  Clarified description of ComputerSystem and the "UUID" property. |
| ComputerSystem | 1.0.3 | 2016.2 | Errata release.  Clarified description of ComputerSystem and the "UUID" property. |
| Drive | 1.0.1 | 2016.2 | Errata release.  Added "Unencrypted" enumeration to EncryptionStatus and deprecated misspelled enumeration. |
| Event | 1.1.1 | 2016.2 | Errata release.  Deprecated "Context" property in favor of the Event-specific "Context" contained within each Event. |
| Event | 1.0.3 | 2016.2 | Errata release.  Deprecated "Context" property in favor of the Event-specific "Context" contained within each Event.  |
| IPAddresses | 1.0.3 | 2016.2 | Errata release.  Corrected validation patterns for "IPv4Address" and "SubnetMask".  Added validation pattern for "Gateway". |
| Message | 1.0.3 | 2016.2 | Errata release.  Corrected "MessageId" to mark it as a required property. |
| Resource | 1.1.1 | 2016.2 | Errata release.  Removed errant "ReferenceableMember" entity type. |
| ServiceRoot | 1.0.3 | 2016.2 | Corrected validation pattern annotation for "RedfishVersion".  |
| Storage | 1.0.1 | 2016.2 | Corrected type definition of the "Volumes" link. |
| Volume  | 1.0.1 | 2016.2 | Corrected description of "VolumeType". |
| AttributeRegistry | 1.0.0  | 2016.1 | Initial release.  An Attribute Registry is a set of key-value pairs that are specific to a particular implementation or product, such that creating standardized property names would be impractical.  This schema describes the structure of a Registry, and also includes mechanisms for building user interfaces (menus) allowing consistent navigation of the contents.|
| Bios    | 1.0.0  | 2016.1 | Initial release.  Bios contains properties surrounding a BIOS Attribute Registry (where the system-specific BIOS attributes are described) and the Actions needed to perform changes to BIOS settings, which typically require a system reset to apply.|
| Drive     | 1.0.0  | 2016.1 | Initial release.  Drive contains properties describing a single physical disk drive for any system, along with links to associated Volumes. |
| Memory    | 1.0.0  | 2016.1 | Initial release.  Memory describes a memory module or similar memory device as part of a system. |
| MemoryCollection | 1.0.0 | 2016.1 | Initial release.  A Collection of Memory resource instances. |
| MemoryMetrics | 1.0.0 | 2016.1 | Initial release.  MemoryMetrics contains usage and health statistics for a single Memory module or device instance. |
| SecureBoot | 1.0.0  | 2016.1 | Initial release.  This resource contains UEFI Secure Boot information. It represents properties for managing the UEFI Secure Boot functionality of a system. |
| Storage    | 1.0.0  | 2016.1 | Initial release.  Storage defines a storage subsystem and its respective properties.  A storage subsystem represents a set of storage controllers (physical or virtual) and the resources such as volumes that can be accessed from that subsystem. |  
| StorageCollection    | 1.0.0  | 2016.1 | Initial release.  A Collection of Storage resource instances. |
| Volume    | 1.0.0  | 2016.1 | Initial release.  Volume contains properties used to describe a volume, virtual disk, LUN, or other logical storage entity for any system. |
| (all files) | 1.0.2   | 2016.1 | Errata release of all schema files to adjust file naming conventions. CSDL schema files now have the major version appended to the end of the schema name (e.g., Chassis_v1), and json-schema files include the major/minor/errata version number (matching the namespace definitions in the schema as they did previously) in the filename, but are now prefaced with a 'v' and with underscore separators (e.g., Chassis.v1_0_2.json) to match the corrected namespace naming rules.  Added LongDescriptions to 'Links' and 'Actions' objects throughout.  Added 'Unit', 'Minimum', and 'Maximum' annotations throughout.  Defined all unversioned resources in CSDL as 'abstract'.  Corrected all string properties with enumerations to allow use of null (nullable).  Marked all 'Links' and other NavigationProperties and embedded objects (ComplexTypes) as non-nullable.  Improved schema description text, updated RFC references, and whitespace consistency throughout.  |
| (all Collections) | n/a | 2016.1 | Corrected URI of the schema locations to the /schemas/v1 repository instead of the /schema location, which contains only the latest version of each schema. Corrected missing 'anyOf' structure to allow 'idref' references to collections. |
| (all files) | (various) | 2016.1 | Copies of all previously-released Redfish json-schema files have been created to follow the corrected json-schema filename format (v1_n_n instead of 1.n.n).  The internal schema name references were updated to match this style, but otherwise the files are identical to their originally released content. |
| Chassis    | 1.2.0   | 2016.1  | Added Links for ManagersInChassis, Drives, and Storage. |
| Chassis | 1.1.2   | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected description for ManagedBy link.  Deprecated 'Unknown' enumeration value for 'IndicatorLED'. |
| ComputerSystem | 1.1.0 | 2016.1 | Added Links for 'Bios', 'Memory', 'Storage', and 'SecureBoot'.  Added 'MemoryMirroring' to the 'MemorySummary' object.  Added 'TrustedModule' object.  Added 'BootSourceOverrideMode' to 'Boot' object.  Added 'SDCard' and 'UefiHttp' enumerations to 'BootSourceOverrideTarget' in 'Boot' object. |
| ComputerSystem | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Deprecated 'Unknown' enumeration value for 'IndicatorLED'. |
| Event      | 1.1.0  | 2016.1 | Added 'Context' property. |
| EventService | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected Unit annotations to use UCUM unit definitions. |
| JsonSchemaFile | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected text in 'Schema' property descriptions to reference "@odata.type" instead of "Type". | 
| Manager     | 1.1.0  | 2016.1 | Added Link for 'ManagerInChassis'. |
| Manager     | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected descriptions for 'ServiceEntryPointUUID' to correctly match the intent of the property. |
| ManagerNetworkProtocol | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. |  
| Power       | 1.1.0  | 2016.1 | Added 'InputRanges' array and 'Manufacturer' to 'PowerSupplies' object.  Added enumerations to the 'LineInputVoltageType' property in 'PowerSupplies' that promote better interoperability and deprecated others whose terminology differs in meaning among vendors. | 
| Power       | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. | 
| Resource    | 1.1.0 | 2016.1 | Added 'Identifier' object, 'Location' object and 'IndicatorLED' definitions for use throughout the Redfish data model.  Added 'UnavailableOffline' enumeration to 'State' in 'Status' object. |
| Resource   | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected missing Required annotation on 'Id' property. Added 'Pattern' Redfish annotation for 'Oem' property names. | 
| SessionService | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Added Unit annotations. |
| SimpleStorage | 1.1.0  | 2016.1 | Added 'CapacityBytes' to 'Devices' object. |
| SimpleStorage | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected Unit annotations to use UCUM unit definitions. |
| Thermal     | 1.1.0  | 2016.1 | Added 'Name' to 'Fan' object.  Deprecated inconsistent 'FanName' in 'Fan'. |
| Thermal     | 1.0.2 | 2016.1 | Errata release (see 1.0.2 errata description above).  Corrected read-write permissions on all embedded objects.  Corrected Unit annotations to use UCUM unit definitions. | 
| Chassis    | 1.1.0   | 2015-11-25 | Added 'PhysicalSecurity' object for Intrusion Detection sensor support. |
| Thermal     | 1.0.1  | 2015-9-17 | Errata release.  Renamed Fan 'ReadingRPM' property to 'Reading' as it was determined that the initial definition was too limiting. Added Fan property 'ReadingUnits' to allow for either RPM or percent-based fan readings.  Corrected spelling errors throughout. Any future property name changes will result in a major version change to the schema file. |
| Chassis     | 1.0.1   | 2015-9-17 | Errata release.  Added missing 'PowerState' property intended for inclusion in v1.0.0.  Corrected longDescription text of 'CooledBy'.  Clarified longDescription of 'Reset' action.  |
| ComputerSystem | 1.0.1  | 2015-9-17 | Errata release.  Changed enumeration values of 'PowerState' to reflect a better set of real-world use cases.  Corrected annotation name in longDescription of 'UefiTargetBootSourceOverride'. |
| Manager     | 1.0.1   | 2015-9-17 | Errata release.  Corrected longDescription text for both 'ManagerForChassis' and 'ManagerForSystem'. |
| Power       | 1.0.1  | 2015-9-17 | Errata release.  Corrected longDescription text for 'IntervalInMin'.  |
| VLanNetworkInterface | 1.0.1  | 2015-9-17 | Errata release.  Corrected maximum VLAN ID value.  |
| (all files) | 1.0.0   | various   | Initial release. |
