import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import quasarConfig from '../quasar.config'

// Import your library components for testing
import { FormBuilder } from './index'

const app = createApp(App)
app.use(Quasar, quasarConfig())
// Register your library components globally for testing
app.component('FormBuilder', FormBuilder)
app.mount('#app')
