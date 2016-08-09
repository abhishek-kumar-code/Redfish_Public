---
title: 

language tabs:
  - shell

search: true
---


<p align="center">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>

# Redfish Schema Guide 

 -  Introduction to Redfish goes here. 
 -  Purpose of the document
 -  Structure and usage
 -  Other sources of information
 


# Common Redfish Properties

This section documents properties that are either common throughout the Redfish Schema, or are defined in the Resource.1.x.x or odata.4.x.x schema files.

## @odata.context


The @odata.context is used for a few different things:
1)	First and foremost, it provides the location of the metadata that describes the payload.
2)	It provides a root URL for resolving relative references

The structure of the @odata.context is the url to a metadata document with a fragment describing the data (typically rooted at the top-level singleton or collection).

Technically the metadata document only has to define, or reference, any of the types it directly uses, and different payloads could reference different metadata documents. However, since the @odata.context provides a root URL for resolving relative references (such as @odata.id's) we have to return the "canonical" metadata document.  Further, because our "@odata.type" annotations are written as fragments, rather than full URLs, those fragments must be defined in, or referenced by, that metadata document. Also, because we qualify actions with the versionless namespace aliases, those aliases must also be defined through <references> in the referenced metadata document.

Initially we tried only to reference the ServiceRoot metadata in the root $metadata document, but this required us to use relative URLs for all of our @odata.type annotations for types that were hosted on-box, or absolute URLs for off-box metadata, and the client having to parse the URL to match just the fragment. Having the types defined or referenced from the service's $metadata allows us to just put a canonical fragment in the payload and decide in the service $metadata whether the reference is hosted on-box or off-box.  So it turned out that putting the <References> for any used types in the metadata document allows all of our payloads to be shorter and more consistent by using fragments, as well as using versionless aliases for actions.

## @odata.type

## @odata.id

## Status

# Redfish Schema Details



# AccountService 1.0.2

Account Service contains properties common to all user accounts, such as password requirements, and control features such as account lockout.  It also contains links to the collections of Manager Accounts and Roles.

|     |     |     |
| --- | --- | --- |
| **AccountLockoutCounterResetAfter** | number<br>(s)<br><br>*read-write* | The interval of time in seconds since the last failed login attempt at which point the lockout threshold counter for the account is reset to zero. Must be less than or equal to AccountLockoutDuration |
| **AccountLockoutDuration** | number, null<br>(s)<br><br>*read-write* | The time in seconds an account is locked after the account lockout threshold is met. Must be >= AccountLockoutResetAfter. If set to 0, no lockout will occur. |
| **AccountLockoutThreshold** | number, null<br><br>*read-write* | The number of failed login attempts before a user account is locked for a specified duration. (0=never locked) |
| **Accounts** { | object<br><br>*read-write* | Link to a collection of Manager Accounts |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **AuthFailureLoggingThreshold** | number<br><br>*read-write* | This is the number of authorization failures that need to occur before the failure attempt is logged to the manager log. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **MaxPasswordLength** | number<br><br>*read-only* | This is the maximum password length for this service. |
| **MinPasswordLength** | number<br><br>*read-only* | This is the minimum password length for this service. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Roles** { | object<br><br>*read-write* | Link to a collection of Roles |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# ActionInfo 1.0.0

ActionInfo describes the parameters and other information necessary to perform a Redfish Action to a particular Action target.  As parameter support may differ between implementations and even among instances of a resource, this data can be used to ensure Action requests from applications contain supported parameters.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Parameters** [ { | array<br><br>*read-only* | The parameters associated with the specified Redfish Action |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AllowableValues** [ {} ] | array<br><br>*read-only* | A list of values for this parameter supported by this Action target |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DataType** | string, null<br><br>*read-write* | The JSON property type used for this parameter *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the parameter for this Action. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ObjectDataType** | string, null<br><br>*read-only* | The OData Type of an object-based parameter |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Required** | boolean<br><br>*read-only* | Indicates whether the parameter is required to perform this Action. |
| } ] |   |   |

## Property Details

### DataType:

| string | Description |
| --- | --- |
| Boolean | A boolean (true or false) |
| Number | A number |
| NumberArray | An array of numbers |
| Object | An embedded JSON object |
| ObjectArray | An array of JSON objects |
| String | A string |
| StringArray | An array of strings |


# AttributeRegistry 1.0.0

An Attribute Registry is a set of key-value pairs which are specific to a particular implementation or product, such that creating standardized property names would be impractical.  This schema describes the structure of a Registry, and also includes mechanisms for building user interfaces (menus) allowing consistent navigation of the contents.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Language** | string<br><br>*read-only* | This is the RFC 5646 compliant language code for the registry. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OwningEntity** | string<br><br>*read-only* | This is the organization or company that publishes this registry. |
| **RegistryEntries** { | object<br><br>*read-write* | List of all attributes and their metadata for this component. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Attributes** [ {} ] | array<br><br>*read-only* | The array containing the attributes and their possible values. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Dependencies** [ {} ] | array<br><br>*read-only* | The array containing a list of dependencies of attributes on this component. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Menus** [ {} ] | array<br><br>*read-only* | The array containing the attributes menus and their hierarchy. |
| } |   |   |
| **RegistryVersion** | string<br><br>*read-only* | This is the attribute registry version which is used in the middle portion of a AttributeRegistry. |
| **SupportedSystems** [ { | array<br><br>*read-write* | Array of systems supported by this attribute registry. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProductName** | string, null<br><br>*read-only* | Firmware version. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SystemId** | string, null<br><br>*read-only* | The system ID of the system. |
| } ] |   |   |

# Bios 1.0.0

Bios contains properties surrounding a BIOS Attribute Registry (where the system-specific BIOS attributes are described) and the Actions needed to perform changes to BIOS settings, which typically require a system reset to apply.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Bios.ChangePassword** {} | object<br><br>*read-write* | This action is used to change the BIOS passwords. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Bios.ResetBios** {} | object<br><br>*read-write* | This action is used to reset the BIOS attributes to default. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AttributeRegistry** | string, null<br><br>*read-write* | The Resource ID of the Attribute Registry for the BIOS Attributes resource. |
| **Attributes** {} | object<br><br>*read-write* | This is the manufacturer/provider specific list of BIOS attributes. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |

# Chassis 1.3.0

A Chassis represents the physical components for any system.  This resource represents the sheet-metal confined spaces and logical zones like racks, enclosures, chassis and all other containers. Subsystems (like sensors), which operate outside of a system's data plane (meaning the resources are not accessible to software running on the system) are linked either directly or indirectly through this resource.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Chassis.Reset** {} | object<br><br>*read-write* | This action is used to reset the chassis. This action resets the chassis, not Systems or other contained resources, although side effects may occur which affect those resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this chassis. |
| **ChassisType** | string<br><br>*read-write* | This property indicates the type of physical form factor of this resource. *See Property Details, below, for more information about this property.* |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the chassis. *See Property Details, below, for more information about this property.* |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ComputerSystems** [ {} ] | array<br><br>*read-only* | An array of references to the computer systems contained in this chassis.  This will only reference ComputerSystems that are directly and wholly contained in this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ContainedBy** {} | object<br><br>*read-write* | A reference to the chassis that this chassis is contained by. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Contains** [ {} ] | array<br><br>*read-only* | An array of references to any other chassis that this chassis has in it. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CooledBy** [ {} ] | array<br><br>*read-only* | An array of ID[s] of resources that cool this chassis. Normally the ID will be a chassis or a specific set of fans. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Drives** [ {} ] | array<br><br>*read-only* | An array of references to the disk drives located in this Chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagedBy** [ {} ] | array<br><br>*read-only* | An array of references to the Managers responsible for managing this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagersInChassis** [ {} ] | array<br><br>*read-only* | An array of references to the managers located in this Chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PoweredBy** [ {} ] | array<br><br>*read-only* | An array of ID[s] of resources that power this chassis. Normally the ID will be a chassis or a specific set of powerSupplies |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Storage** [ {} ] | array<br><br>*read-only* | An array of references to the storage subsystems connected to or inside this Chassis. |
| } |   |   |
| **Location** *(v1.2+)* { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Info** | string, null<br><br>*read-only* | This indicates the location of the resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**InfoFormat** | string, null<br><br>*read-only* | This represents the format of the Info property. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **LogServices** { | object<br><br>*read-write* | A reference to the logs for this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this chassis. |
| **Model** | string, null<br><br>*read-only* | This is the model number for the chassis. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PartNumber** | string, null<br><br>*read-only* | The part number for this chassis. |
| **PhysicalSecurity** *(v1.1+)* { | object<br><br>*read-write* | The state of the physical security sensor. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IntrusionSensor** | string, null<br><br>*read-write* | This indicates the known state of the physical security sensor, such as if it is hardware intrusion detected. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IntrusionSensorNumber** | number, null<br><br>*read-only* | A numerical identifier to represent the physical security sensor. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IntrusionSensorReArm** | string, null<br><br>*read-write* | This indicates how the Normal state to be restored. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Power** { | object<br><br>*read-write* | A reference to the power properties (power supplies, power policies, sensors) for this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerControl** [ {} ] | array<br><br>*read-write* | This is the definition for power control function (power reading/limiting). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerSupplies** [ {} ] | array<br><br>*read-write* | Details of the power supplies associated with this system or device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Redundancy** [ {} ] | array<br><br>*read-only* | Redundancy information for the power subsystem of this system or device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Voltages** [ {} ] | array<br><br>*read-write* | This is the definition for voltage sensors. |
| } |   |   |
| **PowerState** *(v1.0+)* | string, null<br><br>*read-write* | This is the current power state of the chassis. *See Property Details, below, for more information about this property.* |
| **SKU** | string, null<br><br>*read-only* | This is the SKU for this chassis. |
| **SerialNumber** | string, null<br><br>*read-only* | The serial number for this chassis. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Thermal** { | object<br><br>*read-write* | A reference to the thermal properties (fans, cooling, sensors) for this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Fans** [ {} ] | array<br><br>*read-write* | This is the definition for fans. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Redundancy** [ {} ] | array<br><br>*read-only* | This structure is used to show redundancy for fans.  The Component ids will reference the members of the redundancy groups. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Temperatures** [ {} ] | array<br><br>*read-write* | This is the definition for temperature sensors. |
| } |   |   |

## Property Details

### ChassisType:

| string | Description |
| --- | --- |
| Blade | An enclosed or semi-enclosed, typically vertically-oriented, system chassis which must be plugged into a multi-system chassis to function normally |
| Card | A loose device or circuit board intended to be installed in a system or other enclosure |
| Cartridge | A small self-contained system intended to be plugged into a multi-system chassis |
| Component | A small chassis, card, or device which contains devices for a particular subsystem or function |
| Drawer | An enclosed or semi-enclosed, typically horizontally-oriented, system chassis which may be slid into a multi-system chassis. |
| Enclosure | A generic term for a chassis that does not fit any other description |
| Expansion | A chassis which expands the capabilities or capacity of another chassis |
| IPBasedDrive | A chassis in a drive form factor with IP-based network connections. |
| Module | A small, typically removable, chassis or card which contains devices for a particular subsystem or function |
| Other | A chassis that does not fit any of these definitions |
| Pod | A collection of equipment racks in a large, likely transportable, container |
| Rack | An equipment rack, typically a 19-inch wide freestanding unit |
| RackMount | A single system chassis designed specifically for mounting in an equipment rack |
| Row | A collection of equipment racks |
| Shelf | An enclosed or semi-enclosed, typically horizontally-oriented, system chassis which must be plugged into a multi-system chassis to function normally |
| Sidecar | A chassis that mates mechanically with another chassis to expand its capabilities or capacity |
| Sled | An enclosed or semi-enclosed, system chassis which must be plugged into a multi-system chassis to function normally similar to a blade type chassis. |
| StandAlone | A single, free-standing system, commonly called a tower or desktop chassis |
| Zone | A logical division or portion of a physical chassis that contains multiple devices or systems that cannot be physically separated |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |
| Unknown | The state of the Indicator LED cannot be determined. Deprecated: Return null if state is unknown. |

### IntrusionSensor:

| string | Description |
| --- | --- |
| HardwareIntrusion | A door, lock, or other mechanism protecting the internal system hardware from being accessed is detected as being in an insecure state. |
| Normal | No abnormal physical security conditions are detected at this time. |
| TamperingDetected | Physical tampering of the monitored entity is detected. |

### IntrusionSensorReArm:

| string | Description |
| --- | --- |
| Automatic | This sensor would be restored to the Normal state automatically as no abnormal physical security conditions are detected. |
| Manual | This sensor would be restored to the Normal state by a manual re-arm. |

### PowerState:

| string | Description |
| --- | --- |
| Off | The components within the chassis has no power, except some components may continue to have AUX power such as management controller. |
| On | The components within the chassis has power on. |
| PoweringOff | A temporary state between On and Off. The components within the chassis can take time to process the power off action. |
| PoweringOn | A temporary state between Off and On. The components within the chassis can take time to process the power on action. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# ComputerSystem 1.2.0

This schema defines a computer system and its respective properties.  A computer system represents a machine (physical or virtual) and the local resources such as memory, cpu and other devices that can be accessed from that machine.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#ComputerSystem.Reset** {} | object<br><br>*read-write* | This action is used to reset the system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AssetTag** | string, null<br><br>*read-write* | The user definable tag that can be used to track this computer system for inventory or other client purposes |
| **Bios** *(v1.1+)* { | object<br><br>*read-write* | A reference to the BIOS settings associated with this system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AttributeRegistry** | string, null<br><br>*read-write* | The Resource ID of the Attribute Registry for the BIOS Attributes resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Attributes** {} | object<br><br>*read-write* | This is the manufacturer/provider specific list of BIOS attributes. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **BiosVersion** | string, null<br><br>*read-write* | The version of the system BIOS or primary system firmware. |
| **Boot** { | object<br><br>*read-write* | Information about the boot settings for this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BootSourceOverrideEnabled** | string, null<br><br>*read-write* | Describes the state of the Boot Source Override feature *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BootSourceOverrideMode** | string, null<br><br>*read-write* | The BIOS Boot Mode (either Legacy or UEFI) to be used when BootSourceOverrideTarget boot source is booted from. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BootSourceOverrideTarget** | string, null<br><br>*read-write* | The current boot source to be used at next boot instead of the normal boot device, if BootSourceOverrideEnabled is true. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UefiTargetBootSourceOverride** | string, null<br><br>*read-write* | This property is the UEFI Device Path of the device to boot from when BootSourceOverrideSupported is UefiTarget. |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EthernetInterfaces** { | object<br><br>*read-write* | A reference to the collection of Ethernet interfaces associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **HostName** | string, null<br><br>*read-write* | The DNS Host Name, without any domain information |
| **HostedServices** *(v1.2+)* { | object<br><br>*read-write* | The services that this computer system supports. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**StorageServices** | <br><br>*read-write* | A reference to a collection of storage services supported by this computer system |
| } |   |   |
| **HostingRoles** *(v1.2+)* [ {} ] | array<br><br>*read-write* | The hosing roles that this computer system supports. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the system *See Property Details, below, for more information about this property.* |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Chassis** [ {} ] | array<br><br>*read-only* | An array of references to the chassis in which this system is contained |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CooledBy** [ {} ] | array<br><br>*read-only* | An array of ID[s] of resources that cool this computer system. Normally the ID will be a chassis or a specific set of fans. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Endpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that connect to this system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagedBy** [ {} ] | array<br><br>*read-only* | An array of references to the Managers responsible for this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PoweredBy** [ {} ] | array<br><br>*read-only* | An array of ID[s] of resources that power this computer system. Normally the ID will be a chassis or a specific set of powerSupplies |
| } |   |   |
| **LogServices** { | object<br><br>*read-write* | A reference to the collection of Log Services associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Manufacturer** | string, null<br><br>*read-only* | The manufacturer or OEM of this system. |
| **Memory** *(v1.1+)* { | object<br><br>*read-write* | A reference to the collection of Memory associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **MemoryDomains** *(v1.2+)* { | object, null<br><br>*read-write* | A reference to the collection of Memory Domains associated with this system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **MemorySummary** { | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemoryMirroring** | string, null<br><br>*read-write* | The ability and type of memory mirroring supported by this system. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**TotalSystemMemoryGiB** | number, null<br><br>*read-only* | The total installed, operating system-accessible memory (RAM), measured in GiB. |
| } |   |   |
| **Model** | string, null<br><br>*read-only* | The model number for this system |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PCIeDevices** *(v1.2+)* [ { | array<br><br>*read-only* | A reference to a collection of PCIe Devices used by this computer system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeviceType** | string<br><br>*read-write* | The device type for this PCIe device. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FirmwareVersion** | string, null<br><br>*read-only* | The version of firmware for this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Links** {} | object<br><br>*read-only* | The links object contains the links to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | This is the model number for the PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PartNumber** | string, null<br><br>*read-only* | The part number for this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SKU** | string, null<br><br>*read-only* | This is the SKU for this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SerialNumber** | string, null<br><br>*read-only* | The serial number for this PCIe device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object, null<br><br>*read-only* |  |
| } ] |   |   |
| **PCIeFunctions** *(v1.2+)* [ { | array<br><br>*read-only* | A reference to a collection of PCIe Functions used by this computer system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ClassCode** | string, null<br><br>*read-write* | The Class Code of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeviceClass** | string<br><br>*read-write* | The class for this PCIe Function. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeviceId** | string, null<br><br>*read-write* | The Device ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FunctionId** | number, null<br><br>*read-only* | The the PCIe Function identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FunctionType** | string<br><br>*read-write* | The type of the PCIe Function. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Links** {} | object<br><br>*read-only* | The links object contains the links to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RevisionId** | string, null<br><br>*read-write* | The Revision ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SubsystemId** | string, null<br><br>*read-write* | The Subsystem ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SubsystemVendorId** | string, null<br><br>*read-write* | The Subsystem Vendor ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**VendorId** | string, null<br><br>*read-write* | The Vendor ID of this PCIe function. |
| } ] |   |   |
| **PartNumber** | string, null<br><br>*read-only* | The part number for this system |
| **PowerState** | string, null<br><br>*read-write* | This is the current power state of the system *See Property Details, below, for more information about this property.* |
| **ProcessorSummary** { | object<br><br>*read-write* | This object describes the central processors of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Count** | number, null<br><br>*read-only* | The number of processors in the system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | The processor model for the primary or majority of processors in this system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } |   |   |
| **Processors** { | object<br><br>*read-write* | A reference to the collection of Processors associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **SKU** | string, null<br><br>*read-only* | The manufacturer SKU for this system |
| **SecureBoot** *(v1.1+)* { | object<br><br>*read-write* | A reference to the UEFI SecureBoot resource associated with this system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SecureBootCurrentBoot** | string, null<br><br>*read-write* | Secure Boot state during the current boot cycle. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SecureBootEnable** | boolean, null<br><br>*read-write* | Enable or disable UEFI Secure Boot (takes effect on next boot). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SecureBootMode** | string, null<br><br>*read-write* | Current Secure Boot Mode. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **SerialNumber** | string, null<br><br>*read-only* | The serial number for this system |
| **SimpleStorage** { | object<br><br>*read-write* | A reference to the collection of storage devices associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Storage** *(v1.1+)* { | object<br><br>*read-write* | A reference to the collection of storage devices associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **SystemType** | string<br><br>*read-write* | The type of computer system represented by this resource. *See Property Details, below, for more information about this property.* |
| **TrustedModules** *(v1.1+)* [ { | array<br><br>*read-write* | This object describes the array of Trusted Modules in the system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FirmwareVersion** | string, null<br><br>*read-only* | The firmware version of this Trusted Module |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**InterfaceType** | string, null<br><br>*read-write* | This property indicates the interface type of the Trusted Module. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } ] |   |   |
| **UUID** | string, null<br><br>*read-write* | The universal unique identifier (UUID) for this system *See Property Details, below, for more information about this property.* |

## Property Details

### BootSourceOverrideEnabled:

| string | Description |
| --- | --- |
| Continuous | The system will boot to the target specified in the BootSourceOverrideTarget until this property is set to Disabled. |
| Disabled | The system will boot normally. |
| Once | On its next boot cycle, the system will boot (one time) to the Boot Source Override Target. The value of BootSourceOverrideEnabled is then reset back to Disabled. |

### BootSourceOverrideMode:

| string | Description |
| --- | --- |
| Legacy | The system will boot in non-UEFI boot mode to the Boot Source Override Target. |
| UEFI | The system will boot in UEFI boot mode to the Boot Source Override Target. |

### BootSourceOverrideTarget:

| string | Description |
| --- | --- |
| BiosSetup | Boot to the BIOS Setup Utility |
| Cd | Boot from the CD/DVD disc |
| Diags | Boot the manufacturer's Diagnostics program |
| Floppy | Boot from the floppy disk drive |
| Hdd | Boot from a hard drive |
| None | Boot from the normal boot device |
| Pxe | Boot from the Pre-Boot EXecution (PXE) environment |
| RemoteDrive | Boot from a remote drive (e.g. iSCSI) |
| SDCard | Boot from an SD Card |
| UefiHttp | Boot from a UEFI HTTP network location |
| UefiShell | Boot to the UEFI Shell |
| UefiTarget | Boot to the UEFI Device specified in the UefiTargetBootSourceOverride property |
| Usb | Boot from a USB device as specified by the system BIOS |
| Utilities | Boot the manufacturer's Utilities program(s) |

### DeviceClass:

| string | Description |
| --- | --- |
| Bridge | A bridge |
| CommunicationController | A communication controller |
| Coprocessor | A coprocessor |
| DisplayController | A display controller |
| DockingStation | A docking station |
| EncryptionController | An encryption controller |
| GenericSystemPeripheral | A generic system peripheral |
| InputDeviceController | An input device controller |
| IntelligentController | An intelligent controller |
| MassStorageController | A mass storage controller |
| MemoryController | A memory controller |
| MultimediaController | A multimedia controller |
| NetworkController | A network controller |
| NonEssentialInstrumentation | A non-essential instrumentation |
| Other | A other class. The function Device Class Id needs to be verified |
| ProcessingAccelerators | A processing accelerators |
| Processor | A processor |
| SatelliteCommunicationsController | A satellite communications controller |
| SerialBusController | A serial bus controller |
| SignalProcessingController | A signal processing controller |
| UnassignedClass | An unassigned class |
| UnclassifiedDevice | An unclassified device |
| WirelessController | A wireless controller |

### DeviceType:

| string | Description |
| --- | --- |
| MultiFunction | A multi-function PCIe device |
| Simulated | A PCIe device which is not currently physically present, but is being simulated by the PCIe infrastructure |
| SingleFunction | A single-function PCIe device |

### FunctionType:

| string | Description |
| --- | --- |
| Physical | A physical PCie function |
| Virtual | A virtual PCIe function |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |
| Unknown | The state of the Indicator LED cannot be determined. Deprecated: Return null if state is unknown. |

### InterfaceType:

| string | Description |
| --- | --- |
| TCM1_0 | Trusted Cryptography Module (TCM) 1.0 |
| TPM1_2 | Trusted Platform Module (TPM) 1.2 |
| TPM2_0 | Trusted Platform Module (TPM) 2.0 |

### MemoryMirroring:

| string | Description |
| --- | --- |
| DIMM | The system supports DIMM mirroring at the DIMM level.  Individual DIMMs can be mirrored. |
| Hybrid | The system supports a hybrid mirroring at the system and DIMM levels.  Individual DIMMs can be mirrored. |
| None | The system does not support DIMM mirroring. |
| System | The system supports DIMM mirroring at the System level.  Individual DIMMs are not paired for mirroring in this mode. |

### PowerState:

| string | Description |
| --- | --- |
| Off | The system is powered off, although some components may continue to have AUX power such as management controller. |
| On | The system is powered on. |
| PoweringOff | A temporary state between On and Off. The power off action can take time while the OS is in the shutdown process. |
| PoweringOn | A temporary state between Off and On. This temporary state can be very short. |

### SecureBootCurrentBoot:

| string | Description |
| --- | --- |
| Disabled | Secure Boot is currently disabled. |
| Enabled | Secure Boot is currently enabled. |

### SecureBootMode:

| string | Description |
| --- | --- |
| AuditMode | Secure Boot is currently in Audit Mode. |
| DeployedMode | Secure Boot is currently in Deployed Mode. |
| SetupMode | Secure Boot is currently in Setup Mode. |
| UserMode | Secure Boot is currently in User Mode. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |

### SystemType:

| string | Description |
| --- | --- |
| OS | An operating system instance |
| Physical | A computer system |
| PhysicallyPartitioned | A hardware-based partition of a computer system |
| Virtual | A virtual machine instance running on this system |
| VirtuallyPartitioned | A virtual or software-based partition of a computer system |

### UUID:



The value of this property contains a universal unique identifier number for the system.  Clients should consider the value of the property to be opaque and should not interpret any sub-fields within the UUID, but comparisons between UUID representations should always be case-insensitive.
The format of the string follows the 35-character string format specified in RFC4122 of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where each x represents a hex value 0-1,a-f.

If the computer system supports SMBIOS, then the string should be formed from the raw binary 16-byte SMBIOS UUID structure.  This allows out-of-band clients to correlate the UUID that in-band agents are reading from SMBIOS with the UUID represented out-of-band via the Redfish API.

The SMBIOS 2.6+ specification specifies the proper algorithm for converting the raw binary SMBIOS 16-byte structure into the canonical  string format of form "xxxxxx-xxxx-xxxx-xxxx-xxxxxx").  Redfish services should follow the SMBIOS 2.6+ specification for implementing this conversion.
WMI and Linux dmidecode also follow the SMBIOS guidelines.

Specifically, since RFC4122 defines that the canonical string value should follow network byte ordering, and since SMBIOS represents the UUID as five fields shown below:

    {
     DWORD    time_low,
     WORD     time_mid,
     WORD     time_hi_and_version,
     BYTE     clock_seq_hi_and_reserved,
     BYTE     clock_seq_low,
     BYTE[6]  node
    }
then for little-endian systems (including x86 systems), there is a little-endian to network-byte-order conversion required for the first three fields to convert the SMBIOS binary UUID to network byte order.

Therefore, as specified in the SMBIOS 2.6+ specification, if the canonical UUID string is:

    "00112233-4455-6677-8899-aabbccddeeff"
then the corresponding raw representation in the SMBIOS UUID structure would be:

    raw_smbios_uuid={ 0x33, 0x22, 0x11, 0x00,    0x55, 0x44,     0x77, 0x66,     0x88, 0x99,     0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF }
and the C-code to convert the raw SMBIOS UUID struct in a little-endian system to the canonical string would be:

    /* routine to convert raw little-endian smbios structure to canonical string */
    sprintf(redfishUUID,"%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x")
        raw_smbios_uuid[3], raw_smbios_uuid[2], raw_smbios_uuid[1],raw_smbios_uuid[0],
        raw_smbios_uuid[5],raw_smbios_uuid[4],
        raw_smbios_uuid[7],raw_smbios_uuid[6],
        raw_smbios_uuid[8],raw_smbios_uuid[9],
        raw_smbios_uuid[10],raw_smbios_uuid[11],raw_smbios_uuid[12],raw_smbios_uuid[13],raw_smbios_uuid[14],raw_smbios_uuid[15]
        );
    
This will create the same canonical formated string as WMI and dmidecode for little-endian X86 systems.
In the case that the computer architecture is not little-endian, then the conversion and canonical representation should be the same as the OS APIs such as WMI and dmidecode.

Note that as specified in RFC4122, the fields in the string should be zero-filled hex values as shown in the conversion code above so that the overall string length and format is of the form xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx.

Regarding the case of the hex values:  RFC4122 specifies that on output the hex values should be lower-case, but that clients should use case-insensitive comparison on input.  Most modern scripting languages typically also represent hex values in lower-case following the RFC.
However, dmidecode, WMI and some Redfish implementations currently use upper-case for UUID on output.

Therefore, for new Redfish implementations, the recommendation is to follow RFC4122 and output using lower-case hex values when converting from the SMBIOS raw binary data as shown in the code example above.
However, Redfish implementations and OS APIs MAY also output in uppercase and clients MUST therefore compare UUIDs using a case-insensitive compares (as recommended by RFC4122).



# Drive 1.1.0

Drive contains properties describing a single physical disk drive for any system, along with links to associated Volumes.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Drive.SecureErase** {} | object<br><br>*read-write* | This action is used to securely erase the contents of the drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this drive. |
| **BlockSizeBytes** | number, null<br>(By)<br><br>*read-only* | The size of the smallest addressible unit (Block) of this drive in bytes |
| **CapableSpeedGbs** | number, null<br>(Gbit/s)<br><br>*read-only* | The speed which this drive can communicate to a storage controller in ideal conditions in Gigabits per second |
| **CapacityBytes** | number, null<br>(By)<br><br>*read-only* | The size in bytes of this Drive |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EncryptionAbility** | string, null<br><br>*read-write* | The encryption abilities of this drive *See Property Details, below, for more information about this property.* |
| **EncryptionStatus** | string, null<br><br>*read-write* | The status of the encrytion of this drive *See Property Details, below, for more information about this property.* |
| **FailurePredicted** | boolean, null<br><br>*read-only* | Is this drive currently predicting a failure in the near future |
| **HotspareType** | string, null<br><br>*read-write* | The type of hotspare this drive is currently serving as *See Property Details, below, for more information about this property.* |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Identifiers** [ { | array<br><br>*read-only* | The Durable names for the drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableName** | string, null<br><br>*read-only* | This indicates the world wide, persistent name of the resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableNameFormat** | string, null<br><br>*read-write* | This represents the format of the DurableName property. *See Property Details, below, for more information about this property.* |
| } ] |   |   |
| **IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the drive. *See Property Details, below, for more information about this property.* |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Endpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that connect to this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Volumes** [ {} ] | array<br><br>*read-only* | An array of references to the volumes contained in this drive. This will reference Volumes that are either wholly or only partly contained by this drive. |
| } |   |   |
| **Location** [ { | array<br><br>*read-only* | The Location of the drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Info** | string, null<br><br>*read-only* | This indicates the location of the resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**InfoFormat** | string, null<br><br>*read-only* | This represents the format of the Info property. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } ] |   |   |
| **Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this drive. |
| **MediaType** | string, null<br><br>*read-write* | The type of media contained in this drive *See Property Details, below, for more information about this property.* |
| **Model** | string, null<br><br>*read-only* | This is the model number for the drive. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **NegotiatedSpeedGbs** | number, null<br>(Gbit/s)<br><br>*read-only* | The speed which this drive is currently communicating to the storage controller in Gigabits per second |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Operations** *(v1.1+)* [ {} ] | array<br><br>*read-only* | The operations currently running on the Drive |
| **PartNumber** | string, null<br><br>*read-only* | The part number for this drive. |
| **PredictedMediaLifeLeftPercent** | number, null<br><br>*read-only* | The percentage of reads and writes that are predicted to still be available for the media |
| **Protocol** | null<br><br>*read-write* | The protocol this drive is using to communicate to the storage controller |
| **Revision** | string, null<br><br>*read-only* | The revision of this Drive |
| **RotationSpeedRPM** | number, null<br>(RPM)<br><br>*read-only* | The rotation speed of this Drive in Revolutions per Minute (RPM) |
| **SKU** | string, null<br><br>*read-only* | This is the SKU for this drive. |
| **SerialNumber** | string, null<br><br>*read-only* | The serial number for this drive. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **StatusIndicator** | string, null<br><br>*read-write* | The state of the status indicator, used to communicate status information about this drive. *See Property Details, below, for more information about this property.* |

## Property Details

### DurableNameFormat:

| string | Description |
| --- | --- |
| EUI | IEEE-defined 64-bit Extended Unique Identifier |
| FC_WWN | Fibre Channel World Wide Name |
| NAA | Name Address Authority Format |
| UUID | Universally Unique Identifier |
| iQN | iSCSI Qualified Name |

### EncryptionAbility:

| string | Description |
| --- | --- |
| None | The drive is not capable of self encryption |
| Other | The drive is capable of self encryption through some other means |
| SelfEncryptingDrive | The drive is capable of self encryption per the Trusted Computing Group's Self Encrypting Drive Standard |

### EncryptionStatus:

| string | Description |
| --- | --- |
| Foreign | The drive is currently encrypted, the data is not accessible to the user, and the system requires user intervention to expose the data |
| Locked | The drive is currently encrypted and the data is not accessible to the user, however the system has the ability to unlock the drive automatically |
| Unecrypted | The drive is not currently encrypted. Deprecated: Use Unencrypted |
| Unencrypted | The drive is not currently encrypted |
| Unlocked | The drive is currently encrypted but the data is accessible to the user unencrypted |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HotspareType:

| string | Description |
| --- | --- |
| Chassis | The drive is currently serving as a hotspare for all other drives in the chassis |
| Dedicated | The drive is currently serving as a hotspare for a user defined set of drives |
| Global | The drive is currently serving as a hotspare for all other drives in the storage system |
| None | The drive is not currently a hotspare |

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |

### MediaType:

| string | Description |
| --- | --- |
| HDD | The drive media type is traditional magnetic platters |
| SMR | The drive media type is shingled magnetic recording |
| SSD | The drive media type is solid state or flash memory |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |

### StatusIndicator:

| string | Description |
| --- | --- |
| Fail | The drive has failed. |
| Hotspare | The drive is marked to be automatically rebuilt and used as a replacement for a failed drive. |
| InACriticalArray | The array that this drive is a part of is degraded. |
| InAFailedArray | The array that this drive is a part of is failed. |
| OK | The drive is OK. |
| PredictiveFailureAnalysis | The drive is still working but predicted to fail soon. |
| Rebuild | The drive is being rebuilt. |


# Endpoint 1.0.0

This is the schema definition for the Endpoint resource. It represents the properties of an entity that sends or receives protocol defined messages over a transport.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object, null<br><br>*read-write* |  |
| } |   |   |
| **ConnectedEntities** [ { | array<br><br>*read-only* | All the entities connected to this endpoint. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EntityLink** {} | object, null<br><br>*read-write* | A link to the associated entity. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EntityPciId** {} | object, null<br><br>*read-write* | The PCI ID of the connected entity. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EntityRole** | string, null<br><br>*read-write* | The role of the connected entity. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EntityType** | string, null<br><br>*read-write* | The type of the connected entity. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Identifiers** [ {} ] | array<br><br>*read-only* | Identifiers for the remote entity. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object, null<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PciClassCode** | string, null<br><br>*read-write* | The Class Code and Subclass code of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PciFunctionNumber** | number, null<br><br>*read-only* | The PCI ID of the connected entity. |
| } ] |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EndpointProtocol** | null<br><br>*read-write* | The protocol supported by this endpoint. |
| **HostReservationMemoryBytes** | number, null<br>(By)<br><br>*read-only* | The amount of memory in Bytes that the Host should allocate to connect to this endpoint. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Identifiers** [ { | array<br><br>*read-only* | Identifiers for this endpoint |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableName** | string, null<br><br>*read-only* | This indicates the world wide, persistent name of the resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableNameFormat** | string, null<br><br>*read-write* | This represents the format of the DurableName property. *See Property Details, below, for more information about this property.* |
| } ] |   |   |
| **Links** { | object<br><br>*read-only* | The links object contains the links to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MutuallyExclusiveEndpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that may not be used in zones if this endpoint is used in a zone. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Ports** [ {} ] | array<br><br>*read-only* | An array of references to the the physical ports associated with this endpoint. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PciId** { | object, null<br><br>*read-write* | The PCI ID of the endpoint. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeviceId** | string, null<br><br>*read-write* | The Device ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SubsystemId** | string, null<br><br>*read-write* | The Subsystem ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SubsystemVendorId** | string, null<br><br>*read-write* | The Subsystem Vendor ID of this PCIe function. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**VendorId** | string, null<br><br>*read-write* | The Vendor ID of this PCIe function. |
| } |   |   |
| **Redundancy** [ { | array<br><br>*read-only* | Redundancy information for the lower level endpoints supporting this endpoint |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### DurableNameFormat:

| string | Description |
| --- | --- |
| EUI | IEEE-defined 64-bit Extended Unique Identifier |
| FC_WWN | Fibre Channel World Wide Name |
| NAA | Name Address Authority Format |
| UUID | Universally Unique Identifier |
| iQN | iSCSI Qualified Name |

### EntityRole:

| string | Description |
| --- | --- |
| Both | The entity is acting as both an initiator and a target |
| Initiator | The entity is acting as an initiator |
| Target | The entity is acting as a target |

### EntityType:

| string | Description |
| --- | --- |
| Bridge | The entity is a PCI(e) bridge. |
| DisplayController | The entity is a display controller. |
| Drive | The entity is a disk drive. The EntityLink property (if present) should be a Drive.Drive entity |
| NetworkController | The entity is a network controller. The EntityLink property (if present) should be an EthernetInterface.EthernetInterface entity |
| Processor | The entity is a processor device. |
| RootComplex | The entity is a PCI(e) root complex. The EntityLink property (if present) should be a ComputerSystem.ComputerSystem entity |
| StorageExpander | The entity is a storage expander. The EntityLink property (if present) should be a Chassis.Chassis entity |
| StorageInitiator | The entity is a storage initator. The EntityLink property (if present) should be a Storage.StorageController entity |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# EthernetInterface 1.1.0

This schema defines a simple ethernet NIC resource.

|     |     |     |
| --- | --- | --- |
| **AutoNeg** | boolean, null<br><br>*read-write* | This indicates if the speed and duplex are automatically negotiated and configured on this interface. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **FQDN** | string, null<br><br>*read-write* | This is the complete, fully qualified domain name obtained by DNS for this interface. |
| **FullDuplex** | boolean, null<br><br>*read-write* | This indicates if the interface is in Full Duplex mode or not. |
| **HostName** | string, null<br><br>*read-write* | The DNS Host Name, without any domain information |
| **IPv4Addresses** [ { | array<br><br>*read-only* | The IPv4 addresses assigned to this interface |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Address** | string, null<br><br>*read-write* | This is the IPv4 Address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AddressOrigin** | string, null<br><br>*read-write* | This indicates how the address was determined. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Gateway** | string, null<br><br>*read-write* | This is the IPv4 gateway for this address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SubnetMask** | string, null<br><br>*read-write* | This is the IPv4 Subnet mask. |
| } ] |   |   |
| **IPv6AddressPolicyTable** [ { | array<br><br>*read-write* | An array representing the RFC 6724 Address Selection Policy Table. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Label** | number, null<br><br>*read-write* | The IPv6 Label (as defined in RFC 6724 section 2.1) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Precedence** | number, null<br><br>*read-write* | The IPv6 Precedence (as defined in RFC 6724 section 2.1 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Prefix** | string, null<br><br>*read-write* | The IPv6 Address Prefix (as defined in RFC 6724 section 2.1) |
| } ] |   |   |
| **IPv6Addresses** [ { | array<br><br>*read-only* | This array of objects enumerates all of the currently assigned IPv6 addresses on this interface. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Address** | string, null<br><br>*read-write* | This is the IPv6 Address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AddressOrigin** | string, null<br><br>*read-write* | This indicates how the address was determined. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AddressState** | string, null<br><br>*read-write* | The current state of this address as defined in RFC 4862. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PrefixLength** | number, null<br><br>*read-write* | This is the IPv6 Address Prefix Length. |
| } ] |   |   |
| **IPv6DefaultGateway** | string, null<br><br>*read-only* | This is the IPv6 default gateway address that is currently in use on this interface. |
| **IPv6StaticAddresses** [ { | array<br><br>*read-only* | This array of objects represents all of the IPv6 static addresses to be assigned on this interface. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Address** | string, null<br><br>*read-write* | A valid IPv6 address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PrefixLength** | number, null<br><br>*read-write* | The Prefix Length of this IPv6 address. |
| } ] |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **InterfaceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this interface is enabled. |
| **LinkStatus** *(v1.1+)* | string, null<br><br>*read-write* | The link status of this interface (port) *See Property Details, below, for more information about this property.* |
| **Links** *(v1.1+)* { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Endpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that connect to this ethernet interface. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **MACAddress** | string, null<br><br>*read-write* | This is the currently configured MAC address of the (logical port) interface. |
| **MTUSize** | number, null<br><br>*read-write* | This is the currently configured Maximum Transmission Unit (MTU) in bytes on this interface. |
| **MaxIPv6StaticAddresses** | number, null<br><br>*read-only* | This indicates the maximum number of Static IPv6 addresses that can be configured on this interface. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **NameServers** [ {} ] | array<br><br>*read-only* | This represents DNS name servers that are currently in use on this interface. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PermanentMACAddress** | string, null<br><br>*read-write* | This is the permanent MAC address assigned to this interface (port) |
| **SpeedMbps** | number, null<br>(Mbit/s)<br><br>*read-write* | This is the current speed in Mbps of this interface. |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **UefiDevicePath** | string, null<br><br>*read-only* | The UEFI device path for this interface |
| **VLAN** | null<br><br>*read-write* | If this Network Interface supports more than one VLAN, this property will not be present and the client should look for VLANs collection in the link section of this resource. |
| **VLANs** { | object<br><br>*read-write* | This is a reference to a collection of VLANs and is only used if the interface supports more than one VLANs. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### AddressOrigin:

| string | Description |
| --- | --- |
| DHCPv6 | Address is provided by a DHCPv6 service |
| LinkLocal | Address is valid only for this network segment (link) |
| SLAAC | Address is provided by a Stateless Address AutoConfiguration (SLAAC) service |
| Static | A static address as configured by the user |

### AddressState:

| string | Description |
| --- | --- |
| Deprecated | This address is currently within it's valid lifetime, but is now outside of it's preferred lifetime as defined in RFC 4862. |
| Failed | This address has failed Duplicate Address Detection testing as defined in RFC 4862 section 5.4 and is not currently in use. |
| Preferred | This address is currently within both it's valid and preferred lifetimes as defined in RFC 4862. |
| Tentative | This address is currently undergoing Duplicate Address Detection testing as defined in RFC 4862 section 5.4. |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### LinkStatus:

| string | Description |
| --- | --- |
| LinkDown | There is no link on this interface, but the interface is connected. |
| LinkUp | The link is available for communication on this interface. |
| NoLink | There is no link or connection detected on this interface. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Event 1.1.1

The Event schema describes the JSON payload received by an Event Destination (which has subscribed to event notification) when events occurs.  This resource contains data about event(s), including descriptions, severity and MessageId reference to a Message Registry that can be accessed for further information. 

|     |     |     |
| --- | --- | --- |
| **Context** *(v1.1+)* | string<br><br>*read-only* | A context can be supplied at subscription time.  This property is the context value supplied by the subscriber. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Events** [ { | array<br><br>*read-write* | Each event in this array has a set of properties that describe the event.  Since this is an array, more than one event can be sent simultaneously. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Context** | string<br><br>*read-only* | A context can be supplied at subscription time.  This property is the context value supplied by the subscriber. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EventId** | string<br><br>*read-only* | This is a unique instance identifier of an event. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EventTimestamp** | string<br><br>*read-only* | This is time the event occurred. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EventType** | string<br><br>*read-write* | This indicates the type of event sent, according to the definitions in the EventService. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Message** | string<br><br>*read-only* | This is the human readable message, if provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MessageArgs** [ {} ] | array<br><br>*read-only* | This array of message arguments are substituted for the arguments in the message when looked up in the message registry. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MessageId** | string<br><br>*read-only* | This is the key for this message which can be used to look up the message in a message registry. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**OriginOfCondition** {} | object<br><br>*read-write* | This indicates the resource that originated the condition that caused the event to be generated. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Severity** | string<br><br>*read-only* | This is the severity of the event. |
| } ] |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |

## Property Details

### EventType:

| string | Description |
| --- | --- |
| Alert | A condition exists which requires attention |
| ResourceAdded | A resource has been added |
| ResourceRemoved | A resource has been removed |
| ResourceUpdated | The value of this resource has been updated |
| StatusChange | The status of this resource has changed |


# EventDestination 1.1.0

An Event Destination desribes the target of an event subscription, including the types of events subscribed and context to provide to the target in the Event payload.

|     |     |     |
| --- | --- | --- |
| **Context** | string<br><br>*read-write* | A client-supplied string that is stored with the event destination subscription. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Destination** | string<br><br>*read-only* | The URI of the destination Event Service. |
| **EventTypes** [ {} ] | array<br><br>*read-only* | This property shall contain the types of events that shall be sent to the desination. |
| **HttpHeaders** [ {} ] | array<br><br>*read-write* | This is for setting HTTP headers, such as authorization information.  This object will be null on a GET. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **MessageIds** *(v1.1+)* [ {} ] | array<br><br>*read-only* | A list of MessageIds that the service will only send. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OriginResources** *(v1.1+)* [ {} ] | array<br><br>*read-only* | A list of resources for which the service will only send related events. |
| **Protocol** | string<br><br>*read-write* | The protocol type of the event connection. *See Property Details, below, for more information about this property.* |

## Property Details

### Protocol:

| string |
| --- |
| Redfish | 


# EventService 1.0.2

The Event Service resource contains properties for managing event subcriptions and generates the events sent to subscribers.  The resource has links to the actual collection of subscriptions (called Event Destinations).

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#EventService.SubmitTestEvent** {} | object<br><br>*read-write* | This action is used to generate a test event. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **DeliveryRetryAttempts** | number<br><br>*read-only* | This is the number of attempts an event posting is retried before the subscription is terminated. |
| **DeliveryRetryIntervalSeconds** | number<br>(s)<br><br>*read-only* | This represents the number of seconds between retry attempts for sending any given Event |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EventTypesForSubscription** [ {} ] | array<br><br>*read-only* | This is the types of Events that can be subscribed to. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Subscriptions** { | object<br><br>*read-write* | This is a reference to a collection of Event Destination resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Fabric 1.0.0

Fabric contains properties describing a simple fabric consisting of one or more switches, zero or more endpoints, and zero or more zones.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Endpoints** { | object<br><br>*read-write* | A collection of references to the endpoints contained in this fabric. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **FabricType** | null<br><br>*read-write* | The protocol being sent over this fabric. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **MaxZones** | number, null<br><br>*read-write* | The value of this property shall contain the maximum number of zones the switch can currently configure. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Switches** { | object<br><br>*read-write* | A collection of references to the switches contained in this fabric. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Zones** { | object<br><br>*read-write* | A collection of references to the zones contained in this fabric. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# JsonSchemaFile 1.0.2

This is the schema definition for the Schema File locator resource.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Languages** [ {} ] | array<br><br>*read-only* | Language codes for the schemas available. |
| **Location** [ { | array<br><br>*read-only* | Location information for this schema file. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ArchiveFile** | string<br><br>*read-only* | If the schema is hosted on the service in an archive file, this is the name of the file within the archive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ArchiveUri** | string<br><br>*read-only* | If the schema is hosted on the service in an archive file, this is the link to the archive file. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Language** | string<br><br>*read-only* | The language code for the file the schema is in. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PublicationUri** | string<br><br>*read-only* | Link to publicly available (canonical) URI for schema. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Uri** | string<br><br>*read-only* | Link to locally available URI for schema. |
| } ] |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Schema** | string<br><br>*read-only* | The @odata.type name this schema describes. |

# LogEntry 1.1.0

This resource defines the record format for a log.  It is designed to be used for SEL logs (from IPMI) as well as Event Logs and OEM-specific log formats.  The EntryType field indicates the type of log and the resource includes several additional properties dependent on the EntryType.

|     |     |     |
| --- | --- | --- |
| **Created** | string<br><br>*read-only* | The time the log entry was created. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EntryCode** | string, null<br><br>*read-write* | If the EntryType is SEL, this will have the entry code for the log entry. *See Property Details, below, for more information about this property.* |
| **EntryType** | string<br><br>*read-write* | his is the type of log entry. *See Property Details, below, for more information about this property.* |
| **EventId** *(v1.1+)* | string<br><br>*read-only* | This is a unique instance identifier of an event. |
| **EventTimestamp** *(v1.1+)* | string<br><br>*read-only* | This is time the event occurred. |
| **EventType** *(v1.1+)* | <br><br>*read-only* | This indicates the type of an event recorded in this log. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**OriginOfCondition** {} | object<br><br>*read-write* | This is the URI of the resource that caused the log entry |
| } |   |   |
| **Message** | string, null<br><br>*read-only* | This property decodes from EntryType:  If it is Event then it is a message string.  Otherwise, it is SEL or Oem specific.  In most cases, this will be the actual Log Entry. |
| **MessageArgs** [ {} ] | array<br><br>*read-only* | The values of this property shall be any arguments for the message. |
| **MessageId** | string<br><br>*read-only* | This property decodes from EntryType:  If it is Event then it is a message id.  Otherwise, it is SEL or Oem specific.  This value is only used for registries - for more information, see the specification. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OemRecordFormat** | string, null<br><br>*read-only* | If the entry type is Oem, this will contain more information about the record format from the Oem. |
| **SensorNumber** | number, null<br><br>*read-only* | This property decodes from EntryType:  If it is SEL, it is the sensor number; if Event then the count of events.  Otherwise, it is Oem specific. |
| **SensorType** | string, null<br><br>*read-write* | If the EntryType is SEL, this will have the sensor type that the log entry pertains to. *See Property Details, below, for more information about this property.* |
| **Severity** | string, null<br><br>*read-write* | This is the severity of the log entry. *See Property Details, below, for more information about this property.* |

## Property Details

### EntryCode:

| string |
| --- |
| Assert | 
| Deassert | 
| Lower Non-critical - going low | 
| Lower Non-critical - going high | 
| Lower Critical - going low | 
| Lower Critical - going high | 
| Lower Non-recoverable - going low | 
| Lower Non-recoverable - going high | 
| Upper Non-critical - going low | 
| Upper Non-critical - going high | 
| Upper Critical - going low | 
| Upper Critical - going high | 
| Upper Non-recoverable - going low | 
| Upper Non-recoverable - going high | 
| Transition to Idle | 
| Transition to Active | 
| Transition to Busy | 
| State Deasserted | 
| State Asserted | 
| Predictive Failure deasserted | 
| Predictive Failure asserted | 
| Limit Not Exceeded | 
| Limit Exceeded | 
| Performance Met | 
| Performance Lags | 
| Transition to OK | 
| Transition to Non-Critical from OK | 
| Transition to Critical from less severe | 
| Transition to Non-recoverable from less severe | 
| Transition to Non-Critical from more severe | 
| Transition to Critical from Non-recoverable | 
| Transition to Non-recoverable | 
| Monitor | 
| Informational | 
| Device Removed / Device Absent | 
| Device Inserted / Device Present | 
| Device Disabled | 
| Device Enabled | 
| Transition to Running | 
| Transition to In Test | 
| Transition to Power Off | 
| Transition to On Line | 
| Transition to Off Line | 
| Transition to Off Duty | 
| Transition to Degraded | 
| Transition to Power Save | 
| Install Error | 
| Fully Redundant | 
| Redundancy Lost | 
| Redundancy Degraded | 
| Non-redundant:Sufficient Resources from Redundant | 
| Non-redundant:Sufficient Resources from Insufficient Resources | 
| Non-redundant:Insufficient Resources | 
| Redundancy Degraded from Fully Redundant | 
| Redundancy Degraded from Non-redundant | 
| D0 Power State | 
| D1 Power State | 
| D2 Power State | 
| D3 Power State | 

### EntryType:

| string |
| --- |
| Event | 
| SEL | 
| Oem | 

### SensorType:

| string |
| --- |
| Platform Security Violation Attempt | 
| Temperature | 
| Voltage | 
| Current | 
| Fan | 
| Physical Chassis Security | 
| Processor | 
| Power Supply / Converter | 
| PowerUnit | 
| CoolingDevice | 
| Other Units-based Sensor | 
| Memory | 
| Drive Slot/Bay | 
| POST Memory Resize | 
| System Firmware Progress | 
| Event Logging Disabled | 
| System Event | 
| Critical Interrupt | 
| Button/Switch | 
| Module/Board | 
| Microcontroller/Coprocessor | 
| Add-in Card | 
| Chassis | 
| ChipSet | 
| Other FRU | 
| Cable/Interconnect | 
| Terminator | 
| SystemBoot/Restart | 
| Boot Error | 
| BaseOSBoot/InstallationStatus | 
| OS Stop/Shutdown | 
| Slot/Connector | 
| System ACPI PowerState | 
| Watchdog | 
| Platform Alert | 
| Entity Presence | 
| Monitor ASIC/IC | 
| LAN | 
| Management Subsystem Health | 
| Battery | 
| Session Audit | 
| Version Change | 
| FRUState | 

### Severity:

| string |
| --- |
| OK | 
| Warning | 
| Critical | 


# LogService 1.0.2

This resource represents the log service for the resource or service to which it is associated.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#LogService.ClearLog** {} | object<br><br>*read-write* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **DateTime** | string, null<br><br>*read-write* | The current DateTime (with offset) for the log service, used to set or read time. |
| **DateTimeLocalOffset** | string, null<br><br>*read-write* | The time offset from UTC that the DateTime property is set to in format: +06:00 . |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Entries** { | object<br><br>*read-write* | References to the log entry collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **MaxNumberOfRecords** | number<br><br>*read-only* | The maximum number of log entries this service can have. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OverWritePolicy** | string<br><br>*read-write* | The overwrite policy for this service that takes place when the log is full. *See Property Details, below, for more information about this property.* |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### OverWritePolicy:

| string | Description |
| --- | --- |
| NeverOverWrites | When full, new entries to the Log will be discarded |
| Unknown | The overwrite policy is not known or is undefined |
| WrapsWhenFull | When full, new entries to the Log will overwrite previous entries |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Manager 1.2.0

This is the schema definition for a Manager.  Examples of managers are BMCs, Enclosure Managers, Management Controllers and other subsystems assigned managability functions.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Manager.ForceFailover** {} | object<br><br>*read-write* | The ForceFailover action forces a failover of this manager to the manager used in the parameter |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Manager.ModifyRedundancySet** {} | object<br><br>*read-write* | The ModifyRedundancySet operation is used to add or remove members to a redundant group of manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Manager.Reset** {} | object<br><br>*read-write* | The reset action resets/reboots the manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **CommandShell** { | object<br><br>*read-write* | Information about the Command Shell service provided by this manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ConnectTypesSupported** [ {} ] | array<br><br>*read-only* | This object is used to enumerate the Command Shell connection types allowed by the implementation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxConcurrentSessions** | number<br><br>*read-only* | Indicates the maximum number of service sessions, regardless of protocol, this manager is able to support. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean<br><br>*read-write* | Indicates if the service is enabled for this manager. |
| } |   |   |
| **DateTime** | string, null<br><br>*read-write* | The current DateTime (with offset) for the manager, used to set or read time. |
| **DateTimeLocalOffset** | string, null<br><br>*read-write* | The time offset from UTC that the DateTime property is set to in format: +06:00 . |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EthernetInterfaces** { | object<br><br>*read-write* | This is a reference to a collection of NICs that this manager uses for network communication.  It is here that clients will find NIC configuration options and settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **FirmwareVersion** | string, null<br><br>*read-only* | The firmware version of this Manager |
| **GraphicalConsole** { | object<br><br>*read-write* | The value of this property shall contain the information about the Graphical Console (KVM-IP) service of this manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ConnectTypesSupported** [ {} ] | array<br><br>*read-only* | This object is used to enumerate the Graphical Console connection types allowed by the implementation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxConcurrentSessions** | number<br><br>*read-only* | Indicates the maximum number of service sessions, regardless of protocol, this manager is able to support. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean<br><br>*read-write* | Indicates if the service is enabled for this manager. |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagerForChassis** [ {} ] | array<br><br>*read-only* | This property is an array of references to the chassis that this manager has control over. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagerForServers** [ {} ] | array<br><br>*read-only* | This property is an array of references to the systems that this manager has control over. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagerInChassis** {} | object<br><br>*read-write* | This property is a reference to the chassis that this manager is located in. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **LogServices** { | object<br><br>*read-write* | This is a reference to a collection of Logs used by the manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **ManagerType** | string<br><br>*read-write* | This property represents the type of manager that this resource represents. *See Property Details, below, for more information about this property.* |
| **Model** | string, null<br><br>*read-only* | The model information of this Manager as defined by the manufacturer |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **NetworkProtocol** { | object<br><br>*read-write* | This is a reference to the network services and their settings that the manager controls.  It is here that clients will find network configuration options as well as network services. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FQDN** | string, null<br><br>*read-only* | This is the fully qualified domain name for the manager obtained by DNS including the host name and top-level domain name. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HTTP** {} | object<br><br>*read-write* | Settings for this Manager's HTTP protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HTTPS** {} | object<br><br>*read-write* | Settings for this Manager's HTTPS protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HostName** | string, null<br><br>*read-only* | The DNS Host Name of this manager, without any domain information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IPMI** {} | object<br><br>*read-write* | Settings for this Manager's IPMI-over-LAN protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**KVMIP** {} | object<br><br>*read-write* | Settings for this Manager's KVM-IP protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SNMP** {} | object<br><br>*read-write* | Settings for this Manager's SNMP support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SSDP** {} | object<br><br>*read-write* | Settings for this Manager's SSDP support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SSH** {} | object<br><br>*read-write* | Settings for this Manager's SSH (Secure Shell) protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Telnet** {} | object<br><br>*read-write* | Settings for this Manager's Telnet protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**VirtualMedia** {} | object<br><br>*read-write* | Settings for this Manager's Virtual Media support |
| } |   |   |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PowerState** *(v1.2+)* | string, null<br><br>*read-write* | This is the current power state of the Manager. *See Property Details, below, for more information about this property.* |
| **Redundancy** [ { | array<br><br>*read-only* | Redundancy information for the managers of this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **SerialConsole** { | object<br><br>*read-write* | Information about the Serial Console service provided by this manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ConnectTypesSupported** [ {} ] | array<br><br>*read-only* | This object is used to enumerate the Serial Console connection types allowed by the implementation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxConcurrentSessions** | number<br><br>*read-only* | Indicates the maximum number of service sessions, regardless of protocol, this manager is able to support. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean<br><br>*read-write* | Indicates if the service is enabled for this manager. |
| } |   |   |
| **SerialInterfaces** { | object<br><br>*read-write* | This is a reference to a collection of serial interfaces that this manager uses for serial and console communication.  It is here that clients will find serial configuration options and settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **ServiceEntryPointUUID** | string<br><br>*read-write* | The UUID of the Redfish Service provided by this manager |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **UUID** | string, null<br><br>*read-write* | The Universal Unique Identifier (UUID) for this Manager |
| **VirtualMedia** { | object<br><br>*read-write* | This is a reference to the Virtual Media services for this particular manager. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### ManagerType:

| string | Description |
| --- | --- |
| AuxiliaryController | A controller which provides management functions for a particular subsystem or group of devices |
| BMC | A controller which provides management functions for a single computer system |
| EnclosureManager | A controller which provides management functions for a chassis or group of devices or systems |
| ManagementController | A controller used primarily to monitor or manage the operation of a device or system |
| RackManager | A controller which provides management functions for a whole or part of a rack |

### PowerState:

| string | Description |
| --- | --- |
| Off | The state is powered Off. |
| On | The state is powered On. |
| PoweringOff | A temporary state between On and Off. |
| PoweringOn | A temporary state between Off and On. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# ManagerAccount 1.0.2

The user accounts, owned by a Manager, are defined in this resource.  Changes to a Manager Account may affect the current Redfish service connection if this manager is responsible for the Redfish service.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Enabled** | boolean<br><br>*read-write* | This property is used by a User Administrator to disable an account w/o having to delet the user information.  When set to true, the user can login.  When set to false, the account is administratively disabled and the user cannot login. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Role** {} | object<br><br>*read-write* | A reference to the Role object defining Privileges for this account--returned when the resource is read. The ID of the role is the same as property RoleId. |
| } |   |   |
| **Locked** | boolean<br><br>*read-write* | This property indicates that the account has been auto-locked by the account service because the lockout threshold has been exceeded.  When set to true, the account is locked. A user admin can write the property to false to manually unlock, or the account service will unlock it once the lockout duration period has passed. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Password** | string, null<br><br>*read-write* | This property is used with a PATCH or PUT to write the password for the account.  This property is null on a GET. |
| **RoleId** | string<br><br>*read-write* | This property contains the Role for this account. |
| **UserName** | string<br><br>*read-write* | This property contains the user name for the account. |

# ManagerNetworkProtocol 1.0.2

This resource is used to obtain or modify the network services managed by a given manager.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **FQDN** | string, null<br><br>*read-only* | This is the fully qualified domain name for the manager obtained by DNS including the host name and top-level domain name. |
| **HTTP** { | object<br><br>*read-write* | Settings for this Manager's HTTP protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **HTTPS** { | object<br><br>*read-write* | Settings for this Manager's HTTPS protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **HostName** | string, null<br><br>*read-only* | The DNS Host Name of this manager, without any domain information |
| **IPMI** { | object<br><br>*read-write* | Settings for this Manager's IPMI-over-LAN protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **KVMIP** { | object<br><br>*read-write* | Settings for this Manager's KVM-IP protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **SNMP** { | object<br><br>*read-write* | Settings for this Manager's SNMP support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **SSDP** { | object<br><br>*read-write* | Settings for this Manager's SSDP support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**NotifyIPv6Scope** | string, null<br><br>*read-write* | Indicates the scope for the IPv6 Notify messages for SSDP. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**NotifyMulticastIntervalSeconds** | number, null<br>(s)<br><br>*read-write* | Indicates how often the Multicast is done from this service for SSDP. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**NotifyTTL** | number, null<br><br>*read-write* | Indicates the time to live hop count for SSDPs Notify messages. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **SSH** { | object<br><br>*read-write* | Settings for this Manager's SSH (Secure Shell) protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Telnet** { | object<br><br>*read-write* | Settings for this Manager's Telnet protocol support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |
| **VirtualMedia** { | object<br><br>*read-write* | Settings for this Manager's Virtual Media support |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Port** | number, null<br><br>*read-write* | Indicates the protocol port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ProtocolEnabled** | boolean, null<br><br>*read-write* | Indicates if the protocol is enabled or disabled |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### NotifyIPv6Scope:

| string | Description |
| --- | --- |
| Link | SSDP Notify messages are sent to addresses in the IPv6 Local Link scope |
| Organization | SSDP Notify messages are sent to addresses in the IPv6 Local Organization scope |
| Site | SSDP Notify messages are sent to addresses in the IPv6 Local Site scope |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Memory 1.0.0

This is the schema definition for definition of a Memory and its configuration

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Memory.DisablePassphrase** {} | object<br><br>*read-write* | Disable passphrase for given regions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Memory.SecureEraseUnit** {} | object<br><br>*read-write* | This defines the action for securely erasing given regions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Memory.SetPassphrase** {} | object<br><br>*read-write* | Set passphrase for the given regions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Memory.UnlockUnit** {} | object<br><br>*read-write* | This defines the action for unlocking given regions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AllowedSpeedsMHz** [ {} ] | array<br><br>*read-only* | Speed bins supported by this Memory |
| **BaseModuleType** | string, null<br><br>*read-write* | The base module type of Memory *See Property Details, below, for more information about this property.* |
| **BusWidthBits** | number, null<br><br>*read-only* | Bus Width in bits. |
| **CapacityMiB** | number, null<br>(MiBy)<br><br>*read-only* | Memory Capacity in MiB. |
| **DataWidthBits** | number, null<br><br>*read-only* | Data Width in bits. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **DeviceID** | string, null<br><br>*read-only* | Device ID |
| **DeviceLocator** | string, null<br><br>*read-only* | Location of the Memory in the platform |
| **ErrorCorrection** | string, null<br><br>*read-write* | Error correction scheme supported for this memory *See Property Details, below, for more information about this property.* |
| **FirmwareApiVersion** | string, null<br><br>*read-only* | Version of API supported by the firmware |
| **FirmwareRevision** | string, null<br><br>*read-only* | Revision of firmware on the Memory controller |
| **FunctionClasses** [ {} ] | array<br><br>*read-only* | Function Classes by the Memory |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **IsRankSpareEnabled** | boolean, null<br><br>*read-only* | Rank spare enabled status |
| **IsSpareDeviceEnabled** | boolean, null<br><br>*read-only* | Spare device enabled status |
| **Manufacturer** | string, null<br><br>*read-only* | The Memory manufacturer |
| **MaxTDPMilliWatts** [ {} ] | array<br><br>*read-only* | Maximum TDPs in milli Watts |
| **MemoryDeviceType** | string, null<br><br>*read-write* | Type details of the Memory *See Property Details, below, for more information about this property.* |
| **MemoryLocation** { | object<br><br>*read-write* | Memory connection information to sockets and memory controllers. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Channel** | number, null<br><br>*read-only* | Channel number in which Memory is connected |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemoryController** | number, null<br><br>*read-only* | Memory controller number in which Memory is connected |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Slot** | number, null<br><br>*read-only* | Slot number in which Memory is connected |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Socket** | number, null<br><br>*read-only* | Socket number in which Memory is connected |
| } |   |   |
| **MemoryMedia** [ {} ] | array<br><br>*read-only* | Media  of this Memory |
| **MemoryType** | string, null<br><br>*read-write* | The type of Memory *See Property Details, below, for more information about this property.* |
| **Metrics** { | object<br><br>*read-write* | A reference to the Metrics associated with this Memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlockSizeBytes** | number, null<br>(By)<br><br>*read-only* | Block size in bytes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CurrentPeriod** {} | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthData** {} | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LifeTime** {} | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OperatingMemoryModes** [ {} ] | array<br><br>*read-only* | Memory modes supported by the Memory |
| **OperatingSpeedMhz** | number, null<br><br>*read-only* | Operating speed of Memory in MHz |
| **PartNumber** | string, null<br><br>*read-only* | The product part number of this device |
| **PersistentRegionSizeLimitMiB** | number, null<br><br>*read-only* | Total size of persistent regions in MiB |
| **PowerManagementPolicy** { | object<br><br>*read-write* | Power management policy information. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AveragePowerBudgetMilliWatts** | number, null<br>(mW)<br><br>*read-only* | Average power budget in milli watts |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxTDPMilliWatts** | number, null<br>(mW)<br><br>*read-only* | Maximum TDP in milli watts |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PeakPowerBudgetMilliWatts** | number, null<br>(mW)<br><br>*read-only* | Peak power budget in milli watts |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PolicyEnabled** | boolean, null<br><br>*read-only* | Power management policy enabled status |
| } |   |   |
| **RankCount** | number, null<br><br>*read-only* | Number of ranks available in the Memory |
| **Regions** [ { | array<br><br>*read-only* | Memory regions information within the Memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemoryClassification** | string, null<br><br>*read-write* | Classification of memory occupied by the given memory region *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**OffsetMiB** | number, null<br>(MiBy)<br><br>*read-only* | Offset with in the Memory that corresponds to the starting of this memory region in MiB |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PassphraseState** | boolean, null<br><br>*read-only* | State of the passphrase for this region |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RegionId** | string, null<br><br>*read-only* | Unique region ID representing a specific region within the Memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SizeMiB** | number, null<br>(MiBy)<br><br>*read-only* | Size of this memory region in MiB |
| } ] |   |   |
| **SecurityCapabilities** { | object<br><br>*read-write* | This object contains security capabilities of the Memory. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxPassphraseCount** | number, null<br><br>*read-only* | Maximum number of passphrases supported for this Memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PassphraseCapable** | boolean, null<br><br>*read-only* | Memory passphrase set capability |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SecurityStates** [ {} ] | array<br><br>*read-only* | Security states supported by the Memory |
| } |   |   |
| **SerialNumber** | string, null<br><br>*read-only* | The product serial number of this device |
| **SpareDeviceCount** | number, null<br><br>*read-only* | Number of unused spare devices available in the Memory |
| **SubsystemDeviceID** | string, null<br><br>*read-only* | Subsystem Device ID |
| **SubsystemVendorID** | string, null<br><br>*read-only* | SubSystem Vendor ID |
| **VendorID** | string, null<br><br>*read-only* | Vendor ID |
| **VolatileRegionSizeLimitMiB** | number, null<br><br>*read-only* | Total size of volatile regions in MiB |

## Property Details

### BaseModuleType:

| string | Description |
| --- | --- |
| LRDIMM | Load Reduced |
| Mini_RDIMM | Mini_RDIMM |
| Mini_UDIMM | Mini_UDIMM |
| RDIMM | Registered DIMM |
| SO_DIMM | SO_DIMM |
| SO_DIMM_16b | SO_DIMM_16b |
| SO_DIMM_32b | SO_DIMM_32b |
| SO_RDIMM_72b | SO_RDIMM_72b |
| SO_UDIMM_72b | SO_UDIMM_72b |
| UDIMM | UDIMM |

### ErrorCorrection:

| string | Description |
| --- | --- |
| AddressParity | Address Parity errors can be corrected |
| MultiBitECC | Multi-bit Data errors can be corrected by ECC |
| NoECC | No ECC available |
| SingleBitECC | Single bit Data error can be corrected by ECC |

### MemoryClassification:

| string | Description |
| --- | --- |
| Block | Block accesible memory |
| ByteAccessiblePersistent | Byte accessible persistent memory |
| Volatile | Volatile memory |

### MemoryDeviceType:

| string | Description |
| --- | --- |
| DDR | DDR |
| DDR2 | DDR2 |
| DDR2_SDRAM | DDR2 SDRAM |
| DDR2_SDRAM_FB_DIMM | DDR2 SDRAM FB_DIMM |
| DDR2_SDRAM_FB_DIMM_PROBE | DDR2 SDRAM FB_DIMM PROBE |
| DDR3 | DDR3 |
| DDR3_SDRAM | DDR3 SDRAM |
| DDR4 | DDR4 |
| DDR4E_SDRAM | DDR4E SDRAM |
| DDR4_SDRAM | DDR4 SDRAM |
| DDR_SDRAM | DDR SDRAM |
| DDR_SGRAM | DDR SGRAM |
| EDO | EDO |
| FastPageMode | Fast Page Mode |
| LPDDR3_SDRAM | LPDDR3 SDRAM |
| LPDDR4_SDRAM | LPDDR4 SDRAM |
| PipelinedNibble | Pipelined Nibble |
| ROM | ROM |
| SDRAM | SDRAM |

### MemoryType:

| string | Description |
| --- | --- |
| DRAM | DRAM |
| NVDIMM_F | NVDIMM_F as defined by JEDEC. |
| NVDIMM_N | NVDIMM_N as defined by JEDEC. |
| NVDIMM_P | NVDIMM_P as defined by JEDEC. |


# MemoryChunks 1.0.0

This is the schema definition of a Memory Chunk and its configuration.

|     |     |     |
| --- | --- | --- |
| **AddressRangeType** | string, null<br><br>*read-write* | Memory type of this memory chunk *See Property Details, below, for more information about this property.* |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **InterleaveSets** [ { | array<br><br>*read-only* | This is the interleave sets for the memory chunk. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Memory** {} | object<br><br>*read-write* | Describes a memory device of the interleave set.  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemoryLevel** | number, null<br><br>*read-only* | Level of the interleave set for multi-level tiered memory. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**OffsetMiB** | number, null<br><br>*read-only* | Offset within the DIMM that corresponds to the start of this memory region, with units in MiB |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RegionId** | string, null<br><br>*read-only* | DIMM region identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SizeMiB** | number, null<br><br>*read-only* | Size of this memory region in MiB |
| } ] |   |   |
| **IsMirrorEnabled** | boolean, null<br><br>*read-only* | Mirror Enabled status |
| **IsSpare** | boolean, null<br><br>*read-only* | Spare enabled status |
| **MemoryChunkSizeMiB** | number, null<br><br>*read-only* | Size of the memory chunk in MiB |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |

## Property Details

### AddressRangeType:

| string | Description |
| --- | --- |
| Block | Block accesible memory |
| PMEM | Byte accessible persistent memory |
| Volatile | Volatile memory |


# MemoryDomain 1.0.0

This is the schema definition of a Memory Domain and its configuration. Memory Domains are used to indicate to the client which Memory (DIMMs) can be grouped together in Memory Chunks to form interleave sets or otherwise grouped together.

|     |     |     |
| --- | --- | --- |
| **AllowsBlockProvisioning** | boolean, null<br><br>*read-only* | Indicates if this Memory Domain supports the provisioning of blocks of memory. |
| **AllowsMemoryChunkCreation** | boolean, null<br><br>*read-only* | Indicates if this Memory Domain supports the creation of Memory Chunks. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **InterleavableMemorySets** [ { | array<br><br>*read-only* | This is the interleave sets for the memory chunk. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemorySet** [ {} ] | array<br><br>*read-only* | This is the collection of memory for a particular interleave set. |
| } ] |   |   |
| **MemoryChunks** { | object, null<br><br>*read-write* | A reference to the collection of Memory Chunks associated with this Memory Domain. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |

# MemoryMetrics 1.0.0

MemoryMetrics contains usage and health statistics for a single Memory module or device instance.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#MemoryMetrics.ClearCurrentPeriod** {} | object<br><br>*read-write* | This sets the CurrentPeriod object values to zero. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **BlockSizeBytes** | number, null<br>(By)<br><br>*read-only* | Block size in bytes |
| **CurrentPeriod** { | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlocksRead** | number, null<br><br>*read-only* | Number of blocks read since reset |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlocksWritten** | string, null<br><br>*read-only* | Number of blocks written since reset |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **HealthData** { | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AlarmTrips** {} | object<br><br>*read-write* | Alarm trip information about the memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DataLossDetected** | boolean, null<br><br>*read-only* | Data loss detection status |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LastShutdownSuccess** | boolean, null<br><br>*read-only* | Status of last shutdown |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PerformanceDegraded** | boolean, null<br><br>*read-only* | Performance degraded mode status |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RemainingSpareBlockPercentage** | number, null<br><br>*read-only* | Remaining spare blocks in percentage |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **LifeTime** { | object<br><br>*read-write* | This object describes the central memory of the system in general detail. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlocksRead** | number, null<br><br>*read-only* | Number of blocks read for the lifetime of the Memory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlocksWritten** | string, null<br><br>*read-only* | Number of blocks written for the lifetime of the Memory |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |

# MessageRegistry 1.0.2

This is the schema definition for all Message Registries.  It represents the properties for the registries themselves.  The MessageId is formed per the Redfish specification.  It consists of the RegistryPrefix concatenated with the version concatenated with the unique identifier for the message registry entry.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Language** | string<br><br>*read-only* | This is the RFC 5646 compliant language code for the registry. |
| **Messages** {} | object<br><br>*read-write* | The pattern property indicates that a free-form string is the unique identifier for the message within the registry. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OwningEntity** | string<br><br>*read-only* | This is the organization or company that publishes this registry. |
| **RegistryPrefix** | string<br><br>*read-only* | This is the single word prefix used to form a messageID structure. |
| **RegistryVersion** | string<br><br>*read-only* | This is the message registry version which is used in the middle portion of a messageID. |

# MessageRegistryFile 1.0.2

This is the schema definition for the Schema File locator resource.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Languages** [ {} ] | array<br><br>*read-only* | Language codes for the schemas available. |
| **Location** [ { | array<br><br>*read-only* | Location information for this schema file. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ArchiveFile** | string<br><br>*read-only* | If the schema is hosted on the service in an archive file, this is the name of the file within the archive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ArchiveUri** | string<br><br>*read-only* | If the schema is hosted on the service in an archive file, this is the link to the archive file. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Language** | string<br><br>*read-only* | The language code for the file the schema is in. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PublicationUri** | string<br><br>*read-only* | Link to publicly available (canonical) URI for schema. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Uri** | string<br><br>*read-only* | Link to locally available URI for schema. |
| } ] |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Registry** | string<br><br>*read-only* | The Registry Name, Major and Minor version used in MessageID construction. |

# PCIeDevice 1.0.0

This is the schema definition for the PCIeDevice resource.  It represents the properties of a PCIeDevice attached to a System.

|     |     |     |
| --- | --- | --- |
| **AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this PCIe device. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **DeviceType** | string<br><br>*read-write* | The device type for this PCIe device. *See Property Details, below, for more information about this property.* |
| **FirmwareVersion** | string, null<br><br>*read-only* | The version of firmware for this PCIe device. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | The links object contains the links to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Chassis** [ {} ] | array<br><br>*read-only* | An array of references to the chassis in which the PCIe device is contained |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PCIeFunctions** [ {} ] | array<br><br>*read-only* | An array of references to PCIeFunctions exposed by this device. |
| } |   |   |
| **Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this PCIe device. |
| **Model** | string, null<br><br>*read-only* | This is the model number for the PCIe device. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PartNumber** | string, null<br><br>*read-only* | The part number for this PCIe device. |
| **SKU** | string, null<br><br>*read-only* | This is the SKU for this PCIe device. |
| **SerialNumber** | string, null<br><br>*read-only* | The serial number for this PCIe device. |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### DeviceType:

| string | Description |
| --- | --- |
| MultiFunction | A multi-function PCIe device |
| Simulated | A PCIe device which is not currently physically present, but is being simulated by the PCIe infrastructure |
| SingleFunction | A single-function PCIe device |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# PCIeFunction 1.0.0

This is the schema definition for the PCIeFunction resource.  It represents the properties of a PCIeFunction attached to a System.

|     |     |     |
| --- | --- | --- |
| **ClassCode** | string, null<br><br>*read-write* | The Class Code of this PCIe function. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **DeviceClass** | string<br><br>*read-write* | The class for this PCIe Function. *See Property Details, below, for more information about this property.* |
| **DeviceId** | string, null<br><br>*read-write* | The Device ID of this PCIe function. |
| **FunctionId** | number, null<br><br>*read-only* | The the PCIe Function identifier. |
| **FunctionType** | string<br><br>*read-write* | The type of the PCIe Function. *See Property Details, below, for more information about this property.* |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | The links object contains the links to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Drives** [ {} ] | array<br><br>*read-only* | An array of references to the drives which the PCIe device produces |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EthernetInterfaces** [ {} ] | array<br><br>*read-only* | An array of references to the ethernet interfaces which the PCIe device produces |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PCIeDevice** {} | object, null<br><br>*read-write* | A reference to the PCIeDevice on which this function resides. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**StorageControllers** [ {} ] | array<br><br>*read-only* | An array of references to the storage controllers which the PCIe device produces |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **RevisionId** | string, null<br><br>*read-write* | The Revision ID of this PCIe function. |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **SubsystemId** | string, null<br><br>*read-write* | The Subsystem ID of this PCIe function. |
| **SubsystemVendorId** | string, null<br><br>*read-write* | The Subsystem Vendor ID of this PCIe function. |
| **VendorId** | string, null<br><br>*read-write* | The Vendor ID of this PCIe function. |

## Property Details

### DeviceClass:

| string | Description |
| --- | --- |
| Bridge | A bridge |
| CommunicationController | A communication controller |
| Coprocessor | A coprocessor |
| DisplayController | A display controller |
| DockingStation | A docking station |
| EncryptionController | An encryption controller |
| GenericSystemPeripheral | A generic system peripheral |
| InputDeviceController | An input device controller |
| IntelligentController | An intelligent controller |
| MassStorageController | A mass storage controller |
| MemoryController | A memory controller |
| MultimediaController | A multimedia controller |
| NetworkController | A network controller |
| NonEssentialInstrumentation | A non-essential instrumentation |
| Other | A other class. The function Device Class Id needs to be verified |
| ProcessingAccelerators | A processing accelerators |
| Processor | A processor |
| SatelliteCommunicationsController | A satellite communications controller |
| SerialBusController | A serial bus controller |
| SignalProcessingController | A signal processing controller |
| UnassignedClass | An unassigned class |
| UnclassifiedDevice | An unclassified device |
| WirelessController | A wireless controller |

### FunctionType:

| string | Description |
| --- | --- |
| Physical | A physical PCie function |
| Virtual | A virtual PCIe function |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Port 1.0.0

Port contains properties describing a port of a switch.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Port.Reset** {} | object<br><br>*read-write* | This action is used to reset this switch. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **CurrentSpeedGbps** | number, null<br>(Gbit/s)<br><br>*read-only* | The current speed of this port. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AssociatedEndpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that connect to the switch through this port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ConnectedSwitchPorts** [ {} ] | array<br><br>*read-only* | An array of references to the ports that connect to the switch through this port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ConnectedSwitches** [ {} ] | array<br><br>*read-only* | An array of references to the switches that connect to the switch through this port. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **MaxSpeedGbps** | number, null<br>(Gbit/s)<br><br>*read-only* | The maximum speed of this port as currently configured. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PortId** | string, null<br><br>*read-only* | This is the label of this port on the physical switch package. |
| **PortProtocol** | null<br><br>*read-write* | The protocol being sent over this port. |
| **PortType** | string, null<br><br>*read-write* | This is the type of this port. *See Property Details, below, for more information about this property.* |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Width** | number, null<br><br>*read-only* | The number of lanes, phys, or other physical transport links that this port contains. |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### PortType:

| string | Description |
| --- | --- |
| BidirectionalPort | This port connects to any type of device |
| DownstreamPort | This port connects to a target device |
| InterswitchPort | This port connects to another switch |
| ManagementPort | This port connects to a switch manager |
| UnconfiguredPort | This port has not yet been configured. |
| UpstreamPort | This port connects to a host device |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Power 1.2.0

This is the schema definition for the Power Metrics.  It represents the properties for Power Consumption and Power Limiting.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PowerControl** [ { | array<br><br>*read-write* | This is the definition for power control function (power reading/limiting). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string, null<br><br>*read-only* | Power Control Function name. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerAllocatedWatts** | number, null<br>(W)<br><br>*read-only* | The total amount of power that has been allocated (or budegeted)to  chassis resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerAvailableWatts** | number, null<br>(W)<br><br>*read-only* | The amount of power not already budgeted and therefore available for additional allocation. (powerCapacity - powerAllocated).  This indicates how much reserve power capacity is left. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerCapacityWatts** | number, null<br>(W)<br><br>*read-only* | The total amount of power available to the chassis for allocation. This may the power supply capacity, or power budget assigned to the chassis from an up-stream chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerConsumedWatts** | number, null<br>(W)<br><br>*read-only* | The actual power being consumed by the chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerLimit** {} | object<br><br>*read-write* | Power limit status and configuration information for this chassis |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerMetrics** {} | object<br><br>*read-write* | Power readings for this chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerRequestedWatts** | number, null<br>(W)<br><br>*read-only* | The potential power that the chassis resources are requesting which may be higher than the current level being consumed since requested power includes budget that the chassis resource wants for future use. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RelatedItem** [ {} ] | array<br><br>*read-write* | The ID(s) of the resources associated with this Power Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } ] |   |   |
| **PowerSupplies** [ { | array<br><br>*read-write* | Details of the power supplies associated with this system or device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FirmwareVersion** | string, null<br><br>*read-only* | The firmware version for this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the power supply *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**InputRanges** [ {} ] | array<br><br>*read-only* | This is the input ranges that the power supply can use. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LastPowerOutputWatts** | number, null<br>(W)<br><br>*read-only* | The average power output of this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LineInputVoltage** | number, null<br>(V)<br><br>*read-only* | The line input voltage at which the Power Supply is operating |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LineInputVoltageType** | string, null<br><br>*read-write* | The line voltage type supported as an input to this Power Supply *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this power supply. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | The model number for this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string, null<br><br>*read-only* | The name of the Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PartNumber** | string, null<br><br>*read-only* | The part number for this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerCapacityWatts** | number, null<br>(W)<br><br>*read-only* | The maximum capacity of this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PowerSupplyType** | string, null<br><br>*read-write* | The Power Supply type (AC or DC) *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Redundancy** [ {} ] | array<br><br>*read-only* | This structure is used to show redundancy for power supplies.  The Component ids will reference the members of the redundancy groups. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RelatedItem** [ {} ] | array<br><br>*read-write* | The ID(s) of the resources associated with this Power Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SerialNumber** | string, null<br><br>*read-only* | The serial number for this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SparePartNumber** | string, null<br><br>*read-only* | The spare part number for this Power Supply |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } ] |   |   |
| **Redundancy** [ { | array<br><br>*read-only* | Redundancy information for the power subsystem of this system or device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **Voltages** [ { | array<br><br>*read-write* | This is the definition for voltage sensors. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdCritical** | number, null<br>(V)<br><br>*read-only* | Below normal range but not yet fatal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdFatal** | number, null<br>(V)<br><br>*read-only* | Below normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdNonCritical** | number, null<br>(V)<br><br>*read-only* | Below normal range |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxReadingRange** | number, null<br>(V)<br><br>*read-only* | Maximum value for CurrentReading |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MinReadingRange** | number, null<br>(V)<br><br>*read-only* | Minimum value for CurrentReading |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string, null<br><br>*read-only* | Voltage sensor name. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PhysicalContext** | string<br><br>*read-write* | Describes the area or device to which this voltage measurement applies. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ReadingVolts** | number, null<br>(V)<br><br>*read-only* | The current value of the voltage sensor. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RelatedItem** [ {} ] | array<br><br>*read-only* | Describes the areas or devices to which this voltage measurement applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SensorNumber** | number, null<br><br>*read-only* | A numerical identifier to represent the voltage sensor |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdCritical** | number, null<br>(V)<br><br>*read-only* | Above normal range but not yet fatal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdFatal** | number, null<br>(V)<br><br>*read-only* | Above normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdNonCritical** | number, null<br>(V)<br><br>*read-only* | Above normal range |
| } ] |   |   |

## Property Details

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |

### LineInputVoltageType:

| string | Description |
| --- | --- |
| AC120V | AC 120V nominal input |
| AC240V | AC 240V nominal input |
| AC277V | AC 277V nominal input |
| ACHighLine | 277V AC input. Deprecated: Use AC277V |
| ACLowLine | 100-127V AC input. Deprecated: Use AC120V |
| ACMidLine | 200-240V AC input. Deprecated: Use AC240V |
| ACWideRange | Wide range AC input |
| ACandDCWideRange | Wide range AC or DC input |
| DC240V | DC 240V nominal input |
| DC380V | High Voltage DC input (380V) |
| DCNeg48V | -48V DC input |
| Unknown | The power supply line input voltage type cannot be determined |

### PhysicalContext:

| string | Description |
| --- | --- |
| Back | The back of the chassis |
| Backplane | A backplane within the chassis |
| CPU | A Processor (CPU) |
| ComputeBay | Within a compute bay |
| Exhaust | The exhaust point of the chassis |
| ExpansionBay | Within an expansion bay |
| Front | The front of the chassis |
| GPU | A Graphics Processor (GPU) |
| Intake | The intake point of the chassis |
| Lower | The lower portion of the chassis |
| NetworkBay | Within a networking bay |
| NetworkingDevice | A networking device |
| PowerSupply | A power supply |
| PowerSupplyBay | Within a power supply bay |
| Room | The room |
| StorageBay | Within a storage bay |
| StorageDevice | A storage device |
| SystemBoard | The system board (PCB) |
| Upper | The upper portion of the chassis |
| VoltageRegulator | A voltage regulator device |

### PowerSupplyType:

| string | Description |
| --- | --- |
| AC | Alternating Current (AC) power supply |
| ACorDC | Power Supply supports both DC or AC |
| DC | Direct Current (DC) power supply |
| Unknown | The power supply type cannot be determined |


# Processor 1.0.2

This is the schema definition for the Processor resource.  It represents the properties of a processor attached to a System.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **InstructionSet** | string, null<br><br>*read-write* | The instruction set of the processor *See Property Details, below, for more information about this property.* |
| **Manufacturer** | string, null<br><br>*read-only* | The processor manufacturer |
| **MaxSpeedMHz** | number, null<br><br>*read-only* | The maximum clock speed of the processor |
| **Model** | string, null<br><br>*read-only* | The product model number of this device |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **ProcessorArchitecture** | string, null<br><br>*read-write* | The architecture of the processor *See Property Details, below, for more information about this property.* |
| **ProcessorId** { | object<br><br>*read-write* | Identification information for this processor. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EffectiveFamily** | string, null<br><br>*read-only* | The effective Family for this processor *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EffectiveModel** | string, null<br><br>*read-only* | The effective Model for this processor *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IdentificationRegisters** | string, null<br><br>*read-only* | The contents of the Identification Registers (CPUID) for this processor *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MicrocodeInfo** | string, null<br><br>*read-only* | The Microcode Information for this processor *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Step** | string, null<br><br>*read-only* | The Step value for this processor *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**VendorId** | string, null<br><br>*read-only* | The Vendor Identification for this processor *See Property Details, below, for more information about this property.* |
| } |   |   |
| **ProcessorType** | string, null<br><br>*read-write* | The type of processor *See Property Details, below, for more information about this property.* |
| **Socket** | string, null<br><br>*read-only* | The socket or location of the processor |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **TotalCores** | number, null<br><br>*read-only* | The total number of cores contained in this processor |
| **TotalThreads** | number, null<br><br>*read-only* | The total number of execution threads supported by this processor |

## Property Details

### EffectiveFamily:



This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~ 
((cpuid.1.eax & 0x0ff00000) >> 20) + ((cpuid.1.eax & 0x00000f00) >> 8)  
~~~



### EffectiveModel:



This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
((cpuid.1.eax & 0x000f0000) >> 12) + ((cpuid.1.eax & 0x000000f0) >> 4)
~~~



### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### IdentificationRegisters:



This property shall contain the register contents resulting from the exeuction of the CPUID instruction.



### InstructionSet:

| string | Description |
| --- | --- |
| ARM-A32 | ARM 32-bit |
| ARM-A64 | ARM 64-bit |
| IA-64 | Intel IA-64 |
| MIPS32 | MIPS 32-bit |
| MIPS64 | MIPS 64-bit |
| OEM | OEM-defined |
| x86 | x86 32-bit |
| x86-64 | x86 64-bit |

### MicrocodeInfo:



This property shall contain the 64-bit value contained in MSR 0x8B.


### ProcessorArchitecture:

| string | Description |
| --- | --- |
| ARM | ARM |
| IA-64 | Intel Itanium |
| MIPS | MIPS |
| OEM | OEM-defined |
| x86 | x86 or x86-64 |

### ProcessorId:



This object's properties shall contain values dependent on the value of the ProcessorArchitecture property, as listed in the sections below:



### ProcessorType:

| string | Description |
| --- | --- |
| Accelerator | An Accelerator |
| CPU | A Central Processing Unit |
| DSP | A Digital Signal Processor |
| FPGA | A Field Programmable Gate Array |
| GPU | A Graphics Processing Unit |
| OEM | An OEM-defined Processing Unit |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |

### Step:



This property shall contain a value derived from register values resulting from the execution of the CPUID instruction.  The value shall use the following forumula:
~~~
(cpuid->eax & 0xf)
~~~



### VendorId:



This property shall contain a 12 byte, little-endian ASCII string derived from register values resulting from the execution of the CPUID instruction.  The value shall be constructed using the following algorithm:

~~~
k=0;
foreach reg (cpuid.0.ebx, cpuid.0.edx, cpuid.0.ecx){ ##NB: order must be ebx, edx, ecx
  for (i=0; i<=3; i++) { vendorID[ byte(k*4 + i) ] = reg[byte(i)]; }
  k++;
  }
~~~




# Role 1.0.2

This resource defines a user role to be used in conjunction with a Manager Account.

|     |     |     |
| --- | --- | --- |
| **AssignedPrivileges** [ {} ] | array<br><br>*read-write* | The redfish privileges that this role includes. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **IsPredefined** | boolean<br><br>*read-only* | This property is used to indicate if the Role is one of the Redfish Predefined Roles vs a Custom role. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **OemPrivileges** [ {} ] | array<br><br>*read-write* | The OEM privileges that this role includes. |

# SecureBoot 1.0.0

This resource contains UEFI Secure Boot information. It represents properties for managing the UEFI Secure Boot functionality of a system.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#SecureBoot.ResetKeys** {} | object<br><br>*read-write* | This action is used to reset the Secure Boot keys. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **SecureBootCurrentBoot** | string, null<br><br>*read-write* | Secure Boot state during the current boot cycle. *See Property Details, below, for more information about this property.* |
| **SecureBootEnable** | boolean, null<br><br>*read-write* | Enable or disable UEFI Secure Boot (takes effect on next boot). |
| **SecureBootMode** | string, null<br><br>*read-write* | Current Secure Boot Mode. *See Property Details, below, for more information about this property.* |

## Property Details

### SecureBootCurrentBoot:

| string | Description |
| --- | --- |
| Disabled | Secure Boot is currently disabled. |
| Enabled | Secure Boot is currently enabled. |

### SecureBootMode:

| string | Description |
| --- | --- |
| AuditMode | Secure Boot is currently in Audit Mode. |
| DeployedMode | Secure Boot is currently in Deployed Mode. |
| SetupMode | Secure Boot is currently in Setup Mode. |
| UserMode | Secure Boot is currently in User Mode. |


# SerialInterface 1.0.2

This schema defines an asynchronous serial interface resource.

|     |     |     |
| --- | --- | --- |
| **BitRate** | string<br><br>*read-write* | The receive and transmit rate of data flow, typically in bits-per-second (bps), over the serial connection. *See Property Details, below, for more information about this property.* |
| **ConnectorType** | string<br><br>*read-write* | The type of connector used for this interface. *See Property Details, below, for more information about this property.* |
| **DataBits** | string<br><br>*read-write* | The number of data bits that will follow the start bit over the serial connection. *See Property Details, below, for more information about this property.* |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **FlowControl** | string<br><br>*read-write* | The type of flow control, if any, that will be imposed on the serial connection. *See Property Details, below, for more information about this property.* |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **InterfaceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this interface is enabled. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Parity** | string<br><br>*read-write* | The type of parity used by the sender and receiver in order to detect errors over the serial connection. *See Property Details, below, for more information about this property.* |
| **PinOut** | string, null<br><br>*read-write* | The physical pin configuration needed for a serial connector. *See Property Details, below, for more information about this property.* |
| **SignalType** | string<br><br>*read-write* | The type of signal used for the communication connection - RS232 or RS485. *See Property Details, below, for more information about this property.* |
| **StopBits** | string<br><br>*read-write* | The period of time before the next start bit is transmitted. *See Property Details, below, for more information about this property.* |

## Property Details

### BitRate:

| string |
| --- |
| 1200 | 
| 2400 | 
| 4800 | 
| 9600 | 
| 19200 | 
| 38400 | 
| 57600 | 
| 115200 | 
| 230400 | 

### ConnectorType:

| string |
| --- |
| RJ45 | 
| RJ11 | 
| DB9 Female | 
| DB9 Male | 
| DB25 Female | 
| DB25 Male | 
| USB | 
| mUSB | 
| uUSB | 

### DataBits:

| string |
| --- |
| 5 | 
| 6 | 
| 7 | 
| 8 | 

### FlowControl:

| string | Description |
| --- | --- |
| Hardware | Out of band flow control imposed |
| None | No flow control imposed |
| Software | XON/XOFF in-band flow control imposed |

### Parity:

| string |
| --- |
| None | 
| Even | 
| Odd | 
| Mark | 
| Space | 

### PinOut:

| string |
| --- |
| Cisco | 
| Cyclades | 
| Digi | 

### SignalType:

| string |
| --- |
| Rs232 | 
| Rs485 | 

### StopBits:

| string |
| --- |
| 1 | 
| 2 | 


# ServiceRoot 1.1.0

This object represents the root Redfish service.

|     |     |     |
| --- | --- | --- |
| **AccountService** { | object<br><br>*read-write* | This is a link to the Account Service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AccountLockoutCounterResetAfter** | number<br>(s)<br><br>*read-write* | The interval of time in seconds since the last failed login attempt at which point the lockout threshold counter for the account is reset to zero. Must be less than or equal to AccountLockoutDuration |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AccountLockoutDuration** | number, null<br>(s)<br><br>*read-write* | The time in seconds an account is locked after the account lockout threshold is met. Must be >= AccountLockoutResetAfter. If set to 0, no lockout will occur. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AccountLockoutThreshold** | number, null<br><br>*read-write* | The number of failed login attempts before a user account is locked for a specified duration. (0=never locked) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Accounts** {} | object<br><br>*read-write* | Link to a collection of Manager Accounts |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AuthFailureLoggingThreshold** | number<br><br>*read-write* | This is the number of authorization failures that need to occur before the failure attempt is logged to the manager log. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxPasswordLength** | number<br><br>*read-only* | This is the maximum password length for this service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MinPasswordLength** | number<br><br>*read-only* | This is the minimum password length for this service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Roles** {} | object<br><br>*read-write* | Link to a collection of Roles |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } |   |   |
| **Chassis** { | object<br><br>*read-write* | This is a link to a collection of Chassis. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EventService** { | object<br><br>*read-write* | This is a link to the EventService. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeliveryRetryAttempts** | number<br><br>*read-only* | This is the number of attempts an event posting is retried before the subscription is terminated. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DeliveryRetryIntervalSeconds** | number<br>(s)<br><br>*read-only* | This represents the number of seconds between retry attempts for sending any given Event |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EventTypesForSubscription** [ {} ] | array<br><br>*read-only* | This is the types of Events that can be subscribed to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Subscriptions** {} | object<br><br>*read-write* | This is a reference to a collection of Event Destination resources. |
| } |   |   |
| **Fabrics** *(v1.1+)* { | object<br><br>*read-write* | A link to a collection of all fabric entities. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **JsonSchemas** { | object<br><br>*read-write* | This is a link to a collection of Json-Schema files. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Sessions** {} | object<br><br>*read-write* | Link to a collection of Sessions |
| } |   |   |
| **Managers** { | object<br><br>*read-write* | This is a link to a collection of Managers. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **RedfishVersion** | string<br><br>*read-only* | The version of the Redfish service |
| **Registries** { | object<br><br>*read-write* | This is a link to a collection of Registries. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **SessionService** { | object<br><br>*read-write* | This is a link to the Sessions Service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SessionTimeout** | number<br>(s)<br><br>*read-write* | This is the number of seconds of inactivity that a session may have before the session service closes the session due to inactivity. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Sessions** {} | object<br><br>*read-write* | Link to a collection of Sessions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } |   |   |
| **StorageServices** *(v1.1+)* | <br><br>*read-only* | A link to a collection of all storage service entities. |
| **StorageSystems** *(v1.1+)* | <br><br>*read-only* | This is a link to a collection of storage systems. |
| **Systems** { | object<br><br>*read-write* | This is a link to a collection of Systems. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Tasks** { | object<br><br>*read-write* | This is a link to the Task Service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CompletedTaskOverWritePolicy** | string<br><br>*read-write* | Overwrite policy of completed tasks *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DateTime** | string, null<br><br>*read-only* | The current DateTime (with offset) setting that the task service is using. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LifeCycleEventOnTaskStateChange** | boolean<br><br>*read-only* | Send an Event upon Task State Change. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Tasks** {} | object<br><br>*read-write* | References to the Tasks collection. |
| } |   |   |
| **UUID** | string, null<br><br>*read-write* | Unique identifier for a service instance. When SSDP is used, this value should be an exact match of the UUID value returned in a 200OK from an SSDP M-SEARCH request during discovery.  |
| **UpdateService** *(v1.1+)* { | object<br><br>*read-write* | This is a link to the UpdateService. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FirmwareInventory** {} | object, null<br><br>*read-write* | An inventory of firmware. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SoftwareInventory** {} | object, null<br><br>*read-write* | An inventory of software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object, null<br><br>*read-only* |  |
| } |   |   |

## Property Details

### CompletedTaskOverWritePolicy:

| string | Description |
| --- | --- |
| Manual | Completed tasks are not automatically overwritten |
| Oldest | Oldest completed tasks are overwritten |


# Session 1.0.2

The Session resource describes a single connection (session) between a client and a Redfish service instance.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Password** | string, null<br><br>*read-write* | This property is used in a POST to specify a password when creating a new session.  This property is null on a GET. |
| **UserName** | string, null<br><br>*read-only* | The UserName for the account for this session. |

# SessionService 1.1.0

This is the schema definition for the Session Service.  It represents the properties for the service itself and has links to the actual list of sessions.

|     |     |     |
| --- | --- | --- |
| **Actions** *(v1.1+)* { | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object, null<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **SessionTimeout** | number<br>(s)<br><br>*read-write* | This is the number of seconds of inactivity that a session may have before the session service closes the session due to inactivity. |
| **Sessions** { | object<br><br>*read-write* | Link to a collection of Sessions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# SimpleStorage 1.1.0

This is the schema definition for the Simple Storage resource.  It represents the properties of a storage controller and its directly-attached devices.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Devices** [ { | array<br><br>*read-only* | The storage devices associated with this resource |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CapacityBytes** | number, null<br>(By)<br><br>*read-only* | The size of the storage device. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Manufacturer** | string, null<br><br>*read-only* | The name of the manufacturer of this device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | The product model number of this device |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| } ] |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **UefiDevicePath** | string, null<br><br>*read-only* | The UEFI device path used to access this storage controller. |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# SoftwareInventory 1.0.0

This schema defines an inventory of software components.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Updateable** | boolean, null<br><br>*read-only* | Indicates whether this firmware can be updated by the update service. |
| **Version** | string, null<br><br>*read-only* | A string representing the version of this firmware. |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Storage 1.0.1

This schema defines a storage subsystem and its respective properties.  A storage subsystem represents a set of storage controllers (physical or virtual) and the resources such as volumes that can be accessed from that subsystem.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Storage.SetEncryptionKey** {} | object<br><br>*read-write* | This action is used to set the encryption key for the storage subsystem. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Drives** [ { | array<br><br>*read-only* | The set of drives attached to the storage controllers represented by this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Actions** {} | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**BlockSizeBytes** | number, null<br>(By)<br><br>*read-only* | The size of the smallest addressible unit (Block) of this drive in bytes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CapableSpeedGbs** | number, null<br>(Gbit/s)<br><br>*read-only* | The speed which this drive can communicate to a storage controller in ideal conditions in Gigabits per second |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CapacityBytes** | number, null<br>(By)<br><br>*read-only* | The size in bytes of this Drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EncryptionAbility** | string, null<br><br>*read-write* | The encryption abilities of this drive *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**EncryptionStatus** | string, null<br><br>*read-write* | The status of the encrytion of this drive *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FailurePredicted** | boolean, null<br><br>*read-only* | Is this drive currently predicting a failure in the near future |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HotspareType** | string, null<br><br>*read-write* | The type of hotspare this drive is currently serving as *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Identifiers** [ {} ] | array<br><br>*read-only* | The Durable names for the drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the drive. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Links** {} | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Location** [ {} ] | array<br><br>*read-only* | The Location of the drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MediaType** | string, null<br><br>*read-write* | The type of media contained in this drive *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | This is the model number for the drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**NegotiatedSpeedGbs** | number, null<br>(Gbit/s)<br><br>*read-only* | The speed which this drive is currently communicating to the storage controller in Gigabits per second |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Operations** [ {} ] | array<br><br>*read-only* | The operations currently running on the Drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PartNumber** | string, null<br><br>*read-only* | The part number for this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PredictedMediaLifeLeftPercent** | number, null<br><br>*read-only* | The percentage of reads and writes that are predicted to still be available for the media |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Protocol** | null<br><br>*read-write* | The protocol this drive is using to communicate to the storage controller |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Revision** | string, null<br><br>*read-only* | The revision of this Drive |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RotationSpeedRPM** | number, null<br>(RPM)<br><br>*read-only* | The rotation speed of this Drive in Revolutions per Minute (RPM) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SKU** | string, null<br><br>*read-only* | This is the SKU for this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SerialNumber** | string, null<br><br>*read-only* | The serial number for this drive. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**StatusIndicator** | string, null<br><br>*read-write* | The state of the status indicator, used to communicate status information about this drive. *See Property Details, below, for more information about this property.* |
| } ] |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Enclosures** [ {} ] | array<br><br>*read-only* | An array of references to the chassis to which this storage subsystem is attached |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Redundancy** [ { | array<br><br>*read-only* | Redundancy information for the storage subsystem |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **StorageControllers** [ { | array<br><br>*read-only* | The set of storage controllers represented by this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FirmwareVersion** | string, null<br><br>*read-only* | The firmware version of this storage Controller |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Identifiers** [ {} ] | array<br><br>*read-only* | The Durable names for the storage controller |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Model** | string, null<br><br>*read-only* | This is the model number for the storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PartNumber** | string, null<br><br>*read-only* | The part number for this storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SKU** | string, null<br><br>*read-only* | This is the SKU for this storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SerialNumber** | string, null<br><br>*read-only* | The serial number for this storage controller. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SpeedGbps** | number, null<br>(Gbit/s)<br><br>*read-only* | The speed of the storage controller interface. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SupportedControllerProtocols** [ {} ] | array<br><br>*read-only* | This represents the protocols by which this storage controller can be communicated to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SupportedDeviceProtocols** [ {} ] | array<br><br>*read-only* | This represents the protocols which the storage controller can use to communicate with attached devices. |
| } ] |   |   |
| **Volumes** { | object<br><br>*read-write* | The set of volumes produced by the storage controllers represented by this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### EncryptionAbility:

| string | Description |
| --- | --- |
| None | The drive is not capable of self encryption |
| Other | The drive is capable of self encryption through some other means |
| SelfEncryptingDrive | The drive is capable of self encryption per the Trusted Computing Group's Self Encrypting Drive Standard |

### EncryptionStatus:

| string | Description |
| --- | --- |
| Foreign | The drive is currently encrypted, the data is not accessible to the user, and the system requires user intervention to expose the data |
| Locked | The drive is currently encrypted and the data is not accessible to the user, however the system has the ability to unlock the drive automatically |
| Unecrypted | The drive is not currently encrypted. Deprecated: Use Unencrypted |
| Unencrypted | The drive is not currently encrypted |
| Unlocked | The drive is currently encrypted but the data is accessible to the user unencrypted |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HotspareType:

| string | Description |
| --- | --- |
| Chassis | The drive is currently serving as a hotspare for all other drives in the chassis |
| Dedicated | The drive is currently serving as a hotspare for a user defined set of drives |
| Global | The drive is currently serving as a hotspare for all other drives in the storage system |
| None | The drive is not currently a hotspare |

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |

### MediaType:

| string | Description |
| --- | --- |
| HDD | The drive media type is traditional magnetic platters |
| SMR | The drive media type is shingled magnetic recording |
| SSD | The drive media type is solid state or flash memory |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |

### StatusIndicator:

| string | Description |
| --- | --- |
| Fail | The drive has failed. |
| Hotspare | The drive is marked to be automatically rebuilt and used as a replacement for a failed drive. |
| InACriticalArray | The array that this drive is a part of is degraded. |
| InAFailedArray | The array that this drive is a part of is failed. |
| OK | The drive is OK. |
| PredictiveFailureAnalysis | The drive is still working but predicted to fail soon. |
| Rebuild | The drive is being rebuilt. |


# Switch 1.0.0

Switch contains properties describing a simple fabric switch.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Switch.Reset** {} | object<br><br>*read-write* | This action is used to reset this switch. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **AssetTag** | string, null<br><br>*read-write* | The user assigned asset tag for this switch. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **DomainID** | number, null<br><br>*read-only* | The Domain ID for this switch. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **IndicatorLED** | string, null<br><br>*read-write* | The state of the indicator LED, used to identify the switch. *See Property Details, below, for more information about this property.* |
| **IsManaged** | boolean, null<br><br>*read-write* | This indicates whether the switch is in a managed or unmanaged state. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Chassis** {} | object<br><br>*read-write* | A reference to the chassis which contains this switch. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ManagedBy** [ {} ] | array<br><br>*read-only* | An array of references to the managers that manage this switch. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **LogServices** { | object, null<br><br>*read-write* | A reference to the collection of Log Services associated with this system |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Manufacturer** | string, null<br><br>*read-only* | This is the manufacturer of this switch. |
| **Model** | string, null<br><br>*read-only* | The product model number of this switch. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **PartNumber** | string, null<br><br>*read-only* | The part number for this switch. |
| **Ports** { | object<br><br>*read-write* | A collection of references to the ports for this switch. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **PowerState** | string, null<br><br>*read-write* | This is the current power state of the switch. *See Property Details, below, for more information about this property.* |
| **Redundancy** [ { | array<br><br>*read-only* | Redundancy information for the switches |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **SKU** | string, null<br><br>*read-only* | This is the SKU for this switch. |
| **SerialNumber** | string, null<br><br>*read-only* | The serial number for this switch. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **SwitchType** | null<br><br>*read-write* | The protocol being sent over this switch. |
| **TotalSwitchWidth** | number, null<br><br>*read-only* | The total number of lanes, phys, or other physical transport links that this switch contains. |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### IndicatorLED:

| string | Description |
| --- | --- |
| Blinking | The Indicator LED is blinking. |
| Lit | The Indicator LED is lit. |
| Off | The Indicator LED is off. |

### PowerState:

| string | Description |
| --- | --- |
| Off | The state is powered Off. |
| On | The state is powered On. |
| PoweringOff | A temporary state between On and Off. |
| PoweringOn | A temporary state between Off and On. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Task 1.0.2

This resource contains information about a specific Task scheduled by or being executed by a Redfish service's Task Service.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **EndTime** | string<br><br>*read-only* | The date-time stamp that the task was last completed. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Messages** [ {} ] | array<br><br>*read-only* | This is an array of messages associated with the task. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **StartTime** | string<br><br>*read-only* | The date-time stamp that the task was last started. |
| **TaskState** | string<br><br>*read-write* | The state of the task. *See Property Details, below, for more information about this property.* |
| **TaskStatus** | string<br><br>*read-write* | This is the completion status of the task. *See Property Details, below, for more information about this property.* |

## Property Details

### TaskState:

| string | Description |
| --- | --- |
| Completed | Task has completed |
| Exception | Task has stopped due to an exception condition |
| Interrupted | Task has been interrupted |
| Killed | Task was terminated |
| New | A new task |
| Pending | Task is pending and has not started |
| Running | Task is running normally |
| Service | Task is running as a service |
| Starting | Task is starting |
| Stopping | Task is in the process of stopping |
| Suspended | Task has been suspended |

### TaskStatus:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |


# TaskService 1.0.2

This is the schema definition for the Task Service.  It represents the properties for the service itself and has links to the actual list of tasks.

|     |     |     |
| --- | --- | --- |
| **CompletedTaskOverWritePolicy** | string<br><br>*read-write* | Overwrite policy of completed tasks *See Property Details, below, for more information about this property.* |
| **DateTime** | string, null<br><br>*read-only* | The current DateTime (with offset) setting that the task service is using. |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **LifeCycleEventOnTaskStateChange** | boolean<br><br>*read-only* | Send an Event upon Task State Change. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Tasks** { | object<br><br>*read-write* | References to the Tasks collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |

## Property Details

### CompletedTaskOverWritePolicy:

| string | Description |
| --- | --- |
| Manual | Completed tasks are not automatically overwritten |
| Oldest | Oldest completed tasks are overwritten |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# Thermal 1.1.0

This is the schema definition for the Thermal properties.  It represents the properties for Temperature and Cooling.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Fans** [ { | array<br><br>*read-write* | This is the definition for fans. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**FanName** | string, null<br><br>*read-only* | Name of the fan |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdCritical** | number, null<br><br>*read-only* | Below normal range but not yet fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdFatal** | number, null<br><br>*read-only* | Below normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdNonCritical** | number, null<br><br>*read-only* | Below normal range |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxReadingRange** | number, null<br><br>*read-only* | Maximum value for Reading |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MinReadingRange** | number, null<br><br>*read-only* | Minimum value for Reading |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string, null<br><br>*read-only* | Name of the fan |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PhysicalContext** | string<br><br>*read-write* | Describes the area or device associated with this fan. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Reading** | number, null<br><br>*read-only* | Current fan speed |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ReadingUnits** | string, null<br><br>*read-write* | Units in which the reading and thresholds are measured. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Redundancy** [ {} ] | array<br><br>*read-only* | This structure is used to show redundancy for fans.  The Component ids will reference the members of the redundancy groups. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RelatedItem** [ {} ] | array<br><br>*read-write* | The ID(s) of the resources serviced with this fan |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdCritical** | number, null<br><br>*read-only* | Above normal range but not yet fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdFatal** | number, null<br><br>*read-only* | Above normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdNonCritical** | number, null<br><br>*read-only* | Above normal range |
| } ] |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Redundancy** [ { | array<br><br>*read-only* | This structure is used to show redundancy for fans.  The Component ids will reference the members of the redundancy groups. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } ] |   |   |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **Temperatures** [ { | array<br><br>*read-write* | This is the definition for temperature sensors. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdCritical** | number, null<br>(Cel)<br><br>*read-only* | Below normal range but not yet fatal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdFatal** | number, null<br>(Cel)<br><br>*read-only* | Below normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**LowerThresholdNonCritical** | number, null<br>(Cel)<br><br>*read-only* | Below normal range |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MaxReadingRangeTemp** | number, null<br>(Cel)<br><br>*read-only* | Maximum value for ReadingCelsius |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MemberId** | string<br><br>*read-write* | This is the identifier for the member within the collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**MinReadingRangeTemp** | number, null<br>(Cel)<br><br>*read-only* | Minimum value for ReadingCelsius |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string, null<br><br>*read-only* | Temperature sensor name. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PhysicalContext** | string<br><br>*read-write* | Describes the area or device to which this temperature measurement applies. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**ReadingCelsius** | number, null<br>(Cel)<br><br>*read-only* | Temperature |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**RelatedItem** [ {} ] | array<br><br>*read-only* | Describes the areas or devices to which this temperature measurement applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**SensorNumber** | number, null<br><br>*read-only* | A numerical identifier to represent the temperature sensor |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Status** {} | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdCritical** | number, null<br>(Cel)<br><br>*read-only* | Above normal range but not yet fatal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdFatal** | number, null<br>(Cel)<br><br>*read-only* | Above normal range and is fatal |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**UpperThresholdNonCritical** | number, null<br>(Cel)<br><br>*read-only* | Above normal range |
| } ] |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### PhysicalContext:

| string | Description |
| --- | --- |
| Back | The back of the chassis |
| Backplane | A backplane within the chassis |
| CPU | A Processor (CPU) |
| ComputeBay | Within a compute bay |
| Exhaust | The exhaust point of the chassis |
| ExpansionBay | Within an expansion bay |
| Front | The front of the chassis |
| GPU | A Graphics Processor (GPU) |
| Intake | The intake point of the chassis |
| Lower | The lower portion of the chassis |
| NetworkBay | Within a networking bay |
| NetworkingDevice | A networking device |
| PowerSupply | A power supply |
| PowerSupplyBay | Within a power supply bay |
| Room | The room |
| StorageBay | Within a storage bay |
| StorageDevice | A storage device |
| SystemBoard | The system board (PCB) |
| Upper | The upper portion of the chassis |
| VoltageRegulator | A voltage regulator device |

### ReadingUnits:

| string | Description |
| --- | --- |
| Percent | Indicates that the fan reading and thresholds are measured in percentage. |
| RPM | Indicates that the fan reading and thresholds are measured in rotations per minute. |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# UpdateService 1.0.0

This is the schema definition for the Update Service. It represents the properties for the service itself and has links to collections of firmware and software inventory.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The Actions object contains the available custom actions on this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#UpdateService.SimpleUpdate** {} | object<br><br>*read-write* | This action is used to update software components. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **FirmwareInventory** { | object, null<br><br>*read-write* | An inventory of firmware. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **ServiceEnabled** | boolean, null<br><br>*read-write* | This indicates whether this service is enabled. |
| **SoftwareInventory** { | object, null<br><br>*read-write* | An inventory of software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Members** [ {} ] | array<br><br>*read-only* | Contains the members of this collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Name** | string<br><br>*read-only* | The name of the resource or array element. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| } |   |   |
| **Status** { | object, null<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |


# VLanNetworkInterface 1.0.2

This resource contains information for a Virtual LAN (VLAN) network instance available on a manager, system or other device.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **VLANEnable** | boolean, null<br><br>*read-write* | This indicates if this VLAN is enabled. |
| **VLANId** | number, null<br><br>*read-write* | This indicates the VLAN identifier for this VLAN. |

# VirtualMedia 1.0.2

This resource allows monitoring and control of an instance of virtual media (e.g. a remote CD, DVD, or USB device) functionality provided by a Manager for a system or device.

|     |     |     |
| --- | --- | --- |
| **ConnectedVia** | string, null<br><br>*read-write* | Current virtual media connection methods *See Property Details, below, for more information about this property.* |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Image** | string, null<br><br>*read-only* | A URI providing the location of the selected image |
| **ImageName** | string, null<br><br>*read-only* | The current image name |
| **Inserted** | boolean, null<br><br>*read-only* | Indicates if virtual media is inserted in the virtual device. |
| **MediaTypes** [ {} ] | array<br><br>*read-only* | This is the media types supported as virtual media. |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **WriteProtected** | boolean, null<br><br>*read-only* | Indicates the media is write protected. |

## Property Details

### ConnectedVia:

| string | Description |
| --- | --- |
| Applet | Connected to a client application |
| NotConnected | No current connection |
| Oem | Connected via an OEM-defined method |
| URI | Connected to a URI location |


# Volume 1.0.1

Volume contains properties used to describe a volume, virtual disk, LUN, or other logical storage entity for any system.

|     |     |     |
| --- | --- | --- |
| **Actions** { | object<br><br>*read-only* | The available actions for this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**#Volume.Initialize** {} | object<br><br>*read-write* | This action is used to prepare the contents of the volume for use by the system. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* |  |
| } |   |   |
| **BlockSizeBytes** | number, null<br>(By)<br><br>*read-only* | The size of the smallest addressible unit (Block) of this volume in bytes |
| **CapacityBytes** | number, null<br>(By)<br><br>*read-only* | The size in bytes of this Volume |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Encrypted** | boolean, null<br><br>*read-write* | Is this Volume encrypted |
| **EncryptionTypes** [ {} ] | array<br><br>*read-write* | The types of encryption used by this Volume |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Identifiers** [ { | array<br><br>*read-only* | The Durable names for the volume |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableName** | string, null<br><br>*read-only* | This indicates the world wide, persistent name of the resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DurableNameFormat** | string, null<br><br>*read-write* | This represents the format of the DurableName property. *See Property Details, below, for more information about this property.* |
| } ] |   |   |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Drives** [ {} ] | array<br><br>*read-only* | An array of references to the drives which contain this volume. This will reference Drives that either wholly or only partly contain this volume. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Operations** [ { | array<br><br>*read-only* | The operations currently running on the Volume |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AssociatedTask** {} | object<br><br>*read-write* | A reference to the task associated with the operation if any. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**OperationName** | string, null<br><br>*read-only* | The name of the operation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**PercentageComplete** | number, null<br><br>*read-only* | The percentage of the operation that has been completed. |
| } ] |   |   |
| **OptimumIOSizeBytes** | number, null<br>(By)<br><br>*read-only* | The size in bytes of this Volume's optimum IO size. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |
| **VolumeType** | string, null<br><br>*read-write* | The type of this volume *See Property Details, below, for more information about this property.* |

## Property Details

### DurableNameFormat:

| string | Description |
| --- | --- |
| EUI | IEEE-defined 64-bit Extended Unique Identifier |
| FC_WWN | Fibre Channel World Wide Name |
| NAA | Name Address Authority Format |
| UUID | Universally Unique Identifier |
| iQN | iSCSI Qualified Name |

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |

### VolumeType:

| string | Description |
| --- | --- |
| Mirrored | The volume is a mirrored device |
| NonRedundant | The volume is a non-redundant storage device |
| RawDevice | The volume is a raw physical device without any RAID or other virtualization applied |
| SpannedMirrors | The volume is a spanned set of mirrored devices |
| SpannedStripesWithParity | The volume is a spanned set of devices which uses parity to retain redundant information |
| StripedWithParity | The volume is a device which uses parity to retain redundant information |


# Zone 1.0.0

Switch contains properties describing a simple fabric zone.

|     |     |     |
| --- | --- | --- |
| **Description** | string, null<br><br>*read-only* | Provides a description of this resource and is used for commonality  in the schema definitions. |
| **Id** | string<br><br>*read-only* | Uniquely identifies the resource within the collection of like resources. |
| **Links** { | object<br><br>*read-only* | Contains references to other resources that are related to this resource. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Endpoints** [ {} ] | array<br><br>*read-only* | An array of references to the endpoints that are contained in this zone. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**InvolvedSwitches** [ {} ] | array<br><br>*read-only* | An array of references to the switchs that are utilized in this zone. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | Oem extension object. |
| } |   |   |
| **Name** | string<br><br>*read-only* | The name of the resource or array element. |
| **Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| **Status** { | object<br><br>*read-only* |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Health** | string, null<br><br>*read-write* | This represents the health state of this resource in the absence of its dependent resources. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**HealthRollup** | string, null<br><br>*read-write* | This represents the overall health state from the view of this resource. *See Property Details, below, for more information about this property.* |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Oem** {} | object<br><br>*read-write* | This is the manufacturer/provider specific extension moniker used to divide the Oem object into sections. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**State** | string, null<br><br>*read-write* | This indicates the known state of the resource, such as if it is enabled. *See Property Details, below, for more information about this property.* |
| } |   |   |

## Property Details

### Health:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### HealthRollup:

| string | Description |
| --- | --- |
| Critical | A critical condition exists that requires immediate attention |
| OK | Normal |
| Warning | A condition exists that requires attention |

### State:

| string | Description |
| --- | --- |
| Absent | This function or resource is not present or not detected |
| Deferring | The element will not process any commands but will queue new requests. |
| Disabled | This function or resource has been disabled |
| Enabled | This function or resource has been enabled |
| InTest | This function or resource is undergoing testing |
| Quiesced | The element is enabled but only processes a restricted set of commands. |
| StandbyOffline | This function or resource is enabled, but awaiting an external action to activate it |
| StandbySpare | This function or resource is part of a redundancy set and is awaiting a failover or other external action to activate it. |
| Starting | This function or resource is starting |
| UnavailableOffline | This function or resource is present but cannot be used |
| Updating | The element is updating and may be unavailable or degraded. |



This is the text that goes at the end of the file...
