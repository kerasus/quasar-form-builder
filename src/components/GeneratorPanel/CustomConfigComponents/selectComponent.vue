<script setup>
import { ref, onMounted, defineModel } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderSelect from '../../FormBuilderSelect.vue'

const config = defineModel('config')
const behaviorTypes = ref([
  'default',
  'menu',
  'dialog'
])
const newOptionLabel = ref(null)
const newOptionValue = ref(null)
const defaultConfig = {
  filled: false,
  rounded: false,
  outlined: false,
  disable: false,
  loading: false,
  readonly: false,
  multiple: false,
  useChips: false,
  clearable: false,
  behavior: 'default',
  optionValue: 'value',
  optionLabel: 'label',
  options: [],
  label: null,
  placeholder: null
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
        <q-input v-model="config.placeholder"
                 label="placeholder"
                 dense />
        <q-input v-model="config.optionValue"
                 label="optionValue"
                 dense />
        <q-input v-model="config.optionLabel"
                 label="optionLabel"
                 dense />
        <q-select v-model="config.behavior"
                  :options="behaviorTypes"
                  label="behavior"
                  dense />
        <div>
          <q-checkbox v-model="config.filled"
                      label="filled"
                      dense />
          <q-checkbox v-model="config.rounded"
                      label="rounded"
                      dense />
          <q-checkbox v-model="config.outlined"
                      label="outlined"
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
          <q-checkbox v-model="config.multiple"
                      label="multiple"
                      dense />
          <q-checkbox v-model="config.useChips"
                      label="useChips"
                      dense />
          <q-checkbox v-model="config.clearable"
                      label="clearable"
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
      <form-builder-select v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
