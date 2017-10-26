---
DocTitle: Redfish Telemetry White Paper
DocNumber: '2051'
DocClass: Informative
DocVersion: '1.0.0'
modified: '2017-06-30'
status: Published
released: true
copyright: '2017'
---


# Foreword

The Redfish Telemetry White Paper was prepared by the Scalable Platforms Management Forum of the DMTF.

DMTF is a not-for-profit association of industry members dedicated to promoting enterprise and systems management and interoperability. For information about the DMTF, see http://www.dmtf.org.


# Acknowledgments

The DMTF acknowledges the following individuals for their contributions to this document:

* George Ericson - Dell Inc.
* John Leung - Intel Corporation

# Introduction

Redfish is an evolving hardware management standard that is designed to be flexible, extensible, and interoperable. 
The Telemetry model is proposed to support the ability for a Redfish client to determine the characteristics of metric, specify aggregates of metrics to report and request that a metric be monitored against one or more thresholds.
.
A the metric can comes from a variety of sources: environmental sensors, digital meters, discrete states or synthesized values, to name a few.

This document helps implementers of Redfish services and clients understand the Redfish Telemetry data model.

# Requirements of Telemetry Model
In developing the Telemetry mode, these are the general requirements for the design.

* Support telemetry/sensors within the existing models
* Telemetry model is optional - not required
* Comprehends various type of telemetry sources
* Models for capabilities beyond a telemetry reading

The requirement to support telemetry and sensors within the existing models is driven by the fact that properties representing environmental sensors and digital meters are present throughout the current Redfish models. In this document, these properties will be reference to as _metric properties_. A metric property in a single resource, along with other properties, and can be a simple JSON object or within a complex JSON object.  A metric property can be within a resource dedicated to metrics (e.g MemoryMetrics). With YANG models, the dedicated object is used often.

The Telemetry model should should work this diverse variation and continue to allow metric properties to be placed anywhere in the Redfish model.
![Figure 1](TelemetryWhitePaper/Figure-MetricProperties.jpg "Figure 1")

The requirement that the Telemetry model should be optional means that no part of the model is required to be implemented.  More specifically, that there is no dependency between the elements of the Telemetry model, so the service only implements that portion of the Telemetry model of interest. With the current Redfish models, the client can retrieve a resource and extract the metric of interest.  That should not change.  Only if the Redfish service wishes to expose the capabilities of the Telemetry model is that portion of the Telemetry model implemented.

The requirement that the Telemetry model comprehend various telemetry resources recognizes the that one can measure anything.  The Telemetry model should support the following types of metrics:

* **Environmental sensor** - which measures an element in the physical world (e.g. temperature)
* **Digital meter** - which measures a value characterize digital behavior (e.g. cache hits)
* **State sensor** - which reports on the state of an element or resource
* **Discrete sensor** - who's measurement has specific discrete values (e.g. vertical, horizontal, inclined)
* **Gauge sensor** - who's measurement are continuous within a range
* **Statistical metric** - which is a computation on a metric over a time interval (e.g. min, max, average)
* **Synthesized metric** - which is a computation of a metric from other metrics

The requirement to support higher level telemetry capabilities means supporting more than just metric readings. This includes:

* Ability to get aggregated metrics
* Ability to specify thresholds against which a metric is monitored
* Ability to subscribe for alerts about threshold crossing

# Telemetry Model
The Telemetry model has a Telemetry Service with four subordinate collection resources for:

* Metric definitions - for metric characteristics and other metadata
* Metric report definitions - for requesting that metric reports be generated
* Metric reports - for logging of metric reports, if requested
* Metric triggers - for requesting that metrics be monitored against threshold triggers

## Modeling Options
In this work-in-progress document, there are some areas where to models are present for the same capability.  These represent areas where the modeling options have benefits and disadvantages.  Feedback on the options present would be useful in guiding the DMTF on a selection. 

There are a several aspect of the Telemetry where to preferred model.  In those cases, both models are present in the Telemetry model.  It is hope that feedback from the industry would inform the selection of a single model. There areas where two modeling options are:

* Specifying re-occuring measurements
* Specifying triggers
* Specifying calculations

### Specifying Re-occurring Measurements
There are two options for modeling re-occuring measures proposed in the Telemetry model.  The first is in the MetricDefinition resource. The second is in the MetricReportDefinition resource.

```
	"Schedule": {
		"Lifetime": "P05D",
		"RecurrenceInterval": "PT0.001S"
	},
```

### Specifying Triggers
There are two options for modeling triggers proposed the Telemetry model.  The first option is in the Triggers resource.  The second is in the MetricReportDefinition resource.

The first option places the TriggerCondition in the Trigger singleton resource which is a member of the Triggers colleciton resource. This model is described in the [Triggers](#triggers) section.

The second option places a TriggerCondition property MetricReportDefinition.  The TriggerCondition property is placed within the list of Metrics for the report.

```
	"Metrics": [{
		"MemberID": "PowerUsageReading",
		"MetricProperties": ["/redfish/v1/Chassis/...PowerConsumedWatts"],
		"CollectionDuration": "PT0.020S",
		"TriggerCondition": {
			"DwellInterval": "PT0.001S",
			"TriggerType": "Numeric",
			"NumericTriggerConditions": {
				"Name": "UpperThresholdNonCritical",
				"Value": "48.1",
				"DirectionOfCrossing": "Increasing"
			}
		}
	}],
```

### Specifying Calculations
There are two options for modeling a calculate metrics proposed the Telemetry model.  The first option is in the MetricDefintion resource.  The second is in the MetricReportDefinition resource.

The first option is used when a metric property exists for the result of calculation.  For example, the Power resource has the `AverageConsumedWatts` property whose value is the calculated value. In this example a MetricDefinition exists for `AverageConsumedWatts`. The MetricDefinition contains the calculation properties show.  The `CalculationParameters` property contains a references to the source and resultant metric properties.  Both of these metric properties can exist in a MetricReportDefinition.

```
    "CalculationAlgorithm": "AverageOverInterval",
 	"CalculationTimeInterval": "PT1S",
	"CalculationParameters": [
	    {
		    "SourceMetric": "/redfish/v1/Chassis/...PowerConsumedWatts ",
 		    "ResultMetric": "/redfish/v1/Chassis/...AverageConsumedWatts "
	    },
		...
	]
```
The second option is used when no metric property exists for the result of a calculation.  In the case, the calculation can be specified with the MetricReportDefinition directly.
```
	"Metrics": [
		{
			"MemberID": "AverageConsumedWatts",
			"CollectionFunction": "Avg",
			"MetricProperties": ["/redfish/v1/Chassis/...PowerConsumedWatts"]
		},
		...
	]
```

## Telemetry Service

The TelemetryService resource is the top level resource visible on ServiceRoot. 
![Figure 1](TelemetryWhitePaper/Figure-TelemetryService.jpg "Figure 1")

The TelemetryService contains links to collections of MetricDefinitions, MetricReportDefinitions, MetricReports, and Triggers.  MetricDefinitions are described in the [Metric Definitions](#metric-definitions) section; MetricReportDefintions and MetricReports are described in the [Metric Report Definitions](#metric-report-definitions) section;and, Triggers are described in the [Triggers](#triggers) section.

The telemetry service model is constructed to minimize the impact to the current metric model where metric properties can be  place anywhere in the Redfish model.  The goal was to not require significant changes in existing metric properties and allow metric characteristics and capabilities to be added incrementally.

Hence, the TelemetryService is optional.  An implementation can decide for each metric property, whether the associated metric definition, metadata or characteristics are provided, and the amount of metadata available.

Furthermore, subordinate resources (MetricDefinition, MetricReportDefinition and Triggers) are independent on each other.  So an implementation can support one or all of the subordinate resources and the capabilities represented by them.

The TelemetryService resource, itself, contains the `Status` property.  This property is common to Redfish resources.  

Example Telemetry Service Resource:
```json
{
	"@odata.context": "/redfish/v1/$metadata#TelemetryService",
	"@odata.type": "#TelemetryService.v1_0_0.TelemetryService",
	"@odata.id": "/redfish/v1/TelemetryService",
	"Id": "TelemetryService",
	"Name": "Telemetry Service",
	"Status": {
		"State": "Enabled",
		"Health": "OK"
	},
	"SupportedCollectionFunctions": ["Avg", "Min", "Max"],
	"MetricDefinitions": {
		"@odata.id": "/redfish/v1/TelemetryService/MetricDefinitions"
	}, 
	"MetricReportDefinitions": {
		"@odata.id": "/redfish/v1/TelemetryService/MetricReportDefinitions"
	},
	"MetricReports": {
		"@odata.id": "/redfish/v1/TelemetryService/MetricReports"
	},
	"Triggers": {
		"@odata.id": "/redfish/v1/TelemetryService/Triggers"
	}
}
```

## Metric Definitions

The MetricDefinitions collection resource contains MetricDefinition singleton resources.  Each MetricDefinition contains the definition, metadata, or characteristics for a metric.  In Figure 2, PowerConsumedWatts is MetricDefinition for the PowerConsumedWatts property in the Power resource.
![Figure 2](TelemetryWhitePaper/Figure-MetricDefinitionRef.jpg "Figure 2")

The MetricDefinition resource contains a MetricProperties object which references the metric properties to which the metric definition applies.  In Figure 2, the PowerConsumedWatts metric definition can reference each PowerConsumedWatts property in every Chassis, if that represents the implemented Redfish service.

From the PowerConsumedWatts metric property in the Power resource, an annotation may  be insert to reference the MetricDefinition which applies to that metric property.

The characteristics represented in the MetricDefinition resource can be grouped into four category: context, usage and measurement.

The context properties contains value which provide the context of the metric. The context properties are:

* MetricType
* ImplementationType
* SensorType
* PhysicalContext

The usage properties provide guidance on how the metric can be used by a Redfish client.  The usage properties are:

* Calculable
* IsLinear

The reoccuring measurement property is the `Schedule` property.  The property specifies the interval of reoccuring measurement and lifetime of the recurring measuremnt.  The example below specifies a reoccurance of .001 seconds for 5 days.

The remaining properties are measurement properties which characterizes the measurement, itself. The measurement properties contain properties obtained from the Energy Efficient HPC WG's PowerAPI specification.  In their description below, an excerpt for the PowerAPI specification is included. The PowerAPI properties are:

* Precision
* Accuracy
* TimeStampLatency
* TimeStampAccuracy
* TimeWindow
* UpdateRate
* SampleRate
* MeasureMethod
	
### Metric Type
The MetricType property specifies the type of metric and can have the following values.

* **Counter** - The metric is a monotonic counter
* **Gauge** - The metric has values the can increase or decrease 
* **Numeric** - The metric is a counter metric
* **Discrete** - The metric is a counter metric

### ImplementationType

The ImplementationType property specifies how the metric is obtained and can have the following values.

* **PhysicalSensor** - A physical sensor measures values of the physical environment
* **DigitalMeter** - A digital meter measures values of digital elements (e.g. cache hits)
* **Calculated** - A calculated metric is obtained by applying a calculation on other metrics
* **Synthesized** - A synthesized metric is a calculated metric which represents physical sensor value

### SensorType

The SensorType property contains the value from the SensorType enumerated in LogEntry.xml

### PhysicalContext

The PhysicalContext property contains the value from the SensorType enumerated in PhysicalContext.xml

### Units

The Units property is the units of the metric, as defined by Unified Code for Units of Measure (UCUM)

### DiscreteValues

The DiscreteValues array property is a list of the discrete values that a Discrete metric value may take.

### Precision

The Precision property contains a value as specified by the Power API.

> Number of significant digits in values

### Accuracy

The Accuracy property contains a value as specified by the Power API.

>Estimated percent error +/- of measured vs. actual values.

### TimeStampLatency
 
The TimeStampe property contains a value as specified by the Power API.

>Estimate of the time required to get or set an attribute. This is useful to estimate completion time for an operation a priori. A value of zero should be returned when the get/set is instantaneous.

### TimeStampAccuracy

The TimeStampAccuracy property contains a value as specified by the Power API.

>Estimated accuracy of returned timestamps, represented as +/- the PWR_Time value returned.

### TimeWindow

The TimeStampAccuracy property contains a value as specified by the Power API.

>The time window used to calculate the value returned or relevant to an attribute.
For example, the “instantaneous” PWR_- ATTR_POWER values reported may actually be averaged over a short time window. Power caps are also enforced with respect to a target time window.

### UpdateRate

The UpdateRate property contains a value as specified by the Power API.

>Rate values become visible to user, in updates per second. Getting or setting a value at a rate higher than this is not useful.

### SampleRate

The SampleRate property contains a value as specified by the Power API.

> Rate of underlying sampling, in samples per second. This is only relevant for values derived over time (e.g., PWR_ATTR_- ENERGY)

### MeasureMethod

The MeasureMethod property contains a value as specified by the Power API.

>Denotes the measurement method: an actual measurement (returned value = 0) or a model based estimate (return value = 1). Other values > 1 may be used to denote multiple vendor specific models in the situation where multiple models may exist.

### Wildcards

The Wildcards property is used on conjunction with the MetricProperties property.  The MetricProperties property contains a list of each metric property described by the MetricDefinition.  This list could get very large.  In order to reduce the size of the list, the MetricProperties strings contain wildcards, delimited by curly braces "{}".

The Wildcards property contains a list of the wildcards. Each wildcard contains a list the values that should be replace the wildcard.  A value of "*", would mean all values.

The wild card mechanism is also used in other parts of the Telemetry model.

### Example
The following example is for a numeric sensor, PowerConsumedWatts properties, which exists in the Power resources.
```json
{
    "@odata.context": "/redfish/v1/$metadata#MetricDefinition.MetricDefinition",
    "@odata.type": "#MetricDefinition.v1_0_0.MetricDefinition",
    "@odata.id": "/redfish/v1/TelemetryService/MetricDefinitions/PowerConsumedWatts",
    "Id": "PowerConsumedWatts",
    "Name": "Metric Definition of Power Consumed",
    "MetricType": "Numeric",
	"SensorType": "PowerConsumption",
	"Implementation": "PhysicalSensor",
	"PhysicalContext": "PowerSupply",
	"SensingInterval": "1000",
	"Units": "W",
	"Precision": 4,
    "Accuracy": 1.0,
	"Calibration": 2,
	"TimeStampAccuracy": "PT1S",
 	"MinReadingRange": 0.0,
	"MaxReadingRange": 50.0,
    "Wildcards": [
        { "Name": "ChassisID", "Values": [ "1", "2", "3" ] }
    ],
	"MetricProperties": [
        "/redfish/v1/Chassis/{ChassisID}/Power#/PowerControl/0/PowerConsumedWatts ",
        "/redfish/v1/Chassis/{ChassisID}/Power#/PowerControl/1/PowerConsumedWatts "
    ]
}
```

## Metric Report Definitions

The `MetricReportDefinition` resource specifies the metric report that the Redfish service will create.  The metric reports can be use to aggregate metric readings.  The metric reports can be create d periodically, when a reading value changes, or upon request.  The metric report can be transmitted using the Event Service and/or stored locally (as a member the ./MetricReports collection) and retrieved later.
![Figure 3](TelemetryWhitePaper/Figure-MetricReportDefinition.jpg "Figure 3")

The properties of MetricReportDefinition are described below.

### MetricReportType
The `MetricReportType` property specifies when the report is created and can have the following values.

* **Periodic** - The metric report shall be updated periodically
* **OnChange** - The metric report shall be updated when the values change 
* **OnReport** - The metric report shall be updated each time a client reads it 

### ReportActions
The `ReportActions` array property specifies the action(s) to perform when a metric report is generated.

* **Log** - Place the metric report in a location where the client can retrieve
* **Transmit** - Send the metric report as a Metric event 

### MetricProperties
The `MetricProperties` array property specifies metrics which are metrics are included in the metric report.  The `MetricProperties` may have wild cards.

### Example
The following example specifies a metric report with includes the AvgPowerConsumedWatts, MinPowerConsumedWatts and MaxPowerConsumedWatts, from the chassis, Tray_1, Tray_2 and Tray_3. The metric report is to generated periodically and transmit as a Informational Event and also logged as a member of the MetricReports collection resource.  When logging, the metric report should overwrite a previous metric report.

```json
{
	"@odata.context": "/redfish/v1/$metadata#MetricReportDefinition.MetricReportDefinition",
	"@odata.type": "#MetricReportDefinition.v1_0_0.MetricReportDefinition",
	"@odata.id": "/redfish/v1/TelemetryService/MetricReportDefinitions/JL_PowerMetrics",
	"Id": "JL_PowerMetrics",
	"Name": "Power Metrics",
	"MetricReportType": "Periodic",
	"Schedule": {
		"RecurrenceInterval": "PT0.1S"
	},
	"ReportActions": ["Transmit", "Log"],
	"MetricReport": {"@odata.id": "/redfish/v1/TelemetryService/MetricReports/PowerMetrics"},
	"Volatile": true, 
	"Status": {
		"State": "Enabled"
	},
	"Wildcards": [
		{ "PWild": ["0", "1"] },
		{ "TWild": ["Tray_1", "Tray_2", "Tray_3"] }
	],
	"MetricProperties": [
		"/redfish/v1/Chassis/{TWild}/Power#/PowerControl/{PWild}/AvgPowerConsumedWatts",
        "/redfish/v1/Chassis/{TWild}/Power#/PowerControl/{PWild}/MinPowerConsumedWatts",
	    "/redfish/v1/Chassis/{TWild}/Power#/PowerControl/{PWild}/MaxPowerConsumedWatts"
	]
}
```
## Triggers

The Triggers resource specifies the trigger threshold(s) that apply to numeric or discrete metrics. A trigger can result in an alert being transmitted using the Event Service and/or logged in the service log.

![Figure 4](TelemetryWhitePaper/Figure-Triggers.jpg "Figure 4")

### TriggerType
The `TriggerType` property specifies the type of trigger and indicates other properties that should be present. The property can have the following values:

* **Numeric** - The triggers are numeric.  See `NumericTriggers` property
* **Discrete** - The triggers are discrete.  See DiscreteTriggerCondition property 

### TriggerActions
The `TriggerActions` array property specifies the action(s) to perform when a trigger is trip. The property can have the following values:

* **Log** - Log the trigger into the Service Log 
* **Transmit** - Send the trigger as a Alert event

### NumericTriggers
The `NumericTriggers` array property specifies the trigger thresholds, if the `TriggerType' is numeric.  The property is complex can has the following properties

* `Value` - the value of the threshold
* `DirectionOfCrossing` - the direction that the threshold is crossed to trip the trigger
* `DwellTimems` - the duration in the triggering state before the trigger is invoked
* `Severity` - the value of the `Severity` property within the alert Event Message

### DiscreteTriggerConditions
The `DiscreteTriggerCondition

* **Specified** - A trigger occurs when the value of the metric becomes one of the values listed in the `DiscreteTriggers` property
* **Changes** - A trigger occurs whenever the value of the metric changes.

### DiscreteTriggers
The `DiscreteTriggers` array property specifies the values of metric which will trip the trigger, if the `TriggerType` is discrete and `DiscreteTriggerCondition` is specified.

* `Value` - the value of the threshold
* `DwellTimems` - the duration in the triggering state before the trigger is invoked
* `Severity` - The value of the `Severity` property within the alert Event Message

### MetricProperties
The `MetricProperties` array property specifies metrics which are metrics to monitor against the triggers.  The `MetricProperties` property may have wildcards.

### Example
The following is an example of a numeric trigger with two thresholds (Upper Threshold Critical and Non Critical). When the trigger occurs, an Alert Event shall be sent to the subscribers, and will include the corresponding severity.

```json
{
	"@odata.context": "/redfish/v1/$metadata#Triggers.Triggers",
   	"@odata.type": "#Triggers.v1_0_0.Triggers",
  	"@odata.id": "/redfish/v1/TelemetryService/Triggers/PlatformPowerCapTriggers",
	"Id": "PlatformPowerCapTriggers",
	"Name": "Triggers for platform power consumed",
	"MetricType": "Numeric",
	"TriggerActions": ["Transmit"],
  	"NumericTriggers": [
			{
                "Name": "UpperThresholdCritical",
			    "Value": "50.0",
			    "DirectionOfCrossing": "Increasing",
			    "DwellTimems": "1",
                "Severity": "Critical"
			},
			{
                "Name": "UpperThresholdNonCritical",
			    "Value": "48.1",
			    "DirectionOfCrossing": "Increasing",
			    "DwellTimems": "4",
                "Severity": "Warning"
			}
    ],
	"MetricProperties": [
        "/redfish/v1/Chassis/1/Power#/PowerControl/0/PowerConsumedWatts",
        "/redfish/v1/Chassis/1/Power#/PowerControl/1/PowerConsumedWatts"
	]
}
```

## References

* <a id="PowerAPI Specification">PowerAPI Specification</a>  Energy Efficienct HPC Working Group, [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt)

