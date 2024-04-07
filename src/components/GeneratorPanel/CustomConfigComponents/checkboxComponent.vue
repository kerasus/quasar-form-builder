<script setup>
import { onMounted } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderCheckbox from '../../FormBuilderCheckbox.vue'

const config = defineModel('config')
const defaultConfig = {
  disable: false,
  trueValue: true,
  falseValue: false,
  customClass: null,
  label: null
}

onMounted(() => {
  config.value = Object.assign(defaultConfig, config.value)
})
</script>

<template>
  <div class="inputComponent">
    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-input v-model="config.label"
                 label="label"
                 dense />
      </div>
      <div class="col-md-6">
        <q-input v-model="config.customClass"
                 label="customClass"
                 dense />
      </div>
      <div class="col-md-4">
        <q-input v-model="config.trueValue"
                 label="trueValue"
                 dense />
      </div>
      <div class="col-md-4">
        <q-input v-model="config.falseValue"
                 label="falseValue"
                 dense />
      </div>
      <div class="col-md-4">
        <q-checkbox v-model="config.disable"
                    label="disable"
                    dense />
      </div>
    </div>
    <input-preview>
      <form-builder-checkbox v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
