<template>
  <q-input v-model="inputData" borderless :label="label" :type="type" :disable="disable" :rounded="rounded" @update:model-value="change($event)" />
</template>

<script>
import inputMixin from '../mixins/inputMixin'
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Number, Boolean]
    }
  }
}
</script>

<style scoped>

</style>
