---
title: Redfish for Networking 
abbrev: I-D
docname: draft-name-wg-topic-00
date: 2017-03-13
category: info
ipr: trust200902

author:
 -
    ins: Y. Name
    name: Your Name
    organization: Your Organization, Inc.
    email: you@example.com

normative:
  RFC2119:

informative:

--- abstract

[ Insert abstract here ]

--- middle

# Introduction
# Motivation

A common management framework with accompanying set of protocols and models is desirable in systems management use cases. A good example of this is in a converged infrastructure deployment within a data center. Applications, servers, storage, appliances, and networking elements are assembled to create a combined coherent platform. For the networking components in such an environment, there are platform elements in common with other types of systems such as thermals, physical containment, fans, or power, as well as networking specific models to control the forwarding and filtering of network packets or the networking services. The common elements should be accessed and managed in a single way across all systems within the deployment. Management, orchestration, and control of such a system benefits from a single approach to enable unified tools sets and simplify running the deployment. 

The networking specific configuration within the converged infrastructure environment only needs a subset of all the possible networking protocols and services giving the converged controller only the minimum spanning control surface in terms of the models it can access. One breakdown of the needs of such a switch result in about 15 modules being needed. A module here is defined as what is contained in a single RFC or IETF Draft. As a contrast a full function edge router would need many more protocols and services along with full function virtualization needs about 80 modules. The solution to this problem is to leverage a general systems management approach that allows straightforward customization to accommodate various use cases across a variety system types.

SPMF-Redfish approach is rapidly becoming the common standard within the systems management world. 
SNIA recently released the Swordfish specification which extends Redfish for network storage and storage networking management. {Paul}

Redfish™ specifies a RESTful interface and utilizing JSON and OData.

OData is an OASIS standard for expressing the schema of a JSON document (aka metadata).  OData allows a fuller description of the JSON document, than json-schema. However, Redfish also provides the schema in json-schema format, so users can take advantage of its larger tool chain. In OData, the schema/metadata is in CSDL (Common Schema Definition Language).
OData describes the directives.  Compute doesn't use (describes $top and $skip as should).  Networking may state that directives are required.  (Add Odata spec in reference)

**<<Can this document reference the Redfish Technical Note?  Add reference section.>>
 <<more on core redfish architecture and approach: background & summary; how does redfish approach system management; core redfish technology and models>>**

Within the networking world, YANG has become the most common way to express management and control models of networking systems. YANG takes the approach of expressing each section of the overall model as a module containing a tree of nodes where each node is either a container type of node which builds the hierarchy or a leaf type of node containing data elements for the model. Any network management approach needs to leverage YANG as the core model definition language to maintain consistency with other YANG based network management approaches. The core model structure must be maintained such that equivalent data elements accessed through different access approaches would yield the same data or content.

Redfish-Networking meets the above requirements by mapping YANG modules to Redfish models for network functionality and services, while re-using the Redfish interface (HTTP, JSON, OData) and the Redfish models for platform management.

The Redfish networking approach enables the definition of a particular view onto a system conforming to a specific profile depending upon the type of configuration access required. For example a baseline switch model description with a minimum set of model elements is useful when configuring the switch within a larger converged infrastructure system. The elements of the baseline switch would be the simplest useful data center device profile. A more complex system might need tunnel models, overlay models, extensive qos models, or similar elements. A completely different style of deployment could want a fabric based model for controlling a collection of physical systems all managed as a single element within the overall solution. 

Redfish also improves security control since there is a single point of management contact for a device to control all of its functions.

The top level resource structure of Redfish is the following. 

    //some.domain.name/redfish/v1/system
    //some.domain.name/redfish/v1/chassis
    //some.domain.name/redfish/v1/NetworkDevices[]
    … other redfish resource blocks…

Within this structure a switch is viewed as a standard data center system for its common subsyste`ms such as chassis, power, thermal, cooling, management access setup, etc while the networking and NPU specific modeling is done within the instances of the NetworkDevices[] collection. Each NetworkDevices[] instance has its own schema expressed in terms of translated Yang modules allowing the switch to present different views of its data where necessary. In addition the set of modules grouped under a NetworkDevice instance can follow a standard grouping expressed as a profile to manage different classes of equipment and satisfy different use cases. For example the earlier examples of a basic switch within a converged infrastructure use case verses virtualized edge router.

**add baseline switch list of YANG modules as example here**

To allow OData access to the YANG modules which form the elements and resources of the Redfish networking model, YANG files are translated to CSDL (Common Schema Definition Language). The YANG translation has its own specification (reference here) with the following main points:

* Includes, imports, augments, are compiled out to create a single consistent schema block constituting a particular instance of a NetworkDevice.
* The YANG node tree layout is reflected in the URI layout
* The individual YANG container nodes and list nodes are rendered as resources with the YANG tree hierarchy reflected as navigation properties.

Access to the YANG data model elements using Redfish JSON access via a provider on the URI target.

Leaf nodes representing common back end system “features or elements” return consistent data independent of node name and network device hierarchy.

The NetworkDevices[] collection allows

* Multiple co-existing and consistent views onto a system.
	* Horizontally extensible
	* Vertical hierarchy allowing for control interface delegation 
* This is similar to a “view class” or façade approach in software

For example a router could have the following

    //some.domain.name/redfish/v1/NetworkDevices/masterRouter
    //some.domain.name/redfish/v1/NetworkDevices/vrf1
    //some.domain.name/redfish/v1/NetworkDevices/vrf2

In this example masterRouter represents the complete system with all interfaces, all tables, all system level configuration, and a model structure for assigning resources to virtual instances. vrf1 and vrf2 represent a particular partitioning of the system to create virtual router instances each assigned a subset of the total resource pool.

The following shows the result of mapping RFC7223 (ietf_interface module) to the Redfish schema.  Below is the fragment of the data model

    +--rw interfaces
    | +--rw interface* [name]
    | +--rw name string
    | +--rw description? string
    | +--rw type identityref
    | +--rw enabled? boolean
    | +--rw link-up-down-trap-enable? enumeration
    +--ro interfaces-state
    +--ro interface* [name]
    +--ro name string
    +--ro type identityref
    +--ro admin-status enumeration

The translation to Redfish CSDL is performed using the RFC's YANG code.  The translation will generate the CSDL files for the ietf_interfaces resource and each YANG container. The path to these resources are mirror the above data model.

    /redfish/v1/NetworkDevices/Switch1
    /redfish/v1/NetworkDevices/Switch1/ietf_interfaces
    /redfish/v1/NetworkDevices/Switch1/ietf_interfaces/interfaces
    /redfish/v1/NetworkDevices/Switch1/ietf_interfaces/interfaces/ethernet1

An HTTP GET of the "ethernet1" singleton resource will return the following JSON document.  Note that each property from the data model is present in the resource.

    {
    	"Id": "ethernet1",
    	"name": "ethernet1",
    	"description": "Ethernet interface on slot 1",
    	"type": "iana_if_type:ethernetCsmacd",
    	"enabled": "true",
    	"link_up_down_trap_enable": "true"
    
    	"@odata.context": "/redfish/v1/$metadata#ietf_interfaces.interfaces.interface",
    	"@odata.type": "#interface_v1_0_0.interfaces",
    	"@odata.id": "/redfish/v1/NetworkDevices/Switch1/ietf_interfaces/interfaces/ethernet1"
    }


