<template>
  <div class="form-builder-checkbox"
       :class="customClass">
    <q-checkbox ref="input"
                v-model="inputData"
                :name="name"
                :color="color"
                :label="label"
                :true-value="trueValue"
                :false-value="falseValue"
                :disable="disable || readonly"
                :class="customClass"
                @update:model-value="change($event)"
                @click="onClick" />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderCheckbox',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean]
    },
    trueValue: {
      default: true,
      type: [Object, String, Array, Number, Boolean]
    },
    falseValue: {
      default: false,
      type: [Object, String, Array, Number, Boolean]
    }
  }
}
</script>

<style scoped></style>
