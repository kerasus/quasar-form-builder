<template>
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
      :outline="outline"
      :rounded="rounded"
      :size="size"
      :ripple="ripple"
      :no-caps="noCaps"
      :no-wrap="noWrap"
      :spread="spread"
      :stack="stack"
      :stretch="stretch"
      @update:model-value="change($event)"
      @clear="clear"

  />
</template>

<script>
import {inputMixin} from '../../index'
export default {
  name: 'FormBuilderToggleButton',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean]
    },
    options: {
      default: () => [], // { label: 'Option 1', value: 'op1' }
      type: Array
    }
  }
}
</script>

<style scoped>

</style>