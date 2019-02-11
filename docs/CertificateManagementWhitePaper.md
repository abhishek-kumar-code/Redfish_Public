---
DocTitle: Redfish Certificate Management White Paper
DocNumber: '????'
DocClass: Informative
DocVersion: '0.9.0'
modified: '2019-01-28'
status: published
released: false
copyright: '2019'
---


# Foreword

The Redfish Certificate Management White Paper was prepared by the Redfish Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.


# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:


# Introduction


# Model explanation - Mike R

* Certificate service
    * Go over use cases for the different actions (when you'd use Replace vs simply POSTing to the certificate collection)
* Certificate Collections
    * Explain that this can be expanded in the future beyond the service itself
        * End devices (NICs, other controllers, etc)
    * List out where we allow for the Certificate Collections today (HTTPS, External Account Providers, User Accounts)
        * List use cases for how each of these are used
* Certificate Resource
* Certificate Locations
    * Explain the use case for a security admin who wants to view everything in the service
        * Useful for auditing


# Best practices - Peter S

* Need to find NIST white papers for how certificates should be managed; make pointers to them
    * Authenticity
    * Checking chains
    * Checking for revocation
    * Initiating revocation
    * How signing works


# Types of certificates - Chris D

* Different format types (PKCS7, PKCS12, etc)
    * How do they map into the data model
* Use cases for the types?
    * End devices may just have a binary encoded certificate


# Client workflows - Mike R

* Installing (from CSR generation to applying the certificate)
    * Point to next two workflows for the final step to avoid duplicating text
* Installing
    * Via replace action
    * Via adding to an existing collection
    * Side effects of sharing certificates for multiple things
        * Installing to a particular collection may cause the same certificate to appear in other collections
            * Current use case is when switching between LDAP and AD where the service may use the same certificate and effectively migrate it when disabling one and enabling the other
* Removing certificates (what happens when a collection becomes empty)
    * May have a side effect of regenerating a default certificate

