---
DocTitle: Redfish Certificate Management Readme
DocNumber: 'IS-0008'
DocClass: Informative
DocVersion: '0.9a'
modified: '2018-09-19'
status: Work in Progress
released: false
copyright: '2018'
---

# Foreword

IMPORTANT: These documents are not final.  They do not necessarily reflect the views of the DMTF or its members.  Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice.  These documents are available for public review and comment until superseded.

The following files are part of the Redfish Certificate Management development effort:

* CertificateCollection_v1.xml, CertificateLocations_v1.xml, CertificateService_v1.xml, Certificate_v1.xml - New schemas to represent certificates and the management interfaces for them
* ManagerAccount_v1.xml, ManagerNetworkProtocol_v1.xml, RedfishExtensions_v1.xml, ServiceRoot_v1.xml - Updated schemas to support reporting of certificates
* public-rackmount1 - Mockup containing...
    * A Certificate Service found at "/redfish/v1/CertificateService"
    * A Certificate Collection for managing the HTTPS certificates found at "/redfish/v1/Managers/BMC/NetworkProtocol/HTTPS/Certificates"
    * A Certificate Collection for managing a user's certificates found at "/redfish/v1/AccountService/Accounts/1/Certificates"
* RedfishCertificateManagement.pdf - Presentation describing the Redfish Certificate Management data model

# Redfish Work in Progress

The following profile files are released as Work In Progress documents.

| Schema File             | Version | Date       | Description               |
| ---                     | ---     | ---        | ---                       |
| Certificate             | 0.9.0   | 2018-09-19 | Work in Progress release. |
| CertificateLocations    | 0.9.0   | 2018-09-19 | Work in Progress release. |
| CertificateService      | 0.9.0   | 2018-09-19 | Work in Progress release. |
| ManagerAccount          | 1.2.0a  | 2018-09-19 | Work in Progress release. |
| ManagerNetworkProtocol  | 1.4.0a  | 2018-09-19 | Work in Progress release. |
| ServiceRoot             | 1.5.0a  | 2018-09-19 | Work in Progress release. |
