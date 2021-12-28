export default {
  props: {
    label: {
      default: '',
      type: String
    },
    disable: {
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
      type: String
    },
    inline: {
      default: true,
      type: Boolean
    },
    dense: {
      default: true,
      type: Boolean
    },
    multiple: {
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
    time: {
      default: false,
      type: Boolean
    },
    range: {
      default: false,
      type: Boolean
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
    hidden: {
      default: false,
      type: Boolean
    },
    src: {
      default: '',
      type: [String, Number, Boolean, Array, Boolean]
    }
  },
  watch: {
    value () {
      this.inputData = this.value
    }
  },
  emits: ['update:value', 'input', 'change'],
  data () {
    return {
      inputData: null
    }
  },
  created () {
    this.inputData = this.value
  },
  methods: {
    change (val) {
      this.$emit('update:value', val)
    }
  }
}
