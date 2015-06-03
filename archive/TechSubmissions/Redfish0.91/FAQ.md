#Refish FAQ

**Version 0.9**

This document is intended to explain the rationale and reasoning behind some of the architectural decisions in the Redfish Architecture

* TOC Placeholder

# Why a new Interface?
* Market shifting to scale-out solutions
    * Massive quantities of simple servers, reliability achieved through software 
    * Usage model different than Enterprise (servers as  “cattle”, not “pets”)
    * Customer demand for standards-based, multi-vendor deployments
* Functionality lags in scale-out 
    * IPMI feature set is limited to low “common denominator” (e.g. Power On/Off/Reboot, temperature value, text console)
    * Customers increasingly developing their own tools for tight integration
    * Increasing fragmentation of IPMI specification as OEM extensions proliferate
* Customers exhausting basic IPMI functionality
    * Security and encryption support no longer meets customer requirements
    * Increasing occurrence of proprietary extensions fragment the specification
    * SMASH/CIM not an option for these customers (see further section)
* New system architectures cannot be modeled in standard IPMI structure
    * Bit-wise encodings cannot represent complex architectural relationships
    * Aggregation points, multi-node systems
* Customers are asking for a modern interface
    * Expect APIs to use Cloud / Web protocols, structures and security models


## Why REST, HTTP & JSON?
* REST: Rapidly replacing SOAP
    * Ecosystem adopting it (OpenStack, etc.)
    * Much quicker to learn than SOAP/WS-Man
 
* HTTPS: The Web protocol
    * Well-understood by admins
    * Known security model
    * Known network configuration
    * Being taught in High Schools and Jr Colleges

* JSON: Modern data format
    * Human-readable
    * Simpler than XML
    * Modern language support
    * Rapid growth

* Combination the de-facto choice for public APIs
    * [Most Popular Protocols used by Web APIs](http://fredonfire.com/wp-content/uploads/2011/10/Chart-Protocol-Usage-by-Web-APIs.png)
    * [Most Popular Coding Languages 2014](http://static.squarespace.com/static/51361f2fe4b0f24e710af7ae/t/52dc3638e4b0d99728f927ae/1390163522743/codeeval2014.jpg)
    * [Data Formats used in New APIs](http://www.programmableweb.com/wp-content/data-formats2.jpg)


## Why Hypermedia API?
A single API style that will match the myriad of computing platforms is required.  The industry cannot support multiple interface or programming styles.  A single interface that spans the market from standalone servers to hyperscale as well as partionable and even virtual systems is needed by customers.  A fixed URI API methodology will not suffice to show the various containment relationships between the various forms of sheet metal, the servers within them and the managers associated with them.  These means a 1-to-many or many-to-many cardinality of associations is needed.  

Additionally, the API must be easy for simple systems and flexible for hyperscale.  The use of hrefs to represent associations and collections for similar resources has been proven in hypermedia APIs.

### Why force the use of "/rest/v1" as the service root?
It was chosen to represent the version of the protocol.  Resources themselves have a separate versioning (the use of the Type property).  Protocols have a different lifecycle than the data model they transport so a versioning mechanism is necessary.

The two choices were fixed URI or an X-Header.  The RESTful world has adopted the fixed URI methodology and is veering away from non-standard headers (like X-anything).  Additionally, headers in general and X headers in specific are difficult to use (though not impossible) in some of the tool sets.

## Why JSON Schema?
We are trying to adopt as many existing standards as possible.  Since JSON schema is being adopted by the IETF (currently in draft-4) and is already in JSON (thus can be transferred by our protocol), it was one of the few candidates.  It is also extensible, so we can add any qualifiers not represented in the base schema.  Additionally, because it is JSON, it can be utilized by the existing tool chain.  It also helps us develop the schema very rapidly due to tools and human readability.

## Why PATCH and PUT?
Originally, Redfish allowed PUTs and partial PUTs.  But we ran into the semantic issue of when to do a complete replacement of a resource instead of a partial replacement.  We rationalized PUT as saying nothing was ever a complete replacement.  The problem occurred with Settings.  If a resource allows a Setting Data (resource of settings to be applied in the future), we needed a way to clear existing properties.  Things started to get very convoluted and special (=unnatural) rules were put in place.

PATCH solves this.  PUT always does a complete replacement.  PATCH always does a partial replacement.  Deterministic behaviour for the service is achieved without complex logic. 

PATCH is gaining wide adoption in the industry.  It is already supported by Open Stack and many other APIs and in available in many off the shell web servers.

## Why PUSH Eventing only?
We need some kind of eventing mechanism to meet comp with SNMP, IPMI and other protocols.  The mechanism is already there in BMCs.

The two methods are "push" and "pull".  Push sends events to a destination and pulls create a queue where clients can retrieve events.  Pull eventing is resource intensive in a light-weight, small footprint BMC.  This is why they already use push style eventing since the data does not need to be retained in precious BMC processing memory with push style eventing.

## Why separation of data model from protocol?
The data model is expected to change, including extensions added to it, over time.  Therefore, churn is expected.  However, the protocol portion of the specification should remain relatively stable.  So, instead of churning the entire specification, this separation attempts to isolate unnecessary versioning of unaffected specification sections.

Strict forward compatibility rules are in the specification, similar to other data models.  The one constant is that the Type property contains the JSON Schema definition for the resource so, regardless of resource type, the schema can always be obtained.

There is a schema retrieval methodology included in Redfish as well.

## What's a message registry and why did you select it?
Message registries are not a new concept.  They allow the Management Processor to retain a short identifier which results in a look up for the space intensive message contained a registry.  Mechanisms are in place for parameter substitution on a per-message basis.  

Message registries are not only light weight, but make it easy to support internationalization since the management processor does not need to contain the translations.  Instead, the registry itself can be translated and the client can then display any translations needed.

## Why href vs extref?
href and extref are already concepts in HTTP and the IETF RFCs explain their semantics.  In Redfish, href represents a local resource that is expected to be JSON format.  Any non-local or non-Redfish model resources (such as local zip files) are used as an extref.

## What's a CorrelatableID?
Architecturally, hrefs and extrefs are the preferred referencing mechanism.  But we also needed a way for data to be identified as belonging together in the resources.  There are two major use cases, though others exist as well.  In essence, it is a weak key but only in some cases is it truly weak.

The first use case is when data within a resource needs to reference other data within the same resource.  JSON Pointer exists, and is the preferred data pattern for a Correlatable ID's value, but the architecture should be able to tolerate any globally unique value.  Examples of this are redundancy between fans (where fans can be in more than one redundancy group, thus they could not all be placed within one single object) or other kinds of multiple-membership sets within an object.

The second use case is pre-compiled resources.  Some data can be composed of fixed data that is not determined on the fly.  But if there is an href in it, then that data must be changed by either a provider or the management service.  We try to avoid data fix-ups wherever possible.  But a service-unique identifier could be used in its stead to relate this property or resource to other objects.

### Why aren't these defined as JSON Pointers?
There are some use cases where JSON Pointer isn't possible, like in precompiled resources, and others where it isn't always unique.  And CorrelatableIDs must absolutely be unique.  Other values, like MAC address which can be globally unique, and may be more appropriate in those circumstances.  In short, JSON Pointer can't be used in all use cases.  An additional example is that the provider of information may not know about the URIs in the implementation, such as when two providers don’t know about each other but can determine the same UEFI device path (like PCI enumeration correlating to the slot’s device) or in the case of hard coded provider data.

### Why are these values used in different ways and how does an implementer know which is which?
The implementer actually shouldn't need to know which of these use cases is being addressed.  The value of the property should be, like hrefs and extrefs, opaque to the client.  The client should just be matching the value with other data within the resource and when values match, the semantics in the schema are to be followed.

## Why links section?
As noted in the specification, the use of an href is used to provide a method of pointing clients from one resource to another resource that have some relationship between them.  For instance, the root of the Redfish service has a relationship to other subtending resources, such as the Systems resource, and therefore the root service would contain an href pointing to the systems resource.  The href provides a means for a client to access interesting information in a relational manner.  

The links section, within the JSON documents, was developed as a formalization of representing relational information between resources that use the href construct.  This notion was based upon IETF RFC 5988 - Web Linking.  The Web Linking specification defines a Link header that semantically identifies a relation type (i.e. a "rel" parameter) with a URI.  What does this type of identification offer?  One benefit, outside of pagination, is that it allows the client to begin building a resource topology with explicit information within the links section, of the JSON document. Otherwise, the client must attempt to infer relationships only after retrieving all of the necessary JSON documents.  Furthermore, server implementations have the ability of implementing a HEAD method that will return, in its response, a Links header that allows a very straightforward method of building the relational topology that the client is interested in.  Without the use of the HEAD method along with a Links header, a client would be forced to retrieve the entire JSON document, parse it for all links, and then create the topology.  The HEAD method would merely elicit a 200 response with the necessary relationships and URI information for those relationships within the Links header.  That information, within the Links header, is much more easily parsed and in some cases programming languages offer automatic parsing capability of these HTTP headers which alleviates clients from having to build this functionality.  Finally, since there is no ordering of properties, the links section allows a server implementation not to have to search the entire document for hrefs, rather merely look for the links section in order to populate information in the Links header of a response to a HEAD request.

## Why not CIM & MOF?
First, it is too normalized, even with View classes.  There are so many classes and they are not purpose built for the customers wanting this technology. 

The MOF files are not in JSON.  Even if we translated them to JSON, we would need to prune them and turn all of the associations into hrefs in each class.  Then we would have to create view classes.  We would also have to rationalize the values which do not reflect true server/hyperscale values (look at the state and status fields alone, or look at how power is done) (or networking - 17 resources to show what Redfish can do in a single object within a resource).

Next, consider the tool set - HTTP & JSON have a rich set of tools and programming languages with existing support.  MOF/CIM is limited and vendor specific when it comes to tools.

The amount of documentation that it takes to understand CIM and the protocols takes reams and reams of paper, resulting in a stack well over a foot high.  Our goal is to have someone read our spec in the morning, play with the data model an hour later and be coding by the afternoon - and that person should not be required to have a college education, understand cardinality, etc.

Lastly is customer demand.  The customers for Redfish see CIM & MOF as "old", "Windows centric", "storage centric", "OS centric", "too hard" and other negative feedback.  They are asking for something simple that meets their "10 commandlets".

## Why not Ironic?
Ironic is the hardware management API for OpenStack.  It is OpenStack specific and doesn't have the functionality of a full BMC - only what OpenStack needs.  It is means as a translation layer between OpenStack and IPMI, SNMP and other protocols.  It does not have all of the features we need and is very much tied to OpenStack.  The market for Redfish is greater than just OpenStack.

## Why do some properties show up in multiple places?
The original question was "Why is the host IP in both the system and simple network objects?"  The host IP now falls under the HostCorrelation object which may indicate the answer to this question.  Originally I think the answer was that we don't mind duplicating values in different objects if it will make users lives easier, but we have gone away from that and try not to duplicate values/properties anywhere.

The only place this is present is in the System Object and also in the NIC object.  This is specifically due to customer request (which is what brought it into both IPMI and PhysicalComputerSystemView) so is the only duplicate data and then only if the system NICs are represented.

## Why is the ETag algorithm left to the implementation?
Considering the different ETag models (Weak/Strong) mentioned in the spec it seems that leaving the model decision up to the server implementation will leave clients not knowing what has been implemented and therefore not knowing how to interpret the ETag.  

In practice it doesn't matter since the value of the ETag will only be as good as the server is capable of providing for.  The client should treat ETags as opaque anyway and use them to determine if data has changed.  This is the adopted practice in all web servers and is what RFC2616 allows.

## Why does Redfish need to use ETags at all since the objects include "modified" times?
It allows the use of the If-Match header for replacement of resources.  It also allows the clients to determine if anything has changed before doing a large fetch (a Server collection in Moonshot is hundreds of servers).

It also allows the server the option of providing something more robust than a simple modified time.

# Security

## Why are AES ciphers required?
These ciphers provide a requisite level of security, efficient hardware implementations exist and are widely available to support even low cost implementations.

## Why are PSK GCM AES Ciphers required?
While TLS is an excellent solution for security, it depends on a full PKI implementation for basic identity verification. PSK GCM ciphers provide both identity verification and encryption, allowing for a bi-directionally trusted connection during initial setup or factory default configurations on the basis of a known initial password.

## ETag modification data leaks private information about resources
It is possible for an otherwise invisible change to an object - e.g. changing a password - to cause an ETag to change, potentially providing useful information. ETag implementations are left to the vendor, many current implementations show this metadata and accept the risk.

## AccountService roles allow an escalation of privileges
It is possible for a user with the System Administrator role to create user accounts which are assigned to roles such as Network Administrator or Storage Administrator which the creating user does not themselves possess. This escalation of privileges is well understood and accepted by users, and avoids complications caused by introducing special privilege states or additional roles to handle privilege propagation corner cases.

## HTTP Digest authentication
HTTP Digest authentication provides many advantages over BASIC authentication schemes, but also has some issues that make it less desirable. First, the digest mechanisms are becoming weaker as the ability to break hashes improves, and provide no facility to improve over time. Second, the mechanism requires the ability to read the raw user password, reducing the potential security of the solution and preventing integration with infrastructure authentication services like LDAP servers which do not allow password reads.

## Logging of events
The Redfish requires logging of some events, but does not require the implementation of a Redfish local log, though one is implied. This allows implementations of logging that are record-only logs, or logs which are securely stored outside the Redfish using services like syslog.
