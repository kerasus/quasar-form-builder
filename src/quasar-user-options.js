import './styles/quasar.scss'
import lang from 'quasar/lang/fa-IR'
import '@quasar/extras/material-icons/material-icons.css'
import {
  QBtnToggle,
  QOptionGroup,
  QRange,
  QBadge,
  QItem,
  QItemSection,
  QImg,
  QFile,
  ClosePopup,
  QEditor,
  QTime,
  QDate,
  QMenu,
  QColor,
  QPopupProxy,
  QToolbarTitle,
  QPageContainer,
  QBanner,
  QCard,
  QToolbar,
  QHeader,
  QCheckbox,
  QLayout,
  QCardSection,
  QBtn,
  QInput,
  QSeparator,
  QSelect,
  QIcon
} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  lang,
  plugins: {},
  // Use Quasar with all components and extras
  components: {
    QBtnToggle,
    QOptionGroup,
    QRange,
    QBadge,
    QItem,
    QItemSection,
    QImg,
    QFile,
    QTime,
    QDate,
    QMenu,
    QColor,
    QEditor,
    QPopupProxy,
    QToolbarTitle,
    QPageContainer,
    QBanner,
    QCard,
    QToolbar,
    QHeader,
    QCheckbox,
    QLayout,
    QCardSection,
    QBtn,
    QInput,
    QSeparator,
    QSelect,
    QIcon
  },
  directives: {
    ClosePopup
  },
  iconSet: 'material-icons' // Ensure you're using the correct icon set
  // components: 'all', // Ensure all components are imported automatically
  // directives: 'all' // Ensures directives are globally available

  // Register all components globally
  // app: (app) => {
  //   app.use(Quasar, {
  //     config: {}, // Optional: any configuration you need
  //     lang,
  //     iconSet: 'material-icons', // Make sure to specify the icon set
  //     components: true, // This ensures all Quasar components are globally registered
  //     directives: true, // This registers all Quasar directives (e.g., `v-close-popup`)
  //     plugins: true // This enables any Quasar plugins you want
  //   })
  // }
}
