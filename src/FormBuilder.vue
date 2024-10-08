<template>
  <div class="row"
       :class="['q-col-gutter-' + gutterSize, customClass]">
    <div v-for="(input, inputIndex) in inputData"
         :key="inputIndex"
         :class="[
           getComponentCol(input),
           getComponentName(input),
           // eslint-disable-next-line vue/comma-dangle
           getComponentName(input) + '-col',
         ]"
         :style="getComponentStyle(input)">
      <div v-if="showGeneratorButtons">
        <q-btn size="xs"
               round
               color="primary"
               @click="edit(input.uid)">
          edit
        </q-btn>
        <q-btn size="xs"
               round
               class="q-ml-xs"
               color="red"
               @click="remove(input.uid)">
          x
        </q-btn>
      </div>
      <component :is="getComponent(input)"
                 :ref="(input.type === 'formBuilder' ? 'formBuilder-' : 'input-') +input.name+'-'+input.uid"
                 v-model:value="input.value"
                 :loading="loading"
                 v-bind="input"
                 @update:value="onValueUpdated"
                 @input="change($event, inputIndex)"
                 @change="change($event, inputIndex)"
                 @onClick="onClick($event, input)"
                 @onInputClick="onInputClick($event)"
                 @onKeyPress="onKeyPress($event)">
        <!--        <template v-for="(_, name) in $slots" #[name]="slotProps">-->
        <template v-for="name in getComponentSlots(input)"
                  #[name]="slotProps">
          <slot :name="name"
                v-bind="slotProps || {}" />
        </template>
      </component>
    </div>
  </div>
</template>

<script>
import { uid } from 'quasar'
import { defineAsyncComponent } from 'vue'
import inputMixin from './mixins/inputMixin'
import { setAttributeByName } from './assist.js'

export default {
  name: 'FormBuilder',
  components: {
    FormBuilder: defineAsyncComponent(() => import('./FormBuilder.vue')),
    FormBuilderFile: defineAsyncComponent(() =>
      import('./components/FormBuilderFile.vue')
    ),
    FormBuilderInput: defineAsyncComponent(() =>
      import('./components/FormBuilderInput.vue')
    ),
    FormBuilderInputEditor: defineAsyncComponent(() =>
      import('./components/FormBuilderInputEditor.vue')
    ),
    FormBuilderTiptapEditor: defineAsyncComponent(() =>
      import('./components/FormBuilderTiptapEditor.vue')
    ),
    FormBuilderAvatar: defineAsyncComponent(() =>
      import('./components/FormBuilderAvatar.vue')
    ),
    FormBuilderSelect: defineAsyncComponent(() =>
      import('./components/FormBuilderSelect.vue')
    ),
    FormBuilderOptionGroup: defineAsyncComponent(() =>
      import('./components/FormBuilderOptionGroup.vue')
    ),
    FormBuilderCheckbox: defineAsyncComponent(() =>
      import('./components/FormBuilderCheckbox.vue')
    ),
    FormBuilderSlider: defineAsyncComponent(() =>
      import('./components/FormBuilderSlider.vue')
    ),
    FormBuilderRangeSlider: defineAsyncComponent(() =>
      import('./components/FormBuilderRangeSlider.vue')
    ),
    FormBuilderSeparator: defineAsyncComponent(() =>
      import('./components/FormBuilderSeparator.vue')
    ),
    FormBuilderDate: defineAsyncComponent(() =>
      import('./components/FormBuilderDate.vue')
    ),
    FormBuilderTime: defineAsyncComponent(() =>
      import('./components/FormBuilderTime.vue')
    ),
    FormBuilderDateTime: defineAsyncComponent(() =>
      import('./components/FormBuilderDateTime.vue')
    ),
    FormBuilderColor: defineAsyncComponent(() =>
      import('./components/FormBuilderColor.vue')
    ),
    FormBuilderToggleButton: defineAsyncComponent(() =>
      import('./components/FormBuilderToggleButton.vue')
    ),
    FormBuilderButton: defineAsyncComponent(() =>
      import('./components/FormBuilderButton.vue')
    )
  },
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: Array
    },
    gutterSize: {
      default: 'md',
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    showGeneratorButtons: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  emits: ['input', 'onClick', 'onKeyPress', 'onInputClick', 'editInput'],
  data() {
    return {
      currentInput: null,
      optionGroupType: null,
      dateTime_Range: null,
      dateTime_Multiple: null,
      dateTime_Time: null
    }
  },
  created() {
    this.inputData = this.value
  },
  mounted() {
    this.setUidForInputs()
  },
  methods: {
    focus() {
      const firstInputData = this.getFirstInput()
      const targetKey = 'input-' + firstInputData.name + '-' + firstInputData.uid
      function checkRefs (refs) {
        if (!refs) {
          return
        }
        const keys = Object.keys(refs)
        const keysLength = keys.length
        for (let i = 0; i < keysLength; i++) {
          const key = keys[i]
          if (key.startsWith('formBuilder-')) {
            if (refs[key] && refs[key][0] && refs[key][0].$refs) {
              checkRefs(refs[key][0].$refs)
            }
          }
          if (key === targetKey) {
            const ref = refs[key]
            if (
              ref &&
                ref[0] &&
                ref[0].$refs?.input
            ) {
              const inputRef = ref[0].$refs.input
              inputRef.focus()
            }
          }
        }
      }

      checkRefs(this.$refs)
    },
    getFirstInput() {
      function checkInputs(inputs) {
        const inputLength = inputs.length
        for (let i = 0; i < inputLength; i++) {
          const input = inputs[i]
          if (input.type === 'formBuilder') {
            const targetInput = checkInputs(input.value)
            if (targetInput) {
              return targetInput
            }
          } else {
            return input
          }
        }
      }

      return checkInputs(this.inputData)
    },
    setUidForInputs() {
      function checkInputs(inputs) {
        inputs.forEach((input) => {
          input.uid = uid()
          if (input.type === 'formBuilder') {
            checkInputs(input.value)
          }
        })
      }

      checkInputs(this.inputData)
      this.onValueUpdated()
    },
    onInputClick(event) {
      this.$emit('onInputClick', event)
    },
    onClick(event, input) {
      function getEvent(data) {
        if (data.event) {
          return getEvent(data.event)
        }

        return data
      }

      const absEvent = getEvent(event)
      this.$emit('onClick', { event: absEvent, input })
    },
    onKeyPress(event) {
      this.$emit('onKeyPress', event)
    },
    setInputValues(responseData, inputs) {
      const that = this

      function setValueOfNestedInputData(responseData, inputs) {
        inputs.forEach((input) => {
          if (
            typeof input.responseKey === 'undefined' ||
              input.responseKey === null
          ) {
            return
          }
          if (input.type === 'formBuilder') {
            setValueOfNestedInputData(responseData, input.value)
            return
          }
          input.value = that.getValidChainedObject(
            responseData,
            input.responseKey
          )
        })
      }

      if (!inputs) {
        inputs = this.inputData
      }
      setValueOfNestedInputData(responseData, inputs)
    },
    getInputsByName(name) {
      const inputs = this.getValues()
      return inputs.find((input) => input.name === name)
    },
    setInputAttributeByName(name, attribute, value) {
      setAttributeByName(this.inputData, name, attribute, value)
      this.onValueUpdated()
    },
    setInputByName(name, value) {
      this.setInputAttributeByName(name, 'value', value)
    },
    getValidChainedObject(object, keys) {
      if (!Array.isArray(keys) && typeof keys !== 'string') {
        // eslint-disable-next-line
        console.warn('keys must be array or string')
        return false
      }

      if (keys === '') {
        return object
      }

      let keysArray = keys
      if (typeof keys === 'string') {
        keysArray = keys.split('.')
      }

      if (keysArray.length === 1) {
        if (!object || typeof object[keysArray[0]] === 'undefined') {
          return null
        }
        return object[keysArray[0]]
      }

      if (
        typeof object[keysArray[0]] !== 'undefined' &&
          object[keysArray[0]] !== null
      ) {
        return this.getValidChainedObject(
          object[keysArray[0]],
          keysArray.splice(1)
        )
      }

      return (
        typeof object[keysArray[0]] !== 'undefined' &&
          object[keysArray[0]] !== null
      )
    },
    getRefs(input) {
      return input.type
    },
    getComponent(input) {
      if (typeof input.type === 'object') {
        return input.type
      }
      if (input.type === 'formBuilder') {
        return 'form-builder'
      }
      if (input.type === 'optionGroupRadio' ||
          input.type === 'optionGroupCheckbox' ||
          input.type === 'optionGroupToggle'
      ) {
        return 'form-builder-option-group'
      }

      if (input.type === 'toggleButton') {
        return 'form-builder-toggle-button'
      }
      return 'form-builder-' + input.type
    },
    getComponentName(input) {
      if (typeof input.type === 'object') {
        return 'formBuilder-' + input.type.name + '-' + input.name
      }
      return this.getComponent(input)
    },
    getComponentCol(input) {
      if (input.type === 'hidden') {
        return ''
      }
      return input.col ? input.col : 'col'
    },
    getComponentStyle(input) {
      if (input.type !== 'hidden') {
        return ''
      }
      return {
        padding: 0,
        margin: 0
      }
    },
    getComponentSlots(input) {
      const slots = []
      if (typeof input.type !== 'object') {
        return slots
      }

      const data = (typeof input.type?.data === 'function') ? input.type?.data() : input.type?.data
      return data ? Array.isArray(data.slots) ? data.slots : [] : []
    },
    getOptionGroupType(input) {
      if (input.type === 'optionGroupRadio') {
        return 'radio'
      } else if (input.type === 'optionGroupCheckbox') {
        return 'checkbox'
      } else if (input.type === 'optionGroupToggle') {
        return 'toggle'
      }

      return null
    },
    isMultiple(input) {
      return input.multiple || input.type === 'dateMultipleRange'
    },
    isRange(input) {
      return input.type === 'dateMultipleRange' || input.type === 'dateRange'
    },
    isTime(input) {
      return input.type === 'time' || input.type === 'dateTime'
    },
    isDate(input) {
      return input.type === 'date' || input.type === 'dateTime'
    },
    change(event, inputIndex) {
      if (event?.target?.files && event.target.files[0]) {
        this.inputData[inputIndex].value = event.target.files[0]
      }
      // else {
      //   this.inputData[inputIndex].value = event.data || event
      // }

      // this.inputData.value = inputValue
      this.$emit('input', this.inputData)
    },
    onValueUpdated() {
      this.$emit('update:value', this.inputData)
    },
    remove(uid) {
      const removeInput = (inputs, uid) => {
        inputs.forEach((input, inputIndex) => {
          if (input.type === 'formBuilder') {
            removeInput(input.value, uid)
          } else if (input.uid === uid) {
            inputs.splice(inputIndex, 1)
          }
        })
      }
      removeInput(this.inputData, uid)
      // this.inputData.splice(i, 1)
      this.onValueUpdated()
    },
    edit(uid) {
      this.$emit('editInput', uid)
    },
    clearFormBuilderInputValues() {
      const inputs = this.getValues()
      inputs.forEach(val => {
        if (val.type === 'optionGroup') {
          val.value = []
        } else if (val.type === 'RangeSlider') {
          val.value.min = val.value.max = 0
        } else if (val.type === 'Checkbox') {
          val.value = false
        } else if (val.type === 'tiptapEditor') {
          this.$refs.formBuildertiptapEditor[0].setNewContent(' ')
        } else if (val.type.name === 'CustomComponent' && val.type?.methods?.clearFormBuilderValue) {
          val.type.methods.clearFormBuilderValue()
        } else {
          delete val.value
        }
      })
    },
    disableAllInputs(newValue) {
      this.getValues().forEach(input => {
        input.disable = newValue
      })
    },
    readonlyAllInputs(newValue) {
      this.getValues().forEach(input => {
        input.readonly = newValue
      })
    }
  }
}
</script>
