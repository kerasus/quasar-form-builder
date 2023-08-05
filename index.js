import FormBuilder from './src/FormBuilder.vue'
import inputMixin from './src/mixins/inputMixin.js'
import * as FormBuilderAssist from './src/assist.js'
import FormBuilderGenerator from './src/components/formBuilderGenerator.vue'
const FormBuilderObject = { FormBuilder, inputMixin, FormBuilderGenerator }

export {
  FormBuilder,
  inputMixin,
  FormBuilderAssist,
  FormBuilderGenerator,
  FormBuilderObject as default
}
