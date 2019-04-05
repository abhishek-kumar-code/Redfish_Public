---
DocTitle: HowTo - Transforming YANG models to Redfish
DocNumber: 'nnnn'
DocClass: Informative
DocVersion: '0.1.0'
modified: '2019-01-09'
status: work in progress
released: false
copyright: '2019'
---

# Foreword

This document was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.

# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:

* John Leung - Intel Corporation

## Introduction

Redfish is a hardware management standard that is designed to be flexible, extensible, and inter-operable. Redfish supports a wide variety of solutions, from servers to storage, networking to fabrics with power and cooling. As such, each management domain has models in which readings for important data are scattered throughout the model. 

Redfish uses two artifacts when discussing a Redfish model: a mockup and a schema. 

- A **mockup** is a JSON which represents the HTTP response to an HTTP GET of that resource.
- A **schema** is a file which describes the content of the JSON response. In Redfish, the schema file is available in json-schema, OpenAPI (aka swagger) and OData CSDL formats.

The Redfish Forum has found the mockups an approachable structure for understanding the capabilities of the Redfish interface.  Someone new to Redfish can explore the model without needing to understand any of the schema language formats.

These models for the management of network and telemcommunication devices have been developed and discussed by the network industry for years.  The models are codified as YANG models (rfc6020).

To manage these devices using the Redfish interface, the DMTF has a created a process to map YANG models to Redfish models (see draft-wbl-rtgwg-yang-ci-profile-bkgd-00 and draft-wbl-rtgwg-baseline-switch-model).

The subsequent sections describe the process for creating the Redfish CSDL and mockup files from a YANG file.

## Creating Redfish CSDL files from YANG files

To create a mockup, **pyang** is used with the **YANG-to-Redfish** plugin.

	pyang --plugindir ./YANG-to-Redfish-Plugin --format redfish <yang-file>

* The <yang-file> parameter specifies the YANG file to be converted to Redfish CSDL. For example, rfc7223.yang or openconfig-instances.yang).

The YANG-to-Redfish-Plugin is available as open source at https://github.com/DMTF/YANG-to-Redfish-Converter. See the documentation in the repository for additional information.

## Creating a Redfish mockup file from a YANG file

Creating a mockup is more involved process than creating the CSDL. The goal of the process is to use the existing capabilities of **pyang** and avoid the need to modify existing tools or create a new tool. The process involves three steps:

1. Create a binding file
2. Create the blank mockup
3. Set the property values
4. Apply the Redfish URL semantics

The first step is to create a binding file. The binding file is a python file and represents the YANG model as python structure. This binding file is versatile since it allows the property values to be set and eventually outputed in a JSON serialization.

The binding file is created by using **pyang** with the **pybind** plugin.  

    pyang --plugindir $PYBINDPLUGIN -f pybind -o <binding-file> <yang-file> 

* The <binding-file> parameter specifies the output file which is created by the pybind plugin.  For example, binding_interfaces.py.

* The <yang-file> parameter specifies the YANG file to be converted. For example, rfc7223.yang or openconfig-instances.yang). 

The second step is to create a blank mockup.  The blank mockup contains the JSON structure without values for the properties.

The blank mockup is created by executing a simple python program. The third line instantiates the python object for 'openconfig-interfaces' and the forth line outputs the JSON serialization of the object.

	# Content of genjson-interfaces.py
	import pyangbind.lib.pybindJSON as pybindJSON
    from binding_interfaces import openconfig_interfaces

    oclr = openconfig_interfaces()
	print(pybindJSON.dumps(oclr, filter=False))

Executing the python program provides the following output.

	$ python genjson-interfaces.py
	{
    	"interfaces": {
        	"interface": {}
    	}
	}

By default, the pybindJSON.dumps() function outputs only structures in which properties have values. Since the python object 'oclr' for openconfig-instances is newly created, no values are set and the default output would be empty.

	$ python genjson-interfaces.py
	{
	}

The filter=False argument in the pybindJSON.dumps() call directs the function to display properties, even if the property have no value (or is null).

However only incremental structure is displayed. To unveil the deeper structures using pybindJSON.dumps(), one needs to set properties values.  To set these values, python code needs to be added to configure the python object.

The following python fragment adds an interface.  Note that the path ("intefaces/interfacd") follows the JSON structure.

	rt = oclr.interfaces.interface.add("TenGig_2")
	print(pybindJSON.dumps(rt, filter=False))

The print() statement outputs the JSON mockup structure for the interface property.

```
{
    "name": "TenGig_2",
    "state": {
        "name": "",
        "type": "",
        "loopback-mode": false,
        "ifindex": 0,
        "last-change": 0,
        "admin-status": "",
        "mtu": 0,
        "description": "",
        "oper-status": "",
        "enabled": 1,
        "counters": {
            "in-discards": 0,
            "out-unicast-pkts": 0,
            "in-unknown-protos": 0,
            "carrier-transitions": 0,
            "in-octets": 0,
            "in-unicast-pkts": 0,
            "in-fcs-errors": 0,
            "out-octets": 0,
            "out-multicast-pkts": 0,
            "out-broadcast-pkts": 0,
            "in-multicast-pkts": 0,
            "out-discards": 0,
            "in-broadcast-pkts": 0,
            "last-clear": 0,
            "in-errors": 0,
            "out-errors": 0
        }
    },
    "subinterfaces": {
        "subinterface": {}
    },
    "config": {
        "type": "",
        "loopback-mode": false,
        "name": "",
        "mtu": 0,
        "description": "",
        "enabled": 1
    },
    "hold-time": {
        "state": {
            "down": 0,
            "up": 0
        },
        "config": {
            "down": 0,
            "up": 0
        }
    }
}
```

Beyond just output the JSON structure, code can be added in the python file, to set the the values of a property can be set.  For example, the following set the config.name and config.mtu properties within the config property of the interface just added

	rt = oclr.interfaces.interface.add("TenGig_2")
    rt.config.name = "TenGig_2"
    rt.config.mtu = "9188"

	print(pybindJSON.dumps(oclr))

The print() statement outputs the following model mockup (oclr).  Note the other properties within 'interface' are not outputed since they have no values.

```
{
    "interfaces": {
        "interface": {
            "TenGig_2": {
                "name": "TenGig_2"
                "config": {
                    "mtu": 9188,
                    "name": "TenGig_2"
                }
            }
        }
    }
}
```

The fourth step is to apply the Redfish path semantics, specifically the use of collection resources.

The list YANG statement becomes a collection resource

	# Content of /redfish/v1/network_devices/SW_15/openconfig-interfaces/interfaces

    {
		"@odata.type": "#openconfig_interfaces.interfacesCollection.interfacesCollection",
    	"@odata.id": "/redfish/v1/NetworkDevices/SW_15/openconfig_interfaces/interfaces",

    	"Name": "Interface Collection",
    	"Members@odata.count": 1,
    	"Members": [
        	{
            	"@odata.id": "/redfish/v1/NetworkDevices/SW_15/openconfig_interfaces/interfaces/TenGig_2"
        	}
    	],

    	"@odata.context": "/redfish/v1/$metadata#openconfig_interfaces.interfacesCollection.interfacesCollection",
    	"@Redfish.Copyright": "..."
	}

Each member of the list YANG statement is a separate subordinate resource

	# Content of /redfish/v1/network_devices/SW_15/openconfig-interfaces/interfaces/TenGig_2

	{
    	"@odata.type": "#openconfig_interfaces.interfaces.v1_0_0.interfaces",
   		"@odata.id": "/redfish/v1/NetworkDevices/SW_15/openconfig_interfaces/interfaces/TenGig_02",
    	"Id": "TenGig_02",
    	"Name": "TenGig_2",

    	"description": "Ethernet interface on slot 2",

        "hold-time": {
            "config": {
                "up": 2000
            }
        },
        "config": {
            "description": "type=eth:cid=1042:remote=P2#Te0/0/0",
            "name": "TenGig_2",
            "mtu": 9188
        },
        "subinterfaces": {
            "subinterface": {
                "4": {
                    "index": "4",
                    "config": {
                        "index": 4,
                        "description": "autogen=default-ipv4-subint"
                    },
                    "ipv4": {
                        "address": {
                            "192.0.2.100": {
                                "ip": "192.0.2.100",
                                "config": {
                                    "ip": "192.0.2.100",
                                    "prefix-length": 31
                                }
                            }
                        }
                    }
                }
            }
        },

    	"@odata.context": "/redfish/v1/$metadata#ietf_interfaces.interfaces",
    	"@Redfish.Copyright": "..."
	}

## Creating a Redfish mockup file in IETF format

The function pybindJSON.dumps() can output in two formats: OpenConfig suggested JSON format and IETF format.  The function outputs in OpenConfig suggested JSON format, by default.  The IETF format is obtained by setting the 'mode' parameter.
	
	print(pybindJSON.dumps(oclr, mode="ietf"))

There are two JSON format used by OpenConfig industry
 
- IETF JSON - defined in draft-ietf-netmod-yang-json-08.
- OpenConfig/PyangBind JSON - does not currently have a published specification

## References

* Github for YANG-to-Redfish Converter, [https://github.com/DMTF/YANG-to-Redfish-Converter](https://github.com/DMTF/YANG-to-Redfish-Converter)
* Github for pybind, [https://github.com/robshakir/pyangbind](https://github.com/robshakir/pyangbind)
* Documentation on pyangbind, [http://pynms.io/pyangbind](http://pynms.io/pyangbind)

