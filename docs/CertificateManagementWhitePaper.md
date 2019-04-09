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


# Model explanation

If a Redfish service supports certificate management, the Service Root resource will contain the `CertificateService` property.  It will also support the [`Certificates` property](#resources-with-certificates) in various Resources to show where certificates can be installed.

Within the [Certificate Service](#certificate-service), a client will find the available actions for managing certificates, such as generating signing requests, or doing atomic replacement of certificates.  A client will also find the [Certificate Locations](#certificate-locations) Resource, which is responsible for providing an inventory of all certificates the service is managing.

The following sections detail how these things are reported by a Redfish service.


## Certificate Service

The Certificate Service contains a set of actions for service level management of certificates.  There are currently two actions defined for this:
* [Generate CSR](#generate-csr) (Certificate Signing Request)
* [Replace Certificate](#replace-certificate)

The Certificate Service also contains a link to the [Certificate Locations](#certificate-locations) Resource via the `CertificateLocations` property.

Example Certificate Service Resource:
```json
{
    "@odata.id": "/redfish/v1/CertificateService",
    "@odata.type": "#CertificateService.v1_0_0.CertificateService",
    "Id": "CertificateService",
    "Name": "Certificate Service",
    "Actions": {
        "#CertificateService.GenerateCSR": {
            "target": "/redfish/v1/CertificateService/Actions/CertificateService.GenerateCSR"
        },
        "#CertificateService.ReplaceCertificate": {
            "target": "/redfish/v1/CertificateService/Actions/CertificateService.ReplaceCertificate"
        }
    },
    "CertificateLocations": {
        "@odata.id": "/redfish/v1/CertificateService/CertificateLocations"
    }
}
```


### Generate CSR

The Generate CSR (Certificate Signing Request) action is used to create a signing request for a new certificate.  The response of the action contains the CSR as a Privacy Enhanced Mail (PEM) encoded string.  The CSR is then given to a CA (Certificate Authority) by the client, which then produces a signed certificate.

The parameters for the action specify many of the common fields that are put into the end certificate.  The action also allows for the client to specify the type of key-pair that is generated for the certificate.  The private portion of the key-pair is expected to be retained by the service and used with the certificate that is installed after the CA has signed it.

| Parameter               | X.509 Attribute                    | Description |
| ---                     | ---                                | ---         |
| `CommonName`            | `commonName`                       | The fully qualified domain name of the component that is being secured. |
| `AlternativeNames`      | Subject Alternative Name extension | Additional hostnames of the component that is being secured. |
| `Organization`          | `organizationName`                 | The name of the organization making the request. |
| `OrganizationalUnit`    | `organizationalUnitName`           | The name of the unit or division of the organization making the request. |
| `City`                  | `localityName`                     | The city or locality of the organization making the request. |
| `State`                 | `stateOrProvinceName`              | The state, province, or region of the organization making the request. |
| `Country`               | `countryName`                      | The country of the organization making the request. |
| `Email`                 | `emailAddress`                     | The email address of the contact within the organization making the request. |
| `KeyUsage`              | Key Usage and Extended Key Usage   | The usage of the key contained in the certificate. |
| `Surname`               | `surname`                          | The surname of the user making the request. |
| `GivenName`             | `givenName`                        | The given name of the user making the request. |
| `Initials`              | `initials`                         | The initials of the user making the request. |
| `ChallengePassword`     | `challengePassword`                | The challenge password to be applied to the certificate for revocation requests. |
| `UnstructuredName`      | `unstructuredName`                 | The unstructured name of the subject. |
| `ContactPerson`         | `name`                             | The name of the user making the request. |
| `KeyPairAlgorithm`      | N/A                                | The type of key pair for use with signing algorithms. |
| `KeyBitLength`          | N/A                                | The length of the key in bits, if needed based on the value of the `KeyPairAlgorithm` parameter. |
| `KeyCurveId`            | N/A                                | The curve ID to be used with the key, if needed based on the value of the `KeyPairAlgorithm` parameter. |
| `CertificateCollection` | N/A                                | A link to the certificate collection where the certificate will be installed. |

The `KeyPairAlgorithm` and `KeyCurveId` are both strings where the values are based on the contents of the Trusted Computing Group (TCG) Algorithm Registry.  The `TPM_ALG_ID` and `TPM_ECC_CURVE` tables respectively contain the set of possible values for the two parameters.  Services are not required to support the entire contents of the table, however, the following are recommended to be supported.

Recommended `TPM_ALG_ID` values:

| Value           | Description |
| ---             | ---         |
| `TPM_ALG_RSA`   | The RSA algorithm. |
| `TPM_ALG_ECDSA` | Signature algorithm using elliptic curve cryptography (ECC). |

Recommended `TPM_ECC_CURVE` values:

| Value               | Description |
| ---                 | ---         |
| `TPM_ECC_NIST_P256` | The NIST P-256 curve. |
| `TPM_ECC_NIST_P384` | The NIST P-384 curve. |
| `TPM_ECC_NIST_P521` | The NIST P-521 curve. |

The following two examples show a client performing a Generate CSR action and receiving a response.  In the request, the client is specifying a new signing request using an RSA 4096bit key pair, and that the end certificate will be installed for the HTTPS service for the Manager named `BMC`.  The response contains the PEM encoded signing request in the property `CSRString`.

Example Generate CSR request:
```json
{
    "Country": "US",
    "State": "Oregon",
    "City": "Portland",
    "Organization": "Contoso",
    "OrganizationalUnit": "ABC",
    "CommonName": "manager.contoso.org",
    "AlternativeNames": [
        "manager.contoso.com",
        "manager.contoso.us"
    ],
    "Email": "admin@contoso.org",
    "KeyPairAlgorithm": "TPM_ALG_RSA",
    "KeyBitLength": 4096,
    "KeyUsage": [
        "KeyEncipherment",
        "ServerAuthentication"
    ],
    "CertificateCollection": {
        "@odata.id": "/redfish/v1/Managers/BMC/NetworkProtocol/HTTPS/Certificates"
    }
}
```

Example Generate CSR response:
```json
{
    "CSRString": "-----BEGIN CERTIFICATE REQUEST-----...-----END CERTIFICATE REQUEST-----",
    "CertificateCollection": {
        "@odata.id": "/redfish/v1/Managers/BMC/NetworkProtocol/HTTPS/Certificates"
    }
}
```


### Replace Certificate



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


### References

* RFC2985, PKCS #9: Selected Object Classes and Attribute Types Version 2.0: [https://tools.ietf.org/html/rfc2985](https://tools.ietf.org/html/rfc2985)
* RFC5280, Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile: [https://tools.ietf.org/html/rfc5280](https://tools.ietf.org/html/rfc5280)
* Trusted Computing Group Algorithm Registry: [https://trustedcomputinggroup.org/resource/tcg-algorithm-registry/](https://trustedcomputinggroup.org/resource/tcg-algorithm-registry/)
* Certificate Service Schema: [http://redfish.dmtf.org/schemas/v1/CertificateService_v1.xml](http://redfish.dmtf.org/schemas/v1/CertificateService_v1.xml)
* Certificate Locations Schema: [http://redfish.dmtf.org/schemas/v1/CertificateLocations_v1.xml](http://redfish.dmtf.org/schemas/v1/CertificateLocations_v1.xml)
* Certificate Schema: [http://redfish.dmtf.org/schemas/v1/Certificate_v1.xml](http://redfish.dmtf.org/schemas/v1/Certificate_v1.xml)


### Change log

| Version | Date       | Description |
| ---     | ---        | ---         |
| 1.0.0   | TBD        | Initial release. |
