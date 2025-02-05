<template>
  <div class="form-builder-checkbox"
       :class="customClass">
    <q-checkbox ref="input"
                v-model="inputData"
                :name="name"
                :color="color"
                :label="label"
                :error="error"
                :error-message="errorMessage"
                :true-value="trueValue"
                :false-value="falseValue"
                :disable="disable || readonly"
                :class="customClass"
                @update:model-value="change"
                @click="onClick" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from '@/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderCheckboxType = FormBuilderGenericInputType & {
  value: object | string | Array<unknown> | number | boolean;
  trueValue?: object | string | Array<unknown> | number | boolean;
  falseValue?: object | string | Array<unknown> | number | boolean;
  color?: string;
  error?: boolean;
  errorMessage?: string;
}

const FormBuilderCheckboxDefaults: FormBuilderCheckboxType = {
  ...FormBuilderGenericInputDefaults,
  value: false, // Default value for checkbox
  trueValue: true, // Default true value
  falseValue: false, // Default false value
  color: 'primary', // Default color
  error: false, // Default error state
  errorMessage: '' // Default error message
}
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch
} from 'vue'

const props = withDefaults(defineProps<FormBuilderCheckboxType>(), FormBuilderCheckboxDefaults)

const emit = defineEmits(['update:value', 'onClick'])

const inputData = ref(props.value)
const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: unknown) {
  emit('update:value', val)
}

function onClick(event: Event) {
  emit('onClick', event)
}
</script>

<style scoped></style>
