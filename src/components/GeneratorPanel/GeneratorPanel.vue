<script setup>
import { copyToClipboard } from 'quasar'
import FormBuilder from '../../FormBuilder.vue'
import { ref, defineAsyncComponent, computed } from 'vue'

const typeOptions = ref([
  'input',
  'select',
  'checkbox',
  'optionGroup',
  'toggleButton',
  'dateTime',
  'date',
  'time',
  'color',
  'slider',
  'rangeSlider',
  'file',
  'inputEditor',
  'tiptapEditor',
  'avatar',
  'separator',
  'space'
])
const selectedName = ref(null)
const selectedInput = ref(null)
const formBuilderKey = ref(Date.now())
const selectedCols = ref('col-md-12 col-12')
const selectedType = ref(null)
const selectedCustomConfig = ref({})
const selectedResponseKey = ref(null)
const inputs = ref([])

const customConfigsComponent = computed(() => {
  if (!selectedType.value) {
    return null
  }
  return defineAsyncComponent(() => import(`./CustomConfigComponents/${selectedType.value}Component.vue`))
})

const copyInputs = () => {
  copyToClipboard(JSON.stringify(inputs.value))
    .then(() => {
      alert('json copied to clipboard')
    })
    .catch(() => {
      alert('failed to copy json')
    })
}
const addInput = () => {
  if (!selectedType.value) {
    return
  }

  inputs.value.push({
    type: selectedType.value,
    name: selectedName.value,
    responseKey: selectedResponseKey.value,
    col: selectedCols.value,
    ...selectedCustomConfig.value
  })

  formBuilderKey.value = Date.now()
}

const editInput = () => {
  const updateInput = (inputs, uid) => {
    const inputsLength = inputs.length
    for (let inputIndex = 0; inputIndex < inputsLength; inputIndex++) {
      const input = inputs[inputIndex]
      if (input.type === 'formBuilder') {
        updateInput(input.value, uid)
      } else if (input.uid === uid) {
        debugger
        const editData = {
          ...selectedCustomConfig.value,
          type: selectedType.value,
          name: selectedName.value,
          responseKey: selectedResponseKey.value,
          col: selectedCols.value
        }

        inputs[inputIndex] = editData
      }
    }
  }

  updateInput(inputs.value, selectedInput.value.uid)
  selectedInput.value = null

  formBuilderKey.value = Date.now()
}

const onEditInput = (uid) => {
  const getInput = (inputs, uid) => {
    const inputsLength = inputs.length
    for (let inputIndex = 0; inputIndex < inputsLength; inputIndex++) {
      const input = inputs[inputIndex]
      if (input.type === 'formBuilder') {
        const result = getInput(input.value, uid)
        if (result) {
          return result
        }
      } else if (input.uid === uid) {
        return input
      }
    }
    return null
  }
  const targetInput = getInput(inputs.value, uid)
  selectedInput.value = targetInput

  selectedType.value = selectedInput.value.type
  selectedName.value = selectedInput.value.name
  selectedResponseKey.value = selectedInput.value.responseKey
  selectedCols.value = selectedInput.value.col
  selectedCustomConfig.value = selectedInput.value
}

</script>

<template>
  <q-card class="GeneratorPanel">
    <q-card-section>
      GeneratorPanel
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-3">
          <div class="GeneratorPanel__global-configs">
            <q-banner dense
                      class="bg-primary text-white">
              general config
            </q-banner>
            <div class="row">
              <div class="col-12">
                <q-select v-model="selectedType"
                          :options="typeOptions"
                          dense
                          label="input type" />
                <q-input v-model="selectedCols"
                         dense
                         label="cols" />
                <q-input v-model="selectedName"
                         dense
                         label="name" />
                <q-input v-model="selectedResponseKey"
                         dense
                         label="Response Key" />
              </div>
              <div class="col-12">
                <template v-if="!selectedInput">
                  <div class="row">
                    <div class="col-6">
                      <q-btn label="add input"
                             size="sm"
                             color="green"
                             class="full-width"
                             dense
                             @click="addInput" />
                    </div>
                    <div class="col-6">
                      <q-btn label="copy inputs"
                             size="sm"
                             color="primary"
                             class="full-width"
                             dense
                             @click="copyInputs" />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="row">
                    <div class="col-6">
                      <q-btn label="add input"
                             size="sm"
                             color="green-6"
                             class="full-width"
                             dense
                             @click="addInput" />
                    </div>
                    <div class="col-6">
                      <q-btn label="edit input"
                             size="sm"
                             color="green-4"
                             class="full-width"
                             dense
                             @click="editInput" />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <q-banner dense
                    class="bg-primary text-white">
            custom config
          </q-banner>
          <div class="GeneratorPanel__cusotm-configs">
            <component :is="customConfigsComponent"
                       v-model:config="selectedCustomConfig" />
          </div>
        </div>
      </div>
      <div class="GeneratorPanel__result-form">
        <q-separator spaced />
        <form-builder ref="formBuilder"
                      :key="formBuilderKey"
                      v-model:value="inputs"
                      :show-generator-buttons="true"
                      @edit-input="onEditInput" />
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.GeneratorPanel {

}
</style>
