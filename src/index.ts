import { defineAppExtension } from '@quasar/app-vite'

export default defineAppExtension((api) => {
  // Ensure compatibility with the host app's Quasar version
  api.compatibleWith('quasar', '^2.0.0')

  // Extend Quasar configuration
  api.extendQuasarConf((conf) => {
    // Register the boot file
    conf.boot.push('~quasar-app-extension-form-builder/src/boot/form-builder')

    // Ensure the boot file is transpiled
    conf.build.transpileDependencies.push(/quasar-app-extension-form-builder[\\/]src[\\/]boot/)
  })
})

// import FormBuilder from './components/FormBuilder.vue'
// import FormBuilderGenerator from './components/GeneratorPanel/GeneratorPanel.vue'
//
// // Mixins
// import inputMixin from './mixins/inputMixin.js'
//
// // Utilities
// import * as FormBuilderAssist from './assist.js'
//
// // Export components, mixins, and utilities
// export {
//   inputMixin,
//   FormBuilder,
//   FormBuilderAssist,
//   FormBuilderGenerator
// }
//
// // Default export for backward compatibility
// export default {
//   inputMixin,
//   FormBuilder,
//   FormBuilderAssist,
//   FormBuilderGenerator
// }
