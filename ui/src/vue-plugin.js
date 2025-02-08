import FormBuilder from './components/FormBuilder.vue'
// import FormBuilderTime from './components/controls/FormBuilderTime.vue'
// import FormBuilderFile from './components/controls/FormBuilderFile.vue'
// import FormBuilderDate from './components/controls/FormBuilderDate.vue'
// import FormBuilderColor from './components/controls/FormBuilderColor.vue'
// import FormBuilderInput from './components/controls/FormBuilderInput.vue'
// import FormBuilderSlider from './components/controls/FormBuilderSlider.vue'
// import FormBuilderButton from './components/controls/FormBuilderButton.vue'
// import FormBuilderSelect from './components/controls/FormBuilderSelect.vue'
// import FormBuilderCheckbox from './components/controls/FormBuilderCheckbox.vue'
// import FormBuilderDateTime from './components/controls/FormBuilderDateTime.vue'
// import FormBuilderSeparator from './components/controls/FormBuilderSeparator.vue'
// import FormBuilderOptionGroup from './components/controls/FormBuilderOptionGroup.vue'
// import FormBuilderRangeSlider from './components/controls/FormBuilderRangeSlider.vue'
// import FormBuilderToggleButton from './components/controls/FormBuilderToggleButton.vue'


const version = __UI_VERSION__

function install (app) {
  app.component(FormBuilder.name, FormBuilder)
  // app.component(FormBuilderTime.name, FormBuilderTime)
  // app.component(FormBuilderFile.name, FormBuilderFile)
  // app.component(FormBuilderDate.name, FormBuilderDate)
  // app.component(FormBuilderColor.name, FormBuilderColor)
  // app.component(FormBuilderInput.name, FormBuilderInput)
  // app.component(FormBuilderSlider.name, FormBuilderSlider)
  // app.component(FormBuilderButton.name, FormBuilderButton)
  // app.component(FormBuilderSelect.name, FormBuilderSelect)
  // app.component(FormBuilderCheckbox.name, FormBuilderCheckbox)
  // app.component(FormBuilderDateTime.name, FormBuilderDateTime)
  // app.component(FormBuilderSeparator.name, FormBuilderSeparator)
  // app.component(FormBuilderOptionGroup.name, FormBuilderOptionGroup)
  // app.component(FormBuilderRangeSlider.name, FormBuilderRangeSlider)
  // app.component(FormBuilderToggleButton.name, FormBuilderToggleButton)
}

export {
  version,
  FormBuilder,
  install
}
