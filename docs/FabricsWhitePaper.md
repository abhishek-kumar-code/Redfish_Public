---
DocTitle: Redfish Fabrics White Paper
DocNumber: '????'
DocClass: Informative
DocVersion: '0.9.0'
modified: '2019-01-28'
status: published
released: false
copyright: '2019'
---


# Foreword

The Redfish Fabrics White Paper was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.


# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:


# Introduction


# Model explanation - Jeff H

* Fabric
    * Associated devices may very well be in Chassis
* Switches and Ports (physical)
    * IP vs everything else
* Endpoints (logical)
    * Zones


# Representations

* SAS - Patrick B/Mike R
* PCI-e - John L
* Gen-Z - Jeff H
    * Fabric Controllers are being introduced as part of Gen-Z extensions
* IP - John L
* How it works with Composability - Jeff H
    * Fabrics could be modified when composing new systems


# Client workflows - Jeff H

* Tracing devices through end points
* Tracing connections through ports and switches
    * Drawing topologies
* Managing ports and routes
    * Possibly adding routing table managing as part of Gen-Z
    * How is this done with other types of fabrics
* How to use zones

