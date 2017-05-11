---
DocTitle: Redfish Resource and Schema Guide
DocNumber: '2046'
DocClass: Informative
DocVersion: '2017.1.0'
modified: '2017-05-11'
status: published
released: true
copyright: '2017'
---

# Redfish Schemas - User Documentation

This document contains details about specific properties contained within Schemas defined by the Redfish Specification. This information is used by a documentation generator to create the Redfish Resource and Schema Guide (DSP2046). Proper use of section headers allows for the generator to incorporate the additional information automatically.  

The Redfish Documentation Generator uses this file to create the Redfish Resource and Schema Guide. The tool uses Markdown section headers to locate and integrate text into the various portions of the document as follows:

 - Introduction - All text in the Introduction section until the next major header is included as the head of the document.
- Postscript - All text in the Postscript section until the next major header is appended to the end of the document.
 - Schema Supplement: This section contains all the schema-specific information, property details, and sample payloads.  
	 - Second-level headers in this section indicate the name of the Schema.  The section must be named "Schema_<major version>" for integration, for example "Processor_1".

### Property descriptions

Individual property documentation can be added by using a third-level header in this section.  The header must match the property name within a schema.  This includes properties in embedded objects within a resource.

### Replacement Description

A "Description" third-level section can be used to supplement the "Description" text from the schema file.  The text here is appended to the schema description.

### Sample JSON payload

A "JSONPayload" section can contain a JSON payload example for this schema.  This sample will be appended to the end of that schema's section, and will also populate the language-specific tab in the Slate documentation.




# Introduction

<p align="right">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>
<p align="right">Document Identifier: <span class="dsp">DSP2046</span></p>
<p align="right">Date: 2017-05-11</p>
<p align="right">Version: <span class="version">2017.1.0</span></p>
<br><br><br>
<h1 class="title">Redfish Resource and Schema Guide</h1>
<br><br><br><br><br>

<b><p>Document Class: Informative</p>
<p>Document Status: <span class="status">Published</span></p>
<p>Document Language: en-US</p></b>
<br>
   <p>Copyright Notice</p>
    <p>Copyright &copy; 2016-2017 Distributed Management Task Force, Inc. (DMTF). All rights reserved.
<br><br>
  <p>DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. Members and non-members may reproduce DMTF specifications and documents, provided that correct attribution is given. As DMTF specifications may be revised from time to time, the particular version and release date should always be noted.</p>
  <p>Implementation of certain elements of this standard or proposed standard may be subject to third party patent rights, including provisional patent rights (herein "patent rights"). DMTF makes no representations to users of the standard as to the existence of such rights, and is not responsible to recognize, disclose, or identify any or all such third party patent right, owners or claimants, nor for any incomplete or inaccurate identification or disclosure of such rights, owners or claimants. DMTF shall have no liability to any party, in any manner or circumstance, under any legal theory whatsoever, for failure to recognize, disclose, or identify any such third party patent rights, or for such party's reliance on the standard or incorporation thereof in its product, protocols or testing procedures. DMTF shall have no liability to any party implementing such standard, whether such implementation is foreseeable or not, nor to any patent owner or claimant, and shall have no liability or responsibility for costs or losses incurred if a standard is withdrawn or modified after publication, and shall be indemnified and held harmless by any party implementing the standard from any and all claims of infringement by a patent owner for such implementations.</p>
  <p>For information about patents held by third-parties which have notified the DMTF that, in their opinion, such patent may relate to or impact implementations of DMTF standards, visit <a href="http://www.dmtf.org/about/policies/disclosures.php">http://www.dmtf.org/about/policies/disclosures.php</a>.</p>
  <p>This document's normative language is English. Translation into other languages is permitted.</p>
  <br>
  
# Overview

The Redfish standard comprises a set of specifications maintained by the Distributed Management Task Force (DMTF). The standard defines a protocol that uses RESTful interfaces to provide access to data and operations associated with the management of systems and networks. One of the strengths of the Redfish protocol is that it works with a wide range of servers: from stand-alone servers to rack-mount and bladed environments to large-scale data centers and cloud environments.

The Redfish standard addresses several key issues for infrastructures that require scalability. Large infrastructures often consist of many simple servers of different makes and types. This hyperscale usage model requires a new approach to systems management. The Redfish Scalable Platforms Management ("Redfish") protocol addresses these needs by providing a standard protocol based on out-of-band systems management.

With the above goals in mind, the Redfish protocol was designed as an open industry standard to meet scalability requirements in multivendor deployments. It easily integrates with commonly used tools, using RESTful interfaces to perform operations and using JSON and OData formats for data payloads.

## Who should read this document?

This document is useful to people who want to understand how to use the Redfish API. This includes application developers who want to create client-side software to communicate with a Redfish service, and other consumers of the API.

## Why REST, JSON and OData?

One of the goals of the Redfish standard is to define an API that is equally usable by applications, client libraries, and scripts. Another goal is to define data objects that are schema-backed but human readable. The use of RESTful APIs, and JSON and OData formats supports these goals.

JSON is a widely used data format for transporting data that is compatible with RESTful applications. It is inherently human readable, more concise than XML, and supported by many modern programming languages.

Using JSON also carries an advantage in embedded manageability environments because most Baseboard Management Controllers (BMCs) already support a web server and the management of a server through a browser (typically through a Javascript-driven interface). By using JSON, the data from a Redfish service is viewed directly in the browser.

Similarly, while JSON provides an easy-to read representation, the semantics of common properties, such as id, type, links, etc., are imposed through naming conventions that can vary from service to service.

OData defines a set of common RESTful conventions, which provides for interoperability between APIs. Redfish adopts common OData conventions for describing schema, URL conventions, and naming, as well as the structure of common properties in a JSON payload. This uniformity not only encapsulates best practices for RESTful APIs that can be used in traditional and scalable environments, but also enables Redfish services to be consumed by a growing ecosystem of generic client libraries, applications, and tools.

**Example**

The following code fragment shows an example of a request that retrieves the serial number from a Redfish service:

```Python
rawData = urllib.urlopen('https://192.168.1.135/redfish/v1/Systems/1')
jsonData = json.loads(rawData)
print ('SN: ' + jsonData['SerialNumber'])
```

A successful request that uses the code snippet above could produce output similar to the following example:

```bash
SN: 1A87CA442K
```

  * (This example uses a Redfish ComputerSystem resource; authentication is not shown.)

## Schema versus resources versus services

A schema is a data model.  Redfish uses both the json-schema and OData CSDL formats to publish each schema. The model defines the relationship between objects in the system, and defines which objects can contain or be contained by other objects. Think of the schema as the data definitions.

A resource is an actual object or component. In the terminology of RESTful APIs, a URI or URL is a pointer (or end point) that represents the resource. Think of the resource as an object in a system, whose values and rules for each of its properties are  contained in a specific Redfish JSON payload.

A payload is the packet of data that contains the values associated with a specific resource. Redfish also defines OData 'annotations' that can be thought of as metadata delivered in a payload.

A Redfish service is any product that implements the Redfish specification. It is the software or firmware that implements the specification, and serves up responses.  When a Refish service receives a properly formatted HTTP request, it returns an HTTP response that contains information about the requested resource.


## Locating a Redfish service

Every Redfish service contains a base URI or URL that indicates the root of all resources.

The root is the concatenation of: 

- the IP address or server name of the Redfish service (For example: https://mgmt.vendor.com)
- the path to the Redfish root (/redfish/v1/)

For example:

```shell
https://mgmt.vendor.com/redfish/v1
```


## Where can I find more information?

The following web sites provide more information about the Redfish standard:

Redfish Standards
-  Schemas, specs, mockups, white papers, FAQ, educational material and more:
  http://www.dmtf.org/standards/redfish

Redfish Developer Hub
-  Redfish interactive explorer, hosted schema and other links:
  http://redfish.dmtf.org

SPMF (Working group that maintains the Redfish standard)
-  Companies involved, upcoming schedules and future work, charter, and information about joining:
  http://www.dmtf.org/standards/spmf


# Common properties

This section describes the properties (schema elements or data fields) common to all Redfish schema. Response payloads returned by a Redfish service will contain these properties.

## Id

The `Id` property is common to all Redfish schema.

The Id property of a resource uniquely identifies the resource within the Resource Collection that contains it. The value of Id is unique within a Resource Collection.

## Name

The `Name` property exists in all Redfish schema.

The Name property is used to convey a human-readable moniker for a resource. The type of the Name property is a string. The value of Name is NOT necessarily unique across resource instances within a Resource Collection.

## Description

The `Description` property exists in all Redfish schema.

The Description property is used to convey a human-readable description of the resource. The type of the Description property is string.


## Status

The `Status` property is common to many Redfish schema.

#include_fragment http://redfish.dmtf.org/schemas/v1/Resource.json#/definitions/Status


## Links

The Links property represents the links associated with the resource, as defined by that resource's schema definition. All associated reference properties defined for a resource are nested under the Links property. All directly referenced (subordinate) properties defined for a resource can be found from the root of the resource.


## Members

The Members property of a Resource Collection identifies the members of the collection.

## RelatedItem

The `RelatedItem` property is represented as a set of links. The links point to a resource, or part of a resource, as defined by that resource's schema definition. 

This representation is not intended to be a strong linking methodology like other references. Instead it is used to show a relationship between elements or sub-elements in disparate parts of the service. For example, `Fans` may be in one area of the system and `Processors` in another area of the system. It could be that the relationship between the two is not obvious. The `RelatedItem` property can be used to show that one is related to the other. In this example, it might indicate that a specific fan is cooling a specific processor.


## Actions

The Actions property contains the actions supported by a resource.

## OEM

The OEM property is used for OEM extensions as defined in Schema Extensibility.


## \*@odata.context


The @odata.context is used to:

  -	provide the location of the metadata that describes the payload
  -	provide a root URL for resolving relative references

## @odata.context property

The @odata.context property is a URL to a metadata document with a fragment describing the data (typically rooted at the top-level singleton or collection).

Technically the metadata document only has to define, or reference, any of the types that it directly uses, and different payloads could reference different metadata documents. However, since the @odata.context provides a root URL for resolving relative references (such as @odata.id's), we return the canonical metadata document.  


## @odata.type

Description of @odata.type

Because our "@odata.type" annotations are written as fragments, rather than full URLs, those fragments must be defined in, or referenced by, that metadata document. Also, because we qualify actions with versionless namespace aliases, those aliases must also be defined through <references> in the referenced metadata document.

## @odata.id

Description of @odata.id


# Working with Resource Collections

In the Redfish protocol a URI can represent a collection of similar resources. A Resource Collection can represent a group of Systems, Chassis, Managers, or a group of other kinds of resources. For example:

 - /redfish/v1/Systems
 - /redfish/v1/Chassis
 - /redfish/v1/Managers

The Members of a Resource Collection are returned as a JSON array, where each element of the array is a JSON object. The name of the property representing the members of the collection is `Members`.


## Operations Related to Resource Collections

Some of the common operations associated with collections are as follows:

### A GET request for a Resource Collection

To read the contents of a Resource Collection, a client application sends an HTTP GET request to the URI of the collection. A client application typically discovers the URI of the collection by parsing the resource identifier from a previous request.  For example, the `Links` property of a previously returned resource can contain a URI that points to a collection. A client application could parse the information in the `Links` property to obtain the URI of the collection.

The response includes properties of the Resource Collection including an array of its Members. If the Resource Collection is empty, the returned JSON object is an empty array (not null).

To request a subset of Members of the Resource Collection, use the paging query options:

- `$top`
- `$skip`

These paging query options apply specifically to the `Members` array property within a Resource Collection.

### The response to a GET request for a Resource Collection

A Redfish service returns a Resource Collection as a JSON object in an HTTP response. The JSON object can include the following properties:

| Property  | Description   |
| -- | -- |
| @odata.context  | Describes the source of the payload. |
| @odata.count    | Displays the total number of Members in the Resource Collection |
| @odata.members  | The array of the members in the collection    |
| @odata.nextLink | Indicates the "nextLink" when the payload contains partial results |

When a response represents only a part of a Resource Collection, the response includes a next link property named `Members@odata.nextLink`. The value of the `@odata.nextlink` property is a URL to a resource with the same @odata.type that  contains the next set of partial members. The `@odata.nextlink` property is only present if the number of Members in the Resource Collection is greater than the number of members returned.

### Iterating through the members of a collection

A Resource Collection includes a count of the total number of entries in its "Members" array.

The total number of resources (Members) available in a Resource Collection is represented in the count property. The count property is named `Members@odata.count`. The value of odata.count represents the total number of members available in the Resource Collection. This count is not affected by the `$top` or `$skip` query parameters.


### Additional notations

A JSON object representing a Resource Collection may include additional annotations represented as properties whose name is of the form:

@Namespace.TermName

where

  - Namespace = the name of the namespace where the annotation term is defined. This namespace is referenced by the metadata document specified in the context URL of the request.
  - TermName = the name of the annotation term being applied to the Resource Collection.

The client can get the definition of the annotation from the service metadata, or may ignore the annotation entirely, but should not fail reading the response due to unrecognized annotations, including new annotations defined within the Redfish namespace.

### Order of Members

Collections are arrays of oData objects. The oData objects contain IDs of resources.

The order in which Members exist in a collection is deterministic, but the members are not sorted. In other words, assuming that the members have not changed since the last request, the order in which memebrs are returned will be unchanged. The order of the members will not be sorted by any specific criteria.


### Examples of commonly used collections

#### Collection of Systems

A System represents the logical view of a computer system as seen from the operating system (OS) level.

Any subsystem accessible from the host CPU is represented in a System resource. Each instance of a System includes CPUs, memory, and other components. Each computer System can be contained as a member of a Systems collection.

~~~json
{
    "@odata.type": "#ComputerSystemCollection.ComputerSystemCollection",
    "Name": "Computer System Collection",
    "Members@odata.count": 1,
    "Members": [
        {
            "@odata.id": "/redfish/v1/Systems/437XR1138R2"
        }
    ],
    "@odata.context": "/redfish/v1/$metadata#ComputerSystemCollection.ComputerSystemCollection",
    "@odata.id": "/redfish/v1/Systems"
}
~~~


#### Collection of Chassis

The Chassis collection contains resources that represent the physical aspects of the infrastructure. Think of this collection as the properties needed to locate a physical unit, or to identify a physical unit, or to install or service a physical computer.

A Chassis is roughly defined as a physical view of a computer system as seen by a human. A single Chassis resource can house sensors, fans, and other components. Racks, enclosures, and blades are examples of Chassis resources included in the Chassis collection.

The Redfish protocol allows the representation of a Chassis contained within another Chassis.

~~~json
{
    "@odata.type": "#ChassisCollection.ChassisCollection",
    "Name": "Chassis Collection",
    "Members@odata.count": 5,
    "Members": [
        {
            "@odata.id": "/redfish/v1/Chassis/MultiBladeEnclosure"
        },
        {
            "@odata.id": "/redfish/v1/Chassis/Blade1"
        },
        {
            "@odata.id": "/redfish/v1/Chassis/Blade2"
        },
        {
            "@odata.id": "/redfish/v1/Chassis/Blade3"
        },
        {
            "@odata.id": "/redfish/v1/Chassis/Blade4"
        }
    ],
    "@odata.context": "/redfish/v1/$metadata#ChassisCollection.ChassisCollection",
    "@odata.id": "/redfish/v1/Chassis"
}
~~~

#### Collection of Managers

A Managers collection contains BMCs, Enclosure Managers or any other component managing the infrastructure. Managers handle various management services and can also have their own components (such as NICs).

~~~json
{
    "@odata.type": "#ManagerCollection.ManagerCollection",
    "Name": "Manager Collection",
    "Members@odata.count": 3,
    "Members": [
        {
            "@odata.id": "/redfish/v1/Managers/EnclosureManager"
        },
        {
            "@odata.id": "/redfish/v1/Managers/Blade1BMC"
        },
        {
            "@odata.id": "/redfish/v1/Managers/Blade2BMC"
        }
    ],
    "@odata.context": "/redfish/v1/$metadata#ManagerCollection.ManagerCollection",
    "@odata.id": "/redfish/v1/Managers"
}
~~~

# Error messages

A Redfish service typically returns two types of error messages:  

- HTTP response codes 
- Error responses

## HTTP response codes

The HTTP reponse codes are the standard codes returned by all HTTP servers. 

These include familiar HTTP codes such as HTTP response code `200 OK`, which means that the HTTP request succeeded.

For more information about the meaning of these codes when returned from a Redfish service, see the latest Redfish specification at:

  - http://www.dmtf.org/standards/redfish

## Redfish error responses

HTTP response status codes alone often do not provide enough information to determine the nature of an error. For example, if a client application sends a PATCH request and some of the properties do not match while others are not supported, simply returning an HTTP status code of 400 does not clearly indicate which values were in error.

Redfish error responses provide more meaningful and deterministic error information.

A Redfish service can provide multiple error responses in an HTTP response in order to provide as much information about the error situation as possible. Additionally, a Redfish service can provide Redfish-standardized errors, OEM-defined errors, or both, depending on what is available from a perticular service.

Error responses are defined by an extended error resource, represented as a single JSON object.  The JSON object is part of a property named "error".

### Example error response

The following snippet shows a fragment of an error response.

```JSON

 {
   "error": {
        "code": "Base.1.0.GeneralError",
        "message": "A general error has occurred. See ExtendedInfo for more information.",
        "@Message.ExtendedInfo": [
            {
                "@odata.type" : "/redfish/v1/$metadata#Message.v1_0_0.Message",
                "MessageId": "Base.1.0.PropertyValueNotInList",
                "RelatedProperties": [
                    "#/IndicatorLED"
                ],
                "Message": "The value Red for the property IndicatorLED is not in the list of acceptable values",
                "MessageArgs": [
                    "RED",
                    "IndicatorLED"
                ],
                "Severity": "Warning"
            }]
   }
}

```

The above snippet shows a JSON payload with error information. In this example, the `code` property shows that the error is of a type `Base.1.0.GeneralError`.  The property annotation `@Message.ExtendedInfo` provides more details about the nature of the error.


# Redfish Schema details

# Excluded Properties

The Excluded Properties section removes properties from the root level of any schema section.  Instances of the property within embedded objects are retained.  If the excluded properties require documentation, include it in the Introduction section of this document.

## @odata.context
## @odata.type
## @odata.id


# Excluded Annotations

These annotations are removed from the schema details in all cases.  If the excluded annotations require documentation, include it in the Introduction section of this document.

## *@odata.count
## *@odata.navigationLink

# Excluded Schemas

Some schemas are excluded from the documentation for clarity.  Since all Redfish collections are based on the same structure, this is documented in the Introduction section to reduce repetition in the document.

## *Collection




# Schema Supplement

## AccountService

### Mockup
mockups/DSP2046-examples/AccountService/index.json

## Bios

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/BIOS/index.json

## Chassis

### Mockup
mockups/DSP2046-examples/Chassis/1U/index.json

## ComputerSystem

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/index.json

### Property Details

#### UUID

The value of this property contains a universal unique identifier number for the system.  Clients should consider the value of the property to be opaque and should not interpret any subfields within the UUID, but comparisons between UUID representations should always be case-insensitive.

The format of the string follows the 35-character string format specified in RFC4122 of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where each x represents a hex value 0-1,a-f.

If the computer system supports SMBIOS,  the string should be formed from the raw binary 16-byte SMBIOS UUID structure.  This configuration allows out-of-band clients to correlate the UUID that in-band agents are reading from SMBIOS with the UUID represented out-of-band via the Redfish API.

The SMBIOS 2.6+ specification specifies the proper algorithm for converting the raw binary SMBIOS 16-byte structure into the canonical  string format of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxx").  Redfish services should follow the SMBIOS 2.6+ specification for implementing this conversion.
WMI and Linux dmidecode also follow the SMBIOS guidelines.

The RFC4122 specification specifies that the canonical string value should follow network byte ordering. SMBIOS represents the UUID as five fields shown below:

    {
     DWORD    time_low,
     WORD     time_mid,
     WORD     time_hi_and_version,
     BYTE     clock_seq_hi_and_reserved,
     BYTE     clock_seq_low,
     BYTE[6]  node
    }
    
For the above reasons, for little-endian systems (including x86 systems), there is a little-endian to network-byte-order conversion required for the first three fields to convert the SMBIOS binary UUID to network byte order.

As specified in the SMBIOS 2.6+ specification, if the canonical UUID string is:

    "00112233-4455-6677-8899-aabbccddeeff"

then the corresponding raw representation in the SMBIOS UUID structure would be:

    raw_smbios_uuid={ 0x33, 0x22, 0x11, 0x00,    0x55, 0x44,     0x77, 0x66,     0x88, 0x99,     0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF }

The C code to convert the raw SMBIOS UUID struct in a little-endian system to the canonical string would be:

    /* routine to convert raw little-endian smbios structure to canonical string */
    sprintf(redfishUUID,"%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x")
        raw_smbios_uuid[3], raw_smbios_uuid[2], raw_smbios_uuid[1],raw_smbios_uuid[0],
        raw_smbios_uuid[5],raw_smbios_uuid[4],
        raw_smbios_uuid[7],raw_smbios_uuid[6],
        raw_smbios_uuid[8],raw_smbios_uuid[9],
       raw_smbios_uuid[10],raw_smbios_uuid[11],raw_smbios_uuid[12],raw_smbios_uuid[13],raw_smbios_uuid[14],raw_smbios_uuid[15]
        );

This code snippet creates the same canonical formatted string as WMI and dmidecode for little-endian X86 systems.
In the case that the computer architecture is not little-endian, the conversion and canonical representation should be the same as the OS APIs such as WMI and dmidecode.

Note that as specified in RFC4122, the fields in the string should be zero-filled hex values, as shown in the conversion code above, so that the overall string length and format is of the form xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx.

Regarding the case of the hex values:  RFC4122 specifies that on output, the hex values should be lowercase characters, but that clients should use case-insensitive comparison on input.  Most modern scripting languages typically also represent hex values in lowercase characters following the RFC.

However, dmidecode, WMI and some Redfish implementations currently use uppercase characters for UUID on output.

Therefore, for new Redfish implementations, the recommendation is to follow RFC4122 and output using lowercase hex values when converting from the SMBIOS raw binary data as shown in the code example above. However, Redfish implementations and OS APIs MAY also output in uppercase and clients MUST therefore compare UUIDs using a case-insensitive comparisons (as recommended by RFC4122).

## EthernetInterface

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/EthernetInterfaces/12446A3B0411/index.json

## EventService

### Mockup
mockups/DSP2046-examples/EventService/index.json

## EventDestination

### Mockup
mockups/DSP2046-examples/EventService/Subscriptions/1/index.json

## LogEntry

### Mockup
mockups/DSP2046-examples/Managers/BMC/LogServices/Log/Entries/1/index.json

## LogService

### Mockup
mockups/DSP2046-examples/Managers/BMC/LogServices/Log/index.json

## Manager

### Mockup
mockups/DSP2046-examples/Managers/BMC/index.json

## ManagerAccount

### Mockup
mockups/DSP2046-examples/AccountService/Accounts/1/index.json

## ManagerNetworkProtocol

### Mockup
mockups/DSP2046-examples/Managers/BMC/NetworkProtocol/index.json

## Memory

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/Memory/DIMM1/index.json

## Power

### Mockup
mockups/DSP2046-examples/Chassis/1U/Power/index.json

## Processor

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/Processors/CPU1/index.json

### Property Details

#### ProcessorId

This object's properties contain values that depend on the value of the ProcessorArchitecture property, as listed in the sections below:

#### VendorId

This property contains a 12-byte, little-endian ASCII string derived from register values resulting from the execution of the CPUID instruction.

#### IdentificationRegisters

This property contains the register contents resulting from the execution of the CPUID instruction.

#### EffectiveFamily

This property contains a value derived from register values resulting from the execution of the CPUID instruction.  

#### EffectiveModel

This property contains a value derived from register values resulting from the execution of the CPUID instruction.  The value is based on the following formula:
~~~
((cpuid.1.eax & 0x000f0000) >> 12) + ((cpuid.1.eax & 0x000000f0) >> 4)
~~~

#### Step

This property contains a value derived from register values resulting from the execution of the CPUID instruction.  The value is based on the following formula:
~~~
(cpuid->eax & 0xf)
~~~

#### MicrocodeInfo

This property contains the 64-bit value contained in MSR 0x8B.


## Role

### Mockup
mockups/DSP2046-examples/AccountService/Roles/Admin/index.json

## ServiceRoot

### Mockup
mockups/DSP2046-examples/index.json

## SessionService

### Mockup
mockups/DSP2046-examples/SessionService/index.json

## Sessions

### Mockup
mockups/DSP2046-examples/SessionService/Sessions/1234567890ABCDEF/index.json

## SessionService

### Mockup
mockups/DSP2046-examples/SessionService/index.json

## SimpleStorage

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/SimpleStorage/1/index.json

## Thermal

### Mockup
mockups/DSP2046-examples/Chassis/1U/Thermal/index.json

## VLanNetworkInterface

### Mockup
mockups/DSP2046-examples/Systems/437XR1138R2/EthernetInterfaces/12446A3B0411/VLANs/1/index.json

## VirtualMedia

### Mockup
mockups/DSP2046-examples/Managers/BMC/VirtualMedia/CD1/index.json

# Postscript

## ANNEX A

### Change log

| Version  | Date     | Description     |
| ---      | ---      | ---             |
| 2017.1.0 | 2017-5-11| Initial release. |

