<script setup>
import { onMounted, defineModel } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderSlider from '../../controls/FormBuilderSlider.vue'

const config = defineModel('config')
const defaultConfig = {
  readonly: false,
  disable: false,
  min: 0,
  max: 100,
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
      <div class="col-md-3">
        <q-input v-model="config.label"
                 label="label"
                 dense />
      </div>
      <div class="col-md-3">
        <q-input v-model="config.customClass"
                 label="customClass"
                 dense />
      </div>
      <div class="col-md-3">
        <q-input v-model="config.min"
                 label="min"
                 type="number"
                 dense />
      </div>
      <div class="col-md-3">
        <q-input v-model="config.max"
                 label="max"
                 type="number"
                 dense />
      </div>
      <div class="col-12">
        <q-checkbox v-model="config.readonly"
                    label="filled"
                    dense />
        <q-checkbox v-model="config.disable"
                    label="disable"
                    dense />
      </div>
    </div>
    <input-preview>
      <form-builder-slider v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
