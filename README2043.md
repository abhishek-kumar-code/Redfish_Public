---
DocTitle: Scalable Platforms Management API Mockup Readme
DocNumber: '2043'
DocClass: Informative
DocVersion: '1.2.0'
modified: '2017-11-17'
status: published
released: true
copyright: '2015-2017'
---

# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - This file is the main Redfish Scalable Platforms Management API Specification.
* DSP0270 - Redfish Host Interface Specification - This document specifies the "in-band" or "OS-based" Redfish Host Interface. 
* DSP0272 - Redfish Interoperability Profile Specification - Specifies the structure and JSON document used to define and publish an interoperability profile used to check an implementation's conformance to a defined minimum set of functionality.
* DSP2044 - Redfish Whitepaper - This is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish Service and understand common functions and tasks.
* DSP2043 - Redfish Mockup - This is a mockup that can be used as sample of output from GETs from a Redfish Service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP2046 - Redfish Resource and Schema Guide - This contains informative documentation regarding common Redfish Resource properties, as well as a listing of properties that can be found in each of the Redfish Resources.
* DSP8010 - Redfish Schema - This contains the Redfish Schema definitions.  These files are normative in nature and are normatively referenced by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format, which is in XML) and JSON Schema.  These Schema definitions should be functionally equivalent, thus specifying the schema in two different languages.
* DSP8011 - Redfish Standard Registries - This contains the Redfish Registry definitions.  This bundle of Redfish registries includes Message registries used for Redfish-defined messages (including events) and Privilege maps.
* DSP8013 - Redfish Interoperability Profiles - A bundle of published Redfish Interoperability Profile documents as well as supporting schema and sample documents used for creating profiles.

# Redfish Mockups

This archive contains a number of mockups of various Redfish service implementations.  They are intended to be a guide for learning about the Redfish Specification by showing typical examples of implementations.  These mockups are not prototypes and do not reflect any actual product or Redfish implementation.

Many of these mockups are also used to populate the Redfish Resource Explorer, part of the Redfish Developer Hub located at: http://redfish.dmtf.org

## Simple Rack-mounted server (public-rackmount1)

This illustration of a Redfish service implementation shows a typical rack-mount server, as commonly used in scale-out data centers. It depicts the types of information that can be expected, but does not represent an actual implementation.

## Bladed Server (public-bladed)

This example represents an enclosure of "blade servers" that share infrastructure components, such as power supplies and fans. Depicting an enclosure containing four blade servers (a total of five "Chassis"), this mockup demonstrates the modeling of multiple chassis and systems managed from a single Redfish service.

## Local Storage (public-localstorage)

This example shows a server with an implementation of the Redfish storage schemas, showing an integrated RAID controller with four attached drives.

## SAS Fabric (public-sasfabric)

This example shows a more complex storage implementation using a pair of SAS switches (fabric), storage enclosures and multiple storage devices.

## Proposed OCP Redfish Profile (public-catfish)

This draft example, for ongoing development, represents a proposed minimal Redfish data model "profile" that meets the needs of the Open Compute Project's Hardware Management requirements. This draft profile is intended to help define a list of required properties so that essential management-related tasks, as defined by OCP, can be performed on any Redfish implementation. 

## Composable Systems (public-composability)

This example shows a service with various sets of disaggregated hardware as resources. It provides an example composed system utilizing some of the disaggregated hardware. It also shows how Resource Zones can provide information about binding restrictions.

## Bladed Partitions (public-bladed-partitions)

This example shows how Redfish Composability can be used to create composed Computer System instances from smaller sets of Computer Systems. A top level enclosure called "Enclosure" contains a set of blades, which are used to create the composed Computer Systems.
