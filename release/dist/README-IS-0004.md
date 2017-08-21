---
DocTitle: Redfish Ethernet Switch Proposal Readme
DocNumber: 'IS0004'
DocClass: Informative
DocVersion: '0.9a'
modified: '2017-07-31'
status: Work-in-Progress
released: false
copyright: '2017'
---
# Foreword

**IMPORTANT**: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.

The DMTF released the ["YANG-to-Redfish Mapping Specification"](http://www.dmtf.org/sites/default/files/standards/documents/DSP0271_0.5.6.pdf) as work-in-progress in October 2016. The document specifies how to convert a YANG model to a Redfish model. This proposal is a product of that mapping for a small set of YANG RFCs.

* RFC7223 (Interfaces)
* RFC7224 (IANA Interface types)
* RFC7277 (IPv4 and IPv6)
* RFC7317 (system, system_state, platform, clock, ntp)

An IETF Internet draft exists which describes the mapping concept ["Redfish for Networking"](https://tools.ietf.org/html/draft-wbl-rtgwg-yang-ci-profile-bkgd-00). The document describes the rationale for managing a network device using the Redfish. Redfish is a REST-based manageability interface standard which can currently manage compute and storage platforms within the datacenter.

An IETF Internet draft exists which lists the RFCs that would consitute manageability of a baseline Ethernet switch ["Baseline Switch Model"](https://tools.ietf.org/html/draft-wbl-rtgwg-baseline-switch-model-00). The industry has been invited to provide feedback and guidance on which RFCs should be included.

There are difference in Redfish schema mapped from YANG models. The most salient are:

* The Redfish metadata is placed in folders named after each RFC (e.g. ./metadata/rfc7223).
* The Redfish metafile name may not be Pascal case. The capitalization from the YANG model statement is used.
* The Redfish metafile name includes the namespace for the metadata.

# Redfish Work-in-Progress Schemas

The following new schema files are released as Work In Progress documents. 

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| ServiceRoot | 1.3.0a | 2017-04-14 | Add NetworkDevices to service root. |
| RedfishYangExtensions | 1.0.0a | 2017-04-14 | Initial release. Definitions specific to the schema generated from YANG models. |

## rfc7223

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| ietf_interfaces | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |
| ietf_interfaces.interfaces | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |
| ietf_interfaces.interfacesCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |
| ietf_interfaces.interfaces_state | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |
| ietf_interfaces.interfaces_stateCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |
| ietf_interfaces.interfaces_state.statistics | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7223. |

## rfc7224

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| ietf_if_type | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7224. |

## rfc7277

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| ietf_ip | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv4 | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv4.address | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv4.addressCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv4.neighbor | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv4.neighborCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6 | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.address | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.addressCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.autoconf | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.autoconfCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.neighbor | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |
| ietf_ip.ipv6.neighborCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7277. |

## rfc7317

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| ietf_system | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.clock | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.dns_resolver | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.dns_resolver.server | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.dns_resolver.serverCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.dns_resolver.server.udp_and_tcp | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.dns_resolver.options | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.ntp | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.ntp.server | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.ntp.serverCollection | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system.ntp.server.udp | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system_state | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system_state.clock | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
| ietf_system.system_state.platform | 1.0.0a | 2017-07-31 | Initial release. Mapped from rfc7317. |
