---
DocTitle: Redfish Scalable Platforms Management API Specification
DocNumber: '0266'
DocClass: Normative
DocVersion: '1.7.0'
modified: '2019-02-26'
SupersedesVersion: '1.6.1'
status: published
released: true
copyright: '2015-2019'
---

# Foreword

The Redfish Scalable Platforms Management API ("Redfish") was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.

# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to the Redfish standard, including this document and Redfish Schemas, Interoperability Profiles, and Message Registries:
* Rafiq Ahamed - Hewlett Packard Enterprise
* Richelle Ahlvers - Broadcom Limited
* Jeff Autor - Hewlett Packard Enterprise
* Jeff Bobzin - Insyde Software Corp.
* David Black - Dell Inc.
* Patrick Boyd - Dell Inc.
* David Brockhaus - Vertiv
* Richard Brunner - VMware Inc.
* Sean Byland - Cray Inc.
* Lee Calcote - Seagate Technology
* P Chandrasekhar - Dell Inc.
* Barbara Craig - Hewlett Packard Enterprise
* Chris Davenport - Hewlett Packard Enterprise
* Gamma Dean - Vertiv
* Daniel Dufresne - Dell Inc.
* Samer El-Haj-Mahmoud - Lenovo, Hewlett Packard Enterprise
* George Ericson - Dell Inc.
* Wassim Fayed - Microsoft Corporation
* Kevin Ferguson - Vertiv
* Mike Garrett - Hewlett Packard Enterprise
* Steve Geffin - Vertiv
* Joe Handzik - Hewlett Packard Enterprise
* Jon Hass - Dell Inc.
* Jeff Hilland - Hewlett Packard Enterprise
* Chris Hoffman - Vertiv
* Cactus Jiang - Vertiv
* Barry Kitner - Intel Corporation
* Steven Krig - Intel Corporation
* Jennifer Lee - Intel Corporation
* John Leung - Intel Corporation
* Steve Lyle - Hewlett Packard Enterprise
* Jagan Molleti - Dell Inc.
* Milena Natanov - Microsoft Corporation
* Scott Phuong - Cisco 
* Michael Pizzo - Microsoft Corporation
* Chris Poblete - Dell Inc.
* Michael Raineri - Dell Inc.
* Irina Salvan - Microsoft Corporation
* Hemal Shah - Broadcom Limited
* Jim Shelton - Vertiv
* Tom Slaight - Intel Corporation
* Donnie Sturgeon - Vertiv
* Pawel Szymanski - Intel Corporation
* Paul Vancil - Dell Inc.
* Joseph White - Dell Inc.
* Linda Wu - Super Micro Computer, Inc.

## Abstract
The Redfish Scalable Platforms Management API ("Redfish") is a standard that uses RESTful interface semantics to access data defined in model format to perform systems management.  It is suitable for a wide range of servers, from stand-alone servers to rack mount and bladed environments but scales equally well for large scale cloud environments.

While the initial Redfish scope was targeted at servers, expansion of scope has grown both in the DMTF and through DMTF alliance partners to cover most data center IT equipment and other solutions as well.  It also covers both in-band and out-of-band access methods.

Educational material is also increasing, both from the DMTF and other organizations that utilize Redfish as part of their industry standard or solution.

## Normative references

The following referenced documents are indispensable for the application of this document. For dated or versioned references, only the edition cited (including any corrigenda or DMTF update versions) applies. For references without a date or version, the latest published edition of the referenced document (including any corrigenda or DMTF update versions) applies.

* <a id="RFC1738">IETF RFC 1738</a>  T. Berners-Lee et al, Uniform Resource Identifier (URI), [http://www.ietf.org/rfc/rfc1738.txt](http://www.ietf.org/rfc/rfc1738.txt "http://www.ietf.org/rfc/rfc1738.txt")
* <a id="RFC3986">IETF RFC 3986</a>  T. Berners-Lee et al, Uniform Resource Identifier (URI): Generic Syntax, [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt "http://www.ietf.org/rfc/rfc3986.txt")
* <a id="RFC4627">IETF RFC 4627</a>, D. Crockford, The application/json Media Type for JavaScript Object Notation (JSON), [http://www.ietf.org/rfc/rfc4627.txt](http://www.ietf.org/rfc/rfc4627.txt "http://www.ietf.org/rfc/rfc4627.txt")
* <a id="RFC5789">IETF RFC 5789</a>, L. Dusseault et al, PATCH method for HTTP, [http://www.ietf.org/rfc/rfc5789.txt](http://www.ietf.org/rfc/rfc5789.txt "http://www.ietf.org/rfc/rfc5789.txt")
* <a id="RFC5280">IETF RFC 5280</a>, D. Cooper et al, Web linking, [http://www.ietf.org/rfc/rfc5280.txt](http://www.ietf.org/rfc/rfc5280.txt "http://www.ietf.org/rfc/rfc5280.txt")
* <a id="RFC5988">IETF RFC 5988</a>, M. Nottingham, Web linking, [http://www.ietf.org/rfc/rfc5988.txt](http://www.ietf.org/rfc/rfc5988.txt "http://www.ietf.org/rfc/rfc5988.txt")
* <a id="RFC6585">IETF RFC 6585</a>, M. Nottingham, et al, Additional HTTP Status Codes, [http://www.ietf.org/rfc/rfc6585.txt](http://www.ietf.org/rfc/rfc6585.txt "http://www.ietf.org/rfc/rfc6585.txt")
* <a id="RFC6901">IETF RFC 6901</a>, P. Bryan, Ed. et al, JavaScript Object Notation (JSON) Pointer, [http://www.ietf.org/rfc/rfc6901.txt](http://www.ietf.org/rfc/rfc6901.txt "http://www.ietf.org/rfc/rfc6901.txt")
* <a id="RFC6909">IETF RFC 6906</a>, E. Wilde, The 'profile' Link Relation Type, [http://www.ietf.org/rfc/rfc6906.txt](http://www.ietf.org/rfc/rfc6906.txt "http://www.ietf.org/rfc/rfc6906.txt")
* <a id="RFC7230">IETF RFC 7230</a>, R. Fielding et al., Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing, [http://www.ietf.org/rfc/rfc7230.txt](http://www.ietf.org/rfc/rfc7230.txt "http://www.ietf.org/rfc/rfc7230.txt")
* <a id="RFC7231">IETF RFC 7231</a>, R. Fielding et al., Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content, [http://www.ietf.org/rfc/rfc7231.txt](http://www.ietf.org/rfc/rfc7231.txt "http://www.ietf.org/rfc/rfc7231.txt")
* <a id="RFC7232">IETF RFC 7232</a>, R. Fielding et al., Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests, [http://www.ietf.org/rfc/rfc7232.txt](http://www.ietf.org/rfc/rfc7232.txt "http://www.ietf.org/rfc/rfc7232.txt")
* <a id="RFC7234">IETF RFC 7234</a>, R. Fielding et al., Hypertext Transfer Protocol (HTTP/1.1): Caching, [http://www.ietf.org/rfc/rfc7234.txt](http://www.ietf.org/rfc/rfc7234.txt "http://www.ietf.org/rfc/rfc7234.txt")
* <a id="RFC7235">IETF RFC 7235</a>, R. Fielding et al., Hypertext Transfer Protocol (HTTP/1.1): Authentication, [http://www.ietf.org/rfc/rfc7235.txt](http://www.ietf.org/rfc/rfc7235.txt "http://www.ietf.org/rfc/rfc7235.txt")
* <a id="Directives">ISO/IEC Directives</a>, Part 2, Rules for the structure and drafting of International Standards, [http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH](http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH "http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtypeH")
* <a id="JSONSchema-Core">JSON Schema: A Media Type for Describing JSON Documents, Draft 7</a>
[https://tools.ietf.org/html/draft-handrews-json-schema-01](https://tools.ietf.org/html/draft-handrews-json-schema-01 "https://tools.ietf.org/html/draft-handrews-json-schema-01")
* <a id="JSONSchema-Validation">JSON Schema Validation: A Vocabulary for Structural Validation of JSON, Draft 7</a>
[https://tools.ietf.org/html/draft-handrews-json-schema-validation-01](https://tools.ietf.org/html/draft-handrews-json-schema-validation-01 "https://tools.ietf.org/html/draft-handrews-json-schema-validation-01")
* <a id="OData-Protocol">OData Version 4.0 Part 1: Protocol</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html "http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html")
* <a id="OData-URLConventions">OData Version 4.0 Part 2: URL Conventions</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata/v4.0/os/part2-url-conventions/odata-v4.0-os-part2-url-conventions.html](http://docs.oasis-open.org/odata/odata/v4.0/os/part2-url-conventions/odata-v4.0-os-part2-url-conventions.html "http://docs.oasis-open.org/odata/odata/v4.0/os/part2-url-conventions/odata-v4.0-os-part2-url-conventions.html")
* <a id="OData-CSDL">OData Version 4.0 Part 3: Common Schema Definition Language (CSDL)</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata/v4.0/os/part3-csdl/odata-v4.0-os-part3-csdl.html](http://docs.oasis-open.org/odata/odata/v4.0/os/part3-csdl/odata-v4.0-os-part3-csdl.html "http://docs.oasis-open.org/odata/odata/v4.0/os/part3-csdl/odata-v4.0-os-part3-csdl.html")
* <a id="OData-Core">OData Version 4.0: Core Vocabulary</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml](http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml "http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml")
* <a id="OData-JSON">OData Version 4.0 JSON Format</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata-json-format/v4.0/os/odata-json-format-v4.0-os.html](http://docs.oasis-open.org/odata/odata-json-format/v4.0/os/odata-json-format-v4.0-os.html "http://docs.oasis-open.org/odata/odata-json-format/v4.0/os/odata-json-format-v4.0-os.html")
* <a id="OData-UnitsOfMeasure">OData Version 4.0: Units of Measure Vocabulary</a>. 24 February 2014. [http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Measures.V1.xml](http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Measures.V1.xml "http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Measures.V1.xml")
* <a id="SSDP">Simple Service Discovery Protocol/1.0</a>. 28 October 1999. [http://tools.ietf.org/html/draft-cai-ssdp-v1-03](http://tools.ietf.org/html/draft-cai-ssdp-v1-03 "http://tools.ietf.org/html/draft-cai-ssdp-v1-03")
* <a id="UCUM">The Unified Code for Units of Measure</a>.  [http://www.unitsofmeasure.org/ucum.html](http://www.unitsofmeasure.org/ucum.html "http://www.unitsofmeasure.org/ucum.html")
* <a id="W3C-CORS">W3C Recommendation of Cross-Origin Resource Sharing</a>. 16 January 2014. [http://www.w3.org/TR/cors/](http://www.w3.org/TR/cors "http://www.w3.org/TR/cors/")
* <a id="SNIA-TLS">SNIA TLS Specification for Storage Systems</a>. 20 November 2014. [http://www.snia.org/tls/](http://www.snia.org/tls/ "http://www.snia.org/tls/")
* <a id="DSP0270">DMTF DSP0270</a> Redfish Host Interface Specification, [http://www.dmtf.org/sites/default/files/standards/documents/DSP0270_1.0.pdf](http://www.dmtf.org/sites/default/files/standards/documents/DSP0270_1.0.pdf "http://www.dmtf.org/sites/default/files/standards/documents/DSP0270_1.0.pdf")
* <a id="HTML5-Spec-SSE">HTML5 Specification: Server-Sent Events</a> [https://html.spec.whatwg.org/multipage/server-sent-events.html](https://html.spec.whatwg.org/multipage/server-sent-events.html "https://html.spec.whatwg.org/multipage/server-sent-events.html")
* <a id="OpenAPI-Spec">OpenAPI Specification</a> [https://github.com/OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification "https://github.com/OAI/OpenAPI-Specification")
* <a id="ISO-639-1">ISO 639-1:2002 Code for the representation of names of languages</a> [https://www.iso.org/standard/22109.html](https://www.iso.org/standard/22109.html  "https://www.iso.org/standard/22109.html")


## Terms and definitions

In this document, some terms have a specific meaning beyond the normal English meaning. Those terms are defined in this clause.

The terms "shall" ("required"), "shall not", "should" ("recommended"), "should not" ("not recommended"), "may", "need not" ("not required"), "can" and "cannot" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Annex H. The terms in parenthesis are alternatives for the preceding term, for use in exceptional cases when the preceding term cannot be used for linguistic reasons. Note that ISO/IEC Directives, Part 2, Annex H specifies additional alternatives. Occurrences of such additional alternatives shall be interpreted in their normal English meaning.

The terms "clause", "subclause", "paragraph", and "annex" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 5.

The terms "normative" and "informative" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 3. In this document, clauses, subclauses, or annexes labeled "(informative)" do not contain normative content. Notes and examples are always informative elements.

The following additional terms are used in this document.

| Term                            | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---                             | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Baseboard Management Controller | An embedded device or service, typically an independent microprocessor or System-on-Chip with associated firmware, within a Computer System used to perform systems monitoring and management-related tasks, which are commonly performed out-of-band.                                                                                                                                                                                                                                    |
| Collection                      | See Resource Collection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| CRUD                            | Basic intrinsic operations used by any interface: Create, Read, Update and Delete.                                                                                                                                                                                                                                                                                                                                                                                                        |
| Event                           | A record that corresponds to an individual alert.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Managed System                  | In the context of this specification, a managed system is a system that provides information or status, or is controllable, via a Redfish-defined interface.                                                                                                                                                                                                                                                                                                                              |
| Member                          | A Member is a single resource instance contained in a Resource Collection                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Message                         | A complete request or response, formatted in HTTP/HTTPS.  The protocol, based on REST, is a request/response protocol where every Request should result in a Response.                                                                                                                                                                                                                                                                                                                    |
| Operation                       | The HTTP request methods that map generic CRUD operations.  These are POST, GET, PUT/PATCH, HEAD and DELETE.                                                                                                                                                                                                                                                                                                                                                                              |
| OData                           | The Open Data Protocol, as defined in [OData-Protocol](#OData-Protocol).                                                                                                                                                                                                                                                                                                                                                                                                                  |
| OData Service Document          | The name for a resource that provides information about the Service Root. The Service Document  provides a standard format for enumerating the resources exposed by the service that enables generic hypermedia-driven OData clients to navigate to the resources of the Redfish Service.                                                                                                                                                                                                 |
| Property          | A name/value pair included in a Redfish-defined resource as part of a request or response.  A property may be defined as any valid JSON data type.        |
| Redfish Alert Receiver          | The name for the functionality that receives alerts from a Redfish Service. This functionality is typically software running on a remote system that is separate from the managed system.                                                                                                                                                                                                                                                                                                 |
| Redfish Client                  | The name for the functionality that communicates with a Redfish Service and accesses one or more resources or functions of the Service.                                                                                                                                                                                                                                                                                                                                                       |
| Redfish Protocol                | The set of protocols that are used to discover, connect to, and inter-communicate with a Redfish Service.                                                                                                                                                                                                                                                                                                                                                                                 |
| Redfish Provider                | A Redfish provider interacts with the Redfish Service to contribute resources to the Redfish resource tree and reacts to changes in its owned resources. There are two types of Redfish providers: internal providers and external providers. A internal provider is the Redfish Service itself that has a data model and can react to RESTful operations from a client. An external provider is an architected means for agents external to the Redfish Service to augment the Redfish resource tree. The interaction between a Redfish provider and a Redfish Service is not covered by this specification.|
| Redfish Schema                  | The Schema definitions for Redfish resources.  It is defined according to OData Schema representation that can be directly translated to a JSON Schema representation.                                                                                                                                                                                                                                                                                                                    |
| Redfish Service                 | Also referred to as the "Service". The set of functionality that implements the protocols, resources, and functions that deliver the interface defined by this specification and its associated behaviors for one or more managed systems.                                                                                                                                                                                                                                                |
| Redfish Service Entry Point     | Also referred to as "Service Entry Point". The interface through which a particular instance of a Redfish Service is accessed. A Redfish Service may have more than one Service Entry Point.                                                                                                                                                                                                                                                                                              |
| Request                         | A message from a Client to a Server.  It consists of a request line (which includes the Operation), request headers, an empty line and an optional message body.                                                                                                                                                                                                                                                                                                                          |
| Resource                        | A Resource is addressable by a URI and is able to receive and process messages. A Resource can be either an individual entity, or a Collection that acts as a container for several other entities.                                                                                                                                                                                                                                                                                       |
| Resource Collection             | A Resource Collection is a Resource that acts as a container of other Resources. The Members of a Resource Collection usually have similar characteristics. The container processes messages sent to the container. The Members of the container process messages sent only to that Member without affecting other Members of the container.                                                                                                                                              |
| Resource Tree                   | A Resource Tree is a tree structure of JSON encoded resources accessible via a well-known starting URI.  A client may discover the resources available on a Redfish Service by following the resource hyperlinks from the base of the tree. <br>**NOTE** for Redfish client implementation:  Although the resources are a tree, the references between resources may result in graph instead of a tree.  Clients traversing the resource tree must contain logic to avoid infinite loops. |
| Response                        | A message from a Server to a Client in response to a request message.  It consists of a status line, response headers, an empty line and an optional message body.                                                                                                                                                                                                                                                                                                                        |
| Service Root                    | The term Service Root is used to refer to a particular resource that is directly accessed via the service entry point. This resource serves as the starting point for locating and accessing the other resources and associated metadata that together make up an instance of a Redfish Service.                                                                                                                                                                                          |
| Subscription                    | The act of registering a destination for the reception of events.                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Symbols and abbreviated terms

The following additional abbreviations are used in this document.

| Term   | Definition                                          |
| ---    | ---                                                 |
| BMC    | Baseboard Management Controller                     |
| CRUD   | Create, Replace, Update and Delete                  |
| CSRF   | Cross-Site Request Forgery                          |
| HTTP   | Hypertext Transfer Protocol                         |
| HTTPS  | Hypertext Transfer Protocol over TLS                |
| IP     | Internet Protocol                                   |
| IPMI   | Intelligent Platform Management Interface           |
| JSON   | JavaScript Object Notation                          |
| KVM-IP | Keyboard, Video, Mouse redirection over IP          |
| NIC    | Network Interface Card                              |
| PCI    | Peripheral Component Interconnect                   |
| PCIe   | PCI Express                                         |
| TCP    | Transmission Control Protocol                       |
| XSS    | Cross-Site Scripting                                |

## Overview

The Redfish Scalable Platforms Management API ("Redfish") is a management standard using a data model representation inside of a hypermedia RESTful interface.  Because it is based on REST, Redfish is easier to use and implement than many other solutions.  Since it is model oriented, it is capable of expressing the relationships between components in modern systems as well as the semantics of the services and components within them.  It is also easily extensible.  By using a hypermedia approach to REST, Redfish can express a large variety of systems from multiple vendors.  By requiring JSON representation, a wide variety of resources can be created in a denormalized fashion not only to improve scalability, but the payload can be easily interpreted by most programming environments as well as being relatively intuitive for a human examining the data.  The model is exposed in terms of an interoperable Redfish Schema, expressed in an OData Schema representation with translations to a JSON Schema and OpenAPI representations, with the payload of the messages being expressed in a JSON following OData JSON conventions. The ability to externally host the Redfish Schema definition of the resources in a machine-readable format allows the meta data to be associated with the data without encumbering Redfish Services with the metadata, thus enabling more advanced client scenarios as found in many data center and cloud environments.

### Scope

The scope of this specification is to define the protocols, data model, and behaviors, as well as other architectural components needed for an interoperable, cross-vendor, remote and out-of-band capable interface that meets the expectations of Cloud and Web-based IT professionals for scalable platform management. While large scale systems are the primary focus, the specifications are also capable of being used for more traditional system platform management implementations.

The specifications define elements that are mandatory for all Redfish implementations as well as optional elements that can be chosen by system vendor or manufacturer. The specifications also define points at which extensions specific to the OEM (system vendor) can be provided by a given implementation.

The specifications set normative requirements for Redfish Services and associated materials, such as Redfish Schema files. In general, the specifications do not set requirements for Redfish clients, but will indicate what a Redfish client should do in order to access and utilize a Redfish Service successfully and effectively.

The specifications do not set requirements that particular hardware or firmware must be used to implement the Redfish interfaces and functions.

### Goals

There are many objectives and goals of Redfish as an architecture, as a data representation, and of the definition of the protocols that are used to access and interact with a Redfish Service. Redfish seeks to provide specifications that meet the following goals:
* Scalable - To support stand-alone machines to racks of equipment found in cloud service environments.
* Flexible - To support a wide variety of systems found in service today.
* Extensible - To support new and vendor-specific capabilities cleanly within the framework of the data model.
* Backward Compatible - To enable new capabilities to be added while preserving investments in earlier versions of the specifications.
* Interoperable - To provide a useful, required baseline that ensures common level of functionality and implementation consistency across multiple vendors.
* System-Focused - To efficiently support the most commonly required platform hardware management capabilities that are used in scalable environments, while also being capable of managing current server environments.
* Standards based - To leverage protocols and standards that are widely accepted and used in environments today - in particular, programming environments that are being widely adopted for developing web-based clients today.
* Simple - To be directly usable by software developers without requiring highly specialized programming skills or systems knowledge.
* Lightweight - To reduce the complexity and cost of implementing and validating Redfish Services on managed systems.

### Design tenets
The following design tenets and technologies are used to help deliver the previously stated goals and characteristics:
* Provide a RESTful interface using a JSON payload and an Entity Data Model
* Separate protocol from data model, allowing them to be revised independently
* Specify versioning rules for protocols and schema
* Leverage strength of Internet protocol standards where it meets architectural requirements, such as JSON, HTTP, OData, and the RFCs referenced by this document.
* Focus on out-of-band access -- implementable on existing BMC and firmware products
* Organize the schema to present value-add features alongside standardized items
* Make data definitions as obvious in context as possible
* Maintain implementation flexibility. Do not tie the interface to any particular underlying implementation architecture. "Standardize the interface, not the implementation."
* Focus on most widely used 'common denominator' capabilities. Avoid adding complexity to address functions that are only valued by a small percentage of users.
* Avoid placing complexity on the management controller to support operations that can be better done at the client.

### Limitations

Redfish does not guarantee that client software will never need to be updated.  Examples that may require updates include accommodation of new types of systems or their components, data model updates, and so on.  System optimization for an application will always require architectural oversight.  However, Redfish does attempt to minimize instances of forced upgrades to clients using Schemas, strict versioning and forward compatibility rules and through separation of the protocols from the data model.

Interoperable does not mean identical. A Redfish client may need to adapt to the optional elements that are provided by different vendors. Implementation and configurations of a particular product from a given vendor can also vary.

For example, Redfish does not enable a client to read a Resource Tree and write it to another Redfish Service.  This is not possible as it is a hypermedia API. Only the root object has a well-known URI. The resource topology reflects the topology of the system and devices it represents.  Consequently, different server or device types will result in differently shaped resource trees, potentially even for identical systems from the same manufacturer.

Additionally, not all Redfish resources are simple read/write resources.  Implementations may follow other interaction patterns discussed later.  As an example, user credentials or certificates cannot simply be read from one service and transplanted to another.  Another example is the use of Setting Data instead of writing to the same resource that was read from.

Lastly, the value of hyperlinks between resources and other elements can vary across implementations. Clients should not assume that hyperlinks can be reused across different instantiations of a Redfish Service.

### Additional design background and rationale

#### REST-based

This document defines a RESTful interface. Many service applications are exposed as RESTful interfaces.

There are several reasons to define a RESTful interface:
* It enables a lightweight implementation, where economy is a necessity (smaller data transmitted than SOAP, fewer layers to the protocol than WS-Man).
* It is a prevalent access method in the industry.
* It is easy to learn and easy to document.
* There are a number of toolkits and development environments that can be used for REST.
* It supports data model semantics and maps easily to the common CRUD operations.
* It fits with our design principle of simplicity.
* It is equally applicable to software application space as it is for embedded environments thus enabling convergence and sharing of code of components within the management ecosystem.
* It is schema agnostic so adapts well to any modeling language.
* By using it, Redfish can leverage existing security and discovery mechanisms in the industry.

#### Follow OData conventions

With the popularity of RESTful APIs, there are nearly as many RESTful interfaces as there are applications. While following REST patterns helps promote good practices, due to design differences between the many RESTful APIs there is no interoperability between them.

OData defines a set of common RESTful conventions and annotations that, if adopted, provides for interoperability between APIs.

Adopting OData conventions for describing Redfish Schema, URL conventions, and naming and structure of common properties in a JSON payload, not only encapsulate best practices for RESTful APIs but further enables Redfish Services to be consumed by a growing ecosystem of generic client libraries, applications, and tools.

#### Model-oriented

The Redfish model is built for managing systems. All resources are defined in OData Schema representation and translated to JSON Schema and OpenAPI representations. OData is an industry standard that encapsulates best practices for RESTful services and provides interoperability across services of different types. JSON is being widely adopted in multiple disciplines and has a large number of tools and programming languages that accelerate development when adopting these approaches.

#### Separation of protocol from data model

The protocol operations are specified independently of the data model.  The protocols are also versioned independently of the data model.  The expectation is that the protocol version changes extremely infrequently, while the data model version is allowed to change as needed.  This implies that innovation should happen primarily in the data model, not the protocols.  It allows the data model to be extended and changed as needed without requiring the protocols or API version to change. Conversely, separating the protocols from the data model allows for changes to occur in the protocols without causing significant changes to the data model.

#### Hypermedia API service endpoint

Like other hypermedia APIs, Redfish has a single service endpoint URI and all other resources are accessible via URIs referenced from the root.  Any resource discovered through hyperlinks found by accessing the root service or any service or resource referenced using references from the root service will conform to the same versions of the protocols supported by the root service.

### Service elements

#### Synchronous and asynchronous operation support

While the majority of operations in this architecture are synchronous in nature, some operations can take a long time to execute, more time than a client typically wants to wait. For this reason, some operations can be asynchronous at the discretion of the service. The request portion of an asynchronous operation is no different from the request portion of a synchronous operation.

The use of [HTTP status codes](#status-codes) enable a client to determine whether the operation was completed synchronously or asynchronously.  For more information, see the clause on [Tasks](#async-tasks).

#### Eventing mechanism

In some situations it is useful for a service to provide messages to clients that fall outside the normal request/response paradigm. These messages, called events, are used by the service to asynchronously notify the client of some significant state change or error condition, usually of a time critical nature.

Two styles of eventing are currently defined by this specification - push style eventing, and [Server-Sent Events (SSE)](#sse-eventservice). 

In push style eventing, when the server detects the need to send an event, it uses an HTTP POST to push the event message to the client.  Clients can enable reception of events by creating a subscription entry in the Event Service, or an administrator can create subscriptions as part of the Redfish Service configuration.  All subscriptions are persistent configuration settings.

In SSE style eventing, the client opens an SSE connection to the service by performing a GET on the URI specified by the "ServerSentEventUri" in the Event Service. 

The clause on [Eventing](#eventing) in this specification discusses the details of the eventing mechanism.

#### Actions

Operations can be divided into two sets: intrinsic and extrinsic.  Intrinsic operations, often referred to as CRUD, are mapped to [HTTP methods](#http-methods).  The protocol also has the ability to support extrinsic operations -- those operations that do not map easily to CRUD.  Examples of extrinsic would be items that collectively would be better performed if done as a set (for scalability, ease of interface, server side semantic preservation or similar reasons) or operations that have no natural mapping to CRUD operations. One examples is system reset.  It is possible to combine multiple operations into a single action.  A system reset could be modeled as an update to state, but semantically the client is actually requesting a state change and not simply changing the value in the state.

In Redfish, these extrinsic operations are called **actions** and are discussed in detail in different parts of this specification.

The Redfish Schema defines certain standard actions associated with common Redfish resources.  For these standard actions, the Redfish Schema contains the normative language on the behavior of the action.  OEM extensions are also allowed to the Redfish [schema](#resource-extensibility), including defining [actions](#oem-actions) for existing resources.

#### Service entry point discovery

While the service itself is at a well-known URI, the service host must be discovered. Redfish, like UPnP, uses SSDP for discovery. SSDP is supported in a wide variety of devices, such as printers.  It is simple, lightweight, IPv6 capable and suitable for implementation in embedded environments.  Redfish is investigating additional service entry point discovery (e.g., DHCP-based) approaches.

For more information, see the clause on [Discovery](#discovery)

#### Remote access support

A wide variety of remote access and redirection services are supported in this architecture.  Critical to out-of-band environments are mechanisms to support Serial Console access, Keyboard Video and Mouse re-direction (KVM-IP), Command Shell (i.e., Command Line interface) and remote Virtual Media.  Support for Serial Console, Command Shell, KVM-IP and Virtual Media are all encompassed in this standard and are expressed in the Redfish Schema.  This standard does not define the protocols or access mechanisms for accessing those devices and services.  The Redfish Schema provides for the representation and configuration of those services, establishment of connections to enable those services and the operational status of those services.  However, the specification of the protocols themselves are outside the scope of this specification.

### Security

The challenge with security in a remote interface that is programmatic is to ensure both the interfaces used to interact with Redfish and the data being exchanged are secured. This means designing the proper security control mechanisms around the interfaces and securing the channels used to exchange the data. As part of this, specific behaviors are to be put in place including defining and using minimum levels of encryption for communication channels, etc.

## Protocol details

In this document, the Redfish protocol refers to the RESTful mapping to HTTP, TCP/IP and other protocol, transport, and messaging layer aspects. HTTP is the application protocol that will be used to transport the messages and TCP/IP is the transport protocol. The RESTful interface is a mapping to the message protocol.

The Redfish protocol is designed around a web service based interface model. This provides network and interaction efficiency for both user interface (UI) and automation usage. Specifically, the ability to leverage existing tool chains.

The Redfish protocol uses:

* [HTTP methods](#http-methods) for common CRUD operations and to retrieve header information.
* [Actions](#actions), which are limited in use, to expand operations beyond CRUD-type operations.
* [Media types](#media-types) to negotiate the type of data sent in the message body.
* [HTTP status codes](#status-codes) to indicate the success or failure of the server's request.
* [Extended error handling](#error-responses) to return more information than HTTP error codes.
* TLS for sending secure messages.  See [Security](#security).
* [Asynchronous semantics](#synchronous-and-asynchronous-operation-support) for long running operations.

A Redfish interface shall be exposed through a web service endpoint implemented using HTTP, version 1.1 ([RFC7230](#RFC7230), [RFC7231](#RFC7231), [RFC7232](#RFC7232)).

The subsequent clauses describes how the Redfish interface uses and adds constraints to HTTP to ensure interoperability of Redfish implementations.

### Universal Resource Identifiers<a id="uris"></a>

A URI identifies a resource, including the service root and all Redfish resources.

* A URI shall identify each unique instance of a resource.
* URIs shall not include any [RFC1738](#RFC1738)-defined unsafe characters.
    * For example, the **`{`**, **`}`**, **` `**, **`|`**, **`^`**, **`~`**, **`[`**, **`]`**, <strong><code>&#96;</code></strong>, and **`\`** characters are unsafe because gateways and other transport agents can sometimes modify these characters.
    * Do not use the **`#`** character for anything other than the start of a fragment.
* URIs shall not include any percent-encoding of characters.  This restriction does not apply to the [query parameters](#query-parameters) portion of the URI.

Performing a GET operation on a URI yields a representation of the resource containing properties and hyperlinks to associated resources.  The service root URI is well known and is based on the protocol version.  Discovering the URIs to additional resources is done through observing the associated resource hyperlinks returned in previous responses.  This type of methodology that is consumed by navigating URIs returned by the service is known as a Hypermedia.

Redfish considers the [RFC3986](https://www.ietf.org/rfc/rfc3986.txt)-defined scheme, authority, root service and version, and unique resource path component parts of the URI.

For example, the `https://mgmt.vendor.com/redfish/v1/Systems/1` URI contains these component parts:

| Component part                                                           | In the example |
| ---                                                                      | ---            |
| The scheme.                                                              | `https:` |
| The authority, which defines the authority to which to delegate the URI. | `//mgmt.vendor.com` |
| The root service and version.                                            | `/redfish/v1/` |
| The resource path, which provides a unique identifier for the resource.  | `Systems/1` | 

In a URI:

* The scheme and authority component parts are not part of the unique resource path because redirection capabilities and local operations may cause the connection portion to vary.
* The service and resource path component parts _uniquely identify_ the resource in a Redfish service.
In an implementation:
* The resource path component part shall be unique.
* A [relative URI](#redfish-defined-uris-and-relative-uri-rules) in the body and HTTP headers payload can identify a resource in that same implementation.
* An absolute URI in the body and HTTP headers payload can identify a resource in a different implementation.  
For the absolute URI definition, see [RFC3986](https://www.ietf.org/rfc/rfc3986.txt).

For example, a POST operation may return the `/redfish/v1/Systems/2` URI in the `Location` header of the response, which points to the POST-created resource.

Assuming that the client connects through the `mgmt.vendor.com` appliance, the client accesses the resource through the `https://mgmt.vendor.com/redfish/v1/Systems/2` absolute URI.

[RFC3986](https://www.ietf.org/rfc/rfc3986.txt)-compliant URIs may also contain the query, `?query`, and frag, `#frag`, components.  For information about queries, see [Query parameters](#query-parameters).  When a URI includes a fragment (`frag`) to submit an operation, the server ignores the fragment.

If a property in a response is a reference to another property within a resource, use the [RFC6901](#RFC6901)-defined URI Fragment Identifier Representation format.  If the property is as a [reference property](#reference-properties) in the schema, the fragment shall reference a valid [resource identifier](#resource-identifier-property).  For example, the following fragment identifies a property at index 0 of the `Fans` array in the `/redfish/v1/Chassis/MultiBladeEncl/Thermal` resource:

```
{
    "@odata.id": "/redfish/v1/Chassis/MultiBladeEncl/Thermal#/Fans/0"
}
```

### HTTP methods

The following table describes the mapping of HTTP methods to the operations which are supported by Redfish.  The "required" column specifies whether the method is supported by a Redfish interface.
* If the value is "yes", then the HTTP method shall be supported.
* If the value is "no", the value may be supported.
For HTTP methods not supported by the Redfish Service or not listed in the table, a [405](#status-405) response shall be returned by the Redfish Service.

| HTTP&nbsp;method | Interface&nbsp;semantic                      | Required |
| ---              | ---                                          | ---      |
| POST             | Object create<br/>Object action<br/>Eventing | Yes |
| GET              | Object retrieval                             | Yes |
| PUT              | Object replace                               | No |
| PATCH            | Object update                                | Yes |
| DELETE           | Object delete                                | Yes |
| HEAD             | Object header retrieval                      | No |
| OPTIONS          | Header retrieval<br/>CORs preflight          | No |

### HTTP redirect

HTTP redirect enables a service to redirect a request to another URL.  Among other things, HTTP redirect enables Redfish resources to alias areas of the data model.

* All Redfish clients shall correctly handle HTTP redirect.

NOTE: Refer to the [Security](#security-details) clause for security implications of HTTP Redirect

### Media types

Some resources may be available in more than one type of representation.  The media type indicates the representation type.

In HTTP messages, the media type is specified in the `Content-Type` header.  To tell a service to send the response through certain media types, the client sets the HTTP `Accept` header to a list of the media types.

* All resources shall be available through the JSON `application/json` media type.
* Redfish services shall make every resource available in a JSON-based representation, as specified in [RFC4627](#RFC4627).  Receivers shall not reject a JSON-encoded message, and shall offer at least one JSON-based response representation.  An implementation may offer additional non-JSON media type representations.

To request compression, clients specify an [`Accept-Encoding` request header](#request-headers).

When requested by the client, services should support gzip compression.

### ETags

To reduce unnecessary RESTful accesses to resources, the Redfish service should support the association of a separate entity tag (ETag) with each resource.

Implementations shall support the return of:

* [ETag properties](#etag-property) for each resource.
* ETag headers for each single-resource response.
* ETag headers for GET requests of `ManagerAccount` resources.

Because the service knows whether the new version of the object is substantially different, the service generates and provides the ETag as part of the resource payload.  

The ETag mechanism supports both _**strong**_ and _**weak**_ validation.  If a resource supports an ETag, it shall use the [RFC7232](#RFC7232)-defined ETag strong validator.

This specification does not mandate a particular algorithm for ETag creation, but ETags should be highly collision-free.  

An ETag can be:

* A hash
* A generation ID
* A time stamp
* Some other value that changes when the underlying object changes

If a client calls [PUT](#put-replace) or [PATCH](#patch-update) to update a resource, it should include an ETag from a previous GET in the HTTP `If-Match` or `If-None-Match` header.  If a service supports the return of the ETag header on a resource, the service may respond with HTTP [428](#status-428) status code if the `If-Match` or `If-None-Match` header is missing from the PUT or PATCH request for the same resource, as specified in [RFC6585](#RFC6585).

In addition to the return of the ETag property on each resource, a Redfish service should return the ETag header on:

* A client PUT, POST, or PATCH operation
* A GET operation for an individual resource

The format of the ETag header is:

```
ETag: "<string>"
```

### Protocol version

The protocol version is separate from the resources' version or the Redfish Schema version that the resources support.

Each Redfish protocol version is strongly typed by using the URI of the Redfish service in combination with the resource obtained at that URI, called the `ServiceRoot` resource.

The root URI for this version of the Redfish protocol shall be `/redfish/v1/`.

The URI defines the major version of the protocol.

The `Version` property of the `ServiceRoot` resource defines the protocol version, which includes the major version, minor version, and errata version of the protocol, as defined in the Redfish Schema for that resource.

The protocol version is a string in the format:

<pre><var>MajorVersion</var>.<var>MinorVersion</var>.<var>ErrataVersion</var></pre>

where

| Variable        | Type    | Version            | Description |
| ---             | ---     | ---                | ---         |
| *MajorVersion*  | Integer | The major version  | A backward-compatible class change. |
| *MinorVersion*  | Integer | The minor version  | A minor update.  Redfish introduces new functionality but does not remove any functionality.<br/>The minor version preserves compatibility with earlier minor versions. |
| *ErrataVersion* | Integer | The errata version | A fix in the earlier version. |

Any resource that a client discovers through hyperlinks that the root service or any root service-referenced service or resource returns shall conform to the same protocol version that the root service supports.

A GET operation on the `/redfish` resource shall return this response body:

```json
{
    "v1": "/redfish/v1/"
}
```

### Redfish-defined URIs and relative URI rules

A Redfish service shall support these Redfish-defined URIs:

| URI                     | Returns |
| ---                     | ---     |
| `/redfish`              | The [version](#protocol-version). |
| `/redfish/v1/`          | The Redfish [service root](#service-root-request). |
| `/redfish/v1/odata`     | The Redfish [OData service document](#odata-service-document). |
| `/redfish/v1/$metadata` | The Redfish [metadata document](#metadata-document-request). |

In addition, the service shall process the following URI without a trailing slash in one of these ways:

* Redirect it to the associated Redfish-defined URI.
* Treat it as the equivalent URI to the associated Redfish-defined URI:

| URI           | Associated Redfish-defined URI |
| ---           | ---                            |
| `/redfish/v1` | `/redfish/v1/` |

All other Redfish service-supported URIs shall match the [Resource URI pattern definitions](#resource-uri-pattern-definitions), except the supplemental resources that the `@Redfish.Settings`, `@Redfish.ActionInfo`, and `@Redfish.CollectionCapabilities` payload annotations reference.  The client shall treat the URIs for these supplemental resources as opaque.

All Redfish service-supported URIs are reserved for future standardization by DMTF and DMTF alliance partners, except OEM extension URIs, which shall conform to the [URIs for OEM resources](#uris-for-oem-resources) requirements.

All relative URIs that the service uses shall start with either:

* A double forward slash (`//`) and include the authority, such as `//mgmt.vendor.com/redfish/v1/Systems`.
* A single forward slash (`/`) and include the absolute-path, such as `/redfish/v1/Systems`.

## Service requests

This clause describes the requests that clients can send to Redfish services.

### Request headers

The HTTP specification defines headers that can be used in request messages. The following table defines those headers and their requirements for Redfish Services and Clients.

For Redfish Services:
* Redfish Services shall process the headers in the following table as defined by the HTTP 1.1 specification if the value in the Service Requirement column is set to "Yes", or if the value is set to "Conditional" under the conditions noted in the Description column.
* Redfish Services should process the headers in the following tables as defined by the HTTP 1.1 specification if the value in the Service Requirement column is set to "No".

For Redfish Clients (sending the HTTP requests):
* Redfish Clients shall include the headers in the following table as defined by the HTTP 1.1 specification if the value in the Client Requirement column is set to "Yes", or if the value in the Client Requirement column is set to "Conditional" under the conditions noted in the Description column.
* Redfish Clients should transmit the headers in the following tables as defined by the HTTP 1.1 specification if the value in the Client Requirement column is set to "No".

| Header             | Service requirement | Client requirement | Supported values                   | Description |
| ---                | ---                 | ---                | ---                                | ---         |
| `Accept`           | Yes                 | No                 | [RFC 7231](#RFC7231)               | Communicates to the server the media type or types that this client is prepared to accept.<br/>Services shall support:<ul><li>Resource requests with either of these `Accept` header values:<ul><li>`application/json`</li><li>`application/json;charset=utf-8`</li></ul></li><li>Metadata requests with either of these `Accept` header values:<ul><li>`application/xml`</li><l>`application/xml;charset=utf-8`</li></ul></li><li>Any request with the following `Accept` header values:<ul><li>`application/*`</li><li>`application/*;charset=utf-8`</li><li>`*/*`</li><li>`*/*;charset=utf-8`</li></ul></li></ul> |
| `Accept-Encoding`  | No                  | No                 | [RFC7231](#RFC7231)                | Indicates whether the client can handle gzip-encoded responses.<br/>If a request contains this header and the service cannot send an acceptable response:<ul><li>The service shall respond with the HTTP [406](#status-406) status code.</li></ul>If the request omits this header:<ul><li>The service shall not return gzip-encoded responses.</li></ul> |
| `Accept-Language`  | No                  | No                 | [RFC7231](#RFC7231)                | The languages that the client accepts in the response.<br/>If the request omits this header, the service's default language is used for the response. |
| `Authorization`    | Conditional         | Conditional        | [RFC7235](#RFC7235), Section 4.2   | Required for [Basic authentication](#basic-authentication).<br/>A client can access unsecured resources without this header on systems that support basic authentication. |
| `Content-Length`   | No                  | No                 | [RFC7231](#RFC7231)                | The size of the message body.<br/>A client can also use the `Transfer-Encoding: chunked` header to indicate the size of the body.<br/>If a service does not support `Transfer-Encoding` and needs `Content-Length` instead, the service responds with the [411](#status-411) status code. |
| `Content-Type`     | Conditional         | Conditional        | [RFC7231](#RFC7231)                | The request format.  Required for operations with a request body.<br/>Services shall accept `Content-Type` header values of `application/json` or `application/json;charset=utf-8`.<br/>It is recommended that clients use these values in requests because other values can cause an error. |
| `Host`             | Yes                 | No                 | [RFC7230](#RFC7230)                | Enables support of multiple origin hosts at a single IP address. |
| `If-Match`         | Conditional         | No                 | [RFC7232](#RFC7232)                | To ensure that clients update the resource from a known state, PUT and PATCH requests for resources for which the service returns ETags shall support `If-Match`.<br/>While not required for clients, it is highly recommended for PUT and PATCH operations. |
| `If-None-Match`    | No                  | No                 | [RFC7232](#RFC7232)                | The service only returns the requested resource if the current ETag of that resource does not match the ETag sent in this header.<br/>If the ETag in this header matches the resource's current ETag, the GET operation returns the HTTP [304](#status-304) status code. |
| `Last-Event-ID`    | No                  | No                 | [HTML5 SSE](#HTML5-Spec-SSE)       | The event source's last event ID.  Requests history event data.<br/>See [Server-Sent Events](#server-sent-events). |
| `Max-Forwards`     | No                  | No                 | [RFC7231](#RFC7231)                | Limits gateway and proxy hops.<br/>Prevents messages from remaining in the network indefinitely. |
| `OData-MaxVersion` | No                  | No                 | 4.0                                | The maximum OData version that an OData-aware client understands. |
| `OData-Version`    | Yes                 | No                 | 4.0                                | The OData version.<br/>Services shall reject requests that specify an unsupported OData version.<br/>If a service encounters an unsupported OData version, it should reject the request with the HTTP [412](#status-412) status code. |
| `Origin`           | Yes                 | No                 | [W3C CORS](#W3C-CORS), Section 5.7 | Enables web applications to consume a Redfish service while preventing CSRF attacks. |
| `User-Agent`       | Yes                 | No                 | [RFC7231](#RFC7231)                | Traces product tokens and their versions.<br/>The header can list multiple product tokens. |
| `Via`              | No                  | No                 | [RFC7230](#RFC7230)                | Defines the network hierarchy and recognizes message loops.<br/>Each pass inserts its own VIA. |

Redfish Services shall understand and be able to process the headers in the following table as defined by this specification if the value in the **Required** column is _**Yes**_.

| Header         | Service requirement | Client requirement | Supported values             | Description |
| ---            | ---                 | ---                | ---                          | ---         |
| `X-Auth-Token` | Yes                 | Conditional        | Opaque encoded octet strings | Authenticates user sessions.<br/>The token value shall be indistinguishable from random.<br/>While services must support this header, a client can access unsecured resources without establishing a session. |

### GET (read requests)

The GET operation is used to retrieve resources from a Redfish Service.  Clients make a GET request to the individual resource URI.  Clients may obtain the resource URI from published sources, such as the OpenAPI document, or from a [resource identifier property](#resource-identifier-property) in a previously retrieved resource response, such as the [Links Property](#links-property). 

The service shall return the resource representation using one of the media types listed in the `Accept` header, subject to the [media types'](#media-types) requirements.  If the `Accept` header is absent, the service shall return the resource's representation as `application/json`.  Services may, but are not required to, support the convention of retrieving individual properties within a resource by appending a segment containing the property name to the URI of the resource.  

* The HTTP GET operation shall retrieve a resource without causing any side effects.
* The service shall ignore the content of the body on a GET.
* The GET operation shall be idempotent in the absence of outside changes to the resource.

#### Resource collection requests

Clients retrieve a resource collection by making a GET request to the resource collection URI.  The response includes the resource collection's properties and an array of its `Members`.  A subset of the Members can be retrieved using client paging [query parameters](#query-parameters).

No requirements are placed on implementations to return a consistent set of members when a series of requests that use paging query parameters are made over time to obtain the entire set of members. It is possible that these calls can result in missed or duplicate elements if multiple GETs are used to retrieve the `Members` array instances through paging.

* Clients shall not make assumptions about the URIs for the members of a resource collection.
* Retrieved resource collections shall always include the [count](#count-property) property to specify the total number of entries in its `Members` array.
* Regardless of [paging](#next-link-property-and-partial-results), the [count](#count-property) property shall return the total number of resources that the `Members` array references.

#### Service root request

The root URL for Redfish version 1.x services shall be `/redfish/v1/`.

The service returns the `ServiceRoot` resource, as defined by this specification, as a response for the root URL.

Services shall not require authentication to retrieve the service root and `/redfish` resources.

#### OData service and $metadata document requests<a id="metadata-document-request"></a>

Redfish services expose two OData-defined documents at specific URIs to enable generic OData clients to navigate the Redfish service.

* Service shall expose an [OData $metadata Document](#service-metadata) at the `/redfish/v1/$metadata` URI.  
* Service shall expose an [OData Service Document](#odata-service-document) at the `/redfish/v1/odata` URI.
* Service shall not require authentication to retrieve the OData $metadata Document or the OData Service Document.

### Query parameters

To paginate, retrieve subsets of resources, or expand the results in a single response, clients can include the query parameters.  Some query parameters apply only to resource collections.

Services:

* Shall only support query parameters on GET operations.
* Should support the `$top`, `$skip`, `only`, and `excerpt` query parameters.
* May support the `$expand`, `$filter`, and `$select` query parameters.
* Shall include the `ProtocolFeaturesSupported` object in the service root if the service supports query parameters.
* Shall ignore unknown or unsupported query parameters that do not begin with `$`.
* Shall use the `&` operator to separate multiple query parameters in a single request

Service shall return:

* The HTTP [`501 Not Implemented`](#status-501) status code for any unsupported query parameters that start with `$`.
* An [extended error](#error-responses) that indicates the unsupported query parameters for this resource.
* The HTTP [`400 Bad Request`](#status-400) status code for any query parameters that contain values that are invalid, or values applied to query parameters without defined values (e.g. `excerpt` or `only`).

The response body shall reflect the evaluation of the query parameters in this order:

* Prior to service side pagination: `$filter`, `$skip`, `$top`
* After applying any service side pagination: `$expand`, `$select`

| Query&nbsp;parameter | Description | Examples |
|:---------------------|:------------|:---------|
| `excerpt` | Returns a subset of the resource's properties that match the defined `Excerpt` schema annotation.<br/>If no Excerpt schema annotation is defined for the resource, the entire resource is returned. | `http://resource?excerpt` |
| `$expand=<string>` | Returns a hyperlink and its contents in-line with retrieved resources, as if a GET call response was included in-line with that hyperlink.  See [below](#expand-parameter). | `http://resource?$expand=*($levels=3)`<br/>`http://resourcecollection?$expand=.($levels=1)` |
| `$filter=<string>` | Applies to resource collections.  Returns a subset of collection members that match the `$filter` expression.  See [below](#filter-parameter). | `http://resourcecollection?$filter=SystemType eq 'Physical'` |
| `only` | Applies to resource collections.  If the target resource collection contains exactly one member, clients can use this query parameter to return that member's resource.<br/>If the collection contains either zero members or more than one member, the response returns the collection resource, as expected. | `http://resourcecollection?only` |
| `$select=<string>` | Returns a subset of the resource's properties that match the `$select` expression.  See [below](#select-parameter). | `http://resource?$select=SystemType,Status` |
| `$skip=<integer>` | Applies to resource collections.  Returns a subset of the members in a resource collection.  This paging query parameter defines the number of ['Members'](#members) in the [resource collection](#resource-collection-responses) to skip. | `http://resourcecollection?$skip=5` |
| `$top=<integer>` | Applies to resource collections.  Defines the number of members to show in the response.<br/>Minimum value is `1`.  By default, returns all members. | `http://resourcecollection?$top=30` |

#### Use the $expand query parameter<a id="expand-parameter"></a>

The `$expand` query parameter allows a client to request a response that includes not only the requested resource, but additional subordinate or hyperlinked resources included in-line. 

The `$expand` query parameter has a set of possible values that determine which hyperlinks in a resource are included in the expanded response.

The Redfish-supported values for the `$expand` query parameter are:

| Value | Description | Example |
|:------|:------------|:--------|
| asterisk&nbsp;(`*`) | Expands all hyperlinks. | `http://resource?$expand=*` |
| `$levels` | The number of levels the service should cascade the `$expand` operation.<br/>So, `$levels=2` expands both:<ul><li>The current resource, or `level=1`.</li><li>The expanded resource, or `level=2`.</li></ul> | `http://resourcecollection?$expand=.($levels=2)` |
| period&nbsp;(`.`) | Expands all subordinate hyperlinks.<br/>Subordinate hyperlinks are those that are directly referenced, or not in the [Links Property](#links-property) section of the resource. | `http://resourcecollection?$expand=.` |
| tilde&nbsp;(`~`) | Expands all dependent hyperlinks.<br/>Dependent hyperlinks are those that are not directly referenced, or in the [Links Property](#links-property) section of the resource. | `http://resourcecollection?$expand=~` |

Examples of `$expand` usage include:

* GET of a `SoftwareInventoryCollection`.
    
    With `$expand`, the client can request multiple `SoftwareInventory` resources in one request rather than fetching them one at a time.

* GET of a `ComputerSystem`.
    
    With `$levels`, a single GET request can include collections, such as `Processors` and `Memory`.

* GET all UUIDs in the `ComputerSystem` collection.
    
    To accomplish this result, include both `$select` and `$expand` on the URI.  

    The syntax is `GET /redfish/v1/Systems?$select=UUID&$expand=.($levels=1)`

When services execute `$expand`, they may omit some of the referenced resource's properties.

When clients use `$expand`, they should be aware that the payload may increase beyond what can be sent in a single response.

If a service cannot return the payload due to its size, it shall return HTTP [507](#status-507) status code.

> **Note:** Resources that contain `ReferenceableMembers` that the `AutoExpand` annotation already expands, such as the `Temperature` object in the `Thermal` resource, are part of the current resource and are at the same level as the queried resource.

Any other supported syntax for `$expand` is outside the scope of this specification.

#### Use the $select query parameter<a id="select-parameter"></a>

The `$select` query parameter indicates that the implementation should return a subset of the resource's properties that match the `$select` expression. indicates that the implementation should return a subset of the resources' properties based on the value of the `$select` expression.

The `$select` expression shall not affect the resource itself.

The `$select` expression defines a comma-separated list of properties to return in the response body.

The syntax for properties in complex types shall be the property names concatenated with a slash (`/`).  

> **Note:** If a request omits the`$select` query parameter, the response returns all properties by default.

An example of `$select` usage is:

```
GET /redfish/v1/Systems/1$select=Name,SystemType,Status/State
```

When services execute `$select`, they shall return all requested properties of the referenced resource.  The [`@odata.id`](#resource-identifier-property) and [`@odata.type`](#type-property) properties shall be in the response payload and contain the same values as if `$select` was not performed.  If the [`@odata.context`](#context-property) property is supported, it shall be in the response payload and should be in the [Context property](#context-property) recommended format.  If the [`@odata.etag`](#etag-property) property is supported, it shall be in the response payload and contain the same values as if `$select` was not performed.

Any other supported syntax for `$select` is outside the scope of this specification.

#### Use the $filter query parameter<a id="filter-parameter"></a>

The `$filter parameter` indicates that the implementation should return a subset of the collection's members based on the `$filter` expression.

The `$filter` query parameter defines a set of properties and literals with an operator.

A literal value can be:

* A string enclosed in single quotes.
* A number.
* A boolean value.  

If the literal value does not match the data type for the specified property, the service should reject `$filter` requests with the HTTP [400](#status-400) status code.

The `$filter` section of the OData ABNF components specification contains the grammar for the allowable syntax of the `$filter` query parameter, with the additional restriction that only built-in filter operations are supported.

The Redfish-supported values for the `$filter` query parameter are:

| Value | Description | Example |
|:------|:------------|:--------|
| `()` | Precedence grouping operator. | `(Status/State eq 'Enabled' and Status/Health eq 'OK') or SystemType eq 'Physical'` |
| `and` | Logical and operator. | `ProcessorSummary/Count eq 2 and MemorySummary/TotalSystemMemoryGiB gt 64` |
| `eq` | Equal comparison operator. | `ProcessorSummary/Count eq 2` |
| `ge` | Greater than or equal to comparison operator. | `ProcessorSummary/Count ge 2` |
| `gt` | Great than comparison operator. | `ProcessorSummary/Count gt 2` |
| `le` | Less than or equal to comparison operator. | `MemorySummary/TotalSystemMemoryGiB le 64` |
| `lt` | Less than comparison operator. | `MemorySummary/TotalSystemMemoryGiB lt 64` |
| `ne` | Not equal comparison operator. | `SystemType ne 'Physical'` |
| `not` | Logical negation operator. | `not (ProcessorSummary/Count eq 2)` |
| `or` | Logical or operator. | `ProcessorSummary/Count eq 2 or ProcessorSummary/Count eq 4` |

When evaluating expressions, services shall use the following operator precedence: 

* Grouping
* Logical negation
* Relational comparison. `gt`, `ge`, `lt`, and `le` all have equal precedence.
* Equality comparison. `eq` and `ne` both have equal precedence.
* Logical `and`
* Logical `or`

Any other supported syntax for `$filter` is outside the scope of this specification.

If the service receives an unsupported `$filter` query parameter, it shall reject the request and return the HTTP [501](#status-501) status code.

### HEAD

The HEAD method differs from the GET method in that it MUST NOT return message body information.  

However, the HEAD method completes the same authorization checks and returns all the same meta information and status codes in the HTTP headers as a GET method.

Services may support the HEAD method to: 

* Return meta information in the form of HTTP response headers.
* Verify hyperlink validity.

Services may support the HEAD method to verify resource accessibility.

Services shall not support any other use of the HEAD method.

The HEAD method shall be idempotent in the absence of outside changes to the resource.

### Data modification requests

To create, modify, and delete resources, clients issue the following operations:

* [POST (create)](#post-create)
* [PATCH (update)](#patch-update)
* [PUT (replace)](#put-replace)
* [DELETE (delete)](#delete-delete)
* [POST (action)](#post-action) on the resource

The following clauses describe the success and error response requirements common to all data modification requests.

#### Modification success responses

For create operations, the response from the service after the create request succeeds should be one of these responses:

* HTTP [201](#status-201) status code with a body that contains the JSON representation of the newly created resource after the request has been applied.
* HTTP [202](#status-202) status code with a `Location` header set to the URI of a task monitor when the processing of the request requires additional time to complete.
    In this case, a response with the HTTP 201 status code and the created resource may be returned in response to request to the task monitor URI after processing succeeds.
* HTTP [204](#status-204) status code with empty payload in the event that service cannot return a representation of the created resource.

For update, replace, and delete operations, the response from the service after successful modification should be one of the following responses:

* HTTP [200](#status-200) status code with a body that contains the JSON representation of the targeted resource after the modification has been applied, or, for the delete operation, a representation of the deleted resource.
* HTTP [202](#status-202) status code with a `Location` header set to the URI of a task monitor when the processing of the modification requires additional time.
    In this case, a response with the HTTP 200 status code and the modified resource may be returned in response to request to the task monitor URI after processing succeeds.
* HTTP [204](#status-204) status code with an empty payload in the event that service cannot return a representation of the modified or deleted resource.

For details on success responses to action requests, see [POST (action)](#post-action).

#### Modification error responses

If the resource exists but does not support the requested operation, services may return the HTTP [405](#status-405) status code.

Otherwise, if the service returns a client `4xx` or service `5xx` [status code](#status-codes), the service encountered an error and the resource shall not have been modified or created as a result of the operation.

### PATCH (update)<a id="patch-update"></a>

To update resources, the PATCH method is the preferred method.

The request body defines the changes to make to one or more properties in the resource that the request URI references.

The PATCH request does not change any properties that are not in the request body.

When modification succeeds, the response may contain a representation of the updated resource. See [Modification success responses](#modification-success-responses).

The implementation may reject the update on certain fields based on its own policies and, in this case, not make the requested modifications.

* To update a resource's properties, the service shall support the PATCH method.
* Services may accept a PATCH with an empty JSON object, which indicates that the service should make no changes to the resource.

For the following requests, services shall return the following HTTP status codes and other information:

| Request | The service returns |
|:--------|:--------------------|
| Modify several properties where one or more properties can never be updated.<br/>For example, such as when a property is read-only, unknown, or unsupported. | <ul><li>The HTTP [200](#status-200) status code.</li><li>A resource representation with a message [annotation](#extended-information) that lists the non-updatable properties.</li><li>The service may update other properties in the resource.</li></ul> |
| Modify a single property that can never be updated.<br/>For example, a property that is read-only, unknown, or unsupported. | <ul><li>The HTTP [400](#status-400) status code.</li><li>A resource representation with a message [annotation](#extended-information) that shows the non-updatable property.</li></ul> |
| Modify a resource or all properties that can never be updated. | <ul><li>The HTTP [405](#status-405) status code.</li></ul> |
| A client PATCH request against a resource collection. | <ul><li>The HTTP [405](#status-405) status code.</li></ul> |

In the absence of outside changes to the resource, the PATCH operation should be idempotent, although the original `ETag` value may no longer match.

To show the number of entries that a client can update in a PATCH request, services may have null entries for properties that are JSON arrays.  Within a PATCH request, the service may specify unchanged members as empty JSON objects in a JSON array.  To clear members, the service may specify null in a JSON array.

On update, the service shall ignore OData annotations, such as [resource identifier](#resource-identifier-property), [type](#type-property), and [ETag](#etag-property) properties.

These annotations include those in the <code><var>PropertyName</var>@odata.<var>TermName</var></code> or <code>@odata.<var>TermName</var></code> format.

where 

| Variable | Description |
|:--|:--|
| <code><var>PropertyName</var></code> | The name of the property being annotated. |
| <code><var>TermName</var></code> | The OData annotation term. |  

If an update request only contains OData annotations, the service should return the `NoOperation` message that the base message registry defines.

To gain the protection semantics of an ETag, the service shall use the `If-Match` or `If-None-Match` header and not the `@odata.etag` property value for that protection.

### PUT (replace)<a id="put-replace"></a>

To completely replace a resource, use the PUT method.  The service may add properties to the response resource that the client omits from the request body, the resource definition requires, or the service normally supplies.

When the replace operation succeeds, the response may contain a the resource representation after the replacement occurs.  See [Modification success responses](#modification-success-responses).

* To replace a resource in whole, services may support the PUT method.
* If a service does not implement this method, the service shall return the HTTP [405](#status-405) status code.
* Services may reject requests that do not include properties that the resource definition (schema) requires.
* If the client makes a PUT request against a resource collection, services should return the HTTP [405](#status-405) status code.
* The PUT operation should be idempotent in the absence of outside changes to the resource, with the possible exception that the operation might change ETag values.

### POST (create)<a id="post-create"></a>

To create a new resource, use the POST method.  

The POST request is submitted to the resource collection to which the new resource is to belong.  When the create operation succeeds, the response may contain the resource representation after the update occurs.  See [Modification success responses](#modification-success-responses).

The body of the create request contains a representation of the object to create.  The service may ignore any service-controlled properties, such as ID, which would force the service to overwrite those properties.  Additionally, the service shall set the `Location` header in the response to the URI of the new resource.

* Submitting a POST request to a resource collection is equivalent to submitting the same request to the `Members` property of that resource collection.  Services that support the addition of `Members` to a resource collection shall support both forms.
    * For example, if a client adds a new member to the resource collection at `/redfish/v1/EventService/Subscriptions`, it can send a POST request to either `/redfish/v1/EventService/Subscriptions` or `/redfish/v1/EventService/Subscriptions/Members`.
* Services shall support the POST method for resource creation.  If the resource does not offer anything to create, the service shall return the HTTP [405](#status-405) status code.
* Services shall support POST operations on a URL that references a resource collection instance.
* Services shall also support POST operations on a URL that references an action.  See [POST (action)](#post-action).
* The POST operation shall not be idempotent.
* Services may allow the inclusion of `@Redfish.OperationApplyTime` property in the request body.  See [Operation Apply Time](#operation-apply-time).

### DELETE (delete)<a id="delete-delete"></a>

To remove a resource, call the DELETE method.

When the delete operation succeeds, the response may contain the resource representation after the deletion occurs.  

See [Modification success responses](#modification-success-responses).

* For resources that can be deleted, the service shall support the DELETE method.  If the resource can never be deleted, the service shall return the HTTP [405](#status-405) status code.
* If the client specifies a DELETE request against a resource collection, the service should return the HTTP [405](#status-405) status code.
* If the resource was already deleted, the service may return HTTP status code [404](#status-404) or a success code.
* The service may allow the inclusion of the `@Redfish.OperationApplyTime` property in the request body.  See [Operation Apply Time](#operation-apply-time).

### POST (Action)<a id="post-action"></a>

To initiate operations on an object, such as `Actions`, call the POST method.

* Services shall support the POST method to send actions.
* The POST operation may not be idempotent.
* Services may allow the inclusion of the `@Redfish.OperationApplyTime` property in the request body.  See [Operation Apply Time](#operation-apply-time).

To request actions on a resource, send the HTTP POST method to the URI of the action.  The `target` property in the resource's [`actions` property](#actions-property) shall contain the URI of the action.  The URI of the action shall be in the format:

<pre><var>ResourceUri</var>/Actions/<var>QualifiedActionName</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>ResourceUri</var></code> | The URI of the resource that supports the action. |
| `Actions` | The name of the property that contains the actions for a resource, as defined by this specification. |
| <code><var>QualifiedActionName</var></code> | The qualified name of the action.  Includes the namespace. |

The first parameter of a bound function is the resource on which the action occurs.  The remaining parameters are name-and-value pairs in the request body.

To determine the available [actions](#actions-property) and the [valid parameter values](#allowable-values) for those actions, clients can query a resource directly.  Some parameter information may require that the client examine the Redfish Schema that corresponds to the resource.

The resource may provide a separate `ActionInfo` resource to describe the parameters and values that a particular instance or implementation supports.  Use the `@Redfish.ActionInfo` annotation to specify the `ActionInfo` resource, which contains a URI to the `ActionInfo` resource for the action.

In the following example, the Redfish `http://redfish.dmtf.org/schemas/v1/ComputerSystem_v1.xml` schema document defines a `Reset` action in the `ComputerSystem` namespace, which is bound to the `ComputerSystem.v1_0_0.Actions` type:

```
<Schema Namespace="ComputerSystem">
    ...
    <Action Name="Reset" IsBound="true">
        <Parameter Name="Resource" Type="ComputerSystem.v1_0_0.Actions" />
        <Parameter Name="ResetType" Type="Resource.ResetType" />
    </Action>
    ...
</Schema>
```

And a computer system resource contains an [Actions](#actions-property) property, such as:

```
{
    "Actions": {
        "#ComputerSystem.Reset": {
            "target": "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset",
            "ResetType@Redfish.AllowableValues": [
                "On",
                "ForceOff",
                "ForceRestart",
                "Nmi",
                "ForceOn",
                "PushPowerButton"
            ]
        }
    },
    ...
}
```

The following code block shows a possible valid request for the `Action`:

```http
POST /redfish/v1/Systems/1/Actions/ComputerSystem.Reset HTTP/1.1
Content-Type: application/json;charset=utf-8
Content-Length: <computed length>
OData-Version: 4.0

{
    "ResetType": "On"
}
```

To convey the allowable values in the same `Reset` example, a computer system resource may use an `ActionInfo` annotation and resource:

```json
{
    "Actions": {
        "#ComputerSystem.Reset": {
            "target": "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset",
            "@Redfish.ActionInfo": "/redfish/v1/Systems/1/ResetActionInfo"
        }
    },
    ...
}
```

The `ResetActionInfo` resource contains a more detailed description of the parameters and the supported values.

```json
{
    "@odata.context": "/redfish/v1/$metadata#ActionInfo.ActionInfo",
    "@odata.id": "/redfish/v1/Systems/1/ResetActionInfo",
    "@odata.type": "#ActionInfo.v1_0_0.ActionInfo",
    "Id": "ResetActionInfo",
    "Name": "Reset Action Info",
    "Parameters": [{
        "Name": "ResetType",
        "Required": true,
        "DataType": "String",
        "AllowableValues": [
            "On",
            "ForceOff",
            "ForceRestart",
            "Nmi",
            "ForceOn",
            "PushPowerButton"
        ]
    }]
}
```

To indicate the success or failure of the `Action` request processing, the service may return a response with one of the following HTTP status codes and additional information:

| To&nbsp;indicate | HTTP&nbsp;status&nbsp;code | Additional&nbsp;information |
|:-----------------|:-----------------|:----------------------------|
| The `Action` request succeeds. | [200](#status-200) | The JSON message body, as described in [Error responses](#error-responses), with a message that indicates success or any additional relevant messages.<br/>If the action was successfully processed and completed without errors, warnings, or other notifications for the client, the service should return the `Success` message from the base message registry in the `code` property in the response body. |
| The `Action` request may require extra time to process. | [202](#status-202) | A `Location` response header set to the URI of a task monitor. |
| The `Action` request succeeds. | [204](#status-204) | No JSON message body. |
| An error was detected and the `Action` request was not processed. | 400 or greater | The response may contain a JSON object, as described in [Error responses](#error-responses), which details the error or errors. |

Actions may have required parameters.  See [Resource actions](#resource-actions).

| Scenario | Response |
|:---------|:---------|
| The client did not provide all required parameters. | The service should respond with the HTTP [400](#status-400) status code. |
| The `Action` does not have any required parameters. | The service should accept an empty JSON object in the HTTP body for the `Action` request.  |
| The client provides a parameter that the service does not support. | The service shall either reject the request with HTTP [400](#status-400) status code or ignore the unknown parameters. |
| The client requests an `Action` that has no effect.<br/>For example, the client requests a reset of a computer system but it is already on. | The service should respond with the HTTP [200](#status-200) status code and return the `NoOperation` message, as defined in the base message registry. |

Example successful `Action` response:

```json
{
    "error": {
        "code": "Base.1.0.Success",
        "message": "completed successfully Request",
        "@Message.ExtendedInfo": [{
            "@odata.type": "#Message.v1_0_0.Message",
            "MessageId": "Base.1.0.Success",
            "Message": "completed successfully Request",
            "Severity": "OK",
            "Resolution": "None"
        }]
    }
}
```

### Operation apply time

Services may accept the `@Redfish.OperationApplyTime` annotation in the [POST (create)](#post-create), [DELETE (delete)](#delete-delete), or [POST (action)](#post-action) request body.  This annotation enables the client to control when an operation is carried out.

For example, if the client wants to delete a particular `Volume` resource, but can only safely do so when a reset occurs, the client can use this annotation to instruct the service to delete the `Volume` on the next reset.

If multiple operations are pending, the service shall process them in the order in which the service receives them.

Services that support the `@Redfish.OperationApplyTime` annotation for create and delete operations on a resource collection shall include the `@Redfish.OperationApplyTimeSupport` response annotation for the resource collection.

The following example response for a resource collection supports the `@Redfish.OperationApplyTime` annotation in the create and delete requests:

```json
{
    "@odata.context": "/redfish/v1/$metadata#VolumeCollection.VolumeCollection",
    "@odata.id": "/redfish/v1/Systems/1/Storage/SATAEmbedded/Volumes",
    "@odata.type": "#VolumeCollection.VolumeCollection",
    "Name": "Storage Volume Collection",
    "Description": "Storage Volume Collection",
    "Members@odata.count": 2,
    "Members": [{
            "@odata.id": "/redfish/v1/Systems/1/Storage/SATAEmbedded/Volumes/1"
        },
        {
            "@odata.id": "/redfish/v1/Systems/1/Storage/SATAEmbedded/Volumes/2"
        }
    ],
    "@Redfish.OperationApplyTimeSupport": {
        "@odata.type": "#Settings.v1_2_0.OperationApplyTimeSupport",
        "SupportedValues": ["Immediate", "OnReset"]
    }
}
```

In the previous example, a client can annotate their create request body on the `VolumeCollection` itself, or a delete operation on the `Volumes` within the `VolumeCollection`.

The following sample request deletes a `Volume` on the next reset:

```http
DELETE /redfish/v1/Systems/1/Storage/SATAEmbedded/Volumes/2 HTTP/1.1
Content-Type: application/json;charset=utf-8
Content-Length: <computed length>
OData-Version: 4.0

{
    "@Redfish.OperationApplyTime": "OnReset"
}
```

Services that support the `@Redfish.OperationApplyTime` annotation for an action shall include the `@Redfish.OperationApplyTimeSupport` response annotation for the action.

The following example response for a `ComputerSystem` resource supports the `@Redfish.OperationApplyTime` annotation in the reset action request:

```json
{
    "@odata.context": "/redfish/v1/$metadata#ComputerSystem.ComputerSystem",
    "@odata.id": "/redfish/v1/Systems/1",
    "@odata.type": "#ComputerSystem.v1_5_0.ComputerSystem",
    "Actions": {
        "#ComputerSystem.Reset": {
            "target": "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset",
            "ResetType@Redfish.AllowableValues": [
                "On",
                "ForceOff",
                "ForceRestart",
                "Nmi",
                "ForceOn",
                "PushPowerButton"
            ],
            "@Redfish.OperationApplyTimeSupport": {
                "@odata.type": "#Settings.v1_2_0.OperationApplyTimeSupport",
                "SupportedValues": ["Immediate", "AtMaintenanceWindowStart"],
                "MaintenanceWindowStartTime": "2017-05-03T23:12:37-05:00",
                "MaintenanceWindowDurationInSeconds": 600,
                "MaintenanceWindowResource": {
                    "@odata.id": "/redfish/v1/Systems/1"
                }
            }
        }
    },
    ...
}
```

In the previous example, a client can annotate their reset action request body on the `ComputerSystem` in the payload.

The following sample request completes a reset at the start of the next maintenance window:

```http
POST /redfish/v1/Systems/1/Actions/ComputerSystem.Reset HTTP/1.1
Content-Type: application/json;charset=utf-8
Content-Length: <computed length>
OData-Version: 4.0

{
    "ResetType": "ForceRestart",
    "@Redfish.OperationApplyTime": "AtMaintenanceWindowStart"
}
```

Services that support the `@Redfish.OperationApplyTime` annotation for a resource collection or action shall create a [Task](#asynchronous-operations), and respond with the HTTP [202](#status-202) status code with a `Location` header set to the URI of a `Task `resource, if the client's request body contains `@Redfish.OperationApplyTime` in the request.

The `Settings` Redfish Schema defines the structure of the `@Redfish.OperationApplyTimeSupport` object and the `@Redfish.OperationApplyTime` annotation value.

## Service responses

Redfish defines these response types:

| Response type | Description |
|:--------------|:------------|
| [Metadata responses](#metadata-responses) | The resources and types that the service exposes to generic clients. |
| [Resource responses](#resource-responses) | The JSON representation of an individual resource. |
| [Resource collection responses](#resource-collection-responses) | The JSON representation of a resource collection. |
| [Error responses](#error-responses) | The top-level JSON response that provides additional information for an HTTP error. |
 
### Response headers

HTTP defines headers that can be used in response messages.  The following table defines those headers and their requirements for Redfish Services.

* Redfish Services shall be able to return the headers in the following table as defined by the HTTP 1.1 specification if the value in the Required column is set to "yes" .
* Redfish Services should be able to return the headers in the following tables as defined by the HTTP 1.1 specification if the value in the Required column is set to "no".
* Redfish clients shall be able to understand and be able to process all of the headers in the following table as defined by the HTTP 1.1. specification.

| Header | Required | Supported values | Description |
|:-------|:---------|:-----------------|:------------|
| `OData-Version` | Yes | 4.0 | The OData version of the payload to which the response conforms. |
| `Content-Type` | Yes | [RFC 7231](#RFC7231) | The type of representation used in the message body.  Services shall specify a Content-Type of `application/json` when returning resources as JSON, and `application/xml` when returning metadata as XML. `;charset=utf-8` shall be appended to the `Content-Type` if specified in the chosen media-type in the Accept header for the request. |
| `Content-Encoding` | No | [RFC 7231](#RFC7231) | The encoding that has been performed on the media type. |
| `Content-Length` | No | [RFC 7231](#RFC7231) | The size of the message body.  An optional means of indicating size of the body uses Transfer-Encoding: chunked, that does not use the Content-Length header. If a service does not support Transfer-Encoding and needs Content-Length instead, the service will respond with status code [411](#status-411). |
| `ETag` | Conditional | [RFC 7232](#RFC7232) | An identifier for a specific version of a resource, often a message digest.   ETags shall be included on responses to GETs of ManagerAccount objects. |
| `Server` | Yes | [RFC 7231](#RFC7231) | Required.  A product token and its version. Multiple product tokens may be listed. |
| <a id="link-header-table"></a>`Link` | Yes | See [Link Header](#link-header) | Link Headers shall be returned as described in the clause on [Link Headers](#link-header). |
| `Location` | Conditional | [RFC 7231](#RFC7231) | A URI that can be used to request a representation of the resource.  Shall be returned if a new resource was created.  `Location` and `X-Auth-Token` shall be included on responses that create user sessions. |
| `Cache-Control` | Yes | [RFC 7234](#RFC7234) | Shall be supported and indicates whether a response can or cannot be cached. |
| `Via` | No | [RFC 7230](#RFC7230) | The network hierarchy and recognizes message loops. Each pass inserts its own VIA. |
| `Max-Forwards` | No | [RFC 7231](#RFC7231) | Limits gateway and proxy hops. Prevents messages from remaining in the network indefinitely. |
| `Access-Control-Allow-Origin` | Yes | [W3C CORS](#W3C-CORS), Section 5.1  | Prevents or allows requests based on originating domain. Used to prevent CSRF attacks. |
| `Allow` | Yes | POST, PUT, PATCH, DELETE, GET, HEAD | Shall be returned with a [405](#status-405) (Method Not Allowed) response to indicate the valid methods for the specified Request URI.  Shall be returned with any GET or HEAD operation to indicate the other allowable operations for this resource. |
| `WWW-Authenticate` | Yes | [RFC 7235](#RFC7235), Section 4.1 | Required for Basic and other optional authentication mechanisms. See the [Security](#security-details) clause for details. |
| `X-Auth-Token` | Yes | Opaque encoded octet strings | Used for authentication of user sessions. The token value shall be indistinguishable from random. |
| `Retry-After` | No | [RFC 7231](#RFC7231), Section 7.1.3 | Used to inform a client how long to wait before requesting the Task information again. |

### Link header

The [Link Header](#link-header-table) provides metadata information on the accessed resource in response to a HEAD or GET operation.  The information can describe things such as hyperlinks from the resource and JSON Schemas that describe the resource.

Below is an example of the Link Headers of a ManagerAccount with a role of Administrator that has a Settings Annotation.
- The first Link Header is an example of a hyperlink that comes from the resource.  It describes hyperlinks within the resource.  This type of header is outside the scope of this specification.
- The second Link Header is an example of an Annotation Link Header as it references the JSON Schema that describes the annotation and does not have rel=describedby.  This example references the public copy of the annotation on the DMTF's Redfish Schema repository.
- The third Link Header is an example for the JSON Schema that describes the actual resource.
- Note that the URL can reference an unversioned JSON Schema (since the @odata.type in the resource indicates the appropriate version) or reference the versioned JSON Schema (which according to previous normative statements would need to match the version specified in the @odata.type property of the resource).

```http
Link: </redfish/v1/AccountService/Roles/Administrator>; path=/Links/Role
Link: <http://redfish.dmtf.org/schemas/Settings.json>
Link: </redfish/v1/JsonSchemas/ManagerAccount.v1_0_2.json>; rel=describedby
```

In the example:

| `Link`<br/>header | Description |
|:--------------|:------------|
| 1 | Describes hyperlinks within the resource.  This type of header is outside the scope of this specification. |
| 2 | An annotation header.  References the JSON schema that describes the annotation and does not have `rel=describedby`.  This example references the public copy of the annotation on the DMTF's Redfish Schema repository.<blockquote><strong>Note:</strong> The URL can reference either:<ul><li>An unversioned JSON schema because the `@odata.type` in the resource indicates the appropriate version.</li><li>The versioned JSON schema, which according to previous normative statements must match the version in the `@odata.type` property of the resource.</li></ul></blockquote> |
| 3 | The JSON schema that describes the actual resource.  The service shall return a `Link` header that contains `rel=describedby` for GET and HEAD requests.  GET and HEAD requests should return a `Link` header that satisfies annotations.  If the referenced JSON schema is a versioned schema, it shall match the version in the `@odata.type` property value that the resource returns. |

### Status codes

HTTP defines status codes that services can return in response messages.

To provide the client more meaningful and deterministic error semantics, the response body contains an [extended error resource](#error-responses) when the HTTP status code indicates a failure.

* Services should return the extended error resource as described in this specification in the response body when the service returns the HTTP [400](#status-400) or greater status code.  Services may return the extended error resource, as described in this specification, in the response body when other status codes are returned for those codes and operations that allow a response body.
* Extended error messages MUST NOT provide privileged information when authentication failures occur.

NOTE: Refer to the [Security](#security-details) clause for security implications of extended errors

The following table lists HTTP status codes that have meaning or usage defined for a Redfish service, or are otherwise referenced by this specification. Other codes may be returned by the service as appropriate, and their usage is implementation-specific. See the Description column for usage and additional requirements imposed by this specification.
* Clients shall understand and be able to process the status codes in the following table as defined by the HTTP 1.1 specification and constrained by additional requirements defined by this specification.
* Services shall respond with these status codes as appropriate.
* Exceptions from operations shall be mapped to HTTP status codes.
* Redfish Services should not return the status code 100. Using the HTTP protocol for a multipass data transfer should be avoided, except upload of extremely large data.

| HTTP Status Code                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| <a id="status-200"></a>200 OK                     | The request was successfully completed and includes a representation in its body.                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="status-201"></a>201 Created                | A request that created a new resource completed successfully.  The Location header shall be set to the canonical URI for the newly created resource.  A representation of the newly created resource may be included in the response body.                                                                                                                                                                                                                                                      |
| <a id="status-202"></a>202 Accepted               | The request has been accepted for processing, but the processing has not been completed.  The Location header shall be set to the URI of a Task Monitor that can later be queried to determine the status of the operation.  A representation of the Task resource may be included in the response body.                                                                                                                                                                                        |
| <a id="status-204"></a>204 No Content             | The request succeeded, but no content is being returned in the body of the response.                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="status-301"></a>301 Moved Permanently      | The requested resource resides under a different URI.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| <a id="status-302"></a>302 Found                  | The requested resource resides temporarily under a different URI.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="status-304"></a>304 Not Modified           | The service has performed a conditional GET request where access is allowed, but the resource content has not changed.  Conditional requests are initiated using the headers If-Modified-Since and/or If-None-Match (see HTTP 1.1, sections 14.25 and 14.26) to save network bandwidth if there is no change.                                                                                                                                                                                   |
| <a id="status-400"></a>400 Bad Request            | The request could not be processed because it contains missing or invalid information (such as validation error on an input field, a missing required value, and so on).  An extended error shall be returned in the response body, as defined in clause [Error responses](#error-responses).                                                                                                                                                                                                   |
| <a id="status-401"></a>401 Unauthorized           | The authentication credentials included with this request are missing or invalid.                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="status-403"></a>403 Forbidden              | The server recognized the credentials in the request, but those credentials do not possess authorization to perform this request.                                                                                                                                                                                                                                                                                                                                                               |
| <a id="status-404"></a>404 Not Found              | The request specified a URI of a resource that does not exist.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="status-405"></a>405 Method Not Allowed     | The HTTP verb specified in the request (e.g., DELETE, GET, HEAD, POST, PUT, PATCH) is not supported for this request URI.  The response shall include an Allow header, that provides a list of methods that are supported by the resource identified by the Request-URI.                                                                                                                                                                                                                       |
| <a id="status-406"></a>406 Not Acceptable         | The Accept header was specified in the request and the resource identified by this request is not capable of generating a representation corresponding to one of the media types in the Accept header.                                                                                                                                                                                                                                                                                          |
| <a id="status-409"></a>409 Conflict               | A creation or update request could not be completed, because it would cause a conflict in the current state of the resources supported by the platform (for example, an attempt to set multiple properties that work in a linked manner using incompatible values).                                                                                                                                                                                                                             |
| <a id="status-410"></a>410 Gone                   | The requested resource is no longer available at the server and no forwarding address is known.  This condition is expected to be considered permanent.  Clients with hyperlink editing capabilities SHOULD delete references to the Request-URI after user approval.  If the server does not know, or has no facility to determine, whether or not the condition is permanent, the status code [404](#status-404) (Not Found) SHOULD be used instead.  This response is cacheable unless indicated otherwise. |
| <a id="status-411"></a>411 Length Required        | The request did not specify the length of its content using the Content-Length header (perhaps Transfer-Encoding: chunked was used instead).  The addressed resource requires the Content-Length header.                                                                                                                                                                                                                                                                                        |
| <a id="status-412"></a>412 Precondition Failed    |The precondition (such as OData-Version, If-Match or If-Not-Modified headers) check failed.                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="status-415"></a>415 Unsupported Media Type | The request specifies a Content-Type for the body that is not supported.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <a id="status-428"></a>428 Precondition Required  | The request did not provide the required precondition, such as an If-Match or If-None-Match header.                                                                                                                                                                                                                                                                                                                                                                                             |
| <a id="status-431"></a>431 Request Header Field Too Large  | The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.                                                                                                                                                                                                                                                                                                                                        |
| <a id="status-500"></a>500 Internal Server Error  | The server encountered an unexpected condition that prevented it from fulfilling the request.  An extended error shall be returned in the response body, as defined in clause [Error Responses](#error-responses).                                                                                                                                                                                                                                                                              |
| <a id="status-501"></a>501 Not Implemented        | The server does not (currently) support the functionality required to fulfill the request.  This is the appropriate response when the server does not recognize the request method and is not capable of supporting the method for any resource.                                                                                                                                                                                                                                                |
| <a id="status-503"></a>503 Service Unavailable    | The server is currently unable to handle the request due to temporary overloading or maintenance of the server.  A service may use this response to indicate that the request URI is valid, but the service is performing initialization or other maintenance on the resource.  It may also use this response to indicate the service itself is undergoing maintenance, such as finishing initialization steps after reboot of the service.                                                     |
| <a id="status-507"></a>507 Insufficient Storage | The server is unable to build the response for the client due to the size of the response. |

### Metadata responses

Metadata describes resources, resource collections, capabilities, and service-dependent behavior to generic consumers, including OData client tools and applications with no specific understanding of this specification.  Clients are not required to request metadata if they already have sufficient understanding of the target service.  For example, clients are not required to request metadata to request and interpret a JSON representation of a resource that this specification defines.

### Service metadata

The service metadata describes top-level service resources and resource types according to [OData-Schema](#OData-CSDL).  The Redfish service metadata is represented as an XML document with an `Edmx` root element in the `https://docs.oasis-open.org/odata/ns/edmx` namespace with an OData version attribute set to `4.0`.

```xml
<edmx:Edmx xmlns:edmx="https://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
    <!-- edmx:Reference and edmx:Schema elements go here -->
</edmx:Edmx>
```

#### Referencing other schemas

The service metadata shall include the namespaces for each of the Redfish resource types, along with the `RedfishExtensions.v1_0_0` namespace.

These references may use either:

* The standard URI for the hosted Redfish Schema definitions, such as on `http://redfish.dmtf.org/schemas`.
* A URI to a local version of the Redfish Schema that shall be identical to the hosted version.

```xml
<edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/AccountService_v1.xml">
    <edmx:Include Namespace="AccountService" />
    <edmx:Include Namespace="AccountService.v1_0_0" />
</edmx:Reference>
<edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/ServiceRoot_v1.xml">
    <edmx:Include Namespace="ServiceRoot" />
    <edmx:Include Namespace="ServiceRoot.v1_0_0" />
</edmx:Reference>

...

<edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/VirtualMedia_v1.xml">
    <edmx:Include Namespace="VirtualMedia" />
    <edmx:Include Namespace="VirtualMedia.v1_0_0" />
</edmx:Reference>
<edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/RedfishExtensions_v1.xml">
    <edmx:Include Namespace="RedfishExtensions.v1_0_0" Alias="Redfish" />
</edmx:Reference>
```

The service's [metadata document](#metadata-document-request) shall include an `EntityContainer` that defines the top-level resources and resource collections.

An implementation may extend the `ServiceContainer` that the `ServiceRoot` schema defines for the implementation's [OData service document](#odata-service-document).

```xml
<edmx:DataServices>
    <Schema xmlns="https://docs.oasis-open.org/odata/ns/edm" Namespace="Service">
        <EntityContainer Name="Service" Extends="ServiceRoot.v1_0_0.ServiceContainer" />
    </Schema>
</edmx:DataServices>
```

#### Referencing OEM extensions

The metadata document may reference additional schema documents that describe OEM-specific extensions that the service uses.

For example, the metadata document may reference custom types for additional resource collections.

```xml
<edmx:Reference Uri="http://contoso.org/Schema/CustomTypes">
    <edmx:Include Namespace="CustomTypes" />
</edmx:Reference>
```

### OData service document

The OData service document serves as a top-level entry point for generic OData clients.

```json
{
    "@odata.context": "/redfish/v1/$metadata",
    "value": [{
            "name": "Service",
            "kind": "Singleton",
            "url": "/redfish/v1/"
        },
        {
            "name": "Systems",
            "kind": "Singleton",
            "url": "/redfish/v1/Systems"
        },
        {
            "name": "Chassis",
            "kind": "Singleton",
            "url": "/redfish/v1/Chassis"
        },
        {
            "name": "Managers",
            "kind": "Singleton",
            "url": "/redfish/v1/Managers"
        },
        ...
    ]
}
```

The service shall return the OData service document as a JSON object by using the `application/json` MIME type.

The JSON object shall contain the `@odata.context` context property set to `/redfish/v1/$metadata`.

This context tells a generic OData client how to find the [service metadata](#service-metadata) that describes the types that the service exposes.

The JSON object shall include a `value` property set to a JSON array that contains an entry for the [service root](#service-root-request) and each resource that is a direct child of the service root.

Each JSON object entry includes:

| Property | Defines |
|:---------|:--------|
| `name` | A user-friendly resource name of the resource. | 
| `kind` | The type of resource.  Value is either:<ul><li>`Singleton` for an individual resource, including a resource collection.</li><li>`EntitySet` for top-level resource collections.</li></ul> |
| `url` | The relative URL for the top-level resource. |

### Resource responses

Services return resources as JSON payloads by using the `application/json` MIME type.  Resource property names match the case in the [Schema](#resource-properties).

Responses for a single resource shall contain the [`Id`](#id-property) and [`Name`](#name-property) properties and may contain the [`Description`](#description-property) property.

See also [Resource collection responses](#resource-collection-responses).

#### Context property

Responses for a single resource may contain a `@odata.context` context property that describes the source of the payload.

If the [`@odata.context`](#context-property) property is present, it shall be the context URL that describes the resource, according to [OData-Protocol](#OData-Protocol).

The context URL for a resource should be in the format:

<pre><var>MetadataUrl</var>#<var>ResourceType</var></pre> 
 
where

| Variable | Description |
|:--|:--|
| <code><var>MetadataUrl</var></code> | The metadata URL of the service, such as `/redfish/v1/$metadata`. |
| <code><var>ResourceType</var></code> | The fully qualified name of the unversioned resource type.<br/>Many Redfish implementations concatenate the resource type namespace with a period (`.`) followed by the resource type. |

For example, the following context URL specifies that the results show a single `ComputerSystem` resource:

```json
{
    "@odata.context": "/redfish/v1/$metadata#ComputerSystem.ComputerSystem",
    ...
}
```

The context URL for a resource may be in one of the following formats:
 
<pre><var>MetadataUrl</var>#<var>ResourcePath</var>/$<var>entity</var></pre>

or

<pre><var>MetadataUrl</var>#<var>ResourceType</var>/$<var>entity</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>MetadataUrl</var></code> | The metadata URL of the service, such as `/redfish/v1/$metadata`. |
| <code><var>ResourcePath</var></code> | The path from the service root to the singleton or resource collection that contains the resource. |
| <code><var>ResourceType</var></code> | The fully qualified name of the unversioned resource type.<br/>While <code><var>ResourcePath</var></code> or <code><var>ResourceType</var></code> is allowed, services should use the <code><var>MetadataUrl</var>#<var>ResourceType</var></code> format for the `@odata.context` property values.<br/>Use <code><var>ResourceType</var></code> because the [OData-Protocol](#OData-Protocol) requires additional constraints when the response returns partial or expanded results that pose an additional burden on services. |
| <code><var>entity</var></code> | The entity.  Defines whether the response is a single resource from either:<ul><li>An entity set.</li><li>A navigation property.</li></ul> |

#### Resource identifier property

Resources in a response shall include a unique `@odata.id` identifier property.  The value of the identifier property shall be the unique resource [URI](#uris)

In JSON payloads, resource identifiers are strings that conform to the rules for RFC3986-defined URI paths.  See **3.3. Path** in [Uniform Resource Identifier (URI): Generic Syntax](https://www.ietf.org/rfc/rfc3986.txt).

Represent resources in the same authority as the request URI according to the rules of `path-absolute`, which that specification defines.

That is, they shall always start with a single forward slash (`/`).

Resources within a different authority as the request URI shall start with a double-slash (`//`) followed by the authority and path to the resource.

The resource identifier is the canonical URL for the resource.  Use it to retrieve or edit the resource, as appropriate.

#### Type property

All resources in a response shall include a `@odata.type` type property.  To support generic OData clients, all [structured properties](#structured-properties) in a response should include an `@odata.type` type property.  The `type` property value shall be a URL fragment that specifies the type of the resource as defined within, or referenced by, the [metadata document](#service-metadata) and shall be in the format:

<pre>#<var>Namespace</var>.<var>TypeName</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>Namespace</var></code> | The full namespace name of the Redfish Schema that defines the type.  For Redfish resources, the versioned namespace name. |
| <code><var>TypeName</var></code> | The name of the resource type. |

#### ETag property

ETags enable clients to conditionally retrieve or update a resource.  Resources should include an `@odata.etag` ETag property.  For a resource, the value of the ETag property is the [ETag](#etags).

#### Primitive properties

Return primitive properties as JSON values:

| Type | JSON representation |
|:---|:---|
| `Edm.Boolean` | Boolean. |
| `Edm.DateTimeOffset` | String, as a [DateTime value](#datetime-values). |
| `Edm.Duration` | String, as a [Duration value](#duration-values). |
| `Edm.Decimal` | Number.  Optionally contains a decimal point. |
| `Edm.Double` | Number.  Optionally contains a decimal point and an exponent. |
| `Edm.Guid` | String.  Matches the `([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})` pattern. |
| `Edm.Int64` | Number with no decimal point. |
| `Edm.String` | String. |

When receiving values from the client, services should support other valid representations of the data in the specified JSON type.  In particular, services should support valid integer and decimal values in exponential notation and integer values that contain a decimal point with no non-zero trailing digits.

#### DateTime values

Return `DateTime` values as JSON strings according to the ISO 8601 extended format, including the time offset or UTC suffix, in the format:

<pre>
	<var>YYYY</var>-<var>MM</var>-<var>DD</var> T <var>hh</var>:<var>mm</var>:<var>ss</var>[.<var>SSS</var>](Z|(+|-)<var>hh</var>:<var>mm</var>)
</pre>

where

| Variable or separator | Description |
|:--|:--|
| <code>T</code> | The time separator.  Must be a capital `T`. |
| <code><var>SSS</var></code> | The decimal fraction of a second.  One or more digits where the number of digits imply the precision. |
| <code>Z</code> | The time zone separator.  Must be a capital `Z`. |

When the time of day is unknown or serves no purpose, the service shall report `00:00:00Z` for the time of day value in `DateTime`.

#### Duration values

Return duration values as JSON strings according to the ISO 8601 duration format, in the format:

<pre>P[<var>yyyy</var>Y][<var>mm</var>M][<var>ww</var>W][<var>dd</var>D][T[<var>hh</var>H][<var>mm</var>M][<var>ss</var>[.<var>fff</var>]S]]</pre>

where

| Variable | Defines |
|:--|:--|
| <code><var>yyyy</var></code> | Years. |
| <code><var>mm</var></code> | Months. |
| <code><var>ww</var></code> | Weeks. |
| <code><var>dd</var></code> | Days. |
| <code><var>hh</var></code> | Hours. |
| <code><var>mm</var></code> | Minutes. |
| <code><var>ss</var></code> | Seconds. |
| <code><var>fff</var></code> | Fractional seconds. |

Each field is optional and may contain more than one digit.

For example, the following values represent the following durations:

| Value | Specifies a duration of |
|:--|:--|
| `P3D` | Three days. |
| `PT6H` | Six hours. |
| `PT10S` | Ten seconds. |
| `PT0.001S` | 0.001 seconds. |
| `PT1H30M` | One hour and 30 minutes. |

#### Structured properties

Return structured properties, defined as [complex types](#structured-types) or [expanded](#expanded-resources) [resource types](#resource-type-definitions), as JSON objects.  Specify the type of JSON object in the Redfish Schema definition of the property that contains the structured value.

Some structured properties inherit from the `Resource.v1_0_0.ReferenceableMember` definition.  Structured properties that follow this definition shall contain the [`MemberId`](#memberid-property) and [resource identifier](#resource-identifier-property) properties.

Because the definition of structured properties can evolve over time, clients must be aware of the inheritance model that the different structured property definitions use.  

For example, the `Location` definition in `Resource_v1.xml` has gone through several iterations since the `Resource.v1_1_0` namespace was introduced, and each iteration inherits from the previous version so that existing references in other schemas can leverage the new additions.

Structured property references must resolve both local and external references.

A local reference is a resource that has a structured property in its own schema, such as `ProcessorSummary` in the `ComputerSystem` resource.  In these cases, the [`type`](#type-property) property for the resource is the starting point for resolving the structured property definition.

To find the latest applicable version, clients can step the [version of the resource](#type-identifiers) backwards.

For example, if a service returns `#ComputerSystem.v1_4_0.ComputerSystem` as the resource type, a client can step backwards from `ComputerSystem.v1_4_0`, to `ComputerSystem.v1_3_0`, to `ComputerSystem.v1_2_0`, and so on, until it finds the `ProcessorSummary` structured property definition.

An external reference is a resource that has a property that references a definition found in a different schema, such as `Location` in the `Chassis` resource.

In these cases, clients can use the latest version of the external schema file as a starting point to resolve the structured property definition.

For example, if the latest version of `Resource_v1.xml` is `1.6.0`, a client can go backward from `Resource.v1_6_0`, to `Resource.v1_5_0`, to `Resource.v1_4_0`, and so on, until it finds the `Location` structured property definition.

#### Actions property

Represent available actions for a resource as individual properties nested under a single structured property on the `Actions` resource.

##### Action representation

Represent actions as a property nested under `Actions`.  Use the unique URI that identifies the action to name the action.

This URI shall be in the format

<pre>#<var>Namespace</var>.<var>ActionName</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>Namespace</var></code> | The namespace in the reference to the Redfish Schema where the action is defined.  For Redfish resources, this shall be the version-independent namespace. |
| <code><var>ActionName</var></code> | The name of the action. |

The client may use this fragment to identify the [action definition](#resource-actions) in the [referenced](#referencing-other-schemas) Redfish Schema document that is associated with the specified namespace.

The property is a JSON object that contains a `target` property.  The `target` property defines the relative or absolute URL to invoke the action.  The JSON object for the action may contain a `title` property, which is a string that defines the action's name.

The [OData JSON Format](#OData-JSON) specification defines the `target` and `title` properties.

To specify the list of allowable values for a parameter, the client can use the [`AllowableValues`](#allowable-values) annotation to annotate the property for the available action.

For example, the following property defines the `Reset` action in the `ComputerSystem` namespace:

```json
{
    "#ComputerSystem.Reset": {
        "target": "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset",
        "title": "Computer System Reset",
        "ResetType@Redfish.AllowableValues": [
            "On",
            "ForceOff",
            "GracefulRestart",
            "GracefulShutdown",
            "ForceRestart",
            "Nmi",
            "ForceOn",
            "PushPowerButton"
        ]
    },
    ...
}
```

Given this, the client could invoke a POST request to `/redfish/v1/Systems/1/Actions/ComputerSystem.Reset` with the following body:

```json
{
    "ResetType": "On"
}
```

##### Allowable values

To specify the list of allowable values for a parameter, clients can use `AllowableValues` annotation to annotate the property for the action.

To specify the set of allowable values, include a property with the name of the parameter followed by `@Redfish.AllowableValues`.  The property value is a JSON array of strings that define the allowable values for the parameter.

#### Links property

A resource's `Links` property [references](#reference-properties) other resources.

The `Links` property shall be named `Links` and contain a property for each [non-contained](#contained-resources) [reference property](#reference-properties) that the Redfish Schema for that type defines.

* For single-valued reference properties, the value of the property shall be the [single related resource ID](#reference-to-a-single-related-resource).
* For collection-valued reference properties, the value of the property shall be the [array of related resource IDs](#array-of-references-to-related-resources).

To navigate vendor-specific hyperlinks, the `Links` property shall also include an [OEM property](#oem-property).

##### Reference to a single-related resource

A reference to a single resource is a JSON object that contains a single [resource-identifier-property](#resource-identifier-property).  The name of this reference is the name of the relationship.  The value of this reference is the URI of the referenced resource.

```json
{
    "Links": {
        "ManagedBy": {
            "@odata.id": "/redfish/v1/Chassis/Encl1"
        }
    }
}
```

##### Array of references to related resources

A reference to a set of zero or more related resources is an array of JSON objects.  The name of this reference is the name of the relationship.  Each member of the array is a JSON object that contains a single [resource-identifier-property](#resource-identifier-property).  The member's value is the URI of the referenced resource.

```json
{
    "Links": {
        "Contains": [{
                "@odata.id": "/redfish/v1/Chassis/1"
            },
            {
                "@odata.id": "/redfish/v1/Chassis/Encl1"
            }
        ]
    }
}
```

#### OEM property

OEM-specific properties are nested under an [OEM property](#oem-property).

#### Partial resource results

A service shall not break responses for a single resource into multiple results.  For details about the format of these responses, see [partial results](#next-link-property-and-partial-results).

#### Extended information

Response objects may include extended information.  For example, response objects may include information about properties that cannot be updated.  To define this information, apply an annotation to a specific property of the JSON response or an entire JSON object.  See [Extended property information](#extended-property-information).

##### Extended object information

To specify object-level status information, services can annotate a JSON object with `@Message.ExtendedInfo`.

```json
{
    "@odata.context": "/redfish/v1/$metadata#SerialInterface.SerialInterface",
    "@odata.id": "/redfish/v1/Managers/1/SerialInterfaces/1",
    "@odata.type": "#SerialInterface.v1_0_0.SerialInterface",
    "Name": "Managed Serial Interface 1",
    "Description": "Management for Serial Interface",
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "InterfaceEnabled": true,
    "SignalType": "Rs232",
    "BitRate": "115200",
    "Parity": "None",
    "DataBits": "8",
    "StopBits": "1",
    "FlowControl": "None",
    "ConnectorType": "RJ45",
    "PinOut": "Cyclades",
    "@Message.ExtendedInfo": [{
        "MessageId": "Base.1.0.PropertyDuplicate",
        "Message": "The property InterfaceEnabled was duplicated in the request.",
        "RelatedProperties": [
            "#/InterfaceEnabled"
        ],
        "Severity": "Warning",
        "Resolution": "Remove the duplicate property from the request body and resubmit the request if the operation failed."
    }]
}
```

The value of the property is an array of [message objects](#message-object).

##### Extended property information

Services can use `@Message.ExtendedInfo`, prepended with the name of the property to annotate an individual property in a JSON object with extended information:

```json
{
    "@odata.context": "/redfish/v1/$metadata#SerialInterface.SerialInterface",
    "@odata.id": "/redfish/v1/Managers/1/SerialInterfaces/1",
    "@odata.type": "#SerialInterface.v1_0_0.SerialInterface",
    "Name": "Managed Serial Interface 1",
    "Description": "Management for Serial Interface",
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "InterfaceEnabled": true,
    "SignalType": "Rs232",
    "BitRate": 115200,
    "Parity": "None",
    "DataBits": 8,
    "StopBits": 1,
    "FlowControl": "None",
    "ConnectorType": "RJ45",
    "PinOut": "Cyclades",
    "PinOut@Message.ExtendedInfo": [{
        "MessageId": "Base.1.0.PropertyValueNotInList",
        "Message": "The value Contoso for the property PinOut is not in the list of acceptable values.",
        "Severity": "Warning",
        "Resolution": "Choose a value from the enumeration list that the implementation can support and resubmit the request if the operation failed."
    }]
}
```

The value of the property is an array of [message objects](#message-object).

#### Additional annotations

A JSON resource representation may include additional annotations as properties with the name in the format:

<pre>[<var>PropertyName</var>]@<var>Namespace</var>.<var>TermName</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>PropertyName</var></code> | The name of the property to annotate.  If absent, the annotation applies to the entire resource. |
| <code><var>Namespace</var></code> | The name of the namespace that defines the annotation term.  The [metadata document](#service-metadata) in the [context URL](#context-property) of the request must reference this namespace. |
| <code><var>TermName</var></code> | The name of the annotation term to apply to the resource or property of the resource. |

Services shall limit the annotation usage to the `odata`, `Redfish`, and `Message` namespaces.  The [OData JSON Format](#OData-JSON) specification defines the `odata` namespace.  The `Redfish` namespace is an alias for the `RedfishExtensions.v1_0_0` namespace.

The client can get the definition of the annotation from the [service metadata](#service-metadata), or may ignore the annotation entirely, but should not fail reading the resource due to unrecognized annotations, including new annotations that the `Redfish` namespace defines.

### Resource collection responses

Resource collections are JSON payloads that use the `application/json` MIME type.  Resource property names match the case in the [Schema](#resource-properties).  

Clients shall derive resource collection schema from the `Resource` schema.  Thus, resource collection responses shall contain the following properties:

* The [`Name` property](#name-property)
* The [Resource Identifier property](#resource-identifier-property)
* The [`Type` property](#type-property)
* An array of [`Members`](#members-property)
* A [resource count](#count-property)

Responses for resource collections may contain the following properties:

* The [`Description` property](#description-property)
* The [`Context` property](#context-property)
* An [`Etag` property](#etag-property)
* A [`Next Link` property](#next-link-property-and-partial-results) for partial results
* An [`OEM` property](#oem-property)

Responses for resource collections shall not contain any property that this section of this specification does not explicitly define.

#### Context property

Responses shall contain an `@odata.context` context property that describes the source of the payload.  The value of the context property shall be the context URL that describes the resource collection, according to [OData-Protocol](#OData-Protocol).

The context URL for a resource collection has one of these formats:

<pre><var>MetadataUrl</var>.#<var>CollectionResourceType</var></pre>
<pre><var>MetadataUrl</var>.#<var>CollectionResourcePath</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>MetadataUrl</var></code> | The metadata URL of the service, which is `/redfish/v1/$metadata`. |
| <code><var>CollectionResourceType</var></code> | The fully qualified name of the unversioned type of resources in the resource collection. |
| <code><var>CollectionResourcePath</var></code> | The path from the service root to the resource collection. |

#### Count property

The `count` property defines the total number of resources, or members, that are available in the resource collection.  The count property shall be named `Members@odata.count` and its value shall be the total number of members available in the resource collection.  The `$top` or `$skip` [query parameters](#query-parameters) do not affect this count.

#### Members property

The `Members` property defines a collection of resources as a array of JSON objects. 

The Redfish Schema document that describes the containing type defines the type of each JSON object in the array.  The name of the property representing the members of the collection shall be `Members`.  The `Members` property shall not be null.  Empty collections shall be an empty JSON array.

#### Next Link Property and partial results

Responses may contain a subset of the members of the full resource collection.  For partial resource collections, the response includes a `Next Link` property named `Members@odata.nextLink`.  

The value of the `Next Link` property shall be an opaque URL to a resource, with the same `@odata.type`, which contains the next set of partial members.  The `Next Link` property shall only be present if the number of `Members` in the resource collection is greater than the number of members returned, and if the payload does not represent the end of the requested resource collection.

The [`count` property](#count-property) value is the total number of resources available if the client enumerates all pages of the resource collection.

#### Additional annotations

A JSON object that represents a resource collection may include additional annotations represented as properties whose name is in the format:

<pre>@<var>Namespace</var>.<var>TermName</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>Namespace</var></code> | The name of the namespace that defines the annotation term.  The [metadata document](#service-metadata) that the [context URL](#context-property) of the request defines shall reference this namespace. |
| <code><var>TermName</var></code> | The name of the annotation term to apply to the resource collection. |

Services shall limit the annotation usage to the `odata`, `Redfish`, and `Message` namespaces.  The [OData JSON Format](#OData-JSON) specification defines the `odata` namespace.  The `Redfish` namespace is an alias for the `RedfishExtensions.v1_0_0` namespace.

The client can get the definition of the annotation from the [service metadata](#service-metadata), or may ignore the annotation entirely, but should not fail reading the response due to unrecognized annotations, including new annotations that the Redfish namespace defines.

### Error responses

HTTP response status codes often do not provide enough information to enable deterministic error semantics.

For example, if a client makes a PATCH call and some properties do not match while others are not supported, the HTTP [400](#status-400) status code does not tell the client which values are in error.

Error responses provide the client more meaningful and deterministic error semantics.

To provide the client with as much information about the error as possible, a Redfish service may provide multiple error responses in the HTTP response.

Additionally, the service may provide Redfish standardized errors, OEM-defined errors, or both, depending on the implementation's ability to convey the most useful information about the underlying error.

An extended error resource, which is a single JSON object, defines the error responses, with an `error` property with the following properties.

| Property | Description |
|:---|:---|
| `code` | String.  Defines a `MessageId` from the message registry. |
| `message` | Displays a human-readable error message that corresponds to the message in the message registry. |
| `@Message.ExtendedInfo` | Displays an array of [message objects](#message-object). Describes one or more error messages. |

```json
{
    "error": {
        "code": "Base.1.0.GeneralError",
        "message": "A general error has occurred.  See ExtendedInfo for more information.",
        "@Message.ExtendedInfo": [{
                "@odata.type": "#Message.v1_0_0.Message",
                "MessageId": "Base.1.0.PropertyValueNotInList",
                "RelatedProperties": [
                    "#/IndicatorLED"
                ],
                "Message": "The value Red for the property IndicatorLED is not in the list of acceptable values",
                "MessageArgs": [
                    "RED",
                    "IndicatorLED"
                ],
                "Severity": "Warning",
                "Resolution": "Remove the property from the request body and resubmit the request if the operation failed"
            },
            {
                "@odata.type": "#Message.v1_0_0.Message",
                "MessageId": "Base.1.0.PropertyNotWritable",
                "RelatedProperties": [
                    "#/SKU"
                ],
                "Message": "The property SKU is a read only property and cannot be assigned a value",
                "MessageArgs": [
                    "SKU"
                ],
                "Severity": "Warning",
                "Resolution": "Remove the property from the request body and resubmit the request if the operation failed"
            }
        ]
    }
}
```

#### Message object

A `Message` object provides additional information about an [object](#extended-object-information), [property](#extended-property-information), or [error response](#error-responses).

A `Message` object is a JSON object with the following properties:

| Property | Type | Required | Defines |
|:---|:---|:---|:---|
| `MessageId` | String | Required | The error or message, which is not to be confused with the HTTP status code.<br/>Clients can use this code to access a detailed message from a message registry. |
| `Message` | String | Required | The human-readable error message that indicates the semantics associated with the error.<br/>This shall be the complete message, and not rely on substitution variables. |
| `RelatedProperties` | An array of JSON pointers | Optional | The properties in a JSON payload that the message describes. |
| `MessageArgs` | An array of strings | Optional | The substitution parameter values for the message.<br/>If the parameterized message defines a `MessageId`, the service shall include the `MessageArgs` in the response. |
| `Severity` | String | Optional | The severity of the error. |
| `Resolution` | String | Optional | The recommended actions to take to resolve the error. |

Each instance of a `Message` object shall contain at least a `MessageId`, together with any applicable `MessageArgs`, or a `Message` property that defines the complete human-readable error message.

`MessageIds` identify specific messages that a message registry defines.

The `MessageId` property value shall be in the format:

<pre><var>RegistryName</var>.<var>MajorVersion</var>.<var>MinorVersion</var>.<var>MessageKey</var></pre>

where

| Variable | Description |
|:--|:--|
| <code><var>RegistryName</var></code> | The name of the registry.  The registry name shall be Pascal-cased. |
| <code><var>MajorVersion</var></code> | A positive integer. The major version of the registry. |
| <code><var>MinorVersion</var></code> | A positive integer. The minor version of the registry. |
| <code><var>MessageKey</var></code> | The human-readable key into the registry.  The message key shall be Pascal-cased and shall not include spaces, periods, or special characters. |

To search the message registry for a corresponding message, the client can use the `MessageId`.

The message registry approach has advantages for internationalization, because the registry can be translated easily, and lightweight implementation because large strings need not be included with the implementation.

The use of `Base.1.0.GeneralError` as a `MessageId` in `ExtendedInfo` is discouraged.  If no better message exists or the `ExtendedInfo` array contains multiple messages, use `Base.1.0.GeneralError` only in the `code` property of the `error` object.

When an implementation uses `Base.1.0.GeneralError` in `ExtendedInfo`, the implementation should include a `Resolution` property with this error to indicate how to resolve the problem.

## Data model and Schema

One of the key tenets of the Redfish interface is the separation of protocol and data model.  This clause describes common data model, resource, and Redfish Schema requirements.

* Each resource shall be strongly typed according to a [resource type definition](#resource-type-definitions). The type shall be defined in a Redfish [schema document](#schema-documents) and identified by a unique [type identifier](#type-property).

### Schema, registry and profile repository

All Redfish schemas, registries, and profiles published or re-published by the DMTF's Redfish Forum are available from the DMTF website http://redfish.dmtf.org/ for download.  The files are organized on the site in the following manner:

| URL | Folder contents |
|-----|-----------------|
| redfish.dmtf.org/schemas | Current (most recent minor or errata ) release of each schema file in CSDL, JSON Schema, and/or OpenAPI formats. |
| redfish.dmtf.org/schemas/v1 |  Durable URL for programmatic access to all v1.xx schema files.  Every v1.xx minor or errata release of each schema file in CSDL, JSON Schema, OpenAPI formats. |
| redfish.dmtf.org/schemas/v1/{code} |  Durable URL for programmatic access to localized v1.xx schema files.  Localized schemas are organized in sub-folders using the 2-character ISO 639-1 language code as the {code} segment. |
| redfish.dmtf.org/schemas/archive | Subfolders contain schema files specific to a particular version release. |
| redfish.dmtf.org/registries | Current (most recent minor or errata) release of each registry file. |
| redfish.dmtf.org/registries/v1 | Durable URL for programmatic access to all v1.xx registry files. Every v1.xx minor or errata release of each registry file. |
| redfish.dmtf.org/registries/v1/{code} | Durable URL for programmatic access to localized v1.xx registry files.   Localized schemas are organized in sub-folders using the 2-character ISO 639-1 language code as the {code} segment. |
| redfish.dmtf.org/registries/archive | Subfolders contain registry files specific to a particular version release. |
| redfish.dmtf.org/profiles | Current release of each Redfish Interoperability Profile (.json) file and associated documentation. |
| redfish.dmtf.org/profiles/v1 | Durable URL for programmatic access to all v1.xx Redfish Interoperability Profile (.json) files. |
| redfish.dmtf.org/profiles/archive | Subfolders contain profile files specific to a particular profile version or release. |
| redfish.dmtf.org/dictionaries | Durable URL for programmatic access to all v1.xx Redfish Device Enablement Dictionary files. |
| redfish.dmtf.org/dictionaries/v1 | Durable URL for programmatic access to all v1.xx Redfish Device Enablement Dictionary files. |
| redfish.dmtf.org/dictionaries/archive | Subfolders contain dictionary files specific to a particular version release. |


#### Schema, registry, and profile file naming conventions

Standard Redfish schema, registry, profile, and dictionary files published in the repository, or those created by others and republished, shall follow a set of naming conventions.  These conventions are intended to ensure consistent naming and eliminate naming collisions.  Spaces shall not be part of file names.


##### CSDL (XML) schema file naming

Redfish CSDL schema files shall be named using the [TypeName](#type-identifiers) value, followed by "_v" and the major version of the schema.  As a single CSDL schema file contains all minor revisions of the schema, only the major version is used in the file name.  The file name shall be formatted as:
   
  *TypeName*_*vMajorVersion*.*xml*

For example, version 1.3.0 of the Chassis schema would be named "Chassis_v1.xml".

##### JSON Schema file naming

Redfish JSON Schema files shall be named using the [Type identifiers](#type-identifiers), following the format:

  *ResourceTypeName.vMajorVersion_MinorVersion_Errata.json*
  
For example, version 1.3.0 of the Chassis schema would be named "Chassis.v1_3_0.json".

##### OpenAPI file naming

Redfish OpenAPI files shall be named using the [Type identifiers](#type-identifiers), following the format:

  *ResourceTypeName.vMajorVersion_MinorVersion_Errata.yaml*
  
For example, version 1.3.0 of the Chassis schema would be named "Chassis.v1_3_0.yaml".

##### Registry file naming

Redfish message or privilege registry files shall be named using the Registry name, following the format:

  *RegistryName.MajorVersion.MinorVersion.Errata.json*
  
For example, version 1.0.2 of the Base message registry would be named "Base.1.0.2.json".

##### Profile file naming

The JSON document describing a Profile follows the Redfish Schema file naming conventions. The file name format for Profiles shall be formatted as:

  *ProfileName.vMajorVersion_MinorVersion_Errata.json*

For example, version 1.2.0 of the BasicServer profile would be named "BasicServer.v1_2_0.json". The file name shall include the Profile name and Profile version matching those property values within the document.

##### Dictionary file naming

The binary file describing a Redfish Device Enablement Dictionary follows the Redfish Schema file naming conventions for the schema that the dictionary is converted from. As a single Dictionary file contains all minor revisions of the schema, only the major version is used in the file name. The file names for Dictionaries shall be formatted as:

  *DictionaryName_vMajorVersion.dict*

For example, version 1.2.0 of the Chassis dictionary would be named "Chassis_v1.dict".

##### OEM schema file naming

To avoid namespace collisions with current or future standard Redfish schema files, third parties defining Redfish schemas should prepend an organization name to the Namespace as the file name.  For example, "ContosoDisk_v1.xml" or "ContosoDisk.v1.0.4.json".
 
#### Programmatic access to schema, registry, or profile files

Programs may access the Schema Repository using the durable URLs listed at the redfish.dmtf.org repository, as these folders will contain every released version of each file.  Programs incorporating remote repository access should implement a local cache to reduce latency, program requirements for Internet access and undue traffic burden on the DMTF website.




### Type identifiers

Types are identified by a *Type URI*. The URI for a type is of the form:

 `  #*Namespace*.*TypeName*`

where

* *Namespace* = the name of the namespace where the type is defined
* *TypeName* = the name of the type

The namespace for types defined by this specification is of the form:

 ` *ResourceTypeName*.v*MajorVersion*\_*MinorVersion*\_*Errata*`

where

* *ResourceTypeName* = the name of the resource type. For [structured (complex) types](#structured-types), [enumerations](#enums), and [actions](#resource-actions), this is generally the name of the containing resource type.
* *MajorVersion* = integer: something in the class changed in a backward incompatible way.
* *MinorVersion* = integer: a minor update. New properties may have been added but nothing removed. Compatibility will be preserved with previous minor versions.
* *Errata* = integer: something in the prior version was broken and needed to be fixed.

An example of a valid type namespace might be "ComputerSystem.v1_0_0", and an example of a corresponding Type URI would be "#ComputerSystem.v1_0_0.ComputerSystem".

#### Type identifiers in JSON Schema

In JSON Schema definitions for Redfish schema, the JSON Schema-defined "title" property shall contain the Type URI used to identify the schema.

For example, the "title" property for the ComputerSystem schema would be:

 ` "title": "#ComputerSystem.v1_0_0.ComputerSystem"`

#### Type identifiers in JSON

Types used within a JSON payload shall be defined in, or referenced by, the [service metadata](#service-metadata).

Resource types defined by this specification shall be referenced in JSON documents using the full (versioned) namespace name.

NOTE: Refer to the [Security](#security-details) clause for security implications of Data Model and Schema.

### Common naming conventions

The Redfish interface is intended to be easily readable and intuitive.  Thus, consistency helps the consumer who is unfamiliar with a newly discovered property understand its use.  While this is no substitute for the normative information in the Redfish Specification and Redfish Schema, the following rules help with readability and client usage.

Resource Name, Property Names, and constants such as Enumerations shall be Pascal-cased
* The first letter of each word shall be uppercase with spaces between words shall be removed  (e.g., PowerState, SerialNumber.)
* No underscores are used.
* Both characters are capitalized for two-character acronyms (e.g., IPAddress, RemoteIP).
* Only the first character of acronyms with three or more characters is capitalized, except the first word of a Pascal-cased identifier (e.g., Wwn, VirtualWwn). If a single acronym (or mixed-case name) is used alone as a name (e.g. RDMA, iSCSI, SNMP), then the value should follow the capitalization commonly used for that name.

Exceptions are allowed for the following cases:
 * Well-known technology names like "iSCSI" (e.g.,"iSCSITarget")
 * Product names like "iLO"
 * Well-known abbreviations or acronyms
 * OEM appears as "Oem" in resource or property names (alone or as a portion of a name), but should be "OEM" when used alone as a constant.
 * Enumeration values should be named for readability as they may appear unmodified on user interfaces, whereas property or resource names should follow the conventions above and strive for consistency in naming with existing Redfish resources or properties.

For properties that have units, or other special meaning, the unit identifier should be appended to the name. The current list includes:
 * Bandwidth (Mbps), (e.g., PortSpeedMbps)
 * CPU speed (Mhz), (e.g., ProcessorSpeedMhz)
 * Memory size (MegaBytes, MB), (e.g., MemoryMB)
 * Counts of items (Count), (e.g., ProcessorCount, FanCount)
 * The State of a resource (State) (e.g., PowerState.)
 * State values where "work" is being done end in (ing) (e.g., Applying, Clearing)

### Localization considerations

The creation of separate localized copies of Redfish schemas and registries is allowed and encouraged.  Localized schema and registry files may be submitted to the DMTF for republication in the Redfish Schema Repository.

Property names, parameter names, and enumeration values in the JSON response payload are never localized, but translated copies of those names may be provided as additional annotations in the localized schema for use by client applications.  A separate file for each localized schema or registry shall be provided for each supported language.  The English-language versions of Redfish schemas and registries shall be the normative versions, and alterations of meaning due to translation in localized versions of schemas and registries shall be forbidden.

Schemas and registries in languages other than English shall identify their language using the appropriate schema annotations.  Localized schemas and registries shall follow the same file naming conventions as the English language versions. When multiple localized copies are present in a repository (which will have the same filename), files in languages other than English shall be organized into sub-folders named to match the [ISO 639-1](#ISO-639-1) language code for those files.  English language files may be duplicated in an "en" sub-folder for consistency.  

Descriptive property, parameter, and enumeration text not translated into the languge specified shall be removed from localized versions.  This removal allows for software and tools to combine normative and localized copies, especially when minor schema version differences exist.

### Schema definition

Individual resources and their dependent types and actions are defined within a Redfish [schema document](#schema-documents).

#### Common annotations

All Redfish types and properties shall include [description](#description) and [long description](#long-description) annotations.

##### Description

The Description annotation can be applied to any type, property, action or parameter in order to provide a human-readable description of the Redfish Schema element.

The `Description` annotation is defined in http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml.

##### Long description

The LongDescription annotation term can be applied to any type, property, action or parameter in order to provide a formal, normative specification of the schema element.  Where the LongDescriptions in the Redfish schema files contain "shall" references, the service shall be required to conform with the statement.

The `LongDescription` annotation term is defined in http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml.

#### Schema documents

Individual resources are defined as entity types within an OData Schema representation of the Redfish Schema according to [OData-Schema](#OData-CSDL). The representation may include annotations to facilitate automatic generation of JSON Schema and OpenAPI representations of the Redfish Schema capable of validating JSON payloads.

##### Schema modification rules

Schema referenced from the implementation, either from the OData Service Document or from the JSON Schema File representations, may vary from the canonical definitions of those Schema defined by the Redfish Schema or other entities, provided they adhere to the rules in the list below.  Clients should take this into consideration when attempting operations on the resources defined by schema.
* Modified schema may constrain a read/write property to be read only.
* Modified schema may remove properties. 
* Modified schema may change any "Reference Uri" to point to Schema that adheres to the modification rules.   
* Other modifications to the Schema shall not be allowed.

##### Schema version requirements
The outer element of the OData Schema representation document shall be the `Edmx` element, and shall have a `Version` attribute with a value of "4.0".

~~~xml
  <edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
    <!-- edmx:Reference and edmx:DataService elements go here -->
  </edmx:Edmx>
~~~

##### Referencing other schemas

Redfish Schemas may reference types defined in other schema documents.  In the OData Schema representation, this is done by including a `Reference` element. In the JSON Schema and OpenAPI representations, this is done with a $ref property.

The reference element specifies the `Uri` of the OData schema representation document describing the referenced type and has one or more child `Include` elements that specify the `Namespace` attribute containing the types to be referenced, along with an optional `Alias` attribute for that namespace.

Type definitions generally reference the OData and Redfish namespaces for common type annotation terms, and resource type definitions reference the Redfish Resource.v1_0_0 namespace for base types. Redfish OData Schema representations that include measures such as temperature, speed, or dimensions generally include the [OData Measures namespace](#units-of-measure).

~~~xml
  <edmx:Reference Uri="http://docs.oasis-open.org/odata/odata/v4.0/cs01/vocabularies/Org.OData.Core.V1.xml">
    <edmx:Include Namespace="Org.OData.Core.V1" Alias="OData"/>
  </edmx:Reference>
  <edmx:Reference
    Uri="http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Measures.V1.xml">
    <edmx:Include Namespace="Org.OData.Measures.V1" Alias="Measures"/>
  </edmx:Reference>
  <edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/RedfishExtensions_v1.xml">
    <edmx:Include Namespace="RedfishExtensions.v1_0_0" Alias="Redfish"/>
  </edmx:Reference>
  <edmx:Reference Uri="http://redfish.dmtf.org/schemas/v1/Resource_v1.xml">
    <edmx:Include Namespace="Resource"/>
    <edmx:Include Namespace="Resource.v1_0_0"/>
  </edmx:Reference>
~~~

##### Namespace definitions

Resource types are defined within a namespace in the OData Schema representations. The namespace is defined through a `Schema` element that contains attributes for declaring the `Namespace` and local `Alias` for the schema.

The OData Schema element is a child of the `DataServices` element, which is a child of the [Edmx](#schema-documents) element.

~~~xml
  <edmx:DataServices>
    <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="MyTypes.v1_0_0">

      <!-- Type definitions go here -->

    </Schema>
  </edmx:DataServices>
~~~

#### Resource type definitions

Resource types are defined within a [namespace](#namespace-definitions) using `EntityType` elements. The `Name` attribute specifies the name of the resource and the `BaseType` specifies the base type, if any.

Redfish resources derive from a common resource base type named "Resource" in the Resource.v1_0_0 namespace.

The EntityType contains the [property](#resource-properties) and [reference property](#reference-properties) elements that define the resource, as well as annotations describing the resource.

~~~xml
  <EntityType Name="TypeA" BaseType="Resource.v1_0_0.Resource">
    <Annotation Term="OData.Description" String="This is the description of TypeA."/>
    <Annotation Term="OData.LongDescription" String="This is the specification of TypeA."/>

    <!-- Property and Reference Property definitions go here -->

  </EntityType>
~~~

All resources shall include [Description](#description) and [LongDescription](#long-description) annotations.


#### Resource capabilities

The capabilities of a resource are expressed using the `Capabilities.InsertRestrictions`, `Capabilities.UpdateRestrictions`, and `Capabilities.DeleteRestrictions` terms.
* `Capabilities.InsertRestrictions` is used to show whether or not a client is able to perform a POST on the resource.
* `Capabilities.UpdateRestrictions` is used to show whether or not a client is able to perform a PATCH or PUT on the resource.
* `Capabilities.DeleteRestrictions` is used to show whether or not a client is able to perform a DELETE on the resource.
* A service may only implement a subset of the capabilities that are set to true.

~~~xml
  <EntityType Name="ManagerAccount" BaseType="Resource.v1_0_0.Resource" Abstract="true">

    <!-- Other definitions for the EntityType go here -->

    <Annotation Term="Capabilities.InsertRestrictions">
      <Record>
        <PropertyValue Property="Insertable" Bool="false"/>
      </Record>
    </Annotation>
    <Annotation Term="Capabilities.UpdateRestrictions">
      <Record>
        <PropertyValue Property="Updatable" Bool="true"/>
        <Annotation Term="OData.Description" String="Manager Accounts can be updated to change the password and other writable properties."/>
      </Record>
    </Annotation>
    <Annotation Term="Capabilities.DeleteRestrictions">
      <Record>
        <PropertyValue Property="Deletable" Bool="true"/>
        <Annotation Term="OData.Description" String="Manager Accounts are removed with a Delete operation."/>
      </Record>
    </Annotation>
  </EntityType>
~~~

In the above example, the `Capabilities.InsertRestrictions` term has the `Insertable` property set to false, meaning a client is not able to perform a POST on the resource.  It also uses the `Capabilities.UpdateRestrictions` term with the `Updatable` property set to true, meaning a client is able to perform a PATCH or PUT on the resource, assuming the client has the right privilege to perform these operations.  It also uses the `Capabilities.DeleteRestrictions` term with the `Deletable` property set to true, meaning a client is able to perform a DELETE on the resource, assuming the client has the right privilege to perform this operation.


#### Resource URI pattern definitions

The URI patterns allowed for a given Redfish Resource are expressed using the `Redfish.Uris` annotation within the `EntityType` element.

~~~xml
  <EntityType Name="ManagerAccount" BaseType="Resource.v1_0_0.Resource" Abstract="true">

    <!-- Other definitions for the EntityType go here -->

    <Annotation Term="Redfish.Uris">
      <Collection>
        <String>/redfish/v1/AccountService/Accounts/{ManagerAccountId}</String>
      </Collection>
    </Annotation>
  </EntityType>
~~~

In the above example, the `Redfish.Uris` annotation describes a single URI pattern.  This definition means the client can expect to find the `ManagerAccount` resource at the URI `/redfish/v1/AccountService/Accounts/{ManagerAccountId}`, if the resource is implemented by the service.

Items between the `{` and `}` characters are treated as identifiers within the URI for given instances of a Redfish resource.  Clients interpret this as a string to be replaced in order to access a given resource.  A URI pattern may contain multiple identifier terms to support multiple levels of nested Resource Collections.  The identifier term in the URI pattern shall match the "Id" string property for the corresponding Redfish resource, or the "MemberId" string property for the corresponding object within a Redfish resource.  Using the above example, "{ManagerAccountId}" would be replaced by the "Id" property of the corresponding ManagerAccount resource.  If the "Id" property for a given ManagerAccount resource is "John", then the full URI for that resource would be "/redfish/v1/AccountService/Accounts/John".

All Redfish Resources and Redfish Resource Collections shall be annotated with `Redfish.Uris`.

All Redfish Resources and Redfish Resource Collections implemented by a service shall match the URI pattern described by the `Redfish.Uris` annotation for their given `EntityType` definition.


#### Resource properties

Structural properties of the resource are defined using the `Property` element. The `Name` attribute specifies the name of the property, and the [`Type`](#property-types) its type.

Property names in the Request and Response JSON Payload shall match the casing of the value of the `Name` attribute.

Properties that must have a non-nullable value include the [nullable attribute](#non-nullable-properties) with a value of "false".

~~~xml
  <Property Name="Property1" Type="Edm.String" Nullable="false">
    <Annotation Term="OData.Description" String="This is a property of TypeA."/>
    <Annotation Term="OData.LongDescription" String="This is the specification of Property1."/>
    <Annotation Term="OData.Permissions" EnumMember="OData.Permission/Read"/>
    <Annotation Term="Redfish.Required"/>
    <Annotation Term="Measures.Unit" String="Watts"/>
  </Property>
~~~

All properties shall include [Description](#description) and [LongDescription](#long-description) annotations.

Properties that are read-only are annotated with the [Permissions annotation](#permissions-of-properties) with a value of `OData.Permission/Read`.

Properties that are writable are annotated with the [Permissions annotation](#permissions-of-properties) with a value of `OData.Permission/ReadWrite`.
* A service may implement a writable property as read-only.

Properties that are required to be implemented by all services are annotated with the [required annotation](#required-properties).

Properties that have units associated with them can be annotated with the [units annotation](#units-of-measure).


##### Property types

Type of a property is specified by the `Type` attribute. The value of the type attribute may be a [primitive type](#primitive-types), a [structured type](#structured-types), an [enumeration type](#enums) or a [collection](#collections) of primitive, structured or enumeration types.

###### Primitive types

Primitive types are prefixed with the "Edm" namespace prefix.

Redfish Services may use any of the following primitive types:

| Type               | Meaning                                                               |
| ---                | ---                                                                   |
| Edm.Boolean        | True or False                                                         |
| Edm.DateTimeOffset | Date and time with a time-zone                                        |
| Edm.Decimal        | Numeric values with fixed precision and scale                         |
| Edm.Double         | IEEE 754 binary64 floating-point number (15-17 decimal digits)        |
| Edm.Guid           | A globally unique identifier                                          |
| Edm.Int64          | Signed 64-bit integer                                                 |
| Edm.String         | Sequence of UTF-8 characters                                          |

###### Structured types

Structured types are defined within a [namespace](#namespace-definitions) using `ComplexType` elements. The `Name` attribute of the complex type specifies the name of the structured type. Complex types can include a `BaseType` attribute that specifies the base type, if any.

Structured types may be reused across different properties of different resource types.

~~~xml
  <ComplexType Name="PropertyTypeA">
    <Annotation Term="OData.Description" String="This is type used to describe a structured property."/>
    <Annotation Term="OData.LongDescription" String="This is the specification of the type."/>

    <!-- Property and Reference Property definitions go here -->

  </ComplexType>
~~~

Structured types can contain [properties](#resource-properties), [reference properties](#reference-properties) and annotations.

Structured types shall include [Description](#description) and [LongDescription](#long-description) annotations.

###### Enums

Enumeration types are defined within a [namespace](#namespace-definitions) using `EnumType` elements. The `Name` attribute of the enumeration type specifies the name of the enumeration type.

Enumeration types may be reused across different properties of different resource types.

EnumType elements contain `Member` elements that define the members of the enumeration. The Member elements contain a `Name` attribute that specifies the string value of the member name.


~~~xml
  <EnumType Name="EnumTypeA">
    <Annotation Term="OData.Description" String="This is the EnumTypeA enumeration."/>
    <Annotation Term="OData.LongDescription" String="This is used to describe the EnumTypeA enumeration."/>
    <Member Name="MemberA">
      <Annotation Term="OData.Description" String="Description of MemberA"/>
    </Member>
    <Member Name="MemberB">
      <Annotation Term="OData.Description" String="Description of MemberB"/>
    </Member>
  </EnumType>
~~~

Enumeration Types may include [Description](#description) and [LongDescription](#long-description) annotations.

Enumeration Members shall include [Description](#description) annotations.

###### Collections

The [type](#property-types) attribute may specify a collection of [primitive](#primitive-types), [structured](#structured-types) or [enumeration](#enums) types.

The value of the type attribute for a collection-valued property is of the form:

 Collection(*NamespaceQualifiedTypeName*)

where *NamespaceQualifiedTypeName* is the namespace qualified name of the primitive, structured, or enumeration type.

##### Additional properties

The AdditionalProperties annotation term is used to specify whether a type can contain additional properties outside of those defined. Types annotated with the AdditionalProperties annotation with a value of `"False"`, shall not contain additional properties.

~~~xml
  <Annotation Term="OData.AdditionalProperties"/>
~~~

The `AdditionalProperties` annotation term is defined in https://tools.oasis-open.org/version-control/browse/wsvn/odata/trunk/spec/vocabularies/Org.OData.Core.V1.xml.

##### Non-nullable properties

Properties may include the Nullable attribute with a value of false to specify that the property cannot contain null values. A property with a nullable attribute with a value of `"true"`, or no nullable attribute, can accept null values.

~~~xml
  <Property Name="Property1" Type="Edm.String" Nullable="false">
~~~

##### Permissions of properties

The Permissions annotation term can be applied to a property with the value of `OData.Permission/Read` in order to specify that it is read-only.

~~~xml
  <Annotation Term="OData.Permissions" EnumMember="OData.Permission/Read"/>
~~~

The Permissions annotation term can be applied to a property with the value of `OData.Permission/ReadWrite` in order to specify that it is writable.

~~~xml
  <Annotation Term="OData.Permissions" EnumMember="OData.Permission/ReadWrite"/>
~~~

The `Permissions` annotation term is defined in http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Core.V1.xml.

##### Required properties

The Required annotation is used to specify that a property is required to be supported by services. Required properties shall be annotated with the Required annotation. All other properties are optional.

If an implementation supports a property, it shall always provide a value for that property.  If a value is unknown, then null is an acceptable values in most cases. Properties not returned from a GET operation shall indicate that the property is not currently supported by the implementation.

~~~xml
  <Annotation Term="Redfish.Required"/>
~~~

The `Required` annotation term is defined in http://redfish.dmtf.org/schemas/v1/RedfishExtensions_v1.xml.

##### Required properties on create

The RequiredOnCreate annotation term is used to specify that a property is required to be specified on creation of the resource. Properties not annotated with the RequiredOnCreate annotation, or annotated with a `Boolean` attribute with a value of `"false"`, are not required on create.

~~~xml
  <Annotation Term="Redfish.RequiredOnCreate"/>
~~~

The `RequiredOnCreate` annotation term is defined in http://redfish.dmtf.org/schemas/v1/RedfishExtensions_v1.xml.

##### Units of measure

In addition to following [naming conventions](#common-naming-conventions), properties representing units of measure shall be annotated with the Units annotation term in order to specify the units of measurement for the property.

The value of the annotation should be a string that contains the case-sensitive "(c/s)" symbol of the unit of measure as listed in the [Unified Code for Units of Measure (UCUM)](#UCUM), unless the symbolic representation does not reflect common usage (e.g., "RPM" is commonly used to report fan speeds in revolutions-per-minute, but has no simple UCUM representation).  For units with prefixes (e.g., Mebibyte (1024^2 bytes), which have the UCUM prefix "Mi" and symbol "By"), the case-sensitive "(c/s)" symbol for the prefix as listed in UCUM should be prepended to the unit symbol.  For values that also include rate information (e.g., megabits per second), the rate unit's symbol should be appended and use a "/" slash character as a separator (e.g., "Mbit/s").

~~~xml
  <Annotation Term="Measures.Unit" String="MiBy"/>
~~~

The `Unit` annotation term is defined in http://docs.oasis-open.org/odata/odata/v4.0/os/vocabularies/Org.OData.Measures.V1.xml.

#### Reference properties

Properties that reference other resources are represented as reference properties using the `NavigationProperty` element. The `NavigationProperty` element specifies the `Name` and namespace qualified [`Type`](#property-types) of the related resource(s).

If the property references a single type, the value of the type attribute is the namespace qualified name of the related resource type.

~~~xml
  <NavigationProperty Name="RelatedType" Type="MyTypes.TypeB">
    <Annotation Term="OData.Description" String="This property references a related resource."/>
    <Annotation Term="OData.LongDescription" String="This is the specification of the related property."/>
    <Annotation Term="OData.AutoExpandReferences"/>
  </NavigationProperty>
~~~

If the property references a collection of resources, the value of the type attribute is of the form:

~~~
  Collection(NamespaceQualifiedTypeName)
~~~

where `NamespaceQualifiedTypeName` is the namespace qualified name of the type of related resources.

~~~xml
  <NavigationProperty Name="RelatedTypes" Type="Collection(MyTypes.TypeB)">
    <Annotation Term="OData.Description" String="This property represents a collection of related resources."/>
    <Annotation Term="OData.LongDescription" String="This is the specification of the related property."/>
    <Annotation Term="OData.AutoExpandReferences"/>
  </NavigationProperty>
~~~

All reference properties shall include [Description](#description) and [LongDescription](#long-description) annotations.

##### Contained resources

Reference properties whose members are contained by the referencing resource are specified with the `ContainsTarget` attribute with a value of `true`.

For example, to specify that a Chassis resource contains a Power resource, you would specify `ContainsTarget=true` on the resource property representing the Power Resource within the Chassis type definition.

~~~xml
  <NavigationProperty Name="Power" Type="Power.Power" ContainsTarget="true">
    <Annotation Term="OData.Description" String="A reference to the power properties (power supplies, power policies, sensors) for this chassis."/>
    <Annotation Term="OData.LongDescription" String="The value of this property shall be a reference to the resource that represents the power characteristics of this chassis and shall be of type Power."/>
    <Annotation Term="OData.AutoExpandReferences"/>
  </NavigationProperty>
~~~

##### Expanded references

Reference properties in a Redfish JSON payload are expanded to include the [related resource id](#reference-to-a-single-related-resource) or [collection of related resource ids](#array-of-references-to-related-resources). This behavior is expressed using the AutoExpandReferences annotation.

~~~xml
  <Annotation Term="OData.AutoExpandReferences"/>
~~~

The `AutoExpandReferences` annotation term is defined in https://tools.oasis-open.org/version-control/browse/wsvn/odata/trunk/spec/vocabularies/Org.OData.Core.V1.xml.

##### Expanded resources

This term can be applied to a [reference property](#reference-properties) in order to specify that the default behavior for the service is to expand the related [resource](#structured-properties) or Resource Collection in responses.  Reference properties annotated with this term shall be expanded by the service, even if not requested by the client.

~~~xml
  <Annotation Term="OData.AutoExpand"/>
~~~

The `AutoExpand` annotation term is defined in https://tools.oasis-open.org/version-control/browse/wsvn/odata/trunk/spec/vocabularies/Org.OData.Core.V1.xml.

#### Resource actions

Actions are grouped under a property named "Actions".

~~~xml
  <Property Name="Actions" Type="MyType.Actions">
~~~

The type of the Actions property is a [structured type](#structured-types) with a single OEM property whose type is a structured type with no defined properties.

~~~xml
  <ComplexType Name="Actions">
    <Property Name="Oem" Type="MyType.OemActions"/>
  </ComplexType>

  <ComplexType Name="OemActions"/>
~~~

Individual actions are defined within a [namespace](#namespace-definitions) using `Action` elements. The `Name` attribute of the action specifies the name of the action. The `IsBound` attribute specifies that the action is bound to (appears as a member of) a resource or structured type.

The Action element contains one or more `Parameter` elements that specify the `Name` and [`Type`](#property-types) of each parameter.

The first parameter is called the "binding parameter" and specifies the resource or [structured type](#structured-types) that the action appears as a member of (the type of the Actions property on the resource).  The remaining Parameter elements describe additional parameters to be passed to the action.  Parameters containing the term `Nullable="false"` are required to be provided in the Action request.

~~~xml
  <Action Name="MyAction" IsBound="true">
    <Parameter Name="Thing" Type="MyType.Actions"/>
    <Parameter Name="Parameter1" Type="Edm.Boolean"/>
    <Parameter Name="Parameter2" Type="Edm.String" Nullable="false"/>
  </Action>
~~~

In the above example, three parameters are defined:
* Thing: This is the binding parameter that is not provided in the request by the client
* Parameter1: A boolean parameter used in the client payload for the request
* Parameter2: A string parameter used in the client payload for the request and is also required to be provided by the client


#### Resource extensibility

Companies, OEMs, and other organizations can define additional [properties](#resource-extensibility), hyperlinks, and [actions](#oem-actions) for common Redfish resources using the Oem property on resources, the [Links Property](#links-property), and actions.

While the information and semantics of these extensions are outside of the standard, the schema representing the data, the resource itself, and the semantics around the protocol shall conform to the requirements in this specification.

##### Oem property

In the context of this clause, the term OEM refers to any company, manufacturer, or organization that is providing or defining an extension to the DMTF-published schema and functionality for Redfish. The base schema for Redfish-specified resources include an empty complex type property called "Oem" whose value can be used to encapsulate one or more OEM-specified complex properties. The Oem property in the standard Redfish schema is thus a predefined placeholder that is available for OEM-specific property definitions.

Correct use of the Oem property requires defining the metadata for an OEM-specified complex type that can be referenced within the Oem property. The following fragment is an example of an XML schema that defines a pair of OEM-specific properties under the complex type "AnvilType1". (Other schema elements that would typically be present, such as XML and OData schema description identifiers, are not shown in order to simplify the example).

~~~xml
  <Schema Namespace="Contoso.v1_2_0">
    ...
    <ComplexType Name="AnvilType1">
      <Property Name="slogan" Type="Edm.String"/>
      <Property Name="disclaimer" Type="Edm.String"/>
    </ComplexType>
    ...
  </Schema>
~~~

The next fragment shows an example of how the previous schema and the "AnvilType1" property type might appear in the instantiation of an Oem property as the result of a GET on a resource. The example shows two required elements in the use of the Oem property: A name for the object and a type property for the object. Detailed requirements for these elements are provided in the following clauses.

~~~json
{
    "Oem": {
        "Contoso": {
            "@odata.type": "#Contoso.v1_2_0.AnvilType1",
            "slogan": "Contoso anvils never fail",
            "disclaimer": "* Most of the time"
        }
    },
    ...
}
~~~

##### Oem property format and content

Each property contained within the [Oem property](#oem-property) shall be a JSON object.  The name of the object (property) shall uniquely identify the OEM or organization that defines the properties contained by that object.  This is described in more detail in the following clause.  The OEM-specified object shall also include a [type property](#type-property) that provides the location of the schema and the type definition for the property within that schema.  The Oem property can simultaneously hold multiple OEM-specified objects, including objects for more than one company or organization.

The definition of any other properties that are contained within the OEM-specific complex type, along with the functional specifications, validation, or other requirements for that content is OEM-specific and outside the scope of this specification. While there are no Redfish-specified limits on the size or complexity of the OEM-specified elements within an OEM-specified JSON object, it is intended that OEM properties will typically only be used for a small number of simple properties that augment the Redfish resource. If a large number of objects or a large quantity of data (compared to the size of the Redfish resource) is to be supported, the OEM should consider having the OEM-specified object point to a separate resource for their extensions.

##### Oem property naming

The OEM-specified objects within the Oem property are named using a unique OEM identifier for the top of the namespace under which the property is defined. There are two specified forms for the identifier. The identifier shall be either an ICANN-recognized domain name (including the top-level domain suffix), with all dot '.' separators replaced with underscores '_', or an IANA-assigned Enterprise Number prefaced with "EID_".
DEPRECATED: The identifier shall be either an ICANN-recognized domain name (including the top-level domain suffix), or an IANA-assigned Enterprise Number prefaced with "EID:".

Organizations using '.com' domain names may omit the '.com' suffix (e.g., Contoso.com may use 'Contoso', but Contoso.org must use 'Contoso_org' as their OEM property name). The domain name portion of an OEM identifier shall be considered to be case independent. That is, the text "Contoso_biz", "contoso_BIZ", "conTOso_biZ", and so on, all identify the same OEM and top-level namespace.

The OEM identifier portion of the property name may be followed by an underscore and any additional string to allow further creation of namespaces of OEM-specified objects as desired by the OEM, e.g., "Contoso_xxxx" or "EID_412_xxxx". The form and meaning of any text that follows the trailing underscore is completely OEM-specific. OEM-specified extension suffixes may be case sensitive, depending on the OEM. Generic client software should treat such extensions, if present, as opaque and not attempt to parse nor interpret the content.

There are many ways this suffix could be used, depending on OEM need. For example, the Contoso company may have a suborganization "Research", in which case the OEM-specified property name might be extended to be "Contoso_Research". Alternatively, it could be used to identify a namespace for a functional area, geography, subsidiary, and so on.

The OEM identifier portion of the name will typically identify the company or organization that created and maintains the schema for the property. However, this is not a requirement. The identifier is only required to uniquely identify the party that is the top-level manager of a namespace to prevent collisions between OEM property definitions from different vendors or organizations. Consequently, the organization for the top of the namespace may be different than the organization that provides the definition of the OEM-specified property. For example, Contoso may allow one of their customers, e.g., "CustomerA", to extend a Contoso product with certain CustomerA proprietary properties. In this case, although Contoso allocated the name "Contoso_customers_CustomerA" it could be CustomerA that defines the content and functionality under that namespace. In all cases, OEM identifiers should not be used except with permission or as specified by the identified company or organization.


##### URIs for OEM resources

Companies, OEMs, and other organizations can define additional resources and link to them using a `NavigationProperty` from an [Oem property](#oem-property) found in a standard Redfish Resource.  In order to avoid URI collisions with other OEM resources and future Redfish standard resources, the URIs for OEM resources shall be in the form of:

` *BaseUri*/Oem/*OemName*/*ResourceName*`

where
* *BaseUri* is the URI segment of the standard Redfish Resource where the "Oem" property is used.
* *OemName* is the name of the OEM, that follows the same naming as defined in the [Oem property format and content section](#oem-property-format-and-content).
* *ResourceName* is the name of the resource defined by the OEM.

For example, if Contoso defined a new resource called "AccountServiceMetrics" to be linked via the "Oem" property found at the URI "/redfish/v1/AccountService", the OEM resource would have the URI "/redfish/v1/AccountService/Oem/Contoso/AccountServiceMetrics".


#### Oem property examples

The following fragment presents some examples of naming and use of the Oem property as it might appear when accessing a resource. The example shows that the OEM identifiers can be of different forms, that OEM-specified content can be simple or complex, and that the format and usage of extensions of the OEM identifier is OEM-specific.

~~~json
{
    "Oem": {
        "Contoso": {
            "@odata.type": "#Contoso.v1_2_1.AnvilTypes1",
            "slogan": "Contoso anvils never fail",
            "disclaimer": "* Most of the time"
        },
        "Contoso_biz": {
            "@odata.type": "#ContosoBiz.v1_1.RelatedSpeed",
            "speed" : "ludicrous"
        },
        "EID_412_ASB_123": {
            "@odata.type": "#OtherSchema.v1_0_1.powerInfoExt",
            "readingInfo": {
                "readingAccuracy": "5",
                "readingInterval": "20"
            }
        },
        "Contoso_customers_customerA": {
            "@odata.type" : "#ContosoCustomer.v2015.slingPower",
            "AvailableTargets" : [ "rabbit", "duck", "runner" ],
            "launchPowerOptions" : [ "low", "medium", "eliminate" ],
            "powerSetting" : "eliminate",
            "targetSetting" : "rabbit"
        }
    },
    ...
}
~~~

##### OEM actions

OEM-specific actions can be defined by defining actions bound to the Oem property of the [resource's Actions](#resource-actions) property type.

~~~xml
  <Action Name="Ping" IsBound="true">
    <Parameter Name="ContosoType" Type="MyType.OemActions"/>
  </Action>
~~~

Such bound actions appear in the JSON payload as properties of the Oem type, nested under an [Actions property](#actions-property).

~~~json
{
    "Actions": {
        "Oem": {
            "#Contoso.Ping": {
                "target":"/redfish/v1/Systems/1/Actions/Oem/Contoso.Ping"
            }
        }
    },
    ...
}
~~~

The URI of the OEM action in the "target" property shall be in the form of:

` *ResourceUri*/Actions/Oem/*QualifiedActionName*`

where
* *ResourceUri* is the URI of the resource that supports invoking the action.
* "Actions" is the name of the property containing the actions for a resource.
* "Oem" is the name of the OEM property within the Actions property.
* *QualifiedActionName* is the qualified name of the action, including namespace.

### Common Redfish resource properties

This clause contains a set of common properties across all Redfish resources. The property names in this clause shall not be used for any other purpose, even if they are not implemented in a particular resource.

Common properties are defined in the base "Resource" Redfish Schema.  For OData Schema representations, this is in Resource_v1.xml.  For JSON Schema representations, this is in Resource.v1_0_0.json.  For OpenAPI representations, this is in Resource.v1_0_0.yaml.

#### Id<a id="id-property"></a>

The Id property of a resource uniquely identifies the resource within the Resource Collection that contains it.  The value of Id shall be unique across a Resource Collection.

#### Name<a id="name-property"></a>

The Name property is used to convey a human-readable moniker for a resource.  The type of the Name property shall be string.  The value of Name is NOT required to be unique across resource instances within a Resource Collection.

#### Description<a id="description-property"></a>

The Description property is used to convey a human-readable description of the resource.  The type of the Description property shall be string.

#### MemberId<a id="memberid-property"></a>

The MemberId property of an object within a resource uniquely identifies the object within an array that contains it.  The value of MemberId shall be unique across the array within the resource.

#### Status

The Status property represents the status of a resource.

The value of the status property is a common status object type as defined by this specification. By having a common representation of status, clients can depend on consistent semantics. The Status object is capable of indicating the current intended state, the state the resource has been requested to change to, the current actual state and any problem affecting the current state of the resource.

#### Links

The [Links Property](#links-property) represents the hyperlinks associated with the resource, as defined by that resources schema definition. All associated reference properties defined for a resource shall be nested under the Links Property.  All directly (subordinate) referenced properties defined for a resource shall be in the root of the resource.

#### Members

The [Members](#members-property) property of a Resource Collection identifies the members of the collection.

#### RelatedItem
The [RelatedItem](#relateditem) property represents hyperlinks to a resource (or part of a resource) as defined by that resources schema definition. This is not intended to be a strong linking methodology like other references.  Instead it is used to show a relationship between elements or subelements in disparate parts of the service.  For example, since Fans may be in one area of the implementation and processors in another, RelatedItem can be used to inform the client that one is related to the other (in this case, the Fan is cooling the processor).

#### Actions

The [Actions](#actions-property) property contains the actions supported by a resource.

#### OEM

The [Oem](#oem-property) property is used for OEM extensions as defined in [Schema Extensibility](#resource-extensibility).

### Redfish resources

Collectively known as the Redfish Schema, the set of resource descriptions contains normative requirements on implementations conforming to this specification.

Redfish Resources are one of several general kinds:

* Root Service Resource
  * Contains the mapping of a particular service instance to applicable resources.
  * Contains the UUID of a service instance.  This UUID would be the same UUID returned via SSDP discovery.
* Current Configuration Resources, contain a mixture of:
  * Inventory (static and read-only)
  * Health Telemetry (dynamic and read-only)
  * Current Configuration Settings (dynamic and read/write)
  * Current Metric values
* Setting Resources
  * Dynamic, Read/Write Pending Configuration Settings
* Services
  * Common services like Eventing, Tasks, Sessions
* Registry Resources
  * Static, Read-Only JSON encoded information for Event and Message Registries

#### Current configuration

Current Configuration resources represent the service's knowledge of the current state and configuration of the resource.  This may be directly updatable with a PATCH or it may be read-only by the client and the client must PATCH and/or PUT to a separate [Settings resource](#settings).  For resources that can be modified immediately, the Allow header shall contain PATCH and/or PUT in the GET response.  When a resource is read-only, the Allow header shall not contain PATCH or PUT in the GET response.

#### Settings

A Settings resource represents the future state and configuration of the resource.  For resources that support a future state and configuration, the response shall contain a property with the "@Redfish.Settings" annotation.  While the resource represents the current state, the Settings resource represents the future intended state.

The Settings resource includes several properties to help clients monitor when the resource is consumed by the service and determine the results of applying the values, which may or may not have been successful. The Messages property is a collection of Messages that represent the results of the last time the values of the Settings resource were applied. The ETag property contains the ETag of the Settings resource that was last applied. The Time property indicate the time when the Settings resource was last applied.

Below is an example body for a resource that supports a Settings resource. A client is able to locate the URI of the Settings resource using the "SettingsObject" property.

~~~json
{
    "@Redfish.Settings": {
        "@odata.type": "#Settings.v1_0_0.Settings",
        "SettingsObject": {
            "@odata.id": "/redfish/v1/Systems/1/Bios/SD"
        },
        "Time": "2017-05-03T23:12:37-05:00",
        "ETag": "A89B031B62",
        "Messages": [
           {
              "MessageId": "Base.1.0.PropertyNotWritable",
              "RelatedProperties": [
                 "#/Attributes/ProcTurboMode"
              ]
           }
        ]
    },
    ...
}
~~~

The values in the Settings resource are applied to the resource either directly, such as with a POST of an action (such as Reset) or a PUT/PATCH request, or indirectly, such as when a user reboots a machine outside of the Redfish Service.  A client may indicate its preference on when to apply the future configuration by including the "@Redfish.SettingsApplyTime" annotation in the request body when configuring the Settings resource.  If a service supports configuring when to apply the future settings, the response body that represents the Settings resource shall contain a property with the "@Redfish.SettingsApplyTime" annotation.  See properties defined in the "Settings" Redfish Schema for details.

Below is an example request body that shows a client configuring when the values in the Settings resource are to be applied:

~~~json
{
    "@Redfish.SettingsApplyTime": {
        "@odata.type": "#Settings.v1_1_0.PreferredApplyTime",
        "ApplyTime": "OnReset",
        "MaintenanceWindowStartTime": "2017-05-03T23:12:37-05:00",
        "MaintenanceWindowDurationInSeconds": 600
    },
    ...
}
~~~


#### Services

Service resources represent components of the Redfish Service itself as well as dependent resources.  While the complete list is discoverable only by traversing the Redfish Service tree, the list includes services like the Eventing service, Task management and Session management.

#### Registry

Registry resources are those resources that assist the client in interpreting Redfish resources beyond the Redfish Schema definitions.  Examples of registries include Message Registries, Event Registries and enumeration registries, such as those used for BIOS.  In registries, a identifier is used to retrieve more information about a given resource, event, message or other item.  This can include other properties, property restrictions and the like.  Registries are themselves resources.

### Special resource situations

There are some situations that arise with certain kinds of resources that need to exhibit common semantic behavior.

#### Absent resources

Resources may be either absent or their state unknown at the time a client requests information about that resource.  For resources that represent removable or optional components, absence provides useful information to clients, as it indicates a capability (e.g., an empty PCIe elot, DIMM socket, or drive bay) that would not be apparent if the resource simply did not exist.  This also applies to resources that represent a limited number of items or unconfigured capabilities within an implementation, but this usage should be applied sparingly and should not apply to resources limited in quantity due to arbitrary limits (e.g., an implementation that limits "SoftwareInventory" to a maximum of 20 items should not populate 18 absent resources when only two items are present).

For resources that provide useful data in an absent state, and where the URI is expected to remain constant (such as when a DIMM is removed from a memory socket), the resource should exist, and should represent the State property of the Status object as "Absent".  In this circumstance, any required properties for which there is no known value shall be represented as null. Properties whose support is based on the configuration choice or the type of component installed (and therefore unknown while in the Absent state), should not be returned. Likewise, subordinate resources for a absent resource should not be populated until their support can be determined (e.g., the "Power" and "Thermal" resources under a "Chassis" resource should not exist for an absent Chassis).

Client software should be aware that when absent resources are later populated, the updated resource may represent a different configuration or physical item, and previous data (including read-only properties) obtained from that resource may be invalid.  For example, the "Memory" resource shows details about an single DIMM socket and the installed DIMM. When that DIMM is removed, the Memory resource remains to indicate the empty DIMM socket (with an "Absent" State).  Later, an upgraded DIMM is installed, and the Memory resource then contains data about this new DIMM, which could have completely different characteristics.

#### Schema variations

There are cases when deviations from the published Redfish Schema are necessary.  An example is BIOS where different servers may have minor variations in available configuration settings.  A Redfish Service may reference a single schema that is a superset of the individual implementations.  In order to support these variations, Redfish supports omitting parameters defined in the class schema in the current configuration object.  The following rules apply:

* All Redfish Services must support attempts to set unsupported configuration elements in the Setting Data by marking them as exceptions in the Setting Data Apply status structure, but not failing the entire configuration operation.
* The support of a specific property in a resource is signaled by the presence of that property in the Current Configuration object.  If the element is missing from Current Configuration, the client may assume the element is not supported on that resource.
* For ENUM configuration items that may have variation in allowable values, a special read-only capabilities element will be added to Current Configuration that specifies limits to the element.  This is an override for the schema only to be used when necessary.

A Redfish Service may split the schema resources into separate files such as Schema + String Registry, each with a separate URI and different Content-Encoding.

* Resources may communicate omissions from the published schema via the Current Configuration object if applicable.

## Service details

### Eventing

This clause covers the REST-based mechanism for subscribing to and receiving event messages.

NOTE: Refer to the [Security](#security-details) clause for security implications of Eventing.

#### Event subscription types

The Redfish Service requires a client or administrator to create subscriptions to receive events.  There are two methods of creating a subscription: directly by sending an HTTP POST to the subscription collection, or indirectly when a [Server-Sent Events (SSE)](#sse-eventservice) connection is opened for the Event Service.

##### POST to the subscription collection method

The client locates the Event Service by traversing the Redfish Service interface.  The Event Service is found off of the Service Root as described in the Redfish Schema for that service.

When the service has been discovered, clients subscribe to messages by sending a HTTP POST to the URI of the Resource Collection for "Subscriptions" in the Event Service.  This request includes the URI where an event-receiver client expects events to be sent, as well as the type of events to be sent.  The Redfish Service will then, when an event is triggered within the service, send an event to that URI.  The specific syntax of the subscription body is found in the Redfish Schema definition for "EventDestination".

On success, the Event Service shall return an HTTP status 201 (CREATED) and the Location header in the response shall contain a URI giving the location of the newly created subscription resource.  The body of the response, if any, shall contain a representation of the subscription resource conforming to the "EventDestination" schema.  Sending an HTTP GET to the subscription resource shall return the configuration of the subscription.  Clients begin receiving events once a subscription has been registered with the service and do not receive events retroactively.  Historical events are not retained by the service.

* Services shall support "push" style eventing for all resources capable of sending events.
* Services shall not "push" events (using HTTP POST) unless an event subscription has been created. Either the client or the service can terminate the event stream at any time by deleting the subscription.  The service may delete a subscription if the number of delivery errors exceeds preconfigured thresholds.
* Services shall respond to a request to create a subscription with an error if the body of the request is conflicting.  For instance, if parameters in the request are not supported, an HTTP status 400 shall be returned.  
* Services shall respond to a request to create a subscription with an error if the body of the request contains both RegistryPrefixes and MessageIds, and shall return an HTTP status code of 400.  These properties are considered mutually exclusive.
* Services shall respond to a successful subscription with HTTP status 201 and set the HTTP Location header to the address of a new subscription resource.  Subscriptions are persistent and will remain across event service restarts.
* Clients shall terminate a subscription by sending an HTTP DELETE message to the URI of the subscription resource.
* Services may terminate a subscription by sending a special "subscription terminated" event as the last message. Future requests to the associated subscription resource will respond with HTTP status code [404](#status-404).

To unsubscribe from the messages associated with this subscription, the client or administrator simply sends an HTTP DELETE request to the subscription resource URI.

These are some configurable properties that are global settings that define the behavior for all event subscriptions.  See the properties defined in the "EventService" Redfish Schema for details of the parameters available to configure the service's behavior.

##### SSE method

A service may support the "ServerSentEventUri" property within the Event Service resource.  If a client performs a GET on the URI specified by the "ServerSentEventUri", an SSE connection will be opened for the client.  See the [Server-Sent Events: EventService section](#sse-eventservice) for details on this method.

#### EventType based eventing

There are three types of events generated in a Redfish Service - life cycle, alert, and metric report.  This method of eventing has been deprecated in the Redfish Schema.

Life cycle events happen when resources are created, modified or destroyed.  Not every modification of a resource will result in an event - this is similar to when ETags are changed and implementations may not send an event for every resource change. For instance, if an event was sent for every Ethernet packet received or every time a sensor changed 1 degree, this could result in more events than fits a scalable interface. This event usually indicates the resource that changed as well as, optionally, any properties that changed.

Alert events happen when a resource needs to indicate an event of some significance.  This may be either directly or indirectly pertaining to the resource.  This style of event usually adopts a message registry approach similar to extended error handling in that a MessageId will be included.  Examples of this kind of event are when a chassis is opened, button is pushed, cable is unplugged or threshold exceeded.  These events usually do not correspond well to life cycle type events hence they have their own category.

Metric report events happen when the TelemetryService has generated a new Metric Report or updated an existing Metric Report.  These types of events shall be generated as specified by the MetricReportDefinition resources found subordinate to the TelemetryService.  This can be defined to be done on a periodic basis, on demand, or when changes in the metric properties are detected.  See the Redfish MetricReportDefinition Schema for full details.

#### Ways to register for events

Event subscriptions can be subscribed to by specifying a RegistryPrefixes, ResourceTypes, OriginResources (including SubordinateResources) property in order to filter events to any EventDestination.  An EventFormatType can also be specified.

The RegistryPrefixes property has the list of message registries that the service provides and that the subscriber would like messages corresponding to.  The values of this property are the values of the RegistryPrefix and can be standard or OEM message registries.  It acts like a filter, only sending messages to the subscriber if the RegistryPrefix in the subscription matches the RegistryPrefix of the registry.  This value does not include the version of the registry. If this value is empty when subscribing, the subscriber can receive messages from any registry.

The ResourceTypes property has the list of Resource Types  that the service provides events on which the subscriber can use in the ResourceType property of the EventDestination.  The values of this property is an array of Resource Types and can be standard or OEM schema Resource Types.  It acts like a filter, only sending messages to the subscriber if the ResourceType in the subscription matches the Resource Type of the OriginOfCondition.  This value does not include the version of the schema (thus there are no periods).  For example, if the normal Resource Type is "Task.v1_2_0.Task", then the value in this property is just "Task". If this value is empty when subscribing, the subscriber can receive messages from any resource.

OriginResources can be specified to limit the events sent to the destination to the resource list (in URI format) specified.  Leaving this property empty indicates that events from any resources are acceptable.  The property SubordinateResources can be specified to indicate those resources as well as subordinate ones, regardless of depth.

EventFormatType can be specified in the subscription as well.  The service advertises the list of formats that can be sent using the EventFormatTypes property in the EventService.  This value represents the format of the payload sent to the Event Destination.  If the value is not specified, then the payload will correspond to the Event Schema.

#### Event formats

There are two formats of events:
* [Metric report message objects](#metric-report-message-objects): This format shall be when the TelemetryService has generated a new Metric Report or updated an existing Metric Report.
* [Event message objects](#event-message-objects): This format shall be used for all other types of events.

##### Event message objects

Event message objects POSTed to the specified client endpoint shall contain the properties as described in the Redfish Event Schema.

This event message structure supports a message registry.  In a message registry approach there is a message registry that has a list or array of MessageIds in a well-known format.  These MessageIds are terse in nature and thus they are much smaller than actual messages, making them suitable for embedded environments.  In the registry, there is also a message.  The message itself can have arguments as well as default values for Severity and RecommendedActions.

The MessageId property contents shall be of the form:

 *RegistryName*.*MajorVersion*.*MinorVersion*.*MessageKey*

where

* *RegistryName* is the name of the registry. The registry name shall be Pascal-cased.
* *MajorVersion* is a positive integer representing the major version of the registry.
* *MinorVersion* is a positive integer representing the minor version of the registry.
* *MessageKey* is a human-readable key into the registry. The message key shall be Pascal-cased and shall not include spaces, periods or special characters.

Event messages may also have an EventGroupId property.  The purpose of this property is to let clients know that different messages may be from the same event.  For instance, if a LAN cable is disconnected, they may get a specific message from one registry about the LAN cable being disconnected, another message from a general registry about the resource changing, perhaps a message about resource state change and maybe even more.  In order for the client to be able to tell all of these have the same root cause, these messages would have the same value for the EventGroupId property.

##### Metric report message objects

Metric report message objects sent to the specified client endpoint shall contain the properties as described in the Redfish MetricReport Schema.

#### OEM Extensions

OEMs can extend both messages and message registries.  There are OEM sections defined in any individual message (per the message registry schema definition).  Thus if OEMs wish to provide additional information or properties, this can be done using the OEM section.  OEMs shall not supply additional message arguments beyond those in a standard message registry.  OEMs may substitute their own message registry for the standard registry in order to provide the OEM section within the registry but shall not change the standard values (such as Messages) in such registries.

### Asynchronous operations

Services that support asynchronous operations will implement the Task service and Task resource.

The Task service is used to describe the service that handles tasks.  It contains a Resource Collection of zero or more "Task" resources. The Task resource is used to describe a long-running operation that is spawned when a request will take longer than a few seconds, such as when a service is instantiated. Clients will poll the URI of the Task resource to determine when the operation has been completed and if it was successful.

The Task structure in the Redfish Schema contains the exact structure of a Task.  The type of information it contains are start time, end time, task state, task status, and zero or more messages associated with the task.

Each task has a number of possible states.  The exact states and their semantics are defined in the Task resource of the Redfish Schema.

When a client issues a request for a long-running operation, the service returns a status of [202](#status-202) (Accepted).

Any response with a status code of [202](#status-202) (Accepted) shall include a location header containing the URL of the Task Monitor and may include the Retry-After header to specify the amount of time the client should wait before querying status of the operation.

The Task Monitor is an opaque URL generated by the service intended to be used by the client that initiated the request. The client queries the status of the operation by performing a GET request on the Task Monitor.

The client should not include the mime type application/http in the Accept Header when performing a GET request to the Task Monitor.

The response body of a [202](#status-202) (Accepted) should contain an instance of the Task resource describing the state of the task.

As long as the operation is in process, the service shall continue to return a status code of [202](#status-202) (Accepted) when querying the Task Monitor returned in the location header.  If a service supports canceling a task, it shall have DELETE in the Allow header for the Task Monitor.

The client may cancel the operation by performing a DELETE on the Task Monitor URL. The service determines when to delete the associated Task resource object.

The client may also cancel the operation by performing a DELETE on the Task resource. Deleting the Task resource object may invalidate the associated Task Monitor and subsequent GET on the Task Monitor URL returns either [410](#status-410) (Gone) or [404](#status-404) (Not Found).

In the unlikely event that a [202](#status-202) (Accepted) is returned on the DELETE of the Task Monitor or Task resource, an additional Task shall not be started and instead the existing Task resource may be monitored for status of the cancellation request.  When the Task has finally completed cancellation, operations to the Task Monitor and Task resource shall return a [404](#status-404) (Not Found).

After the operation has been completed, the service shall update the TaskState with the appropriate value.  The values indicating that a task has been completed are defined in the Task schema.

After the operation has been completed, the Task Monitor shall return the appropriate status code (such as, but not limited to, OK [200](#status-200) for most operations, Created [201](#status-201) for POST to create a resource) and include the headers and response body of the initial operation, as if it had been completed synchronously.  If the initial operation resulted in an error, the body of the response shall contain an [Error Response](#error-responses).

The service may return a status code of [410](#status-410) (Gone) or [404](#status-404) (Not Found) if the operation has been completed and the service has already deleted the task. This can occur if the client waits too long to read the Task Monitor.

The client can continue to get information about the status by directly querying the Task resource using the [resource identifier](#resource-identifier-property) returned in the body of the [202](#status-202) (Accepted) response.

* Services that support asynchronous operations shall implement the Task resource
* The response to an asynchronous operation shall return a status code of [202](#status-202) (Accepted)
  and set the HTTP response header "Location" to the URI of a Task Monitor
  associated with the activity. The response may also include the Retry-After header specifying
  the amount of time the client should wait before polling for status. The response body
  should contain a representation of the Task resource in JSON.
* GET requests to either the Task Monitor or the Task resource shall return the current status of the operation without blocking.
* Operations using HTTP GET, PUT, PATCH should always be synchronous.
* Clients shall be prepared to handle both synchronous and asynchronous responses for requests using HTTP GET, PUT, PATCH, POST, and DELETE methods.

### Resource Tree stability

The Resource Tree, which is defined as the set of URIs and array elements within the implementation, must be consistent on a single service across device reboot and A/C power cycle, and must withstand a reasonable amount of configuration change (e.g., adding an adapter to a server). The Resource Tree on one service may not be consistent across instances of devices.  The client must walk the data model and discover resources to interact with them.
It is possible that some resources will remain very stable from system to system (e.g., BMC network settings) -- but it is not an architectural guarantee.

* A Resource Tree should remain stable across Service restarts and minor device configuration changes, thus the set of URIs and array element indexes should remain constant.
* A Resource Tree shall not be expected by the client to be consistent between instances of services.

### Discovery

Automatic discovery of managed devices supporting the Redfish Scalable Platform Management API may be accomplished using the Simple Service Discovery Protocol (SSDP).  This protocol allows for network-efficient discovery without resorting to ping-sweeps, router table searches, or restrictive DNS naming schemes.  Use of SSDP is optional, and if implemented, shall allow the user to disable the protocol through the 'Manager Network Service' resource.

As the objective of discovery is for client software to locate Redfish-compliant managed devices, the primary SSDP functionality incorporated is the M-SEARCH query.  Redfish also follows the SSDP extensions and naming used by UPnP where applicable, such that Redfish-compliant systems can also implement UPnP without conflict.

#### UPnP compatibility

For compatibility with general purpose SSDP client software, primarily UPnP, UDP port 1900 should be used for all SSDP traffic.  In addition, the Time-to-Live (TTL) hop count setting for SSDP multicast messages should default to 2.

#### USN format

The UUID supplied in the USN field of the service shall equal the UUID property of the service root. If there are multiple/redundant managers, the UUID of the service shall remain static regardless of redundancy failover.  The Unique ID shall be in the canonical UUID format, followed by '::dmtf-org'

#### M-SEARCH response

The Redfish Service Search Target (ST) is defined as: urn:dmtf-org:service:redfish-rest:1

The managed device shall respond to M-SEARCH queries searching for Search Target (ST) of the Redfish Service as well as "ssdp:all".  For UPnP compatibility, the managed device should respond to M-SEARCH queries searching for Search Target (ST) of "upnp:rootdevice".

The URN provided in the ST header in the reply shall use a service name of "redfish-rest:" followed by the major version of the Redfish specification.  If the minor version of the Redfish Specification to which the service conforms is a non-zero value, and that version is backward-compatible with previous minor revisions, then that minor version shall be appended and preceded with a colon.  For example, a service conforming to a Redfish specification version "1.4" would reply with a service of "redfish-rest:1:4".

The managed device shall provide clients with the AL header pointing to the Redfish Service Root URL.

For UPnP compatibility, the managed device should provide clients with the LOCATION header pointing to the UPnP XML descriptor.

An example response to an M-SEARCH multicast or unicast query shall follow the format shown below.  A service may provide additional headers for UPnP compatibility.  Fields in brackets are placeholders for device-specific values.

~~~http
HTTP/1.1 200 OK
CACHE-CONTROL:max-age=<seconds, at least 1800>
ST:urn:dmtf-org:service:redfish-rest:1
USN:uuid:<UUID of Manager>::urn:dmtf-org:service:redfish-rest:1
AL:<URL of Redfish service root>
EXT:
~~~

#### Notify, alive, and shutdown messages

Redfish devices may implement the additional SSDP messages defined by UPnP to announce their availability to software.  This capability, if implemented, must allow the end user to disable the traffic separately from the M-SEARCH response functionality.  This allows users to utilize the discovery functionality with minimal amounts of network traffic generated.


### Server-Sent Events

Server-Sent Events (SSE), as defined by the Web Hypertext Application Technology Working Group, allows for a client to open a connection with a web service, and the web service can continuously push data to the client as needed.  Resource responses for SSE shall have a Content-Type header set as "text/event-stream;charset=UTF-8".  A service may occasionally send a comment within a stream to keep the connection alive.  The following clauses describe how this is used by Redfish in different contexts of the Redfish data model.  Details about SSE can be found in the [HTML5 Specification](#HTML5-Spec-SSE).


#### EventService<a id="sse-eventservice"></a>

A service's implementation of the "EventService" resource may contain a property called "ServerSentEventUri".  If a client performs a GET on the URI specified by the "ServerSentEventUri", the service shall keep the connection open and conform to the [HTML5 Specification](#HTML5-Spec-SSE) until the client closes the socket.  Events generated by the service shall be sent to the client using the open connection.

When a client opens an SSE stream for the EventService, the service shall create an EventDestination instance in the Subscriptions collection for the EventService to represent the connection.  The "Context" property in the EventDestination resource shall be an opaque string generated by the service.  The service shall delete the corresponding EventDestination instance when the connection is closed.  The service shall close the connection if the corresponding EventDestination is deleted.

There are two formats of SSE streams:
* [Metric report SSE stream](#metric-report-sse-stream): This format shall be used when the TelemetryService has generated a new Metric Report or updated an existing Metric Report.
* [Event message SSE stream](#event-message-sse-stream): This format shall be used for all other types of events.

The service should support using the $filter query parameter provided in the URI for the SSE stream by the client in order to reduce the amount of data returned to the client.  The following table shows the properties that the service should allow to be filtered.  The $filter syntax shall follow the format specified in the [Query parameters for Filter clause](#query-parameters).

| Property                         | Description                                                                                                                                                       | Example |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| EventType                        | The service shall only send Events of the matching EventType.  See the EventType enum defined by the Redfish Event Schema for the values allowed.                 | `http://sseuri?$filter=EventType eq StatusChange` |
| MetricReportDefinition           | The service shall only send MetricReports generated from the specified MetricReportDefinition.                                                                    | `http://sseuri?$filter=MetricReportDefinition eq '/redfish/v1/TelemetryService/MetricReportDefinitions/PowerMetrics'` |
| RegistryPrefix                   | The service shall only send Events with Messages that are part of the specified Registry Prefix.                                                                  | `http://sseuri?$filter=(RegistryPrefix eq Resource) or (RegistryPrefix eq Task)` |
| ResourceType                     | The service shall only send Events for resources matching the type.                                                                                               | `http://sseuri?$filter=(ResourceType eq 'Power') or (ResourceType eq 'Thermal')` |
| EventFormatType                  | The service shall only send event payloads of the matching type.  See the EventFormatType enum defined by the Redfish EventService Schema for the values allowed. | `http://sseuri?$filter=EventFormatType eq Event` |
| MessageId                        | The service shall only send Events containing the matching Message Id.                                                                                            | `http://sseuri?$filter=MessageId eq 'Contoso.1.0.TempAssert'` |
| OriginResource                   | The service shall only send Events for the specified resource.                                                                                                     | `http://sseuri?$filter=OriginResource eq '/redfish/v1/Chassis/1/Thermal'` |


##### Event message SSE stream

The service shall use the "id" field in the SSE stream to uniquely indicate an event.  The value of the "id" field shall be the same as the "Id" property in the event payload.  The value of the "Id" property should be a positive integer value and should be generated in a sequential manner.  A service should accept the "Last-Event-ID" header from the client in order to allow a client to restart the event stream in case the connection is interrupted.

The service shall use the "data" field in the SSE stream to include the JSON representation of the Event object as defined in the [Event message objects section](#event-message-objects).

The example payload below shows a stream containing a single event with the "id" field set to 1, and the "data" field containing a single Event object.

```
id: 1
data:{
data:    "@odata.context": "/redfish/v1/$metadata#Event.Event",
data:    "@odata.type": "#Event.v1_1_0.Event",
data:    "Id": "1",
data:    "Name": "Event Array",
data:    "Context": "ABCDEFGH",
data:    "Events": [
data:        {
data:            "MemberId": "1",
data:            "EventType": "Alert",
data:            "EventId": "ABC132489713478812346",
data:            "Severity": "Warning",
data:            "EventTimestamp": "2017-11-23T17:17:42-0600",
data:            "Message": "The LAN has been disconnected",
data:            "MessageId": "Alert.1.0.LanDisconnect",
data:            "MessageArgs": [
data:                "EthernetInterface 1",
data:                "/redfish/v1/Systems/1"
data:            ],
data:            "OriginOfCondition": {
data:                "@odata.id": "/redfish/v1/Systems/1/EthernetInterfaces/1"
data:            },
data:            "Context": "ABCDEFGH"
data:        }
data:    ]
data:}
```


##### Metric report SSE stream

The service shall use the "id" field in the SSE stream to uniquely indicate a metric report transmission.  The value of the "id" field shall be the same as the "ReportSequence" property in the metric report payload.  The value of the "ReportSequence" property should be a positive integer value and should be generated in a sequential manner.  A service should accept the "Last-Event-ID" header from the client in order to allow a client to restart the metric report stream in case the connection is interrupted.

The service shall use the "data" field in the SSE stream to include the JSON representation of the Metric Report object as defined in the [Metric report message objects section](#metric-report-message-objects).

The example payload below shows a stream containing a metric report with the "id" field set to 127, and the "data" field containing the Metric Report object.

```
id: 127
data:{
data:    "@odata.id": "/redfish/v1/TelemetryService/MetricReports/AvgPlatformPowerUsage",
data:    "@odata.context": "/redfish/v1/$metadata#MetricReport.MetricReport",
data:    "@odata.type": "#MetricReport.v1_0_0.MetricReport",
data:    "Id": "AvgPlatformPowerUsage",
data:    "Name": "Average Platform Power Usage metric report",
data:    "ReportSequence": "127",
data:    "MetricReportDefinition": {
data:        "@odata.id": "/redfish/v1/TelemetryService/MetricReportDefinitions/AvgPlatformPowerUsage"
data:    },
data:    "MetricValues": [
data:        {
data:            "MetricId": "AverageConsumedWatts",
data:            "MetricValue": "100",
data:            "Timestamp": "2016-11-08T12:25:00-05:00",
data:            "MetricProperty": "/redfish/v1/Chassis/Tray_1/Power#/0/PowerConsumedWatts"
data:        },
data:        {
data:            "MetricId": "AverageConsumedWatts",
data:            "MetricValue": "94",
data:            "Timestamp": "2016-11-08T13:25:00-05:00",
data:            "MetricProperty": "/redfish/v1/Chassis/Tray_1/Power#/0/PowerConsumedWatts"
data:        },
data:        {
data:            "MetricId": "AverageConsumedWatts",
data:            "MetricValue": "100",
data:            "Timestamp": "2016-11-08T14:25:00-05:00",
data:            "MetricProperty": "/redfish/v1/Chassis/Tray_1/Power#/0/PowerConsumedWatts"
data:        }
data:    ]
data:}
```


## Security<a id="security-details"></a>

### Protocols

#### TLS
Implementations shall support TLS v1.1 or later.

Implementations should support the latest version of the TLS v1.x specification.

Implementations should support the [SNIA TLS Specification for Storage Systems](#SNIA-TLS).

#### Cipher suites
Implementations should support AES-256 based ciphers from the TLS suites.

Redfish implementations should consider supporting ciphers similar to below that enable authentication and identification without use of trusted certificates.

         TLS_PSK_WITH_AES_256_GCM_SHA384
     TLS_DHE_PSK_WITH_AES_256_GCM_SHA384
     TLS_RSA_PSK_WITH_AES_256_GCM_SHA384

Additional advantage with using above recommended ciphers is:

"AES-GCM is not only efficient and secure, but hardware implementations can achieve high speeds with low cost and low latency, because the mode can be pipelined."

Redfish implementations should support the following additional ciphers.

            TLS_RSA_WITH_AES_128_CBC_SHA

References to RFCs:

	 http://tools.ietf.org/html/rfc5487
	 http://tools.ietf.org/html/rfc5288

#### Certificates
Redfish implementations shall support replacement of the default certificate if one is provided. 

Redfish implementations shall use certificates that are compliant with X.509 v3 certificate format, as defined in [RFC5280](#RFC5280).


### Authentication

* Authentication methods

	Service shall support both "Basic Authentication" and "Redfish Session Login Authentication" (as described below under Session Management).  Services shall not require a client to create a session when Basic Auth is used.

	Services may implement other authentication mechanisms.



#### HTTP header security
* All write requests to Redfish objects shall be authenticated, i.e., POST, PUT/PATCH, and DELETE, except for
  * The POST operation to the Sessions service/object needed for authentication
    * Extended error messages shall NOT provide privileged information when authentication failures occur.
* Redfish objects shall not be available unauthenticated, except for
  * The root object that is needed to identify the device and service locations
  * The $metadata object that is needed to retrieve resource types
  * The OData Service Document that is needed for compatibility with OData clients
  * The version object located at /redfish
* External services linked via external references are not part of this specification, and may have other security requirements.

##### HTTP redirect

* When there is a HTTP Redirect, the privilege requirements for the target resource shall be enforced.
* Generally if the location is reachable without authentication, but only over https, the server should issue a redirect to the https version of the resource. For cases where the resource is only accessible with authentication, a [404](#status-404) should be returned.

#### Extended error handling
  * Extended error messages shall NOT provide privileged information when authentication failures occur.

#### HTTP header authentication
* HTTP Headers for authentication shall be processed before other headers that may affect the response, i.e., etag, If-Modified, etc.
* HTTP Cookies shall NOT be used to authenticate any activity i.e., GET, POST, PUT/PATCH, and DELETE.

##### BASIC authentication
HTTP BASIC authentication as defined by [RFC7235](#RFC7235) shall be supported, and shall only use compliant TLS connections to transport the data between any third-party authentication service and clients.

##### Request/Message level authentication
Every request that establishes a secure channel shall be accompanied by an authentication header.

#### Session management

##### Session life cycle management

Session management is left to the implementation of the Redfish Service.  This
includes orphaned session timeout and the number of simultaneous open sessions.

* **A Redfish Service shall provide login sessions compliant with this specification.**

##### Redfish login sessions

For functionality requiring multiple Redfish operations, or for security reasons, a client may create a Redfish Login Session via the session management interface.  The URI used for session management is specified in the Session Service.  The URI for establishing a session can be found in the SessionService's Session property or in the Service Root's [Links Property](#links-property) under the Sessions property.  Both URIs shall be the same.

~~~json
{
    "SessionService": {
        "@odata.id": "/redfish/v1/SessionService"
    },
    "Links": {
        "Sessions": {
            "@odata.id": "/redfish/v1/SessionService/Sessions"
        }
    },
    ...
}
~~~

##### Session login

A Redfish session is created, without requiring an authentication header, by an HTTP POST to the SessionService's Sessions Resource Collection, including the following POST body:

~~~http
POST /redfish/v1/SessionService/Sessions HTTP/1.1
Host: <host-path>
Content-Type: application/json;charset=utf-8
Content-Length: <computed-length>
Accept: application/json;charset=utf-8
OData-Version: 4.0

{
    "UserName": "<username>",
    "Password": "<password>"
}
~~~

The Origin header should be saved in reference to this session creation and compared to subsequent requests using this session to verify the request has been initiated from an authorized client domain.

The response to the POST request to create a session shall include the following:

* An X-Auth-Token header that contains a "session auth token" that the client can use an subsequent requests
* A Location header that contains a hyperlink to the newly created session resource
* The JSON response body that contains a full representation of the newly created session object (example below)

~~~http
Location: /redfish/v1/SessionService/Sessions/1
X-Auth-Token: <session-auth-token>

{
    "@odata.context": "/redfish/v1/$metadata#Session.Session",
    "@odata.id": "/redfish/v1/SessionService/Sessions/1",
    "@odata.type": "#Session.v1_0_0.Session",
    "Id": "1",
    "Name": "User Session",
    "Description": "User Session",
    "UserName": "<username>"
}
~~~

The client sending the session login request should save the "session auth token" and the hyperlink returned in the Location header.
The "session auth token" is used to authentication subsequent requests by setting the Request Header "X-Auth-Token with the "session auth token" received from the login POST.
The client will later use the hyperlink that was returned in the Location header of the POST to logout or terminate the session.

Note that the "session ID" and "session auth token" are different.  The session ID uniquely identifies the session resource and is returned with the response data as well as the last segment of the Location header hyperlink.
An administrator with sufficient privilege can view active sessions and also terminate any session using the associated 'sessionId'.
Only the client that executes the login will have the session auth token.

##### X-Auth-Token HTTP header

Implementations shall only use compliant TLS connections to transport the data between any third-party authentication service and clients.
Therefore, the POST to create a new session shall only be supported with HTTPS, and all requests that use Basic Auth shall require HTTPS.  A request via POST to create a new session using the HTTP port should redirect to the HTTPS port if both HTTP and HTTPS are enabled. 

##### Session lifetime

Note that Redfish sessions "time-out" as opposed to having a token expiration time like some token-based methods use.  For Redfish sessions, as long as a client continues to send requests for the session more often than the session timeout period, the session will remain open and the session auth token remains valid.  If the sessions times out,  the session is automatically terminated.

##### Session termination or logout

A Redfish session is terminated when the client logs out.  This is accomplished by performing a DELETE to the Session resource identified by the hyperlink returned in the Location header when the session was created, or the 'sessionId' returned in the response data.

The ability to DELETE a Session by specifying the Session resource ID allows an administrator with sufficient privilege to terminate other users' sessions from a different session.

When a session is terminated, the service shall not affect independent connections established originally by this session for other purposes, such as connections for [Server-Sent Events](#server-sent-events) or transferring an image for the Update Service.


#### AccountService

* User passwords should be stored with one-way encryption techniques.
* Implementations may support exporting user accounts with passwords, but shall do so using encryption methods to protect them.
* User accounts shall support ETags and shall support atomic operations
  * Implementations may reject requests that do not include an ETag.
* User Management activity is atomic.
* Extended error messages shall NOT provide privileged information when authentication failures occur.

#### Async tasks

* Irrespective of which users/privileged context was used to start an async task, the information in the status object shall be used to enforce the privilege(s) required to access that object.

#### Event subscriptions

* The Redfish device may verify the destination for identity purposes before pushing event data object to the Destination.

#### Privilege model/Authorization

The Authorization subsystem uses Roles and Privileges to control which users have what access to resources.

* Roles:
  - A Role is a defined set of Privileges.  Therefore, two roles with the same privileges shall behave equivalently.
  - All users are assigned exactly one role.
  - This specification defines a set of predefined roles.  The predefined roles shall be created as follows (where Role Name is the value of the Id property for the role resource):
    - Role Name  = "Administrator"
      - AssignedPrivileges = Login, ConfigureManager, ConfigureUsers, ConfigureComponents, ConfigureSelf
    - Role Name = "Operator"
      - AssignedPrivileges = Login, ConfigureComponents, ConfigureSelf
    - Role Name = "ReadOnly"
      - AssignedPrivileges = Login, ConfigureSelf
  - Implementations shall support all of the predefined roles.
  - The predefined Roles may include OEM privileges.
  - The privilege array defined for the predefined roles shall not be modifiable.
  - A service may optionally define additional "Custom" roles.
  - A service may allow users to create custom roles by issuing a POST to the "Roles" Resource Collection.
  - A predefined role or a custom role shall be assigned to a user when a user is created.
    - The client shall provided the "RoleId" property when creating a new Manager Account in order to select the predefined role or a custom role.

* Privileges:
  - A privilege is a permission to perform an operation (e.g., Read, Write) within a defined management domain (e.g., Configuring Users).
  - The Redfish specification defines a set of "assigned privileges" in the AssignedPrivileges array in the Role resource.
  - An implementation may also include "OemPrivileges", which are then specified in an OemPrivileges array in the Role resource.
  - Privileges are mapped to resources using the privilege mapping annotations defined in the Privileges Redfish Schema file.
  - Multiple privileges in the mapping constitute an OR of the privileges.

* User Management:
  - Users are assigned a Role when the user account is created.
  - The privileges that the user has are defined by its role.


* ETag Handling:
  - Implementations shall enforce the same privilege model for ETag-related activity as is enforced for the data being represented by the ETag.
  - For example, when activity requiring privileged access to read data item represented by ETag requires the same privileged access to read the ETag.

#### Redfish Service Operation-to-Privilege mapping

For every request made by a Redfish client to a Redfish service, the Redfish service shall determine that 
the authenticated identity of the requester has the authorization to perform the requested operation on the resource specified in the request.
Using the role and privileges authorization model, where an authenticated identity context is assigned a role and a role is a set of privileges, the service will typically check a HTTP request
against a mapping of the authenticated requesting identity role/privileges and determine whether the identity privileges are sufficient to perform the operation specified in the request.

##### Why specify Operation-to-Privilege mapping

Initial versions of the Redfish specifications specified several Role-to-Privilege mappings for standardized Roles and normatively identified
several Privilege labels but did not normatively define what these privileges meant in detail or how privilege-to-operations mappings could 
be specified or represented in a normative fashion. The lack of a methodology to define what privilege(s) are required to perform a specific
requested operation against the URI specified in the request puts at risk the interoperability between Redfish service implementations that
Redfish clients may encounter due to variances in privilege requirements between implementations.  Also, a lack of methodology for specifying 
and representing the operation-to-privilege mapping prevents the Redfish Forum or other governing organizations to normatively define privilege requirements for a service.

##### Representing Operation-to-Privilege mappings

A Redfish service should provide a Privilege Registry file in the service Registry Collection. The Privilege Registry file represents the 
Privilege(s) required to perform an operation against a URI specified in a HTTP request to the service. The Privilege Registry is a single 
JSON document that contains a Mappings array of PrivilegeMapping entity elements where there is an individual element for every schema entity 
supported by the service.  The operation-to-privilege mapping is defined for every entity schema and applies to every resource the service 
implements for the applicable schema.  There are several situations where specific resources or elements of resources may have differing 
operation-to-privilege mappings than the entity mappings and the entity level mappings have to be overridden.  The methodology for specifying
entity level operation-to-privilege mappings and related overrides are defined in the PrivilegeRegistry schema.

If a Redfish service provides a Privilege Registry document, the service shall use the Redfish Forum's Redfish Privilege Mapping Registry definition
as a base operation-to-privilege mapping definition for operations that the service supports in order to promote interoperability for Redfish clients.

##### OperationMap syntax

An operation map defines the set of privileges required to perform a specific operation on an entity, entity element, or resource.
The operations mapped are GET, PUT, PATCH, POST, DELETE and HEAD. Privilege mapping are defined for each operation irrespective 
of whether the service or the API data model support the specific operation on the entity, entity element or resource. Privilege labels used may be the Redfish standardized labels defined in the Privilege.PrivilegeType enumeration and they may be OEM-defined privilege labels. The 
privileges required for an operation can be specified with logical AND and OR behavior as required (see the [Privilege AND and OR syntax](#privilege-and-and-or-syntax) clause for more information).  The following example defines
the privileges required for various operations on Manager entity.  Unless mapping overrides to the OperationMap array are defined (syntax explained in next clause), the specified operation-to-privilege mapping would represent behavior for all Manager resources in a service implementation.
~~~json
{
    "Entity": "Manager",
    "OperationMap": {
        "GET": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "HEAD": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "PATCH": [
            {
                "Privilege": [ "ConfigureManager" ]
            }
        ],
        "POST": [
            {
                "Privilege": [ "ConfigureManager" ]
            }
        ],
        "PUT": [
            {
                "Privilege": [ "ConfigureManager" ]
            }
        ],
        "DELETE": [
            {
                "Privilege": [ "ConfigureManager" ]
            }
        ]
    }
}
~~~

##### Mapping overrides syntax

Several situations occur where operation-to-privilege mapping varies from what might be specified at an entity schema level.
These situations are:
* Property Override - Where a property has different privilege requirements that the resource (document) it is in.  For example, the Password 
property in the ManagerAccount resource requires the "ConfigureSelf" or the "ConfigureUsers" privilege to change in contrast 
to the "ConfigureUsers" privilege required for the rest of the properties in ManagerAccount resources.
* Subordinate Override - Where an entity is used in context of another entity and the contextual privileges need to govern.  For example, the 
privileges for PATCH operations on EthernetInterface resources depends on whether the resource is subordinate to Manager
(ConfigureManager is required) or ComputerSystem (ConfigureComponents is required) resources.
* Resource URI Override - Where a specific resource instance has different privilege requirements for operation that those defined for the entity schema.
The overrides are defined in the context of the operation-to-privilege mapping for an entity.

##### Property override example

In the following example, the Password property on the ManagerAccount
resource requires the "ConfigureSelf" or the "ConfigureUsers" privilege to change in contrast to the "ConfigureUsers" privilege 
required for the rest of the properties on ManagerAccount resources.
~~~json
{
    "Entity": "ManagerAccount",
    "OperationMap": {
        "GET": [
            {
                "Privilege": [ "ConfigureManager" ]
            },
            {
                "Privilege": [ "ConfigureUsers" ]
            },
            {
                "Privilege": [ "ConfigureSelf" ]
            }
        ],
        "HEAD": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "PATCH": [
            {
                "Privilege": [ "ConfigureUsers" ]
            }
        ],
        "POST": [
            {
                "Privilege": [ "ConfigureUsers" ]
            }
        ],
        "PUT": [
            {
                "Privilege": [ "ConfigureUsers" ]
            }
        ],
        "DELETE": [
            {
                "Privilege": [ "ConfigureUsers" ]
            }
        ]
    },
    "PropertyOverrides": [
        {
            "Targets": [ "Password" ],
            "OperationMap": {
                "GET": [
                    {
                        "Privilege": [ "ConfigureManager" ]
                    }
                ],
                "PATCH": [
                    {
                        "Privilege": [ "ConfigureManager" ]
                    },
                    {
                        "Privilege": [ "ConfigureSelf" ]
                    }
                ]
            }
        }
    ]
}
~~~

##### Subordinate override

The Targets property within SubordinateOverrides lists a hierarchical representation for when to apply the override.  In the following example, the override for an EthernetInterface entity is applied when it is subordinate to an EthernetInterfaceCollection entity, which in turn is subordinate to a Manager entity.  If a client were to PATCH an EthernetInterface entity that matches this override condition, it would require the "ConfigureManager" privilege; otherwise, the client would require the "ConfigureComponents" privilege.
~~~json
{
    "Entity": "EthernetInterface",
    "OperationMap": {
        "GET": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "HEAD": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "PATCH": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "POST": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "PUT": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "DELETE": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ]
    },
    "SubordinateOverrides": [
        {
            "Targets": [
                "Manager",
                "EthernetInterfaceCollection"
            ],
            "OperationMap": {
                "GET": [
                    {
                        "Privilege": [ "Login" ]
                    }
                ],
                "PATCH": [
                    {
                        "Privilege": [ "ConfigureManager" ]
                    }
                ]
            }
        }
    ]
}
~~~

##### ResourceURI Override

In the following example, use of the ResourceURI Override syntax for representing operation privilege variations for specific resource URIs is demonstrated.  The example specifies both ConfigureComponents and OEMAdminPriv privileges are required in order to perform a PATCH operation on the two resource URIs listed as Targets. 
~~~json
{
    "Entity": "ComputerSystem",
    "OperationMap": {
        "GET": [
            {
                "Privilege": [ "Login" ]
            }
        ],
        "HEAD": [
            { 
                "Privilege": [ "Login" ]
            }
        ],
        "PATCH": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "POST": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "PUT": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ],
        "DELETE": [
            {
                "Privilege": [ "ConfigureComponents" ]
            }
        ]
    },
    "ResourceURIOverrides": [
        {
            "Targets": [
                "/redfish/v1/Systems/VM6",
                "/redfish/v1/Systems/Sys1"
            ],
            "OperationMap": {
                "GET": [
                    {
                        "Privilege": [ "Login" ]
                    }
                ],
                "PATCH": [
                    {
                        "Privilege": [ "ConfigureComponents","OEMSysAdminPriv" ]
                    }
                ]
            }
        }
    ]
}
~~~

##### Privilege AND and OR syntax

Logical combinations of privileges required to perform an operation on an entity, entity element or resource are defined by the array placement of the privilege labels in the OperationMap GET, HEAD, PATCH, POST, PUT, DELETE operation element arrays.  For OR logical combinations, the privilege label is placed in the operation element array as individual elements.  In the following example, either Login or OEMPrivilege1 privileges are required to perform a GET operation.
~~~json
{
    "GET": [
        {
            "Privilege": [ "Login" ]
        },
        {
            "Privilege": [ "OEMPrivilege1" ]
        }
    ]
}
~~~
For logical AND combinations, the privilege label is placed in the Privilege property array within the operation element.  In the following example, both ConfigureComponents and OEMSysAdminPriv are required to perform a PATCH operation.
~~~json
{
    "PATCH": [
        {
            "Privilege": [ "ConfigureComponents","OEMSysAdminPriv" ]
        }
    ]
}
~~~

## Redfish Host Interface
The Redfish Host Interface Specification defines how software executing on a host computer system can interface with a Redfish service that manages the host.  See [DSP0270](#DSP0270) for details.

## Redfish Composability

A service may implement the CompositionService resource off of ServiceRoot to support the binding of resources together.  One example is disaggregated hardware, which allows for independent components, such as processors, memory, I/O controllers, and drives, to be bound together to create logical constructs that operate together.  This allows for a client to dynamically assign resources for a given application.

### Composition requests

A service that implements the CompositionService (as defined by the CompositionService schema) shall support one or more of the following types of composition requests:
* [Specific Composition](#specific-composition)

A service that supports removing a composed resource shall support the DELETE method on the composed resource.

#### Specific Composition

A Specific Composition is when a client has identified an exact set of resources in which to build a logical entity.  A service that supports Specific Composition requests shall implement the ResourceBlock resource (ResourceBlock schema) and the ResourceZone resource (Zone schema) for the CompositionService.  ResourceBlocks provide an inventory of components available to the client for building compositions.  ResourceZones describe the binding restrictions of the ResourceBlocks managed by the service.

The ResourceZone resource within the CompositionService shall include the CollectionCapabilities annotation in the response.  The CollectionCapabilities annotation allows a client to discover which collections in the service support compositions, and how the POST request for the collection is formatted, as well as what properties are required.  A service that supports Specific Compositions shall support a POST request that contains an array of hyperlinks to ResourceBlocks.  The specific nesting of the ResourceBlock array is defined by the schema for the resource being composed.

A service that supports updating a composed resource shall also support the PUT and/or PATCH methods on the composed resource with a modified list of ResourceBlocks.

Example Specific Composition of a ComputerSystem:
~~~http
POST /redfish/v1/Systems HTTP/1.1
Content-Type: application/json;charset=utf-8
Content-Length: <computed length>
OData-Version: 4.0

{
    "Name": "Sample Composed System",
    "Links": {
        "ResourceBlocks": [
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/ComputeBlock0" },
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/DriveBlock2" } ,
            { "@odata.id": "/redfish/v1/CompositionService/ResourceBlocks/NetBlock4" }
        ]
    }
}
~~~

## ANNEX A (informative)

### Change log

| Version | Date       | Description |
| ---     | ---        | ---         |
| 1.6.1   | 2018-12-13 | Added clause about percent encoding being allowed for query parameters. |
|         |            | Changed Expand example to use SoftwareInventory instead of LogEntry. |
|         |            | Added missing clause about the usage of a separator for multiple query parameters. |
|         |            | Fixed '$filter' examples to use '/' instead of '.' for property paths. |
|         |            | Clarified the usage of Messages in a successful Action response; provided an example. |
|         |            | Added clarification about services supporting a subset of HTTP operations on resources specified in schema. |
|         |            | Added clarification about services implementing writable properties as read only. |
|         |            | Added clarification about session termination not affecting connections opened by the session. |
|         |            | Added "Redfish Provider" term definition. |
|         |            | Updated JSON Schema references to point to Draft 7 of the JSON Schema specification. |
|         |            | Added clarifications about scenarios for when a request to add an Event Subscription contains conflicting information and how services respond. |
|         |            | Removed language about ignoring the 'Links' property in PATCH requests. |
|         |            | Clarified usage of ETags to show that a client is not supposed to PATCH '@odata.etag' when attempting to use ETag protection for a resource. |
|         |            | Clarified usage of the 'only' query parameter to show it's not to be combined with '$expand' and not to be used with singular resources. |
|         |            | Clarified the usage of HTTP status codes with Task Monitors. |
|         |            | Various spelling and grammar fixes. |
| 1.6.0   | 2018-08-23 | Added methods of using $filter on the SSE URI for the EventService. |
|         |            | Added support for the OpenAPI Specification v3.0. This allows OpenAPI-conforming software  to access Redfish service implementations. |
|         |            | Added strict definitions for the URI patterns used for Redfish resources to support OpenAPI. Each URI is now constructed using a combination of fixed, defined path segments and the values of "Id" properties for Resource Collections. Also added restrictions on usage of unsafe characters in URIs. Implementations reporting support for Redfish v1.6.0 must conform to these URI patterns. |
|         |            | Added support for creating and naming Redfish schema files in the OpenAPI YAML-based format. |
|         |            | Added URI construction rules for OEM extensions. |
|         |            | Changed ETag usage to require strong ETag format. |
|         |            | Added requirement for HTTP Allow header as a response header for GET and HEAD operations. |
|         |            | Added Metric Reports as a type of event that can be produced by a Redfish Service. Added support for SSE streaming of Metric reports in support of new TelemetryService schema. |
|         |            | Added Registry, Resource, Origin, or EventFormatType-based event subscription methods as detailed in the Specification and schema. Added an EventFormatType to allow for additional payload types for subscription-based or streaming events. Deprecated 'EventType'-based event subscription mechanism. |
|         |            | Added Event message grouping capability. |
|         |            | Provided guidance for defining and using OEM extensions for Messages and Message Registries. |
|         |            | Added 'excerpt' and 'only' query parameters. |
|         |            | Clarified requirements for Resource Collection responses, which includes required properties that were expected, but not listed explicitly in the Specification. |
|         |            | Made inclusion of the '@odata.context' annotation optional. |
|         |            | Removed requirement for clients to include the 'OData-Version' HTTP header in all requests. |
| 1.5.1   | 2018-08-10 | Added clarifications to required properties in structured properties derived from ReferenceableMembers. |
|         |            | Reorganized Eventing section to break out the different subscription methods to differentiate pub-sub from SSE. |
|         |            | Removed statements referencing OData conformance levels. |
|         |            | Clarified terminology to explain usage of absolute versus relative URIs throughout. |
|         |            | Clarified client-side HTTP Accept header requirements. |
|         |            | Added evaluation order for supported query parameters and clarified examples. |
|         |            | Clarified handling of annotations in response payloads when used with $select queries. |
|         |            | Clarified service handling of annotations in PATCH requests. |
|         |            | Clarified handling of various PATCH request error conditions. |
|         |            | Clarified ability to create Resource Collection members by POST operations to the Resource Collection or the Members[] array within the resource. |
|         |            | Corrected several examples to show required properties in payload. |
|         |            | Clarified usage of the Link header and values of 'rel=describedBy'. |
|         |            | Clarified that the HTTP status code table only describes Redfish-specific behavior and that unless specified, all other usage follows the definitions within the appropriate RFCs. |
|         |            | Added missing entry for HTTP status code 431. |
|         |            | Added statement that HTTP status code 503 can be used during reboot/reset of a Service to indicate that the service is temporarily unavailable. |
|         |            | Clarified usage of the @odata.type annotation within embedded objects. |
|         |            | Added missing statements about required properties 'Name', 'Id', 'MemberId', and common property 'Description', which have always been shown as required in schema files, but were not mentioned in the Specification. |
|         |            | Added guidance for the value of time/date properties when time is unknown. |
|         |            | Added missing description of the 'title' property in Action requests. |
|         |            | Clarified usage of the '@odata.nextLink' annotation at the end of Resource Collections. |
|         |            | Added additional guidance for naming properties and enumeration values that contain 'OEM' or that include acronyms. |
|         |            | Corrected requirements for Description and LongDescription schema annotations. |
|         |            | Corrected name of 'ConfigureComponents' in Operation-to-Privilege mapping clause. |
|         |            | Various typographical errors and grammatical improvements. |
| 1.5.0   | 2018-04-05 | Added support for Server-Sent Eventing for streaming events to web-based GUIs or other clients. |
|         |            | Added "OperationApplyTime" annotation to provide a mechanism for specifying deterministic behavior for the application of Create, Delete or Action (POST) operations. |
| 1.4.1   | 2018-04-05 | Updated name of the DMTF Forum from 'SPMF' to 'Redfish Forum'. |
|         |            | Changed terminology for consistent usage of 'hyperlink'. |
|         |            | Added example to clarify usage of $select query parameter with $expand, and clarified expected results when using 'AutoExpand'. Corrected order of precedence for $filter parameter options. |
|         |            | Corrected terminology for OEM-defined actions removing 'custom' in favor of OEM, and clarified that the Action 'target' property is always required for an Action, along with its usage. |
|         |            | Corrected location header values for responses to Data modification requests that create a Task (Task resource vs. Task Monitor). Clarified error handling of DELETE operations on Task resources. |
|         |            | Removed references to obsolete and unused 'Privilege' annotation namespace. |
|         |            | Clarified usage of the 'Base.1.0.GeneralError' message in the Base Message Registry. |
|         |            | Added missing durable URIs for Registries and Profiles, clarified intended usage for each folder in the Repository. Added missing file naming conventions for Registries and Profiles, and clarified file naming for Schemas. |
|         |            | Added statement to clarify that additional headers may be added to M-SEARCH responses for SSDP to allow for UPnP compatibility. |
|         |            | Clarified assignment requirements for predefined or custom roles when new Manager Account instances are created, using the 'RoleId' property. |
| 1.4.0   | 2017-11-17 | Added support for optional Query parameters ("$expand", "$filter", and "$select") on requests to allow for more efficient retrieval of resources or properties from a Redfish Service. |
|         |            | Clarified HTTP status and payload responses after successful processing of data modification requests. This includes POST operations for performing Actions, as well as other POST, PATCH, or PUT requests. |
|         |            | Added HTTP status code entries for 428 and 507 to clarify the proper response to certain error conditions. Added reference links to the HTTP status code table throughout. |
|         |            | Updated Abstract to reflect current state of the Specification. |
|         |            | Added reference to RFC 6585 and clarified expected behavior when ETag support is used in conjunction with PUT or PATCH operations. |
|         |            | Added definition for "Property" term and updated text to use term consistently. |
|         |            | Added "Client Requirement" column and information for HTTP headers on requests. |
|         |            | Clarified the usage and expected format of the Context property value. |
|         |            | Added clause detailing how Structured properties can be revised and how to resolve their definitions in schema. |
|         |            | Added more descriptive definition for the Settings resource.  Added an example for the "SettingsObject".  Added description and example for using the "SettingsApplyTime" annotation. |
|         |            | Added Action example using the ActionInfo resource in addition to the simple AllowableValues example. Updated example to show a proper subset of the available enumerations to reflect a real-world example. |
|         |            | Added statement explaining the updates required to TaskState upon task completion. |
| 1.3.0   | 2017-08-11 | Added support for a Service to optionally reject a PATCH or PUT operation if the If-Match or If-Match-None HTTP header is required by returning the HTTP status code [428](#status-428). |
|         |            | Added support for a Service to describe when the values in the Settings object for a resource are applied via the "@Redfish.SettingsApplyTime" annotation. |
| 1.2.1   | 2017-08-10 | Clarified wording of the "Oem" object definition. |
|         |            | Clarified wording of the "Partial resource results" section. |
|         |            | Clarified behavior of a Service when receiving a PATCH with an empty JSON object. |
|         |            | Added statement about other uses of the HTTP 503 status code. |
|         |            | Clarified format of URI fragments to conform to RFC6901. |
|         |            | Clarified use of absolute and relative URIs. |
|         |            | Clarified definition of the "target" property as originating from OData. |
|         |            | Clarified distinction between "hyperlinks" and the "Links Property". |
|         |            | Corrected the JSON example of the privilege map. |
|         |            | Clarified format of the "@odata.context" property. |
|         |            | Added clauses about the schema file naming conventions. |
|         |            | Clarified behavior of a Service when receiving a PUT with missing properties. |
|         |            | Clarified valid values in the "Accept" header to include wildcards per RFC7231. |
|         |            | Corrected "ConfigureUser" privilege to be spelled "ConfigureUsers". |
|         |            | Corrected Session Login section to include normative language. |
| 1.2.0   | 2017-04-14 | Added support for the Redfish Composability Service. |
|         |            | Clarified Service handling of the Accept-Encoding header in a request. |
|         |            | Improved consistency and formatting of example requests and responses throughout. |
|         |            | Corrected usage of the "@odata.type" property in response examples. |
|         |            | Clarified usage of the "Required" schema annotation. |
|         |            | Clarified usage of SubordinateOverrides in the Privilege Registry. |
| 1.1.0   | 2016-12-09 | Added Redfish Service Operation to Privilege Mapping clause. This functionality allows a Service to present a resource or even property-level mapping of HTTP operations to account Roles and Privileges. |
|         |            | Added references to the Redfish Host Interface Specification (DSP0270). |
| 1.0.5   | 2016-12-09 | Errata release.  Various typographical errors. |
|         |            | Corrected terminology usage of "Collection", "Resource Collection" and "Members" throughout. |
|         |            | Added glossary entries for "Resource Collection" and "Members". |
|         |            | Corrected Certificate requirements to reference definitions and requirements in RFC 5280 and added a normative reference to RFC 5280. |
|         |            | Clarified usage of HTTP POST and PATCH operations. |
|         |            | Clarified usage of HTTP Status codes and Error responses. |
| 1.0.4   | 2016-08-28 | Errata release.  Various typographical errors. |
|         |            | Added example of an HTTP Link Header and clarified usage and content. |
|         |            | Added Schema Modification clause describing allowed usage of the Schema files. |
|         |            | Added recommendation to use TLS 1.2 or later, and to follow the SNIA TLS Specification.  Added reference to the SNIA TLS Specification.  Added additional recommended TLS_RSA_WITH_AES_128_CBC_SHA Cipher suite. |
|         |            | Clarified that the "Id" property of a Role resource must match the Role Name. |
| 1.0.3   | 2016-06-17 | Errata release.  Corrected missing Table of Contents and Clause numbering.  Corrected URL references to external specifications.  Added missing Normative References.  Corrected typographical error in ETag example. |
|         |            | Clarified examples for ExtendedInfo to show arrays of Messages. |
|         |            | Clarified that a POST to Session Service to create a new Session does not require authorization headers. |
| 1.0.2   | 2016-03-31 | Errata release.  Various typographical errors. |
|         |            | Corrected normative language for M-SEARCH queries and responses. |
|         |            | Corrected Cache-Control and USN format in M-SEARCH responses. |
|         |            | Corrected schema namespace rules to conform to OData namespace requirements (<namespace>.n.n.n becomes <namespace>.vn_n_n) and updated examples throughout the document to conform to this format.  File naming rules for JSON Schema and CSDL (XML) schemas were also corrected to match this format and to allow for future major (v2) versions to coexist. |
|         |            | Added missing clause detailing the location of the Schema Repository and listing the durable URLs for the repository. |
|         |            | Added definition for the value of the Units annotation, using the definitions from the UCUM specification.  Updated examples throughout to use this standardized form. |
|         |            | Modified the naming requirements for Oem Property Naming to avoid future use of colon ':' and period '.' in property names, which can produce invalid or problematic variable names when used in some programming languages or environments.  Both separators have been replaced with underscore '_', with colon and period usage now deprecated (but valid). |
|         |            | Removed duplicative or out-of-scope sub-clauses from the Security clause, which made unintended requirements on Redfish service implementations. |
|         |            | Added missing requirement that property names in Resource Responses must match the casing (capitalization) as specified in schema. |
|         |            | Updated normative references to current HTTP RFCs and added clause references throughout the document where applicable. |
|         |            | Clarified ETag header requirements. |
|         |            | Clarified that no authentication is required for accessing the Service Root resource. |
|         |            | Clarified description of Retrieving Collections. |
|         |            | Clarified usage of 'charset=utf-8' in the HTTP Accept and Content-Type headers. |
|         |            | Clarified usage of the 'Allow' HTTP Response Header and added missing table entry for usage of the 'Retry-After' header. |
|         |            | Clarified normative usage of the Type Property and Context Property, explaining the ability to use two URL forms, and corrected the "@odata.context" URL examples throughout. |
|         |            | Corrected inconsistent terminology throughout the Collection Resource Response clause. |
|         |            | Corrected name of normative Resource Members Property ('Members', not 'value'). |
|         |            | Clarified that Error Responses may include information about multiple error conditions. |
|         |            | Corrected name of Measures.Unit annotation term as used in examples. |
|         |            | Corrected outdated reference to Core OData specification in Annotation Term examples. |
|         |            | Added missing 'Members' property to the Common Redfish Resource Properties clause. |
|         |            | Clarified terminology and usage of the Task Monitor and related operations in the Asynchronous Operations clause. |
|         |            | Clarified that implementation of the SSDP protocol is optional. |
|         |            | Corrected typographical error in the SSDP USN field's string definition (now '::dmtf-org'). |
|         |            | Added missing OPTIONS method to the allowed HTTP Methods list. |
|         |            | Fixed nullablity in example.  |
| 1.0.1   | 2015-09-17 | Errata release.  Various grammatical corrections. |
|         |            | Clarified normative use of LongDescription in schema files. |
|         |            | Clarified usage of the 'rel-describedby' link header. |
|         |            | Corrected text in example of 'Select List' in OData Context property. |
|         |            | Clarified Accept-Encoding Request header handling. |
|         |            | Deleted duplicative and conflicting statement on returning extended error resources. |
|         |            | Clarified relative URI resolution rules. |
|         |            | Clarified USN format.  |
| 1.0.0   | 2015-08-04 | Initial release. |
