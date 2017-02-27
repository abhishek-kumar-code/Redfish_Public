---
title: Baseline Switch Model 
abbrev: I-D
docname: draft-name-wg-topic-00
date: 2017-03-13
category: info
ipr: trust200902

author:
 -
    ins: Y. Name
    name: Your Name
    organization: Your Organization, Inc.
    email: you@example.com

normative:
  RFC2119:

informative:

--- abstract

[ Insert abstract here ]

--- middle

# Introduction
This is a normative profile for Baseline Switch Profile 
(send into IETF RTG) intended to be published as RFC on completion of DMTF spec to wrap Baseline Switch Profile.
 
**implications: 
IETF has change control of the profile itself 
publication sequencing**

# What is a Redfish Baseline Switch?
* summary
	* "here is a class of switches"
	* "what does it take to manage a such a switch" 
* This answer constitutes a profile of a particular switch class
	* list of proposed YANG modules
	* RFC#, Draft-ID with short description of each
	* relationships among the modules

The baseline switch profile contains basic system, interface, L2, and L3 configuration elements sufficient to setup the device for use in a controller based converged infrastructure environment.

# Core YANG RFCs		
https://tools.ietf.org/html/rfc6020
Provides the YANG modeling language definition.

	https://tools.ietf.org/html/rfc6991
Provides the Common YANG Data Types used by many other IETF YANG modules.

Interface
	
	https://tools.ietf.org/html/rfc7223 
	https://tools.ietf.org/html/rfc7277
	https://tools.ietf.org/html/rfc7224		

## RCF7223 provides:

      +--rw interfaces
      |  +--rw interface* [name]
      |     +--rw name                        string
      |     +--rw description?                string
      |     +--rw type                        identityref
      |     +--rw enabled?                    boolean
      |     +--rw link-up-down-trap-enable?   enumeration
      +--ro interfaces-state
         +--ro interface* [name]
            +--ro name               string
            +--ro type               identityref
            +--ro admin-status       enumeration
            +--ro oper-status        enumeration
            +--ro last-change?       YANG:date-and-time
            +--ro if-index           int32
            +--ro phys-address?      YANG:phys-address
            +--ro higher-layer-if*   interface-state-ref
            +--ro lower-layer-if*    interface-state-ref
            +--ro speed?             YANG:gauge64
            +--ro statistics
               +--ro discontinuity-time    YANG:date-and-time
               +--ro in-octets?            YANG:counter64
               +--ro in-unicast-pkts?      YANG:counter64
               +--ro in-broadcast-pkts?    YANG:counter64
               +--ro in-multicast-pkts?    YANG:counter64
               +--ro in-discards?          YANG:counter32
               +--ro in-errors?            YANG:counter32
               +--ro in-unknown-protos?    YANG:counter32
               +--ro out-octets?           YANG:counter64
               +--ro out-unicast-pkts?     YANG:counter64
               +--ro out-broadcast-pkts?   YANG:counter64
               +--ro out-multicast-pkts?   YANG:counter64
               +--ro out-discards?         YANG:counter32
               +--ro out-errors?           YANG:counter32

## RFC7277 Adds:
      +--rw if:interfaces
        +--rw if:interface* [name]
           ...
           +--rw ipv4!
           |  +--rw enabled?            boolean
           |  +--rw forwarding?         boolean
           |  +--rw mtu?                uint16
           |  +--rw address* [ip]
           |  |  +--rw ip               inet:ipv4-address-no-zone
           |  |  +--rw (subnet)
           |  |     +--:(prefix-length)
           |  |     |  +--rw ip:prefix-length?   uint8
           |  |     +--:(netmask)
           |  |        +--rw ip:netmask?         YANG:dotted-quad
           |  +--rw neighbor* [ip]
           |     +--rw ip                    inet:ipv4-address-no-zone
           |     +--rw link-layer-address    YANG:phys-address
           +--rw ipv6!
              +--rw enabled?            boolean
              +--rw forwarding?         boolean
              +--rw mtu?                uint32
              +--rw address* [ip]
              |  +--rw ip               inet:ipv6-address-no-zone
              |  +--rw prefix-length    uint8
              +--rw neighbor* [ip]
              |  +--rw ip                    inet:ipv6-address-no-zone
              |  +--rw link-layer-address    YANG:phys-address
              +--rw dup-addr-detect-transmits?   uint32
              +--rw autoconf
                 +--rw create-global-addresses?        boolean
                 +--rw create-temporary-addresses?     boolean
                 +--rw temporary-valid-lifetime?       uint32
                 +--rw temporary-preferred-lifetime?   uint32

	AND

     +--ro if:interfaces-state
        +--ro if:interface* [name]
           ...
           +--ro ipv4!
           |  +--ro forwarding?   boolean
           |  +--ro mtu?          uint16
           |  +--ro address* [ip]
           |  |  +--ro ip               inet:ipv4-address-no-zone
           |  |  +--ro (subnet)?
           |  |  |  +--:(prefix-length)
           |  |  |  |  +--ro prefix-length?   uint8
           |  |  |  +--:(netmask)
           |  |  |     +--ro netmask?         YANG:dotted-quad
           |  |  +--ro origin?          ip-address-origin
           |  +--ro neighbor* [ip]
           |     +--ro ip                    inet:ipv4-address-no-zone
           |     +--ro link-layer-address?   YANG:phys-address
           |     +--ro origin?               neighbor-origin
           +--ro ipv6!
              +--ro forwarding?   boolean
              +--ro mtu?          uint32
              +--ro address* [ip]
              |  +--ro ip               inet:ipv6-address-no-zone
              |  +--ro prefix-length    uint8
              |  +--ro origin?          ip-address-origin
              |  +--ro status?          enumeration
              +--ro neighbor* [ip]
                 +--ro ip                    inet:ipv6-address-no-zone
                 +--ro link-layer-address?   YANG:phys-address
                 +--ro origin?               neighbor-origin
                 +--ro is-router?            empty
                 +--ro state?                enumeration

## RCF7224 provides
The set of YANG identity statement for the IANA defined interface types.

* System Identification
* System Time Date
* NTP
* DNS Client		
		

System Identification

      +--rw system
      |  +--rw contact?          string
      |  +--rw hostname?         inet:domain-name
      |  +--rw location?         string
      +--ro system-state
         +--ro platform
            +--ro os-name?       string
            +--ro os-release?    string
            +--ro os-version?    string
            +--ro machine?       string

System Time

      +--rw system
      |  +--rw clock
      |  |  +--rw (timezone)?
      |  |     +--:(timezone-name)
      |  |     |  +--rw timezone-name?     timezone-name
      |  |     +--:(timezone-utc-offset)
      |  |        +--rw timezone-utc-offset?   int16
      |  +--rw ntp!
      |     +--rw enabled?   boolean
      |     +--rw server* [name]
      |        +--rw name                string
      |        +--rw (transport)
      |        |  +--:(udp)
      |        |     +--rw udp
      |        |        +--rw address    inet:host
      |        |        +--rw port?      inet:port-number
      |        +--rw association-type?   enumeration
      |        +--rw iburst?             boolean
      |        +--rw prefer?             boolean
      +--ro system-state
         +--ro clock
            +--ro current-datetime?      YANG:date-and-time
            +--ro boot-datetime?         YANG:date-and-time

DNS Client

      +--rw system
         +--rw dns-resolver
            +--rw search*    inet:domain-name
            +--rw server* [name]
            |  +--rw name    string
            |  +--rw (transport)
            |     +--:(udp-and-tcp)
            |        +--udp-and-tcp
            |           +--rw address    inet:ip-address
            |           +--rw port?      inet:port-number
            +--rw options
               +--rw timeout?    uint8
               +--rw attempts?   uint8

User Authentication

      +--rw system
         +--rw authentication
            +--rw user-authentication-order*   identityref
            +--rw user* [name]
               +--rw name        string
               +--rw password?   ianach:crypt-hash
               +--rw authorized-key* [name]
                  +--rw name         string
                  +--rw algorithm    string
                  +--rw key-data     binary

Structure to indicate that the DMTF needs stability in the RFC's quickly.  Add DMTF's  priority for areas of manageability. The list of RFC's below our initial directional.

## VLAN and interface extensions:	
To handle VLANs and with related interface configuration the following YANG models are under evaluation.

* https://tools.ietf.org/html/draft-ietf-netmod-intf-ext-YANG-03 
* https://tools.ietf.org/html/draft-wilton-intf-vlan-YANG-00		
## ACL		
To handle ACL configuration the following YANG models are under consideration.

* https://tools.ietf.org/html/draft-ietf-netmod-acl-model-09		

## Syslog
To handle configuration and access to syslog the following YANG model is under consideration.
	
* https://tools.ietf.org/html/draft-ietf-netmod-syslog-model-11		
	
(For a baseline switch, the following models shall be supported)

From the standard systems management Redfish models the following apply to the baseline network switch profile. (reference: http://redfish.dmtf.org/redfish/schema_index)
[Redfish](http://redfish.dmtf.org/redfish/schema_index)

* Chassis
* ComputerSystem
* Manager
* ManagerAccount
* Power
* Thermal
* SoftwareInventory plus UpdateService
* Event configuration using Event, EventDestination, and Event Service
* Access to logs using LogEntry, and LogService

## To Be Determined:
* management interface configuration using EthernetInterface and related
* console configuration using SerialInterface
* PrivilegeRegistery and Privileges
