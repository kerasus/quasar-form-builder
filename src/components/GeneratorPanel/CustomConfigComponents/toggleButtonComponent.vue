<script setup>
import { ref, onMounted } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderToggleButton from '../../FormBuilderToggleButton.vue'

const config = defineModel('config')
const newOptionLabel = ref(null)
const newOptionValue = ref(null)
const sizeTypes = ref([
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
])
const defaultConfig = {
  push: false,
  glossy: false,
  dense: false,
  disable: false,
  readonly: false,
  ripple: false,
  noCaps: false,
  noWrap: false,
  spread: false,
  stack: false,
  stretch: false,
  rounded: false,
  outlined: false,
  flat: false,
  unelevated: false,
  size: 'md',
  options: [],
  label: null
}
const addOption = () => {
  config.value.options.push({
    label: newOptionLabel.value,
    value: newOptionValue.value
  })
}
const removeOption = (index) => {
  config.value.options.splice(index, 1)
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
        <q-select v-model="config.size"
                  :options="sizeTypes"
                  label="size"
                  dense />
        <div class="col-md-9 col-12">
          <q-checkbox v-model="config.push"
                      label="push"
                      dense />
          <q-checkbox v-model="config.glossy"
                      label="glossy"
                      dense />
          <q-checkbox v-model="config.ripple"
                      label="ripple"
                      dense />
          <q-checkbox v-model="config.noCaps"
                      label="noCaps"
                      dense />
          <q-checkbox v-model="config.noWrap"
                      label="noWrap"
                      dense />
          <q-checkbox v-model="config.spread"
                      label="spread"
                      dense />
          <q-checkbox v-model="config.stack"
                      label="stack"
                      dense />
          <q-checkbox v-model="config.stretch"
                      label="stretch"
                      dense />
          <q-checkbox v-model="config.rounded"
                      label="rounded"
                      dense />
          <q-checkbox v-model="config.outlined"
                      label="outlined"
                      dense />
          <q-checkbox v-model="config.flat"
                      label="flat"
                      dense />
          <q-checkbox v-model="config.unelevated"
                      label="unelevated"
                      dense />
          <q-checkbox v-model="config.dense"
                      label="dense"
                      dense />
          <q-checkbox v-model="config.disable"
                      label="disable"
                      dense />
          <q-checkbox v-model="config.readonly"
                      label="readonly"
                      dense />
        </div>
      </div>
      <div class="col-md-8">
        <q-list dense>
          <q-item>
            <q-item-section>
              options:
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-input v-model="newOptionLabel"
                       label="label"
                       dense />
            </q-item-section>
            <q-item-section>
              <q-input v-model="newOptionValue"
                       label="value"
                       dense />
            </q-item-section>
            <q-item-section side>
              <q-btn color="green"
                     label="add option"
                     size="sm"
                     class="full-width"
                     dense
                     @click="addOption" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item v-for="(option, optionIndex) in config.options"
                  :key="optionIndex"
                  v-ripple
                  clickable>
            <q-item-section side
                            top>
              <q-btn color="red"
                     size="xs"
                     label="remove"
                     dense
                     @click="removeOption(optionIndex)" />
            </q-item-section>

            <q-item-section>
              <q-item-label>label: {{ option.label }}</q-item-label>
              <q-item-label caption>
                value: {{ option.value }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <input-preview>
      <form-builder-toggle-button v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
