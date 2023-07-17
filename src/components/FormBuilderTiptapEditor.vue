<template>
  <div class="form-builder-vueTiptaKatex"
       :class="customClass">
    <p v-text="label" />
    <!--    <vue-tiptap-katex v-if="!disable && !readonly"-->
    <!--                      ref="tiptap"-->
    <!--                      v-model="inputData"-->
    <!--                      :name="name"-->
    <!--                      :bubble-menu="false"-->
    <!--                      :floating-menu="false"-->
    <!--                      :options="options"-->
    <!--                      :class="customClass"-->
    <!--                      @update:model-value="change($event)"-->
    <!--                      @click="onClick" />-->
    <q-editor v-if="!disable && !readonly"
              v-model="inputData"
              :class="customClass"
              :content-class="customClass"
              :name="name"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token', 'hr', 'link', 'custom_btn'],
                ['print', 'fullscreen'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7',
                    ],
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana',
                    ],
                  },
                  'removeFormat',
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                ['undo', 'redo'],
                ['viewsource'],
              ]"
              :fonts="{
                IRANSans: 'IRANSans',
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana',
              }"
              @update:model-value="change($event)"
              @click="onClick" />
    <!--eslint-disable-next-line-->
    <div v-else v-html="inputData"/>
  </div>
</template>

<script>
// import { VueTiptapKatex } from 'vue3-tiptap-katex'
import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderTiptapEditor',
  // components: {
  //   VueTiptapKatex
  // },
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Number, Boolean]
    },
    options: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  watch: {
    value(newValue) {
      if (newValue === false) {
        this.inputData = ''
      }
    }
  },
  created() {
    if (this.inputData === false) {
      this.inputData = ''
    }
  },
  methods: {
    setNewContent(val) {
      this.$refs.tiptap.setContent(val)
    }
  }
}
</script>

<style scoped></style>
