---
DocTitle: Supplemental Material for the Redfish Resource and Schema Guide
DocClass: DMTF Informational
DocVersion: '0.9.0'
modified: '2017-04-27'
status: work in progress
released: false
copyright: '2017'
---

# Redfish Schemas - User Documentation

This document contains details about specific properties contained within Schemas defined by the Redfish Specification.  This information is used by a documentation generator to create the Redfish Resource and Schema Guide (DSP2046).  Proper use of section headers allows for the Generator to incorporate the additional information automatically.  

The Redfish Documentation Generator uses this file to create the Redfish Schema Guide.  The tool uses Markdown section headers to locate and integrate text into the various portions of the document as follows:

 - Introduction - All text in the Introduction section until the next major header is included as the head of the document.
- Postscript - All text in the Postscript section until the next major header is appended to the end of the document.
 - Schema Supplement: This section contains all the schema-specific information, property details and sample payloads.  
	 - Second-level headers in this section indicate the name of the Schema.  The section must be named "Schema_<major version>" for integration, for example "Processor_1".

### Property descriptions

Individual property documentation can be added using a third-level header in this section.  The header must match the property name within a schema.  This includes properties in embedded objects within a resource.

### Replacement Description

A "Description" third-level section can be used to supplement the "Description" text from the schema file.  The text here is appended to the schema description.

### Sample JSON payload

A "JSONPayload" section can contain a JSON payload example for this schema.  This sample will be appended to the end of that schema's section, and will also populate the language-specific tab in the Slate documentation.




# Introduction

<p align="center">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>

# Redfish Schema Guide

<!---
 -  Introduction to Redfish goes here.
 -  Purpose of the document
 -  Structure and usage
 -  Other sources of information
 --->

# Introduction

Cloud-based and web-based data center infrastructures require scalability. This is often achieved through large quantities of simple servers. This hyperscale usage model requires a new approach to systems management. The Redfish Scalable Platforms Management ("Redfish") protocol addresses these needs by providing a standard for out-of-band systems management.

The Redfish standard comprises a set of specifications maintained by the Distributed Management Task Force (DMTF). The Redfish standard defines a protocol that uses RESTful interfaces to provide access to data and operations associated with the management of systems and networks. One of the strengths of the Redfish protocol is that it works with a wide range of servers: from stand-alone servers to rack-mount and bladed environments to large-scale data centers and cloud environments.

The Redfish protocol was designed as an open industry standard to meet scalability requirements in multi-vendor deployments. It easily integrates with commonly used tools, using RESTful interfaces to perform operations and JSON and OData formats for data payloads.

## About this document?

<!---
[//]: #OUTLINE:-  Structure and usage
--->
This document explains how to use and understand the schemas of the Redfish protocol.

This document includes the following sections:
- Introduction: Overview of the Redfish protocol
- Common Redfish Properties: Explanation of properties used across schemas
- Redfish Schema Details: Definitions of schema elements
- Excluded Properties: List of properties not included in the details section
- Excluded Schema: List of schema not covered by this document
- Schema Supplement: Describes schema details and shows sample payloads.

## Who should read this document?

<!---
[//]: #OUTLINE:-  Purpose of the document
--->
This document is useful to people who want to understand how to take advantage of the Redfish API. This includes application developers who want to create client-side software to communicate with a Redfish service.


### Where can I find more information?

The following web sites provide more information about the Redfish standard.

Redfish Standards
-  Schemas, Specs, Mockups, White Papers, FAQ, Educational Material & more:
  http://www.dmtf.org/standards/redfish

Redfish Developer Portal
-  Redfish Interactive Explorer, Hosted Schema at Namespace & other links:
  http://redfish.dmtf.org

SPMF (the working group that maintains the Redfish standard)
-  Companies involved, Upcoming Schedules & Future work, Charter, Information on joining:
  http://www.dmtf.org/standards/spmf


# Common Redfish Properties

This section describes the properties (data fields) common to most Redfish schema. Most responses returned by a Redfish service will contain these properties.

## Status

The `Status` property is common to all Redfish schema.

|     |     |     |
| --- | --- | --- |
| **Health** | string<br><br>*read-only* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| **HealthRollup** | string<br><br>*read-only* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| **Oem** {} | object<br><br>*read-write* | Oem extension object. |
| **State** | string<br><br>*read-only* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |

#include_fragment example_fragments/Status.json

### Property Details

#### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention. |
| OK | Normal. |
| Warning | A condition exists that requires attention. |

#### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention. |
| OK | Normal. |
| Warning | A condition exists that requires attention. |

#### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected. |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled. |
| Enabled | This function or resource has been enabled. |
| InTest | This function or resource is undergoing testing. |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it. |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting. |
| UnavailableOffline | This function or resource is present but cannot be used. |
| Updating | The element is updating and may be unavailable or degraded. |

## ID



## @odata.context



The @odata.context is used for a few different things:

  -	First and foremost, it provides the location of the metadata that describes the payload.
  -	It provides a root URL for resolving relative references

The structure of the @odata.context is the url to a metadata document with a fragment describing the data (typically rooted at the top-level singleton or collection).

Technically the metadata document only has to define, or reference, any of the types it directly uses, and different payloads could reference different metadata documents. However, since the @odata.context provides a root URL for resolving relative references (such as @odata.id's) we have to return the "canonical" metadata document.  Further, because our "@odata.type" annotations are written as fragments, rather than full URLs, those fragments must be defined in, or referenced by, that metadata document. Also, because we qualify actions with the versionless namespace aliases, those aliases must also be defined through <references> in the referenced metadata document.

Initially we tried only to reference the ServiceRoot metadata in the root $metadata document, but this required us to use relative URLs for all of our @odata.type annotations for types that were hosted on-box, or absolute URLs for off-box metadata, and the client having to parse the URL to match just the fragment. Having the types defined or referenced from the service's $metadata allows us to just put a canonical fragment in the payload and decide in the service $metadata whether the reference is hosted on-box or off-box.  So it turned out that putting the <References> for any used types in the metadata document allows all of our payloads to be shorter and more consistent by using fragments, as well as using versionless aliases for actions.

## @odata.type
 - Description of @odata.type

## @odata.id
 - Description of @odada.id

## Status
 - Full details and enum table for the common status block
 - State, Health, HealthRollUp

# Redfish Schema Details

# Excluded Properties

The Excluded Properties section removes properties from any schema section.  If they require documentation, it should be included in the Introduction section of this document

## @odata.context
## @odata.type
## @odata.id
## *@odata.count
## *@odata.navigationLink

# Excluded Schemas

Some schemas are not enumerated here...

## *Collection

Collections ...


# Schema Supplement

## ComputerSystem


### Property Details

#### UUID

The value of this property contains a universal unique identifier number for the system.  Clients should consider the value of the property to be opaque and should not interpret any sub-fields within the UUID, but comparisons between UUID representations should always be case-insensitive.
The format of the string follows the 35-character string format specified in RFC4122 of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where each x represents a hex value 0-1,a-f.

If the computer system supports SMBIOS, then the string should be formed from the raw binary 16-byte SMBIOS UUID structure.  This allows out-of-band clients to correlate the UUID that in-band agents are reading from SMBIOS with the UUID represented out-of-band via the Redfish API.

The SMBIOS 2.6+ specification specifies the proper algorithm for converting the raw binary SMBIOS 16-byte structure into the canonical  string format of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxx").  Redfish services should follow the SMBIOS 2.6+ specification for implementing this conversion.
WMI and Linux dmidecode also follow the SMBIOS guidelines.

Specifically, since RFC4122 defines that the canonical string value should follow network byte ordering, and since SMBIOS represents the UUID as five fields shown below:

    {
     DWORD    time_low,
     WORD     time_mid,
     WORD     time_hi_and_version,
     BYTE     clock_seq_hi_and_reserved,
     BYTE     clock_seq_low,
     BYTE[6]  node
    }
then for little-endian systems (including x86 systems), there is a little-endian to network-byte-order conversion required for the first three fields to convert the SMBIOS binary UUID to network byte order.

Therefore, as specified in the SMBIOS 2.6+ specification, if the canonical UUID string is:

    "00112233-4455-6677-8899-aabbccddeeff"
then the corresponding raw representation in the SMBIOS UUID structure would be:

    raw_smbios_uuid={ 0x33, 0x22, 0x11, 0x00,    0x55, 0x44,     0x77, 0x66,     0x88, 0x99,     0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF }
and the C-code to convert the raw SMBIOS UUID struct in a little-endian system to the canonical string would be:

    /* routine to convert raw little-endian smbios structure to canonical string */
    sprintf(redfishUUID,"%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x")
        raw_smbios_uuid[3], raw_smbios_uuid[2], raw_smbios_uuid[1],raw_smbios_uuid[0],
        raw_smbios_uuid[5],raw_smbios_uuid[4],
        raw_smbios_uuid[7],raw_smbios_uuid[6],
        raw_smbios_uuid[8],raw_smbios_uuid[9],
        raw_smbios_uuid[10],raw_smbios_uuid[11],raw_smbios_uuid[12],raw_smbios_uuid[13],raw_smbios_uuid[14],raw_smbios_uuid[15]
        );

This will create the same canonical formated string as WMI and dmidecode for little-endian X86 systems.
In the case that the computer architecture is not little-endian, then the conversion and canonical representation should be the same as the OS APIs such as WMI and dmidecode.

Note that as specified in RFC4122, the fields in the string should be zero-filled hex values as shown in the conversion code above so that the overall string length and format is of the form xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx.

Regarding the case of the hex values:  RFC4122 specifies that on output the hex values should be lower-case, but that clients should use case-insensitive comparison on input.  Most modern scripting languages typically also represent hex values in lower-case following the RFC.
However, dmidecode, WMI and some Redfish implementations currently use upper-case for UUID on output.

Therefore, for new Redfish implementations, the recommendation is to follow RFC4122 and output using lower-case hex values when converting from the SMBIOS raw binary data as shown in the code example above.
However, Redfish implementations and OS APIs MAY also output in uppercase and clients MUST therefore compare UUIDs using a case-insensitive compares (as recommended by RFC4122).

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
