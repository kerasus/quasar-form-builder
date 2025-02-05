import { boot } from 'quasar/wrappers'
import FormBuilder from '../components/FormBuilder.vue'

export default boot(({ app }) => {
  // Register the FormBuilder component globally
  app.component('FormBuilder', FormBuilder)
})
