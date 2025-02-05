<template>
  <div class="form-builder-slider"
       :class="customClass">
    <div>{{ label }}: {{ inputData }} ({{ min }} تا {{ max }})</div>
    <q-slider ref="input"
              v-model="inputData"
              :name="name"
              :min="min"
              :max="max"
              :disable="disable"
              :readonly="readonly"
              :class="customClass"
              :marker-labels-class="customClass"
              @update:model-value="change($event)"
              @click="onClick" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from '@/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderSliderType = FormBuilderGenericInputType & {
  value: number;
  min: number;
  max: number;
}

export const FormBuilderSliderDefaults: FormBuilderSliderType = {
  value: 0,
  min: 0,
  max: 100
}
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted
} from 'vue'

const props = withDefaults(
  defineProps<FormBuilderSliderType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderSliderDefaults
  }
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick'])

const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: number) {
  emit('update:value', val)
  emit('change', val)
}

function onClick(data: Event) {
  emit('onClick', data)
}

onMounted(() => {
  inputData.value = props.value
})
</script>
