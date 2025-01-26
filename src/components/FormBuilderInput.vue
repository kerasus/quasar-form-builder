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

<script lang="ts" setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'
import { useInputComposable } from '@/composables/useInputComposable'

// Define the extended type with additional properties.
export type FormBuilderInputType = FormBuilderGenericInputType & {
  autogrow: boolean;
  mask?: string;
  fillMask?: string;
  reverseFillMask?: boolean;
  inputType: 'text' | 'password' | 'textarea' | 'email' | 'search' | 'tel' | 'file' | 'number' | 'url' | 'time' | 'date' | 'datetime-local';
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
const props = withDefaults(
  defineProps<FormBuilderInputType>(),
  {
    autogrow: false
  }
)

// // Define the props separately from the type definition
// const props = defineProps({
//   // Spread the simple defaults from FormBuilderGenericInputDefaults
//   ...FormBuilderGenericInputDefaults,
//
//   // Handle more complex properties explicitly
//   autogrow: { type: Boolean, default: false },
//   mask: { type: String, default: undefined },
//   fillMask: { type: String, default: undefined },
//   reverseFillMask: { type: Boolean, default: undefined },
//   inputType: { type: String, default: 'text' },
//   maxlength: { type: [String, Number], default: undefined },
//   hint: { type: String, default: undefined },
//   placeholder: { type: String, default: '' },
//   error: { type: Boolean, default: false },
//   errorMessage: { type: String, default: '' },
//   filled: { type: Boolean, default: false },
//   lazyRules: { type: Boolean, default: false },
//   rounded: { type: Boolean, default: false },
//   outlined: { type: Boolean, default: false },
//
//   // Handle properties like `rules` and `type` with their correct types:
//   rules: { type: [Array, String], default: [] },
//   type: { type: [String, Object], default: 'input' } // Assuming type can be string or a component
// })

//
// const props = defineProps({
//   value: { type: [String, Number, Boolean], default: '' },
//   autogrow: { type: Boolean, default: false },
//   mask: { type: String, default: undefined },
//   fillMask: { type: String, default: undefined },
//   reverseFillMask: { type: Boolean, default: undefined },
//   inputType: {
//     type: String,
//     default: 'text',
//     validator: (value: string) => [
//       'text', 'password', 'textarea', 'email', 'search', 'tel', 'file', 'number', 'url', 'time', 'date', 'datetime-local'
//     ].includes(value)
//   },
//   maxlength: { type: [String, Number], default: undefined },
//   hint: { type: String, default: undefined },
//   placeholder: { type: String, default: '' },
//   error: { type: Boolean, default: false },
//   errorMessage: { type: String, default: '' },
//   filled: { type: Boolean, default: false },
//   lazyRules: { type: Boolean, default: false },
//   rounded: { type: Boolean, default: false },
//   outlined: { type: Boolean, default: false }
// })

const emit = defineEmits(['update:value', 'input', 'change', 'onClick', 'onKeyPress'])

const inputData = ref(props.value)

// Use the composable for shared logic
const { customClass, getValues, formHasFileInput, isFile } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

const change = (val: string | number | boolean) => {
  emit('update:value', val)
}

const onClick = (data: Event) => {
  emit('onClick', data)
}

const onKeyPress = (data: Event) => {
  emit('onKeyPress', data)
}

onMounted(() => {
  inputData.value = props.value
})
</script>
