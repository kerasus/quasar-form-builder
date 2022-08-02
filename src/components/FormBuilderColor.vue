<template>
  <q-input
      v-model="inputData"
      :label="label"
      :disable="disable"
      :rules="rules"
      :lazy-rules="lazyRules"
  >
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="inputData" square flat
                   default-value="#4b9c70ff"
                   :palette="palette"
                   @update:model-value="change($event)"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import inputMixin from '../mixins/inputMixin'
export default {
  name: 'FormBuilderColor',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean]
    },
    palette: {
      default: () => [], // ['#019A9D', '#D9B801', '#E8045A', '#B2028A']
      type: Array
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
