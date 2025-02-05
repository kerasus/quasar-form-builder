import { configure } from 'quasar/wrappers'

export default configure(function (/* ctx */) {
  return {
    framework: {
      components: [
        'QBtnToggle',
        'QOptionGroup',
        'QRange',
        'QBadge',
        'QItem',
        'QItemSection',
        'QImg',
        'QFile',
        'QTime',
        'QDate',
        'QMenu',
        'QColor',
        'QEditor',
        'QPopupProxy',
        'QToolbarTitle',
        'QPageContainer',
        'QBanner',
        'QCard',
        'QToolbar',
        'QHeader',
        'QCheckbox',
        'QLayout',
        'QCardSection',
        'QBtn',
        'QInput',
        'QSeparator',
        'QSelect',
        'QIcon'
      ],
      directives: ['ClosePopup'],
      plugins: {},
      iconSet: 'material-icons',
      lang: 'fa-IR'
    },
    cssAddon: true
  }
})
