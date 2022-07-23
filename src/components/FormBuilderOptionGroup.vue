<template>
  <div>
    <div v-if="label">
      {{ label }}
    </div>
    <q-option-group
      v-model="inputData"
      :options="options"
      :color="color"
      :inline="inline"
      :dense="dense"
      :type="typeOfInput"
      :disable="disable"
      @update:model-value="change($event)"
    />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin'
export default {
  name: 'FormBuilderOptionGroup',
  mixins: [inputMixin],
  props: {
    value: {
      default: null,
      type: [Object, String, Array, Number, Boolean]
    },
    options: {
      default: () => [], // { label: 'Option 1', value: 'op1' }
      type: Array
    },
    typeOfInput : {
      default: 'radio', // radio checkbox toggle
      type: String
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
