import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

// Import your library components for testing
import { FormBuilder } from './index'

const app = createApp(App)
app.use(Quasar, quasarUserOptions)

// Register your library components globally for testing
app.component('FormBuilder', FormBuilder)

app.mount('#app')
