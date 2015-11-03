---
DocTitle: Redfish Schema Supplement
DocNumber: 0268
DocClass: DMTF Standard
DocVersion: '0.9.0'
modified: '2015-11-03'
status: published
released: false
copyright: '2015'
---

# Redfish Schema Supplement

This document contains supplemental details required to implement specific properties contained within Schemas defined by the Redfish Specification.  The Supplement includes normative statements that cannot be contained within the bounds of the "LongDescription" property of the Schema file - due to length, formatting, or the need for tables or diagrams to fully explain the requirements.

## Common Properties

This section documents properties that are either common throughout the Redfish Schema, or are defined in the Resource.1.x.x or odata.4.x.x schema files.

### @odata.context

(This section needs to be written in a normative style, an email from MikeP is copied here as a starting point)

The @odata.context is used for a few different things:
1)	First and foremost, it provides the location of the metadata that describes the payload.
2)	It provides a root URL for resolving relative references

The structure of the @odata.context is the url to a metadata document with a fragment describing the data (typically rooted at the top-level singleton or collection).

Technically the metadata document only has to define, or reference, any of the types it directly uses, and different payloads could reference different metadata documents. However, since the @odata.context provides a root URL for resolving relative references (such as @odata.id's) we have to return the "canonical" metadata document.  Further, because our "@odata.type" annotations are written as fragments, rather than full URLs, those fragments must be defined in, or referenced by, that metadata document. Also, because we qualify actions with the versionless namespace aliases, those aliases must also be defined through <references> in the referenced metadata document.

Initially we tried only to reference the ServiceRoot metadata in the root $metadata document, but this required us to use relative URLs for all of our @odata.type annotations for types that were hosted on-box, or absolute URLs for off-box metadata, and the client having to parse the URL to match just the fragment. Having the types defined or referenced from the service's $metadata allows us to just put a canonical fragment in the payload and decide in the service $metadata whether the reference is hosted on-box or off-box.  So it turned out that putting the <References> for any used types in the metadata document allows all of our payloads to be shorter and more consistent by using fragments, as well as using versionless aliases for actions.

### @odata.type

### @odata.id

### Status

### DateTime?

## Processor.1.x.x

### ProcessorID

This object's properties shall contain values dependent on the value of the ProcessorArchitecture property, as listed in the sections below:

#### ProcessorArchitecture: x86

##### VendorId

This property shall contain a 12 byte, little-endian ASCII string derived from register values resulting from the execution of the CPUID instruction.  The value shall be constructed using the following algorithm:

~~~
k=0;
foreach reg (cpuid.0.ebx, cpuid.0.edx, cpuid.0.ecx){ ##NB: order must be ebx, edx, ecx
  for (i=0; i<=3; i++) { vendorID[ byte(k*4 + i) ] = reg[byte(i)]; }
  k++;
  }
~~~

##### IdentificationRegisters

This property shall contain the register contents resulting from the exeuction of the CPUID instruction.

##### EffectiveFamily

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~ 
((cpuid.1.eax & 0x0ff00000) >> 20) + ((cpuid.1.eax & 0x00000f00) >> 8)  
~~~

##### EffectiveModel

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
((cpuid.1.eax & 0x000f0000) >> 12) + ((cpuid.1.eax & 0x000000f0) >> 4)
~~~

##### Step

This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
(cpuid->eax & 0xf)
~~~

##### MicrocodeInfo

This property shall contain the 64-bit value contained in MSR 0x8B.

#### ProcessorArchitecture: All Others

The contents of this object are not specified.
