---
DocTitle: Redfish Property Guide
DocNumber: '2053'
DocClass: Informative
DocVersion: '2018.3'
modified: '2019-01-14'
status: published
released: True
copyright: '2019'
---

# Redfish Schemas - Property Guide

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


--------------------------------- DOCUMENTATION GENERATOR INPUT OPTIONS ----------------------------------------

# Schema URI Mapping

Map schema URIs to local files. You may omit the protocol (e.g., https://) from the URI.
The doc generator will use the local files when specified and otherwise
follow the full URI, including data from remote files if possible.

## Local-repo: redfish.dmtf.org/schemas/v1 ./json-schema
## Local-repo: redfish.dmtf.org/schemas/swordfish/v1 ../Swordfish/json-schema

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



------------------------------------------ RELEASE PROCESS -----------------------------------------------

# Manual Fix-ups required prior to Release

------------------------------------------ SCHEMA GUIDE BEGINS HERE --------------------------------------

# Introduction

<p align="right">
  <img src="http://redfish.dmtf.org/sites/default/files/DMTF_Redfish_logo_R.jpg" alt="DMTF Redfish" width=180>
</p>
<p align="right">Document Identifier: <span class="dsp">DSP2053</span></p>
<p align="right">Date: 2019-1-15</p>
<p align="right">Version: <span class="version">2018.3</span></p>
<br><br><br>
<h1 class="title">Redfish Property Guide</h1>
<br><br><br><br><br>
<br><br>
<br><br>
<b><p>Document Class: Informative</p>
<p>Document Status: <span class="status">Published</span></p>
<p>Document Language: en-US</p></b>
<br>
   <p>Copyright Notice</p>
    <p>Copyright &copy; 2019 DMTF. All rights reserved.
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

# Reference Guide

This guide was produced using the contents of the schema files from DMTF Redfish Schema bundle DSP8010 version 2018.3 and merged with supplemental text using the DMTF's [Redfish Documentation Generator](#redfish-documentation-generator).  


# Schema Supplement



# Postscript

# Redfish documentation generator

This document was created using the Redfish Documentation Generator utility, which uses the contents of the Redfish schema files (in JSON schema format) to automatically generate the bulk of the text.  The source code for the utility is available for download at the DMTF's Github repository located at <a href="http://www.github.com/DMTF/Redfish-Tools">http://www.github.com/DMTF/Redfish-Tools</a>.

# ANNEX A

## Change log

| Version  | Date     | Description     |
| ---      | ---      | ---             |
| 2018.3  | 2019-1-15 | Initial release. Release built from Redfish schemas released in DSP8010 version 2018.3 |

