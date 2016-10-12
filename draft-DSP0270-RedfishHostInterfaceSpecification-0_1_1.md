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
* Jeff Bobsen - Insyde
* Patrick Caporale - Lenovo
* Phil Chidester – Dell Inc.
* Chris Davenport - Hewlett Packard Enterprise
* Samer El-Haj-Mahmoud - Lenovo
* Wassim Fayed - Microsoft Corporation
* Jeff Hilland - Hewlett Packard Enterprise
* John Leung - Intel Corporation
* Michael Raineri - Dell Inc.
* Hemal Shah - Broadcom Limited
* Paul Vancil - Dell Inc.
* Linda Wu - Super Micro Computer, Inc.

## Abstract
This specification defines functional requirements for Redfish Host Interfaces. In the context of this document, the term "host interface" refers to interfaces that can be used by software running on a computer system to access the Redfish Service that is used to manage that computer system.

The target audience for this specification is system manufacturers that are providing Redfish Host Interfaces within computer systems, system and component manufactures that are providing devices or firmware that include or support Redfish Host interfaces, and system firmware and software writers that are creating software or firmware that uses Redfish Host Interfaces
.

## Normative references

The following referenced documents are indispensable for the application of this document. For dated or versioned references, only the edition cited (including any corrigenda or DMTF update versions) applies. For references without a date or version, the latest published edition of the referenced document (including any corrigenda or DMTF update versions) applies.x

* <a id="DMTFDSP0134">DMTF DSP0124</a> System Management BIOS Reference Specification (SMBIOS)
* <a id="DMTFDSP0256">DMTF DSP0256</a> Management Component Transport Protocol (MCTP) Base Specification
* <a id="DMTFDSP0266">DMTF DSP0266</a> Redfish Scalable Platforms Management API Specification
* <a id="ISODIR">ISO/IEC Directives, Part 2</a> Rules for the structure and drafting of International Standards, [http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype](http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype "http://isotc.iso.org/livelink/livelink.exe?func=ll&objId=4230456&objAction=browse&sort=subtype")


## Terms and definitions
In this document, some terms have a specific meaning beyond the normal English meaning. Those terms are defined in this clause.

The terms "shall" ("required"), "shall not", "should" ("recommended"), "should not" ("not recommended"), "may", "need not" ("not required"), "can" and "cannot" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Annex H. The terms in parenthesis are alternatives for the preceding term, for use in exceptional cases when the preceding term cannot be used for linguistic reasons. Note that ISO/IEC Directives, Part 2, Annex H specifies additional alternatives. Occurrences of such additional alternatives shall be interpreted in their normal English meaning.

The terms "clause", "subclause", "paragraph", and "annex" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 5.

The terms "normative" and "informative" in this document are to be interpreted as described in ISO/IEC Directives, Part 2, Clause 3. In this document, clauses, subclauses, or annexes labeled "(informative)" do not contain normative content. Notes and examples are always informative elements.

The following additional terms are used in this document.

| Term                            | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                             | ---          

| Host    | x                     |
| Host Processor    | x                     |
| Host Software    | x                     |
| System Firmware    | x                     |
| Redfish    | x                     |
| Redfish Service    | x                     |
| Service Entry Point    | x                     |
| Manager    | x                     |
| Redfish Manager    | x                     |



## Symbols and abbreviated terms

The following additional abbreviations are used in this document.

| Term   | Definition                                          
|
| ---    | ---                                                 
|
| BMC    | Baseboard Management Controller                     |
| BIOS   | Basic I/O System. Name for system firmware typically used for initialization and launching the boot of an ISA (Industry Standard Architecture), aka 'x86' or 'PC', architecture-based computer system                  |
| BSP   | Board Support Package. Name for system firmware typically used for initialization and launching the boot of Linux in a computer system that uses a non-ISA architecture, but may be used for booting other types of operating systems or run-time software                          |
| SMBIOS   | System Management BIOS. Refers to DSP0134. Defines memory mapped tables, typically implemented by system firmware/BIOS and mapped into system firmware/BIOS memory space, that provide inventory and management information for the computer system.                         |
| HTTPS  | Hypertext Transfer Protocol over TLS                |
| IP     | Internet Protocol                                   |
| IPMI   | Intelligent Platform Management Interface           |
| PCIe   | PCI Express                                         |
| TCP    | Transmission Control Protocol                       |

## Introduction
The initial Redfish specification defines a TCP/IP-based out-of-band interface between a client and a Management Controller
The initial base Redfish Specification does not define a standard host interface e.g IPMI
Significant user feedback has been received that a DMTF standard Redfish “In-band” Host Interface (HI) is needed:

* So that Apps/tools running on a system OS (both deployment OS’s and production OS’s) can communicate with the Redfish manager that is managing the system using the Redfish API
* In future, the host OS and UEFI/BIOS may also benefit from being able to communicate with the manager using a standard Redfish API


## Scope

This specification is targeted to system manufacturers that are providing Redfish Host Interfaces within computer systems, system and component manufactures that are providing devices or firmware that include or support Redfish Host interfaces, and system firmware and software writers that are creating software or firmware that uses Redfish Host Interfaces.

Within this specification the term "host processor" is used to refer to the main processors, or CPUs, of the managed computer system. This should not be confused with the Redfish Manager which represents the physical or logical processor that is used for implementing the Service Entry Point for the Redfish Service.

The terms "host software", "host firmware", and "BIOS", refer to code that is executed on a host processor. The term "host" alone will be used to refer to the computer system that contains the host processors and software that are accessing a Redfish Service that provides manageability functions for that host. The host interface may also be thought of as the interface between the host and the Redfish Manager that is the gateway to that Redfish Service. 

The specification covers host accessible physical and logical communication paths and protocols that are used to access the Redfish Service that manages that host. 

The specification also defines certain supporting elements in the host, such as SMBIOS extensions, that enable inventory and discovery functions.  
The specification may define particular hardware requirements for the host visible portions of the interface, such as register locations. Otherwise, the specification does not seek to place particular physical hardware requirements on the implementation behind the interface. For example, it should not matter whether the interface is implemented in a particular component, such as a microcontroller, network controller, chipset, virtual machine, and so on, as long as the host visible elements and functionality of the interface meet the specification.

The host interface is primarily targeted at providing 'run time' or 'post boot' software access. That is, it is targeted for use by host software that executes after the computer system firmware, BSP, or BIOS has transferred flow of control to an operating system, hypervisor, service agent, PXE image, VMM, and so on. The specification may also be used by 'pre-boot' firmware or software. The specification may include additional provisions for supporting pre-boot interfaces and functionality.

The specification and implementation requirements for pre-boot and post-boot interfaces are separable. That is, a post-boot interface that meets this specification does not require the implementation of a pre-boot interface that meets this specification, and vice versa.

This specification itself does not define particular host firmware, software, software architectures or designs, or software interfaces, such as driver interfaces or APIs, for the host interface. However, this specification may define certain steps that pre-boot firmware or post-boot software may need to take to discover and utilize the interface. The specification may also indicate that certain functionality and software elements, such as networking stacks or hardware drivers have been assumed to be present in the host software as considerations behind the design and typical usage of the host interface.


### Goals
The following goals where established for the Redfish Host Interface:

* Implementable with typical MC technology
* Easily integrated into products 
* In-band HI and out-of-band API must be the same (where possible) so that client apps will have minimal (if any) change to adapt
* Support authentication, confidentiality, and  integrity:
  * Support environments where users do not want to solely rely on host/OS access control mechanisms
  * Provide mechanism to optionally (if configured) pass credentials to an OS Kernel for sensor monitoring (with configurable privilege)
* Support multi-manager to multi-host architectures:
  * Blade system with Chassis Mgr and MCs on each blade each w/ HI
* Initial priority targeting a Host OS clients.  
  * But, longer-term, add support pre-OS clients e.g. BIOS/UEFI and OS boot path


## Protocol details

Two Host Interface models have been considered:

* Network HI -- Redfish HTTP requests/responses over a TCP/IP network connection between Host and Manager
* MCTP HI -- Redfish HTTP requests/responses over an MCTP connection between the host and Manager

The initial specification fully defines the Network HI, and creates the framework for later updates that will define the MCTP HI.

### Network Host Interface Details

* A Network Host Interface provides a TCP/IP network connection that routes TCP/IP traffic between the Redfish client software running on the host OS and the Manager.  
* Any link-level driver and interconnect that routes TCP/IP may be used.  
* Authentication, encryption, and authorization equivalent to the out-of-band Redfish API is included in the definition. 
  * Implementations should support the full authentication, encryption, and authorization for Network Host interfaces.  
  * Implementations may also support AuthNone or un-encrypted connections when passing credentials if so configured.
* A mechanism to automatically pass credentials to the host OS kernel using UEFI runtime variables is also  defined
  * Users may disable this if desired 
  * The privileges for this kernel interface shall be configurable.  In many cases the privilege is expected to be limited to reading sensors



### MCTP Host Interface Details
* An MCTP-based Host Interface provides an MCTP Host Interface compliant with DSP0256 that routes Redfish requests and responses over MCTP between the Redfish host software and the Manager
* Any physical interconnect between the host and manager that has a MCTP host transport binding (as defined in DSP0256) may be used
* The SPMF and PMCI will specify a mapping of HTTP to MCTP sufficient to carry Redfish requests/responses. 
* Authentication, encryption, and authorization will be supported in the MCTP HI definition.
* The mechanism to pass credentials up to the host OS kernel will also be supported.


### SMBIOS Support
The host may support an SMBIOS Type 42 struct that defines the attributes of the Redfish Host Interfaces that are supported for the system. 

Information in the structure will allow host software to discover the Redfish Manager interfaces supported and to initialize the host-side driver stack.  

* For Network Host interfaces, the mechanism that clients should use to discover/obtain the manager IP address will also be described in the structure


### Kernel Authentication via UEFI Runtime Variables

An attractive feature of the RESTful interface is the very limited number of operations which are supported. The following table describes the general mapping of operations to HTTP methods.  If the value in the column entitled "required" has the value "yes" then the HTTP method shall be supported by a Redfish interface.




#### Privilege model/Authorization

Services shall require Authentication and encryption via the Host Interface with same requirements as via out-of-band network interfaces:

* Session Login POSTs shall use encryption
* Patches that contain sensitive data shall use encryption
* Basic Auth requests shall require encryption



## ANNEX A (informative)

### Change log

| Version | Date     | Description     |
| ---     | ---      | ---             |
| 1.0.0   | 2015-8-4 | Initial release |



