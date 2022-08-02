<template>
  <div class="outsideLabel">{{placeholder? label : null}}</div>
  <q-input v-model="inputData" :label="placeholder? null : label" :stack-label="!!placeholder" :type="type" :disable="disable" :rounded="rounded"  :placeholder="placeholder" @update:model-value="change($event)" />
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
