---
DocTitle: Redfish Resource and Schema Guide
DocNumber: '2046'
DocClass: Informative
DocVersion: '2018.2'
modified: '2018-08-10'
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

# Schema URI Mapping

Map schema URIs to local files. You may omit the protocol (e.g., https://) from the URI.
The doc generator will use the local files when specified and otherwise
follow the full URI, including data from remote files if possible.

## Local-repo: redfish.dmtf.org/schemas/v1 ./json-schema

# Keyword Configuration

Keywords and their values as bullet points with name:value pairs in the "Keyword Configuration" section, as shown here. Keywords are not case-sensitive.

- omit_version_in_headers: false
- add_toc: true

Note: you can specify the location of the TOC, presumably in the Introduction section, by placing the text [add_toc] where you want the Table of Contents substituted in. By default, the TOC will be placed at the top of the HTML output.

# Description Overrides

Note: markdown is allowed in description overrides, but HTML markup is not; it will be escaped.

* Status: See the [Status object](#status-object) definition in the [Using this guide](#using-this-guide) section.
* Oem: See the OEM object definition in the [Using this guide](#using-this-guide) section.
* Location: See the [Location object](#location-object) definition in the [Common Properties](#common-properties) section.
* Identifier: See the [Identifier object](#identifier-object) definition in the [Common Properties](#common-properties) section.
* Identifiers: See the [Identifier object](#identifier-object) definition in the [Common Properties](#common-properties) section.
* IPv4Addresses: See the [IP Address objects](#ip-address-objects) definition in the [Common Properties](#common-properties) section.
* IPv6Addresses: See the [IP Address objects](#ip-address-objects) definition in the [Common Properties](#common-properties) section.

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

# Manual Fix-ups required prior to Release

A number of corner-case issues have been found in the schema definitions which can be addressed over time with additional special cases in the documentation generator.  Until those have been addressed, the following steps must be taken to correct the HTML output before publication:

1) "Location" definition in JsonSchemaFile must be restored.  This property is unfortunately named the same as the common "Location" property.  The description for Location in JsonSchemaFile is:  Location information for a schema file.

2) Remove reference to the Resource schema.  The contents of the Resource schema are documented in the Introduction section under "Common Properties".  The external references will generate an additional statement " See the Resource schema for details on this property." which is unnecessary and should be removed with a search (note that a simple text search will miss these as the HTML will contain a hyperlink).

3) Definitions moved to unversioned namespaces.  Approximately 7 properties have had their definitions moved to the unversioned namespaces, and the "versioned" property was deprecated. The documentation generator sees this as a valid deprecation and flags it (incorrectly).  These invalid deprecations should be removed, and can be located in the HTML by searching for "unversioned namespace".  Both the description and the property name "(deprecated v1.x.x)" should be edited.

4) Unit replacement errata - Unit replacements (see above) for many entries are not getting caught, likely due to units annotations or properties added after version 1.0 of a schema (speculation - this is a doc generator bug).  A search and replace can work using the "(unit)" search - e.g. "(W)" / "(Watts)"

# Doc generator open enhancements list

1) For global description replacement - allow a choice to either replace the 'base' description and allow for appended details (created by the docgen), or a complete replacement, suppressing any docgen additions.  Base description is useful for enhanced descriptions beyond the schema contents.  Complete replacement is useful for the common properties and other conditions where the normal docgen additions are counter-productive

2) Global description override - Add a tag in the schema section to suppress the global description replacements.  Useful for duplicate property names (Location is the example), or other cases where the global/common description may not be appropriate in certain instances.  

3) Ignore deprecated property annotations if property exists in unversioned schema namespace.  Properties that are moved from versioned to unversioned namespace are marked as deprecated, but this is an internal schema construct and does not indicate the property has actually been deprecated (from the user perspective).  The docgen is picking up these annotations, however, so an exception algorithm to catch these is needed.



# Introduction

<p align="right">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>
<p align="right">Document Identifier: <span class="dsp">DSP2046</span></p>
<p align="right">Date: 2018-8-10</p>
<p align="right">Version: <span class="version">2018.2</span></p>
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

The Redfish standard addresses several key issues for infrastructures that require scalability. Large infrastructures often consist of many simple servers of different makes and types. This hyperscale usage model requires a new approach to systems management. The Redfish Scalable Platforms Management ("Redfish") protocol addresses these needs by providing a standard protocol based on out-of-band systems management.

With the above goals in mind, the Redfish protocol was designed as an open industry standard to meet scalability requirements in multivendor deployments. It easily integrates with commonly used tools, using RESTful interfaces to perform operations and using JSON and OData formats for data payloads.

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

Every Redfish API response consists of a JSON payload containing properties that are strictly defined by a schema for that resource.  The schema defining a particular resource can be determined from the value of the "@odata.type" property returned in every Redfish response.  This guide details the definitions for every Redfish standard schema.  Each schema section contains a table defining each property, additional details for those properties when needed, details for the available Actions defined for the schema, and an example payload for a resource using the schema.

The property-level details include:

| Column | Purpose |
|--------|---------|
| Property Name | The name of the JSON property as it will appear (case sensitive) in the JSON payload.  For properties added to the schema after the initial release (v1.0.0), the version that the property was added will be shown in parenthesis.  Properties that have been deprecated will also be indicated (along with the version where the deprecation occurred). |
| Type | The JSON data type(s) for the property.  This can include boolean, number, string or object. String types that use defined enumerations will state "(enum)".  Number types will state their units where used. |
| Attributes | Designates whether the property is read-only or read-write (if supported by the implementation), and whether a 'null' value may be returned by the Service if the value of the property is temporarily unavailable. |
| Description | The description of the property, as copied directly from the schema 'Description' definition. |


## Common properties

The following properties are defined for inclusion in every Redfish schema, and therefore may be encountered in any Response payload.  They are documented here to avoid repetition in the Reference Guide property tables.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/CommonProperties/properties

In addition, the following properties are frequently defined in Redfish schemas.  Their definition and usage is the same throughout the Redfish data model.

#include_fragment ./docs/DSP2046/CommonPropertySchema.json#/definitions/FrequentProperties/properties

[insert_common_objects]

## Status object

The 'Status' object and its properties is common to many Redfish schema.

#include_fragment ./json-schema/Resource.json#/definitions/Status


## Location object

The 'Location' object and its properties is common to many Redfish schema.

#include_fragment ./json-schema/Resource.v1_7_0.json#/definitions/Location

## Identifier object

Properties used to identify a particular instance of a device.

#include_fragment ./json-schema/Resource.v1_7_0.json#/definitions/Identifier

## IP address objects

IP address objects appear in several areas of the data model.
### IPv4 addresses 

#include_fragment ./json-schema/IPAddresses.v1_0_7.json#/definitions/IPv4Address

### IPv6 addresses

#include_fragment ./json-schema/IPAddresses.v1_0_7.json#/definitions/IPv6Address

## Resource collections

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

# Reference Guide

This guide was produced using the contents of the schema files from DMTF Redfish Schema bundle DSP8010 version 2018.1 and merged with supplemental text using the DMTF's [Redfish Documentation Generator](#redfish-documentation-generator).  


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




# Schema Supplement

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

## Port

### Mockup
mockups/DSP2046-examples/Port-v1-example.json

## Power

### Mockup
mockups/DSP2046-examples/Power-v1-example.json

## Processor

### Mockup
mockups/DSP2046-examples/Processor-v1-example.json

## ResourceBlock

### Mockup
mockups/DSP2046-examples/ResourceBlock-v1-example.json

## Role

### Mockup
mockups/DSP2046-examples/Role-v1-example.json

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

## Thermal

### Mockup
mockups/DSP2046-examples/Thermal-v1-example.json

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
| 2018.2  | 2018-08-10 | Built from Redfish schemas released in DSP8010 version 2018.2 |
| 2018.1  | 2018-05-01 | Initial release. Built from Redfish schemas released in DSP8010 version 2018.1 |
| 2017.0a | 2017-05-19| Work in progress release to gather feedback on content and format. |
