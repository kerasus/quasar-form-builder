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
    lazyRules:{
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
    }
  },
  watch: {
    value () {
      this.inputData = this.value
    }
  },
  emits: ['update:value', 'input', 'change', 'onClick'],
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
    change (val) {
      this.$emit('update:value', val)
    },
    getValues () {
      function getFlatInputs (inputs) {
        let values = []
        inputs.forEach( input => {
          if (input.type !== 'formBuilder') {
            values.push(input)
          } else {
            const formBuilderInputs = getFlatInputs(input.value)
            values = values.concat(formBuilderInputs);
          }
        })
        return values
      }

      return getFlatInputs(this.inputData)
    },

  }
}
