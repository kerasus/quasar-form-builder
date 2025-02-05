<template>
  <div class="form-builder-ToggleButton"
       :class="customClass">
    <div v-if="label"
         class="outsideLabel">
      {{ label }}
    </div>
    <q-btn-toggle v-model="inputData"
                  :name="name"
                  :push="push"
                  :glossy="glossy"
                  :options="options"
                  :color="color"
                  :inline="inline"
                  :dense="dense"
                  :type="type"
                  :disable="disable"
                  :readonly="readonly"
                  :text-color="textColor"
                  :toggle-color="toggleColor"
                  :toggle-text-color="toggleTextColor"
                  :unelevated="unelevated"
                  :flat="flat"
                  :outlined="outlined"
                  :rounded="rounded"
                  :size="size"
                  :ripple="ripple"
                  :no-caps="noCaps"
                  :no-wrap="noWrap"
                  :spread="spread"
                  :stack="stack"
                  :stretch="stretch"
                  @update:model-value="change($event)"
                  @click="onClick" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from '@/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderToggleButtonType = FormBuilderGenericInputType & {
  value: string | number | boolean | object | Array<unknown>;
  toggleTextColor?: string;
  toggleColor?: string;
  push?: boolean;
  glossy?: boolean;
  clearable?: boolean;
  unelevated?: boolean;
  stretch?: boolean;
  stack?: boolean;
  spread?: boolean;
  noWrap?: boolean;
  noCaps?: boolean;
  options?: Array<{ label: string; value: unknown }>;
  color?: string;
  inline?: boolean;
  dense?: boolean;
  type?: string;
  textColor?: string;
  flat?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  size?: string;
  ripple?: boolean;
}

export const FormBuilderToggleButtonDefaults: FormBuilderToggleButtonType = {
  value: '',
  toggleTextColor: 'black',
  toggleColor: 'primary',
  push: false,
  glossy: false,
  clearable: false,
  unelevated: false,
  stretch: false,
  stack: false,
  spread: false,
  noWrap: false,
  noCaps: false,
  options: [],
  color: '',
  inline: false,
  dense: false,
  type: '',
  textColor: '',
  flat: false,
  outlined: false,
  rounded: false,
  size: '',
  ripple: false
}
</script>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useInputComposable } from '@/composables/useInputComposable'

const props = withDefaults(
  defineProps<FormBuilderToggleButtonType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderToggleButtonDefaults
  }
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick'])

const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: unknown) {
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
