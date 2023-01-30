<template>
  <div class="form-builder-space"
       :class="customClass">
    <b v-if="label">
      {{ label }}
    </b>
    <hr v-if="showLine">
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderSpace',
  mixins: [inputMixin],
  props: {
    showLine: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
