import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QFormBuilder',

  setup () {
    return () => h(QBadge, {
      class: 'QFormBuilder',
      label: 'QFormBuilder'
    })
  }
}
