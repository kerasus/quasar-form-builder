<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <q-input v-model="inputData"
           :name="name"
           :filled="filled"
           :rules="rules"
           :lazy-rules="lazyRules"
           :label="placeholder ? null : label"
           :stack-label="!!placeholder"
           :type="inputType"
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
           @update:model-value="change($event)"
           @click="onClick"
           @keypress="onKeyPress" />
</template>

<script>
import inputMixin from '../mixins/inputMixin';
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [String, Number, Boolean],
    },
  },
};
</script>

<style scoped></style>
