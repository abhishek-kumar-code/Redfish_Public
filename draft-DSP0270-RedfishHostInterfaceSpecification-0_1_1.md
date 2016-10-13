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

Implementations that support the "Network Host Interface" protocol shall implement the following requirements:

* Implementations shall provide a TCP/IP network connection that route TCP/IP traffic between a Redfish client executing on the host and the Manager.

* Any link-level driver and interconnect that implements a TCP/IP network connection between the host and manager may be used.  Example implementations include:
  * A  USB Network Connection between host and manager
  * A host PCIe NIC that connects to a manager NIC
  * A host PCIe NIC that connects to a management LAN that connects to a manager

* Authentication, and privilege authorization equivalent to the out-of-band Redfish API as specified in DSP0266 shall be supported by the implementation when enabled from the manager configuration. 
  * Implementations may support a configurable AuthNone authentication mode (no authentication required) that can be configured on the manager.   If implemented, enablement of AuthNone shall be configurable, and the RoleId assumed by AuthNone requests shall be configurable.

* Services shall require HTTPS encryption for the Network Host Interface with same requirements as via out-of-band network interfaces:
  * Session Login POSTs shall use HTTPS
  * Patches that contain sensitive data shall use HTTPS
  * Basic Auth requests shall require HTTPS

* Implementations should implement an SMBIOS Type 42 structure that describes each host interface as described in section (SMBIOS Link)

* Support for automatically generating and sending credentials to the host OS kernel and/or firmware using UEFI runtime variables should be implemented as defined in section  (Kernel Authentication Link).  
  * If the Kernal Authentication Interface is implemented, Redfish services shall implement a configuration option that allows customers to disable the Kernel Authentication
  * If the Kernel Authentication Interface is implemented, Redfish service shall implement a configurable privileges for this kernel interface shall be configurable.



## SMBIOS Support
The host should support an SMBIOS Type 42 structure that defines the attributes of the Redfish Host Interfaces that are supported for the system. 

Information in the structure will allow host software to discover the Redfish Manager interfaces supported and to initialize the host-side driver stack.  

* For Network Host interfaces, the mechanism that clients should use to discover/obtain the manager IP address will also be described in the structure

The following table describes the SMBIOS (Type 42) structure for a Netowrk Host Interface interface:


| Offset  | Name             | Length   | Value    | Description     |
| ---     | ---              | ---      | ---      | ---             |
| 00h     | Type             | BYTE     | 42       | Management Controller Host Interface structure indicator      |
| 01h     | Length           | BYTE     | Varies   | Lengthh of the structure, a minimum of 09h      |
| 02h     | Handle           | WORD     | Varies   |       |
| 04h     | Interface Type   | BYTE     | 09h      | Management Controller Interface Type.  (Network Host Interface = 09h )    |

Following the above 4 fields is the Interface Specific Data:

| Offset  | Name     | Length   | Value    | Description     |
| ---     | ---      | ---      | ---      | ---             |
| 05h     | Length     | BYTE     | Varies       | if 0, there is no Interface specific data      |
| 06h     | Device Type   | BYTE     | Enum       | Unknown=0h1, <br/> USB Network Interface=02h, <br/> PCI/PCIe Network Interface=03h,  <br/> OEM=04h       |
|      | Device Descriptors for USB       |      |        | <br/> idVendor(2-bytes),  <br/> idProduct(2-bytes), <br/> iSerialNumber: <br/>  -- bLength(1-Byte), <br/> -- bDescriptorType(1-Byte), <br/> -- bString(Varies) )      |
|      | Device Descriptors for PCI/PCIe     |      |        | VendorID(2-Bytes), <br/> DeviceID(2-Bytes), <br/> Subsystem_Vendor_ID(2-bytes), <br/> Subsystem_ID(2-bytes)      |
|      | Device Descriptors for OEM     |      |        | vendor_IANA(4-bytes),  <br/> OEM defined data      |

Protocol Specific Data header follows:

| Offset  | Name     | Length   | Value    | Description     |
| ---     | ---      | ---      | ---      | ---             |
| n       | Length     | BYTE     | Varies       | if 0, there is no protocol specific data      |
| n+1     | Number of Protocols     | BYTE     | 01h       | one protocol defined for this host interface      |
| n+2     | Protocol 1 Type     | BYTE     | 04h       | Redfish over IP = 04h      |

Protocol specific data for Redfish Over IP protocol follows:

| Offset  | Name     | Length   | Value    | Description     |
| ---     | ---      | ---      | ---      | ---             |
| m       | Length     | BYTE     | varies       | length of protocol specific data for Redfish Over IP protocol      |
| m+1     | Service UUID     | 16BYTEs     | Varies       | same as Redfish Service UUID in Redfish Service Root resource    |
| m+17     | Host IP Assignment Type     | BYTE     | Enum       | Unknown=01h, <br/>    Static=02h, <br/>  DHCP=03h, <br/>    AutoConfigure=04h, <br/>  HostSelected=05h      |
| m+18     | Host IP Address Format     | BYTE     | Enum       | Unknown=01h,   <br/> Ipv4=01h,    <br/> Ipv6=02h      |
| m+19     | Host IP Address     | 4BYTE / 16BYTE     | Varies       | Used for Static and AutoConfigure.  Size is 4Bytes for Ipv4.  Size is 16Btyes for IPV6      |
| m+23/35     | Host IP Mask     | 4BYTE / 16BYTE     | Varies       | Used for Static and AutoConfigure.  Size is 4Bytes for Ipv4.  Size is 16Btyes for IPV6      |
| m+27/51     | Host IP Port     | WORD     | Varies       | Used for Static and AutoConfigure      |
| m+31/55     | Host VLAN ID     | DWORD     | Varies       | Used for Static and AutoConfigure      |
| m+39/63     | Manager IP Discovery Type     | BYTE     | Enum       | Unknown=01h,    <br/> Static=02h,   <br/> DHCP=03h,     <br/> AutoConfigure=04h,   <br/> HostSelected=05h      |
| m+40/64     | Manager IP Address Format     | BYTE     | Enum       | Unknown=01h,   <br/> Ipv4=01h,    <br/> Ipv6=02h      |
| m+41/65     | Manager IP Address     | 4BYTE / 16BYTE     | Varies       | Used for Static and AutoConfigure.  Size is 4Bytes for Ipv4.  Size is 16Btyes for IPV6      |
| m+x     | Manager IP Mask     | 4BYTE /16BYTE    | Varies       | Used for Static and AutoConfigure.  Size is 4Bytes for Ipv4.  Size is 16Btyes for IPV6      |
| m+x     | Manager IP Port     | WORD     | Varies       | Used for Static and AutoConfigure.      |
| m+x     | Manager VLAN ID     | DWORD     | Varies       | Used for Static and AutoConfigure.      |
| m+x     | Manager Hostname Length     | BYTE     | Varies       | length of the following hostname string      |
| m+x     | Manager Hostname     | varies     | Varies       | hostname of manager      |




## Kernel Authentication Interface via UEFI Runtime Variables

This section defines a mechanism for automatically generating and sending credentials to the host OS kernel and/or firmware using UEFI runtime variables.
Services that implement the kernal authentication mechanism shall comply with the following sub-sections:

### Credential Generation and Management for Host Sessions for Firmware and OS kernel

Opening a Redfish session on the host interface may accomplished by use of any authorized Redfish credentials consisting of valid username and password.  However in some situations it may be difficult to pre-provision the system with valid Redfish credentials for use by OS and Firmware clients of Redfish.  Examples of this include (a) early provisioning of new systems and (b) systems where firmware does not have secure storage to hide the credentials.

To provide for situations of this type, systems supporting the Redfish service may be configured to provide temporary logon credentials for use by Firmware Pre-boot elements and/or OS.  If implemented, the credentials shall be implemented following the following requirements:

* The credentials shall be be auto-generated by the Redfish Service and provided to firmware and OS using the UEFI variable interface variables described herein at the initiation of each OS boot.  
* The generation of both Firmware and OS credentials shall be user-configurable with the option to disable or enable generation of the credentials separately for both Firmware and OS kernel.
* The permissions of the resulting session shall be configurable through Manager configuration.
* The supplied credentials shall be in the form of a user id and password -- both auto-generated by the Redfish Service.
* Only one session using these supplied credentials shall be allowed at a time.   
* The session associated with the credentials shall not timeout or expire.
* The Redfish service may close the session if it resets or for other policy reasons in which case the host may re-open the session using the same credentials.   
* Any open session started with firmware credentials shall be closed and the credentials invalidated at UEFI ExitBootServices()event. 
* Any open session started with OS credentials will be closed and new credential passwords generated when host restart is detected
* The Firmware Credentials shall be made available for any agent or driver that operates within the UEFI pre-boot prior to ExitBootServices() call. This may include local system ROM firmware or utility firmware applications downloaded from external sources.

### Security Considerations for kernel Auth

It is recommended that system designers protect the credentials from unauthorized access. The use of UEFI Secure Boot to protect access to credentials is recommended. 
Because of the difficulty of defining a security procedure for Legacy-booting OS, delivery of credentials to Legacy OS is not described by this specification and any Legacy OS support is OEM specific.
The system OS is provided with a method of disabling further retrieval of the credentials after initial authorized retrieval. System designers are encouraged to implement such a scheme of retrieve, store, and disable to avoid unauthorized reading of the credential variables

### UEFI Implementation

Implementations that present host interface for use by system firmware and OS shall use the UEFI Variables defined in this section to deliver credentials for the host interface.

The design of this delivery mechanism is compatible with any UEFI version starting with 2.3.1. Please refer to the specifications available at www.uefi.org for details on using the UEFI variable calls described here


#### Prototype

* #define EFI_REDFISH_INFORMATION_GUID \
  * {0x16faa37e, 0x4b6a, 0x4891, {0x90, 0x28, 0x24, 0x2d, 0xe6, 0x5a, 0x3b, 0x70 }}
* #define EFI_REDFISH_INFORMATION_INDICATIONS 	L”RedfishIndications”
* #define EFI_REDFISH_INFORMATION_FW_CREDENTIALS 	L”RedfishFWCredentials”
* #define EFI_REDFISH_INFORMATION_OS_CREDENTIALS	L”RedfishOSCredentials”


#### Related Definitions
* #define EFI_REDFISH_INDICATIONS_FW_CREDENTIALS 	0x00000001
* #define EFI_REDFISH_INDICATIONS_OS_CREDENTIALS 	0x00000002


#### Description

This GUID and these variable names are used when calling the EFI Runtime Services GetVariable(). As described below, the SetVariable() interface can be used to disable further access to the credential information.
The variables defined in this section have the following attributes:

* EFI_REDFISH_INFORMATION_INDICATIONS  and EFI_REDFISH_INFORMATION_OS_CREDENTIALS   have attributes EFI_VARIABLE_BOOTSERVICE_ACCESS and EFI_VARIABLE_RUNTIME_ACCESS
* EFI_REDFISH_INFORMATION_FW_CREDENTIALS has attribute EFI_VARIABLE_BOOTSERVICE_ACCESS

The variable EFI_REDFISH_INFORMATION_INDICATIONS shall return a 32-bit value, and provides information if any credentials are provided for host software use. The bits defined with this variable shall be interpreted as follows:

* If EFI_REDFISH_ INDICATIONS_FW_CREDENTIALS bit is 1, the Redfish host interface is configured to provide credentials for use by system firmware.  
* If EFI_REDFISH_ INDICATIONS_OS_CREDENTIALS bit is 1, the Redfish host interface is configured to provide a credentials for use by system OS.
* All other bits in EFI_REDFISH_ INDICATIONS_HOST_IF are reserved.

When the Redfish implementation provides credentials for firmware use, the variable EFI_REDFISH_INFORMATION_FW_CREDENTIALS will contain UTF-8 array formatted as describe in the next section. If this session is not available as defined by current system policy, this variable will return EFI_NOT_FOUND.

When the Redfish implementation provides a credentials for OS use, the variable EFI_REDFISH_INFORMATION_OS_CREDENTIALS  will contain credentials formatted according to the following section. If these credentials are not available as defined by current system policy, this variable will return EFI_NOT_FOUND.

The password contained in these variables shall be recalculated so as to be unique and not easily predicted on each boot.

If the variables EFI_REDFISH_INFORMATION_FW_CREDENTIALS  or EFI_REDFISH_INFORMATION_OS_CREDENTIALS are accessed using the SetVariable() function with a DataSize of zero, the variable contents will be deleted until the next system restart and not be available for retrieval by future GetVariable() calls.  After such SetVariable() access any GetVariable() attempt will return EFI_NOT_FOUND error. Calls to SetVariable() with non-zero DataSize shall be processed as if DataSize is zero


#### Variable Format

The UEFI variables for delivery of temporary credentials shall contain an array of UTF-8 characters in the format Username:Password where the : character shall act as separator.   The final byte of the array shall be 0x00 as terminator and the size of the variable shall be length of Username plus length of Password plus 2. Characters shall be chosen from the set elsewhere defined as legal for Redfish Username and Password.

For convenience when identifying the auto-generated credentials when active and for the purpose of editing permissions, the following Username strings shall be used:

| Default Firmware Auto Username  | HostAutoFW                |
| Default OS AUto Username        | HostAUtoOS                    |               
    

## ANNEX A (informative)

### Change log

| Version | Date     | Description     |
| ---     | ---      | ---             |
| 1.0.0   | 2015-8-4 | Initial release |



