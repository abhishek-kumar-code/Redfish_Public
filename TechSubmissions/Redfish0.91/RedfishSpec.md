# Redfish Specification

**Version 0.91**

**September 3, 2014**

    Copyright © 2013-2014 Avocent Corporation. Copyright © 2014 Dell Inc. Copyright © 2013-2014 Hewlett-Packard
    Development Company, L.P. Copyright © 2014 Intel Corporation. All Rights Reserved.
    
    Implementation of certain elements of this specification may be subject to patent rights,
    including provisional patent rights (herein "patent rights"). The authors and their respective companies (we)
    makes no representations to users of the standard as to the existence of such rights, and is not responsible 
    to recognize, disclose, or identify any or all such patent right, owners or claimants, nor for any incomplete
    or inaccurate identification or disclosure of such rights, owners or claimants. We shall have no liability to
    any party, in any manner or circumstance, under any legal theory whatsoever, for failure to recognize, 
    disclose, or identify any such patent rights, or for such party's reliance on the specification or incorporation
    thereof in its product, protocols or testing procedures. We shall have no liability to any party implementing
    such specification, whether such implementation is foreseeable or not, nor to any patent owner or claimant, and
    shall have no liability or responsibility for costs or losses incurred if a specification is withdrawn or modified
    after publication, and shall be indemnified and held harmless by any party implementing the specification from any
    and all claims of infringement by a patent owner for such implementations.
    
    We provide this specification “as is” without any warranty of any kind, whether express or implied, including,
    but not limited to, any implied warranties of ownership, merchantability, fitness for a particular purpose, title
    and noninfringement. This specification is subject to change without notice.

- [Abstract](#abstract)
- [Acknowledgments](#acknowledgments)
- [Introduction](#introduction)
	- [Target Audience](#target-audience)
	- [References](#references)
	- [Terminology](#terminology)
	- [Acronyms and Abbreviations](#acronyms-and-abbreviations)
	- [Conformance Terminology](#conformance-terminology)
- [Overview](#overview)
	- [Principal Goals & Scope](#principal-goals--scope)
		- [REST based](#rest-based)
		- [Separation of Protocol from Data Model](#separation-of-protocol-from-data-model)
		- [Hypermedia API Service Endpoint](#hypermedia-api-service-endpoint)
		- [Model Oriented (JSON)](#model-oriented-json)
		- [Scope](#scope)
		- [Design Goals & Limitations](#design-goals--limitations)
			- [Design Tenets](#design-tenets)
			- [Limitations](#limitations)
	- [Services](#services)
		- [Synchronous and Asynchronous Operation Support](#synchronous-and-asynchronous-operation-support)
		- [Eventing Mechanism](#eventing-mechanism)
		- [Actions](#actions)
		- [Discovery](#discovery)
		- [Device support (SOL, KVM, RM)](#device-support-sol-kvm-rm)
	- [Security Intro](#security-intro)
- [Transport](#transport)
	- [Methods](#methods)
		- [GET](#get)
			- [Retrieving Collections](#retrieving-collections)
		- [PUT](#put)
		- [PATCH](#patch)
		- [DELETE](#delete)
		- [POST](#post)
		- [HEAD](#head)
	- [Protocol Version](#protocol-version)
	- [URIs](#uris)
	- [Media Types](#media-types)
	- [Requests](#requests)
		- [Request Headers](#request-headers)
		- [Query Parameters](#query-parameters)
	- [Responses](#responses)
		- [Response Headers](#response-headers)
		- [Status Codes](#status-codes)
		- [Extended Error Handling](#extended-error-handling)
	- [Eventing](#eventing)
		- [Message Subscription](#message-subscription)
		- [Event Message Objects](#event-message-objects)
		- [Subscription Cleanup](#subscription-cleanup)
	- [Structure for Asynchronous Operations](#structure-for-asynchronous-operations)
	- [HTTP Redirect](#http-redirect)
	- [ETags](#etags)
- [Data Model & Schema](#data-model--schema)
	- [Overview](#overview-1)
	- [Redfish Resources](#redfish-resources)
	- [Standard Redfish Resource Properties](#standard-redfish-resource-properties)
		- [Type](#type)
		- [href](#href)
		- [extref](#extref)
		- [Name](#name)
		- [Description](#description)
		- [Created](#created)
		- [Modified](#modified)
		- [OEM](#oem)
		- [Settings](#settings)
		- [SettingsResult](#settingsresult)
		- [Items](#items)
		- [Page](#page)
		- [Count](#count)
		- [Member](#member)
		- [MemberType](#membertype)
		- [Context](#context)
		- [Registry](#registry)
		- [links](#links)
		- [Schema](#schema)
		- [Status](#status)
		- [Actions](#actions-1)
		- [AvailableActions](#availableactions)
		- [CorrelatableID](#correlatableid)
		- [Other common properties](#other-common-properties)
	- [Property Requirements](#property-requirements)
	- [Localization Considerations](#localization-considerations)
	- [Redfish Schema Requirements](#redfish-schema-requirements)
		- [Consistency:](#consistency)
		- [Standard Timestamp Format](#standard-timestamp-format)
		- [URI references](#uri-references)
		- [Correlatable ID references](#correlatable-id-references)
		- [Standardized Units](#standardized-units)
		- [Name Consistency](#name-consistency)
			- [Property Name Consistency](#property-name-consistency)
			- [Value Consistency](#value-consistency)
		- [Schema Extensibility](#schema-extensibility)
		- [JSON Schema Extensions](#schema-extensions)
		- [Schemas and Registries](#schemas-and-registries)
- [Service Elements](#service-elements)
	- [Timestamp Management](#timestamp-management)
	- [Resource Tree Stability](#resource-tree-stability)
	- [Discovery](#discovery-1)
		- [UPnP Compatibility](#upnp-compatibility)
		- [USN Format](#usn-format)
		- [M-SEARCH Response](#m-search-response)
		- [Notify, Alive, and Shutdown messages](#notify-alive-and-shutdown-messages)
- [Security](#security)
	- [Goals](#goals)
	- [Protocols](#protocols)
		- [Discovery](#discovery-2)
		- [Transport](#transport-1)
			- [TLS](#tls)
			- [Cipher suites](#cipher-suites)
			- [Certificates](#certificates)
		- [FIPS/Common Criteria Compliance](#fipscommon-criteria-compliance)
	- [Sensitive Data](#sensitive-data)
	- [Authentication](#authentication)
		- [HTTP Header Security](#http-header-security)
			- [HTTP Redirect](#http-redirect-1)
		- [Extended Error Handling](#extended-error-handling-1)
		- [HTTP Header Authentication](#http-header-authentication)
			- [BASIC authentication](#basic-authentication)
			- [Digest auth?](#digest-auth)
			- [Negotiate?](#negotiate)
			- [Request / Message Level Authentication](#request--message-level-authentication)
			- [Certificate based authentication?](#certificate-based-authentication)
		- [Session Management](#session-management)
			- [Session Lifecycle Management](#session-lifecycle-management)
			- [Login Sessions](#login-sessions)
			- [Login](#login)
			- [Logout](#logout)
			- [X-Auth-Token HTTP Header](#x-auth-token-http-header)
		- [AccountService](#accountservice)
		- [Async Tasks](#async-tasks)
		- [Event Subscriptions](#event-subscriptions)
		- [Privilege Model / Authorization](#privilege-model--authorization)
		- [Role Based Privilege](#role-based-privilege)
	- [Data Model Validation](#data-model-validation)
		- [Schema](#schema-1)
	- [Logging](#logging)
		- [Required data for security log entries](#required-data-for-security-log-entries)
		- [Completeness of Logging](#completeness-of-logging)
		- [Content of Audit Logs](#content-of-audit-logs)
- [Appendix A](#appendix-a)
	- [Known attack vector mitigation](#known-attack-vector-mitigation)
- [Appendix B: Notes](#appendix-b-notes)

## Abstract

Redfish is a new interface that uses RESTful interface semantics to access data defined in model format to perform out of band systems management.  It is suitable for a wide range of servers, from stand-alone servers to rack mount and bladed environments but scales equally well for large scale cloud environments.

This document or artifact is not a standard and it may change, perhaps profoundly, before it is officially published by a recognized Standards Development Organization.  The document or artifact is being made available for public review and comment only.

## Acknowledgments

The following persons were instrumental in the development of this specification: Jeff Hilland, Mike Garrett, Jeff Autor, Chris Davenport, David Brockhaus, Chris Hoffman, Jim Shelton, Donnie Sturgeon, Steve Geffin, Jon Hass, Paul Vancil, Gamma Dean, P Chandrasekhar.

## Introduction

There are several out of band systems management standards (defacto and de jour) available in the industry.  They all either vary widely in implementation, were developed for single server embedded environments or have their roots in antiquated software modeling constructs.  There is no single industry standard that is simple to use, based on emerging programming standards, embedded friendly and capable of meeting large scale data center & cloud needs.

### Target Audience

The intended target audience for this document is readers interested in understanding the Redfish Systems Management Architecture.  This includes clients and  implementers of the service as well as those interested in using REST based interfaces for systems management.  This document is written under the assumption that the reader has some basic understanding in modeling methodology as well as HTTP.

### References

* IETF RFC 2616, R. Fielding et al., HTTP/1.1, [http://www.ietf.org/rfc/rfc2616.txt](http://www.ietf.org/rfc/rfc2616.txt "http://www.ietf.org/rfc/rfc2616.txt")
* IETF RFC 2617  J. Franks et al., HTTP Authentication: Basic and Digest Access Authentication, [http://www.ietf.org/rfc/rfc2617.txt](http://www.ietf.org/rfc/rfc2617.txt "http://www.ietf.org/rfc/rfc2617.txt")
* IETF RFC 3986  T. Berners-Lee et al, Uniform Resource Identifier (URI): Generic Syntax, [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt "http://www.ietf.org/rfc/rfc3986.txt")
* IETF RFC 4627, D. Crockford, The application/json Media Type for JavaScript Object Notation (JSON), [http://www.ietf.org/rfc/rfc4627.txt](http://www.ietf.org/rfc/rfc4627.txt "http://www.ietf.org/rfc/rfc4627.txt")
* IETF RFC 5988, M. Nottingham, Web linking, [http://www.ietf.org/rfc/rfc5988.txt](http://www.ietf.org/rfc/rfc5988.txt "http://www.ietf.org/rfc/rfc5988.txt")
* IETF RFC 6901, P. Bryan, Ed. et al, JavaScript Object Notation (JSON) Pointer, [http://www.ietf.org/rfc/rfc6901.txt](http://www.ietf.org/rfc/rfc6901.txt "http://www.ietf.org/rfc/rfc6901.txt")
* IETF RFC 6906, E. Wilde, The 'profile' Link Relation Type, [http://www.ietf.org/rfc/rfc6906.txt](http://www.ietf.org/rfc/rfc6906.txt "http://www.ietf.org/rfc/rfc6906.txt")
* ISO/IEC Directives, Part 2, Rules for the structure and drafting of International Standards, [http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH](http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH "http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH")
* JSON Schema, Core Definitions and Terminology, Draft 4
[http://tools.ietf.org/html/draft-zyp-json-schema-04.txt](http://tools.ietf.org/html/draft-zyp-json-schema-04.txt "http://tools.ietf.org/html/draft-zyp-json-schema-04.txt")
* JSON Schema, Interactive and Non-Interactive Validation, Draft 4
[http://tools.ietf.org/html/draft-fge-json-schema-validation-00.txt](http://tools.ietf.org/html/draft-fge-json-schema-validation-00.txt "http://tools.ietf.org/html/draft-fge-json-schema-validation-00.txt")
* Redfish Schema, Specification and Schema
[http://www.RedfishSpecification.org](http://www.RedfishSpecification.org "http://www.RedfishSpecification.org")

### Terminology


| Term           | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---            | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Collection     | A Collection is a Resource that acts as a container of other Resources. Collections usually have only properties that are common to all other Collections. The members of a Collection usually have similar characteristics. The container processes messages sent to the container. The members of the container process messages sent only to that member without affecting other members of the container.  |
| CRUD           | Basic intrinsic operations used by any interface: Create, Read, Update and Delete.                                                                                                                                                                                                                                                                                                                                                                                                              |
| Event          | A record that corresponds to an individual alert.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Message        | A complete request or response, formatted in HTTP/HTPS.  The protocol, based on REST, is a request/response protocol where every Request should result in a Response.                                                                                                                                                                                                                                                                                                                           |
| Operation      | The HTTP request methods which map generic CRUD (Create, Read, Update Delete) operation.  These are POST, GET, PUT/PATCH, HEAD and DELETE.                                                                                                                                                                                                                                                                                                                                                      |
| Redfish Schema | The Schema definitions for Redfish resources.  It is defined in JSON Schema notation.                                                                                                                                                                                                                                                                                                                                                                                                           |
| Request        | A message from a Client to a Server.  It consists of a request line (which includes the Operation), request headers, an empty line and an optional message body.                                                                                                                                                                                                                                                                                                                                |
| Resource       | A Resource is addressable by a URI and is able to receive and process messages. A Resource can be either an individual entity, or an entity that acts as a container for several other entities.                                                                                                                                                                                                                                                                                             |
| Resource Tree  | A Resource Tree is a tree structure of JSON encoded resources accessible via a well-known starting URI.  A client may discover the resources available on a Redfish Service by following the resource links from the base of the tree. <br>**NOTE** for Redfish client implementation:  Although the resources are a tree, the references between resources may result in graph instead of a tree.  Clients traversing the resource tree must contain logic to avoid infinite loops.      |
| Response       | A message from a Server to a Client in response to a request message.  It consists of a status line, response headers, an empty line and an optional message body.                                                                                                                                                                                                                                                                                                                              |
| Subscription   | The act of connecting to an error service in order to receive events.                                                                                                                                                                                                                                                                                                                                                                                                                           |

### Acronyms and Abbreviations

| Term   | Definition                                          |
| ---    | ---                                                 |
| CSRF   | Cross-Site Request Forgery                          |
| HTTP   | Hypertext Transfer Protocol                         |
| HTTPS  | Hypertext Transfer Protocol over TLS                |
| IP     | Internet Protocol                                   |
| JSON   | JavaScript Object Notation                          |
| KVM    | Keyboard, Video, Mouse                              |
| NIC    | Network Interface Card                              |
| PCI    | Peripheral Component Interconnect                   |
| XSS    | Cross-Site Scripting                                |

### Conformance Terminology

The terms defined in this section are used throughout the document to indicate how certain behaviors conform or do not conform to this specification.  Consult ISO/IEC Directives, Part 2, Rules for the structure and drafting of International Standards for details.

For the purposes of this document, the following terms and definitions apply. 

| Term | Usage
| --- | --- 
| can | used for statements of possibility and capability, whether material, physical, or causal 
| cannot | used for statements of possibility and capability, whether material, physical, or causal 
| conditional | indicates requirements to be followed strictly in order to conform to the document when the specified conditions are met 
| mandatory | indicates requirements to be followed strictly in order to conform to the document and from which no deviation is permitted 
| may | indicates a course of action permissible within the limits of the document 
| need not | indicates a course of action permissible within the limits of the document 
| optional | indicates a course of action permissible within the limits of the document 
| shall | indicates requirements to be followed strictly in order to conform to the document and from which no deviation is permitted
| shall not | indicates requirements to be followed in order to conform to the document and from which no deviation is permitted
| should | indicates that among several possibilities, one is recommended as particularly suitable, without mentioning or excluding others, or that a certain course of action is preferred but not necessarily required 
| should not | indicates that a certain possibility or course of action is deprecated but not prohibited 

## Overview

Redfish is a management standard using a data model representation inside of a hypermedia RESTful interface.  The model is expressed in terms of JSON Schema with the payload of the messages being expressed in JSON.  Because it is based on REST, it is easier to use and implement than many other solutions.  Since it is model oriented, it is capable of expressing the relationships between components in modern systems as well as the semantics of the services and components within them.  It is also easily extensible.  By using a hypermedia approach to REST, Redfish can express a large variety of systems from multiple vendors.  By requiring JSON representation, a wide variety of resources can be created in a denormalized fashion to not only improve scalability but the payload can be easily interpreted by most programming environments as well as being relatively intuitive for a human examining the data.  The JSON Schema definition of the resources allows the meta data to be associated with the data without encumbering Redfish services with the meta data, thus enabling a complex client as found in many data center and cloud environments.    

### Principal Goals & Scope

There are many principles and goals of Redfish as an architecture, a protocol and a data representation.  It is intended that this architecture support a wide variety of systems found in service today - from stand alone machines to racks of equipment found in cloud service environment.  Extensibility is a key goal, as is forward compatibility and deterministic behavior.  Leveraging the protocols widely accepted and used in environments today is a key strategy to achieve these goals.  Simplicity to the extent possible is another goal, achieved by making as few operations and as few instances as possible in the model.  Matching the programming environments that are being widely adopted today is another goal.  There are other goals as well. These are presented in detail in this section.

#### REST based

This document defines a RESTful interface. Many applications are providing RESTful interfaces. However, there are nearly as many RESTful interfaces as there are applications.

There are several reasons to define a RESTful interface:
* It enables a light weight implementation, where economy is a necessity (smaller data transmitted than SOAP, fewer layers to the protocol than WS-Man).
* It is on a trajectory to become a prevalent access method in the industry.
* It is easy to learn and easy to document.
* There are also a number of toolkits & development environments that can be used for REST.
* The embedded footprint (both memory and cpu) is less than for other   interfaces.
* It supports data model semantics and maps easily to the common CRUD operations.
* It fits with our design principle of simplicity.
* It is equally applicable to software application space as it is for embedded environments thus enabling convergence and sharing of code of components within the management ecosystem.
* It is schema agnostic so adapts well to any modeling language.
* By using it, Redfish can leverage the security & discovery mechanisms in use in industry. 

#### Separation of Protocol from Data Model

The protocol operations are specified independently of the data model.  The protocol is also versioned independently of the data model.  The expectation is that the protocol version changes extremely infrequently, while the data model version is allowed to change as needed.  This implies that innovation should happen primarily in the data model, not the protocol.  It allows the data model to be extended and changed as needed without requiring the protocol or API version to change.

#### Hypermedia API Service Endpoint

Like other hypermedia APIs, Redfish has a single service endpoint URI and all other resources are accessible via opaque URIs referenced from the root.  Any resource discovered through links found by accessing the root service or any service or resource referenced using hrefs from the root service will conform to the same version of the protocol supported by the root service. 

Note that the ServiceRoot Schema places requirements on the last segment of the path for the URIs discoverable through the service root. 

#### Model Oriented (JSON)

Bitwise prior solutions (like IPMI) have difficulty showing relationships.  Model orientation solves this.  But current models that have evolved over time have become extremely complex, requiring many IOs to gather information.  For that reason, as well as the complexity of their protocols and operations, they have received little implementation attention.  Some have their roots in modeling multiple domains (printers, switches, software, etc).  Additionally the expression of meta data in those models have only been adopted by niche markets.   

Our direction is to create a model that is purpose built for managing systems.  We will leverage where it makes sense but remain otherwise unhindered in the model development. In order to scale, we need as few resources as possible tailor made for specific environments & use cases. All resources can be expressed in JSON format. JSON Schema will be used and extended to define classes.  Both JSON and JSON Schema are being widely adopted in multiple disciplines and have a large number of tools and programming languages that accelerate development when adopting these approaches. 

#### Scope

The scope of this specification is to define the next generation systems management interface.  This includes defining both the protocol and data model, as well as other architectural components needed for systems management environments.

Specifically, this document is intended to enable an open, industry-standard solution as proprietary or single-vendor efforts are not acceptable for target audience.  The focus is on out-of-band access for large scale environments, though this architecture is capable of being the architectural successor to many of the current management standards.  

#### Design Goals & Limitations

##### Design Tenets

The following design tenets govern the Redfish design:

* RESTful interface using a JSON data model
* Separation of protocol from data model, allowing them to be revised independently
* Specified versioning rules for protocol and schema
* Leverage strength of internet protocol standards where it meets architectural requirements, such as JSON, HTTP and the RFCs referenced by this document.
* Focused on scalable environments but capable of managing current server environments
* Focus on out-of-band access -- implementable on existing BMC and firmware products
* Present value-add features alongside standardized items
* Functionality must be usable by non-computer-science professionals
* Data definitions as obvious in context as possible
* Opaque view of implementation architecture
* "Top 10" customer needs are focus of first round schema definition.

##### Limitations

Redfish does not guarantee that client software will never need to be updated to accommodate new types of devices.  System optimization for an application will always require architectural oversight.  However, Redfish does attempt to minimize instances of forced upgrades to clients using Schemas, strict versioning and forward compatibility rules and through separation of the protocol from the data model.

Redfish does not enable a client to read a Resource Tree and write it to another Redfish Service.  This is not possible as it is a hypermedia API. Only the root object has a well known URI. The resource topology reflects the topology of the system and devices it represents.  Consequently, different server or device types will result in differently shaped resource trees, potentially even for identical systems from the same manufacturer. 

Additionally, not all Redfish resources are simple read/write resources.  Implementations may follow other interaction patterns discussed later.  As an example, user credentials or certificates cannot simply be read from one service and transplanted to another.  Another example is the use of Setting Data instead of writing to the same resource that was read from.

There is no raw/pass-thru interface as part of the standard.  This standard only represents the out-of-band access method.

### Services

#### Synchronous and Asynchronous Operation Support

While the majority of operations in this architecture are synchronous in nature, some operations can take a long time to execute, more time than a client typically wants to wait. For this reason, some operations can be asynchronous at the discretion of the service. The request portion of an asynchronous operation is no different from the request portion of a synchronous operation.

The use of HTTP Response codes enable a client to determine if the operation was completed synchronously or asynchronously.  For more information see the section on [Tasks](#task).

#### Eventing Mechanism

In some situations it is useful for a service to provide messages to clients that fall outside the normal request/response paradigm. These messages, called events, are used by the service to asynchronously notify the client of some significant state change or error condition, usually of a time critical nature.

Only one style of eventing is supported by this specification - push style eventing. In push style eventing, when the server detects the need to send an event, it uses an HTTP POST to push the event message to the client.  Clients subscribe to the eventing service to enable reception of events. 

Events originate from a specific resource. Not all resources are able to generate events. Those resources capable of generating events might not generate any events unless a client is listening for them. A client expresses interest in receiving events by sending a "subscribe" message to the resource. A subscribe message is sent using HTTP POST to the Event Subscriptions collection.

The Section on [Eventing](#eventing) further in this specification discusses the details of the eventing mechanism.


#### Actions

Operations can be divided into two sets: intrinsic and extrinsic.  Intrinsic operations, often referred to as CRUD, are mapped to HTTP methods and discussed in Section [Methods](#methods).  The protocol also has the ability to support extrinsic operations -- those operations that do not map easily to CRUD.  Examples of extrinsic would be items that collectively would be better performed if done as a set (for scalability, ease of interface, server side semantic preservation or similar reasons) or function calls that have no natural mapping to CRUD operations. Examples are software update or system reset.  A software update could be seen as three possible operations: transfer the image to be updated to the system, get the system to load the image and activate the image.  It is possible to combine these operations into one single action or one function call.  A system reset could be modeled as an update to state, but semantically the client is actually requesting a state change and not simply changing the value in the
state.

In Redfish, these extrinsic operations are called **actions** and are discussed in detail in different parts of this specification.

There are specific actions that are defined in the Redfish Schema that define every resource.  For these standard actions, the Redfish Schema contains the normative language on the behavior of the action.  OEMs extensions are also allowed to the schema and thus apply to actions as well.  Details of this can be found in the [Schema Extensibility](#schema-extensibility) & [JSON Schema Extensions](#schema-extensions) Sections.


#### Discovery

While the service itself is at a well-known URI, the service host must be discovered.  This specification uses 
SSDP for discovery.  Universal Plug and Play (UPnP) leverages it for discovery and currently  uses it.  SSDP is supported in a wide variety of devices, including printers.  It is simple, lightweight, IPv6 capable and suitable for implementation in embedded environments. 

For more information, see the section on [Discovery] (#discovery-1)

#### Device support (Serial Console, KVM-IP, Command Shell, Virtual Media)

A wide variety of devices and services are supported in this architecture.  Critical to out-of-band environments are mechanisms to support Serial Console access, Keyboard Video and Mouse (KVM-IP), Command Shell (i.e. Command Line interface) and remote Virtual Media.  Support for Serial Console, Command Shell, KVM-IP and Virtual Media are all encompassed in this standard and are expressed in the Schema.  This standard does not define the protocols or access mechanisms for accessing those devices and services.  The schema provides for the representation and configuration of those services, establishment of connections to enable those services and the operational status of those services.  However, the protocols themselves are outside the scope of this standard.

### Security Intro

The challenge with security in a remote interface that is programmatic is to ensure both the interfaces used to interact with Redfish and the data being exchanged are secured. This means designing the proper security control mechanisms around the interfaces and securing the channels used to exchange the data. As part of this, specific behaviors are to be put in place including defining and using a minimum levels of encryption for communication channels etc.

## Transport

The Redfish interface is based on REST.  Throughout this document, we refer to Redfish as having a protocol mapped to a data model.  More accurately, HTTP is the application protocol that will be used to transport the messages and TCP/IP is the transport protocol. The RESTful interface is a mapping to the message protocol.  For simplicity though, we will refer to the RESTful mapping to HTTP, TCP/IP and other protocol, transport and messaging layer aspects as the Redfish protocol. 

The Redfish protocol is designed around a web service based interface model, and designed for network and interaction efficiency for both user interface (UI) and automation usage. The interface is specifically designed around the REST   pattern semantics.

A Redfish interface shall be exposed through a web service endpoint implemented using Hypertext Transfer Protocols, version 1.1 (RFC 2616) technologies.

HTTP is ideally suited to a RESTful interface. This document will describe how HTTP is used in the Redfish interface and what constraints are added on top of HTTP to assure interoperability of Redfish compliant implementations.

HTTP methods are used by the Redfish protocol in the following manner:
* GET is used for object or collection retrieval.
* POST is used to create an object and for object action (a.k.a. extrinsic
  operations).
* PUT is used to replace objects.
* PATCH is used to update objects.
* DELETE is used for object or collection deletion.
* HEAD is used for object or collection header retrieval

HTTP uses media types to indicate the type of data that is being sent in the body of the message. The HTTP Content-Type header is used to indicate the media type of the body. The HTTP Accept header is used by the client to inform the service which media types it is able to accept in the response.  For Redfish, the media type supported is application/json.  The requirements for media types are discussed in the section [Media Types](#media-types).

HTTP uses status codes to indicate the server's attempt at processing the request.  Extended error handling is used to return more information than an HTTP error code.  The requirements for status codes and extended error handling are discussed in the sections [Status Codes](#status-codes)and [Extended Error Handling](#extended-error-handling) respectively.

The ability to send secure messages is important.
* Refer to the [Security](#security) section for TLS requirements.

Querying is provided for in the Redfish protocol.  Details are in the section entitled [Query Parameters](#query-parameters)

Push style eventing to a known URI is supported using POST, as described in section [Eventing](#eventing)

Some operations may take longer than required for synchronous return semantics. Consequently, deterministic asynchronous semantics are included in the architecture.  These are discussed further in the section [Synchronous and Asynchronous Operation Support](#synchronous-and-asynchronous-operation-support).

Actions are used for expanding operations beyond CRUD type operations, but should be limited in use.  Actions are detailed in Section [Actions](#actions).

### Methods

An attractive feature of the RESTful interface is the very limited number of
operations which are supported. The following table describes the general
mapping of operations to HTTP methods.  If the value in the column entitled "required" has the value "yes" then the HTTP method shall be supported by a Redfish interface.

| HTTP Method | Interface Semantic                       | Required  |
| ---         | ---                                      | ---       |
| POST        | Object create, Object action, Eventing   | Yes       |
| GET         | Object or Collection retrieval  	     | Yes       |
| PUT         | Object replace                           | No        |
| PATCH       | Object update                            | Yes       |
| DELETE      | Object delete                            | Yes       |
| HEAD        | Object or Collection header retrieval    | No        |

Other HTTP methods are not allowed and shall receive a [405](#status-405) response.

#### GET

The GET method is used to retrieve a representation of a resource.  That representation can either be a single resource or a collection. The service will return the representation using one of the media types specified in the Accept header, subject to requirements in the Media Types section [Media Types](#media-types). If the Accept header is not present, the service will return the representation in a service defined default representation for the resource.

  * The HTTP GET method shall be used to retrieve a resource without causing any side effects.
  * The service shall ignore the content of the body on a GET.
  * The representation returned from GET shall use a media type specified by the Accept header, if it is present  and if one of the media types specified is supported, or a default representation for the resource if the Accept header is not present where the list of allowable media types is in section [Media Types](#media-types).
  * This operation shall be idempotent in the absence of outside changes to the resource.

##### Retrieving Collections
Retrieving a collection is done by sending the HTTP GET method to the URI for the collection. The response will be a representation that includes the collection's attributes as well as possibly links and potentially a list of the members of the collection, if any, as defined by the Collection schema. A subset of the members can be returned using some of the query parameters described in section [Query Parameters](#query-parameters)

No requirements are placed on implementations to return a consistent set of members when a series of requests using filtering query parameters are made over time to obtain the entire set of members. It is possible that this could result in missed or duplicate elements being retrieved if multiple GETs are used to retrieve a collection using paging.

* Clients shall not make assumptions about the URIs for the resource members of a collection.
* Retrieving a collection should always return the total number of members in the collection in the reply.
* If retrieving a collection results in a result of multiple pages, then the total shall be returned. If a filter accompanies the query and the total is returned, then the total shall be the total number of resources that would be returned from the query, if there was no pagination (or enforced resource limits).  It is recommended that under pagination that the actual count of resources returned in the page be included in the response as well.
* The total should be returned in a property called Total and the members of the collection in an array called Items.   The total number of resources on any given page should be returned in a property called Count.

#### PUT

The PUT method is used to completely replace a resource.  This mechanism allows for the removal of
elements from an object by not including them in the request, should the Redfish service allow it for that resource.

  * Redfish protocol services may support the PUT method to replace a resource in whole.  If a Redfish service does not implement this method, status code [405](#status-405) shall be returned. 
  * Redfish protocol services may return a representation of the resource after any server-side transformations in the body of the response.
  * Redfish protocol services using this operation against a collection is undefined.
  * This operation should be idempotent in the absence of outside changes to the resource, with the possible exception that ETAG values may change as the result of this operation.

#### PATCH

The PATCH method is used to perform updates on pre-existing objects in part.  The changes to the resource are sent in the request body. The response is either empty or a representation of the resource after the update was done. The implementation may reject the update operation on certain fields based on its own policies and, if it does so, shall not apply any of the update requested.  Updates to resources are idempotent.

  * Redfish protocol services shall support the PATCH method to update a resource. If the resource can never be updated, status code [405](#status-405) shall be returned.
  * Redfish protocol services may return a representation of the resource after any server-side transformations in the body of the response.
  * Redfish protocol services shall support the use of PATCH on array elements by using an empty object (represented as {} ) to indicate an array element that is not to be modified.
  * If a property in the request cannot be updated, such as when a property is read only or a property in the request is not in the resource, and a status code of [200](#status-200) or [400](#status-400) shall be returned along with an extended error in the body.  Other properties may be updated in the resource.
  * Redfish protocol services using this operation against a collection is undefined.
  * This operation should be idempotent in the absence of outside changes to the resource provided it is used with ETags to prevent subsequent PATCH attempts. Note that the ETAG value should change as the result of this operation.

#### DELETE

The DELETE method is used to remove resources.

  * Redfish protocol services shall support the DELETE method for resources that can be deleted. If the resource can never be deleted, status code [405](#status-405) shall be returned.
  * Redfish protocol services may return a representation of the just deleted resource in the response body.
  * Redfish protocol services using this operation against a collection is undefined.
  * This operation shall not be not idempotent.

#### POST

The POST method is used to create new object instances and to initiate non-idempotent operations on the object (such as Actions).

  * Redfish protocol services shall support the POST method for creating resources and sending actions. If the resource does not offer anything to be created and does not support actions, status code [405](#status-405) shall be returned.
  * If the new object is to be part of a collection, the POST request is sent to and performed on the collection to which this new object is to belong.
  * This operation shall not be idempotent.

For a create, the body of the request is used to send either a representation of the object to be created, or a list of parameters providing information necessary for the creation of the resource. If a resource representation is sent, the service can ignore any service controlled attributes (e.g. id), forcing those attributes to be overridden by the service. The service shall set the Location header to the URI of the newly 
created resource. The response will optionally include a representation of the newly created resource.

Custom actions are requested on a resource by sending the HTTP POST method to the URI of the resource which supports invoking the action.  The body of the request includes the parameters necessary to complete the requested action.  A custom action consists of the name of the action and a set of parameters represented as name/value pairs that provide information for the action to use.

If an action is supported, implementations shall support the [AvailableActions](#availableactions) property and structure in the resource and the schema for that resource.  Clients can then query the resource directly to determine the actions that are available as well as possible parameters.  Some parameter information may require the client to examine the schema corresponding to the resource. 

The exact syntax of the body of the action's POST request is specified in the Redfish Schema for that resource.

For instance, if a schema has an AvailableActions section such as this example:

~~~json
{
    "AvailableActions": {
        "type": "array",
        "items": [
            {
                "type": "object",
                "properties": {
                    "Action": {
                        "type": "string",
                        "enum": [
                            "Reset"
                        ]
                    },
                    "Capabilities": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                                "PropertyName": {
                                    "type": "string",
                                    "enum": [
                                        "ResetType"
                                    ]
                                },
                                "AllowableValues": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "enum": [
                                            "On",
                                            "Off",
                                            "Reset",
                                            "ColdReset",
                                            "Nmi",
                                            "GracefulShutdown"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
}
~~~


And the resource has an AvailableActions property such as this:

~~~json
{
    "AvailableActions": [
        {
            "Action": "Reset",
            "Capabilities": [
                {
                    "PropertyName": "ResetType",
                    "AllowableValues": [
                        "On",
                        "Off",
                        "Reset"
                    ]
                }
            ]
        }
    ]
}
~~~

Then the following would represent a possible request body for the Action:

~~~json
{
    "Action": "Reset",
    "ResetType": "On"
}
~~~

#### HEAD

The HEAD method differs from the GET method in that it MUST NOT return message
body information.  However, all of the same meta information and status codes in the HTTP headers will be returned as though a GET method were processed, including authorization checks.

  * Redfish protocol services MAY support the HEAD method in order to return meta information in the the form of HTTP response headers.
  * Redfish protocol services MAY support the HEAD method in order to verify link validity.
  * Redfish protocol services MAY support the HEAD method in order to verify resource accessibility
  * Redfish protocol services will not support any other use of the HEAD method.
  * This operation shall be idempotent in the absence of outside changes to the resource.

### Protocol Version
The Version of the Redfish Protocol supported by this specification is Version 1.0.  Note that the protocol version is separate from the version of the resources or the version of the schema supported by them.  Changes to the resources are noted via ETags.  Versions of the schema for resources are noted in the resource's [Type](#type) property.

Each version of the Redfish protocol is strongly typed.  This is accomplished using the URI of the Redfish Service in combination with the resource obtained at that URI, called the ServiceRoot. The URI version subcomponent of the URI is string of the format: `v<majorversion>` where:

* majorversion = integer:  something in the class changed in a backward incompatible way.
* minorversion = integer:  a minor update.  New functionality may have been added but nothing removed. Compatibility will be preserved with previous  minorversions.
* errata = integer: something in the prior version was broken and needed to be fixed.

While the majorversion is represented in the URI, the majorversion, minorversion and errata versions are represented in the Version property of the ServiceRoot resource, as defined in the Schema for that resource.  

The root URI for Redfish protocol version 1 shall be "/rest/v1".

Any resource discovered through links found by accessing the root service or any service or resource referenced using hrefs from the root service shall conform to the same version of the protocol supported by the root service. 


### URIs

A URI is used to identify a resource in HTTP, including the base Redfish service and Redfish resources.

  * A URI shall be a unique identifier to a resource.
  * A URI shall be treated by the client as opaque, and thus should not be attempted to be understood or deconstructed by the client

To begin operations, a client must know the URI for a resource.

  * Dereferencing the URI to a resource (via a GET operation) shall yield a representation for the resource containing resource attributes, and links to associated resources.

The base resource URI is well known and is based on the protocol version.  Discovering the URIs to additional resources is done through observing the associated resource links returned in previous responses.  This approach to URIs is becoming known as a Hypermedia API.

The URI is the primary unique identifier of resources.  Redfish considers 3 parts of the URI as described in RFC3986. 

The first part includes the scheme and authority portions of the URI. The second part includes the root service and version.  The third part is a unique resource identifier.
* The example shows the first portion which is the service path and is https://mgmr.vendor.com.
* The example shows the second portion which is the base resource and version and is /rest/v1
* The example shows the third portion which is the unique resource path and is System/1.

    Example: https://mgmt.vendor.com/rest/v1/System/1

* The scheme and authority portions of the URI _shall not_ be considered part of the unique _identifier_ of the resource. This is due to redirection capabilities and local operations which may result in the variability of the connection portion.  The remainder of the URI (the service and resource paths) is what _uniquely identifies_ the resource, and this is what is returned in all Redfish APIs.  

* The unique identifier portion of a URI _shall_ be unique within the implementation.

For example, a POST may return the following URI in the Location header of the response (indicating the new resource created by the POST):

    Example: /rest/v1/System/2

Assuming the client is connecting through an appliance named "mgmt.vendor.com", the full URI needed to access this new resource is https://mgmt.vendor.com/rest/v1/System/2.

hrefs may also be locally relative URIs.  In some cases a provider may not be able to refer to a child or sibling, or parent resource by full path (perhaps it does not know the topology of the Resource Tree).  In this case the following relative "dot-notation" forms shall be interpreted by the client as follows:

	Child:  "./child"
	Sibling:  "../sibling"
	Parent:  ".."

URIs as described in RFC3986 may also contain a query (?query) and a frag (#frag).  Queries are addressed in the section [Query Parameters](#query-parameters).  Fragments (frag) shall be ignored by the server when used as the URI for submitting an operation. Frags shall not be used in an href in a links section. Frags may be used in places like CorrelatableIDs and Events, thus clients should expect to parse them for Events but CorrelatableIDs are opaque.  When a Frag is used, it shall be of JSONPointer format according to RFC6901. This includes the "frag" property in the "links" section for collections. 


### Media Types

Some resources may be available in more than one type of representation. The type of representation is indicated by the media type. In HTTP messages the media type is specified in the Content-Type header. A client can tell a service that it wants the response to be sent using certain media types by setting the HTTP Accept header to a list of the acceptable media types.

In order to provide a common base for interoperability, all resources will be made available using the JSON media type. Media types of "application/json" shall be supported by a Redfish implementation on both requests and responses.

* Redfish service providers _shall_ make every resource available in a representation   based on JSON, as specified in [RFC4627][]. This means message receivers shall not reject a message because it is encoded in JSON, and shall offer at least one response representation based on JSON. An implementation may offer representations using non-JSON media types.

[RFC4627]: http://www.ietf.org/rfc/rfc4627.txt

Responses to GET requests may be compressed.  Clients shall be prepared to accept a Content-Encoding of gzip in a Response to a GET. 

### Requests

This section describes request requirements which can be sent to Redfish services.

#### Request Headers

HTTP defines headers that can be used in request messages. The following table defines those headers and their requirements for Redfish services.

* Redfish protocol services _shall_ understand and be able to process the headers in the following table as defined by the HTTP 1.1 specification if the value in the Required column is set to "yes" .
* Redfish protocol services _should_ understand and be able to process the headers in the following tables as defined by the HTTP 1.1 specificaation if the value in the Required column is set to "no".  

| Header          | Required | Supported Values                      | Description                                                                                                                                                                                                                                                                                                             |
| --------        | ---      | -----------------                     | ------------                                                                                                                                                                                                                                                                                                            |
| Accept          | Yes      | [RFC 2616, Section 14.1][2616-14.1]   | Indicates to the server what media type(s) this client is prepared to accept. `application/json` shall be supported.                                                                                                                                                                                                                                            
| Accept-Encoding | Yes      | [RFC 2616, Section 14.4][2616-14.4]   | Indicates if gzip encoding can be handled by the client
| Accept-Language | No       | [RFC 2616, Section 14.4][2616-14.4]   | This header is used to indicate the language(s) requested in the response. If this header is not specified, the appliance default locale will be used.                                                                                                                                                                 
| Content-Type    | Conditional | [RFC 2616, Section 14.17][2616-14.17] | Describes the type of representation used in the message body.  `charset=utf-8` shall be supported for requests that have a body.  Shall be required if there is a request body.                                                                                                                                                                                                                                                         
| Content-Length  | No       | [RFC 2616, Section 14.3][2616-14.3]   | Describes the size of the message body. An optional means of indicating size of the body uses Transfer-Encoding: chunked, which does not use the Content-Length header. If a service does not support Transfer-Encoding and needs Content-Length instead, the service will respond with status code [411](#status-411). |
| Authorization   | No       | [RFC 2617, Section 2][2617-2]         | See [Basic Authorization](#basic-auth)                                                                                                                                                                                                                                                                                  
| User-Agent      | Yes      | [RFC 2616, Section 14.43][2616-14.43] | Required for tracing product tokens and their version.  Multiple product tokens may be listed.                                                                                                                                                                                                                          
| Host            | Yes      | [RFC 2616, Section 14.23][2616-14.23] | Required to allow support of multiple origin hosts at a single IP address.                                                                                                                                                                                                                                              
| Origin          | Yes      | [W3C CORS, Section 5.7][cors-5.7]     | Used to allow web applications to consume Redfish service while preventing CSRF attacks.                                                                                                                                                                                                                                
| Via             | No       | [RFC 2616, Section 14.45][2616-14.45] | Indicates network hierarchy and recognizes message loops. Each pass inserts its own VIA.                                                                                                                                                                                                                                
| Max-Forwards    | No       | [RFC 2616, Section 14.31][2616-14.31] | Limits gateway and proxy hops. Prevents messages from remaining in the network indefinitely.                                                                                                                                                                                                                        |
| If-Match        | No [<sup>1</sup>](#if-match-note-1)     | [RFC 2616, Section 14.31][2616-14.31] | The service will attempt to update the resource only if the current ETag for the resource matches the ETag passed in this HTTP header. If the ETag specified in this header does not match the resource's current ETag, status code [412](#status-412) will be returned.
| If-None-Match   | No       | [RFC 2616, Section 14.31][2616-14.31] | If this HTTP header is present, the service will only return the requested resource if the current ETag of that resource does not match the ETag sent in this header.  If the ETag specified in this header matches the resource's current ETag, the status code returned from the GET will be [304](#status-304).

* Redfish protocol services _shall_ understand and be able to process the headers in the following table as defined by this specification if the value in the Required column is set to "yes" .

| Header          | Required | Supported Values                      | Description                                                                                                                                                                                                                                                                                                             |
| --------        | ---      | -----------------                     | ------------                                                                                                                                                                                                                                                                                                            |
| X-Auth-Token    | Yes       | Opaque encoded octet strings          | Used for bearer authentication of user sessions. The token value _shall_ be indistinguishable from random.                                                                                                                                                                                                             |

* <a name="if-match-note-1">_1_</a> If-Match _shall_ be supported for Atomic requests on AccountService objects


[2616-14.1]: http://pretty-rfc.herokuapp.com/RFC2616#header.accept
[2616-14.4]: http://pretty-rfc.herokuapp.com/RFC2616#header.accept-language
[2616-14.23]: http://pretty-rfc.herokuapp.com/RFC2616#header.host
[2616-14.31]: http://pretty-rfc.herokuapp.com/RFC2616#header.max-forwards
[2616-14.43]: http://pretty-rfc.herokuapp.com/RFC2616#header.user-agent
[2616-14.45]: http://pretty-rfc.herokuapp.com/RFC2616#header.via
[2617-2]: http://pretty-rfc.herokuapp.com/RFC2617#basic-authentication-scheme
[cors-5.7]: http://www.w3.org/TR/cors/

#### Query Parameters

A subset of the members of a collection can be returned using the query parameters in this section.
services should support the query parameters in the following table. Clients may send these query parameters when the resource addressed is a collection.  If query parameters are not supported, the implementations shall return an HTTP error code of 400 and should return an extended error indicating that query parameters are not supported for this resource.  Implementations shall ignore unknown or unsupported query parameters. 

| Attribute | Description                                                                                                                                                                         | Example                    |
| ---       | ---                                                                                                                                                                                 | ---                        |
| start     | Integer indicating the index of the member that the collection response representation will begin with, where "0" represents the first available resource (i.e., zero-based index). | http://collection?start=5  |
| count     | Integer indicating the number of collection members to include in the response. The minimum value for this parameter is 1.  The default behavior is to return all members.          | http://collection?count=30 |
| page      | Integer indicating the page number of a collection to include in the response. The minimum value for this parameter is 1.  The default behavior is to return the first page.        | http://collection?page=2   |

### Responses

This section describes response requirements for Redfish services.

#### Response Headers

HTTP defines headers that can be used in response messages.  The following table defines those headers and their requirements for Redfish services.

* Redfish protocol services _shall_ be able to return the headers in the following table as defined by the HTTP 1.1 specification if the value in the Required column is set to "yes" .
* Redfish protocol services _should_ be able to return the headers in the following tables as defined by the HTTP 1.1 specificaation if the value in the Required column is set to "no".  
* Redfish clients shall be able to understand and be able to process all of the headers in the following table as defined by the HTTP 1.1. specification.

| Header                      | Required | Supported Values                      | Description                                                                                                                                                                                                                                                                                                             |
| --------                    | ---      | -----------------                     | ------------                                                                                                                                                                                                                                                                                                            |
| Content-Type                | Yes      | [RFC 2616, Section 14.17][2616-14.17] | Describes the type of representation used in the message body. Application/json shall be supported. charset=utf-8 shall be supported.                                                                                                                                                                                   |
| Content-Encoding            | No       | [RFC 2616, Section 14.17][2616-14.17] | Describes the encoding that has been performed on the media type                                                                                                                                                                                                                                                        |
| Content-Length              | No       | [RFC 2616, Section 14.3][2616-14.3]   | Describes the size of the message body. An optional means of indicating size of the body uses Transfer-Encoding: chunked, which does not use the Content-Length header. If a service does not support Transfer-Encoding and needs Content-Length instead, the service will respond with status code [411](#status-411). |
| ETag                        | No[<sup>1</sup>](#etag-note-1)       | [RFC 2616, Section 14.19][2616-14.19] | An identifier for a specific version of a resource, often a message digest.                                                                                                                                                                                                                                             |
| Server                      | Yes      | [RFC 2616, Section 14.38][2616-14.38] | Required to describe a product token and its version. Multiple product tokens may be listed.                                                                                                                                                                                                                            |
| Location                    | No[<sup>2</sup>](#auth-header-note-1)       | [RFC 2616, Section 14.30][2616-14.30] | Indicates a URI that can be used to request a representation of the resource.  Shall be returned if a new resource was created.                                                                                                                                                                                         |
| Cache-Control               | Yes       | [RFC 2616, Section 14.9][2616-14.9]   | This header shall be supported and is meant to indicate whether a response can be cached or not.                                                                                                                                    |
| Via                         | No       | [RFC 2616, Section 14.45][2616-14.45] | Indicates network hierarchy and recognizes message loops. Each pass inserts its own VIA.                                                                                                                                                                                                                                |
| Max-Forwards                | No       | [RFC 2616, Section 14.31][2616-14.31] | Limits gateway and proxy hops. Prevents messages from remaining in the network indefinitely.                                                                                                                                                                                                                            |
| Link                        | No       | [RFC 5988, Section 5][5988-5]         | Exposes additional metadata about response object.  Shall only be returned in response to a HEAD operation.                                                                                                                                                                                                             |
| Access-Control-Allow-Origin | Yes      | [W3C CORS, Section 5.1][cors-5.1]     | Prevents or allows requests based on originating domain. Used to prevent CSRF attacks.                                                                                                                                                                                                                                  |
| Allow                       | Yes      | POST, PUT, PATCH, DELETE              | Returned on GET or HEAD operation to indicate the other allowable operations for this resource.  Shall be returned with a 405 (Method Not Allowed) response to indicate the valid methods for the specified Request URI.                                                                                                                                                                                                                          |
| WWW-Authenticate            | Yes      | [RFC 2617][2617]                      | Required for Basic and other optional authentication mechanisms. See the [Security][#Security] section for details.                                                                                                                                                                                                     |


* Redfish protocol services _shall_ understand and be able to process the headers in the following table as defined by this specification if the value in the Required column is set to "yes".


| Header       | Required  | Supported Values             | Description                                                                                                |
| --------     | ---       | -----------------            | ------------                                                                                               |
| X-Auth-Token | Yes       | Opaque encoded octet strings | Used for bearer authentication of user sessions. The token value _shall_ be indistinguishable from random. |

* <a name="etag-note-1">_1_</a> Etags _shall_ be included on Account objects
* <a name="auth-header-note-1">_2_</a> Location and X-Auth-Token _shall_ be included on responses which create user sessions.

[2616-14.3]: http://pretty-rfc.herokuapp.com/RFC2616#header.content-length
[2616-14.9]: http://pretty-rfc.herokuapp.com/RFC2616#header.cache-control
[2616-14.17]: http://pretty-rfc.herokuapp.com/RFC2616#header.content-type
[2616-14.19]: http://pretty-rfc.herokuapp.com/RFC2616#header.etag
[2616-14.30]: http://pretty-rfc.herokuapp.com/RFC2616#header.location
[2616-14.38]: http://pretty-rfc.herokuapp.com/RFC2616#header.server
[5988-5]: http://tools.ietf.org/html/rfc5988#section-5
[cors-5.1]: http://www.w3.org/TR/cors/#access-control-allow-origin-response-header
[2617]: http://pretty-rfc.herokuapp.com/RFC2617
#### Status Codes

HTTP defines status codes that can be returned in response messages. 

* Clients shall understand and be able to process the status codes in the   following table as defined by the HTTP 1.1 specification and constrained by   additional requirements defined by this specification. Services shall   respond with these status codes as appropriate.
* Exceptions from operations shall be mapped to HTTP status codes.
* Redfish services should not return the status code 100. Using the HTTP protocol for a multi-pass data transfer should be avoided, except upload of extremely large data.

| HTTP Error Code                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---                                                          | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a name="status-200"></a>200 OK                              | The request was successfully completed and includes a representation in its body.                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a name="status-201"></a>201 Created                         | A request that created a new resource completed successfully. The Location header is set to the canonical URI for the newly created resource. A representation of the newly created resource may be included in the message body.  The Location header shall be set to the URI of the newly created resource.                                                                                                                                                                                                                                                    |
| <a name="status-202"></a>202 Accepted                        | The request has been accepted for processing, but the processing has not been completed. The Location header shall be set to the URI of a Task resource that can later be queried to determine the status of the operation. A representation of the Task resource may be included in the response body.                                                                                                                                                                          |
| <a name="status-204"></a>204 No Content                      | The request succeeded, but no content is being returned in the body of the response.                                                                                                                                                                                                                                                                                                                                                                                                   |
| <a name="status-301"></a>301 Moved Permanently               | The requested resource resides under a different URI                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <a name="status-302"></a>302 Found                           | The requested resource resides temporarily under a different URI.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a name="status-304"></a>304 Not Modified                    | The service has performed a conditional GET request where access is allowed, but the resource content has not changed. Conditional requests are initiated using the headers If-Modified-Since and/or If-None-Match (see HTTP 1.1, sections 14.25 and 14.26) to save network bandwidth if there is no change.                                                                                                                                                                           |
| <a name="status-400"></a>400 Bad Request                     | The request could not be processed because it contains missing or invalid information (such as validation error on an input field, a missing required value, and so on). An extended error shall be returned in the response body, as defined in section [Extended Error Handling](#extended-error-handling).                                                                                                                                                                                                                                                                                                           |
| <a name="status-401"></a>401 Unauthorized                    | The authentication credentials included with this request are missing or invalid.                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a name="status-403"></a>403 Forbidden                       | The server recognized the credentials in the request, but those credentials do not possess authorization to perform this request.                                                                                                                                                                                                                                                                                                                                                      |
| <a name="status-404"></a>404 Not Found                       | The request specified a URI of a resource that does not exist.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a name="status-405"></a>405 Method Not Allowed              | The HTTP verb specified in the request (e.g. DELETE, GET, HEAD, POST, PUT, PATCH) is not supported for this request URI. The response shall include an Allow header which provides a list of methods that are supported by the resource identified by the Request-URI.                                                                                                                                                                                                                                                                                                                                                                 |
| <a name="status-406"></a>406 Not Acceptable                  | The Accept header was specified in the request and the resource identified by this request is not capable of generating a representation corresponding to one of the media types in the Accept header.                                                                                                                                                                                                                                                                                 |
| <a name="status-409"></a>409 Conflict                        | A creation or update request could not be completed, because it would cause a conflict in the current state of the resources supported by the platform (for example, an attempt to set multiple attributes that work in a linked manner using incompatible values).                                                                                                                                                                                                                    |
| <a name="status-410"></a>410 Gone                            | The requested resource is no longer available at the server and no forwarding address is known. This condition is expected to be considered permanent. Clients with link editing capabilities SHOULD delete references to the Request-URI after user approval. If the server does not know, or has no facility to determine, whether or not the condition is permanent, the status code 404 (Not Found) SHOULD be used instead. This response is cacheable unless indicated otherwise. |
| <a name="status-411"></a>411 Length Required                 | The request did not specify the length of its content using the Content-Length header (perhaps Transfer-Encoding: chunked was used instead). The addressed resource requires the Content-Length header.                                                                                                                                                                                                                                                                                |
| <a name="status-412"></a>412 Precondition Failed             | Precondition (If Match or If Not Modified ) check failed.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| <a name="status-415"></a>415 Unsupported Media Type          | The request specifies a Content-Type for the body that is not supported.                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a name="status-500"></a>500 Internal Server Error           | The server encountered an unexpected condition that prevented it from fulfilling the request. An extended error shall be returned in the response body, as defined in section [Extended Error Handling](#extended-error-handling).                                                                                                                                                                                                                                                                                                                                                                                            |
| <a name="status-501"></a>501 Not Implemented                 | The server does not (currently) support the functionality required to fulfill the request.  This is the appropriate response when the server does not recognize the request method and is not capable of supporting the method for any resource.                                                                                                                                                                                                                                                                                                                                                                                             |
| <a name="status-503"></a>503 Service Unavailable             | The server is currently unable to handle the request due to temporary overloading or maintenance of the server.                                                                                                                                                                                                                                                                                                                                                                        |

#### Extended Error Handling

HTTP response status codes might not, in all circumstances provide enough information to enable deterministic error semantics.

Extended error information is returned in order to provide the client more meaningful and deterministic error semantics.  There are many reasons that a status like 400 can be returned.  For instance, if a client does a PATCH and some of the properties do not match while others are not supported, the client would have no way of determining which values were in error.  For that reason, and similar situations, the Redfish interface includes extended error handling

* Services shall return the extended error resource as described in the Redfish Schema in the response body when a status code of 400 or 500 is returned.
* Services should return the extended error resource as described in the Redfish Schema in the response body when a status code 400 or greater is returned.
* Extended error messages MUST NOT provide privileged info when authentication failures occur

NOTE: Refer to the [Security](#security) section for security implications of extended errors

While the exact error information is provided in the Redfish Schema, the following information is available in that structure.  

| Attribute          | Description                                                                                                                                                                            |
| ---                | ---                                                                                                                                                                                    |
| MessageID          | String indicating a specific error or message (not to be confused with the HTTP status code). This code can be used to access a detailed message from a message registry.              |
| MessageArgs        | An optional array of arguments to be placed into a message string corresponding to the messageID.                                                                                      |
| Message            | An optional human readable error message indicating the semantics associated with the error, including the _messageArgs_ pre-inserted into the message corresponding to the messageID. |
| PropertyInError    | An optional array of the properties that cause the error, such as those in a PATCH                                                                                                     |
| RecommendedActions | An optional array of free-form strings describing recommended actions to take to resolve the error.  
| Severity           | An optional severity value corresponding to the message.  The registry usually contains a default value.                                                                              |

This message structure supports a message registry.  In a message registry approach there is a message registry that has a list or array of MessageIDs in a well known format.  These MessageIDs are terse in nature and thus they are much smaller than actual messages, making them suitable for embedded environments.  In the registry, there is also a message.  The message itself can have arguments as well as default values for Severity and RecommendedActions.  

The MessageID property contents shall be of the form RegistryName.MajVer.MinVer.MessageKey where RegistryName and MessageKey are Pascal-case and MessageKey is a key into the registry that is human readable and shall not include spaces, periods or special chars.  The MajVer and MinVer of the MessageID shall be positive integers. 

When a client receives an Extended Error resource, it can search the message registry for the corresponding message.  Implementations can, if they choose, include the actual message as well.

* Extended error attributes included in response bodies shall include a MessageID.

The message registry approach has advantages for internationalization (since the registry can be translated easily) and light weight implementation (since large strings need not be included with the implementation).

### Eventing

This section covers the REST-based mechanism for subscribing to and receiving event messages.

The Redfish service requires a client to subscribe to receive events. Clients perform a subscription by sending a HTTP POST message to the URI of the subscription resource. This request includes the URI where the client expects events to be sent.  The Redfish service will then, when an event is triggered within the service, send an event to that URI.   

* Services shall support "push" style eventing for all resources capable   of sending events.
* Services shall not "push" events (using HTTP POST) unless the client has previously sent a subscribe message to the resource responsible for sending the events. A successful subscribe request will cause a subscription object to be created. Either the client or the service can terminate the event stream at any time.
* Services shall respond to a successful subscription with HTTP status 201 and set the HTTP Location header to the address of a new subscription resource.
* Clients shall terminate a subscription by sending an HTTP DELETE message to the URI of the subscription resource.
* Services may terminate a subscription by sending a special "subscription terminated" event as the last message. Future requests to the associated subscription resource will respond with HTTP status 404.

There are two types of events generated in a Redfish service - life cycle and alert.  

Life cycle events happen when resources are created, modified or destroyed.  Not every modification of a resource will result in a event - this is similar to when ETags are changed and implementations may not send an alert for every resource change. For instance, if an event was sent for every Ethernet packet received or every time a sensor changed 1 degree, this could result in more events than fits a scalable interface. This event usually indicates the resource that changed as well as, optionally, any attributes that changed. 

Alert events happen when a resource needs to indicate an event of some significance.  This may be either directly or indirectly pertaining to the resource.  This style of event usually adopts a message registry approach similar to extended error handling in that a MessageID will be included.  Examples of this kind of event are when a chassis is opened, button is pushed, cable is unplugged or threshold exceeded.  These events usually do not correspond well to life cycle type events hence they have their own category.

NOTE: Refer to the [Security](#security) section for security implications of Eventing

#### Event Message Subscription

The client locates the eventing service through traversing the Redfish service interface.  When the eventing service has been discovered, clients subscribe to messages by sending a HTTP POST to the URL of the collection for subscriptions in the Eventing Service for which they are requesting events. This should be found off of the root service as described in the JSON Schema for that service.  

The specific syntax of the subscription body is found in the Redfish Schema. 

On success, the "subscribe" action shall return with HTTP status 201 (CREATED) and the Location header in the response will contain a URI giving the location of the newly created "subscription" resource. Optionally, the response to the subscribe request will contain subscription resource in addition to the Location header. Sending an HTTP GET to the subscription resource shall return the configuration of the subscription. 

#### Event Message Objects

Event message objects POSTed to the specified client endpoint shall contain the properties as described in the Redfish Event Schema.

This event message structure supports a message registry.  In a message registry approach there is a message registry that has a list or array of MessageIDs in a well known format.  These MessageIDs are terse in nature and thus they are much smaller than actual messages, making them suitable for embedded environments.  In the registry, there is also a message.  The message itself can have arguments as well as default values for Severity and RecommendedActions.

The MessageID property contents shall be of the form RegistryName.MajVer.MinVer.MessageKey where RegistryName and MessageKey are Pascal-case and MessageKey is a key into the registry that is human readable and shall not include spaces, periods or special chars.  The MajVer and MinVer of the MessageID shall be positive integers.

#### Subscription Cleanup

To unsubscribe from the messages associated with this subscription, the client simply sends an HTTP DELETE request to the subscription resource URI.

In order to avoid "orphan" subscriptions (subscriptions not cleaned up by the client, e.g., in the case the client has died or simply forgets to delete a subscription), subscriptions will be automatically deleted by the server
under the following circumstances:

POSTing of messages to the client-supplied URL (client-url  field of the subscription) fails the number times in a row specified by the service

Or, if no client-URL was specified, the amount of time specified in the subscription-timeout field has elapsed since the last time the subscription URL was polled.  In order to prevent disconnection, the client service should perform a GET on the subscription URI less than the period specified in the timeout interval.  

* A GET on a subscription URI shall reset the timeout counter for that subscription.

### Structure for Asynchronous Operations

Services that support asynchronous operations will implement the Task service & structure.

The Task service is used to describe the service that handles tasks.  It contains a collection of zero or more task structures. The Task structure is used to describe a long running operation that is spawned when a request will take longer than a few seconds, such as when a service is instantiated. Clients will poll the URI of the task structure to determine when the operation has completed and if it was successful.

The Task structure in the Redfish Schema contains the exact structure of a Task.  The type of information it contains are start time, end time, task state, task status, response (completion codes) as well as potential links to sub-tasks that were spawned.

Each task has a number of possible states.  The exact states and their semantics are contained in the Task structure for the Redfish Schema.  

* Services that support asynchronous operations shall implement the Task structure.
* When a Response contains a status of 202, the location header shall contain the URI of the corresponding Task structure.
* GET requests to a Task structure shall not block for the service providing the interface.
* The response to an asynchronous operation shall return a status code of 202
  and set the HTTP response header "Location" to the URI of the Task entity
  associated with the activity. The response body may contain a representation
  of the Task entity in the same major media type (e.g. JSON, XML) that would
  have been used to return a synchronous response.
* Operations using HTTP GET, PUT, PATCH should always be synchronous.
* Redfish clients shall be prepared to handle both synchronous and asynchronous
  responses for requests using HTTP DELETE and HTTP POST methods.

### HTTP Redirect

All Redfish Clients must correctly handle HTTP redirect.  Redfish resources may
use this means to alias areas of the data model.

NOTE: Refer to the [Security](#security) section for security implications of HTTP Redirect

### ETags

In order to reduce the cases of unnecessary RESTful accesses to resources, the Redfish Service should support associating a separate ETag string with a resource.  
* Implementations should support ETags for each resource.

The ETag is generated and provided with resource because the service is in the best position to know if the new version of the object is different enough to be considered substantial.  If an object is published by a Redfish Provider, the ETag is also generated by the provider.  There are two types of ETags: weak and strong.
* Weak model -- only "important" portions of the object are included in formulation of the ETag.  For instance, meta-data such as a last modified time should not be included in the ETag generation. The "important" properties that determine ETag change include writable settings and changeable attributes such as UUID, FRU data, serial numbers, etc.
* Strong model -- all portions of the object are included in the formulation of the ETag. 

The ETag is created using an algorithm that is not mandated by Redfish but should be highly collision-free.  An ETag could be a hash, a generation ID, or a time stamp.  The content     doesn't matter as much as the fact that it changes when the underlying object changes.

NOTE: Refer to the [Security](#security) section for security implications of ETags

If a client PUTs or PATCHes a resource, it should include an ETag in the HTTP If-Match/If-None-Match header from a previous GET.

* **A Redfish Service should return the ETag header on client PUT/POST/PATCH**

The Redfish Service will also include the ETag on any GET of the object as an ETag HTTP header:

    ETag W/"<string>"

* A Redfish Service should return the ETag header on client GET

## Data Model & Schema

### Overview

One of the key tenants of the Redfish interface is the separation of protocol and data model.  This section describes data model requirements and common requirements for resources as well as Redfish Schema requirements.

Resources are represented using JSON which shall adhere to the Redfish Schema.  All Redfish Schema shall be specified in JSON Schema format plus any required extensions and requirements specified in this document.  The definition of each resource is specified by a schema in JSON Schema.  Collectively known as the Redfish Schema, this schema contains normative requirements on implementations conforming to this specification. 

NOTE: Refer to the [Security](#security) section for security implications of Data Model & Schema

### Redfish Resources

Redfish Resources are one of several general kinds:

* Root Service Resource
  * Contains the mapping of a particular service instance to applicable subtending resources.
  * Contains the UUID of a service instance.  This UUID would be the same UUID returned via SSDP discovery.
* Current Configuration Resources, contain a mixture of:
  * Inventory (static and read-only)
  * Health Telemetry (dynamic and read-only)
  * Current Configuration Settings (dynamic and read/write)
  * Current Metric values
* Setting Resources
  * Dynamic, Read/Write Pending Configuration Settings 
* Collections
  * Service Elements like Logs, Subscriptions & Sessions
  * Infrastructure Elements like Systems & Chassis 
* Schema
  * Some implementations can return the Schema representation through the Redfish interface 
* Services
  * Common services like Eventing, Tasks, Sessions 
* Registry Resources
  * Static, Read-Only JSON encoded information for Event and Message Registries

Redfish reserves some JSON property names.  These shall not be used for other purposes, even if they are not implemented in a particular resource.  The reserved property names and they're associated semantics are indicated in the section titled [Standard Redfish Resource Properties](#reserved-and-standard-redfish-resource-properties).

Current Configuration represent the service's knowledge of the current state and configuration of the resource.  This may be directly updatable with a PATCH or it may be read-only by the client and the client must PATCH to a separate Setting resource.

Setting Resources represent the future state and configuration of the resource.  This property is always paired with a Current Configuration object.  Where the Current Configuration object represents the current state, the settings resource represents the future intended state.  The state of the resource is changed either directly, such as with a POST of an action or PUT of a reset or indirectly, such as when a user reboots a machine outside of the Redfish service.  

Collections represent a group of similar resources.  The collections resource is common in definition since it really represents a group of similar resource and the semantics of gathering members of the group are what is important with a collection. Examples include groups of servers, chassis or log records.  Collections are unique in their impact on the protocol. 

Schema definitions represent the canonical definition of the semantics and format associated with each and every resource.  It is within the schema definition file, represented in JSON Schema, for each resource that the client gets the information in the form of data and meta data to interpret the structures and values in the resource. 
* Clients and Redfish Services shall interpret Redfish Schema files according to the compliance requirements and scope of other requirements within this document. 

Services represent components of the Redfish Service itself as well as dependent resources.  While the complete list is discoverable only by traversing the Redfish Service tree, the list includes services like the Eventing service, Task management and Session management.

Registry Resources are those resources that assist the client in interpreting Redfish resources beyond the Schema definitions.  Examples of registries include Message Registries, Event Registries and enumeration registries, such as those used for BIOS.  In registries, a identifier is used to retrieve more information about a given resource, event, message or other item.  This can include other properties, property restrictions and the like.  Since Registries are defined by JSON Schema as well, they are themselves resources.

### Standard Redfish Resource Properties

This section contains a set of standard Redfish resource and schema properties.  Each property in this section shall not be used for any other purpose than that described in this section.

We reserve these properties in order to provide interoperability between implementations as well as to provide a consistent set of client expectations on semantics.  By driving common properties, no inheritance model is needed.  Most, if not all, of these properties are defined in a common section of the Redfish Schema.

#### Type

Each Redfish Resource must be strongly typed to a Redfish Class definition.  This is accomplished using a JSON Property called "Type" that references the class and version of the JSON object.

* Redfish resources shall contain the "Type" property

The "Type" property shall be a string of the format: `<RedfishSchemaName>.<majorversion>.<minorversion>.<errata>`
Where:
* RedfishSchemaName = String declaring the name of the Redfish Schema file defining the resource
* majorversion = integer:  something in the class changed in a backward incompatible way.
* minorversion = integer:  a minor update.  New properties may have been added but nothing removed. Compatibility will be preserved with previous  minorversions.
* errata = integer:  something in the prior version was broken and needed to be fixed.

An example of a valid Type value might be "System.1.0.0".
Other semantics are defined in the schema for for this property is in the common section of the Redfish Schema.

#### href
The href property is a string that indicates a reference to another resource inside of the Redfish Service.  A frag shall not be used in hrefs. All hrefs shall adhere to the semantics in section [URI](#uri)
Other semantics are defined in the schema for this property is in the common section of the Redfish Schema.

#### extref
The extref property is a string that indicates a reference to another resource outside of the Redfish Service.  All extrefs shall adhere to the semantics in section [URI](#uri).
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### id
The id property is a string that indicates a reference to another resource.  Other semantics are defined in the schema for this property is in the links section of the Redfish Schema.

#### frag
The frag property is a string that indicates a reference to another resource.  All frags shall be of JSONPointer format according to RFC6901.  Other semantics are defined in the schema for this property is in the links section of the Redfish Schema.

#### Name
The name property is used to convey a human readable moniker for the resource.  The Name property shall be string format.  Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Description
The Description property is used to convey a human readable description of the resource.  The Description property shall be string format.  Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Created
Created contains the time stamp equal to the last time the Redfish service created this resource.  The format of this property shall be in the [Standard Timestamp Format](#standard-timestamp-format). 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Modified
Modified contains the time stamp equal to the last time the Redfish service modified this resource. The format of this property shall be in the [Standard Timestamp Format](#standard-timestamp-format). 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### OEM
OEM is an array of objects used for OEM extensions as defined in the Redfish Schema and the [OEM](*oem) section 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Settings
The Settings property is an href to a URI the client can use to PUT properties or PATCH property changes.  If it is not present, the resource is might be directly PATCHable. 

The most common use for this is as a reference to Setting resource.  If the resource itself is read only but has a partner Setting resource, this is used to make changes at some point in the future to the resource.  
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### SettingsResult
The value of this property, which is an object in the resource, contain the results of applying Setting resource to this resource. This property is an embedded object with the following information about the last Setting Data apply result, which includes:

* Time of the attempted application
* ETag of the Setting Data object that was applied
* Redfish Extended Error Information containing status information 

Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Items
Items is an array of objects used in a collection to contain the members of the collection.  This is usually only used in Collections with small members such as log records, sessions or similar constructs.  Collections with lengthy resources as members usually do not include Items. 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Page
The Page property is used in collections to indicate the current page.  FirstPage, LastPage, NextPage, PrevPage are likewise reserved.  These are only used in collections that require pagination.  The starting value for this property shall be 1.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Count
The Count property is used in collections to indicate the number of members in the collection results for the given query.  If no query parameters are specified, it indicates the entire number of members in the collection.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Member
The Member property contains the members of a collection.   Each member shall be of the type defined by the [MemberType](MemberType) property.

#### MemberType
The MemberType property is used in a collection to indicate the Type of the members of the collection.  Only the major revision is represented.  Thus all members of a collection shall be of the same type and shall have the same major revision level.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Context
Context is a user definable attribute.  Examples of it's use are in EventSubscriptions where this property is set on subscription and returned as a value in every event sent to the subscribed URI.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Registry
The Registry property indicates the name of the registry to be used in association with this resource.  Other semantics are defined in the schema definitions for that Registry as well as the Registry itself.

#### links
The links object contains the links associated with the resource as defined by that resources schema.  All hrefs and extrefs shall be part of the links section for all Redfish Schema.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### Schema
The Schema property indicates the extref for the Schema described.
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema. 
                                                                                                                                                                      
#### Status
Redfish supports a common status property across all resources.  By having a common status object, Clients can depend on consistent semantics.  The Status object is capable of indicating the current intended state, the state the resource has been requested to change to, the current actual state and any problem affecting the current state of the resource. 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema. 
                                                                                                                                                                      
#### Action
Action are properties of Redfish Schema as well as resources and are used to indicate the name of an action used in a POST operation.  They indicate the action to be taken during the operation. 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.
                                                                                                                                                                       
#### AvailableActions
The AvailableActions array contains a list of Actions supported by resources when used in the Schema and by this particular resource when used in a Resource.  If a Resource indicates an Action and its Capabilities using the AvailableActions property, the Resource shall support the action and the components listed in the resource.   This may be a subset of those indicated in the Redfish Schema for that resource. 
Other semantics are defined in the schema for this property is  in the common section of the Redfish Schema.

#### CorrelatableID
CorrelatableID is used as a reference en lieu of a an href in some circumstances and schema.  It is similar to a weak key, in that resources that relate to each other contain the same CorrelatableID value.  CorrelatableID is both a reserved property name and a JSON Schema extension as defined in the section on [Correlatable ID references](*Correlatable-ID-references).    
Other semantics are defined in the schema for this property is  in the Redfish Schema.
                                                                                                                                                                     
#### Other common properties
The following common properties should be used when appropriate.  Other semantics are defined in the schema for these properties are in the common section of the Redfish Schema.
  * SerialNumber
  * Model
  * PartNumber
  * FirmwareVersion,
  * Uuid (standard RFC format)
  * Mac (MAC address standard output format, ##:##:##:##:##:##)
  * Wwn, VirtualWwn (world wide name and" virtual wwn, use standard output format, ##:##:##:##:##:## )
  * VirtualSerialNumber
  * VirtualUuid
  * PowerState
  * IPv4Address, 
  * IPv6Address if scalar, however better to consider a list in
    the resource model with address and type.
  * DnsName, " (vs current *thing* name ) """ Need to ensure can address
    the attribute properly.  Note "Name" is a reserved property.

### Property Requirements
Property requirements for resources are defined within the Redfish Schema according to the JSON Schema definition.

Redfish Schema are defined in such a way as to be as widely used as possible, resulting in as few schema definitions as possible.  Consequently, for optional properties, a Redfish Client must assume that any class properties missing in a current configuration resource are not supported by the implementation of the
provider.

If the Schema for any given resource indicates that a property is Required, the implementation shall support the property per the requirements of JSON Schema.  Otherwise, the property is optional.

If the implementation supports the property, it shall always provide a value for that property.  If a value is unknown, the implementation shall provide a value.  If the implementation is unable to determine the current value either "unknown" or null are acceptable values in most cases.  Properties that do not exist on a GET operation shall indicate that the property is not supported at this time by the implementation.

### Localization Considerations
Redfish architecture supports localized strings but does not impose any specific requirement for localization upon Redfish providers.  However, current market forces seem to require localization as necessary (e.g. schemas).

Schema-supplied display strings may be localized as necessary, but a Schema file may only contain one language.  Alternate language schemas may be published and available to Redfish Clients, but need not be provided via the
Redfish Service schema store. 

Properties within other types of Redfish resources are key/value pairs.  The key is never localized, and the value may be localized if it is a user supplied string. such as an asset tag.

### Redfish Schema Requirements

This section defines the general appearance of Redfish resources and the format and appearance of commonly encountered attributes.

* Redfish resources for Schema shall be represented in JSON-Schema as defined in this specification. 

#### Consistency:

The Redfish style is designed to be the best experience for the customer (including the end-customer writing scripts in languages like Python).

* Attribute name casing:  PascalCased (e.g. with starting   capital.  Example:  "AttributeName".
  This includes the attributes such as Name, Type, Description, etc.
* Redfish avoids using hyphens and underscores because they are unfriendly in   some scripting languages.
* See the master list of reserved property names.

#### Standard Timestamp Format

All Time strings in Redfish are ISO 8601-compliant including:

* Year, Month, Date (UTC)
* Hour, Minute, Second
* Relative Time Zone Shift (Hour and Minute)

All "timestamp" attributes (e.g., resource created/modified time) shall be in the ISO 8601 "extended" format, as follows:

    YYYY-MM-DDThh:mm:ss.SSS'Z'

In other words: UTC time; Redfish resources may not always resolve to millisecond precision however.
An example of a conformant time value is "2013-01-10T01:09:57+00:00".

#### URI references

In order for the Redfish tree to be navigable by software without access to schema, all traversable references within the Redfish data model shall conform to a recognizable pattern and shall be included within "links" properties.

#### Correlatable ID references

Because of Redfish's open extensible architecture, and a design tenant that objects do not have to know how to locate each other via URI references, Redfish defines the "CorrelatableID" property and JSON Schema extension.  If a provider must communicate location or association information and does not have enough information to include a URI reference, it should include a "CorrelatableID" property or JSON Schema qualifier instead.  The string used as the value can be matched by the client against others to determine association.

For example, a NIC in a PCI slot communicates its PCI location by including
a "CorrelatableID" with a value consisting of its UEFI device path.  PCI slots
also have a UEFI device path.  This match establishes their association.

Also, references without the use of HTML tags are not possible via href, so
CorrelatableIDs can be used to convey this reference information indirectly.

#### Standardized Units

Standardized Units within this specification are used as part of the property names within the schema.  The units shall be appended to the property name.  For instance "Height" should be "HeightMm" to represent Height in millimeters.

#### Name Consistency
The Redfish interface is intended to be easily readable and intuitive.  Thus, consistency will help the consumer who is unfamiliar with a newly discovered property understand it's use.  While this is no substitute for the normative information in the specification and schema, it does help with readability and client usage.  Thus the following consistency rules shall be followed by any data represented through the Redfish interface. 

##### Property Name Consistency
Property names used in the Redfish model should have a consistent look and feel, and in some cases same attribute name. For Redfish, attribute names should adhere to the following:

* Attribute names must use Pascal-cased names, first letter is upper case, capitalize the first letter of following each word, and remove the spaces between words.  No underscores are used. Examples are PowerState, SerialNumber.
  * 
  * Exceptions are allowed for well-known technology names like "iSCSI"
  * Exceptions are allowed for product names like "iLO"
* For well-known abbreviations or acronyms
  * Capitalize both characters of two-character acronyms, even the first word of a Pascal-cased identifier, eg IPAddress, RemoteIP
  * Capitalize only the first character of acronyms with three or more characters, except the first word of a Pascal -cased identifier, Wwn, VirtualWwn
* For attributes that have units, or other special meaning, the unit identifier should be appended to the name. The current list includes:
  * Bandwidth, Mbps, eg PortSpeedMbps
  * CPU speed, Mhz, ProcessorSpeedMhz
  * Memory size MegaBytes, MB, MemoryMB
  * Counts of items, Count, eg ProcessorCount, FanCount
  * For a resource"s state, State (main state from ManagedResource), for secondary states append State, PowerState.

##### Value Consistency
For constants such as Enumerations, PascalCase should be used, eg PoweredOn

* Resource State names
* Naming format follows enum/constants. ServerReady
* For states where "work" is being done, append "ing", eg Applying, Clearing
* For empty lists, return it as the empty list vs null (eg [] in JSON)
* For data that is "missing" don't invent it, use null.

#### Schema Extensibility
It is necessary to extend Redfish Schema for representations through the Redfish interface.  Thus, the OEM object is used to provide information outside of the standard.  While the information itself and semantics around it are outside of the standard, the Schema representing the data, the resource itself and the semantics around the protocol shall conform to the requirements in this specification.

Any Redfish object may contain a property called "Oem" which is an embedded JSON object.  OEM-specific properties are then contained within a second embedded JSON object, using a unique OEM identifier as it's property name.  The OEM property name shall be either an ICANN-recognized domain name including the top-level domain suffix, or an IANA-assigned Enterprise ID prefaced with "EID:". Organizations using a '.com' top level domain may omit the suffix (e.g. ACME.com may use 'ACME', but ACME.org must use 'ACME.org' as their OEM property name).  This property name may be followed by a colon and any string to allow further namespacing of vendor objects.  

For example:

```json
{
  "StandardProperty": "value",
  "Oem": {
    "Acme": {
      "Type": "acmetype.v.v.v",
      "AcmeSpecificProperty": "value"
    },
    "Acme:Type2": {
      "Type": "acmetype2.v.v.v"
    }
    "EID:232": {
      "Type": "eid232.v.v.v",
      "EnterpriseSpecificProperty": "value"
    }
  }
}
```
The Oem object may occur at any level in any section of a resource.  Contents
of the Oem object must be valid JSON and must have a Type property per this
specification.  Any other requirements, validation or contents are beyond the
scope of this specification.

Actions can also be extended by OEMs.  In this case, the OEM action shall include a property named Target in the JSON body of the request and the format of the Target property shall be /Oem/<vendor>:<extension> where vendor is a simple company registered domain name without the domain name suffix and extension is an Oem specific demarcation.

The following is an example of the Request Body for a custom action:
```
{
  "Target": "/Oem/CompanyX:Custom2",
  "Action": "CustomAction",
  "Params": []
}
```

#### JSON Schema Extensions
JSON Schema does not contain all of the keyword definitions needed for Redfish.  This extensions can be found in the Redfish Schema in the file beginning with 'redfish-schema'. Redfish has defined the following extensions:

###### correlatableID 
The keyword "correlatableID" is both a reserved property name and a Redfish Schema extension as defined in the section on [Correlatable ID references](*Correlatable-ID-references). 

###### copyright 
This keyword contains the copyright notice for the schema.  It serves no other normative or semantic purpose.
    
###### enumdescriptions
This keyword is used to provide descriptions that have the same semantics as the JSON Schema "descriptions" properties to enumeration values for a property.

###### readonly
Using the keyword "readonly" in the Redfish schema designates the property cannot be written with a PATCH or PUT.

###### specification
The keyword "specification is used to describe, in normative language, the syntax and semantics of the property to which the keyword is applied.

#### Schemas and Registries

There are cases when deviations from the published schema are necessary.  An example is BIOS where different servers may have minor variations in available configuration settings.  A provider may build a single schema that is a superset of the individual implementations.  In order to support these variations, Redfish supports omitting parameters defined in the class schema in the current configuration object.  The following rules apply:

* All Redfish providers must support attempts to set unsupported configuration elements in the Setting Data by marking them as exceptions in the Setting Data Apply status structure, but not failing the entire configuration operation.
* The support of a specific property in a resource is signaled by the presence of that property in the Current Configuration object.  If the element is missing from Current Configuration, the client may assume the element is not supported on that resource.
* For ENUM configuration items that may have variation in allowable values, a special read-only capabilities element will be added to Current Configuration which specifies limits to the element.  This is an override for the schema only to be used when necessary.

Providers may split the schema resources into separate files such as JSON Schema + String Registry, each with a separate URI and different Content-Encoding.

* Resources _may_ communicate omissions from the published schema via the Current Configuration object if applicable.

## Service Elements

### Timestamp Management

The Redfish Service should support a resource that contains the current Redfish
Service time.  The property should be located in the "/rest" resource, called
"Time" and should a Redfish compliant time string

```json
{
     ...
     "Time": "2012-03-07T14:44.30-05:00",
     ...
}
```

* **The Redfish Service _should_ support  a Redfish compliant Time property at "/rest/v1.Time"**

### Resource Tree Stability

The Resource Tree must be consistent on a single Redfish Service across device
reboot and A/C power cycle, and must withstand a reasonable amount of
configuration change (e.g. adding an adapter to a server).  Resource Tree on
one Redfish Service may not be consistent across instances of devices.  The
client must walk the data model and discover resources to interact with them.
It is possible that some resources will remain very stable from system to
system (e.g. BMC network settings) -- but it is not an architectural guarantee.

* **A Resource Tree should remain stable across Redfish Service restarts and
  minor device configuration changes**
* **A Resource Tree shall not be expected by the client to be consistent
  between instances of a Redfish Service**

### Discovery

Automatic discovery of managed devices supporting the Redfish service is accomplished using the Simple Service Discovery Protocol (SSDP).  This protocol allows for network-efficient discovery without resorting to ping-sweeps, router table searches, or restrictive DNS naming schemes.  Use of SSDP is optional, and if implemented, shall allow the user to disable the protocol through the 'Manager Network Service' resource.  

As the objective of discovery is for cilent software to locate Redfish-compliant managed devices, the primary SSDP functionality incorporated is the M-SEARCH query.  Redfish also follows the SSDP extensions and naming used by UPnP where applicable, such that Redfish-compliant systems can also implement UPnP without conflict.

#### UPnP Compatibility
For compatibility with general purpose SSDP client software, primarily UPnP, TCP port 1900 will be used for all SSDP traffic.  It is recommended that devices also respond to M-SEARCH queries for UPnP Root Devices (with NT:upnp:rootdevice), with appropriate descriptors and XML documents.

#### USN Format
The UUID supplied in the USN field shall equal the UUID returned for the Manager implementing the Redfish service.  If there are multiple / redundant managers, the UUID shall remain static regardless of redundancy failover.  The Unique ID shall be in the canonical UUID format, followed by '::redfishspecification-org' 
 
#### M-SEARCH Response
The managed device must respond to M-SEARCH queries searching for Search Target (ST) of the Redfish Service from clients with the AL pointing to the Redfish service root URI.  Redfish device shall also respond to M-SEARCH queries for Search Target type of "ssdp:all".

Redfish Service root Search Target (ST):   URN:redfishspecification-org:service:redfish-rest:1

The URN in the reply shall use a service name of 'redfish-rest:' followed by the major version of the Redfish specification.  If the minor version of the Redfish Specification to which the service conforms is a non-zero value, and that version is backwards-compatible with previous minor revisions, then that minor version shall be appended, preceeded with a colon.  For example, a service conforming to a Redfish specification version "1.4" would reply with a service of "redfish-rest:1:4".

An example response to an M-SEARCH multicast or unicast query shall follow the format shown below.  Fields in brackets are placeholds for device-specific values.  

```
HTTP/1.1 200 OK
CACHE-CONTROL:<seconds, at least 1800>
ST:urn:redfishspecification-org:service:redfish-rest:1
USN:uuid:<UUID of Manager>::urn:redfishspecification-org:service:redfish-rest:1
AL:<URL of Redfish service root>
EXT:
```

#### Notify, Alive, and Shutdown messages
Redfish devices may implement the additional SSDP messages defined by UPnP to announce their availability to software.  This capability, if implemented, must allow the end user to disable the traffic separately from the M-SEARCH response functionality.  This allows users to utilize the discovery functionality with minimal amounts of network traffic generated.  

## Security

### Goals
- Privilege Model to Monitor and Manage:
	- System Settings
		- BIOS Configuration
		- System Power States
		- Sensor Information (power/thermal/health)
		- Network Settings
		- Storage Settings
		- Logs
	- Redfish Service Configuration
		- Account Management
		- Network Settings
		- Logs
	- Firmware versions
	- OEM vendor-specific features and functionality

- Permission/ authorization  model shall be consistent between instances of Redfish compliant devices
	- Define a minimum baseline for the permission/ authorization model
- Infrastructure Authentication
- CURL compatibility
- Automated clients
- Embedded Service Processors
  	

### Protocols

#### Discovery

#### Transport
**TODO**: communication requirements for redfish peers - clients or other servers.

##### TLS
Implementations shall support TLS v1.1 or later

Implementations shall only use compliant TLS connections to transport [Sensitive Data](#sensitive-data). Including to any third party authentication services or clients.

##### Cipher suites
Implementations should support AES-256 based ciphers from the TLS suites.

Redfish implementations should consider supporting ciphers similar to below which enable authentication and identification without use of trusted certificates.

	 TLS_PSK_WITH_AES_256_GCM_SHA384        
     TLS_DHE_PSK_WITH_AES_256_GCM_SHA384    
     TLS_RSA_PSK_WITH_AES_256_GCM_SHA384

Additional advantage with using above recommended ciphers is - 

"AES-GCM is not only efficient and secure, but hardware implementations can achieve high speeds with low cost and low latency, because the mode can be pipelined."
	 
References to RFCs - 

	 http://tools.ietf.org/html/rfc5487
	 http://tools.ietf.org/html/rfc5288
	 
##### Certificates
Implementations shall support replacement of the default certificate if one is provided, with a certificate having at least a 4096 bit rsa key and sha512-rsa signature.

#### FIPS/Common Criteria Compliance
Implementations which satisfy FIPS and Common Criteria requirements should be considered compliant with this specification.

### Sensitive Data

* Sensitive data shall minimally include 
	- User credentials (usernames, passwords)
	- Private Keys
	- Persistent Session Keys
	- Password Complexity Requirements
	- Critical Security Parameters (CSPs) as defined below

Critical Security Parameters : 
Security-related information (e.g., cryptographic keys, authentication data such as passwords and PINs) appearing in plaintext or otherwise unprotected form and whose disclosure or modification can compromise the security of a cryptographic module or the security of the information protected by the module.
	
REF: http://csrc.nist.gov/publications/fips/fips140-1/fips1401.pdf - This is used only as a source for the definition of CSPs. No additional requirements for compatibility with the FIPS standard should be inferred.

### Authentication

* Default Credentials 

	Vendors should NOT implement default credentials for any account installed on the spec compliant device, with a well known password.

* Password Complexity
	
	A Redfish device shall support a set of configurable password complexity rules, should include length, character set
	
	When an authentication failure occurs a Redfish device shall NOT provide password complexity requirements to the user
	
* Account Lockout

	A Redfish implementations should revoke login privilege after a configurable number of authentication failures

* Authentication Failure Delays
	
	A Redfish device shall implement progressive authentication attempt  

* Authentication Failure Policy

	A Redfish device shall implement configurable options to manage login behavior when user authentication failures occur
		- Number of failures
		- Time between failures
		- Increments between progressive delays
		- Specific actions which happen automatically when failure events occur
		- Time since last failed authentication attempt 

#### HTTP Header Security
* All write activities shall be authenticated, i.e. POST, PUT/PATCH, and DELETE, except for 
  * The POST operation to the Sessions service/object needed for authentication
	* Extended error messages shall NOT provide privileged info when authentication failures occur
* REST objects shall not be available unauthenticated, except for
  * The root object which is needed to identify the device and service locations
* Unauthenticated REST operation results shall not contain [Sensitive Data](#sensitive-data).
* External services linked via extref references are not part of this spec, and may have other security requirements.
	
* CORS headers are not recommended. Vendors may choose to implement them.

##### HTTP Redirect

* When there is a HTTP Redirect the privilege requirements for the target resource shall be enforced  
  
#### Extended Error Handling
  * Authentication shall occur when [Sensitive Data](#sensitive-data) is present in any part of the REST object.
  * Extended error messages shall NOT provide privileged info when authentication failures occur

#### HTTP Header Authentication
* HTTP Headers for authentication shall be processed before other headers that may affect the response, i.e.: etag, If-Modified, etc.
* HTTP Cookies shall NOT be used to authenticate any activity i.e.: GET, POST, PUT/PATCH, and DELETE.

##### BASIC authentication
HTTP BASIC authentication as defined by RFC 2617 [References](#References) shall be supported, and shall only use compliant TLS connections to transport the data between any third party authentication service and clients.

##### Digest authentication
Implementations may support HTTP Digest authentication mechanism 

##### Negotiate
Implementations may support the HTTP Negotiate authentication mechanism

##### Request / Message Level Authentication
Every request that establishes a secure channel shall be accompanied by an authentication header.

##### Certificate based authentication?
Implementations should support certificate based authentication.

#### Session Management

##### Session Lifecycle Management

Session management is left to the implementation of the Redfish Service.  This
includes orphaned session timeout and number of simultaneous open sessions.

* **A Redfish Service _shall_ provide login sessions compliant with this
  specification.**

##### Login Sessions

For functionality requiring multiple Redfish operations, a standard Login
session is specified.  The URI used for session management is specified in the
/rest object with the property "Sessions".

```json
{
    ...
    "Sessions": {
        "href": "/rest/Sessions"
    },
    ...
}
```

##### Login

A session is created by an HTTP POST to the URI indicated by /rest.Sessions including the following POST body:

```json
{
    "UserName": "<username>"
    "Password": "<password>"
}
```
The Origin header should be saved in reference to this session creation and
compared to subsequent requests using this session to verify the request has
been initiated from an authorized client domain.

The return includes an X-Auth-Token header with a session token and Location header.

The return JSON body also includes a "Uri" property containing an href to the
newly created session object:

    <operation> <uri> HTTP/1.1
    <header>
    <header>
    Location: "/rest/Sessions/Administrator1"
    X-Auth-Token: <token string>
    <header>

    {
        "Uri": {
            "href": "/rest/Sessions/Administrator1"
        }
    }

##### Logout

Logout is accomplished by performing a DELETE to the Session URI provided by
the Login operation including the X-Auth-Token header.  Optionally, the Redfish
Service may also support logout upon DELETE to the URI indicated by
/rest.Sessions without specifying the individual session URI.  The ability to
DELETE to a session URI allow the Redfish Service to support logging out of one
or more sessions from a different session if the user has sufficient privilege
to do so.


##### X-Auth-Token HTTP Header
Implementations shall only use compliant TLS connections to transport the data between any third party authentication service and clients.

* Limited Lifetime
  * Implementations shall support session timeout, session idle time is defined as time from the last accepted transaction.
  * Session timeout shall default to a finite limit.
  * Implementations should NOT support infinite session times.

  
#### AccountService
* User passwords should be stored with one-way encryption techniques.
* Implementations may support exporting user accounts with passwords, but shall do so using encryption methods to protect them.
* The root REST object should be available unauthenticated, but shall not contain any [Sensitive Data](#sensitive-data).
  * Authentication shall occur when [Sensitive Data](#sensitive-data) is present in the root REST object.
* User accounts shall support ETags and shall support atomic operations
  * Implementations may reject requests which do not include an ETag

* User Management activity is atomic
* Extended error messages shall NOT provide privileged info when authentication failures occur


#### Async Tasks

* Irrespective of which users/ privileged context was used to start an async task the information in the status object shall be used to enforce the privilege(s) required to access that object. 

#### Event Subscriptions

* The Redfish device shall check the privilege of the subscriber before pushing event data object to the destination 

* The Redfish device shall encrypt event data when there is [Sensitive Data](#sensitive-data) in the event data object before pushing it

* The Redfish device may verify the destination for identity purposes before pushing event data object to the Destination 

#### Privilege Model / Authorization

* The Authorization subsystem has the following components to it 
  - Profiles - A Profile is a collection of Roles from the Authorization perspective (NOTE: Profiles per Redfish constitute more than Roles. REF: See section ... for more info.)
  - Roles - A Role is a collection of Privileges
  - Privileges - A Privileges is a permission to perform a specific action/ activity
    - NOTE: Specific sets of privileges can be assigned to a user without using/ modifying/ creating/ leveraging pre-canned roles
* When a Profile like a System Profile is implemented all the required Roles per Redfish which constitute that Profile shall be implemented
  - System Administrator and System Operator are 2 Roles are which are required to be implemented in the System Profile
  - System Administrator - The user with this role monitors and configures the system and / or the Redfish device
* When a Role like a System Operator is implemented all Privileges required per Redfish which constitute that Role are required to be implemented
  - The Power Control privilege is required to be implemented per Redfish

* User Management 
    * Assigning privileges to users, either local to the Redfish device or users / user groups from the directory services infrastructure like AD/ LDAP
      * Assign privileges individually (Users created by cherry-picking privileges)
        OR
      * Assign privileges via pre-defined roles (Roles required by Redfish spec or OEM vendor implementation)
        OR
      * Assign privileges via custom roles (Customer admin defined roles which can be reused)


* Implementations shall enforce the same privilege model for ETag related activity as is enforced for the data being represented by the ETag. For example, when activity requiring privileged access to read data item represented by ETag requires the same privileged access to read the ETag.

* Privileges
  * shall implement a set of pre-defined privileges
    - Login
    - Configure BMC
    - Configure Users
      - NOTE: The Login privilege is automatically assigned to all users

  * shall implement a set of pre-defined privileges as required per implemented profiles
    - System Profile has the Power Control privilege
    - Other Profiles will have appropriate required privileges

  * may implement a set of OEM privileges
    - Remote Console (Remote Keyboard, Video, Mouse)
    - Remote Media (Remote mounting of media like USB storage, file shares etc)
    - Diagnostic capability
    - Clear Logs

  * OEM Privileges shall follow the requirements below
    - Privileges that grant permission to affect/ modify the object and/ or object extensions in a Profile, themselves belong to that Profile
    - Privileges that make use of methods / derived methods / OEM methods in a profile, themselves belong to that Profile

##### Profiles and Roles

* shall implement a set of pre-defined roles based on profiles implemented by the Redfish device
* System Profile
  1) System Administrator - Monitor and configures the system and the Redfish device
    - Configure BMC
    - Configure Users
    - Power Control
    - All OEM privileges relevant to the System Profile
  2) System Operator - Performs system management tasks like power control but not configuring the power subsystem
    - Power Control
    - Will not include any OEM privileges
  3) User (Read-Only with very low privilege reads)
* Network Profile
  1) Network Administrator - Monitor and configures the network component
    - TBD
  2) Network Operator - Performs network management tasks like network operations including interface up/ down but not any persistent network configuration changes
    - TBD
  3) User (Read-Only with very low privilege reads)
* Storage Profile
  1) Storage Administrator - Monitor and configures the storage component
    - TBD
  2) Storage Operator - Performs storage management tasks like storage operations including acknowledging bad drives to trigger rebuilding a logical volume but not any persistent storage configuration changes
    - TBD
  3) User (Read-Only with very low privilege reads)
* NOTE: All OEM privileges that modify objects and/ or ohject extensions in a Profile, shall be assigned to the Administrator Role in that Profile.

* Pre-defined roles shall NOT be modifiable with respect to privileges assigned
* shall allow Redfish user to define custom roles
* should allow Redfish user to name custom roles to enable reuse in user context
* may implement a set of OEM roles

#### Role Based Privilege

A Redfish Service may contain resources that require separated privileges.
A Redfish Service may limit REST operations against specific resources based
upon user privileges.

* **A Redfish Service _may_ limit individual resource access by Redfish Clients
  based upon role-based privileges**
* **A Redfish Service _may_ limit individual resource access by Redfish Clients
  based upon specific user account information (future -- not defined yet)**


### Data Model Validation

#### Schema

Server and Client implementations should check supplied data against JSON schema and shall perform data validation checks, to prevent vulnerabilities caused by later processing errors. 

When there is a disagreement between a Server and Client on schema validation, the server may enforce its version and reject the request.

Clients shall NOT perform data interpolation unless the schema permits that.

Privileges should NOT be modified without a strong security related requirement. Schema validation shall include privilege checks when privilege requirements have been modified. 

NOTE: Privilege changes as part of schema updates/ changes shall be captured in the schema change log.

Idempotent actions shall be rejected when there is a security reason to do so.

Resource definitions shall include required privileges to perform read/ RW actions on that resource.

Resource tree stability - Permissions on resources should be stable as well.

Custom Actions - Privilege model shall be applied consistently to both the body and the response. Where applicable the privilege model defined for the URI should be inherited for custom actions.

### Logging


#### Required data for security log entries

Implementations shall log authentication requests including failures. 
Authentication login/logout log entries shall contain a user identifier that can be used to uniquely identify the client and a time stamp.

Logs shall include detailed privileged info, but shall NOT include the [Sensitive Data](#sensitive-data) outside a privileged user or a privileged security context.


#### Completeness of Logging

* Every entity from the originator of the RESTful service call, through every intermediary, to the very last entity in the call chain, log an entry in their audit log for the call activity triggered/ taken/ ... This means same as any RESTful service call, the audit log entry will 'be complete' for the activity performed within said entity.
  * shall - All write activities i.e. POST, PUT/ PATCH and DELETE
    * NOTE: When a new log entry is created logging the occurrence of that event is not required.
  * shall - Have the ability to log the privileged reads i.e. GETs
    * This ability may be turned on by default. 
* Rejection of idempotent actions due to security reasons shall be logged
	
	
#### Content of Audit Logs

Details : Need to generate events for the following

1. logon, log-off, modification of user accounts        
2. successful and rejected login attempts,
3. successful and rejected connections to nodes and other resource access attempts
4. details about the modification of user accounts
5. all changes to the system configuration,
6. information about the use of built-in utilities running in Redfish compliant-devices(e.g. low-level diagnostic tools),
7. information about accessing the system interfaces of the Redfish compliant-devices
8. network addresses and protocols (e.g. workstation IP address and protocol used for access)
9. activation and de-activation of protection measures

The file where the events are written, one or more messages per event should at least have the following information :

* User ID
* Date, time 
* Event type
* Event description


## Appendix A

### Known attack vector mitigation
- XSS
  * Cross-Origin headers are not recommended. Vendors may choose to implement them, but anticipated customer usage does not provide a strong reason to implement in light of the potential for security problems.
- Replay
- CSRF
- MITM
- Protocol stripping
- Cipher attacks
- Offline attacks

## Appendix B: Notes

Security Token used in sessions with Keep-alive connections is the value in the
Authorization request header.  Need to explain how this gets returned from the
first session.

_Directory Service Integration (AD/LDAP) needs to be accommodated at some point.
Perhaps we go with this in version.next._

Rights are at a URL level, not per property.



