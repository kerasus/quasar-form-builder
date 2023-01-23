<template>
  <div>
    <div v-if="label"
         class="outsideLabel">
      {{ label }}
    </div>
    <q-option-group v-model="inputData"
                    :name="name"
                    :options="options"
                    :color="color"
                    :inline="inline"
                    :dense="dense"
                    :type="typeOfInput"
                    :disable="disable || readonly"
                    :class="customClass"
                    @update:model-value="change($event)"
                    @click="onClick">
      <template v-slot:label="opt">
        <q-icon v-if="opt.icon"
                :name="opt.icon"
                color="teal"
                size="1.5em"
                class="q-ml-sm" />
        <span v-if="opt.label">{{ opt.label }}</span>
        <div v-if="opt.caption"
             class="caption text-grey-8">
          {{ opt.caption }}
        </div>
      </template>
    </q-option-group>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderOptionGroup',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: null,
      type: [Object, String, Array, Number, Boolean]
    },
    options: {
      default: () => [], // { label: 'Option 1', value: 'op1' }
      type: Array
    },
    typeOfInput: {
      default: 'radio', // radio checkbox toggle
      type: String
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped></style>
