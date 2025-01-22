// Import components
import FormBuilder from './FormBuilder.vue'
import FormBuilderGenerator from './components/GeneratorPanel/GeneratorPanel.vue'

// Import mixins
import inputMixin from './mixins/inputMixin.js'

// Import utilities
import * as FormBuilderAssist from './assist.js'

// Export individual components, mixins, and utilities
export { FormBuilder, FormBuilderGenerator, inputMixin, FormBuilderAssist }

// Export a default object for backward compatibility
const FormBuilderObject = {
  FormBuilder,
  inputMixin,
  FormBuilderGenerator,
  FormBuilderAssist
}

export default FormBuilderObject
