---
DocTitle: Data Center Equipment Schema Readme
DocNumber: 'IS-0004'
DocClass: Informative
DocVersion: '0.1a'
modified: '2017-08-22'
status: Work in Progress
released: false
copyright: '2017'
---
# Foreword

IMPORTANT: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.

The following files are part of the Redfish Data Center Equipment Schema development effort:

* DataCenterEquipmentSchemaREADME.pdf - Redfish Data Center Equipment Schema Readme (Work in Progress release)

# Redfish Work in Progress Schemas

The following new schema files are released as Work In Progress documents. 

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| AirHandlingUnit_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| AirHandlingUnitCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| CRAC_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| CRACCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| CRAH_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| CRAHCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Chiller_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| ChillerCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| CoolingTower_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| CoolingTowerCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| DCIMCooling_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| DCIMCoolingCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| DCIMPower_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| DCIMPowerCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Generator_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| GeneratorCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| PDU_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| PDUCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| RackPDU_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| RackPDUCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Rectifier_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| RectifierCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Sensor_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| SensorCollection_v1 | 1.0.0a | 2017-86-22 | Work in Progress release.  |
| CRAC_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| CRACCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| ServiceRoot_v1 | 1.3.0a | 2017-8-22 | Work in Progress release.  |
| SwitchGear_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| SwitchGearCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| TransferSwitch_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| TransferSwitchCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Transformer_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| TransformerCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| UPS_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| UPSCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| VFD_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| VFDCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |

# Equipment Modeling Methdology

The Work In Progress(WIP) data center power and cooling equipment data models are based on an initial collection of the kinds of inventory, status, metric and sensor properties each type of equipment is often instrumented with.  Further refinement was started in the WIP schemas by creating a sensor abstraction with a related collection so that there could be flexibility in representing equipment with more or less sensors and still achieve a level of interoperable consistency in the API representation.  Additionally, the concept of one or more power and cooling "domains" (or "zones") was introduced to reflect real world installations and organization of this kind of equipment.  The following is a more detailed description of the modeling methdology used in this WIP release.

## Domains
* Domain Collections located in the API Service Root and referenced from API Service Root document.
** Organize data center facility equipment into 2 domains represented as Domain Collections
*** Power Domain Collection – Name proposal “DCIMPower”
*** Cooling Domain Collection – Name proposal “DCIMCooling”
** Each Domain Collection consists of 1 or more members, with a domain member representing the group of equipment in the domain being instrumented and information/metrics properties at the domain level.
** A domain member consists of a JSON document with navigation reference properties to specific equipment type collections and top level properties representing domain information and domain level metrics.
## Specific Equipment Collections
* An equipment collection consists 0 or more members, with an equipment collection member representing a specific piece of equipment.
## Equipment Modeling Pattern
* Equipment is represented as CSDL/JSON entity in schema.
* Equipment inventory information and metrics represented as entity top level properties.
* Sensors are represented in one or more collections referenced as top level property per collection.
* Equipment sub-components are represented as 1 or more members of top level array property.
* Each sub-component is represented as a complex property (object) with top level properties of component information and metrics and a sensors collection. 
