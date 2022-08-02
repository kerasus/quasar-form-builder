<template>
  <div class="row">
    <div v-for="(input, inputIndex) in inputData"
         :key="inputIndex"
         :class="[
             (input.col) ? input.col : 'col',
             (getComponent(input) !== 'form-builder') ? 'q-pa-md' : getComponent(input),
             getComponent(input) + '-col'
             ]"
    >
      <component
          :is="getComponent(input)"
          v-model:value="input.value"
          v-bind="input.props"
          :input="input"
          :label="input.label"
          :disable="disable || input.disable"
          :options="input.options"
          :option-label="input.optionLabel"
          :option-value="input.optionValue"
          :upload-server="input.uploadServer"
          :multiple="isMultiple(input)"
          :use-chips="input.useChips"
          :create-new-value="input.createNewValue"
          :type="getOptionGroupType(input)"
          :separator-type="input.separatorType"
          :separator="input.separator"
          :min="input.min"
          :max="input.max"
          :range="isRange(input)"
          :time="isTime(input)"
          :date="isDate(input)"
          :src="input.value"
          :size="input.size"
          :vertical="input.vertical"
          :inset="input.inset"
          :spaced="input.spaced"
          :dark="input.darkMode"
          :font-size="input.fontSize"
          :color="input.color"
          :text-color="input.textColor"
          :icon="input.icon"
          :rounded="input.rounded"
          :name="input.name"
          :push="input.push"
          :glossy="input.glossy"
          :clearable="input.clearable"
          :inline="input.inline"
          :dense="input.dense"
          :toggle-color="input.toggleColor"
          :toggle-text-color="input.toggleTextColor"
          :unelevated="input.unelevated"
          :flat="input.flat"
          :outline="input.outline"
          :ripple="input.ripple"
          :calendar-icon="input.calendarIcon"
          :clock-icon="input.clockIcon"
          :class="{ 'hidden': input.hidden }"
          :rules="input.rules"
          :lazy-rules="input.lazyRules? input.lazyRules: false"
          @update:value="onValueUpdated"
          @input="change($event, inputIndex)"
          @change="change($event, inputIndex)"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import inputMixin from './mixins/inputMixin'

export default {
  name: 'FormBuilder',
  components: {
    FormBuilder: defineAsyncComponent(() => import('./FormBuilder.vue')),
    FormBuilderFile: defineAsyncComponent(() => import('./components/FormBuilderFile')),
    FormBuilderInput: defineAsyncComponent(() => import('./components/FormBuilderInput')),
    FormBuilderInputEditor: defineAsyncComponent(() => import('./components/FormBuilderInputEditor')),
    FormBuilderTiptapEditor: defineAsyncComponent(() => import('./components/FormBuilderTiptapEditor')),
    FormBuilderAvatar: defineAsyncComponent(() => import('./components/FormBuilderAvatar')),
    FormBuilderSelect: defineAsyncComponent(() => import('./components/FormBuilderSelect')),
    FormBuilderOptionGroup: defineAsyncComponent(() => import('./components/FormBuilderOptionGroup')),
    FormBuilderCheckbox: defineAsyncComponent(() => import('./components/FormBuilderCheckbox')),
    FormBuilderSlider: defineAsyncComponent(() => import('./components/FormBuilderSlider')),
    FormBuilderRangeSlider: defineAsyncComponent(() => import('./components/FormBuilderRangeSlider')),
    FormBuilderSpace: defineAsyncComponent(() => import('./components/FormBuilderSpace')),
    FormBuilderSeparator: defineAsyncComponent(() => import('./components/FormBuilderSeparator')),
    FormBuilderDateTime: defineAsyncComponent(() => import('./components/FormBuilderDateTime')),
    FormBuilderColor: defineAsyncComponent(() => import('./components/FormBuilderColor.vue')),
    FormBuilderToggleButton: defineAsyncComponent(() => import('./components/FormBuilderToggleButton'))
  },
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: Array
    },
    disable: {
      default: false,
      type: Boolean
    }
  },
  emits: ['input'],
  data () {
    return {
      currentInput: null,
      optionGroupType: null,
      dateTime_Range: null,
      dateTime_Multiple: null,
      dateTime_Time: null
    }
  },
  methods: {
    getFormData () {
      const formHasFileInput = this.formHasFileInput()
      const formData = formHasFileInput ? new FormData() : {}
      const inputs = this.getValues()
      inputs.forEach(item => {
        if (item.disable || typeof item.value === 'undefined' || item.value === null) {
          return
        }

        if (item.type === 'file' && !this.isFile(item.value)) {
          return
        }

        if (formHasFileInput) {
          formData.append(item.name, item.value)
        } else {
          this.createChainedObject(formData, item.name, item.value)
        }
      })

      return formData
    },
    formHasFileInput () {
      const inputs = this.getValues()
      const target = inputs.find(item => item.type === 'file')
      return !!target
    },
    isFile (file) {
      return file instanceof File
    },
    createChainedObject (formData, chainedName, value) {
      let keysArray = chainedName
      if (typeof chainedName === 'string') {
        keysArray = chainedName.split('.')
      }
      if (keysArray.length === 1) {
        formData[keysArray[0]] = value
      } else {
        if (typeof formData[keysArray[0]] === 'undefined') {
          formData[keysArray[0]] = {}
        }
        const newKeysArray = keysArray.filter((item, index) => index !== 0)
        this.createChainedObject(formData[keysArray[0]], newKeysArray, value)
      }
    },


    setInputValues (responseData, inputs) {
      const that = this
      function setValueOfNestedInputData (responseData, inputs) {
        inputs.forEach(input => {
          if (typeof input.responseKey === 'undefined' || input.responseKey === null) {
            return
          }
          if (input.type === 'formBuilder') {
            setValueOfNestedInputData(responseData, input.value)
            return
          }
          const validChainedObject = that.getValidChainedObject(responseData, input.responseKey)
          input.value = validChainedObject
        })
      }

      if (!inputs) {
        inputs = this.inputData
      }
      setValueOfNestedInputData(responseData, inputs)
    },
    getValidChainedObject (object, keys) {
      if (!Array.isArray(keys) && typeof keys !== 'string') {
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

      if (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null) {
        return this.getValidChainedObject(object[keysArray[0]], keysArray.splice(1))
      }

      return (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null)
    },


    getComponent (input) {
      if (typeof input.type === 'object') {
        return input.type
      }
      if (input.type === 'formBuilder') {
        return 'form-builder'
      }
      if (
          input.type === 'optionGroupRadio' ||
          input.type === 'optionGroupCheckbox' ||
          input.type === 'optionGroupToggle'
      ) {
        return 'form-builder-option-group'
      }
      if (
          input.type === 'dateMultipleRange' ||
          input.type === 'dateRange' ||
          input.type === 'date' ||
          input.type === 'dateTime' ||
          input.type === 'time'
      ) {
        return 'form-builder-date-time'
      }
      if (input.type === 'toggleButton') {
        return 'form-builder-toggle-button'
      }
      return 'form-builder-' + input.type
    },
    getOptionGroupType (input) {
      if (input.type === 'optionGroupRadio') {
        return 'radio'
      } else if (input.type === 'optionGroupCheckbox') {
        return 'checkbox'
      } else if (input.type === 'optionGroupToggle') {
        return 'toggle'
      }

      return null
    },
    isMultiple (input) {
      return input.multiple || input.type === 'dateMultipleRange'
    },
    isRange (input) {
      return input.type === 'dateMultipleRange' || input.type === 'dateRange'
    },
    isTime (input) {
      return input.type === 'time' || input.type === 'dateTime'
    },
    isDate (input) {
      return input.type === 'date' || input.type === 'dateTime'
    },
    change (event, inputIndex) {
      if (typeof event.target !== 'undefined' && typeof event.target.files !== 'undefined' && event.target.files[0]) {
        this.inputData[inputIndex].value = event.target.files[0]
      } else {
        this.inputData[inputIndex].value = event
      }

      // this.inputData.value = inputValue
      this.$emit('input', this.inputData)
    },
    onValueUpdated() {
      this.$emit('update:value', this.inputData)
    }
  }
}
</script>

<style scoped>

</style>
