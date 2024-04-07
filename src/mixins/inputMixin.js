import * as shvl from 'shvl'

export default {
  props: {
    name: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    },
    filled: {
      default: false,
      type: Boolean
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    },
    color: {
      default: 'primary',
      type: String
    },
    behavior: {
      default: 'default',
      type: String
    },
    type: {
      default: 'radio', // checkbox-toggle
      // Object type is for custom components
      type: [String, Object]
    },
    inline: {
      default: true,
      type: Boolean
    },
    dense: {
      default: true,
      type: Boolean
    },
    rounded: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: false,
      type: Boolean
    },
    range: {
      default: false,
      type: Boolean
    },
    useChips: {
      default: false,
      type: Boolean
    },
    createNewValue: {
      default: false,
      type: Boolean
    },
    optionValue: {
      default: 'value',
      type: String
    },
    optionLabel: {
      default: 'label',
      type: String
    },
    size: {
      default: '50px',
      type: String
    },
    fontSize: {
      default: '14px',
      type: String
    },
    textColor: {
      default: 'white',
      type: String
    },
    icon: {
      default: '',
      type: String
    },
    class: {
      default: '',
      type: String
    },
    options: {
      default: () => [],
      type: Array
    },
    hidden: {
      default: false,
      type: Boolean
    },
    src: {
      default: '',
      type: [String, Number, Boolean, Array, Boolean]
    },
    responseKey: {
      default: () => {
        return {}
      },
      type: [String, Number, Boolean, Array, Boolean, Object]
    },
    ripple: {
      default: false,
      type: [Boolean, Object]
    },
    outlined: {
      default: false,
      type: [Boolean]
    },
    flat: {
      default: false,
      type: [Boolean]
    },
    placeholder: {
      default: '',
      type: String
    },
    rules: {
      default: () => [],
      type: [Array]
    },
    lazyRules: {
      default: false,
      type: [Boolean]
    },
    col: {
      default: '',
      type: String
    },
    customLabelStyle: {
      default: '',
      type: String
    },
    inputType: {
      default: 'text',
      type: String
    },
    clearable: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    customClass () {
      return this.class
    }
  },
  watch: {
    value () {
      this.inputData = this.value
    }
  },
  emits: ['update:value', 'input', 'change', 'onClick', 'onKeyPress'],
  data () {
    return {
      inputData: null
    }
  },
  created () {
    this.inputData = this.value
  },
  methods: {
    onClick (data) {
      this.$emit('onClick', data)
    },
    onKeyPress (data) {
      this.$emit('onKeyPress', data)
    },
    change (val) {
      this.$emit('update:value', val)
    },
    normalizeInput (input) {
      const ignoreValueTypes = [
        'separator',
        'formBuilder',
        'button'
      ]
      if (ignoreValueTypes.includes(input.type) && typeof input.ignoreValue === 'undefined') {
        input.ignoreValue = true
      }
      return input
    },
    getValues () {
      const that = this
      function getFlatInputs (inputs) {
        let values = []
        inputs.forEach(input => {
          input = that.normalizeInput(input)
          if (input.type !== 'formBuilder') {
            values.push(input)
          } else {
            const formBuilderInputs = getFlatInputs(input.value)
            values = values.concat(formBuilderInputs)
          }
        })
        return values
      }

      return getFlatInputs(this.inputData)
    },
    getFormData() {
      const formHasFileInput = this.formHasFileInput()
      const formData = formHasFileInput ? new FormData() : {}
      const inputs = this.getValues().filter(item => !item.disable && !item.ignoreValue)
      inputs.forEach((item) => {
        if (
          item.type.toString().toLowerCase() === 'file' &&
            (
              (!this.isFile(item.value) && !item.sendNull) ||
                (!this.isFile(item.value) && item.sendNull && item.value !== null)
            )
        ) {
          return
        }

        if (formHasFileInput) {
          if (Array.isArray(item.value)) {
            item.value.forEach(arrayValue => {
              if (arrayValue !== null && typeof arrayValue !== 'undefined') {
                formData.append(item.name + '[]', arrayValue)
              }
            })
          } else {
            if (item.value !== null && typeof item.value !== 'undefined') {
              formData.append(item.name, item.value)
            }
          }
        } else {
          shvl.set(formData, item.name, item.value)
        }
      })

      return formData
    },
    formHasFileInput() {
      const inputs = this.getValues().filter(item => !item.disable && !item.ignoreValue && typeof item.value !== 'undefined' && item.value !== null)
      const target = inputs.find((item) => item.type === 'file' && this.isFile(item.value))
      return !!target
    },
    isFile(file) {
      return file instanceof File
    }
  }
}
