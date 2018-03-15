---
DocTitle: Redfish User Guide
DocNumber: '0000'
DocClass: Informative
DocVersion: '0.1'
modified: '2018-3-16'
status: work in progress
released: False
copyright: '2018'
---



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

The Open Data Protocol (OData) defines a set of common RESTful conventions, which provide interoperability between APIs. Redfish adopts common OData conventions for describing schema, URL conventions, and naming, as well as the structure of common properties in a JSON payload. This uniformity not only encapsulates best practices for RESTful APIs that can be used in traditional and scalable environments, but also enables Redfish services to be consumed by a growing ecosystem of generic client libraries, applications, and tools.

**Example Of Parsing JSON Data**

The following code fragment shows an example of a request that retrieves the serial number from a Redfish service. The data that is returned comes is in the JSON format. A Python library can be used to read the value of a specific property such as a 'SerialNumber':

```Python
rawData = urllib.urlopen('https://192.168.1.135/redfish/v1/Systems/1')
jsonData = json.loads(rawData)
print ('SN: ' + jsonData['SerialNumber'])
```

A successful request that uses the code snippet above would produce output similar to the following example:

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

# Data values

## NULL values

When a property contains a value of NULL, this means that the value is temporarily unavailable from the resource. For example, when a system is booting it is not possible to read the OS version.  

NULL is not a placeholder for a property that is not supported or does not exist. For example, if a `Port` property of a `EthernetInterface` resource is NULL, that means that the value is temporarily not readable. It does not mean that the `Port` does not exist.


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

Collections are arrays of OData objects. The OData objects contain IDs of resources.

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



# ANNEX A

## Change log

| Version  | Date     | Description     |
| ---      | ---      | ---             |
| |
