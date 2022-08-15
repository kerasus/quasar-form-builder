<template>
  {{value}}
  <q-btn-toggle
      v-model="inputData"
      :name="name"
      :push="push"
      :glossy="glossy"
      :options="options"
      :clearable="clearable"
      :color="color"
      :inline="inline"
      :dense="dense"
      :type="type"
      :disable="disable"
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
      :class="col"
      @update:model-value="change($event)"

  />
</template>

<script>
import {inputMixin} from '../../index'
export default {
  name: 'FormBuilderToggleButton',
  mixins: [inputMixin],
  props: {
    value: {
      default: ()=>{''},
      type: [Object, String, Array, Number, Boolean]
    },
    toggleTextColor: {
      default: 'black',
      type: [String]
    },
    toggleColor: {
      default: 'primary',
      type: [String]
    },
    push: {
      default: false,
      type: [Boolean]
    },
    glossy: {
      default: false,
      type: [Boolean]
    },
    clearable: {
      default: false,
      type: [Boolean]
    },
    unelevated: {
      default: false,
      type: [Boolean]
    },
    stretch: {
      default: false,
      type: [Boolean]
    },
    stack: {
      default: false,
      type: [Boolean]
    },
    spread: {
      default: false,
      type: [Boolean]
    },
    noWrap: {
      default: false,
      type: [Boolean]
    },
    noCaps: {
      default: false,
      type: [Boolean]
    }
  }
}
</script>

<style scoped>

</style>