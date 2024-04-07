<script setup>
import { ref, onMounted } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderInput from '../../FormBuilderInput.vue'

const config = defineModel('config')
const inputTypes = ref([
  'number',
  'text',
  'textarea',
  'password',
  'email',
  'tel',
  'url'
])
const defaultConfig = {
  filled: false,
  disable: false,
  loading: false,
  readonly: false,
  rounded: false,
  outlined: false,
  autogrow: false,
  inputType: 'text',
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
      <div class="col-md-6">
        <q-input v-model="config.label"
                 label="label"
                 dense />
        <q-input v-model="config.placeholder"
                 label="placeholder"
                 dense />
      </div>
      <div class="col-md-6">
        <q-input v-model="config.customClass"
                 label="customClass"
                 dense />
        <q-select v-model="config.inputType"
                  :options="inputTypes"
                  label="input type"
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
        <q-checkbox v-model="config.readonly"
                    label="readonly"
                    dense />
        <q-checkbox v-model="config.rounded"
                    label="rounded"
                    dense />
        <q-checkbox v-model="config.outlined"
                    label="outlined"
                    dense />
        <q-checkbox v-model="config.autogrow"
                    label="autogrow"
                    dense />
      </div>
    </div>
    <input-preview>
      <form-builder-input v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
