---
DocTitle: Supplmental Material for the Redfish Schemas
DocClass: DMTF Specification
DocVersion: '0.5.0'
modified: '2017-3-29'
status: work in progress
released: false
copyright: '2017'
---

# Redfish Schema Supplement

This document contains details about specific properties contained within Schemas defined by the Redfish Specification.  This information is used by a documentation generator to create the Redfish Schema Supplement (DSP2068).  Proper use of section headers allows for the Generator to incorporate the additional information automatically.

The Redfish Documentation Generator uses this input file to create the Redfish Schema Supplement.  The tool uses Markdown section headers to locate and integrate text into the various portions of the document as follows:

- Introduction - All text in the Introduction section until the next major header is included as the head of the document. 
- Postscript - All text in the Postscript section until the next major header is appended to the end of the document.
- Schema Supplement: This section contains all the schema-specific information, property details and sample payloads.  
	 - Second-level headers in this section indicate the name of the Schema.  The section must be named "Schema_<major version>" for integration, for example "Processor_1". 

### Property descriptions

The property tables for each schema are generated using the "LongDescription" text from the schema files.  Supplementation information for individual properties can be added using a third-level header in this section.  The header must match the property name within the schema.  This includes properties in embedded objects within a resource.

### Replacement Description

A "Description" third-level section can be used to supplement the "Description" text from the schema file.  The text here is appended to the schema description.

### Sample JSON payload

A "JSONPayload" setion can contain a JSON payload example for this schema.  This sample will be appended to the end of that schema's section, and will also populate the language-specific tab in the Slate documentation.

 


# Introduction

<p align="center">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>

# Redfish Schema Supplement 

This document contains details about specific properties contained within Schemas defined by the Redfish Specification.  The tables within the document are copied directly from the Redfish Schema definitions, and is supplemented with additional information where needed.  

 -  Purpose of the document
 -  Structure and usage
 -  Other sources of information
 
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
