#Scalable Platforms Management API White Paper

**Version 0.92a**

The goal of this white paper is to explain how to use the Scalable Platorms Management API (SPMA).  It assumes the reader has access to the Specification, Schema and Mockup as well as a web browser. 

**Table Of Contents**

- TOC Here (Do Not Remove)

## What is the Scalable Platforms Management API (SPMA)?

SPMA is a management standard using a data model representation inside of a hypermedia RESTful interface.  The model is expressed in terms of a standard, machine-readable Schema, with the payload of the messages being expressed in JSON.  Since it is a hypermedia API, it is capable of representing a variety of implementations via a consistent interface.  It has mechanisms for managing data center resources, handling events, long lived tasks and discovery as well.

### Why a new interface?

A variety of influences have resulted in the need for a new standard management interface.

First, the market is shifting from traditional data center environments to scale-out solutions.  Scale-out solutions & hyper-scale have adopted the use of massive quantities of simple servers brought together to perform a set of tasks in a distributed fashion (as opposed to centrally located).  Reliability in these environments is achieved through software that is either proprietary or open source.  As a result, the usage model different than traditional Enterprise environments.  One analogy is that servers are treated as “cattle”, not “pets”.  This set of customers demand a standards-based interface that is consistent in heterogeneous, multi-vendor environments.  

Functionality and homogeneous interfaces are lacking in scale-out management.  For instance, the IPMI feature use is limited to a “least common denominator” set of commands (e.g. Power On/Off/Reboot, temperature value, text console).  As a result, these customers, while desiring out of band functionality, have been forced to use a reduced set of functionality because vendor extensions are not common across all platforms.  This set of new customers are increasingly developing their own tools for tight integration, sometimes relying on in-band software for management since they are able to develop a common set of manageability in that environment.  Increasing fragmentation of the IPMI specification as OEM extensions proliferate result in features that do not satisfy scale-out customer needs since they are fragmented.  And by referencing specific security and encryption requirements, existing management solutions no longer meets customer security requirements.

Other standards, such as SMASH, have not met the ubiquity that was hoped for.  This is due to it's complexity.  The CLP ended up being implemented in most hardware but not with a consistent output format thus parsing resulting data was implementation dependent.  WS Management was only implemented in a limited number of out of band environments.  It is a complex, layered protocol that works best in homogeneous environments and thus never fulfilled the heterogeneity requirements.  Additionally, the complexity of the combination of understanding the protocol, generic operations, schema and the profiles themselves ended in a solution that took years to develop, years to change and add new functionality.  It takes months for customers to understand as well as significant resource commitments and expertise in order to become proficient in its use. 

The hardware landscape is rapidly changing.  Systems that either put multiple systems on a traditional "blade" or aggregate a single system out of multiple blades are becoming more prevalent.  These need to be managed by the same software that is managing traditional enterprise environments.  But these new systems cannot be adequately expressed in IPMI.  It cannot represent complex architectural relationships between components in modern systems.  Additionally, system aggregation points, such as chassis or enclosure managers are incapable of using these protocols to perform their function of expressing these complexities in the same method.
	
Finally, customers are asking for a modern interface.  They expect APIs to use the protocols, structures and security models that are common in emerging cloud interfaces.  These interfaces have the advantage that customers have invested in the tools to accelerate development.  Specifically, customers (without any prompting from vendors) are asking for RESTful protocols that express data in JSON formats.

### Why REST, JSON and OData?

REST is rapidly replacing SOAP as the protocol du jour.  The entire cloud ecosystem is adopting it and thus the web API community is as well.  It is much quicker to learn that SOAP or anything built using it, such as WS Management.  It has the simplicity of being a data pattern (as it is not strictly a protocol) mapped to HTTP operations directly.  

* [Most Popular Protocols used by Web APIs](http://fredonfire.com/wp-content/uploads/2011/10/Chart-Protocol-Usage-by-Web-APIs.png)
	 
REST semantics are easily mapped to HTTP/HTTPS.  Thus, it can be easily understood by most system administrators, has a well known security model and network configuration settings for its support are understood.  It is being taught in High Schools and Jr Colleges.  As a result, the education requirements for understanding its use a greatly reduced.  Open source implementations of web servers abound and programming language support is ubiquitous.

JSON is rapidly becoming the modern data format.  It is inherently human readable, is more concise than XML, has a plethora of modern language support and is the most rapidly growing dat format for web service APIs.  It has one additional advantage for embedded manageability environments.  Most BMCs already support a web server and managing a server through a browser is common.  This is usually done via a Java script driven interface.  By choosing JSON, the web browser can use the data from an SPMA service directly in the web browser, ensuring that the data through the browser and the programmatic interface is uniform in semantics and value.

* [Most Popular Coding Languages 2014](http://static.squarespace.com/static/51361f2fe4b0f24e710af7ae/t/52dc3638e4b0d99728f927ae/1390163522743/codeeval2014.jpg)
* [Data Formats used in New APIs](http://www.programmableweb.com/wp-content/data-formats2.jpg)

But following RESTful practices and formatting results as JSON alone are not enough. There are nearly as many RESTful interfaces as there are applications, and they all differ in the resources they expose, the headers and query options available, and how results are represented. Similarly, while JSON provides an easy-to read representation, semantics of common properties such as id, type, links, etc. are imposed through naming conventions that vary from service to service.

OData defines a set of common RESTful conventions which, if adopted, provides for interoperability between APIs.

Adopting common OData conventions for describing schema, url conventions, and naming and structure of common properties in a JSON payload, not only encapsulate best practices for RESTful APIs but further enables SPMA services to be consumed by a growing ecosystem of generic client libraries, applications, and tools.

### Why a hypermedia API?

A single API style that will match the myriad of computing platforms is required.  The industry cannot support multiple interface or programming styles.  A single interface that spans the market from stand alone servers to hyper-scale as well as partionable and even virtual systems is needed by customers.  A fixed URI API will not suffice to show the various containment relationships between the various forms of sheet metal, the servers within them and the managers associated with them.  These means a 1 to many or many to many cardinality of associations is needed.  

Additionally, the API must be easy for simple systems and flexible for hyper-scale.  The use of URLs to represent associations and collections for similar resources has been proven in hypermedia APIs.

## Getting Started

One easy way to understand the Scalable Platform Managment API is to see an implementation in use, so these next sections will walk through an implementation and explain the various architectural structures and concepts by walking through an implementation. 

You will need two things to start - a browser and an implementation to access with the browser.

Because it is based on REST and JSON, all you need is a browser to be able to start viewing an SPMA implementation. To make the data easier to read, it is suggested that you have a browser capable of viewing JSON format.  This can be done with a plug-in for most browsers.  For a real "SPMA" experience, you can download a RESTful plug in for your browser such as the Advanced REST Client for Chrome.  This allows you to set headers, see HTTP codes and other items that browsers normally hide.  You will also get an advantage when accessing a "real" SPMA implementation such as the emulator or a vendor implementation.

### Accessing an Implementation

You can view the markup either directly or through a web server.  All you need is access to an implementation.  There are a few ways to do that:

* Access the public mock-up.  There is a web server running JSON at xxx.xxxx.com.  You can point your browser to it and access the data.
* Copy the data to your web server.  You can access the GitHub repository and copy all of the files under the Mock-up directory to your local hard drive and place them under the /rest/v1 directory that your server uses for serving up HTML pages.  And example of this would be downloading nginx, setting it up to return JSON format and then loading the mock-up files in the html directory.
* Run the emulator.  You can download the emulator from the GitHub repository and follow the instructions in its Readme to start the emulator.

### Root

SPMA is a hypermedia API.  That means that you get to all the resources through URLs returned from other resources.  But there is one well-known URL so that every implementation has a common starting point.  That URI is "/rest/v1" for version 1 of the SPMA interface.  

URLs have a schema (the HTTP:// part), a node (such as www.spma.org or an IP address like 127.0.0.1) and a resource part.  You put these together in the URL of your browser.  So, if you are using the nginx server on your own machine, you should be able to put "HTTP://127.0.0.1/rest/v1" in your browser to access the SPMA root.

Do a GET on the root of the service from the URL you have constructed above.

## Basic Concepts

Every URL represents a resource.  This could be a service, a collection, an element or some other construct.  But in RESTful terms, these URIs point to resources and clients interact with resources.  So when you see the term resource, you can think of it as what you get back when you access a URI.

The resource format is defined by a Schema.  Each resource has a specific format that is specified in the SPMA Schema that the client can use to determine the semantics about the resource (though we try to make things as intuitive as possible).  The SPMA Schema is defined in an OData-Schema format so that generice tools and applications can interpret it. The OData Schema format can be translated to JSON-Schema for things like validation and visualization.

Structural properties of the resource are intended to be used as JavaScript variables.  This should accelerate adoption and allow JavaScript web pages and enabled apps to use the data directly.  URIs are persistent across reboots but clients are expected to start at /rest/v1 and do discovery of the URIs from there.  Don't fixate on the URIs as URIs can be different between implementations.  Current state objects can be separate from desired state objects.   

The section below works better if you are actually doing the GETs.  Speaking of... 

### Operations
The operations are GET, PUT, PATCH, POST, DELETE and HEAD.  GET is what your browser will do if you aren't using an advanced REST plug-in.  Only the emulator and real implementations will support the other operations.

GET retrieves data.  POST is used for creating resources or to use actions (more on this later).  DELETE will delete a resource, but there are only a few resources that can be deleted.  PATCH is used to change one or more properties on a resource while PUT is used to replace a resource entirely (though only a few resources can be completely replaced - more on this later too).  HEAD is like a GET without the body data returned and can be used for figuring out the URI structure by programs accessing an SPMA implementation.

### Versioning
SPMA has two kinds of versioning - the version of the protocol and the version of the resource schema.  The version of the protocol is in the URI - that's why you should start at /rest/v1.  It means you are accessing version one of the protocol.  Version 1 is the only one available now, but we needed to accommodate potential future versions.

Each resource has a resource type definition. Resource types are defined in versioned namespaces. Each resource instance has the type represented using the OData type annotation "@odata.type". The value of the type annotation is the URI of the resourcce type, including the versioned namespace.  So when you see "@odata.type" : "#ServiceRoot.1.0.0.ServiceRoot", you are dealing with a resource that adheres to the ServiceRoot type definition, defined in 1.0.0 version of the ServiceRoot schema.  The corresponding schema file would be located at /schema/v1/ServiceRoot in the SPMA schema repository. So the full URI for the type would be "/schem/v1/ServiceRoot#ServiceRoot.1.0.0.ServiceRoot. The schema file may contain other types used by in the resource type definition (for example, structured types and enums), which would have the same resource path but the fragment would describe a different type definition, typically within the same namespace. 

### References
When you see the links section, it will have references to other resources in it.  

JSON has no native reference type to refer to another resource.  SPMA requires a fully connected resource tree without requiring the client to consult schema (for simple operations).  Therefore, this specification leverages OData conventions for representing a reference to another internal or external resource.

Properties representing references to other resources that follow OData conventions are identified with a property name suffixed with "@odata.navigationLink". Properties representing URLs to other types of references, for example an external help topic, are identified as string properties in metadata with an annotation specifying that they represent a URL.

URIs are either absolute or relative.  Absolute ones won’t have the IP address but will start with /rest/v1.  If you have a plug in like the Chrome Advanced REST client, you can click on this to fill in the URI for your next GET. 

SPMA uses a third type of reference that is not in the form of a traversable URI, called a Correlatable ID.  Correlatable IDs are a keys that can be matched to other Correlatable IDs in the Resource Tree to define associations.

### Main Objects
The "main" objects are Systems, Managers and Chassis.  These are all collections (see next heading).  We will dig into these resources in a minute, but it's good to know a bit about them.  Systems can have one or more managers (since some managers are redundant), and are in one chassis.   Managers are in a Chassis and can manage more than one system.  And Chassis can house more than one System and/or Managers.  Chassis can also have Chassis in them.  It is the chassis that houses sensors, fans and the like.  Systems have the CPU/Memory complex and devices.  Managers handle various management services but also have their own devices (like NICs).  This is just an overview, but looking at the ServiceRoot object, you can see these right away.  You will also notice there are services such as Sessions (more on these later too).

### Collections
Groups of similar resources are represented as collections.  Examples of these in the Mockup include Systems, Managers, Chassis, LogEntries, Sessions, EventSubscriptions and more.  

So pick either Systems, Managers or Chassis and go down into it.  You will see this is a Collection. Collections may be paginated; collections with a property named "@odata.nextLink" are incomplete, and the client can use the URL-value of the next-link property to retrieve the next portion of the collection from the service.

Collection responses have a "value" property that contains a list of members, or links to members. Links to members are represented as JSON objects with a single "@odata.id" property containing the URI of the related resource.

### Common Properties
As you go through the model, you keep seeing some of the same properties.  You'll find Name, Modified and Type in every resource.  Name is required.  You'll also see Status as an embedded object that has the same definition across all usages.  All of these are actually in a common part of the Schema and used by other Schema by reference.  Common properties are referenced by each resource's schema via an odata <Reference> element so that the same definition is used everywhere.

### Actions
Not everything can be done easily using REST.  So we made Actions.  Things like "push button" on a System (which would reset the system or turn it off, depending on its setting) can't easily be represented in the System because the service has no idea what the state of the button is.  

So instead of having hidden properties that you could PUT/PATCH to, or complex state machines, we created Actions.  Actions are done with POSTs to the Resource (see the spec for specifics).  You can tell what actions are supported in any resource by looking for the "Actions" property.

## More Concepts

That's the simplest form of the Scalable Platforms Management API.  You'll notice the data is pretty readable, but you're probably wondering about security, what a schema is, what about headers, etc.  

### Sessions

Normally, only the root can be accessed without establishing a session.  But if you are using the public mock-up or your local web server this won't be necessary.  If you have the emulator running in secure mode, you will need to establish a session.

First, you will need to know a valid user name and password for your implementation.  For the emulator, this is in the Readme unless you have created additional accounts for it (which should also be usable for this).

The URI for establishing as session is also allowed to be used for POST unsecured so that you may establish a session.  This URI is /rest/v1/Sessions in most cases and can be determined by looking at the "Sessions" href if you do a GET on the root (/rest/v1) 

A session is created by an HTTP POST to the URI indicated by /rest.Sessions including the following POST body:

```json
{
    "UserName": "<username>"
    "Password": "<password>"
}
```

The return includes an X-Auth-Token header with a session token and Location header.

The return JSON body includes a representation of the newly created session object:

    <operation> <uri> HTTP/1.1
    <header>
    <header>
    Location: "/rest/v1/Sessions/Administrator1"
    X-Auth-Token: <token string>
    <header>

    {
        "@odata.context": "/rest/v1/$metadata#Sessions",
        "@odata.id": "/rest/v1/Sessions/Administrator1",
	    "UserName": "<username>"
    } 

You will use the <token string> in the X-Auth-Token header for all subsequent requests to your service.  When it's time to delete the session, you can do a DELETE operation on the href that was returned (/rest/v1/Sessions/Administrator1 in the example above).

### CorrelatableIDs
Go back to one of the Chassis and take a look at the fans by following the link to "ThermalMetrics" and you will see how SPMA shows redundancy.  You will notice each fan has a property called “CorrelatableID”.  Now look at the fan redundancy set.  It shows the two fans in its set using the same values in the CorrelatableID properties.  Thus the client can figure out which belongs to which.

You can't really have hrefs that point inside of objects, though JSON Pointer can do this.  But not all clients can understand JSON pointer.  So how do you do fan redundancy without hrefs?  The way we did it is with CorrelatableIDs - an opaque string that is the same for like items.  So the Fans all have IDs and the RedundancySet has an ID and the fans can point to the RedundancySet's ID and vice versa.

The manager isn't expected to directly provide all of the data in SPMA, given the advent of PMCI.  Thus providers have no knowledge of URIs to other providers.  So how do you correlate a PCI slot with a NIC?  The SPMA way for providers that know nothing about each other is to come up with a CorrelatableID that they can all figure out on their own.  Take UEFI device path - every PCI device knows its BDF and can figure out its UEFI device path.  Thus it makes an excellent CorrelatableID for the Client to be able to figure out the PCI settings for the NIC (in this case). 

Thus everything that has the same Correlatable ID in objects that all refer to different views or aspects of the same device or thing.

CorrelatableIDs (also called CIDs) are references used in special situations
when hrefs are not appropriate or possible:

* When a href URI link is inappropriate or impossible because cross object
  information may not be available or providing it may be complex.
* Correlatable IDs are also used to represent physical or logical topology
  (e.g. a UEFI PCI Device Path).
* Grouping.  CorrelatableIDs, unlike hrefs, do not have a "direction" and
  are not one-to-one pointers.  They can be used to group resources simply by
  using the same string.

Unlike hrefs, CorrelatableIDs do not have standard property names.  This is because
a resource may need to communicate more than one grouping via CID.

Href references are preferred over CorrelatableIDs.

### Services
Let's go back to root and take a look at some common services.  Tasks, Sessions, EventService and AccountService are all common services.  You can read more about them in the spec, but they should be fairly obvious.  Tasks contains a list of jobs that may have been started, usually as the result of Actions.  Sessions was discussed above.  AccountService is how you create users.  EventService will be discussed more below.

### Registries

Message registries allow the Management Processor to retain a short identifier for use in events and errors which clients can then look up in a registry to determine the actual message.  Mechanisms are in place for parameter substitution on a per-message basis.  

By having the message registries as separate entities, it is easy to support internationalization since the management processor does not need to contain the translations.  Instead, the registry itself can be translated and the client can then display any translations needed.

### Headers

A subset of the common HTTP headers are supported by an SPMA service.  A complete list of these are in the Specification, but the two that are most relevant are the Accept header (which must be set to 'application/json') and the X-Auth-Token discussed previously.  But there are many more that you will get from an actual implementation that you will not see from a static mock-up.

### ETags

ETags are used by browsers to optimize IO (caching).  They do an If-Match and if it matches, they don’t bother dragging the data.  We use them to determine if an object has changed.  Thus every ETag will change if a PUT is done or if a tool (like BIOS configuration at the console) takes place.  Thus any race condition on PUTs between SPMA and non-SPMA clients (as well as other SPMA clients) are always noticed.

The problem is that this is a mock-up and not a real web service so you can't see the ETags work.

#### Handling Client Race Conditions

It is possible for competing clients to attempt to set Setting Data overwriting each other.  This condition is handled using ETags and If- Match.

A client read/modify/write cycle consists of:

1. Get the resource, including the current ETag
1. Modify the resource properties
1. Generate a new ETag
1. PATCH the modified resource including the If-Match header containing the last known ETag.
1. If the supplied ETag no longer matches the object (something has changed since the read), the service will return 304 Not Modified.  The client should recover by repeating these steps.

* Clients _should_ include an ETag when updating Setting Data to enable Providers to more efficiently detect changes and to prevent multi-client race conditions.

### Updating Resources

The simple GET, PUT/PATCH method is a model where the client may GET the current configuration and PUT or PATCH a new desired configuration to the same resource URI.  The success of a PUT or PATCH is determined by the HTTP status code and response body.

This is intended for interaction with intrinsic providers such as the SPMA Services' own data where the firmware can process and respond appropriately to actions and configuration changes.

Upon PUT or PATCH, the HTTP response includes an HTTP status code and, in the case of failure, an Extended Error Information structure as the response body.

#### PUT vs PATCH
So why both PUT and PATCH? When designing this specification, we ran into the semantic issue of when to do a complete replacement of a resource instead of a partial replacement.  Some resources allow either replacement of some properties or complete replacement of the resource.  We needed a way to determine when to clear existing properties in resources like SettingData.  Things started to get very convoluted and special (=unnatural) rules were put in place to try to use a single operation.

PATCH solves this.  PUT always does a complete replacement.  PATCH always does a partial replacement.  Deterministic behavior for the service is achieved without complex logic for either client or server. 

PATCH is gaining wide adoption in the industry.  It is already supported by Open Stack and many other APIs and in available in many off the shell web servers.

#### Current Configurations vs Settings

There are basically two kinds of objects in SPMA - Current Configurations and Settings.  Most objects represent the current state of any given resource.  Occasionally, you'll see a property called "Settings" in the links section for a resource.  This link tells you where to do PUTs and PATCHes.  It represents the future state of the resource.  Some resources can handle changes to them right away, others may require a restart/reboot of the system or service.  "Settings" is used to let the client know what type of resource this is and where to make the changes.  If you see a Settings link, that's where to make the changes that will be picked up at the next reboot.  Examples of resources that need Settings are devices like NICs and Storage as well as BIOS.

### Extended Errors

HTTP error semantics alone are not informative enough for users or applications to understand the cause and take corrective action, leading to the concept of an ExtendedError construct. It also supports registries, and allows for more meaningful error semantics for clients.

For example, let's suppose a client wants to change a couple dozen properties all at once.  But one of them is invalid. If the implementation returned a "400", it would not help the client know which property was in error and why.  If the 400 is accompanied by a JSON body with an ExtendedError, the structure can contain not only the reason for the code being returned but the property name and even more information.  And since ExtendedError is actually an array, more than one error can be returned if more than one problem resulted in the error syndrome.  

### Eventing

We need some kind of eventing mechanism to meet comp with SNMP, IPMI and other protocols.  The mechanism is already there in BMCs.  The methodology chosen was a PUSH mechanism based on a subscription.  PUSH eventing is preferred for BMCs since it means that the event does not to be persistent in memory once the event has been sent.

A client first needs to determine the URI it wants Events to which events will be sent.  By submitting a POST request to the EventSubscription collection, a session may be established.

SPMA supports two different categories of events: life-cycle and alert events.  You can look at the EventService for the types of eventing supported by the implementation. 

More information on eventing is in the specification.

### Idempotency

RESTful operations for any RESTful service are GET, PUT/PATCH, POST, and
DELETE.

**Idempotency** is an important concept for SPMA simplicity.  Idempotent
operations can be invoked repeatedly without additional effect after the 1st
time.  For example:  The STOP button on a DVD remote is idempotent, push it
once and the movie stops, push it more than once and the movie remains stopped.
The Pause button, on the other hand, is not idempotent.  If you push it twice
and it starts to play again.  Non-idempotent operations depend upon previous
state.

Idempotent operators are HTTP PUT and PATCH. If a client PUTs
the same data a second time, the resource does not change. PATCH replaces
properties so a replayed PATCH does not change a resource again because it is
already in the desired state from the 1st PATCH.

PUTting to a resource is the simplest possible expression of altering
configuration.  It means "replace resource X with Y".  Other interaction
patterns are more complex than this.  A PATCH is slightly more complex since it
requires differential updating of a resource. A service than can be
completely configurable via idempotent PATCH operations is ideal.

SPMA defines three basic interaction patterns using the basic REST
operations.

#### Idempotent Modify:  GET/PUT/PATCH

PATCHing to a resource replaces the content of the resource with new
values for the supplied properties.  This is used in cases where a 
service can simply consume desired configuration and produce resulting state.
Presumably, a client would likely GET a resource, modify property
values, and then PATCH to commit changes.

PUTing to a resource replaces the content of the resource with new
values. This is used in cases with a client can simply set a resource
to desired state.

#### Create, Use, Delete:  POST/GET/DELETE (non-idempotent)

POSTing to a resource creates a new instance of a child resource.  This
is typically used for data models where items must be created and deleted.
Examples include creating new user accounts, deleting user accounts, new log
entries, adding or removing licenses, etc.  These items may support delete as
well.  Creation is performed by POSTing content to a URI.  The newly created
resource is a child of that URI and may be deleted by DELETE to the new URI.

#### Do Action:  POST with "Action" property (non-idempotent)

POSTing to an action returned in the Actions property of a resource results in the
execution of the custom action.  This pattern is not idempotent because re-posting
the same content will result in additional work being performed.  An example of
a custom action might be sending a test event or clearing a log.

### Conclusion
The Scalable Platform Management API represents a new style of programming for IT that is capable of managing systems from hyper-scale to blades to stand alone servers in a consistent manner.  We believe it represents a natural evolution that fits customer demand as well as the tools being used by those customers.

## Common Use Cases#
### Finding Sensors for a System
### Chassis within Chassis
### Subscribing to Events

