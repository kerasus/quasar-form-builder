<template>
  <div class="form-builder-slider"
       :class="customClass">
    <div>{{ label }}: {{ inputData }} ({{ min }} تا {{ max }})</div>
    <q-slider ref="input"
              v-model="inputData"
              :name="name"
              :min="min"
              :max="max"
              :disable="disable"
              :readonly="readonly"
              :class="customClass"
              :marker-labels-class="customClass"
              @update:model-value="change($event)"
              @click="onClick" />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderSlider',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: 0,
      type: Number
    }
  },
  methods: {}
}
</script>

<style scoped></style>
