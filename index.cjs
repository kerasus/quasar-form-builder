const FormBuilder = require('./src/FormBuilder.vue').default
const inputMixin = require('./src/mixins/inputMixin.js').default
const FormBuilderGenerator = require('./src/components/formBuilderGenerator.vue').default

const FormBuilderObject = { FormBuilder, inputMixin, FormBuilderGenerator }

module.exports = FormBuilderObject
module.exports.default = FormBuilderObject