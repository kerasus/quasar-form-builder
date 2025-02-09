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
                  :type="toggleType"
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

<script lang="ts" setup>
import { ref, watch, onMounted, defineProps, withDefaults, defineEmits } from 'vue'
import { useInputComposable } from 'src/composables/useInputComposable'
import { type FormBuilderToggleButtonType } from 'src/types'
import { FormBuilderToggleButtonDefaults } from 'src/defaults'

// Define the props type and defaults in one go
const props = withDefaults(
  defineProps<FormBuilderToggleButtonType>(),
  FormBuilderToggleButtonDefaults
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick'])

const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change (val: unknown) {
  emit('update:value', val)
  emit('change', val)
}

function onClick (data: Event) {
  emit('onClick', data)
}

onMounted(() => {
  inputData.value = props.value
})
</script>
