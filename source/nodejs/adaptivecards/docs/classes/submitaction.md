[Adaptive Cards Javascript SDK](../README.md) › [SubmitAction](submitaction.md)

# Class: SubmitAction

## Hierarchy

  ↳ [Action](action.md)

  ↳ **SubmitAction**

  ↳ [ExecuteAction](executeaction.md)

## Index

### Constructors

* [constructor](submitaction.md#constructor)

### Properties

* [_parent](submitaction.md#protected-optional-_parent)
* [_renderedElement](submitaction.md#protected-optional-_renderedelement)
* [associatedInputs](submitaction.md#optional-associatedinputs)
* [iconUrl](submitaction.md#optional-iconurl)
* [id](submitaction.md#optional-id)
* [maxVersion](submitaction.md#maxversion)
* [onExecute](submitaction.md#onexecute)
* [onPreProcessPropertyValue](submitaction.md#optional-onpreprocesspropertyvalue)
* [style](submitaction.md#style)
* [title](submitaction.md#optional-title)
* [JsonTypeName](submitaction.md#static-readonly-jsontypename)
* [associatedInputsProperty](submitaction.md#static-readonly-associatedinputsproperty)
* [dataProperty](submitaction.md#static-readonly-dataproperty)
* [iconUrlProperty](submitaction.md#static-readonly-iconurlproperty)
* [idProperty](submitaction.md#static-readonly-idproperty)
* [onRegisterCustomProperties](submitaction.md#static-optional-onregistercustomproperties)
* [requiresProperty](submitaction.md#static-readonly-requiresproperty)
* [styleProperty](submitaction.md#static-readonly-styleproperty)
* [titleProperty](submitaction.md#static-readonly-titleproperty)
* [typeNameProperty](submitaction.md#static-readonly-typenameproperty)

### Accessors

* [data](submitaction.md#data)
* [hostConfig](submitaction.md#hostconfig)
* [isPrimary](submitaction.md#isprimary)
* [parent](submitaction.md#parent)
* [renderedElement](submitaction.md#renderedelement)
* [requires](submitaction.md#requires)

### Methods

* [addCssClasses](submitaction.md#protected-addcssclasses)
* [execute](submitaction.md#execute)
* [getActionById](submitaction.md#getactionbyid)
* [getAllInputs](submitaction.md#getallinputs)
* [getAriaRole](submitaction.md#getariarole)
* [getCustomProperty](submitaction.md#getcustomproperty)
* [getDefaultSerializationContext](submitaction.md#protected-getdefaultserializationcontext)
* [getHref](submitaction.md#gethref)
* [getJsonTypeName](submitaction.md#getjsontypename)
* [getReferencedInputs](submitaction.md#getreferencedinputs)
* [getResourceInformation](submitaction.md#getresourceinformation)
* [getRootObject](submitaction.md#getrootobject)
* [getSchema](submitaction.md#getschema)
* [getSchemaKey](submitaction.md#protected-getschemakey)
* [getValue](submitaction.md#protected-getvalue)
* [hasAllDefaultValues](submitaction.md#hasalldefaultvalues)
* [hasDefaultValue](submitaction.md#hasdefaultvalue)
* [internalGetReferencedInputs](submitaction.md#protected-internalgetreferencedinputs)
* [internalParse](submitaction.md#protected-internalparse)
* [internalPrepareForExecution](submitaction.md#protected-internalprepareforexecution)
* [internalToJSON](submitaction.md#protected-internaltojson)
* [internalValidateInputs](submitaction.md#protected-internalvalidateinputs)
* [internalValidateProperties](submitaction.md#internalvalidateproperties)
* [parse](submitaction.md#parse)
* [populateSchema](submitaction.md#protected-populateschema)
* [preProcessPropertyValue](submitaction.md#preprocesspropertyvalue)
* [prepareForExecution](submitaction.md#prepareforexecution)
* [raiseExecuteActionEvent](submitaction.md#protected-raiseexecuteactionevent)
* [remove](submitaction.md#remove)
* [render](submitaction.md#render)
* [resetDefaultValues](submitaction.md#resetdefaultvalues)
* [setCustomProperty](submitaction.md#setcustomproperty)
* [setParent](submitaction.md#setparent)
* [setShouldFallback](submitaction.md#setshouldfallback)
* [setValue](submitaction.md#protected-setvalue)
* [shouldFallback](submitaction.md#shouldfallback)
* [shouldSerialize](submitaction.md#protected-shouldserialize)
* [toJSON](submitaction.md#tojson)
* [updateActionButtonCssStyle](submitaction.md#updateactionbuttoncssstyle)
* [validateInputs](submitaction.md#validateinputs)
* [validateProperties](submitaction.md#validateproperties)

## Constructors

###  constructor

\+ **new SubmitAction**(): *[SubmitAction](submitaction.md)*

*Inherited from [SerializableObject](serializableobject.md).[constructor](serializableobject.md#constructor)*

**Returns:** *[SubmitAction](submitaction.md)*

## Properties

### `Protected` `Optional` _parent

• **_parent**? : *[CardObject](cardobject.md)*

*Inherited from [CardObject](cardobject.md).[_parent](cardobject.md#protected-optional-_parent)*

___

### `Protected` `Optional` _renderedElement

• **_renderedElement**? : *HTMLElement*

*Inherited from [CardObject](cardobject.md).[_renderedElement](cardobject.md#protected-optional-_renderedelement)*

___

### `Optional` associatedInputs

• **associatedInputs**? : *"auto" | "none"*

___

### `Optional` iconUrl

• **iconUrl**? : *undefined | string*

*Inherited from [Action](action.md).[iconUrl](action.md#optional-iconurl)*

___

### `Optional` id

• **id**? : *undefined | string*

*Inherited from [CardObject](cardobject.md).[id](cardobject.md#optional-id)*

___

###  maxVersion

• **maxVersion**: *[Version](version.md)* = Versions.v1_3

*Inherited from [SerializableObject](serializableobject.md).[maxVersion](serializableobject.md#maxversion)*

___

###  onExecute

• **onExecute**: *function*

*Inherited from [Action](action.md).[onExecute](action.md#onexecute)*

#### Type declaration:

▸ (`sender`: [Action](action.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`sender` | [Action](action.md) |

___

### `Optional` onPreProcessPropertyValue

• **onPreProcessPropertyValue**? : *undefined | function*

*Inherited from [CardObject](cardobject.md).[onPreProcessPropertyValue](cardobject.md#optional-onpreprocesspropertyvalue)*

___

###  style

• **style**: *string* = Enums.ActionStyle.Default

*Inherited from [Action](action.md).[style](action.md#style)*

___

### `Optional` title

• **title**? : *undefined | string*

*Inherited from [Action](action.md).[title](action.md#optional-title)*

___

### `Static` `Readonly` JsonTypeName

▪ **JsonTypeName**: *"Action.Submit"* = "Action.Submit"

___

### `Static` `Readonly` associatedInputsProperty

▪ **associatedInputsProperty**: *[CustomProperty](customproperty.md)‹undefined | string›* = new CustomProperty(
        Versions.v1_3,
        "associatedInputs",
        (sender: SerializableObject, property: PropertyDefinition, source: PropertyBag, context: BaseSerializationContext) => {
            let value = source[property.name];

            if (value !== undefined && typeof value === "string") {
                return value === "none" ? "none" : "auto";
            }
            
            return undefined;
        },
        (sender: SerializableObject, property: PropertyDefinition, target: PropertyBag, value: string | undefined, context: BaseSerializationContext) => {
            context.serializeValue(target, property.name, value);
        })

___

### `Static` `Readonly` dataProperty

▪ **dataProperty**: *[PropertyDefinition](propertydefinition.md)‹›* = new PropertyDefinition(Versions.v1_0, "data")

___

### `Static` `Readonly` iconUrlProperty

▪ **iconUrlProperty**: *[StringProperty](stringproperty.md)‹›* = new StringProperty(Versions.v1_1, "iconUrl")

*Inherited from [Action](action.md).[iconUrlProperty](action.md#static-readonly-iconurlproperty)*

___

### `Static` `Readonly` idProperty

▪ **idProperty**: *[StringProperty](stringproperty.md)‹›* = new StringProperty(Versions.v1_0, "id")

*Inherited from [CardObject](cardobject.md).[idProperty](cardobject.md#static-readonly-idproperty)*

___

### `Static` `Optional` onRegisterCustomProperties

▪ **onRegisterCustomProperties**? : *undefined | function*

*Inherited from [SerializableObject](serializableobject.md).[onRegisterCustomProperties](serializableobject.md#static-optional-onregistercustomproperties)*

___

### `Static` `Readonly` requiresProperty

▪ **requiresProperty**: *[SerializableObjectProperty](serializableobjectproperty.md)‹›* = new SerializableObjectProperty(
        Versions.v1_2,
        "requires",
        HostCapabilities,
        false,
        new HostCapabilities())

*Inherited from [CardObject](cardobject.md).[requiresProperty](cardobject.md#static-readonly-requiresproperty)*

___

### `Static` `Readonly` styleProperty

▪ **styleProperty**: *[ValueSetProperty](valuesetproperty.md)‹›* = new ValueSetProperty(
        Versions.v1_2,
        "style",
        [
            { value: Enums.ActionStyle.Default },
            { value: Enums.ActionStyle.Positive },
            { value: Enums.ActionStyle.Destructive }
        ],
        Enums.ActionStyle.Default)

*Inherited from [Action](action.md).[styleProperty](action.md#static-readonly-styleproperty)*

___

### `Static` `Readonly` titleProperty

▪ **titleProperty**: *[StringProperty](stringproperty.md)‹›* = new StringProperty(Versions.v1_0, "title")

*Inherited from [Action](action.md).[titleProperty](action.md#static-readonly-titleproperty)*

___

### `Static` `Readonly` typeNameProperty

▪ **typeNameProperty**: *[StringProperty](stringproperty.md)‹›* = new StringProperty(
        Versions.v1_0,
        "type",
        undefined,
        undefined,
        undefined,
        (sender: object) => {
            return (<CardObject>sender).getJsonTypeName()
        })

*Inherited from [CardObject](cardobject.md).[typeNameProperty](cardobject.md#static-readonly-typenameproperty)*

## Accessors

###  data

• **get data**(): *object | undefined*

**Returns:** *object | undefined*

• **set data**(`value`: object | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | object &#124; undefined |

**Returns:** *void*

___

###  hostConfig

• **get hostConfig**(): *[HostConfig](hostconfig.md)*

*Inherited from [Action](action.md).[hostConfig](action.md#hostconfig)*

*Overrides [CardObject](cardobject.md).[hostConfig](cardobject.md#hostconfig)*

**Returns:** *[HostConfig](hostconfig.md)*

___

###  isPrimary

• **get isPrimary**(): *boolean*

*Inherited from [Action](action.md).[isPrimary](action.md#isprimary)*

**Returns:** *boolean*

• **set isPrimary**(`value`: boolean): *void*

*Inherited from [Action](action.md).[isPrimary](action.md#isprimary)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

___

###  parent

• **get parent**(): *[CardElement](cardelement.md) | undefined*

*Inherited from [Action](action.md).[parent](action.md#parent)*

*Overrides [CardObject](cardobject.md).[parent](cardobject.md#parent)*

**Returns:** *[CardElement](cardelement.md) | undefined*

___

###  renderedElement

• **get renderedElement**(): *HTMLElement | undefined*

*Inherited from [CardObject](cardobject.md).[renderedElement](cardobject.md#renderedelement)*

**Returns:** *HTMLElement | undefined*

___

###  requires

• **get requires**(): *[HostCapabilities](hostcapabilities.md)*

*Inherited from [CardObject](cardobject.md).[requires](cardobject.md#requires)*

**Returns:** *[HostCapabilities](hostcapabilities.md)*

## Methods

### `Protected` addCssClasses

▸ **addCssClasses**(`element`: HTMLElement): *void*

*Inherited from [Action](action.md).[addCssClasses](action.md#protected-addcssclasses)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | HTMLElement |

**Returns:** *void*

___

###  execute

▸ **execute**(): *void*

*Inherited from [Action](action.md).[execute](action.md#execute)*

**Returns:** *void*

___

###  getActionById

▸ **getActionById**(`id`: string): *[Action](action.md) | undefined*

*Inherited from [Action](action.md).[getActionById](action.md#getactionbyid)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Action](action.md) | undefined*

___

###  getAllInputs

▸ **getAllInputs**(`processActions`: boolean): *[Input](input.md)[]*

*Inherited from [Action](action.md).[getAllInputs](action.md#getallinputs)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`processActions` | boolean | true |

**Returns:** *[Input](input.md)[]*

___

###  getAriaRole

▸ **getAriaRole**(): *string*

*Inherited from [Action](action.md).[getAriaRole](action.md#getariarole)*

**Returns:** *string*

___

###  getCustomProperty

▸ **getCustomProperty**(`name`: string): *any*

*Inherited from [SerializableObject](serializableobject.md).[getCustomProperty](serializableobject.md#getcustomproperty)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *any*

___

### `Protected` getDefaultSerializationContext

▸ **getDefaultSerializationContext**(): *[BaseSerializationContext](baseserializationcontext.md)*

*Inherited from [Action](action.md).[getDefaultSerializationContext](action.md#protected-getdefaultserializationcontext)*

*Overrides [SerializableObject](serializableobject.md).[getDefaultSerializationContext](serializableobject.md#protected-getdefaultserializationcontext)*

**Returns:** *[BaseSerializationContext](baseserializationcontext.md)*

___

###  getHref

▸ **getHref**(): *string | undefined*

*Inherited from [Action](action.md).[getHref](action.md#gethref)*

**Returns:** *string | undefined*

___

###  getJsonTypeName

▸ **getJsonTypeName**(): *string*

*Overrides [CardObject](cardobject.md).[getJsonTypeName](cardobject.md#abstract-getjsontypename)*

**Returns:** *string*

___

###  getReferencedInputs

▸ **getReferencedInputs**(): *[Dictionary](../README.md#dictionary)‹[Input](input.md)› | undefined*

*Inherited from [Action](action.md).[getReferencedInputs](action.md#getreferencedinputs)*

**Returns:** *[Dictionary](../README.md#dictionary)‹[Input](input.md)› | undefined*

___

###  getResourceInformation

▸ **getResourceInformation**(): *[IResourceInformation](../interfaces/iresourceinformation.md)[]*

*Inherited from [Action](action.md).[getResourceInformation](action.md#getresourceinformation)*

**Returns:** *[IResourceInformation](../interfaces/iresourceinformation.md)[]*

___

###  getRootObject

▸ **getRootObject**(): *[CardObject](cardobject.md)*

*Inherited from [CardObject](cardobject.md).[getRootObject](cardobject.md#getrootobject)*

**Returns:** *[CardObject](cardobject.md)*

___

###  getSchema

▸ **getSchema**(): *[SerializableObjectSchema](serializableobjectschema.md)*

*Inherited from [SerializableObject](serializableobject.md).[getSchema](serializableobject.md#getschema)*

**Returns:** *[SerializableObjectSchema](serializableobjectschema.md)*

___

### `Protected` getSchemaKey

▸ **getSchemaKey**(): *string*

*Inherited from [CardObject](cardobject.md).[getSchemaKey](cardobject.md#protected-getschemakey)*

*Overrides [SerializableObject](serializableobject.md).[getSchemaKey](serializableobject.md#protected-abstract-getschemakey)*

**Returns:** *string*

___

### `Protected` getValue

▸ **getValue**(`property`: [PropertyDefinition](propertydefinition.md)): *any*

*Inherited from [SerializableObject](serializableobject.md).[getValue](serializableobject.md#protected-getvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDefinition](propertydefinition.md) |

**Returns:** *any*

___

###  hasAllDefaultValues

▸ **hasAllDefaultValues**(): *boolean*

*Inherited from [SerializableObject](serializableobject.md).[hasAllDefaultValues](serializableobject.md#hasalldefaultvalues)*

**Returns:** *boolean*

___

###  hasDefaultValue

▸ **hasDefaultValue**(`property`: [PropertyDefinition](propertydefinition.md)): *boolean*

*Inherited from [SerializableObject](serializableobject.md).[hasDefaultValue](serializableobject.md#hasdefaultvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDefinition](propertydefinition.md) |

**Returns:** *boolean*

___

### `Protected` internalGetReferencedInputs

▸ **internalGetReferencedInputs**(): *[Dictionary](../README.md#dictionary)‹[Input](input.md)›*

*Overrides [Action](action.md).[internalGetReferencedInputs](action.md#protected-internalgetreferencedinputs)*

**Returns:** *[Dictionary](../README.md#dictionary)‹[Input](input.md)›*

___

### `Protected` internalParse

▸ **internalParse**(`source`: [PropertyBag](../README.md#propertybag), `context`: [BaseSerializationContext](baseserializationcontext.md)): *void*

*Inherited from [SerializableObject](serializableobject.md).[internalParse](serializableobject.md#protected-internalparse)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | [PropertyBag](../README.md#propertybag) |
`context` | [BaseSerializationContext](baseserializationcontext.md) |

**Returns:** *void*

___

### `Protected` internalPrepareForExecution

▸ **internalPrepareForExecution**(`inputs`: [Dictionary](../README.md#dictionary)‹[Input](input.md)› | undefined): *void*

*Overrides [Action](action.md).[internalPrepareForExecution](action.md#protected-internalprepareforexecution)*

**Parameters:**

Name | Type |
------ | ------ |
`inputs` | [Dictionary](../README.md#dictionary)‹[Input](input.md)› &#124; undefined |

**Returns:** *void*

___

### `Protected` internalToJSON

▸ **internalToJSON**(`target`: [PropertyBag](../README.md#propertybag), `context`: [BaseSerializationContext](baseserializationcontext.md)): *void*

*Inherited from [SerializableObject](serializableobject.md).[internalToJSON](serializableobject.md#protected-internaltojson)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | [PropertyBag](../README.md#propertybag) |
`context` | [BaseSerializationContext](baseserializationcontext.md) |

**Returns:** *void*

___

### `Protected` internalValidateInputs

▸ **internalValidateInputs**(`referencedInputs`: [Dictionary](../README.md#dictionary)‹[Input](input.md)› | undefined): *[Input](input.md)[]*

*Inherited from [Action](action.md).[internalValidateInputs](action.md#protected-internalvalidateinputs)*

**Parameters:**

Name | Type |
------ | ------ |
`referencedInputs` | [Dictionary](../README.md#dictionary)‹[Input](input.md)› &#124; undefined |

**Returns:** *[Input](input.md)[]*

___

###  internalValidateProperties

▸ **internalValidateProperties**(`context`: [ValidationResults](validationresults.md)): *void*

*Inherited from [CardObject](cardobject.md).[internalValidateProperties](cardobject.md#internalvalidateproperties)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [ValidationResults](validationresults.md) |

**Returns:** *void*

___

###  parse

▸ **parse**(`source`: any, `context?`: [SerializationContext](serializationcontext.md)): *void*

*Inherited from [Action](action.md).[parse](action.md#parse)*

*Overrides [SerializableObject](serializableobject.md).[parse](serializableobject.md#parse)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | any |
`context?` | [SerializationContext](serializationcontext.md) |

**Returns:** *void*

___

### `Protected` populateSchema

▸ **populateSchema**(`schema`: [SerializableObjectSchema](serializableobjectschema.md)): *void*

*Inherited from [SerializableObject](serializableobject.md).[populateSchema](serializableobject.md#protected-populateschema)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [SerializableObjectSchema](serializableobjectschema.md) |

**Returns:** *void*

___

###  preProcessPropertyValue

▸ **preProcessPropertyValue**(`property`: [PropertyDefinition](propertydefinition.md), `propertyValue?`: any): *any*

*Inherited from [CardObject](cardobject.md).[preProcessPropertyValue](cardobject.md#preprocesspropertyvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDefinition](propertydefinition.md) |
`propertyValue?` | any |

**Returns:** *any*

___

###  prepareForExecution

▸ **prepareForExecution**(): *boolean*

*Inherited from [Action](action.md).[prepareForExecution](action.md#prepareforexecution)*

**Returns:** *boolean*

___

### `Protected` raiseExecuteActionEvent

▸ **raiseExecuteActionEvent**(): *void*

*Inherited from [Action](action.md).[raiseExecuteActionEvent](action.md#protected-raiseexecuteactionevent)*

**Returns:** *void*

___

###  remove

▸ **remove**(): *boolean*

*Inherited from [Action](action.md).[remove](action.md#remove)*

**Returns:** *boolean*

___

###  render

▸ **render**(`baseCssClass`: string): *void*

*Inherited from [Action](action.md).[render](action.md#render)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`baseCssClass` | string | "ac-pushButton" |

**Returns:** *void*

___

###  resetDefaultValues

▸ **resetDefaultValues**(): *void*

*Inherited from [SerializableObject](serializableobject.md).[resetDefaultValues](serializableobject.md#resetdefaultvalues)*

**Returns:** *void*

___

###  setCustomProperty

▸ **setCustomProperty**(`name`: string, `value`: any): *void*

*Inherited from [SerializableObject](serializableobject.md).[setCustomProperty](serializableobject.md#setcustomproperty)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *void*

___

###  setParent

▸ **setParent**(`value`: [CardObject](cardobject.md) | undefined): *void*

*Inherited from [CardObject](cardobject.md).[setParent](cardobject.md#setparent)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [CardObject](cardobject.md) &#124; undefined |

**Returns:** *void*

___

###  setShouldFallback

▸ **setShouldFallback**(`value`: boolean): *void*

*Inherited from [CardObject](cardobject.md).[setShouldFallback](cardobject.md#setshouldfallback)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *void*

___

### `Protected` setValue

▸ **setValue**(`property`: [PropertyDefinition](propertydefinition.md), `value`: any): *void*

*Inherited from [SerializableObject](serializableobject.md).[setValue](serializableobject.md#protected-setvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | [PropertyDefinition](propertydefinition.md) |
`value` | any |

**Returns:** *void*

___

###  shouldFallback

▸ **shouldFallback**(): *boolean*

*Inherited from [CardObject](cardobject.md).[shouldFallback](cardobject.md#shouldfallback)*

**Returns:** *boolean*

___

### `Protected` shouldSerialize

▸ **shouldSerialize**(`context`: [BaseSerializationContext](baseserializationcontext.md)): *boolean*

*Inherited from [SerializableObject](serializableobject.md).[shouldSerialize](serializableobject.md#protected-shouldserialize)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [BaseSerializationContext](baseserializationcontext.md) |

**Returns:** *boolean*

___

###  toJSON

▸ **toJSON**(`context?`: [BaseSerializationContext](baseserializationcontext.md)): *[PropertyBag](../README.md#propertybag) | undefined*

*Inherited from [SerializableObject](serializableobject.md).[toJSON](serializableobject.md#tojson)*

**Parameters:**

Name | Type |
------ | ------ |
`context?` | [BaseSerializationContext](baseserializationcontext.md) |

**Returns:** *[PropertyBag](../README.md#propertybag) | undefined*

___

###  updateActionButtonCssStyle

▸ **updateActionButtonCssStyle**(`actionButtonElement`: HTMLElement, `buttonState`: [ActionButtonState](../enums/actionbuttonstate.md)): *void*

*Inherited from [Action](action.md).[updateActionButtonCssStyle](action.md#updateactionbuttoncssstyle)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`actionButtonElement` | HTMLElement | - |
`buttonState` | [ActionButtonState](../enums/actionbuttonstate.md) | ActionButtonState.Normal |

**Returns:** *void*

___

###  validateInputs

▸ **validateInputs**(): *[Input](input.md)[]*

*Inherited from [Action](action.md).[validateInputs](action.md#validateinputs)*

Validates the inputs associated with this action.

**Returns:** *[Input](input.md)[]*

A list of inputs that failed validation, or an empty array if no input failed validation.

___

###  validateProperties

▸ **validateProperties**(): *[ValidationResults](validationresults.md)*

*Inherited from [CardObject](cardobject.md).[validateProperties](cardobject.md#validateproperties)*

**Returns:** *[ValidationResults](validationresults.md)*
