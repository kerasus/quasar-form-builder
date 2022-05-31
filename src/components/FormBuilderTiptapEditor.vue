<template>
  <p v-text="label"/>
  <vue-tiptap-katex
      v-if="!disable"
      v-model="inputData"
      :bubble-menu="false"
      :floating-menu="false"
      :options="{ bubbleMenu: false, floatingMenu: false, uploadServer }"
      @update:model-value="change($event)"
  />
  <!--eslint-disable-next-line-->
  <div v-else v-html="inputData" />
</template>

<script>
import VueTiptapKatex from 'vue3-tiptap-katex'
import inputMixin from '../mixins/inputMixin'

export default {
  name: 'FormBuilderInputEditor',
  mixins: [inputMixin],
  components: {
    VueTiptapKatex,
  },
  props: {
    value: {
      default: '',
      type: [String, Number, Boolean]
    },
    uploadServer: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  watch: {
    value (newValue) {
      if (newValue === false) {
        this.inputData = ''
      }
    }
  },
  created () {
    if (this.inputData === false) {
      this.inputData = ''
    }
  }
}
</script>

<style scoped>

</style>
