<template>
  <div>
    <b v-if="label">
      {{ label }}
    </b>
    <template v-if="separator">
      <q-separator
          class="separator-default-style"
          :style="{ 'border-top': borderTopStyle, 'border-left': borderLeftStyle }"
          :class="[ (vertical) ? 'separator-vertical' : 'separator-horizontal' ]"
          :vertical="vertical"
          :inset="inset"
          :spaced="spaced"
          :size="size"
          :dark="darkMode"
      />
    </template>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin'

export default {
  name: 'FormBuilderSeparator',
  mixins: [inputMixin],
  data () {
    return {
      colorTypes: ['#', 'rgb', 'rgba']
    }
  },
  props: {
    color: {
      type: String,
      default () {
        return 'dark'
      }
    },
    size: {
      type: String,
      default () {
        return '1px'
      }
    },
    separator: {
      type: Boolean,
      default () {
        return true
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
    label: {
      type: String,
      default () {
        return ''
      }
    },
    spaced: {
      type: [String, Boolean],
      default () {
        return false
      }
    },
    separatorType: {
      type: String,
      default () {
        return 'solid'
      }
    },
    borderSize: {
      type: String,
      default () {
        return ''
      }
    },
    inset: {
      type: [String, Boolean],
      default () {
        return false
      }
    }
  },
  methods: {
    getBorderStyle (type) {
      let style = ''
      if (((type === 'top' && !this.vertical) || (type === 'left' && this.vertical)) && this.separatorType && this.size) {
        style = this.size + ' ' + this.separatorType + ' ' + this.getSeparatorColor
      }
      return style
    }
  },
  computed: {
    borderTopStyle () {
      return this.getBorderStyle('top')
    },
    borderLeftStyle () {
      return this.getBorderStyle('left')
    },
    getSeparatorColor() {
      if (this.colorTypes.map(item => this.color.includes(item)).filter(item => !!item).length > 0) {
        return this.color
      }
      return 'var(--q-' + this.color + ')'
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
