<template>
  <div class="form-builder-color"
       :class="customClass">
    <q-input ref="input"
             v-model="inputData"
             :name="name"
             :disable="disable"
             :filled="filled"
             :label="placeholder ? null : label"
             :stack-label="!!placeholder"
             :outlined="outlined"
             :placeholder="placeholder"
             :loading="loading"
             :clearable="clearable"
             :rules="rules"
             :lazy-rules="lazyRules"
             :class="customClass"
             @click="showing = true">
      <template v-slot:append>
        <q-icon name="colorize"
                class="cursor-pointer">
          <q-menu v-if="!readonly"
                  v-model="showing">
            <q-color v-model="inputData"
                     square
                     flat
                     default-value="#4b9c70ff"
                     :palette="palette"
                     @update:model-value="change($event)"
                     @click="onClick" />
          </q-menu>
        </q-icon>
      </template>
    </q-input>
    <component :is="'style'">
      .q-field[uid-code="{{colorPickerElCode}}"] .q-field__inner .q-field__control {
      background: {{ inputData }};
      }
    </component>
  </div>
</template>

<script>
import { uid } from 'quasar'
import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderColor',
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
    palette: {
      default: () => [], // ['#019A9D', '#D9B801', '#E8045A', '#B2028A']
      type: Array
    }
  },
  data() {
    return {
      colorPickerElCode: null,
      showing: false
    }
  },
  mounted() {
    this.colorPickerElCode = uid()
    this.$refs.input.$el.setAttribute('uid-code', this.colorPickerElCode)
  },
  methods: {}
}
</script>

<style scoped>
.form-builder-color {
  background: red;
}
</style>
