---
DocTitle: Redfish Composability White Paper
DocNumber: '???'
DocClass: Informative
DocVersion: '0.9.0'
modified: '2017-05-05'
status: draft
released: false
copyright: '2014-2017'
---


# Foreword

The Redfish Composability White Paper was prepared by the Scalable Platforms Management Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.


# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:

* Jeff Autor - Hewlett Packard Enterprise
* Michael Du - Lenovo
* Jeff Hilland - Hewlett Packard Enterprise
* Rafiq Kattangere - Hewlett Packard Enterprise
* John Leung - Intel Corporation
* Michael Raineri - Dell Inc.
* Paul von Behren - Intel Corporation


# Introduction

As the world is transitioning to a software defined paradigm, there is a need for hardware management capabilities to evolve for addressing that shift in the data center.  In the context of disaggregated hardware, management software needs the ability to conjoin the independent pieces of hardware, such as trays, modules, silicon, etc., together to create a composed logical systems.  These logical systems function just like traditional industry standard rackmount systems.  This allows users to dynamically configure their hardware to meet the needs of their workloads.  In addition, users are able to manage the life cycle of their systems, such as adding more compute to their logical system, without having to physically move any equipment.

Redfish is an evolving hardware management standard that is designed to be flexible, extensible, and interoperable.  Redfish contains a data model that is used to describe composable hardware, as well as an interface for clients to manage their compositions.  This document helps implementers and clients understand the Redfish Composability data model as well as how composition requests are expected to be formed.


# Modeling for Composability

If a Redfish service supports Composability, it will be exposed via the `CompositionService` property found in the Service Root resource.  Within the [Composition Service](#composition-service), a client will find the inventory of all components that are able to be composed into new things, descriptors containing the binding restrictions of the different components, and annotations informing the client as to how to from composition requests.  The following sections detail how these things are reported by a Redfish service.


## Composition Service

The Composition Service is the top level resource for all things related to Composability.  It contains high level status and control indicator properties such as `Status` and `ServiceEnabled`.  These are common properties that are typical to find on the different service instances that Redfish supports.  It also contains links to its collections of Resource Blocks and Resource Zones through the properties `ResourceBlocks` and `ResourceZones` respectively.  Resource Blocks are described in the [Resource Blocks](#resource-blocks) section, and Resource Zones are described in the [Resource Zones](#resource-zones) section.

Example Composition Service Resource:
```json
{
    "@odata.context": "/redfish/v1/$metadata#CompositionService.CompositionService",
    "@odata.type": "#CompositionService.v1_0_0.CompositionService",
    "@odata.id": "/redfish/v1/CompositionService",
    "Id": "CompositionService",
    "Name": "Composition Service",
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "ServiceEnabled": true,
    "ResourceBlocks": {
        "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks"
    },
    "ResourceZones": {
        "@odata.id": "/redfish/v1/CompositionService/ResourceZones"
    }
}
```


## Resource Blocks

Resource Blocks are the lowest level building blocks for composition requests.  Resource Blocks contain high level status and control information about the Resource Block instance.  They also contain the list of components found within the Resource Block instance.  For example, if a Resource Block contains 1 Processor and 4 DIMMs, then all of those components will be part of the same composition request, even if any one of them is needed.  In a completely disaggregated system, a client would likely find one component instance within each Resource Block.

The property `ResourceBlockType` contains classification information about the types of components found on the Resource Block that can be used to help clients quickly identify a Resource Block from a high level.  Each ResourceBlockType is associated with specific schema elements which will be contained within that Resource Block.  For example, if the value `Storage` was found in this property, then a client would know that this particular Resource Block contains storage related devices, such as storage controllers or drives, without having to drill into the individual component resources.  The value `Compute` has special meaning; this is used to describe Resource Blocks that have bound processor and memory components that operate together as a compute subsystem.

The property `CompositionStatus` is an object that contains two properties: `CompositionState` and `Reserved`.  `CompositionState` is used to inform the client the high level state of how this Resource Block is used in a composition.  `Reserved` is a writeable flag that clients are able to use to help convey that this Resource Block has been identified by a client, and that client will be using it for a composition.  If a second client that is attempting to identify resources for a composition sees the `Reserved` flag set to true, it should move on to the next Resource Block for further processing.  The Redfish service does not provide any sort of protection with the `Reserved` flag; any client can change its state and it's up to clients to behave fairly.

There are several arrays of links to various component types, such as the `Processors`, `Memory`, and `Storage` arrays.  These links ultimately go to the individual components that are within the Resource Block.  These components are made available to the new composition after a request is made.

The `Links` property contains references to the Chassis instances that contain the resources within the Resource Block via the `Chassis` array.  It also contains an array of links to the composed Computer System instances that are consuming the given Resource Block via the `ComputerSystems` array.  The `Zones` array contains links to the [Resource Zones](#resource-zones) that contain the Resource Block.

Example Resource Block Resource:
```json
{
    "@odata.context": "/redfish/v1/$metadata#ResourceBlock.ResourceBlock",
    "@odata.type": "#ResourceBlock.v1_0_0.ResourceBlock",
    "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock3",
    "Id": "DriveBlock3",
    "Name": "Drive Block 3",
    "ResourceBlockType": [ "Storage" ],
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "CompositionStatus": {
        "Reserved": false,
        "CompositionState": "Composed"
    },
    "Processors": [],
    "Memory": [],
    "Storage": [
        {
            "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock3/Storage/Block3NVMe"
        }
    ],
    "Links": {
        "ComputerSystems": [
            {
                "@odata.id": "/redfish/v1/Systems/ComposedSystem"
            }
        ],
        "Chassis": [
            {
                "@odata.id": "/redfish/v1/Chassis/ComposableModule3"
            }
        ],
        "Zones": [
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceZones/1"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceZones/2"
            }
        ]
    }
}
```

In the above example, the Resource Block is of type `Storage`, and it contains a single storage entity.  From the `CompositionStatus`, it's noted that the Resource Block is currently used in a composition, and in the `Links` section, it's being used by the Computer System `ComposedSystem`.


## Resource Zones

Resource Zones describe to the client the different composition restrictions of the [Resource Blocks](#resource-blocks) reported by the service; [Resource Blocks](#resource-blocks) that are reported in the same Resource Zone are allowed to be composed together.  This enables the clients to not perform try-and-fail logic to figure out the different restrictions that are in place for a given implementation.  In addition, each Resource Zone leverages the Collection Capabilities annotation to describe what each Resource Zone is able to compose.  This is described in more detail in the [Collection Capabilities](#collection-capabilities) section.

Example Resource Zone Resource:
```json
{
    "@odata.context": "/redfish/v1/$metadata#Zone.Zone",
    "@odata.type": "#Zone.v1_1_0.Zone",
    "@odata.id": "/redfish/v1/CompositionService/ResourceZones/1",
    "Id": "1",
    "Name": "Resource Zone 1",
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "Links": {
        "ResourceBlocks": [
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/ComputeBlock1"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock3"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock4"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock5"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock6"
            },
            {
                "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock7"
            }
        ]
    },
    "@Redfish.CollectionCapabilities": {
        "@odata.type": "#CollectionCapabilities.v1_0_0.CollectionCapabilities",
        "Capabilities": [
            {
                "CapabilitiesObject": {
                    "@odata.id": "/redfish/v1/Systems/Capabilities"
                },
                "UseCase": "ComputerSystemComposition",
                "Links": {
                    "TargetCollection": {
                        "@odata.id": "/redfish/v1/Systems"
                    }
                }
            }
        ]
    }
}
```

In the above example, the Resource Blocks `ComputeBlock1`, `DriveBlock3`, `DriveBlock4`, `DriveBlock5`, `DriveBlock6`, and `DriveBlock7` are all in the same Resource Zone.  In addition, the Collection Capabilities for the Resource Zone shows that this Resource Zone is capable of producing Computer Systems for the collection `/redfish/v1/Systems`.


## Collection Capabilities

Collection Capabilities will be found on [Resource Zones](#resource-zones) and on Resource Collections themselves.  This is because Collection Capabilities can be applied to things outside of the context of Composability.  Collection Capabilities can be identified by the `@Redfish.CollectionCapabilities` annotation in the response body.  This annotation is used to inform the client how to form the request body for a POST to a given collection based on a specified Use Case.


### Collection Capabilities Annotation

Within the Collection Capabilities annotation, there is a single property called `Capabilities`.  This is an array to identify all of the capabilities for a given Resource Zone or Resource Collection.  Inside each instance of the `Capabilities` array is an object to describe a particular capability.

The property `CapabilitiesObject` contains a URI to the underlying object instance that describes the payload format.  This is described further in the [next section](#collection-capabilities-object).

The property `UseCase` is used as an indicator to let the client know a particular capability is to be used.  The table below shows the different values for `UseCase` as used by Composability.  Each value corresponds with a specific type of resource being composed in addition to a [type of composition](#types-of-compositions) for the request.

| `UseCase` Value             | Composed Resource | Type of Composition               |
| --------------------------- | ----------------- | --------------------------------- |
| `ComputerSystemComposition` | `ComputerSystem`  | [Specific](#specific-composition) |

The property `TargetCollection` inside the `Links` object contains the URI of the Resource Collection that accepts the given capability.  A client will be able to perform a POST operation against this URI as described by the contents of the `CapabilitiesObject`.

Example Collection Capabilities Annotation:
```json
{
    "@Redfish.CollectionCapabilities": {
        "@odata.type": "#CollectionCapabilities.v1_0_0.CollectionCapabilities",
        "Capabilities": [
            {
                "CapabilitiesObject": {
                    "@odata.id": "/redfish/v1/Systems/Capabilities"
                },
                "UseCase": "ComputerSystemComposition",
                "Links": {
                    "TargetCollection": {
                        "@odata.id": "/redfish/v1/Systems"
                    }
                }
            }
        ]
    },
    ...
}
```

The above annotation contains a single capability.  From the `UseCase`, this capability describes how to form a POST request to create a new Computer System from a set of specific Resource Blocks.  In addition, this request can be made to the Resource Collection `/redfish/v1/Systems`.


### Collection Capabilities Object

The Collection Capabilities Object follows the schema of the resource it's describing.  For example, if the object is describing how to form a request to create a new Computer System instance, then the object's type will be some version of `ComputerSystem`.

The object itself contains annotated properties the client is allowed to use in the body of the POST operation.  It also lists out optional properties, and any restrictions properties may have after the new resource is created.  The table below describes the different annotations used on the properties within the Collection Capabilities Object.

| Property Annotation            | Description                                                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Redfish.RequiredOnCreate`     | The client must provide the given property in the body of the POST request                                                                                                                    |
| `Redfish.OptionalOnCreate`     | The client does not need to provide the property in the body of the POST request                                                                                                              |
| `Redfish.SetOnlyOnCreate`      | If the client has a specific value needed for the property, it must be provided in the body of the POST request; this property is likely a "Read Only" property after the resource's creation |
| `Redfish.UpdatableAfterCreate` | The client is allowed to update the property after the resource is created                                                                                                                    |
| `Redfish.AllowableValues`      | The client is allowed to use any of the specified values in the body of the POST request for the given property                                                                               |

Example Collection Capabilities Object:
```json
{
    "@odata.context": "/redfish/v1/$metadata#ComputerSystem.ComputerSystem",
    "@odata.type": "#ComputerSystem.v1_4_0.ComputerSystem",
    "@odata.id": "/redfish/v1/Systems/Capabilities",
    "Id": "Capabilities",
    "Name": "Capabilities for the Zone",
    "Name@Redfish.RequiredOnCreate": true,
    "Name@Redfish.SetOnlyOnCreate": true,
    "Description@Redfish.OptionalOnCreate": true,
    "Description@Redfish.SetOnlyOnCreate": true,
    "HostName@Redfish.OptionalOnCreate": true,
    "HostName@Redfish.UpdatableAfterCreate": true,
    "Boot@Redfish.OptionalOnCreate": true,
    "Boot": {
        "BootSourceOverrideEnabled@Redfish.OptionalOnCreate": true,
        "BootSourceOverrideEnabled@Redfish.UpdatableAfterCreate": true,
        "BootSourceOverrideTarget@Redfish.OptionalOnCreate": true,
        "BootSourceOverrideTarget@Redfish.UpdatableAfterCreate": true,
        "BootSourceOverrideTarget@Redfish.AllowableValues": [
            "None",
            "Pxe",
            "Usb",
            "Hdd"
        ]
    },
    "Links@Redfish.RequiredOnCreate": true,
    "Links": {
        "ResourceBlocks@Redfish.RequiredOnCreate": true,
        "ResourceBlocks@Redfish.UpdatableAfterCreate": true
    }
}
```

In the above example, three properties are marked with the `Redfish.RequiredOnCreate` annotation: `Name`, `Links`, and `ResourceBlocks` inside of `Links`.  All other properties are annotated with `Redfish.OptionalOnCreate`.  However, both `Name` and `Description` are annotated with `SetOnlyOnCreate`, meaning they cannot be modified after the new resource is created.


# Types of Compositions

The Redfish Composability data model provides flexibility for service implementers to report different Composition Types based on their needs.  The service informs the client of the type of composition request based on the `UseCase` property found in the [Collection Capabilities Annotation](#collection-capabilities-annotation).  The existing Redfish Composability model has defined one type called [Specific Composition](#specific-composition).


## Specific Composition

The Specific Composition allows clients to create and manage the life cycle of composed resources through pre-defined [Resource Blocks](#resource-blocks) and [Resource Zones](#resource-zones).  Since Resource Blocks are self contained entities within a Resource Zone, clients are able to pick and choose specific Resource Blocks for their composition request.

An example of choosing a Resource Block according to the binding rules and providing details of specific Resource Blocks in the a POST request can be found in the [Create a Composed Resource](#create-a-composed-resource) section.

Another industry standard server design which fits into the example of Specific Composition is defined in the (public-bladed-partitions mockup)[#references].  In this example, a Multi-Blade Enclosure having disaggregated hardware chassis can be bound together electrically to create what is called a [server hard partitions](http://www.computerworld.com/article/2593387/server-partitioning.html).  These hard partitions can be composed using the Specific Composition.  The Redfish service implements each blade within the enclosure as a Resource Block with `ResourceBlockType` set to either `Compute` or `Storage`, and allows the clients to combine multiple Resource Blocks to create a composed Computer System, which is an electrically isolated partition.

Example POST Body for a Specific Composition:
```json
{
    "Name": "Sample Composed System",
    "Links": {
        "ResourceBlocks": [
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/BladeComputeBlock1" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/BladeComputeBlock5" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/BladeStorageBlock8" }
        ]
    }
}
```


# Appendix


## General Workflow for a Client

Here are the few operations that a client is expected to use during creation and management of Composed Systems using the Redfish Composition models.  The examples below expect the client will have a valid Redfish session or Basic Authentication header.


### Identify If Redfish Service Supports Composition

Application code should always start at the root: `/redfish/v1/`

1. Read the Service Root Resource
    1. Find the `CompositionService` property
    2. Perform a GET on the URI given by that property
    3. Look for the value of `ServiceEnabled` attribute to be true

    ```
    Client|                                              | Redfish Service
          |---- GET /redfish/v1/CompositionService ----->|
          |<--- { ..., "ServiceEnabled": true, ... } <---|
    ```


### Read the List of Resources Available for Composition

The client needs to understand the composition model reported by the [Composition Service](#composition-service) by reading the [Resource Blocks](#resource-blocks) and [Resource Zones](#resource-zones) collections.  This relationship will be used to execute the reported `UseCase` supported by the Redfish service in later the [Create a Composed Resource](#create-a-composed-resource) section.

1. Read the [Resource Blocks](#resource-blocks)
    1. Perform a GET on the Composition Service URI
    2. Look for the `ResourceBlocks` property
    3. Perform a GET on that URI to get a list of all Resource Blocks
    4. For accessing details of a particular Resource Block, perform a GET on the associated URI listed for a given entry in the `Members` array
    5. The `CompositionStatus` property in each Resource Block will identify the availablity of the Resource Block in composition requests
        * Clients should take note of this when making decisions on what Resource Blocks to use in a composition request
        * Depending on what's contained in the `CompositionStatus` property, a given Resource Block may not be currently available for composition

    ```json
    {
        "@odata.type": "#ResourceBlockCollection.ResourceBlockCollection",
        "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks",
        "Name": "Resource Block Collection",
        "Members@odata.count": 9,
        "Members": [
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/ComputeBlock1" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/ComputeBlock2" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock3" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock4" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock5" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock6" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock7" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/NetworkBlock8" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/OffloadBlock9" }
        ]
    }
    ```

2. Read the [Resource Zones](#resource-zones)
    1. Perform a GET on the Composition Service URI
    2. Look for the `ResourceZones` property
    3. Perform a GET on that URI to get a list of all Resource Zones
    4. For accessing details of a particular Resource Zone, perform a GET on the associated URI listed for a given entry in the `Members` array

    ```json
    {
        "@odata.type": "#ZoneCollection.ZoneCollection",
        "@odata.id": "/redfish/v1/CompositionService/ResourceZones",
        "Name": "Resource Zone Collection",
        "Members@odata.count": 2,
        "Members": [
            { "@odata.id": "/redfish/v1/CompositionService/ResourceZones/1" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceZones/2" }
        ]
    }
    ```

3. Read the [Capabilities](#collection-capabilities) for Each Resource Zone
    1. Perform a GET on each Resource Zone using the URI found in each entry of the `Members` array
    2. Look for the `@Redfish.CollectionCapabilities` annotation in each Resource Zone
        * The `UseCase` property will be used later when a client has determined what type of composition to create
        * The `TargetCollection` property will be used later for making the composition request

    ```json
    {
        "@odata.context": "/redfish/v1/$metadata#Zone.Zone",
        "@odata.type": "#Zone.v1_1_0.Zone",
        "@odata.id": "/redfish/v1/CompositionService/ResourceZones/1",
        "Id": "1",
        "Name": "Resource Zone 1",
        "Status": {},
        "Links": {},
        "@Redfish.CollectionCapabilities": {
            "@odata.type": "#CollectionCapabilities.v1_0_0.CollectionCapabilities",
            "Capabilities": [
                {
                    "CapabilitiesObject": { "@odata.id": "/redfish/v1/Systems/Capabilities" },
                    "UseCase":"ComputerSystemComposition",
                    "Links": {
                        "TargetCollection": { "@odata.id": "/redfish/v1/Systems" },
                        "RelatedItem": [
                            { "@odata.id": "/redfish/v1/CompositionService/ResourceZones/1" }
                        ]
                    }
                }
            ]
        }
    }
    ```

4. Read Each Capabilities Object
    1. Perform a GET on the URI listed in the `CapabilitiesObject` property for each of the Capabilities

    ```json
    {
        "@odata.context": "/redfish/v1/$metadata#ComputerSystem.ComputerSystem",
        "@odata.type": "#ComputerSystem.v1_4_0.ComputerSystem",
        "@odata.id": "/redfish/v1/Systems/Capabilities",
        "Id": "Capabilities",
        "Name": "Capabilities for the Zone",
        "Name@Redfish.RequiredOnCreate": true,
        "Name@Redfish.SetOnlyOnCreate": true,
        "Description@Redfish.OptionalOnCreate": true,
        "Description@Redfish.SetOnlyOnCreate": true,
        "HostName@Redfish.OptionalOnCreate": true,
        "HostName@Redfish.UpdatableAfterCreate": true,
        "Boot@Redfish.OptionalOnCreate": true,
        "Boot": {
            "BootSourceOverrideEnabled@Redfish.OptionalOnCreate": true,
            "BootSourceOverrideEnabled@Redfish.UpdatableAfterCreate": true,
            "BootSourceOverrideTarget@Redfish.OptionalOnCreate": true,
            "BootSourceOverrideTarget@Redfish.UpdatableAfterCreate": true,
            "BootSourceOverrideTarget@Redfish.AllowableValues": [
                "None",
                "Pxe",
                "Usb",
                "Hdd"
            ]
        },
        "Links@Redfish.RequiredOnCreate": true,
        "Links": {
            "ResourceBlocks@Redfish.RequiredOnCreate": true,
            "ResourceBlocks@Redfish.UpdatableAfterCreate": true
        }
    }
    ```


### Create a Composed Resource

For building a composition request, the client can take the following steps for building a new composition.

1. List all [Resource Blocks](#resource-blocks) that belong to a particular [Resource Zone](#resource-zones) by doing a GET on their collection URIs as described in [the above example](#read-the-list-of-resources-available-for-composition)
    * When reading the Resource Blocks, take note of the `CompositionStatus` property
    * Depending on what's contained in the `CompositionStatus` property, a given Resource Block may not be currently available for composition
2. Identify the needs of a specific composition `UseCase`
    1. Perform a GET on the desired Resource Zone
    2. Find the matching `UseCase` value in the `@Redfish.CollectionCapabilities` annotation
        * For example, look for the value `ComputerSystemComposition` if trying to compose a new Computer System from a specific list of Resource Blocks
    3. Perform a GET on the URI found in the property `CapabilitiesObject`
    4. Mark down all of the properties annotated with `RequiredOnCreate`
        * These are the properties which needs to be passed as part of the composition request
    5. Mark down the `TargetCollection` URI
        * This is the where the POST request for the new composition is made
3. Using all the properties that were `RequiredOnCreate`, build a POST request body that will be a sent to the `TargetCollection` URI
    * In step 4 of [the above example](#read-the-list-of-resources-available-for-composition), only `Name` and `ResourceBlocks` found in `Links` are required
    * The Redfish service may accept other properties as part of the request so they do not need to be updated later
4. The `Location` HTTP header in the service response contains the URI of the composed resource

General Flow Diagram:
```
Client  |                                                                     | Redfish Service
        |---> GET /redfish/v1/CompositionService/ResourceZones/1 ------------>|
        |<--- { ..., "UseCase": "ComputerSystemComposition", ... } <----------|
        |                                                                     |
        |---> GET /redfish/v1/Systems/Capabilities -------------------------->|
        |     {   ...,                                             <----------|
        |         "Name@Redfish.RequiredOnCreate": true,                      |
        |         "ResourceBlocks@Redfish.RequiredOnCreate": true,            |
        |         ...                                                         |
        |<--- }                                                               |
        |                                                                     |
        |           ( << Identify which Resource Blocks to use >> )           |
        |                                                                     |
        |-> GET /redfish/v1/CompositionService/ResourceBlocks/ComputeBlock2 ->|
        |<--- { ..., "CompositionState": "Unused", ... } <--------------------|
```

Client Request Example:
```http
POST /redfish/v1/Systems HTTP/1.1
Content-Type: application/json; charset=utf-8
Content-Length: <computed-length>
OData-Version: 4.0
{
    "Name": "Sample Composed System",
    "Links": {
        "ResourceBlocks": [
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/ComputeBlock0" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock2" }
        ]
    }
}
```

Service Response Example:
```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: <computed-length>
Location: /redfish/v1/Systems/NewSystem
```

The above Client Request Example shows a composition request by the client being made to the Computer System Collection found at `/redfish/v1/Systems`.  In the request, the client is creating a new Computer System using the Resource Blocks `ComputeBlock0` and `DriveBlock2`.  In the above Service Response Example, the service responsed with a successful 201 response, and indicated that the new Computer System can be found at `/redfish/v1/Systems/NewSystem`.


### Update a Composed Resource

If the Redfish service supports updating an existing composition, the client can update an already created composition through PUT/PATCH.  This can be done by updating the `ResourceBlocks` array found in the composed resource.  When using PATCH, the same array semantics applies as described in the Redfish Specification.

Client Request Example:
```http
PATCH /redfish/v1/Systems/NewSystem HTTP/1.1
Content-Type: application/json; charset=utf-8
Content-Length: <computed-length>
OData-Version: 4.0
{
    "Links": {
        "ResourceBlocks": [
            {},
            {},
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/NetworkBlock8" }
        ]
    }
}
```

The above example will preserve the existing Resource Blocks in the composed resource for array elements 0 and 1, and it will add a the `NetworkBlock8` Resource Block to array element 2.


### Delete a Composed Resource

The client can retire or decompose an already composed resource using DELETE.

Client Request Example:
```http
DELETE /redfish/v1/Systems/NewSystem HTTP/1.1
```

The above example will request that the composed system called `NewSystem` be retired.  When this happens, this will free the Resource Blocks being used by the system so that they can be used in future compositions.


## References

* Provide links to public-composability and public-bladed-partitions on the DMTF site
