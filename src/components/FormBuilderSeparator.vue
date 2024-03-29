<template>
  <div class="form-builder-separator"
       :class="customClass">
    <b v-if="label">
      {{ label }}
    </b>
    <q-separator v-if="hasSize"
                 class="separator-default-style"
                 :name="name"
                 :style="{ 'border-top': borderTopStyle, 'border-left': borderLeftStyle }"
                 :class="[customClass ,[(vertical) ? 'separator-vertical' : 'separator-horizontal']]"
                 :vertical="vertical"
                 :inset="inset"
                 :spaced="spaced"
                 :size="size"
                 :dark="darkMode" />
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderSeparator',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    color: {
      type: String,
      default() {
        return 'dark'
      }
    },
    size: {
      type: String,
      default() {
        return '1px'
      }
    },
    darkMode: {
      type: Boolean,
      default() {
        return false
      }
    },
    vertical: {
      type: Boolean,
      default() {
        return false
      }
    },
    label: {
      type: String,
      default() {
        return ''
      }
    },
    spaced: {
      type: [String, Boolean],
      default() {
        return false
      }
    },
    separatorType: {
      type: String,
      default() {
        return 'solid'
      }
    },
    borderSize: {
      type: String,
      default() {
        return ''
      }
    },
    inset: {
      type: [String, Boolean],
      default() {
        return false
      }
    }
  },
  data() {
    return {
      colorTypes: ['#', 'rgb', 'rgba']
    }
  },
  computed: {
    hasSize() {
      return this.size && (this.size !== '0') && (this.size !== '0px')
    },
    borderTopStyle() {
      return this.getBorderStyle('top')
    },
    borderLeftStyle() {
      return this.getBorderStyle('left')
    },
    getSeparatorColor() {
      if (
        this.colorTypes
          .map((item) => this.color.includes(item))
          .filter((item) => !!item).length > 0
      ) {
        return this.color
      }
      return 'var(--q-' + this.color + ')'
    }
  },
  methods: {
    getBorderStyle(type) {
      let style = ''
      if (
        ((type === 'top' && !this.vertical) ||
          (type === 'left' && this.vertical)) &&
        this.separatorType &&
        this.size
      ) {
        style =
          this.size + ' ' + this.separatorType + ' ' + this.getSeparatorColor
      }
      return style
    }
  }
}
</script>

<style scoped lang="scss">
.separator-default-style {
  background: none;
}
.separator-horizontal {
  min-height: 0 !important;
  height: 0 !important;
}
.separator-vertical {
  min-width: 1px !important;
}
</style>
