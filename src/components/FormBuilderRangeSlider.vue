<template>
  <div class="form-builder-rangeSlider"
       :class="customClass">
    <q-badge color="secondary">
      {{ label }}: از {{ inputData.min }} تا {{ inputData.max }} ({{ min }} تا
      {{ max }})
    </q-badge>
    <q-range ref="input"
             v-model="inputData"
             :name="name"
             :min="min"
             :max="max"
             :disable="disable"
             :readonly="readonly"
             :class="customClass"
             :marker-labels-class="customClass"
             @update:model-value="change"
             @click="onClick" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

// Define the extended type for the range slider component
export type FormBuilderRangeSliderType = FormBuilderGenericInputType & {
  value: { min: number, max: number };
  min: number;
  max: number;
  disable?: boolean;
  readonly?: boolean;
  label?: string;
}

export const FormBuilderRangeSliderDefaults: FormBuilderRangeSliderType = {
  value: { min: 9, max: 35 },
  min: 0,
  max: 100,
  disable: false,
  readonly: false,
  label: '',
  customClass: '',
  ...FormBuilderGenericInputDefaults
}
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted
} from 'vue'

// Define props, combining defaults from both FormBuilderGenericInputDefaults and FormBuilderRangeSliderDefaults
const props = withDefaults(
  defineProps<FormBuilderRangeSliderType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderRangeSliderDefaults
  }
)

const emit = defineEmits(['update:value', 'onClick'])

const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: { min: number, max: number }) {
  emit('update:value', val)
}

function onClick(data: Event) {
  emit('onClick', data)
}

onMounted(() => {
  inputData.value = props.value
})
</script>

<style scoped></style>
