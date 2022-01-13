# quasar-form-builder
This package just get you props and then give you form with inputs (it's created with **FormBuilder** component) or just any input you need.

## install
```
npm i quasar-form-builder
```

## Usage

To use it in vue files, you need to import the component you want and use it like a regular component, for example:

```vue
<template>
    <form-builder/>
</template>

<script>
    import { FormBuilder } from 'quasar-form-builder'
    export default {
        components: { FormBuilder } 
    }
</script>
```

## Features:

+ ### FormBuilder

| props               | default | type             |
|---------------------|:-------:|:-----------------|
| value               |   [ ]   | Array            |
| disable             |  false  | Boolean          |




>#### important !
>For any input you want,you have to specify its type.
```vue
<template>
    <form-builder v-model:value="inputs"/>
</template>

<script>
    import { FormBuilder } from 'quasar-form-builder'
    export default {
        components: { FormBuilder } ,
      data(){
          return {
            inputs:[{
              type: 'Input', // Avatar, date, dateTime and etc.
              label: 'Label' 
              //and other props of FormBuilderInput component
            },
            {type: 'date', label: 'Label', /*and other props of FormBuilderDateTime component*/ },
            {type: 'Slider', label: 'Label', /*and other props of FormBuilderSlider component*/ }
            ]
          }
      }
    }
</script>
```


+ ### FormBuilderAvatar
  + types
    + Avtar

| props             | default | type     |
|-------------------|:-------:|:---------|
| size              |  50px   | String   |
| fontSize          |  14px   | String   |
| color             | primary | String   |
| textColor         |  white  | String   |


+ ### FormBuilderCheckbox
  + types
    + Checkbox

| props          | default | type                                    |
|----------------|:-------:|:----------------------------------------|
| value          |   ' '   | Object, String, Array, Number, Boolean  |
| label          |   ' '   | String                                  |
| color          | primary | String                                  |
| disable        |  false  | Boolean                                 |
| trueValue      |  true   | Object, String, Array, Number, Boolean  |
| falseValue     |  false  | Object, String, Array, Number, Boolean  |

+ ### FormBuilderDateTime
    + types
        + date
        
             | props       | default |                  type                  |
             |---------|:--------------------------------------:|:---------------------------------------|
             | value       | ' '     |             Object,  Array             |
             | calendar    | persian |                 String                 |
             | multiple    | false   |                Boolean                 |
             | disable     | false   |                Boolean                 | 
        + time
         
             | props       | default |                  type                  |
             |---------|:--------------------------------------:|:---------------------------------------|
             | value       | ' '     |             Object,  Array             |
             | disable     | false   |                Boolean                 |
        + dateTime

          | props       | default |                  type                  |
          |---------|:--------------------------------------:|:---------------------------------------|
          | value       | ' '     |             Object,  Array             |
          | calendar    | persian |                 String                 |
          | multiple    | false   |                Boolean                 |
          | disable     | false   |                Boolean                 | 
        + dateRange

          | props     | default |                  type                  |
          |---------|:--------------------------------------:|:---------------------------------------|
          | value     | ' '     |             Object,  Array             |
          | calendar  | persian |                 String                 |
          | multiple  | false   |                Boolean                 |
          | disable   | false   |                Boolean                 |
          | range     | true   |                Boolean                 | 
        + dateMultipleRange

          | props     | default   |                  type                  |
          |-----------|:---------:|:---------------------------------------|
          | value     | ' '       |             Object,  Array             |
          | calendar  | persian   |                 String                 |
          | multiple  | true      |                Boolean                 |
          | disable   | false     |                Boolean                 |
          | range     | true      |                Boolean                 |

+ ### FormBuilderFile
    + types
        + File

| props     | default | type                                   |
|-----------|:-------:|:---------------------------------------|
| value     |   ' '   | Object, String, Array, Number, Boolean |
| label     |   ' '   | String                                 |
| disable   |  false  | Boolean                                |
| clearable |  true   | Boolean                                |
| src       |   ' '   | String, Number, Boolean, Array         |



+ ### FormBuilderInput
    + types
        + Input

| props     | default | type                           |
|-----------|:-------:|:-------------------------------|
| value     |   ' '   | String, Number, Boolean        |
| label     |   ' '   | String                         |
| disable   |  false  | Boolean                        |

+ ### FormBuilderInputEditor
    + types
        + InputEditor

| props     | default | type                           |
|-----------|:-------:|:-------------------------------|
| value     |   ' '   | String, Number, Boolean        |
| label     |   ' '   | String                         |
| disable   |  false  | Boolean                        |



+ ### FormBuilderOptionGroup
    + types
        + date
        + OptionGroup
        + optionGroupRadio
        + optionGroupCheckbox
        + optionGroupToggle
        
| props   | default | type                                   |
|---------|:-------:|:---------------------------------------|
| value   |   ' '   | Object, String, Array, Number, Boolean |
| options |   []    | Array                                  |
  
+ ### FormBuilderSlider
    + types
        + Slider
    
| props    | default | type                            |
|----------|:-------:|:--------------------------------|
| value    |    0    | Number                          |
| min      |    0    | Number                          |
| max      |   100   | Number                          |
| disable  |  false  | Boolean                         |


+ ### FormBuilderRangeSlider
    + types
        + RangeSlider
    
| props   |       default       | type                           |
|---------|:-------------------:|:-------------------------------|
| value   | { min: 9, max: 35 } | Object                         |
| label   |         ' '         | String                         |
| disable |        false        | Boolean                        |
| range   |        true         | Boolean                        |

+ ### FormBuilderSelect
    + types
        + Select
    
| props         | default | type                                  |
|---------------|:-------:|:--------------------------------------|
| value         |   []    | Array, String, Number, Boolean        |
| options       |   []    | Array                                 |
| optionDisable | disable | String                                |
| optionValue   |  value  | String                                |
| optionLabel   |  label  | String                                |
| label         |   ' '   | String                                |
| disable       |  false  | Boolean                               |
| multiple      |  false  | Boolean                               |
| useChips      |  false  | Boolean                               |

#### example of options prop usage :
```vue
<template>
    <form-builder v-model:value="inputs"/>
</template>

<script>
    import { FormBuilder } from 'quasar-form-builder'
    export default {
        components: { FormBuilder } ,
      data(){
          return {
            inputs:[{
              type: 'Select', // Avatar, date, dateTime and etc.
              label: 'Label',
              options: [
                {label:'some label',value: 'some value'},//for first option of select input
                {label:'some label',value: 'some value'},//for second option of select input
                {label:'some label',value: 'some value'},//for third option of select input
              ],
              optionLabel: 'label',
              optionValue: 'value',
              //and other props of FormBuilderSelect component
            },
            ]
          }
      }
    }
</script>
```


    			


    			
