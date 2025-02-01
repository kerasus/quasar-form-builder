<template>
  <div class="form-builder-datetime"
       :class="customClass">
    <div class="outsideLabel">
      {{ placeholder ? label : null }}
    </div>
    <q-input ref="input"
             v-model="inputData"
             :name="name"
             :filled="filled"
             :rules="rules"
             :lazy-rules="lazyRules"
             :label="placeholder ? null : label"
             :stack-label="!!placeholder"
             :error="error"
             :hint="hint"
             :error-message="errorMessage"
             :disable="disable"
             :clearable="clearable"
             :loading="loading"
             :readonly="readonly"
             :rounded="rounded"
             :outlined="outlined"
             :placeholder="placeholder"
             :class="customClass"
             :input-class="customClass"
             mask="####/##/## ##:##"
             @update:model-value="change"
             @click="onClick"
             @keypress="onKeyPress">
      <template #append>
        <q-icon name="event"
                class="cursor-pointer"
                @click="openDatePicker" />
      </template>
    </q-input>
    <q-popup-proxy ref="qDateProxy"
                   transition-show="scale"
                   transition-hide="scale">
      <q-datetime v-model="inputData"
                  mask="YYYY-MM-DD HH:mm"
                  @update:model-value="change" />
    </q-popup-proxy>
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

export type FormBuilderDateTimeType = FormBuilderGenericInputType & {
  value: string | null;
  hint?: string;
  placeholder?: string;
  filled?: boolean;
  lazyRules?: boolean;
  rounded?: boolean;
  outlined?: boolean;
}

export const FormBuilderDateTimeDefaults: FormBuilderDateTimeType = {
  ...FormBuilderGenericInputDefaults, // Include generic defaults
  value: null,
  hint: undefined,
  placeholder: '',
  filled: false,
  lazyRules: false,
  rounded: false,
  outlined: false
}
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted
} from 'vue'

const props = withDefaults(
  defineProps<FormBuilderDateTimeType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderDateTimeDefaults
  }
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick', 'onKeyPress'])
const inputData = ref(props.value)
const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change(val: string) {
  emit('update:value', val)
}

function onClick(data: Event) {
  emit('onClick', data)
}

function onKeyPress(data: Event) {
  emit('onKeyPress', data)
}

function openDatePicker() {
  const proxy = (document.querySelector('.q-popup-proxy') as unknown)
  if (proxy) proxy.show()
}

onMounted(() => {
  inputData.value = props.value
})
</script>
