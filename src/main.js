import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import JsonViewer from 'vue-json-viewer'

createApp(App).use(Quasar, quasarUserOptions).use(JsonViewer).mount('#app')
