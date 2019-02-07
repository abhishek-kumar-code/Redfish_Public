---
DocTitle: Redfish Storage White Paper
DocNumber: '????'
DocClass: Informative
DocVersion: '0.9.0'
modified: '2019-01-28'
status: published
released: false
copyright: '2019'
---


# Foreword

The Redfish Storage Paper was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.


# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:


# Introduction


# Model explanation - Mike R

* Storage
* Volumes
* Drives


# Representations - Mike R

* Show the different modeling from the Redfish School training


# Client workflows - Patrick B

* Volume creation
    * Need to talk about RAIDType vs VolumeType
* How to manage spare drives
* Encryption of volumes
    * How to set keys
* Rebuild, Initialization, other maintenance tasks
    * Deleting a Volume may require a Task to be generated to do proper cleanup
        * Scrubbing data and keys

