# Redfish Readme #
The following files are part of the Redfish development effort

* RedfishSpec.md - this files is the main Redfish Specification
* Whitepaper.md - this is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish service and understand common functions and tasks
* FAQ.md - this file contains some of the reasoning behind decisions made in the development of Redfish.
* Readme.md - this document.
  
The following directories are part of the Redfish development effort
* Mockup - this is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the initial Redfish Schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes. 
* Schema - this contains the Redfish Schema definitions.  These files are normative in nature and are normatively reference by the Redfish Specification.

# Interacting with the Mockup #
## Setting up and accessing the Mockup ###
You can view the markup either directly or through a webserver.
### Directly ###
If you are viewing the files directly either through GitHub or a browser, you can get the html files to load in your browser.  If you are viewing it in your browser, then make sure you have a JSON viewer loaded as it will help make the mockup more user friendly.

### Via Webserver ###
Double click `run.bat` inside the Mockup folder to start a local server accessible at [http://localhost:9080/rest/v1](http://localhost:9080/rest/v1).  It will look almost like a real service from the GET perspective (the headers will not be the same).
  
Keep in mind that this is a mockup, not a prototype.  But you can do GETs on it and see JSON so it’s as real on the READ side as any prototype (except for ETags and some of the headers).  If you get a plug-in for Chrome or Opera that does REST (there are some free ones out there) or a JSON decoder for pages, you will improve the experience.  The plug-ins let expand and collapse structures making it very easy to interact with.

## Concepts ##
Every URI represents a resource.  This could be a service, a collection, an element or some other construct.  But in RESTful terms, these URIs point to resources and clients interact with Resources.  So when you see the term resource, you can think of it as what you get back when you access a URI.

The resource format is defined by a Schema.  Each resource has a specific format that is specified in the Redfish Schema that the client can use to determine the semantics about the resource (though we try to make things as intuitive as possible).  The Redfish Schema is defined in JSON Schema format.

All properties in the resource are intended to be used as JavaScript variables.  This should accelerate adoption and allow JavaScript web pages and enabled apps to use the data directly.  URIs are persistent across reboots but clients are expected to start at /rest/v1 and do discovery of the URIs from there.  This is known as a "hypermedia API" approach.  Don't fixate on the URIs as URIs can be different between implementations.  Current state objects can be separate from desired state objects.   
The section below works better if you are actually doing the GETs 

### Starting: ###
All clients start at the base /rest/v1 object.  Many items are broken down in arrays of references for scalable environments.  Links to other resources are in the "links" section.  You can see links to Systems, managers, the physical Chassis as well as services like Eventing, Tasks, Schema (meta data)). (Note – discovery of Redfish service endpoints will be done using UPNP’s SSDP but that’s not in the mockup).

### Versioning: ###
Redfish has two kinds of versioning - the version of the protocol and the version of the resource schema.  The version of the protocol is in the URI - that's why you should start at /rest/v1.  It means you are accessing version one of the protocol.

Each resource has its class definition and version number right up front, along with the time this property was modified  and the Name of the object.  All objects have these three properties.  There are rules around what the version means too.  So when you see "Type" : "RedfishService.1.0.0", you are dealing with an object that adheres to the 1.0.0 version of the RedfishService's JSON Schema.

### References ###
When you see the links section, it will have a set of references to other resources in it.  URIs are either absolute or relative.  Absolute ones won’t have the IP address but will start with /rest/v1.  If you have a plug in like the Chrome Advanced REST client, you can click on this to fill in the URI for your next GET.  However, if it starts with . or .., treat it like a directory where . means “current level” and .. means go back up one level.  There are very few if any of these. 

### Main Objects ###
The "main" objects are Systems, Managers and Chassis.  These are all collections (see next heading).  We will dig into these resources in a minute, but it's good to know a bit about them.  Systems can have one or more managers (since some managers are redundant), and are in one chassis.   Managers are in a Chassis and can manage more than one system.  And Chassis can house more than one System and/or Managers.  Chassis can also have Chassis in them.  It is the chassis that houses sensors, fans and the like.  Systems have the CPU/Memory complex and devices and managers handle various management services but also have their own devices (like NICs).  This is just an overview, but looking at the base object you can see this right away. 

### Collections ###
There are groups of similar resources called collections.  Examples of these in the Mockup include Systems, Managers, Chassis, LogEntries, Sessions, EventSubscriptions and more.  

So pick either Systems, Managers or Chassis and go down into it.  You will see this is a Collection.  All collections are the same Redfish Schema type.  You determine the type of members in the collection by looking at the MemberType property.  Collections may be paginated, so that's what "NextPage" and items like that are for.

Collections may have a list of links to the members in the links object called "Members".  Members is an array and it can contain hrefs or use links properties called "id" and "frag".  There might also be a section called "Items".  Items will contain the actual object from the collection if it is there.  This is usually only done in collections with lots of small members, like LogEntrys and Sessions.

Going back to links, the Members will have either an href, id or frag.  href contains an actually URI.  Frag is used if Items is there to let you know which element of the Items array this corresponds to.  Id is there as a partial URI that you would append to the URI of the collection to get the resource.  While URIs are opaque, appending two opaque objects together doesn't imply understanding context.  

### Current Configurations vs Settings ###
There are basically two kinds of objects in Redfish - Current Configurations and Settings.  Most objects represent the current state of any given resource.  Occasionally, you'll see a property called "Settings" in the links section for a resource.  This link tells you where to do PUTs and PATCHes.  It represents the future state of the resource.  Some resources can handle changes to them right away, others may require a restart/reboot of the system or service.  "Settings" is used to let the client know what type of resource this is and where to make the changes.  If you see a Settings link, that's where to make the changes that will be picked up at the next reboot.  Examples of resources that need Settings are devices like NICs and Storage as well as BIOS.

### Common Properties ###
As you go through the model, you keep seeing some of the same properties.  You'll find Name, Modified and Type in every resource.  These are required.  You'll also see Status as an embedded object and it has the same definition across all usages.  All of these are actually in a common part of the Schema and used by other Schema by reference.

### Actions ###
Not everything can be done well using REST.  So we made Actions.  Things like "push button" on a System (which would reset the system or turn it off) can't be presented in the System because the Redfish Service has no idea what the state of the button is.  

So instead of having hidden properties that you could PUT/PATCH to, or complex state machines, we created Actions.  Actions are done with POSTs to the Resource (see the spec for specifics).  You can tell what actions are supported in any resource by looking for the "AvailableActions" property.

### CorrelatableIDs ###
Go back to one of the Chassis and take a look at the fans and how we show redundancy.  You will notice each fan has a property called “CorrelatableID”.  Now look at the fan redundancy set.  It shows the two fans in its set using the same values in the CorrelatableID properties.  Thus the client can figure out which belongs to which.

You can't really have hrefs that point inside of objects, though JSON Pointer can do this.  But not all clients can understand JSON pointer.  So how do you do fan redundancy without hrefs?  The way we did it is with CorrelatableIDs - an opaque string that is the same for like items.  So the Fans all have IDs and the RedundancySet has an ID and the fans can point to the RedundancySet's ID and vice versa.

The manager isn't expected to directly provide all of the data in Redfish, given the advent of PMCI.  Thus providers have no knowledge of URIs to other providers.  So how do you correlate a PCI slot with a NIC?  The Redfish way for providers that know nothing about each other is to come up with a CorrelatableID that they can all figure out on their own.  Take UEFI device path - every PCI device knows its BDF and can figure out its UEFI device path.  Thus it makes an excellent correlatableID for the Client to be able to figure out the PCI settings for the NIC (in this case). 

Thus everything that has the same Correlatable ID in objects that all refer to different views or aspects of the same device or thing.

### ETags ###
ETags are used by browsers to optimize IO (caching).  They do an If-Match and if it matches, they don’t bother dragging the data.  We use them to determine if an object has changed.  Thus every ETag will change if a PUT is done or if a tool (like BIOS config at the console) takes place.  Thus any race condition on PUTs between Redfish and non-Redfish clients (as well as Redfish clients) are always noticed.

The problem is that this is a mockup and not a real web service so you can't see the ETags work.

### Services  ###
Let's go back to root and take a look at some common services.  Tasks, Sessions, EventService and AccountService are all common services.  You can read more about them in the spec, but they should be fairly obvious.  Tasks contains a list of jobs that may have been started, usually as the result of Actions. 

### So what's Classes? ###
Classes from the root is where we store any local JSON Schema or registries.  While most clients will get these from a yet-to-be-determined location on the web, these may be available locally should the service provide it.

## Enough for now ##
Hopefully the information will have been enough for now to get you up to speed and you can start perusing the mockup and reading the spec as well as the schema to get an idea of how all of this works.
