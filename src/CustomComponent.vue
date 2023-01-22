<template>
  <div :class="customClass">
    hi {{ name }} from CustomComponent with value: {{ value }}
    <button @click="addValue">+</button>
  </div>
</template>

<script>
import inputMixin from './mixins/inputMixin.js'
export default {
  name: 'CustomComponent',
  mixins: [inputMixin],
  props: {
    value: {
      default: null
    },
    name: {
      type: String,
      default: 'ali'
    }
  },
  methods: {
    addValue () {
      this.inputData++
      this.change(this.inputData)
    }
  }
}
</script>
