import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-form-builder'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
