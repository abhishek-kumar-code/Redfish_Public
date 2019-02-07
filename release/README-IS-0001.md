---
DocTitle: Redfish Common Fabric Model Extensions Readme
DocNumber: 'IS-0001'
DocClass: Informative
DocVersion: '0.9a'
modified: '2017-04-14'
status: Work in Progress
released: false
copyright: '2017'
---
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - this file is the main Redfish Scalable Platforms Management API Specification.
* DSP2043 - Redfish Mockup - this is a mockup that can be used as sample of output from GETs from A Redfish service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - this contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.

# Redfish Work in Progress Schemas

The following new schema files are released as Work In Progress documents. 

IMPORTANT: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.


| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| Chassis | 1.5.0a | 2017-4-14 | Added "StorageEnclosure" to "ChassisType" enumerations.  |
| Endpoint | 1.1.0a | 2017-4-14 | Added "ConnectedEntity", "EndpointTransport", and "TransportDetails" objects.  Added "Endpoints" links.  Added "Volume" to "EntityType" enumerations. |
| EthernetInterface | 1.3.0a | 2017-4-14 | Added link to "AssociatedEndpoints". |
| NetworkDeviceFunction | 1.2.0a | 2017-4-14 | Added "RDMA" object. |
| Resource | 1.4.0a | 2017-4-14 |  Added "NQN" and "NSID" to "DurableNameFormat" enumerations. |
| Volume  | 1.1.0a | 2017-4-14 | Added link to "Endpoints". |
| Zone | 1.1.0a | 2017-4-14 | Added "UUID" property. |


