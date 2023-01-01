import FormBuilder from './src/FormBuilder.vue'
import inputMixin from './src/mixins/inputMixin.js'
import FormBuilderGenerator from './src/components/formBuilderGenerator.vue'
const FormBuilderObject = {FormBuilder, inputMixin, FormBuilderGenerator}

export {
    FormBuilderObject as default,
    FormBuilder,
    inputMixin,
    FormBuilderGenerator
}
