---
DocTitle: Data Center Equipment Schema Readme
DocNumber: 'IS-0005'
DocClass: Informative
DocVersion: '0.8a'
modified: '2018-07-20'
status: Work in Progress
released: false
copyright: '2017-2018'
---
# Foreword

IMPORTANT: These documents are not final. They do not necessarily reflect the views of the DMTF or its members. Because these documents are a Work in Progress, these documents may still change, perhaps profoundly and without notice. These documents are available for public review and comment until superseded.

The following files are part of the Redfish Data Center Equipment Schema development effort:

* README-IS-0005.pdf - Redfish Data Center Equipment Schema Readme (for Work in Progress v0.8 release)
* Overview-IS-0005.pdf - Overview of Redfish DCIM modeling concepts (for Work in Progreess v0.2 release)
* \WIP-v0.2.0a - Contents of previous Work in Progress release which have not been updated
* \mockups - Rack PDU mockup using the v0.8.0a schema concepts


# Redfish Work in Progress Schemas

The Data Center Equipment schemas have undergone significant changes since the last Work in Progress release.  The Redfish Forum has been concentrating on the structural elements of the data model, which represent the bulk of the changes shown in this release.  The primary concepts updated or introduced with this v0.8 Work in Progress release are:

- Revamped Sensor model that can be applied across the Redfish data model and allows for better integration with the Telemetry service model.
- The use of schema 'Excerpts' to provide sensor readings and identification properties within the resources where they are needed.
- A concept of an 'Alarm' collection used to represent alert conditions which have no supporting properties in the data model.

The schemas defined to support these concepts are included in this release as "v0_8_0" schema versions.  In addition, the RackPDU schemas have been updated and expanded to utilize these concepts.  The Redfish Forum encourages feedback on both the architectural elements shown in this release, and on the content of the RackPDU schemas (RackPDU, Circuit and OutletGroup) that implement them.

NOTE: The data mockups included in this release use ficticious data values and are neither internally consistent nor mathmatically accurate.  The data values (such as Voltage, Current and Power readings) are random and will not match values derived by forumulas.  Numerous references are made within these mockups to Sensor resources which are not yet populated.

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| Alarm_v1 | 0.8.0a | 2018-07-20 | Work in Progress release.  |
| AlarmCollection_v1 |  0.8.0a | 2018-07-20 | Work in Progress release.  |
| Circuit_v1 | 0.8.0a | 2018-07-20 | Work in Progress release.  |
| CircuitCollection_v1 |  0.8.0a | 2018-07-20 | Work in Progress release.  |
| OutletGroup_v1 | 0.8.0a | 2018-07-20 | Work in Progress release.  |
| OutletGroupCollection_v1 |  0.8.0a | 2018-07-20 | Work in Progress release.  |
| RackPDU_v1 | 0.8.0a | 2018-07-20 | Work in Progress release.  |
| RackPDUCollection_v1 |  0.8.0a | 2018-07-20 | Work in Progress release.  |
| Sensor_v1 | 0.8.0a | 2018-07-20 | Work in Progress release.  |
| SensorCollection_v1 |  0.8.0a | 2018-07-20 | Work in Progress release.  |

The following schema files have not been updated since the v0.2 Work In Progress release (pending feedback on the significant changes to the Sensor model), and they are included in a separate folder for reference.  These schemas are expected to be updated to be consistent in content and architectural style to that of the v0.8 RackPDU as shown in this release.

| Schema File | Version | Date      | Description     |
| ---         | ---     | ---       | ---             |
| AirHandlingUnit_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| AirHandlingUnitCollection_v1 |  0.2.0a | 2017-12-01 | Work in Progress release.  |
| Alarm_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| AlarmCollection_v1 |  0.2.0a | 2017-12-01 | Work in Progress release.  |
| AlarmRegistry_v1 |  0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRAC_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRACCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRAH_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRAHCollection_v1 | 1.0.0a | 2017-8-22 | Work in Progress release.  |
| Chiller_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| ChillerCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CoolingTower_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CoolingTowerCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| DCIMCooling_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| DCIMCoolingCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| DCIMPower_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| DCIMPowerCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| Generator_v1 | 0.1.0a | 2017-8-22 | Work in Progress release.  |
| GeneratorCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| PDU_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| PDUCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| PowerMeter_v1 |  0.2.0a | 2017-12-01 | Work in Progress release.  |
| PowerMeterCollection_v1 |  0.2.0a | 2017-12-01 | Work in Progress release.  |
| RackPDU_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| RackPDUCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| Rectifier_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| RectifierCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| Sensor_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| SensorCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRAC_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| CRACCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| ServiceRoot_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| SwitchGear_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| SwitchGearCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| TransferSwitch_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| TransferSwitchCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| Transformer_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| TransformerCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| UPS_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| UPSCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| VFD_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |
| VFDCollection_v1 | 0.2.0a | 2017-12-01 | Work in Progress release.  |

# Equipment Modeling Methdology

The Work In Progress (WIP) data center power and cooling equipment data models are based on an initial collection of the kinds of inventory, status, metric and sensor properties each type of equipment is often instrumented with.  Further refinement was started in the WIP schemas by creating a sensor abstraction with a related collection so that there could be flexibility in representing equipment with more or less sensors and still achieve a level of interoperable consistency in the API representation.  

Additionally, the concept of one or more power and cooling "domains" (or "zones") was introduced to reflect real world installations and organization of this kind of equipment.  The following is a more detailed description of the modeling methdology used in this WIP release.

## Domains
Within a data center there may be one or more power or cooling domains with each domain consisting of the equipment providing service to the portion of the data center designated as a domain. 

The Redfish DCIM modeling approach establishes a Power Domain collection and a Cooling Domain collection subordinate to the Redfish Service Root.

* Domain Collections located in Service Root and referenced from Service Root document.
* Organize data center facility equipment into 2 domains
  * Power – Name proposal “DCIMPower”
  * Cooling – Name proposal “DCIMCooling”
* Each Domain Collection consists of 1 or more members, with a domain member representing the group of equipment in the domain being instrumented and information/metrics at the domain level.
* A domain member consists of a document with references to collections of specific equipment types and properties representing information and domain level metrics.

## Specific Equipment Collections
An equipment collection consists 0 or more members, with an equipment collection member representing a specific piece of equipment.

The following data definition design pattern applies to each data center facilities equipment type:

* Represented as a CSDL/JSON entity in schema - named after the equipment type.
* Top level properties.
  * Equipment inventory information
  * Status
  * Metrics
  * Unique equipment properties and actions
* One Sensor Collection for all equipment and sub-component Sensors
  * Represented in one collection referenced as top level navigation property
* Specific equipment top level Sensors
  * Represented in SensorType arrays, an array for each SensorType
* SetPoints and Deadbands
  * Represented in SetPoint array of references to Sensor collection members with SetPoint and Deadband properties
* Alarms
  * All Alarms represented in subordinate Alarms collection
  * Triggered Alarms represented in array of references to Alarms collection members
* Equipment sub-components are represented as 1 or more members of top level array property.
  * Each sub-component is represented as a property of object type with the top level properties
    * Component inventory information
    * Status
    * Metrics
    * SensorType arrays, one array for each SensorType in the sub-component
    * Unique component properties and actions

# Equipment Inventory Modeling
Equipment inventory information is represented by a consistent set of top level properties in the equipment entity schema.  

Every DCIM (and other Redfish IT equipment schema) equipment schema includes the common inventory properties.

# Equipment Location Modeling
Equipment location is represented by the PhysicalLocation top level property in the equipment entity schema.  

Every DCIM equipment schema includes the PhysicalLocation property.

The PhysicalLocation property is a common Redfish property of type Resource.Location object.

The Resource.Location object has properties supporting international addresses and other types of location information.

# Sensor Modeling and Types
All sensors are modeled in a common way with a SensorType property differentiating between different kinds of sensors.

Sensors of various types are represented in the equipment schema as individual members of a Sensors Collection subordinate to each equipment model entity.

Array properties of specific sensor types are located:
* As top level properties in equipment entity schema
* Within sub-component definitions.

SensorType enumeration values:
  
* Temperature
* Humidity
* Amperage
* ACVoltage
* DCVoltage
* Frequency
* Pressure
* LiquidLevel
* Rotational
* AirFlow
* LiquidFlow
* Barometric
* Altitude

# Typical Power and Cooling Equipment and Sub-Component Specific Sensors
The following information are the types of sensors typically found on various types of power and cooling equipment.  All sensor types are accounted for in the common sensor model.  Standards based requirements for specific sensors for a particular type of equipment are expected to be defined in a subsequent equipment specific Interoperabilty Profile.  For more information on Interoperability Profiles see DMTF Redfish Publications DSP0272 (Redfish Interoperability Profile Specification) and DSP8013 ( Redfish Interoperability Profile Bundle).

## Power Equipment Sensor Types
Sensors types for Redfish data model aligned power equipment schema.

### Generator
* Fuel Level
* Oil Level
* Temperature
* AC Output Sub-Component Sensors
  * Frequency
  * RMS Voltage (L-L)
  * RMS Voltage (L-G)
  * RMS Current
  * Output Ground Current
  * Battery Voltage

### PDU (Power Distribution Unit) - RackPDU
* Temperature
* Humidity
* AC Input Sub-Component (1-n) Sensors
  * RMS Voltage
  * RMS Current
  * Frequency
* AC Output Sub-Component (1-n) Sensors
  * RMS Voltage
  * RMS Current
  * Frequency

### Rectifier
* Temperature
* AC Input Sub-Component (n) Sensors
  * RMS Voltage
  * RMS Current
  * Frequency
* DC Bus (n)
  * DC Voltage
* Rectifier (n)
  * DC Current
  * Temperature

### Transformer
* Temperature
* Ambient Temperature
* Humidity
* Pressure
* Liquid Level
* AC Input
  * RMS Voltage
  * RMS Current
  * Frequency
* AC Output
  * RMS Voltage
  * RMS Current
  * Frequency

### UPS
* AC Utility Input
  * RMS Voltage (L-L) Phase A-B
  * RMS Voltage (L-L) Phase B-C
  * RMS Voltage (L-L) Phase C-A
  * RMS Current
  * Frequency
  * Ambient Temperature
  * Humidity
* AC Static Bypass Input
  * RMS Voltage (L-N)
  * RMS Voltage (L-L)
  * RMS Current
  * Frequency
* AC Maintenance Bypass Input
  * RMS Voltage (L-N)
  * RMS Voltage (L-L)
  * RMS Current
  * Frequency
* DC Bus
  * Voltage
  * DC Current
* Battery Sub-Component (1-n)
  * Temperature
* AC Output
  * RMS Voltage (L-N)
  * RMS Voltage (L-L)
  * RMS Current
  * Frequency

### VFD
* Speed
* AC Input
  * RMS Current
  * RMS Voltage (L-L)
* AC Output
  * Frequency
  * RMS Voltage (L-L)
  * RMS Current
* DC Bus
  * DC Voltage

## Cooling Equipment Sensor Types
Sensors types for Redfish data model aligned cooling equipment schema.

### Air Handling Unit
* Supply Air Temperature
* Return Air Temperature
* Relative Humidity
* RA Relative Humidity
* Supply Fan Speed
* Exhaust Fan Speed
* Supply Water Temperature
* Return Water Temperature
* Chilled Water Valve Opening
* Differential Water Pressure
* Outside Air Temperature
* Outside Air Relative Humidity
* Outside Air Damper Position
* Exhaust Air Damper Position
* Return Air Damper Position
* Mixing Air Damper
* Reheat Coil Discharge Temperature

### Chiller
* Chilled Water Return Temperature
* Chilled Water Supply Temperature
* Cold Water Return from Chiller
* Cold Water Supply to Chiller
* Compressor Discharge Temperature
* Compressor Discharge Pressure
* Compressor Suction Pressure
* Compressor Suction Temperature
* Evaporator Entering Water Temp
* Evaporator Leaving Water Temp
* Evaporator Saturated Refrigerant Temperature
* Evaporator Refrigerant Pressure
* Condenser Saturated Refrigerant Temperature
* Condenser Refrigerant Pressure
* Chilled Water Flow
* Cold Water Flow
* Chilled Water Valve Position
* Cold Water Valve Position
* Chilled Water Pump Speed
* Cold Water Pump Speed
* Make Up Chilled Water
* Compressor Oil Temperature
* Compressor Oil Pressure
* Compressor Phase AB Voltage
* Compressor Phase BC Voltage
* Compressor Phase CA Voltage
* Compressor Line 1 Current
* Compressor Line 2 Current
* Compressor Line 3 Current
* Compressor Line 1 Current RLA
* Compressor Line 2 Current RLA
* Compressor Line 3 Current RLA

### CRAC (Computer Room Air Conditioner)
* Supply Air Temperature
* Return Air Temperature
* Relative Humidity
* Unit Fan Speed
* Condensor Fan Speed
* Compressor Discharge Temperature
* Compressor Discharge Pressure
* Compressor Suction Pressure
* Compressor Suction Temperature
* Outside Air Humidity
* Outside Air Temperature

### CRAH (Computer Room Air Handler)
* Supply Air Temperature
* Return Air Temperature
* Relative Humidity
* Unit Fan Speed
* Supply Water Temperature
* Return Water Temperature
* Differential Water Pressure
* Outside Air Humidity
* Outside Air Temperature
  
  
