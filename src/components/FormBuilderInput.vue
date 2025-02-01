<template>
  <div class="form-builder-input"
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
             :type="inputType"
             :error="error"
             :hint="hint"
             :error-message="errorMessage"
             :disable="disable"
             :mask="mask"
             :fill-mask="fillMask"
             :reverse-fill-mask="reverseFillMask"
             :clearable="clearable"
             :loading="loading"
             :readonly="readonly"
             :rounded="rounded"
             :outlined="outlined"
             :placeholder="placeholder"
             :class="customClass"
             :input-class="customClass"
             :autogrow="autogrow"
             :maxlength="maxlength"
             @update:model-value="change"
             @click="onClick"
             @keypress="onKeyPress" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderInputType = FormBuilderGenericInputType & {
  value: string | number | null;
  autogrow?: boolean;
  mask?: string;
  fillMask?: string;
  reverseFillMask?: boolean;
  inputType?: 'text' | 'password' | 'textarea' | 'email' | 'search' | 'tel' | 'file' | 'number' | 'url' | 'time' | 'date' | 'datetime-local';
  maxlength?: string | number;
  hint?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  filled?: boolean;
  lazyRules?: boolean;
  rounded?: boolean;
  outlined?: boolean;
}

const FormBuilderInputDefaults: FormBuilderInputType = {
  value: null,
  autogrow: false,
  mask: undefined,
  fillMask: undefined,
  reverseFillMask: undefined,
  inputType: 'text',
  maxlength: undefined,
  hint: undefined,
  placeholder: '',
  error: false,
  errorMessage: '',
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
  defineProps<FormBuilderInputType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderInputDefaults
  }
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick', 'onKeyPress'])

const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

function change (val: string | number | boolean) {
  emit('update:value', val)
}

function onClick(data: Event) {
  emit('onClick', data)
}

function onKeyPress(data: Event) {
  emit('onKeyPress', data)
}

onMounted(() => {
  inputData.value = props.value
  console.log('hiiiiiiiiiii input')
})
</script>
