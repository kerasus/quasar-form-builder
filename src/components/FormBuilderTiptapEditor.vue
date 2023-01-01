<template>
  <div>
    <p v-text="label"/>
    <vue-tiptap-katex
      v-if="!disable && !readonly"
      ref="tiptap"
      v-model="inputData"
      :name="name"
      :bubble-menu="false"
      :floating-menu="false"
      :options="options"
      :class="customClass"
      @update:model-value="change($event)"
      @click="onClick"
    />
    <!--eslint-disable-next-line-->
    <div v-else v-html="inputData"/>
  </div>
</template>

<script>
import VueTiptapKatex from 'vue3-tiptap-katex';
import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderInputEditor',
  components: {
    VueTiptapKatex,
  },
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [String, Number, Boolean],
    },
    options: {
      default: () => {
        return {};
      },
      type: Object,
    },
  },
  watch: {
    value(newValue) {
      if (newValue === false) {
        this.inputData = '';
      }
    },
  },
  created() {
    if (this.inputData === false) {
      this.inputData = '';
    }
  },
  methods: {
    setNewContent(val) {
      this.$refs.tiptap.setContent(val)
    }
  }
};
</script>

<style scoped></style>
