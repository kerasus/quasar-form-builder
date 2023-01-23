<template>
  <q-btn :label="label"
         :align="align"
         :flat="flat"
         :color="color"
         :text-color="textColor"
         :size="size"
         :padding="padding"
         :icon="icon"
         :stack="stack"
         :stretch="stretch"
         :icon-right="iconRight"
         :no-wrap="noWrap"
         :unelevated="unelevated"
         :dense="dense"
         :rounded="rounded"
         :push="push"
         :square="square"
         :glossy="glossy"
         :outline="outline"
         :loading="loading"
         :disable="disable"
         :percentage="percentage"
         :class="customClass"
         :input-class="customClass"
         @click="onClick"
         @keypress="onKeyPress" />
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderSubmit',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    size: {
      default: '',
      type: String
    },
    padding: {
      default: '',
      type: String
    },
    color: {
      default: 'primary',
      type: String
    },
    textColor: {
      default: undefined,
      type: String
    },
    icon: {
      default: '',
      type: String
    },
    iconRight: {
      default: '',
      type: String
    },
    align: {
      default: undefined,
      type: String,
      validator(value) {
        return ['left' | 'right' | 'center' | 'around' | 'between' | 'evenly' | undefined].includes(value)
      }
    },
    dense: {
      default: false,
      type: Boolean
    },
    outline: {
      default: false,
      type: Boolean
    },
    flat: {
      default: false,
      type: Boolean
    },
    unelevated: {
      default: false,
      type: Boolean
    },
    rounded: {
      default: false,
      type: Boolean
    },
    push: {
      default: false,
      type: Boolean
    },
    square: {
      default: false,
      type: Boolean
    },
    glossy: {
      default: false,
      type: Boolean
    },
    noWrap: {
      default: false,
      type: Boolean
    },
    stack: {
      default: false,
      type: Boolean
    },
    stretch: {
      default: false,
      type: Boolean
    },
    percentage: {
      default: 0,
      type: Number
    }
  }
}
</script>
