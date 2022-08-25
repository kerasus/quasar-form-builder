<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <q-input
    v-model="inputData"
    :filled="filled"
    :rules="rules"
    :lazy-rules="lazyRules"
    :label="placeholder ? null : label"
    :stack-label="!!placeholder"
    :type="inputType"
    :disable="disable"
    :readonly="readonly"
    :rounded="rounded"
    :outlined="outlined"
    :placeholder="placeholder"
    @update:model-value="change($event)"
    @click="onClick"
  />
</template>

<script>
import inputMixin from '../mixins/inputMixin';
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Number, Boolean],
    },
  },
};
</script>

<style scoped></style>
