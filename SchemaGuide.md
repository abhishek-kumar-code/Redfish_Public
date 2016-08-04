---
DocTitle: Redfish Resource and Schema Guide 
DocNumber: 2046
DocClass: DMTF Informational
DocVersion: '0.9.0'
modified: '2016-8-5'
status: work in progress
released: false
copyright: '2016'
---

# Redfish Schemas - User Documentation

This document contains details about specific properties contained within Schemas defined by the Redfish Specification.  This information is used by a documentation generator to create the Redfish Resource and Schema Guide (DSP2046).  Proper use of section headers allows for the Generator to incorporate the additional information automatically.  

The Redfish Documentation Generator uses this file to create the Redfish Schema Guide.  The tool uses Markdown section headers to locate and integrate text into the various portions of the documment as follows:

 - Introduction - All text in the Introduction section until the next major header is included as the head of the document. 
- Postscript - All text in the Postscript sectino until the next major header is appended to the end of the document.
 - Schema Supplement: This section contains all the schema-specific information, property details and sample payloads.  
	 - Second-level headers in this section indicate the name of the Schema.  The section must be named "Schema_<major version>" for integration, for example "Processor_1". 

### Property descriptions

Individual property documentation can be added using a third-level header in this section.  The header must match the property name within a schema.  This includes properties in embedded objects within a resource.

### Replacement Description

A "Description" third-level section can be used to supplement the "Description" text from the schema file.  The text here is appended to the schema description.

### Sample JSON payuload

A "JSONPayload" setion can contain a JSON payload example for this schema.  This sample will be appended to the end of that schema's section, and will also populate the language-specific tab in the Slate documentation.

 


# Introduction

<p align="center">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>

Introduction to Redfish goes here. 
 - Purpose of the document
 - Structure and usage
 - Other sources of information
 


# Common Redfish Properties

This section documents properties that are either common throughout the Redfish Schema, or are defined in the Resource.1.x.x or odata.4.x.x schema files.

## @odata.context


The @odata.context is used for a few different things:
1)	First and foremost, it provides the location of the metadata that describes the payload.
2)	It provides a root URL for resolving relative references

The structure of the @odata.context is the url to a metadata document with a fragment describing the data (typically rooted at the top-level singleton or collection).

Technically the metadata document only has to define, or reference, any of the types it directly uses, and different payloads could reference different metadata documents. However, since the @odata.context provides a root URL for resolving relative references (such as @odata.id's) we have to return the "canonical" metadata document.  Further, because our "@odata.type" annotations are written as fragments, rather than full URLs, those fragments must be defined in, or referenced by, that metadata document. Also, because we qualify actions with the versionless namespace aliases, those aliases must also be defined through <references> in the referenced metadata document.

Initially we tried only to reference the ServiceRoot metadata in the root $metadata document, but this required us to use relative URLs for all of our @odata.type annotations for types that were hosted on-box, or absolute URLs for off-box metadata, and the client having to parse the URL to match just the fragment. Having the types defined or referenced from the service's $metadata allows us to just put a canonical fragment in the payload and decide in the service $metadata whether the reference is hosted on-box or off-box.  So it turned out that putting the <References> for any used types in the metadata document allows all of our payloads to be shorter and more consistent by using fragments, as well as using versionless aliases for actions.

## @odata.type

## @odata.id

## Status

# Common Properties

The Common Properties section removes properties from any schema section.  If they require documentation, it should be included in the Introduction section of this document

## @odata.context
## @odata.type
## @odata.id
 
# Additional Schemas

Some schemas are not enumerated here...

## *Collection

Collections ...


# Schema Supplement

## Processor

### Property Details

#### ProcessorId

This object's properties shall contain values dependent on the value of the ProcessorArchitecture property, as listed in the sections below:

#### VendorId

This property shall contain a 12 byte, little-endian ASCII string derived from register values resulting from the execution of the CPUID instruction.  The value shall be constructed using the following algorithm:

~~~
k=0;
foreach reg (cpuid.0.ebx, cpuid.0.edx, cpuid.0.ecx){ ##NB: order must be ebx, edx, ecx
  for (i=0; i<=3; i++) { vendorID[ byte(k*4 + i) ] = reg[byte(i)]; }
  k++;
  }
~~~

#### IdentificationRegisters

This property shall contain the register contents resulting from the exeuction of the CPUID instruction.

#### EffectiveFamily

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~ 
((cpuid.1.eax & 0x0ff00000) >> 20) + ((cpuid.1.eax & 0x00000f00) >> 8)  
~~~

#### EffectiveModel

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
((cpuid.1.eax & 0x000f0000) >> 12) + ((cpuid.1.eax & 0x000000f0) >> 4)
~~~

#### Step

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
(cpuid->eax & 0xf)
~~~

#### MicrocodeInfo

This property shall contain the 64-bit value contained in MSR 0x8B.

# Postscript

This is the text that goes at the end of the file...
