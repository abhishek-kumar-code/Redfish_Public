---
DocTitle: Scalable Platforms Management API Mockup Readme
DocNumber: '2043'
DocClass: Informative
DocVersion: '1.2.0'
modified: '2017-11-17'
status: released
released: true
copyright: '2015-2017'
---

# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Scalable Platforms Management API Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.

These other components are part of the Redfish Scalable Platforms Management API development effort
* DSP2043 - Redfish Mockup - this is set of mockups that can be used as sample of output from GETs from A Redfish service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.

# Redfish Mockups

This archive contains a number of mockups of various Redfish service implementations.  They are intended to be a guide for learning about the Redfish Specification by showing typical examples of implementations.  These mockups are not prototypes and do not reflect any actual product or Redfish implementation.

Many of these mockups are also used to populate the Redfish Resource Explorer, part of the Redfish Developer Hub located at: http://redfish.dmtf.org

## Simple Rack-mounted server (public-rackmount1)

This illustration of a Redfish service implementation shows a typical rack-mount server, as commonly used in scale-out data centers. It depicts the types of information that can be expected, but does not represent an actual implementation.

## Bladed Server (public-bladed)

This example represents an enclosure of "blade servers" that share infrastructure components, such as power supplies and fans. Depicting an enclosure containing four blade servers (a total of five "Chassis"), this mockup demonstrates the modeling of multiple chassis and systems managed from a single Redfish service.

## Local Storage (public-localstorage)

This example shows a server with an implementation of the Redfish storage schemas, showing an integrated RAID controller with four attached drives.

## SAS Fabric (public-sasfabric)

This example shows a more complex storage implementation using a pair of SAS switches (fabric), storage enclosures and multiple storage devices.

## Proposed OCP Redfish Profile (public-catfish)

This draft example, for ongoing development, represents a proposed minimal Redfish data model "profile" that meets the needs of the Open Compute Project's Hardware Management requirements. This draft profile is intended to help define a list of required properties so that essential management-related tasks, as defined by OCP, can be performed on any Redfish implementation. 

## Composable Systems (public-composability)

This example shows a service with various sets of disaggregated hardware as resources. It provides an example composed system utilizing some of the disaggregated hardware. It also shows how Resource Zones can provide information about binding restrictions.

## Bladed Partitions (public-bladed-partitions)

This example shows how Redfish Composability can be used to create composed Computer System instances from smaller sets of Computer Systems. A top level enclosure called "Enclosure" contains a set of blades, which are used to create the composed Computer Systems.

## Concepts ##

Every URI represents a resource, which could be a service, a collection, an element or some other construct.  But in RESTful terms, these URIs point to resources and clients interact with Resources.  So when you see the term resource, you can think of it as what you get back when you access a URI.

The resource format is defined by a Schema.  Each resource has a specific format that is specified in the Redfish Schema that the client can use to determine the semantics about the resource (though we try to make things as intuitive as possible).  The Schema is defined in OData's Schema format.

All properties in the resource are intended to be used as JavaScript variables.  This should accelerate adoption and allow JavaScript web pages and enabled apps to use the data directly.  URIs are persistent across reboots but clients are expected to start at /redfish/v1 and do discovery of the URIs from there.  This is known as a "hypermedia API" approach.  Don't fixate on the URIs as URIs can be different between implementations.  Current state objects can be separate from desired state objects.
The section below works better if you are actually doing the GETs

### Starting ###

All clients start at the base /redfish/v1 object.  Many items are broken down in arrays of references for scalable environments.  Links to other resources are in the "links" section.  You can see links to Systems, managers, the physical Chassis as well as services like Eventing, Tasks, Schema (meta data)). (Note - discovery of service endpoints will be done using UPNP's SSDP but that's not in the mockup).

### Versioning ###

Redfish has two kinds of versioning - the version of the protocol and the version of the resource schema.  The version of the protocol is in the URI - that's why you should start at /redfish/v1.  It means you are accessing version one of the protocol.  Version 1 is the only one available now, but we needed to accommodate potential future versions.

Each resource has a resource type definition. Resource types are defined in versioned namespaces. Each resource instance has the type represented using the OData type annotation "@odata.type". The value of the type annotation is the URI of the resourcce type, including the versioned namespace.  So when you see "@odata.type" : "#ServiceRoot.v1_0_0.ServiceRoot", you are dealing with a resource that adheres to the ServiceRoot type definition, defined in 1.0.0 version of the ServiceRoot schema.  The corresponding schema file would be located at /schema/v1/ServiceRoot in the Redfish schema repository. So the full URI for the type would be "/schem/v1/ServiceRoot#ServiceRoot.v1_0_0.ServiceRoot. The schema file may contain other types used by in the resource type definition (for example, structured types and enums), which would have the same resource path but the fragment would describe a different type definition, typically within the same namespace.

### References ###

When you see the links section, it will have a set of references to other resources in it.  URIs are either absolute or relative.  Absolute ones won't have the IP address but will start with /redfish/v1.  If you have a plug in like the Chrome Advanced REST client, you can click on this to fill in the URI for your next GET.

### Main Objects ###

The "main" objects are Systems, Managers and Chassis.  These are all collections (see next heading).  We will dig into these resources in a minute, but it's good to know a bit about them.  Systems can have one or more managers (since some managers are redundant), and are in one chassis.   Managers are in a Chassis and can manage more than one system.  And Chassis can house more than one System and/or Managers.  Chassis can also have Chassis in them.  It is the chassis that houses sensors, fans and the like.  Systems have the CPU/Memory complex and devices and managers handle various management services but also have their own devices (like NICs).  This is just an overview, but looking at the base object you can see this right away.

### Collections ###

There are groups of similar resources returned as collections.  Examples of these in the Mockup include Systems, Managers, Chassis, LogEntries, Sessions, EventSubscriptions and more.

So pick either Systems, Managers or Chassis and go down into it.  You will see this is a Collection. Collections may be paginated; collections with a property named "@odata.nextLink" are incomplete, and the client can use the URL-value of the property to retrieve the next portion of the collection from the service.

Collection responses have a "value" property that contains a list of members, or links to members. Links to members are represented as JSON objects with a single "@odata.id" property containing the URI of the related resource.

### Current Configurations vs Settings ###

There are basically two kinds of objects in Redfish - Current Configurations and Settings.  Most objects represent the current state of any given resource.  Occasionally, you'll see a property called "Settings" in the links section for a resource.  This link tells you where to do PUTs and PATCHes.  It represents the future state of the resource.  Some resources can handle changes to them right away, others may require a restart/reboot of the system or service.  "Settings" is used to let the client know what type of resource this is and where to make the changes.  If you see a Settings link, that's where to make the changes that will be picked up at the next reboot.  Examples of resources that need Settings are devices like NICs and Storage as well as BIOS.

### Common Properties ###

As you go through the model, you keep seeing some of the same properties.  You'll find Name and Modified in every resource.  These are required.  You'll also see Status as an embedded object and it has the same definition across all usages.  All of these are actually in a common part of the Schema and used by other Schema by reference.

### Actions ###

Not everything can be done easily using REST, so Redfish leverages OData Actions for procedural operations.  Things like "push button" on a System (which would reset the system or turn it off, depending on its setting) can't easily be represented in the System because the service has no idea what the state of the button is.

So instead of having hidden properties that you could PUT/PATCH to, or complex state machines, we created Actions.  Actions are done with POSTs to the Resource (see the spec for specifics).  You can tell what actions are supported in any resource by looking for the "Actions" property.

### Redundancy ###

Go back to one of the Chassis and take a look at the fans by following the link to "Thermal" and you will see how Redfish shows redundancy.

You will notice an array called "Redundancy".  It shows the two fans in its set using the same values in the RelatedItem properties.  Redundancy has a common schema definition in Redfish and has other properties in it besides the members to show other important attributes about redundancy.  This is how the client can figure out which items belongs to which redundancy set since the @odata.id values are pointers to the redundancy set members.

The value of the "@odata.id" property, though, doesn't have to be to a whole resource.  The value of this property will be of two formats: a JSON Pointer or an OData reference.

- In the case of a JSON Pointer, there will be a # in it that indicates where the resource stops and where the property pattern begins.  The schema will also have a reference to the property.  An example of a JSON Pointer value might be "/redfish/v1/Chassis/1/Thermal#/Fans/0".
- In the case of an OData reference, there will not be a # in it.  The schema will have a definition of the property.  An example of a JSON Pointer value might be "/redfish/v1/Chassis/1/Thermal/Fans/0".

### RelatedItems ###
If you're still in the "Thermal" resource, you can see that the Temperature array elements have a RelatedItem property with an "@odata.id" in it.  This is a reference to the sub-resource that this temperature sensor is measuring - perhaps a processor.  Like Redudancy links, the value may be to a sub-resource.  Thus a client can determine what is being measured by this temperature sensor.

RelatedItem, while having a common schema definition, is situational dependent in it's usage.  But it always is used to show a relationship between two different resources or sub-resources.

And like redundancy, the value of the "@odata.id" property doesn't have to be to a whole resource.

### ETags ###

ETags are used by browsers to optimize IO (caching).  They do an If-Match and if it matches, they don't bother dragging the data.  We use them to determine if an object has changed.  Thus every ETag will change if a PUT is done or if a tool (like BIOS configuration at the console) takes place.  Thus any race condition on PUTs between Redfish and non-Redfish clients (as well as other Redfish clients) are always noticed.

The problem is that this is a mock-up and not a real web service so you can't see the ETags work.

### Services  ###

Let's go back to root and take a look at some common services.  Tasks, Sessions, EventService and AccountService are all common services.  You can read more about them in the spec, but they should be fairly obvious.  Tasks contains a list of jobs that may have been started, usually as the result of Actions.

### Where does a client get schema definition? ###

Payloads contain a URL that the client can use to retrieve the schema for the service. That service schema file generally references other externally hosted schema files for common schema definitions. Types within a JSON payload are identified by a dereferenceable type URI.

## Enough for now ##

Hopefully the information will have been enough for now to get you up to speed and you can start perusing the mockup and reading the spec as well as the schema to get an idea of how all of this works.
