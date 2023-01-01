<template>
  <div>
    <b v-if="label">
      {{ label }}
    </b>
    <hr />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderSpace',
  mixins: [inputMixin]
}
</script>

<style scoped>

</style>
