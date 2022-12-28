'use strict'

const FormBuilder = require('./src/FormBuilder')
const inputMixin = require('./src/mixins/inputMixin')
const FormBuilderGenerator = require('./src/components/formBuilderGenerator')
const FormBuilderObject = {FormBuilder, inputMixin, FormBuilderGenerator}

module.exports = FormBuilderObject
module.exports.default = FormBuilderObject
