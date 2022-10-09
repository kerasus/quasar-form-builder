<template>
  <div v-if="label" class="outsideLabel">{{ label }}</div>
  <q-btn-toggle
    v-model="inputData"
    :name="name"
    :push="push"
    :glossy="glossy"
    :options="options"
    :color="color"
    :inline="inline"
    :dense="dense"
    :type="type"
    :disable="disable"
    :readonly="readonly"
    :text-color="textColor"
    :toggle-color="toggleColor"
    :toggle-text-color="toggleTextColor"
    :unelevated="unelevated"
    :flat="flat"
    :outlined="outlined"
    :rounded="rounded"
    :size="size"
    :ripple="ripple"
    :no-caps="noCaps"
    :no-wrap="noWrap"
    :spread="spread"
    :stack="stack"
    :stretch="stretch"
    :class="{customClass, col}"
    @update:model-value="change($event)"
    @click="onClick"
  />
</template>

<script>
import { inputMixin } from '../../index';
export default {
  name: 'FormBuilderToggleButton',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean],
    },
    toggleTextColor: {
      default: 'black',
      type: [String],
    },
    toggleColor: {
      default: 'primary',
      type: [String],
    },
    push: {
      default: false,
      type: [Boolean],
    },
    glossy: {
      default: false,
      type: [Boolean],
    },
    clearable: {
      default: false,
      type: [Boolean],
    },
    unelevated: {
      default: false,
      type: [Boolean],
    },
    stretch: {
      default: false,
      type: [Boolean],
    },
    stack: {
      default: false,
      type: [Boolean],
    },
    spread: {
      default: false,
      type: [Boolean],
    },
    noWrap: {
      default: false,
      type: [Boolean],
    },
    noCaps: {
      default: false,
      type: [Boolean],
    },
  },
};
</script>

<style scoped></style>
