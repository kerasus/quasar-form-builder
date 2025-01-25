import FormBuilder from './FormBuilder.vue'
import FormBuilderGenerator from './components/GeneratorPanel/GeneratorPanel.vue'

// Mixins
import inputMixin from './mixins/inputMixin.js'

// Utilities
import * as FormBuilderAssist from './assist.js'

// Export components, mixins, and utilities
export {
  inputMixin,
  FormBuilder,
  FormBuilderAssist,
  FormBuilderGenerator
}

// Default export for backward compatibility
export default {
  inputMixin,
  FormBuilder,
  FormBuilderAssist,
  FormBuilderGenerator
}
