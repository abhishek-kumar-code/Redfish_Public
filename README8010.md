---

![](http://i.imgur.com/zYOUZzQ.jpg)
# Redfish API Schema Readme#



- **Document Identifier: DSP8010**
- **Date: 2015-08-04**
- **Version: 1.0.0**
-  **Supersedes: None**
- **Document Class: Informative**
- **Document Status: Published**
- **Document Language: en-US**
- Released: true

## Copyright Notice ##
Copyright © 2015 Distributed Management Task Force, Inc. (DMTF). All rights reserved.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. Members and non-members may reproduce DMTF specifications and documents, provided that correct attribution is given. As DMTF specifications may be revised from time to time, the particular version and release date should always be noted.

Implementation of certain elements of this standard or proposed standard may be subject to third party patent rights, including provisional patent rights (herein "patent rights"). DMTF makes no representations to users of the standard as to the existence of such rights, and is not responsible to recognize, disclose, or identify any or all such third party patent right, owners or claimants, nor for any incomplete or inaccurate identification or disclosure of such rights, owners or claimants. DMTF shall have no liability to any party, in any manner or circumstance, under any legal theory whatsoever, for failure to recognize, disclose, or identify any such third party patent rights, or for such party’s reliance on the standard or incorporation thereof in its product, protocols or testing procedures. DMTF shall have no liability to any party implementing such standard, whether such implementation is foreseeable or not, nor to any patent owner or claimant, and shall have no liability or responsibility for costs or losses incurred if a standard is withdrawn or modified after publication, and shall be indemnified and held harmless by any party implementing the standard from any and all claims of infringement by a patent owner for such implementations.

For information about patents held by third-parties which have notified the DMTF that, in their opinion, such patent may relate to or impact implementations of DMTF standards, visit [http://www.dmtf.org/about/policies/disclosures.php](http://www.dmtf.org/about/policies/disclosures.php).

This document’s normative language is English. Translation into other languages is permitted.
# Foreword

The following files are part of the Redfish Scalable Platforms Management API ("Redfish") development effort:

* DSP0226 - Redfish Specification - this file is the main Redfish Scalable Platforms Management API Specification.
* DSP2044 - Redfish Whitepaper - this is intended to be a non-normative document helping those new to Redfish understand how to interact with the Redfish service and understand common functions and tasks.
* DSP02043 - Redfish Mockup - this is a mockup that can be used as sample of output from GETs from A Redfish service.  Informative in nature, it was used to develop the schema.  A person can set up an NGINX or similar server and configure it to output JSON format and then use this directory for demonstration purposes.
* DSP8010 - Redfish Schema - this contains the Redfish Schema definitions.  These files are normative in nature and are normatively reference by the Redfish Specification.  There are two Schema formats - CSDL (OData Common Schema Definition Language format which is in XML) and JSON Schema.  These Schema defintions should be functionally equivalent, thus specifying the schema in two different languages.

