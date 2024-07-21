<script setup>
import { onMounted, defineModel } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderColor from '../../FormBuilderColor.vue'

const config = defineModel('config')
const defaultConfig = {
  filled: false,
  clearable: false,
  disable: false,
  loading: false,
  outlined: false,
  customClass: null,
  label: null,
  placeholder: null
}

onMounted(() => {
  config.value = Object.assign(defaultConfig, config.value)
})
</script>

<template>
  <div class="inputComponent">
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <q-input v-model="config.label"
                 label="label"
                 dense />
      </div>
      <div class="col-md-4">
        <q-input v-model="config.placeholder"
                 label="placeholder"
                 dense />
      </div>
      <div class="col-md-4">
        <q-input v-model="config.customClass"
                 label="customClass"
                 dense />
      </div>
      <div class="col-12">
        <q-checkbox v-model="config.filled"
                    label="filled"
                    dense />
        <q-checkbox v-model="config.disable"
                    label="disable"
                    dense />
        <q-checkbox v-model="config.loading"
                    label="loading"
                    dense />
        <q-checkbox v-model="config.clearable"
                    label="clearable"
                    dense />
        <q-checkbox v-model="config.outlined"
                    label="outlined"
                    dense />
      </div>
    </div>
    <input-preview>
      <form-builder-color v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
