<template>
  <div class="form-builder-color"
       :class="customClass">
    <div class="outsideLabel">
      {{ placeholder ? label : null }}
    </div>
    <q-input ref="input"
             v-model="inputData"
             :name="name"
             :disable="disable"
             :filled="filled"
             :label="placeholder ? null : label"
             :error="error"
             :error-message="errorMessage"
             :stack-label="!!placeholder"
             :outlined="outlined"
             :placeholder="placeholder"
             :loading="loading"
             :clearable="clearable"
             :rules="rules"
             :lazy-rules="lazyRules"
             :class="customClass"
             @click="showing = true">
      <template #append>
        <q-icon name="colorize"
                class="cursor-pointer">
          <q-menu v-if="!readonly"
                  v-model="showing">
            <q-color v-model="inputData"
                     square
                     flat
                     default-value="#4b9c70ff"
                     :palette="palette"
                     @update:model-value="change"
                     @click="onClick" />
          </q-menu>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderColorType = FormBuilderGenericInputType & {
  value: string;
  palette?: string[];
}

export const FormBuilderColorDefaults: FormBuilderColorType = {
  ...FormBuilderGenericInputDefaults, // Include generic defaults
  value: '', // Default value for color input
  palette: [] // Default palette
}
</script>

<script lang="ts" setup>
import { uid } from 'quasar'
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted
} from 'vue'

const props = withDefaults(defineProps<FormBuilderColorType>(), FormBuilderColorDefaults)

const emit = defineEmits(['update:value', 'change', 'onClick'])
const inputData = ref(props.value)
const showing = ref(false)
const colorPickerElCode = ref<string | null>(null)
const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: string) {
  emit('update:value', val)
  emit('change', val)
}

function onClick(event: Event) {
  emit('onClick', event)
}

onMounted(() => {
  colorPickerElCode.value = uid()
})
</script>

<style scoped>
.form-builder-color {
  background: red;
}
</style>
