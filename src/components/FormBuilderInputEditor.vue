<template>
  <div class="form-builder-editor">
    <q-editor v-if="ggggg !== undefined"
              v-model="ggggg" />
  </div>
</template>

<script>
export default {
  name: 'FormBuilderInputEditor',
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  data() {
    return {
      ggggg: this.value // Initialize with the value prop
    }
  },
  watch: {
    // When value prop changes, update ggggg
    value(newValue) {
      if (newValue !== this.ggggg) {
        this.ggggg = newValue
      }
    },
    // When ggggg changes, emit the new value
    ggggg(newValue) {
      this.$emit('update:value', newValue)
    }
  }
}
</script>
