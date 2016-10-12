---
DocTitle: Redfish Host Interface Specification
DocNumber: '0270'
DocClass: Normative
DocVersion: '0.1.1'
modified: '2016-09-22'
SupersedesVersion: '1.1.0'
status: in-development
released: false
copyright: '2014-2016'
---

# Foreword

The Redfish Host Interface Specification was prepared by the Scalable Platforms Management Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.

# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:

* Jeff Autor - Hewlett Packard Enterprise
* Jeff Bobzin - Insyde Software Corp
* Patrick Caporale - Lenovo
* Phil Chidester – Dell Inc.
* Chris Davenport - Hewlett Packard Enterprise
* Samer El-Haj-Mahmoud - Lenovo
* Jeff Hilland - Hewlett Packard Enterprise
* John Leung - Intel Corporation
* Edward Newman - Hewlett Packard Enterprise
* Michael Raineri - Dell Inc.
* Hemal Shah - Broadcom Limited
* Paul Vancil - Dell Inc.

## Abstract
This specification defines functional requirements for Redfish Host Interfaces. In the context of this document, the term "host interface" refers to interfaces that can be used by software running on a computer system to access the Redfish Service that is used to manage that computer system.

The target audience for this specification is system manufacturers that are providing Redfish Host Interfaces within computer systems, system and component manufactures that are providing devices or firmware that include or support Redfish Host interfaces, and system firmware and software writers that are creating software or firmware that uses Redfish Host Interfaces
.

## Normative references

The following referenced documents are indispensable for the application of this document. For dated or versioned references, only the edition cited (including any corrigenda or DMTF update versions) applies. For references without a date or version, the latest published edition of the referenced document (including any corrigenda or DMTF update versions) applies.x

* <a id="DMTFDSP0134">DMTF DSP0124</a> System Management BIOS Reference Specification (SMBIOS)
* <a id="UEFISPEC"> UEFI </a> Unified Extensible Firmwre Interface Specification (UEFI), version 2.6
* <a id="DMTFDSP0256">DMTF DSP0256</a> Management Component Transport Protocol (MCTP) Base Specification
* <a id="DMTFDSP0239"> DMTF DSP0239</a> Management Compoonent Transport Protocol (MCTP) IDs and Codes
* <a id="DMTFDSP0266">DMTF DSP0266</a> Redfish Scalable Platforms Management API Specification
* <a id="DMTFDSP8010">DMTF DSP8010</a> Redfish API Schema
* <a id="ISODIR">ISO/IEC Directives, Part 2</a> Rules for the structure and drafting of International Standards, [http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype](http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype "http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype")


## Terms and definitions
In this document, some terms have a specific meaning beyond the normal English meaning. Those terms are defined in this clause.

The terms "shall" ("required"), "shall not", "should" ("recommended"), "should not" ("not recommended"), "may", "need not" ("not required"), "can" and "cannot" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Annex H. The terms in parenthesis are alternatives for the preceding term, for use in exceptional cases when the preceding term cannot be used for linguistic reasons. Note that ISO/IEC Directives, Part 2, Annex H specifies additional alternatives. Occurrences of such additional alternatives shall be interpreted in their normal English meaning.

The terms "clause", "subclause", "paragraph", and "annex" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 5.

The terms "normative" and "informative" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 3. In this document, clauses, subclauses, or annexes labeled "(informative)" do not contain normative content. Notes and examples are always informative elements.

The following additional terms are used in this document.

| Term                            | Definition       |
| ---                             | ---              |
| Host                            | x                |
| Host Processor                  | x                |
| Host Software                   | x                |
| Redfish                         | x                |
| Redfish Service                 | x                |
| Service Entry Point             | x                |
| Manager                         | x                |
| Redfish Manager                 | x                |

## Symbols and abbreviated terms

The following additional abbreviations are used in this document.

| Term   | Definition                                          
| ---    | ---                                                 
| BIOS   | Basic I/O System. Name for system firmware typically used for initialization and launching the boot of an ISA (Industry Standard Architecture), aka 'x86' or 'PC', architecture-based computer system                  
| BSP   | Board Support Package. Name for system firmware typically used for initialization and launching the boot of Linux in a computer system that uses a non-ISA architecture, but may be used for booting other types of operating systems or run-time software                      
| SMBIOS   | System Management BIOS. Refers to DSP0134. Defines memory mapped tables, typically implemented by system firmware/BIOS and mapped into system firmware/BIOS memory space, that provide inventory and management information for the computer system.                         
| HTTPS  | Hypertext Transfer Protocol over TLS                
| IP     | Internet Protocol                                   
| IPMI   | Intelligent Platform Management Interface           
| PCIe   | PCI Express                                         
| TCP    | Transmission Control Protocol                       |

## Introduction
The initial Redfish specification defines a TCP/IP-based out-of-band interface between a client and a Management Controller.
It does not define a standard host interface (e.g IPMI).
However, significant user feedback has been received that a DMTF standard Redfish “In-band” Host Interface (HI) is needed
so that applications/tools running on a system OS can communicate with the Redfish manager that is managing the system using the Redfish API.  This Redfish host interface need applies to both deployment OS’s and production OS’s and OS kernels for reading sensors.

## Scope

This specification is targeted to system manufacturers that are providing Redfish Host Interfaces within computer systems, system and component manufactures that are providing devices or firmware that include or support Redfish Host interfaces, and system firmware and software writers that are creating software or firmware that uses Redfish Host Interfaces.

The specification covers host accessible physical and logical communication paths and protocols that are used to access the Redfish Service that manages that host. 

The specification also defines certain supporting elements in the host, such as SMBIOS extensions, that enable inventory and discovery functions.  

The specification does not seek to place specific hardware implementation requirements; however, it does i some cases specify how hardware-specific interfaces are identified for host software (e.g. SMBIOS structures).


### Goals
The following goals where established for the Redfish Host Interface:

* Implementable with existing management controller technology
* Easily integrated into products 
* In-band HI and out-of-band API must be the same (where possible) so that client apps will have minimal (if any) change to adapt
* Support authentication, confidentiality, and  integrity:
  * Support environments where users do not want to solely rely on host/OS access control mechanisms
  * Provide mechanism to optionally (if configured) pass credentials to an OS Kernel for sensor monitoring (with configurable privilege)
* Support multi-manager to multi-host architectures:
  * Blade system with Chassis Manager as well as sled management controller on each blade, each with a host interface
* Support security requirements with authentication and confidentiality.  
  * But, longer-term, add support pre-OS clients e.g. BIOS/UEFI and OS boot path


## Protocol details

A Redfish Host Interface shall support one of the following protocols:

* Network HI -- Redfish HTTP requests/responses over a TCP/IP network connection between a Host and Manager


### Network Host Interface Protocol Details

Implementations that support the "Network Host Interface" shall implement a TCP/IP network connection that routes TCP/IP traffic between the Redfish client software running on the host OS and the Manager.

* Any link-level driver and interconnect that routes TCP/IP may be used.  Example implementations include:
  * A  USB Network Connection between host and manager
  * A host PCIe NIC that connects to a manager NIC
  * A host PCIe NIC that connects to a management LAN that connects to a manager

* Authentication, and authorization equivalent to the out-of-band Redfish API shall be supported if enabled via manager configuration. 
  * However, implementations may support an AuthNone authentication mode (no authentication required) that can optionally be configured on the manager.   If implemented the RoleId assumed by AuthNone requests shall be configurable.

* Services shall require HTTPS encryption for the Network Host Interface with same requirements as via out-of-band network interfaces:
  * Session Login POSTs shall use HTTPS
  * Patches that contain sensitive data shall use HTTPS
  * Basic Auth requests shall require HTTPS

* A mechanism to automatically pass credentials to the host OS kernel using UEFI runtime variables may be implemented as defined in section  (Kernel Authentication Link).  
  * If the Kernal Authentication Interface is implemented, Redfish services shall implement a configuration option that allows customers to disable the Kernel Authentication
  * If the Kernel Authentication Interface is implemented, Redfish service shall implement a configurable privileges for this kernel interface shall be configurable.



### SMBIOS Support
The host may support an SMBIOS Type 42 struct that defines the attributes of the Redfish Host Interfaces that are supported for the system. 

Information in the structure will allow host software to discover the Redfish Manager interfaces supported and to initialize the host-side driver stack.  

* For Network Host interfaces, the mechanism that clients should use to discover/obtain the manager IP address will also be described in the structure


### Kernel Authentication Interface via UEFI Runtime Variables

Import kernel auth text




## ANNEX A (informative)

### Change log

| Version | Date     | Description     |
| ---     | ---      | ---             |
| 1.0.0   | 2015-8-4 | Initial release |



