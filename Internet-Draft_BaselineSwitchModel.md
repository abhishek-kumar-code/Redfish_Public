---
title: Baseline Switch Model 
abbrev: I-D
docname: draft-wbl-rtgwg-baseline-switch-model-01
date: 2017-10-01
category: info
ipr: trust200902

author:
 -
    ins: J. White
    name: Joe White
    organization: Dell EMC
    email: Joseph_L_White@dell.com
 -
    ins: D. Black
    name: David Black
    organization: Dell EMC
    email: david.black@dell.com
 -
    ins: J. Leung
    name: John Leung
    organization: Intel Corporation
    email: john.leung@intel.com
 -
    ins: M. Ganguli
    name: Mrittika Ganguli
    organization: Intel Corporation
    email: mrittika.ganguli@intel.com

normative:
  RFC2119:

informative:

--- abstract

This document lists and describes a profile set of YANG models for management and operation of a typical L2/L3 (Ethernet/IP) switch/router in data center environments, referred to as a baseline switch.  This profile includes the subset of YANG that is mapped to the DMTF Redfish interface in order to manage data center network equipment in a fashion consistent with other data center infrastructure that is managed by Redfish.  This overall profile and its components may also be useful in other management environments.

--- middle

# Introduction
**Disclaimer** – this is a work-in-progress draft.

This is a YANG profile for a Baseline Switch that covers the functional capabilities needed to manage a typical data center switch, such as a top-of-rack switch that provides both Ethernet bridging (L2) and IP forwarding (L3) services.  The functional scope of this switch is motivated by the top-of-rack use case, which often serves as a leaf switch in a leaf-spine network topology.  Servers in the rack have separate Ethernet (L2) LAN connectivity to each of two top-of-rack network switches that are then cross-connected and uplinked via L3 forwarding in order to limit the L2 broadcast domain scope.  An alternative approach is multi-chassis clustering that makes the two top-of-rack switches behave as if they were a single switch/router; in both cases, the hardware Ethernet broadcast domain is limited to one of the two physical LANs, and there is no single point of network failure in the rack for any server. 

XX Need a leaf-spine ASCII network diagram here with something that looks like racks at the leaves ... later. YY

An important goal of this work is to specify the YANG models that are used with DMTF's Redfish system management interface.  Redfish is an open industry standard specification and schema that uses a RESTful interface based on  JSON and a subset of OData for management of scalable data center hardware infrastructure - servers, networking and storage.  Redfish is particularly suited to management of:

- converged infrastructure (CI): servers, network switches and storage systems in same rack; and
- hyperconverged infrastructure (HCI): servers and network switches in same rack, with storage based on aggregation of capacity provided by drives in servers - hard disk drives (HDDs) and/or solid state drives (SSDs).

This profile is also intended to support stand-along management of network switches and management of network switches as part of a larger network.  In support of these usage structures, the profile is divided into three  non-overlapping functional components:

1. Core Configuration: This profile component consists of the management functionality required to bring up a baseline switch and get it to an initial level of functionality, e.g., as part of rack bringup.  This component has a strong hardware orientation, e.g., port configuration.
- Network Operation: This profile component consists of the additional management functionality required to configure and operate a switch as part of a network.  This component has a strong network orientation, e.g., bridging and routing.
- Management Administration: This profile component consists of the functionality required to remotely administer the baseline switch as a stand-alone entity, including access protocols as well as authentication and authorization of administrators.  This component has a strong user or administrator orientation.

This profile division into three components supports the three approaches to data center network management described above:

1. Redfish for provisioning and configuration, with network management and operation handled via a separate YANG-based framework: The Core Configuration YANG modules are mapped to Redfish.  The separate non-Redfish YANG-based framework uses all three functional components (Core Configuration, Network Operation, Management Administration) 
- Redfish for all functionality:  The Core Configuration and Network Operation YANG modules are mapped to Redfish, with the Management Administration YANG modules replaced by equivalent Redfish functionality.
- YANG-based framework for all functionality: All of the YANG modules are used by that framework.

The scope of the Core Configuration profile component draws upon experience with the current Intel Rack Scale Design (RSD) functional architecture (need reference), which is an example of the first approach above where the infrastructure administration and network operation roles are separated.  This and related experience of the DMTF membership using Redfish to provision and configure data center switches provide some level of assurance that the Core Configuration profile component scope is reasonable and works in practice.  An important use case for the Core Configuration profile component is bring-up of a newly installed rack of servers with top-of-rack network switches. 

The scope of the Network Management profile component is a basic level of functionality needed operate and manage a baseline switch as part of a network, including management of Ethernet (L2) bridging and IP (L3) forwarding, as well as a basic level of routing protocol support.  Actual baseline switch products often contain significant additional functionality that is beyond the scope of this draft, which focuses on a smaller set of capabilities that suffice for common data center network environments.

The scope of the Administration profile component is the functionality required beyond the first two profile components in order to completely manage a baseline switch; this focused on user management including authentication and authorization.

# Baseline Switch
The baseline switch profile contains sufficient capabilities for manage a simple Ethernet Switch.  This includes the following models in the three functional components of the profile:

1. Core Configuration
 - YANG Language and Data Types (included here as Core Configuration component is always present)
 - System Management (system identification and control, NTP, DNS)
 - Interfaces (ipv4/v6)
 - Access control lists (ACLs)
 - Virtual LANs (VLANs)
 - MAC Address table (for static MAC addresses - take out??)
 - Link aggregation (LAG)
- Network Operation
 - L2 Bridging
 - L3 IP Forwarding
 - Routing Protocol Management
- Management Administration
 - TBD XX YY  

The DMTF's has released the Redfish model (mockup and schema) for the System and Interfaces capabilities [http://www.dmtf.org/sites/default/files/standards/documents/DSP-IS0004_0.9a.zip](http://www.dmtf.org/sites/default/files/standards/documents/DSP-IS0004_0.9a.zip).  **Need to identify YANG modules that would be used if this isn't, not sure what to do with this text**

# YANG Models for Core Configuration

The following list of YANG models will constitute the management interface for the baseline switch model. The YANG models are sourced from IETF drafts/RFCs, IEEE drafts/RFCs and other sources.

The YANG models for the System and Interface capabilities were straightforward. There were YANG models in standard track which could be used.

However, the YANG models for the remaining capabilities are more problematic.  For these capabilities, the strategy for a YANG model to map to Redfish was finding the most mature YANG model and extracting the minimum subset of the YANG model needed to support the required capability.  The presumption being that the entire YANG model was subject to change, in the future.  **Expand** this needs a paragraph per item, probably with a summary afterwards about what's needed to complete the YANG models that we want to use.

* Access Control Lists - used IETF draft 11
* MAC address table - used an expired IETF draft (draft-fan), expect IETF to defer to IEEE 802 
* Virtual LAN (VLAN) - used the IEEE 802 model based on a port list
* Link aggregation - used a YANG model grabbed from IEEE 802 slideset
* Bridge - used IEEE Qcp draft 1.3. Didn't have access to working draft
* L3 IP Forwarding - used IETF Network Instance draft

## YANG Language and Data Types
**David: Note these out as common to all YANG models**

[RFC6020](https://tools.ietf.org/html/rfc6020) provides the YANG modeling language definition.

[RFC6991](https://tools.ietf.org/html/rfc6991) provides the Common YANG Data Types used by many other IETF YANG modules.

## Interfaces
The YANG models in [RFC7223](https://tools.ietf.org/html/rfc7223) support interfaces and interface-state

The YANG models in [RFC7277](https://tools.ietf.org/html/rfc7277) support ipv4 and ipv6 **David: v4 and v6 add IPv4 and IPv6 to augment 7223 interface models**

The YANG models in [RFC7224](https://tools.ietf.org/html/rfc7224) provide  YANG identity statements for interface types 

[David] May want this one: draft-ietf-netmod-intf-ext-yang-05 - Looked more closely, don't think so.

## System Management
The YANG models in [RFC7317](https://tools.ietf.org/html/rfc7317) support system identification, system time/date, DNS and NTP.

The baseline switch does not use the YANG models in the RFC for RADIUS client, User Authentication, SSH Public Key Authentication, Local User Password Authentication, and RADIUS Password Authentication.  **Well, Redfish does not translate those to Redfish, because Redfish supplies its own authentication framework as part of the overall system management framework.  Admin authentication is not optional for obvious reasons, and this is necessary to manage the baseline switch via something YANG-based.**

## Access Control Lists (ACLs)
The baseline switch needs the ability to set access control lists (ACLs).
Each ACL is composed of a set of rules and can be bound to a port. The rules should support:
* Source and destination IP address
* Source and destination MAC address
* L4 Source and destination port and L4 Protocol
* VLAN ID

The YANG model collateral reviewed for Access Control Lists were:  **Probably should rewrite this to say that due to the need for IP addresses and protocol numbers, the IETF YANG model is used in preference to an IEEE one**

* IETF:
	* [draft-ietf-netmod-acl-model-11](https://tools.ietf.org/html/draft-ietf-netmod-acl-model-11) contains a model for access control lists
* IEEE:
	* (none found)  

The YANG models in **draft-ietf-netmod-acl-model-11** provides models for access control lists.  Since most of YANG model will be used, below is an elided view of the YANG model.  **What are we leaving out?**

	module: ietf-access-control-list
     +--rw access-lists
        +--rw acl* [acl-type acl-name]
           +--rw acl-name               string
           +--rw acl-type               acl-type
           +--ro acl-oper-data
           +--rw access-list-entries
              +--rw ace* [rule-name]
                 +--rw rule-name        string
                 +--rw matches
                 |  +--rw l2-acl {l2-acl}?
                 |  |  +--rw destination-mac-address?        yang:mac-address
                 |  |  +--rw destination-mac-address-mask?   yang:mac-address
                 |  |  +--rw source-mac-address?             yang:mac-address
                 |  |  +--rw source-mac-address-mask?        yang:mac-address
                 |  |  +--rw ether-type?                     string
                 |  +--rw ipv4-acl {ipv4-acl}?
                 |  |  +--rw tos?                        uint8
                 |  |  +--rw length?                     uint16
                 |  |  +--rw ttl?                        uint8
                 |  |  +--rw protocol?                   uint8
                 |  |  +--rw source-port-range!
                 |  |  |  +--rw lower-port    inet:port-number
                 |  |  |  +--rw upper-port?   inet:port-number
                 |  |  +--rw destination-port-range!
                 |  |  |  +--rw lower-port    inet:port-number
                 |  |  |  +--rw upper-port?   inet:port-number
                 |  |  +--rw ihl?                        uint8
                 |  |  +--rw flags?                      bits
                 |  |  +--rw offset?                     uint16
                 |  |  +--rw identification?             uint16
                 |  |  +--rw destination-ipv4-network?   inet:ipv4-prefix
                 |  |  +--rw source-ipv4-network?        inet:ipv4-prefix
				 . . .
				 |  +--rw ipv6-acl {ipv6-acl}?
				 . . .
 				 |  +--rw l2-l3-ipv4-ipv6-acl {l2-l3-ipv4-ipv6-acl}?
				 . . .
				 +--rw actions
                 |  +--rw (packet-handling)?
                 |  |  +--:(deny)
                 |  |  |  +--rw deny?      empty
                 |  |  +--:(permit)
                 |  |     +--rw permit?    empty
                 |  +--rw logging?   boolean
                 +--ro ace-oper-data
                    +--ro match-counter?   yang:counter64

## MAC Address Table

The baseline switch needs the ability for a client to configure static MAC addressese for a port.  **Need to explain what RSD is configuring here and why - this enables telemetry to flow immediately from BMCs on servers, which aren't very smart.  Might be able to just remove this**

	GET /redfish/v1/EthernetSwitches/Switch1/Ports/Port1/StaticMACs/1
	{
  		"MACAddress": "00:11:22:33:44:55",
  		"VLANId": 112
	}

The YANG model collateral reviewed for MAC Address Tables were:

* IETF:
	* [ietf-mac](https://tools.ietf.org/html/draft-fan-yang-mac-00) has a MAC address table model
	* [netmod-intf-ext-yang](https://tools.ietf.org/id/draft-ietf-netmod-intf-ext-yang-04.txt) does not have a mac address table
* IEEE:
	* (none found)

The YANG model is derived from **ietf-mac**.  **Explanation here of how rickety a foundation this is ...**

	module: ietf-mac
    	+--rw mac
       		+--rw globalAttribute
       		|   +--rw macAgeTimeEnable?   macAgeTimeType
       		|   +--rw macAgingTime?       uint32
       		+--rw vlanFdbs
       		|   +--rw vlanFdb* [macAddress vlanId slotId]
       		|       +--rw macAddress       yang:mac-address
       		|       +--rw vlanId           macVlanId
       		|       +--rw slotId           string
       		|       +--rw macType          macType
       		|       +--rw outIfName?       string
       		|       +--ro outNickname      string
       		|       +--rw isCeDefault?     boolean
       		|       +--rw ceVlanId?        macVlanId
       		|       +--rw isFlood?         boolean
       		|       +--rw isIMac?          boolean
       		|       +--ro learnedPeriod?   uint32
       		|       +--rw outPeerIPs
       		|           +--ro outPeerIP* [outPeerIP]
       		|               +--ro outPeerIP    inet:ip-address
			. . .

For the baseline switch, the following fragment of this model shall be used.

	module: ietf-mac
    	+--rw mac
       		+--rw vlanFdbs
          		+--rw vlanFdb* [macAddress vlanId slotId]
             		+--rw macAddress       yang:mac-address
             		+--rw vlanId           macVlanId
             		+--rw slotId           string

For the above fragment, the YANG model is:

	. . .

## Virtual LAN (VLAN)
The baseline switch needs the ability to show the VLANs associated with a specific port.

For example, in Redfish the following HTTP POST would retrieve a VLAN 101 associated to the port P_5.

	GET /redfish/v1/EthernetSwitches/{id}/Ports/P_5/VLANs/101
	{
		“VLANId”: 101,
    	"VLANEnable": true,
	}

The YANG model collateral reviewed for Virtual LANs (VLANs) were:  **Analogous to ACLs, take IEEE model because this is an Ethernet feature - should recheck with 802 and the YANG catalog**

* IETF
	* [draft-ietf-netmod-sub-intf-vlan-model-02](https://tools.ietf.org/html/draft-ietf-netmod-sub-intf-vlan-model-02)
* IEEE:
	* ["IEEE 802.1X 2015.05"](http://www.ieee802.org/1/files/public/docs2015/new-mholness-YANG-8021x-0515-v04.pdf), 0.4, May 2015
	* ["IEEE 802.1X 2015.09"](http://www.ieee802.org/1/files/public/docs2015/new-mholness-ieee-dot1x-yang-0915-v06.yang)
	* The draft contains two YANG modeling options: 1) based on a Port List and 2) augmentation of IETF Interface Management YANG Data Model
	
For VLANs, the baseline switch utilizes the VLAN model from IEEE, based on a port list.

	module: dot1x
 		+--rw pae-system
 		+--rw system-access-control? enumeration
 		+--rw system-announcements? enumeration
 		+--rw eapol-protocol-version? uint32
 		+--rw mka-version? uint32
 		+--rw pae* [port-number]
   			+--rw port-number portNumberType
   			+--ro port-type? enumeration
   			+--rw virtual-port {virtual-ports}?
     			+--rw enable? boolean
     			+--ro max? uint32
     			+--ro current? yang:gauge32
     			+--ro start? uint32
     			+--ro peer-address? ieee:mac-address

To fulfill the baseline switch requirements, only the following fragment of the model is needed.

	module: dot1x
 		+--rw pae-system
 		+--rw system-access-control? enumeration
 		+--rw pae* [port-number]
   			+--rw port-number portNumberType
   			+--ro port-type? enumeration
   			+--rw virtual-port {virtual-ports}?
     			+--rw enable? boolean

The YANG model can be found at the following in [new-mholness-dot1x-yang-module-0515-v01](http://www.ieee802.org/1/files/public/docs2015/new-mholness-dot1x-yang-module-0515-v01.txt).

For the above fragment, the YANG is...

## Link Aggregation (LAG)
The baseline switch needs the ability to create a port which statically aggregrates links from other ports.

For example, a HTTP POST of the following request would create a Port call "Lag1", which aggregates Port10 and Port11.

POST /redfish/v1/EthernetSwitches/Switch1/Ports

	{
		“PortId”: “Lag1”,
		“PortMode”: “LinkAggregationStatic”,
		“Links”: {
			“PortMembers”: [
				{ “@odata.id”: “/redfish/v1/NetworkDevices/Switch1/Ports/Port10” },
				{ “@odata.id”: “/redfish/v1/NetworkDevices/Switch1/Ports/Port11” }
			]
		}
	}

The YANG model collateral reviewed for Link Aggregation were:

* IETF:
	* LAG appears to be out of scope because L3 forwarding doesn't care
* IEEE:
	* On July 2016, the 802.org posted the slideset [cp-mholness-YANG-Link-Aggregation-Model-Summary-0716-v14.pdf](http://www.ieee802.org/1/files/public/docs2016/cp-mholness-YANG-Link-Aggregation-Model-Summary-0716-v14.pdf) which provides a summary of the model.  However a YANG model specification has not been located.

The YANG models **TBD** shall provide models for Link Aggregation.  **Ok, this is a mess ... will try to set expectations that IEEE will fix this ...**

# YANG Modules for Network Operation

## Bridge
The baseline switch needs the ability to create a bridge which has priority features. The switch shall utilize IEEE YANG model of a bridge

* IEEE:
	* On May 12, 2015, 802.org posted this slideset [new-mholness-yang-8021Q-0515-v04.pdf] (http://www.ieee802.org/1/files/public/docs2015/new-mholness-yang-8021Q-0515-v04.pdf)which defines a 802.1 YANG specification.  It provides a summary an extension of the IETF port model into a bridge and other properties.

To fulfill the baseline switch requirements, only the follwoing fragment of the model is needed.  


	module: dot1Q
		+--rw bridge
			+--rw bridge-information
			+--rw address? ieee:mac-address
			+--rw name? nameType
			+--rw num-ports? portNumberType
			+--ro up-time? yang:counter32
		+--rw port* [number]
			+--rw number portNumberType
			+--rw name? nameType
			+--rw address? ieee:mac-address
			+--rw type? enumeration
			+--rw pvid? ieee:vlanid
			+--rw vlanId* [vid]
				+--rw vid ieee:vlanid
				+--rw name? nameType
				+--rw untagged-ports* portNumberType
				+--rw egress-ports* portNumberType
				+--ro status? enumeration
				+--ro counters
				+--ro frame-rx? yang:counter32
				+--ro octets-rx? yang:counter64
				+--ro discard-inbound? yang:counter32
				+--ro forward-outbound? yang:counter32
				+--ro discard-lack-of-buffers? yang:counter32
				+--ro discard-transit-delay-exceeded? yang:counter32
				+--ro discard-on-error? yang:counter32
				+--ro discard-on-ingress-filtering? yang:counter32 {IngressFiltering}?
			+--rw default-priority? priorityType
			+--rw priority-regeneration-table
				+--rw priority0? priorityType
				+--rw priority1? priorityType
				+--rw priority2? priorityType
				+--rw priority3? priorityType
				+--rw priority4? priorityType
				+--rw priority5? priorityType
				+--rw priority6? priorityType
				+--rw priority7? priorityType
			+--rw pcp-selection? pcpSelectionType
			+--rw pcp-decoding-table
				+--rw type? pcpSelectionType
				+--rw table
				+--rw pcp0
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp1
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp2
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp3
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp4
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp5
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp6
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
				+--rw pcp7
					+--rw priority? priorityType
					+--rw drop-eligible? boolean
			+--rw pcp-encoding-table
				+--rw type? pcpSelectionType
				+--rw encoding-table
				+--rw priority0
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority1
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority2
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority3
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority4
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority5
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority6
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
				+--rw priority7
					+--rw pcp-dei-false? priorityType
					+--rw pcp-dei-true? priorityType
			+--rw use-dei? boolean
			+--rw drop-encoding? boolean
			+--rw service-access-priority-selection? serviceAccessPrioritySelectionType
			+--rw service-access-priority-table
				+--rw priority0? priorityType
				+--rw priority1? priorityType
				+--rw priority2? priorityType
				+--rw priority3? priorityType
				+--rw priority4? priorityType
				+--rw priority5? priorityType
				+--rw priority6? priorityType
				+--rw priority7? priorityType
			+--rw traffic-class-table
		.......

For the above fragment, the YANG model is:

 module dot1Q { 
 	 
    namespace "ieee:ns:yang:ieee-dot1Q-bridge";     prefix "dot1Q"; 
 	 
    import ieee-types { prefix ieee; } 
 	import yang-types { prefix yang; } 
 	 
 	include dot1Q-types; 
 
    organization 
      "Institute of Electrical and Electronics Engineers"; 
 
    contact 
      "Web URL: http://ieee.org/ 
          E-mail:  corporate-communications@ieee.org 
          Postal:   
                   U.S.A. 
          Phone:   +1 732-563-6820 
          Fax:     +1 732-981-9511"; 
 	    
 	description 
        "TBD.";    
     revision "2015-03-10" {       description 
        "Initial Version.";       reference 
        "IEEE 802.1Q-2011, Media Access Control (MAC) Bridges and Virtual       	 Bridged Local Area Networks."; 
    } 
 	 
 	feature IngressFiltering { 
     		description "Each Port may support an Enable Ingress Filtering parameter. A frame received on a Port that is not in the member set (8.8.10) associated 
     	 with the frame’s VID shall be discarded if this parameter is set. The default value for this parameter is reset, i.e., Disable Ingress Filtering,      	 
	for all Ports. Any Port that supports setting this parameter shall also support resetting it. The parameter may be configured by the management operations defined in Clause 12."; 
	} 
	feature ExtendedFilteringServices { 
		description "Extended Filtering Services support the filtering behavior  required for regions of a network in which potential recipients of  multicast frames exist, 
			and where both the potential recipients of  frames and the Bridges are able to support dynamic configuration of filtering information for group MAC addresses. 
			In order to integrate  this extended filtering behavior with the needs of regions of the network that support only Basic Filtering Services, Bridges that support 
			Extended Filtering Services can be statically and dynamically configured to modify their filtering behavior on a per-group MAC address basis, and also on  the basis
			 of the overall filtering service provided by each outbound  Port with regard to multicast frames. The latter capability permits configuration of the Port’s 
		default forwarding or filtering behavior with regard to group MAC addresses for which no specific static or  dynamic filtering information has been configured."; 
 	} 
 	feature PortAndProtocolBasedVLANClassification {  	 	
		description "A VLAN-aware bridge component implementation in conformance to the provisions of this standard for Port-and-Protocol-based VLAN 
  	 	 	classification (5.4.1) shall  1) Support one or more of the following Protocol Classifications and Protocol Template formats: Ethernet, RFC_1042, SNAP_8021H, 
			SNAP_Other, or LLC_Other (6.12); and may 2)Support configuration of the contents of the Protocol Group Database."; 
 	} 
 	 
	container bridge {  	 	
		description "The Bridge Configuration object models the operations that modify, or inquire about, the configuration of the Bridge's resources. There is a single Bridge 
				Configuration object per Bridge."; 
 	 	container bridge-information {  	 	 	
				uses bridgeInfo; 
 	 	} 
 	 	list port {  	 	 	
				key "number";  	 	 	
				leaf number {  	 	 	 	
					type portNumberType; 
 	 	 			} 
 	 	 		leaf name {  	 	 	 	
					type nameType; 
 	 	 			} 
 	 	 		leaf address { 
 	 	 	 		type ieee:mac-address; 
 	 	 			} 
 	 	 		leaf type { 
 	 	 	 	type enumeration {  	 	 	 	 	
					enum IEEE-802.3;  	 	 	 	 	
					enum ISO-IEC-8802-4;  	 	 	 	 	
					enum ISO-IEC-8802-5;  	 	 	 	 	
					enum ISO-IEC-8802-6;  	 	 	 	 	
					enum ISO-IEC-8802-9;  	 	 	 	 	
					enum IEEE-802-9a;  	 	 	 	 	
					enum ISO-IEC-8802-11;  	 	 	 	 	
					enum ISO-IEC-8802-12-802.3;  	 	 	 	 	
					enum ISO-IEC-8802-12-802.5;  	 	 	 	 	
					enum ISO-IEC-9314; 
 	 	 	 	 	enum other; 
 	 	 	 	} 
 	 	 	} 
 	 	 	leaf pvid {  	 	 	 	
				type ieee:vlanid; 
 	 	 	} 
 	 	 	list vlanId { 
 	 	 	 	key "vid";  	 	 	 	
			leaf vid {  	 	 	 	 	
				type ieee:vlanid; 
	 	 	 	} 
	 		leaf name { 
	 	 		type nameType; 
 			} 	 	 	 	 	  	
			leaf-list untagged-ports { 
	 	 		type portNumberType; 
	 		} 
			leaf-list egress-ports { 
	 	 		type portNumberType; 
	 		} 
 	
 	 	 	 	leaf status {  	 	 	 	 	
					config false;  	 	 	 	 	
					type enumeration {  	 	 	 	 	 	
						enum reject-no-spare-vid;  	 	 	 	 	 	
						enum reject-vid-out-of-range;  	 	 	 	 	 	
						enum accepted; 
 	 	 	 	 	} 
 	 	 	 	} 
 	 	 	 	container counters { 
 	 	 	 	 	description "The Port Counters object models the operations that can be performed on the Port counters of the Forwarding Process resource.
						 There are multiple instances (one for each VID for each MAC Entity) of the Port Counters object per Bridge.";  	 	 	 	 	
					config false;  	 	 	 	 	
					leaf frame-rx { 
 	 	 	 	 	 	type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	 	leaf octets-rx {  	 	 	 	 	 	
						type yang:counter64; 
 	 	 	 	 	} 
 	 	 	 	 	leaf discard-inbound { 
 	 	 	 	 	 	type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	 	leaf forward-outbound { 
 	 	 	 	 	 	type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	 	leaf discard-lack-of-buffers {  	 	 	 	 	 	
						type yang:counter32; 
 	 	 	 	 	} 
     					leaf discard-transit-delay-exceeded {       
						type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	 	leaf discard-on-error {  	 	 	 	 	 	
						type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	 	leaf discard-on-ingress-filtering {  	 	 	 	 	 	
						if-feature IngressFiltering; 
 	 	 	 	 	 	type yang:counter32; 
 	 	 	 	 	} 
 	 	 	 	} 
 	 	 	} 
 	 	 	leaf default-priority { 
	 	type priorityType; 
	} 
	container priority-regeneration-table { 
	 	uses priorityRegenerationTable; 
	} 
	leaf pcp-selection { 
		type pcpSelectionType; 
	} 
	container pcp-decoding-table {  	
	leaf type { 
	 	 	type pcpSelectionType; 
	 	} 
	 	container table { 
	 	 	uses pcpDecodingTable; 
 	 	 	 	} 
 	 	 	} 
 	 	 	container pcp-encoding-table {  	 	 	 	
			leaf type { 
 	 	 	 	 	type pcpSelectionType; 
 	 	 	 	} 
 	 	 	 container encoding-table { 
 	 	 	 	 	uses pcpEncodingTable; 
 	 	 	 	} 
 	 	 	} 
 	 	 	leaf use-dei {  	 	 	 	
				type boolean; 
 	 	 	} 
 	 	 	leaf drop-encoding { 
 	 	 	 	type boolean; 
 	 	 	} 
 	 	 	leaf service-access-priority-selection { 
 	 	 	 	type serviceAccessPrioritySelectionType; 
 	 	 	} 
 	 	 	container service-access-priority-table { 
 	 	 	 	uses serviceAccessPriorityTable; 
 	 	 	} 
 	 	 	container traffic-class-table { 
 	 	 	 	uses trafficClassTable; 
 	 	 	} 
}


## L3 IP Forwarding (router instance)
In addition to the bridge model a router instance is needed in the Baseline switch. We take an excerpt from the IETF instance model defined in
[https://tools.ietf.org/html/draft-ietf-rtgwg-ni-model-04](https://tools.ietf.org/html/draft-ietf-rtgwg-ni-model-04). The [RFC7223] defined interface model is structured to include all interfaces in a flat list, 
without regard to virtual instances (e.g., VRFs) supported on the device.  The bind-network-instance-name leaf provides the association between an interface and its associated NI (e.g., VRF or VSI).

** Preferred approach - pick up network instance fragment, but don't use schema mount for Redfish - Joe will look at this. **

The network instance is refernced in the IETF interface model as:

	module: ietf-network-instance
     +--rw network-instances
        +--rw network-instance* [name]
           +--rw name           string
           +--rw enabled?       boolean
           +--rw description?   string
           +--rw (ni-type)?
           |  +--:(l3vpn)
           |     +--rw l3vpn:l3vpn
           |     |  ... // config data
           |     +--ro l3vpn:l3vpn-state
           |     |  ... // state data
           +--rw (root-type)
              +--:(vrf-root)
                 +--mp vrf-root
                    +--ro rt:routing-state/
                    |  +--ro router-id?                 yang:dotted-quad
                    |  +--ro control-plane-protocols
                    |     +--ro control-plane-protocol* [type name]
                    |        +--ro ospf:ospf/
                    |           +--ro instance* [af]
                    +--rw rt:routing/
                    |  +--rw router-id?                 yang:dotted-quad
                    |  +--rw control-plane-protocols
                    |     +--rw control-plane-protocol* [type name]
                    |     +--rw ospf:ospf/
                    |        +--rw instance* [af]
                    |           +--rw areas
                    |              +--rw area* [area-id]
                    |                 +--rw interfaces
                    |                    +--rw interface* [name]
                    |                       +--rw name if:interface-ref
                    |                       +--rw cost?   uint16


** General principle - if using a fragment of YANG module, include the resulting YANG source in an Appendix, otherwise just reference the full YANG module.  The use case is translation source - a full YANG module from elsewhere can be fed to the translation tool, but for a fragment, need a well-formed YANG module that is the fragment for the translation tool to consume.** 

For the above fragment, the YANG model is:
     // top level device definition statements

     <CODE BEGINS> file "ietf-network-instance@2017-09-27.yang"

module ietf-network-instance {
  yang-version 1.1;
  namespace "urn:ietf:params:xml:ns:yang:ietf-network-instance";
  prefix ni;

  // import some basic types

  import ietf-interfaces {
    prefix if;
    reference "RFC 7223: A YANG Data Model for Interface
               Management";
  }
  import ietf-ip {
    prefix ip;
    reference "RFC 7277: A YANG Data Model for IP Management";
  }
  import ietf-yang-schema-mount {
    prefix yangmnt;
    reference "draft-ietf-netmod-schema-mount: YANG Schema Mount";
    // RFC Ed.: Please replace this draft name with the
    // corresponding RFC number
  }

  organization
    "IETF Routing Area (rtgwg) Working Group";
  contact
    "WG Web:   <http://tools.ietf.org/wg/rtgwg/>
     WG List:  <mailto:rtgwg@ietf.org>

     Author:   Lou Berger
               <mailto:lberger@labn.net>
     Author:   Christan Hopps
               <mailto:chopps@chopps.org>
     Author:   Acee Lindem
               <mailto:acee@cisco.com>
     Author:   Dean Bogdanovic
               <mailto:ivandean@gmail.com>";
  description
    "This module is used to support multiple network instances
     within a single physical or virtual device.  Network
     instances are commonly known as VRFs (virtual routing
     and forwarding) and VSIs (virtual switching instances).

     Copyright (c) 2017 IETF Trust and the persons
     identified as authors of the code.  All rights reserved.

     Redistribution and use in source and binary forms, with or
     without modification, is permitted pursuant to, and subject
     to the license terms contained in, the Simplified BSD License
     set forth in Section 4.c of the IETF Trust's Legal Provisions
     Relating to IETF Documents
     (http://trustee.ietf.org/license-info).

     This version of this YANG module is part of RFC XXXX; see
     the RFC itself for full legal notices.";

  // RFC Ed.: replace XXXX with actual RFC number and remove
  // this note
  // RFC Ed.: please update TBD

  revision 2017-09-27 {
    description
      "Initial revision.";
    reference "RFC TBD";
  }

  // top level device definition statements

  container network-instances {
    description
      "Network instances each of which consists of a
       VRFs (virtual routing and forwarding) and/or
       VSIs (virtual switching instances).";
    reference "RFC 8022 - A YANG Data Model for Routing
               Management";
    list network-instance {
      key "name";
      description
        "List of network-instances.";
      leaf name {
        type string;
        mandatory true;
        description
          "device scoped identifier for the network
           instance.";
      }
      leaf enabled {
        type boolean;
        default "true";
        description
          "Flag indicating whether or not the network
           instance is enabled.";
      }
      leaf description {
        type string;
        description
          "Description of the network instance
           and its intended purpose.";
      }
      choice ni-type {
        description
          "This node serves as an anchor point for different types
           of network instances.  Each 'case' is expected to
           differ in terms of the information needed in the
           parent/core to support the NI, and may differ in their
           mounted schema definition. When the mounted schema is
           not expected to be the same for a specific type of NI
           a mount point should be defined.";
      }
      choice root-type {
        mandatory true;
        description
          "Well known mount points.";
        container vrf-root {
          description
            "Container for mount point.";
          yangmnt:mount-point "vrf-root" {
            description
              "Root for L3VPN type models. This will typically
               not be an inline type mount point.";
          }
        }
        container vsi-root {
          description
            "Container for mount point.";
          yangmnt:mount-point "vsi-root" {
            description
              "Root for L2VPN type models. This will typically
               not be an inline type mount point.";
          }
        }
        container vv-root {
          description
            "Container for mount point.";
          yangmnt:mount-point "vv-root" {
            description
              "Root models that support both L2VPN type bridging
               and L3VPN type routing. This will typically
               not be an inline type mount point.";
          }
        }
      }
    }
  }

  // augment statements

  augment "/if:interfaces/if:interface" {
    description
      "Add a node for the identification of the network
       instance associated with the information configured
       on a interface.

       Note that a standard error will be returned if the
       identified leafref isn't present.  If an interfaces cannot
       be assigned for any other reason, the operation SHALL fail
       with an error-tag of 'operation-failed' and an
       error-app-tag of 'ni-assignment-failed'.  A meaningful
       error-info that indicates the source of the assignment
       failure SHOULD also be provided.";
    leaf bind-ni-name {
      type leafref {
        path "/network-instances/network-instance/name";
      }
      description
        "Network Instance to which an interface is bound.";
    }
  }
  augment "/if:interfaces/if:interface/ip:ipv4" {
    description
      "Add a node for the identification of the network
       instance associated with the information configured
       on an IPv4 interface.

       Note that a standard error will be returned if the
       identified leafref isn't present.  If an interfaces cannot
       be assigned for any other reason, the operation SHALL fail
       with an error-tag of 'operation-failed' and an
       error-app-tag of 'ni-assignment-failed'.  A meaningful
       error-info that indicates the source of the assignment
       failure SHOULD also be provided.";
    leaf bind-ni-name {
      type leafref {
        path "/network-instances/network-instance/name";
      }
      description
        "Network Instance to which IPv4 interface is bound.";
    }
  }
  augment "/if:interfaces/if:interface/ip:ipv6" {
    description
      "Add a node for the identification of the network
       instance associated with the information configured
       on an IPv6 interface.

       Note that a standard error will be returned if the
       identified leafref isn't present.  If an interfaces cannot
       be assigned for any other reason, the operation SHALL fail
       with an error-tag of 'operation-failed' and an
       error-app-tag of 'ni-assignment-failed'.  A meaningful
       error-info that indicates the source of the assignment
       failure SHOULD also be provided.";
    leaf bind-ni-name {
      type leafref {
        path "/network-instances/network-instance/name";
      }
      description
        "Network Instance to which IPv6 interface is bound.";
    }
  }

  // notification statements

  notification bind-ni-name-failed {
    description
      "Indicates an error in the association of an interface to an
       NI. Only generated after success is initially returned when
       bind-ni-name is set.

       Note: some errors may need to be reported for multiple
       associations, e.g., a single error may need to be reported
       for an IPv4 and an IPv6 bind-ni-name.

       At least one container with a bind-ni-name leaf MUST be
       included in this notification.";
    leaf name {
      type leafref {
        path "/if:interfaces/if:interface/if:name";
      }
      mandatory true;
      description
        "Contains the interface name associated with the
        failure.";
    }
    container interface {
      description
        "Generic interface type.";
      leaf bind-ni-name {
        type leafref {
          path "/if:interfaces/if:interface/ni:bind-ni-name";
        }
        description
          "Contains the bind-ni-name associated with the
           failure.";
      }
    }
    container ipv4 {
      description
        "IPv4 interface type.";
      leaf bind-ni-name {
        type leafref {
          path "/if:interfaces/if:interface"
            + "/ip:ipv4/ni:bind-ni-name";
        }
        description
          "Contains the bind-ni-name associated with the
           failure.";
      }
    }
    container ipv6 {
      description
        "IPv6 interface type.";
      leaf bind-ni-name {
        type leafref {
          path "/if:interfaces/if:interface"
            + "/ip:ipv6/ni:bind-ni-name";
        }
        description
          "Contains the bind-ni-name associated with the
           failure.";
      }
    }
    leaf error-info {
      type string;
      description
        "Optionally, indicates the source of the assignment
         failure.";
    }
  }
}
<CODE ENDS>

## Schema Mount

The following schemas will need to be mounted:

"ietf-yang-schema-mount:schema-mounts": {
       "mount-point": [
         {
           "module": "ietf-network-instance",
           "name": "vrf-root",
           "use-schema": [
             {
               "name": "ni-schema",
               "parent-reference": [
                 "/*[namespace-uri() = 'urn:ietf:...:ietf-interfaces']"
               ]
             }
           ]
         }
       ],
       "schema": [
         {
           "name": "ni-schema",
           "module": [
             {
                "name": "ietf-routing",
                "revision": "2016-11-04",
                "namespace":
                  "urn:ietf:params:xml:ns:yang:ietf-routing",
                "conformance-type": "implement"
              },
             {
                "name": "ietf-ospf",
                "revision": "2017-03-12",
                "namespace":
                  "urn:ietf:params:xml:ns:yang:ietf-ospf",
                "conformance-type": "implement"
             }
           ]
         }
       ]
     }

## Routing Management

Routing Management YANG module from https://tools.ietf.org/html/rfc8022
<CODE BEGINS> file "ietf-routing@2016-11-04.yang"

   module ietf-routing {

     yang-version "1.1";

     namespace "urn:ietf:params:xml:ns:yang:ietf-routing";

     prefix "rt";

     import ietf-yang-types {
       prefix "yang";
     }

     import ietf-interfaces {
       prefix "if";
     }

     organization
       "IETF NETMOD (NETCONF Data Modeling Language) Working Group";

     contact
       "WG Web:   <https://datatracker.ietf.org/wg/netmod/>
        WG List:  <mailto:netmod@ietf.org>
        WG Chair: Lou Berger
                  <mailto:lberger@labn.net>

        WG Chair: Kent Watsen
                  <mailto:kwatsen@juniper.net>

        Editor:   Ladislav Lhotka
                  <mailto:lhotka@nic.cz>

        Editor:   Acee Lindem
                  <mailto:acee@cisco.com>";

     description
       "This YANG module defines essential components for the management
        of a routing subsystem.

        Copyright (c) 2016 IETF Trust and the persons identified as
        authors of the code.  All rights reserved.

        Redistribution and use in source and binary forms, with or
        without modification, is permitted pursuant to, and subject to
        the license terms contained in, the Simplified BSD License set
        forth in Section 4.c of the IETF Trust's Legal Provisions
        Relating to IETF Documents
        (http://trustee.ietf.org/license-info).

        The key words 'MUST', 'MUST NOT', 'REQUIRED', 'SHALL', 'SHALL
        NOT', 'SHOULD', 'SHOULD NOT', 'RECOMMENDED', 'MAY', and
        'OPTIONAL' in the module text are to be interpreted as described
        in RFC 2119.

        This version of this YANG module is part of RFC 8022;
        see the RFC itself for full legal notices.";

     revision 2016-11-04 {
       description
         "Initial revision.";
       reference
         "RFC 8022: A YANG Data Model for Routing Management";
     }

     /* Features */

     feature multiple-ribs {
       description
         "This feature indicates that the server supports user-defined
          RIBs.
          Servers that do not advertise this feature SHOULD provide
          exactly one system-controlled RIB per supported address family
          and make it also the default RIB.  This RIB then appears as an
          entry of the list /routing-state/ribs/rib.";
     }

     feature router-id {
       description
         "This feature indicates that the server supports configuration
          of an explicit 32-bit router ID that is used by some routing
          protocols.

          Servers that do not advertise this feature set a router ID
          algorithmically, usually to one of the configured IPv4
          addresses.  However, this algorithm is implementation
          specific.";
     }

     /* Identities */

     identity address-family {
       description
         "Base identity from which identities describing address
          families are derived.";
     }

     identity ipv4 {
       base address-family;
       description
         "This identity represents IPv4 address family.";
     }

     identity ipv6 {
       base address-family;
       description
         "This identity represents IPv6 address family.";
     }

     identity control-plane-protocol {
       description
         "Base identity from which control-plane protocol identities are
          derived.";
     }

     identity routing-protocol {
       base control-plane-protocol;
       description
         "Identity from which Layer 3 routing protocol identities are
          derived.";
     }

     identity direct {
       base routing-protocol;
       description
         "Routing pseudo-protocol that provides routes to directly
          connected networks.";
     }

     identity static {
       base routing-protocol;
       description
         "Static routing pseudo-protocol.";
     }

     /* Type Definitions */

     typedef route-preference {
       type uint32;
       description
         "This type is used for route preferences.";
     }

     /* Groupings */

     grouping address-family {
       description
         "This grouping provides a leaf identifying an address
          family.";
       leaf address-family {
         type identityref {
           base address-family;
         }
         mandatory "true";
         description
           "Address family.";
       }
     }

     grouping router-id {
       description
         "This grouping provides router ID.";
       leaf router-id {
         type yang:dotted-quad;
         description
           "A 32-bit number in the form of a dotted quad that is used by
            some routing protocols identifying a router.";
         reference
           "RFC 2328: OSPF Version 2.";
       }
     }

     grouping special-next-hop {
       description
         "This grouping provides a leaf with an enumeration of special
          next hops.";
       leaf special-next-hop {
         type enumeration {
           enum blackhole {
             description
               "Silently discard the packet.";
           }
           enum unreachable {
             description
               "Discard the packet and notify the sender with an error
                message indicating that the destination host is
                unreachable.";
           }
           enum prohibit {
             description
               "Discard the packet and notify the sender with an error
                message indicating that the communication is
                administratively prohibited.";
           }
           enum receive {
             description
               "The packet will be received by the local system.";
           }
         }
         description
           "Options for special next hops.";
       }
     }

     grouping next-hop-content {
       description
         "Generic parameters of next hops in static routes.";
       choice next-hop-options {
         mandatory "true";
         description
           "Options for next hops in static routes.

            It is expected that further cases will be added through
            augments from other modules.";
         case simple-next-hop {
           description
             "This case represents a simple next hop consisting of the
              next-hop address and/or outgoing interface.

              Modules for address families MUST augment this case with a
              leaf containing a next-hop address of that address
              family.";
           leaf outgoing-interface {
             type if:interface-ref;
             description
               "Name of the outgoing interface.";
           }
         }
         case special-next-hop {
           uses special-next-hop;
         }
         case next-hop-list {
           container next-hop-list {
             description
               "Container for multiple next-hops.";
             list next-hop {
               key "index";
               description
                 "An entry of a next-hop list.

                  Modules for address families MUST augment this list
                  with a leaf containing a next-hop address of that
                  address family.";
               leaf index {
                 type string;
                 description
                   "A user-specified identifier utilized to uniquely
                    reference the next-hop entry in the next-hop list.
                    The value of this index has no semantic meaning
                    other than for referencing the entry.";
               }
               leaf outgoing-interface {
                 type if:interface-ref;
                 description
                   "Name of the outgoing interface.";
               }
             }
           }
         }
       }
     }

     grouping next-hop-state-content {
       description
         "Generic parameters of next hops in state data.";
       choice next-hop-options {
         mandatory "true";
         description
           "Options for next hops in state data.

            It is expected that further cases will be added through
            augments from other modules, e.g., for recursive
            next hops.";
         case simple-next-hop {
           description
             "This case represents a simple next hop consisting of the
              next-hop address and/or outgoing interface.

              Modules for address families MUST augment this case with a
              leaf containing a next-hop address of that address
              family.";
           leaf outgoing-interface {
             type if:interface-state-ref;
             description
               "Name of the outgoing interface.";
           }
         }
         case special-next-hop {
           uses special-next-hop;
         }
         case next-hop-list {
           container next-hop-list {
             description
               "Container for multiple next hops.";
             list next-hop {
               description
                 "An entry of a next-hop list.

                  Modules for address families MUST augment this list
                  with a leaf containing a next-hop address of that
                  address family.";
               leaf outgoing-interface {
                 type if:interface-state-ref;
                 description
                   "Name of the outgoing interface.";
               }
             }
           }
         }
       }
     }

     grouping route-metadata {
       description
         "Common route metadata.";
       leaf source-protocol {
         type identityref {
           base routing-protocol;
         }
         mandatory "true";
         description
           "Type of the routing protocol from which the route
            originated.";
       }
       leaf active {
         type empty;
         description
           "Presence of this leaf indicates that the route is preferred
            among all routes in the same RIB that have the same
            destination prefix.";
       }
       leaf last-updated {
         type yang:date-and-time;
         description
           "Time stamp of the last modification of the route.  If the
            route was never modified, it is the time when the route was
            inserted into the RIB.";
       }
     }

     /* State data */

     container routing-state {
       config "false";
       description
         "State data of the routing subsystem.";
       uses router-id {
         description
           "Global router ID.

            It may be either configured or assigned algorithmically by
            the implementation.";
       }
       container interfaces {
         description
           "Network-layer interfaces used for routing.";
         leaf-list interface {
           type if:interface-state-ref;
           description
             "Each entry is a reference to the name of a configured
              network-layer interface.";
         }
       }
       container control-plane-protocols {
         description
           "Container for the list of routing protocol instances.";
         list control-plane-protocol {
           key "type name";
           description
             "State data of a control-plane protocol instance.

              An implementation MUST provide exactly one
              system-controlled instance of the 'direct'
              pseudo-protocol.  Instances of other control-plane
              protocols MAY be created by configuration.";
           leaf type {
             type identityref {
               base control-plane-protocol;
             }
             description
               "Type of the control-plane protocol.";
           }
           leaf name {
             type string;
             description
               "The name of the control-plane protocol instance.

                For system-controlled instances this name is persistent,
                i.e., it SHOULD NOT change across reboots.";
           }
         }
       }
       container ribs {
         description
           "Container for RIBs.";
         list rib {
           key "name";
           min-elements "1";
           description
             "Each entry represents a RIB identified by the 'name' key.
              All routes in a RIB MUST belong to the same address
              family.

              An implementation SHOULD provide one system-controlled
              default RIB for each supported address family.";
           leaf name {
             type string;
             description
               "The name of the RIB.";
           }
           uses address-family;
           leaf default-rib {
             if-feature "multiple-ribs";
             type boolean;
             default "true";
             description
               "This flag has the value of 'true' if and only if the RIB
                is the default RIB for the given address family.

                By default, control-plane protocols place their routes
                in the default RIBs.";
           }
           container routes {
             description
               "Current content of the RIB.";
             list route {
               description
                 "A RIB route entry.  This data node MUST be augmented
                  with information specific for routes of each address
                  family.";
               leaf route-preference {
                 type route-preference;
                 description
                   "This route attribute, also known as administrative
                    distance, allows for selecting the preferred route
                    among routes with the same destination prefix.  A
                    smaller value means a more preferred route.";
               }
               container next-hop {
                 description
                   "Route's next-hop attribute.";
                 uses next-hop-state-content;
               }
               uses route-metadata;
             }
           }
           action active-route {
             description
               "Return the active RIB route that is used for the
                destination address.

                Address-family-specific modules MUST augment input
                parameters with a leaf named 'destination-address'.";
             output {
              container route {
                 description
                   "The active RIB route for the specified destination.

                    If no route exists in the RIB for the destination
                    address, no output is returned.

                    Address-family-specific modules MUST augment this
                    container with appropriate route contents.";
                 container next-hop {
                   description
                     "Route's next-hop attribute.";
                   uses next-hop-state-content;
                 }
                 uses route-metadata;
               }
             }
           }
         }
       }
     }

     /* Configuration Data */

     container routing {
       description
         "Configuration parameters for the routing subsystem.";
       uses router-id {
         if-feature "router-id";
         description
           "Configuration of the global router ID.  Routing protocols
            that use router ID can use this parameter or override it
            with another value.";
       }
       container control-plane-protocols {
         description
           "Configuration of control-plane protocol instances.";
         list control-plane-protocol {
           key "type name";
           description
             "Each entry contains configuration of a control-plane
              protocol instance.";
           leaf type {
             type identityref {
               base control-plane-protocol;
             }
             description
               "Type of the control-plane protocol - an identity derived
                from the 'control-plane-protocol' base identity.";
           }
           leaf name {
             type string;
             description
               "An arbitrary name of the control-plane protocol
                instance.";
           }
           leaf description {
             type string;
             description
               "Textual description of the control-plane protocol
                instance.";
           }
           container static-routes {
             when "derived-from-or-self(../type, 'rt:static')" {
               description
                 "This container is only valid for the 'static' routing
                  protocol.";
             }
             description
               "Configuration of the 'static' pseudo-protocol.

                Address-family-specific modules augment this node with
                their lists of routes.";
           }
         }
       }
       container ribs {
         description
           "Configuration of RIBs.";
         list rib {
           key "name";
           description
             "Each entry contains configuration for a RIB identified by
              the 'name' key.

              Entries having the same key as a system-controlled entry
              of the list /routing-state/ribs/rib are used for
              configuring parameters of that entry.  Other entries
              define additional user-controlled RIBs.";
           leaf name {
             type string;
             description
               "The name of the RIB.

                For system-controlled entries, the value of this leaf
                must be the same as the name of the corresponding entry
                in state data.
                For user-controlled entries, an arbitrary name can be
                used.";
           }
           uses address-family {
             description
               "Address family of the RIB.

                It is mandatory for user-controlled RIBs.  For
                system-controlled RIBs it can be omitted; otherwise, it
                must match the address family of the corresponding state
                entry.";
             refine "address-family" {
               mandatory "false";
             }
           }
           leaf description {
             type string;
             description
               "Textual description of the RIB.";
           }
         }
       }
     }
   }

   <CODE ENDS>

# YANG Modules for Management Administration

	
