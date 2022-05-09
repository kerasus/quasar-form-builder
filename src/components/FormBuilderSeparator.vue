<template>
  <div>
    <b v-if="label">
      {{ label }}
    </b>
    <template v-if="separator">
      <q-separator
          :vertical="vertical"
          :inset="inset"
          :spaced="spaced"
          :color="color"
          :size="size"
          :dark="darkMode"
      />
    </template>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin'

export default {
  name: "FormBuilderSeparator",
  mixins: [inputMixin],
  props: {
    size: {
      type: String,
      default () {
        return ''
      }
    },
    separator: {
      type: Boolean,
      default () {
        return false
      }
    },
    darkMode: {
      type: Boolean,
      default () {
        return false
      }
    },
    vertical: {
      type: Boolean,
      default () {
        return false
      }
    },
    spaced: {
      type: [String, Boolean],
      default () {
        return false
      }
    },
    inset: {
      type: [String, Boolean],
      default () {
        return false
      }
    }
  }

}
</script>

<style scoped>

</style>
