---
DocTitle: Redfish Resource and Schema Guide
DocNumber: '2046'
DocClass: Informative
DocVersion: '2018.3'
modified: '2018-12-14'
status: published
released: True
copyright: '2017-2018'
---

# Redfish Schemas - User Documentation

This document contains details about schema properties defined by the Redfish Specification. This information is used by a documentation generator to create the Redfish Resource and Schema Guide (DSP2046). Proper use of section headers allows for the generator to incorporate the additional information automatically.  

The Redfish Documentation Generator uses this file to create the Redfish Resource and Schema Guide. The tool uses Markdown section headers to locate and integrate text into the various portions of the document as follows:

- Introduction - All text in the Introduction section until the next major header is included as the head of the document.
- Postscript - All text in the Postscript section until the next major header is appended to the end of the document.
- Schema Supplement: This section contains all the schema-specific information, property details, and sample payloads.  
    - Second-level headers in this section indicate the name of the Schema.  The section must be named "Schema_<major version>" for integration, for example "Processor_1".

### Property descriptions

Individual property documentation can be added by using a third-level header in this section.  The header must match the property name within a schema.  This includes properties in embedded objects within a resource.

### Replacement description

A "Description" third-level section can be used to supplement the "Description" text from the schema file.  The text here is appended to the schema description.

### Sample JSON payload

A "JSONPayload" section can contain a JSON payload example for this schema.  This sample will be appended to the end of that schema's section, and will also populate the language-specific tab in the Slate documentation.

--------------------------------- DOCUMENTATION GENERATOR INPUT OPTIONS ----------------------------------------

# Schema URI Mapping

Map schema URIs to local files. You may omit the protocol (e.g., https://) from the URI.
The doc generator will use the local files when specified and otherwise
follow the full URI, including data from remote files if possible.

## Local-repo: redfish.dmtf.org/schemas/v1 ./json-schema
## Local-repo: redfish.dmtf.org/schemas/swordfish/v1 ../Swordfish/json-schema

# Keyword Configuration

Keywords and their values as bullet points with name:value pairs in the "Keyword Configuration" section, as shown here. Keywords are not case-sensitive.

- omit_version_in_headers: false
- add_toc: true

Note: you can specify the location of the TOC, presumably in the Introduction section, by placing the text [add_toc] where you want the Table of Contents substituted in. By default, the TOC will be placed at the top of the HTML output.

# Description Overrides

Note: markdown is allowed in description overrides, but HTML markup is not; it will be escaped.

* Oem: See the OEM object definition in the [Common properties](#common-properties) section.
* Redundancy: A reference to a set of Redundancy entities that provide redundant services for this resource. See the [Redundancy](#redundancy) object definition in the Common objects section.


# Units Translation

String-replacement for "units" values. Case-sensitive. Any units not matched will be output as-is.

| Value            | Replacement      |
| ---------------- | ---------------- |
| s                | seconds          |
| Mb/s             | Mbits/second     |
| By               | bytes            |
| Cel              | Celsius          |
| MiBy             | mebibytes        |
| W                | Watts            |
| V                | Volts            |
| mW               | milliWatts       |
| m                | meters           |

# Excluded Properties

The Excluded properties clause removes properties from the root level of any schema section.  Instances of the property within embedded objects are retained.  If the excluded properties require documentation, include it in the Introduction clause of this document.

## @odata.context
## @odata.type
## @odata.id
## @odata.etag
## Name
## Id
## Description
## Oem


# Excluded Annotations

These annotations are removed from the schema details in all cases.  If the excluded annotations require documentation, include them in the Introduction clause of this document.

## *@odata.count
## *@odata.navigationLink

# Excluded Schemas

Some schemas are excluded from the documentation for clarity.  Since all Redfish collections are based on the same structure, this is documented in the Introduction clause to reduce repetition in the document.

## *Collection
## HostedStorageServices
## StorageService
## StorageSystem
## idRef
## Oem


# Bugs

1) Deprecated statements are picked up from errata versions - should only report major/minor version.  Workaround is in place in the doc generator to only check v1.x.0 for deprecated properties/enumerations.

2) Redundancy description override not being picked up - may be due to array definition?

3) Enum version added is picking up errata versions due to generated JSON schemas. Schema issue, not a doc generator problem.  See Processor/ProcessorType Core and Thread (show 1.0.5).  See UpdateService/TransferProtocolType NFS (should show 1.3+)

# Doc generator open enhancements list

1) For global description replacement - allow a choice to either replace the 'base' description and allow for appended details (created by the docgen), or a complete replacement, suppressing any docgen additions.  Base description is useful for enhanced descriptions beyond the schema contents.  Complete replacement is useful for the common properties and other conditions where the normal docgen additions are counter-productive.

2) Manual whitelist for Common Objects section - "Redundancy" examples - these should be then handled as if they were detected to be Common Objects.


------------------------------------------ RELEASE PROCESS -----------------------------------------------

# Manual Fix-ups required prior to Release

A number of corner-case issues have been found in the schema definitions which can be addressed over time with additional special cases in the documentation generator.  Until those have been addressed, the following steps must be taken to correct the HTML output before publication:

1) Remove reference to the Resource schema from the Common Object definitions for OEM and Links.  

2) Re-order Redundancy placement in the Common Objects section into alphabetical order.  Redundancy is manually added to the section currently - this will be added via a whitelist option in a future version.  It is not detected as a common object because of its definition as a referenceable member (as well as a standalone schema file). 

------------------------------------------ SCHEMA GUIDE BEGINS HERE --------------------------------------

# Introduction

<p align="right">
  <img src="http://redfish.dmtf.org/sites/default/files/DMTF_Redfish_logo_R.jpg" alt="DMTF Redfish" width=180>
</p>
<p align="right">Document Identifier: <span class="dsp">DSP2046</span></p>
<p align="right">Date: 2018-12-15</p>
<p align="right">Version: <span class="version">2018.3</span></p>
<br><br><br>
<h1 class="title">Redfish Resource and Schema Guide</h1>
<br><br><br><br><br>
<br><br>
<br><br>
<b><p>Document Class: Informative</p>
<p>Document Status: <span class="status">Published</span></p>
<p>Document Language: en-US</p></b>
<br>
   <p>Copyright Notice</p>
    <p>Copyright &copy; 2016-2018 DMTF. All rights reserved.
<br><br>
  <p>DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. Members and non-members may reproduce DMTF specifications and documents, provided that correct attribution is given. As DMTF specifications may be revised from time to time, the particular version and release date should always be noted.</p>
  <p>Implementation of certain elements of this standard or proposed standard may be subject to third party patent rights, including provisional patent rights (herein "patent rights"). DMTF makes no representations to users of the standard as to the existence of such rights, and is not responsible to recognize, disclose, or identify any or all such third party patent right, owners or claimants, nor for any incomplete or inaccurate identification or disclosure of such rights, owners or claimants. DMTF shall have no liability to any party, in any manner or circumstance, under any legal theory whatsoever, for failure to recognize, disclose, or identify any such third party patent rights, or for such party's reliance on the standard or incorporation thereof in its product, protocols or testing procedures. DMTF shall have no liability to any party implementing such standard, whether such implementation is foreseeable or not, nor to any patent owner or claimant, and shall have no liability or responsibility for costs or losses incurred if a standard is withdrawn or modified after publication, and shall be indemnified and held harmless by any party implementing the standard from any and all claims of infringement by a patent owner for such implementations.</p>
  <p>For information about patents held by third-parties which have notified the DMTF that, in their opinion, such patent may relate to or impact implementations of DMTF standards, visit <a href="http://www.dmtf.org/about/policies/disclosures.php">http://www.dmtf.org/about/policies/disclosures.php</a>.</p>
  <p>This document's normative language is English. Translation into other languages is permitted.</p>
  <br>

# Contents
[add_toc]


# Overview

The Redfish standard comprises a set of specifications maintained by the Redfish Forum, a working group within the DMTF. The standard defines a protocol that uses RESTful interfaces to provide access to data and operations associated with the management of systems and networks. One of the strengths of the Redfish protocol is that it works with a wide range of servers: from stand-alone servers to rack-mount and bladed environments to large-scale data centers and cloud environments.

The Redfish standard addresses several key issues for infrastructures that require scalability. Large infrastructures often consist of many simple servers of different makes and types. This hyper-scale usage model requires a new approach to systems management. The Redfish Scalable Platforms Management ("Redfish") protocol addresses these needs by providing a standard protocol based on out-of-band systems management.

With the above goals in mind, the Redfish protocol was designed as an open industry standard to meet scalability requirements in multi-vendor deployments. It easily integrates with commonly used tools, using RESTful interfaces to perform operations and using JSON and OData formats for data payloads.

## Who should read this document?

This document is useful to people who want to understand how to use the Redfish API. This includes application developers who want to create client-side software to communicate with a Redfish service, and other consumers of the API. 

## Where can I find more information?

The following web sites provide more information about the Redfish standard:

* **Redfish Developer Hub:**  <a href="http://redfish.dmtf.org">http://redfish.dmtf.org</a> Resources for developers building applications using Redfish.  Contains an interactive schema explorer, hosted schema and other links. 
* **Redfish User Forum:**  <a href="http://www.redfishforum.com">http://www.redfishforum.com</a> User forum monitored by DMTF Redfish personnel to answer questions about any Redfish-related topics: 
* **DMTF Github Repositories:**  <a href="http://www.github.com/DMTF">http://www.github.com/DMTF</a> Open source tools and libraries for working with the Redfish API.
* **Redfish Standards:**  <a href="http://www.dmtf.org/standards/redfish">http://www.dmtf.org/standards/redfish</a>  Schemas, specs, mockups, white papers, FAQ, educational material and more.
* **DMTF Redfish Forum** (Working group that maintains the Redfish standard):  <a href="http://www.dmtf.org/standards/spmf">http://www.dmtf.org/standards/spmf</a> Companies involved, upcoming schedules and future work, charter, and information about joining.

# Using this guide

Every Redfish API response consists of a JSON payload containing properties that are strictly defined by a schema for that resource.  The schema defining a particular resource can be determined from the value of the "@odata.type" property returned in every Redfish response.  This guide details the definitions for every Redfish standard schema.

Each schema section contains:

* The name, current version and description of the schema.
* A listing of the possible URIs where resources defined by this schema can appear in a Redfish Service (v1.6 or later). See [URI listings](#uri-listings) below for more information.
* A table defining each property with additional details for those properties when needed.
* A listing of the available Actions defined for the schema.
* An example JSON payload for a resource using the schema.

<br>
The property-level details include:

| Column | Purpose |
|--------|---------|
| Property Name | The name of the JSON property as it will appear (case sensitive) in the JSON payload.  For properties added to the schema after the initial release (v1.0.0), the version that the property was added will be shown in parenthesis.  Properties that have been deprecated will also be indicated (along with the version where the deprecation occurred). |
| Type | The JSON data type(s) for the property.  This can include boolean, number, string or object. String types that use defined enumerations will state "(enum)".  Number types will state their units where used. |
| Attributes | Designates whether the property is read-only or read-write (if supported by the implementation), and whether a 'null' value may be returned by the Service if the value of the property is temporarily unavailable. |
| Description | The description of the property, as copied directly from the schema 'Description' definition. |

## URI listings

The Redfish Specification v1.6.0 added mandatory support for the OpenAPI Specification v3.0.  As part of this support, the URIs for every Redfish Resource are defined to appear at known, fixed locations. Resource Collections also appear at fixed locations, with the Members of each collection appearing at URIs constructed using a fixed path structure, with appropriate path segments equal to the value of "Id" properties of Members along the path.  

Support for v1.6.0 and OpenAPI can be determined by comparing the value of the "RedfishVersion" property in the Service Root (\redfish\v1\).  Services reporting a value of "1.6.0" or higher (such as "1.6.1" or "1.7.0") adhere to the URI definitions shown.

The URI listings do not apply to Redfish Services reporting support of Specification versions prior to v1.6.0.  For those Services, clients must utilize the hypermedia features of the API to discover links from the Service Root to each resource.  While Services will typically match the URIs listed in this documents for many of their resources, this is not guaranteed and will result in errors.


# Common properties

## Properties defined for all Redfish schemas

The following properties are defined for inclusion in every Redfish schema, and therefore may be encountered in any Response payload.  They are documented here to avoid repetition in the Reference Guide property tables.  Note that several of these properties are payload annotations, but are listed here as they are required for all Redfish resources.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/CommonProperties/properties

## Frequently used properties

In addition, the following properties are frequently defined in Redfish schemas.  Their definition and usage is the same throughout the Redfish data model.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/FrequentProperties/properties

## Payload annotations

Payload annotations are a mechanism in which a service provides additional information about a given property or object.  Redfish limits usage of these annotations to OData core terms, Redfish Extensions or Redfish Messages.

### Property-level annotations

A payload annotation for a single property takes the form of an additional property named `Property@Schema.Term`, where `Property` is the JSON property being annotated, `Schema` is the schema file where the definition for the annotation is found, and `Term` is the name of the Annotation.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/PropertyAnnotations/properties

In the example below, the property `ResetType` is being annotated with the `AllowableValues` term, which is defined in the `Redfish` schema (an alias for RedfishExtensions).  This is used to indicate to the client that the service supports the values `On` and `ForceOff` for `ResetType`.

```json
{
    "ResetType@Redfish.AllowableValues": [
        "On",
        "ForceOff"
    ]
}
```


### Resource or object-level annotations

A payload annotation for an entire resource or a JSON object takes the form of `@Schema.Term`, where `Namespace` is the schema file where the definition is found and `Term` is the name of the Annotation.  These payload annotations are used to provide further information about the object itself.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/ResourceAnnotations/properties

In the example below, the object is being annotated with the `ActionInfo` term, which is defined in the `Redfish` schema (an alias for RedfishExtensions).  This is used to indicate to the client that it can find more information about the given action, in this case `#ComputerSystem.Reset`, at the URI `/redfish/v1/Systems/1/ResetActionInfo`.

```json
{
    "#ComputerSystem.Reset": {
        "target": "/redfish/v1/Systems/1/Actions/ComputerSystem.Reset",
        "@Redfish.ActionInfo": "/redfish/v1/Systems/1/ResetActionInfo"
    }
}
```

# Common objects
 
The following JSON objects are frequently defined in Redfish schemas.  Like the individual common properties listed above, these objects share a common definition which is shown here to avoid repetition in the Reference Guide property tables.

[insert_common_objects]

## Redundancy

This is the redundancy definition to be used in other resource schemas.

#include_fragment ./json-schema/Redundancy.v1_3_1.json#/definitions/Redundancy/properties


# Resource collections

A core concept in Redfish is a Collection of resources.  A Collection is a group of like resources where the number of instances in the group can shrink or grow depending on the scope of the Redfish Service or the configuration of the devices being managed. Every Resource Collection resource has the same set of supported properties, and all contain "Collection" in the name of their schema.  Every resource linked in the "Members" array within a Resource Collection will have the same resource type (same schema with the same major version, but can vary in minor or errata schema versions, which are all compatible).

The properties of a Resource Collection are as follows:

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/Collection/properties

As shown in the example below, a Redfish Service may provide management functionality for several Computer Systems, and therefore a ComputerSystemCollection resource is provided.  This example shows a Service with four ComputerSystem instances ("Members").

~~~json
{
    "@odata.type": "#ComputerSystemCollection.ComputerSystemCollection",
    "Name": "Computer System Collection",
    "Members@odata.count": 4,
    "Members": [
        {
            "@odata.id": "/redfish/v1/Systems/529QB9450R6"
        },
        {
            "@odata.id": "/redfish/v1/Systems/529QB9451R6"
        },
        {
            "@odata.id": "/redfish/v1/Systems/529QB9452R6"
        },
        {
            "@odata.id": "/redfish/v1/Systems/529QB9453R6"
        }
    ],
    "@odata.context": "/redfish/v1/$metadata#ComputerSystemCollection.ComputerSystemCollection",
    "@odata.id": "/redfish/v1/Systems"
}

~~~

## Resource Collection URIs (Redfish v1.6+)

The following table lists all of the Redfish-defined Resource Collections and the URIs where they can appear.  NOTE: The URIs listed are valid for Redfish Services conforming to the Redfish Specification v1.6.0 or higher.  Services built on earlier versions of the Specification may use different URIs which must be discovered by following the links from the Service Root (/redfish/v1/).

[insert_collections]


# Reference Guide

This guide was produced using the contents of the schema files from DMTF Redfish Schema bundle DSP8010 version 2018.3 and merged with supplemental text using the DMTF's [Redfish Documentation Generator](#redfish-documentation-generator).  


# Schema Supplement

## AccelerationFunction

### Mockup
mockups/DSP2046-examples/AccelerationFunction-v1-example.json

## AccountService

### Mockup
mockups/DSP2046-examples/AccountService-v1-example.json

## ActionInfo

### Mockup
mockups/DSP2046-examples/ActionInfo-v1-example.json

## Assembly

### Mockup
mockups/DSP2046-examples/Assembly-v1-example.json

## Bios

### Mockup
mockups/DSP2046-examples/Bios-v1-example.json

## Certificate

### Mockup
mockups/DSP2046-examples/Certificate-v1-example.json

## CertificateLocations

### Mockup
mockups/DSP2046-examples/CertificateLocations-v1-example.json

## CertificateService

### Mockup
mockups/DSP2046-examples/CertificateService-v1-example.json



## Chassis

### Mockup
mockups/DSP2046-examples/Chassis-v1-example.json

## CompositionService

### Mockup
mockups/DSP2046-examples/CompositionService-v1-example.json

## ComputerSystem

### Mockup
mockups/DSP2046-examples/ComputerSystem-v1-example.json

### Property Details

#### UUID

The UUID property contains a value that represents the universal unique identifier number (UUID) of a system.  

The UUID property is a string data type. The format of the string is the 35-character string format specified in RFC4122: "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx". Each x represents a hexadecimal digit (0-f).

Regarding the case of the hex values, RFC4122 specifies that the hex values should be lowercase characters. Most modern scripting languages typically also represent hex values in lowercase characters following the RFC. However, dmidecode, WMI and some Redfish implementations currently use uppercase characters for UUID on output.

## Drive

### Mockup
mockups/DSP2046-examples/Drive-v1-example.json

## Endpoint

### Mockup
mockups/DSP2046-examples/Endpoint-v1-example.json

## EthernetInterface

### Mockup
mockups/DSP2046-examples/EthernetInterface-v1-example.json

## EventService

### Mockup
mockups/DSP2046-examples/EventService-v1-example.json

## EventDestination

### Mockup
mockups/DSP2046-examples/EventDestination-v1-example.json

## ExternalAccountProvider

### Mockup
mockups/DSP2046-examples/ExternalAccountProvider-v1-example.json

## Fabric

### Mockup
mockups/DSP2046-examples/Fabric-v1-example.json

## Job

### Mockup
mockups/DSP2046-examples/Job-v1-example.json

## JobService

### Mockup
mockups/DSP2046-examples/JobService-v1-example.json

## LogEntry

### Mockup
mockups/DSP2046-examples/LogEntry-v1-example.json

## LogService

### Mockup
mockups/DSP2046-examples/LogService-v1-example.json

## Manager

### Mockup
mockups/DSP2046-examples/Manager-v1-example.json

## ManagerAccount

### Mockup
mockups/DSP2046-examples/ManagerAccount-v1-example.json

## ManagerNetworkProtocol

### Mockup
mockups/DSP2046-examples/ManagerNetworkProtocol-v1-example.json

## Memory

### Mockup
mockups/DSP2046-examples/Memory-v1-example.json

## MemoryChunks

### Mockup
mockups/DSP2046-examples/MemoryChunks-v1-example.json

## MemoryDomain

### Mockup
mockups/DSP2046-examples/MemoryDomain-v1-example.json

## MemoryMetrics

### Mockup
mockups/DSP2046-examples/MemoryMetrics-v1-example.json

## MetricDefinition

### Mockup
mockups/DSP2046-examples/MetricDefinition-v1-example.json

## MetricReportDefinition

### Mockup
mockups/DSP2046-examples/MetricReportDefinition-v1-example.json

## MetricReport

### Mockup
mockups/DSP2046-examples/MetricReport-v1-example.json

## PCIeSlots

### Mockup
mockups/DSP2046-examples/PCIeSlots-v1-example.json

## Port

### Mockup
mockups/DSP2046-examples/Port-v1-example.json

## Power

### Mockup
mockups/DSP2046-examples/Power-v1-example.json

## Processor

### Mockup
mockups/DSP2046-examples/Processor-v1-example.json

## ProcessorMetrics

### Mockup
mockups/DSP2046-examples/ProcessorMetrics-v1-example.json

## ResourceBlock

### Mockup
mockups/DSP2046-examples/ResourceBlock-v1-example.json

## Role

### Mockup
mockups/DSP2046-examples/Role-v1-example.json

## Sensor

### Mockup
mockups/DSP2046-examples/Sensor-v1-example.json

## SerialInterface

### Mockup
mockups/DSP2046-examples/SerialInterface-v1-example.json

## ServiceRoot

### Mockup
mockups/DSP2046-examples/ServiceRoot-v1-example.json

## SessionService

### Mockup
mockups/DSP2046-examples/SessionService-v1-example.json

## Session

### Mockup
mockups/DSP2046-examples/Session-v1-example.json

## SimpleStorage

### Mockup
mockups/DSP2046-examples/SimpleStorage-v1-example.json

## SoftwareInventory

### Mockup
mockups/DSP2046-examples/SoftwareInventory-v1-example.json

## Storage

### Mockup
mockups/DSP2046-examples/Storage-v1-example.json

## Switch

### Mockup
mockups/DSP2046-examples/Switch-v1-example.json

## Task

### Mockup
mockups/DSP2046-examples/Task-v1-example.json

## TaskService

### Mockup
mockups/DSP2046-examples/TaskService-v1-example.json

## TelemetryService

### Mockup
mockups/DSP2046-examples/TelemetryService-v1-example.json

## Thermal

### Mockup
mockups/DSP2046-examples/Thermal-v1-example.json

## Triggers

### Mockup
mockups/DSP2046-examples/Triggers-v1-example.json

## UpdateService

### Mockup
mockups/DSP2046-examples/UpdateService-v1-example.json

## VLanNetworkInterface

### Mockup
mockups/DSP2046-examples/VLanNetworkInterface-v1-example.json

## VirtualMedia

### Mockup
mockups/DSP2046-examples/VirtualMedia-v1-example.json

## Volume

### Mockup
mockups/DSP2046-examples/Volume-v1-example.json

## Zone

### Mockup
mockups/DSP2046-examples/Zone-v1-example.json


# Postscript

# Redfish documentation generator

This document was created using the Redfish Documentation Generator utility, which uses the contents of the Redfish schema files (in JSON schema format) to automatically generate the bulk of the text.  The source code for the utility is available for download at the DMTF's Github repository located at <a href="http://www.github.com/DMTF/Redfish-Tools">http://www.github.com/DMTF/Redfish-Tools</a>.

# ANNEX A

## Change log

| Version  | Date     | Description     |
| ---      | ---      | ---             |
| 2018.3  | 2018-12-15 | Release built from Redfish schemas released in DSP8010 version 2018.3 |
| 2018.2  | 2018-08-10 | Release built from Redfish schemas released in DSP8010 version 2018.2 |
|         |            | Expanded introduction section with additional information. |
|         |            | Expanded Common Objects section to include previously excluded objects. |
|         |            | Added URI listings for all resources for use with Redfish Specification v1.6.0 |
|         |            | Added Resource Collection table showing schema names and URIs. |
|         |            | Restructured common objects section utilizing new Documentation Generator functions. |
| 2018.1  | 2018-05-01 | Initial release. Built from Redfish schemas released in DSP8010 version 2018.1 |
| 2017.0a | 2017-05-19| Work in progress release to gather feedback on content and format. |
