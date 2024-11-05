<template>
  <div class="form-builder-input"
       :class="customClass">
    <div class="outsideLabel">{{ placeholder ? label : null }}</div>
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
             @update:model-value="change($event)"
             @click="onClick"
             @keypress="onKeyPress" />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    autogrow: {
      type: Boolean,
      default: false
    },
    preventPersian: {
      type: Boolean,
      default: false
    },
    preventEnglish: {
      type: Boolean,
      default: false
    },
    justNumber: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text',
      validator: (value) => {
        return [
          'text', 'password', 'textarea', 'email',
          'search', 'tel', 'file', 'number',
          'url', 'time', 'date', 'datetime-local'
        ].includes(value)
      }
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    hint: {
      type: String,
      default: undefined
    },
    value: {
      default: '',
      type: [String, Number, Boolean]
    }
  }
}
</script>

<style scoped></style>
