<template>
  <div class="row"
       :class="['q-col-gutter-' + gutterSize, customClass]">
    <div v-for="(input, inputIndex) in inputData"
         :key="inputIndex"
         :class="[getComponentCol(input), getComponentName(input), getComponentName(input) + '-col']"
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
                 :ref="(input.type === 'formBuilder' ? 'formBuilder-' : 'input-') + input.name + '-' + input.uid"
                 v-model:value="input.value"
                 v-bind="input"
                 @update:value="onValueUpdated"
                 @input="change($event, inputIndex)"
                 @change="change($event, inputIndex)"
                 @onClick="onClick($event, input)"
                 @onInputClick="onInputClick($event)"
                 @onKeyPress="onKeyPress($event)">
        <template v-for="name in getComponentSlots(input)"
                  #[name]="slotProps">
          <slot :name="name"
                v-bind="slotProps || {}" />
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { uid } from 'quasar'
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted,
  defineAsyncComponent
} from 'vue'

// This will hold the references you need to expose
const formBuilderRefs = ref({})

const componentMap = {
  formBuilder: defineAsyncComponent(() => import('./FormBuilder.vue')),
  optionGroupRadio: defineAsyncComponent(() => import('./components/FormBuilderOptionGroup.vue')),
  optionGroupCheckbox: defineAsyncComponent(() => import('./components/FormBuilderOptionGroup.vue')),
  textInput: defineAsyncComponent(() => import('./components/FormBuilderTextInput.vue')),
  numberInput: defineAsyncComponent(() => import('./components/FormBuilderNumberInput.vue')),
  selectInput: defineAsyncComponent(() => import('./components/FormBuilderSelect.vue')),
  fileInput: defineAsyncComponent(() => import('./components/FormBuilderFile.vue')),
  textarea: defineAsyncComponent(() => import('./components/FormBuilderTextarea.vue')),
  datePicker: defineAsyncComponent(() => import('./components/FormBuilderDatePicker.vue')),
  switchInput: defineAsyncComponent(() => import('./components/FormBuilderSwitch.vue')),
  slider: defineAsyncComponent(() => import('./components/FormBuilderSlider.vue')),
  checkbox: defineAsyncComponent(() => import('./components/FormBuilderCheckbox.vue')),
  radioGroup: defineAsyncComponent(() => import('./components/FormBuilderRadioGroup.vue')),
  toggle: defineAsyncComponent(() => import('./components/FormBuilderToggle.vue'))
}

const props = withDefaults(defineProps<{
  value: Array<unknown>,
  gutterSize?: string,
  disable?: boolean,
  showGeneratorButtons?: boolean,
  loading?: boolean
}>(), {
  gutterSize: 'md',
  disable: false,
  showGeneratorButtons: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'input', value: unknown): void
  (e: 'onClick', event: unknown, input: unknown): void
  (e: 'onKeyPress', event: unknown): void
  (e: 'onInputClick', event: unknown): void
  (e: 'editInput', uid: string): void
  (e: 'update:value', value: unknown): void
}>()

const { customClass } = useInputComposable(props)

const inputData = ref(props.value)

watch(() => props.value, (newVal) => {
  inputData.value = newVal
})

onMounted(() => {
  setUidForInputs()
})

const focus = () => {
  const firstInputData = getFirstInput()
  const targetKey = 'input-' + firstInputData.name + '-' + firstInputData.uid
  function checkRefs(refs: unknown) {
    if (!refs) return
    const keys = Object.keys(refs)
    for (const key of keys) {
      if (key.startsWith('formBuilder-')) {
        if (refs[key] && refs[key][0]?.$refs) {
          checkRefs(refs[key][0].$refs)
        }
      }
      if (key === targetKey) {
        const ref = refs[key]
        if (ref && ref[0]?.$refs?.input) {
          ref[0].$refs.input.focus()
        }
      }
    }
  }
  checkRefs(formBuilderRefs.value)
}

const getFirstInput = () => {
  function checkInputs(inputs: Array<unknown>) {
    for (const input of inputs) {
      if (input.type === 'formBuilder') {
        const targetInput = checkInputs(input.value)
        if (targetInput) return targetInput
      } else {
        return input
      }
    }
  }
  return checkInputs(inputData.value)
}

const setUidForInputs = () => {
  function checkInputs(inputs: Array<unknown>) {
    inputs.forEach((input: unknown) => {
      input.uid = uid()
      if (input.type === 'formBuilder') {
        checkInputs(input.value)
      }
    })
  }
  checkInputs(inputData.value)
  onValueUpdated()
}

const onInputClick = (event: Event) => {
  emit('onInputClick', event)
}

const onClick = (event: Event, input: unknown) => {
  const absEvent = getEvent(event)
  emit('onClick', { event: absEvent, input })
}

const getEvent = (data: unknown) => {
  if (data.event) {
    return getEvent(data.event)
  }
  return data
}

const onKeyPress = (event: KeyboardEvent) => {
  emit('onKeyPress', event)
}

const getComponent = (input: unknown) => {
  if (!input.name) {
    // console.error(`Missing name for input of type ${input.type}`, input)
    input.name = `input-${Math.random().toString(36).substr(2, 5)}`
  }

  if (typeof input.type === 'object') {
    return input.type
  }

  return componentMap[input.type] || null

  // // Dynamically import based on the input type
  // switch (input.type) {
  //   case 'formBuilder':
  //     return defineAsyncComponent(() => import('./FormBuilder.vue'))
  //
  //   case 'optionGroupRadio':
  //   case 'optionGroupCheckbox':
  //   case 'optionGroupToggle':
  //     return defineAsyncComponent(() => import('./components/FormBuilderOptionGroup.vue'))
  //
  //   case 'toggleButton':
  //     return defineAsyncComponent(() => import('./components/FormBuilderToggleButton.vue'))
  //
  //   case 'input':
  //     return defineAsyncComponent(() => import('./components/FormBuilderInput.vue'))
  //
  //   case 'dateTime':
  //     return defineAsyncComponent(() => import('./components/FormBuilderDateTime.vue'))
  //
  //   case 'select':
  //     return defineAsyncComponent(() => import('./components/FormBuilderSelect.vue'))
  //
  //   case 'button':
  //     return defineAsyncComponent(() => import('./components/FormBuilderButton.vue'))
  //
  //   case 'checkbox':
  //     return defineAsyncComponent(() => import('./components/FormBuilderCheckbox.vue'))
  //
  //   case 'color':
  //     return defineAsyncComponent(() => import('./components/FormBuilderColor.vue'))
  //
  //   case 'date':
  //     return defineAsyncComponent(() => import('./components/FormBuilderDate.vue'))
  //
  //   case 'file':
  //     return defineAsyncComponent(() => import('./components/FormBuilderFile.vue'))
  //
  //   case 'rangeSlider':
  //     return defineAsyncComponent(() => import('./components/FormBuilderRangeSlider.vue'))
  //
  //   case 'separator':
  //     return defineAsyncComponent(() => import('./components/FormBuilderSeparator.vue'))
  //
  //   case 'slider':
  //     return defineAsyncComponent(() => import('./components/FormBuilderSlider.vue'))
  //
  //   case 'time':
  //     return defineAsyncComponent(() => import('./components/FormBuilderTime.vue'))
  //
  //   default:
  //     return null
  //     // Optional: Attempt dynamic import as a fallback
  //     // return defineAsyncComponent(() => import(`./components/FormBuilder${input.type}.vue`))
  }
}

const getComponentName = (input: unknown) => {
  if (typeof input.type === 'object') {
    return 'formBuilder-' + input.type.name + '-' + input.name
  }
  return getComponent(input)
}

const getComponentCol = (input: unknown) => {
  if (input.type === 'hidden') {
    return ''
  }
  return input.col ? input.col : 'col'
}

const getComponentStyle = (input: unknown) => {
  if (input.type !== 'hidden') {
    return ''
  }
  return { padding: 0, margin: 0 }
}

const getComponentSlots = (input: unknown) => {
  const slots = []
  if (typeof input.type !== 'object') {
    return slots
  }
  const data = typeof input.type?.data === 'function' ? input.type?.data() : input.type?.data
  return data ? Array.isArray(data.slots) ? data.slots : [] : []
}

const change = (event: Event, inputIndex: number) => {
  if (event?.target?.files && event.target.files[0]) {
    inputData.value[inputIndex].value = event.target.files[0]
  }
  emit('input', inputData.value)
}

const onValueUpdated = () => {
  emit('update:value', inputData.value)
}

const remove = (uid: string) => {
  function removeInput(inputs: Array<unknown>, uid: string) {
    inputs.forEach((input: unknown, inputIndex: number) => {
      if (input.type === 'formBuilder') {
        removeInput(input.value, uid)
      } else if (input.uid === uid) {
        inputs.splice(inputIndex, 1)
      }
    })
  }
  removeInput(inputData.value, uid)
  onValueUpdated()
}

const edit = (uid: string) => {
  emit('editInput', uid)
}

const clearFormBuilderInputValues = () => {
  const inputs = getValues()
  inputs.forEach((val: unknown) => {
    if (val.type === 'optionGroup') {
      val.value = []
    } else if (val.type === 'RangeSlider') {
      val.value.min = val.value.max = 0
    } else if (val.type === 'Checkbox') {
      val.value = false
    } else
      if (val.type === 'tiptapEditor') {
      // $refs.formBuildertiptapEditor[0].setNewContent(' ')
      } else if (val.type.name === 'CustomComponent' && val.type?.methods?.clearFormBuilderValue) {
        val.type.methods.clearFormBuilderValue()
      } else {
        delete val.value
      }
  })
}

const disableAllInputs = (newValue: boolean) => {
  getValues().forEach((input: unknown) => {
    input.disable = newValue
  })
}

const readonlyAllInputs = (newValue: boolean) => {
  getValues().forEach((input: unknown) => {
    input.readonly = newValue
  })
}

const getValues = () => {
  return inputData.value
}

defineExpose({
  focus,
  formBuilderRefs,
  disableAllInputs,
  readonlyAllInputs,
  clearFormBuilderInputValues
})
</script>
