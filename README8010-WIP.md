---
DocTitle: Redfish API Schema Readme
DocNumber: '8010'
DocClass: Informative
DocVersion: '2016.2a'
modified: '2016-08-12'
status: Work in Progress
released: false
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

IMPORTANT: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.


| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
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

