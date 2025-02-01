<template>
  <div class="form-builder-select"
       :class="customClass">
    <div class="outsideLabel">
      {{ placeholder ? label : null }}
    </div>
    <q-select ref="input"
              v-model="inputData"
              transition-show="jump-down"
              transition-hide="jump-up"
              :name="name"
              :filled="filled"
              :behavior="behavior"
              :rounded="rounded"
              :outlined="outlined"
              :error="error"
              :error-message="errorMessage"
              :option-value="optionValue"
              :option-label="optionLabel"
              :option-disable="optionDisable"
              :options="filteredOptions"
              :label="placeholder ? null : label"
              :stack-label="!!placeholder"
              :placeholder="localPlaceholder"
              :rules="rules"
              :icon="icon"
              :lazy-rules="lazyRules"
              :multiple="multiple"
              :use-chips="useChips"
              :new-value-mode="newValueMode"
              use-input
              input-debounce="500"
              :disable="disable"
              :readonly="readonly"
              :class="customClass"
              :popup-content-class="customClass"
              :input-class="customClass"
              emit-value
              :hide-dropdown-icon="hideDropdownIcon"
              :dropdown-icon="dropdownIcon"
              map-options
              :clearable="clearable"
              @update:model-value="change($event)"
              @new-value="createValue"
              @filter="filterFn"
              @click="onClick">
      <template #no-option>
        <q-item v-if="!createNewValue"
                v-show="showNoOption">
          <q-item-section class="text-grey">
            موردی یافت نشد
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderSelectType = FormBuilderGenericInputType & {
  value: string | number | null | Array<string | number>;
  options: Array<unknown>;
  optionValue?: string;
  optionLabel?: string;
  optionDisable?: string;
  placeholder?: string;
  createNewValue?: boolean;
  newValueMode?: 'add' | 'add-unique' | 'toggle';
  lazyRules?: Array<unknown>;
  clearable?: boolean;
  hideDropdownIcon?: boolean;
  dropdownIcon?: string;
  showNoOption?: boolean;
  filled?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  multiple?: boolean;
  useChips?: boolean;
  behavior?: string;
  icon?: string;
  onChangeValue?: (newValue: unknown, oldValue: unknown) => void;
}

export const FormBuilderSelectDefaults: FormBuilderSelectType = {
  ...FormBuilderGenericInputDefaults,
  value: null,
  placeholder: undefined,
  options: [],
  optionValue: 'value',
  optionLabel: 'label',
  optionDisable: 'disable',
  createNewValue: false,
  newValueMode: undefined,
  lazyRules: undefined,
  clearable: true,
  hideDropdownIcon: false,
  dropdownIcon: 'arrow_drop_down',
  showNoOption: true,
  filled: false,
  rounded: false,
  outlined: false,
  multiple: false,
  useChips: false,
  behavior: 'menu',
  icon: '',
  onChangeValue: () => {}
}
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  computed,
  onMounted
} from 'vue'

const props = withDefaults(defineProps<FormBuilderSelectType>(), FormBuilderSelectDefaults)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick', 'onKeyPress'])

const inputData = ref(props.value)
const filteredOptions = ref(props.options)

const { customClass } = useInputComposable(props)

const localPlaceholder = computed(() => {
  if (inputData.value === null) {
    return props.placeholder
  }
  if (typeof inputData.value === 'string') {
    return ''
  }
  if (props.multiple) {
    if (inputData.value.length === 0) {
      return props.placeholder
    }
    return ''
  }
  if (Object.keys(inputData.value).length === 0) {
    return props.placeholder
  }
  return ''
})

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

watch(() => props.options, (newValue) => {
  filteredOptions.value = newValue
}, { immediate: true, deep: true })

function change(val: unknown) {
  emit('update:value', val)
  emit('change', val)
}

function createValue(val: unknown, done: (val: unknown, mode?: string) => void) {
  if (!props.createNewValue) {
    return
  }
  done(val, props.newValueMode)
}

function filterFn(val: string, update: (callback: () => void) => void) {
  const isObjectList = props.options.length > 0 && typeof props.options[0] === 'object'

  if (val === '') {
    update(() => {
      filteredOptions.value = props.options
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filteredOptions.value = props.options.filter((v) => {
      const itemLabel = isObjectList ? v[props.optionLabel] : v
      return itemLabel.toString().toLowerCase().indexOf(needle) > -1
    })
  })
}

function onClick(data: Event) {
  emit('onClick', data)
}

onMounted(() => {
  inputData.value = props.value
})
</script>
