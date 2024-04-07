<script setup>
import { ref, onMounted } from 'vue'
import InputPreview from '../InputPreview.vue'
import FormBuilderOptionGroup from '../../FormBuilderOptionGroup.vue'

const config = defineModel('config')
const types = ref([
  'radio',
  'checkbox',
  'toggle'
])
const newOptionLabel = ref(null)
const newOptionValue = ref(null)
const defaultConfig = {
  inline: false,
  dense: false,
  disable: false,
  typeOfInput: 'radio',
  customClass: null,
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
        <q-input v-model="config.customClass"
                 label="customClass"
                 dense />
        <q-select v-model="config.typeOfInput"
                  :options="types"
                  label="behavior"
                  dense />
        <div>
          <q-checkbox v-model="config.inline"
                      label="inline"
                      dense />
          <q-checkbox v-model="config.dense"
                      label="dense"
                      dense />
          <q-checkbox v-model="config.disable"
                      label="disable"
                      dense />
        </div>
      </div>
      <div class="col-8">
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
      <form-builder-option-group v-bind="config" />
    </input-preview>
  </div>
</template>

<style scoped>

</style>
