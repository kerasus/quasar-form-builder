<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <q-select
    v-model="inputData"
    transition-show="jump-down"
    transition-hide="jump-up"
    :option-value="optionValue"
    :option-label="optionLabel"
    :option-disable="optionDisable"
    :options="filteredOptions"
    :label="placeholder ? null : label"
    :stack-label="!!placeholder"
    :placeholder="placeholderSetter"
    :rules="rules"
    :lazy-rules="lazyRules"
    :multiple="multiple"
    :use-chips="useChips"
    use-input
    input-debounce="500"
    :disable="disable"
    :readonly="readonly"
    emit-value
    :outlined="outlined"
    :hide-dropdown-icon = "hideDropdownIcon"
    map-options
    clearable
    @update:model-value="change($event)"
    @new-value="createValue"
    @filter="filterFn"
    @click="onClick"
  >
    <template #no-option>
      <q-item v-show="showNoOption">
        <q-item-section class="text-grey"> موردی یافت نشد </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import inputMixin from '../mixins/inputMixin';
export default {
  name: 'FormBuilderSelect',
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean],
    },
    options: {
      default: () => [],
      type: Array,
    },
    optionDisable: {
      default: 'disable',
      type: String,
    },
    newValueMode: {
      default: 'add-unique',
      type: String
    },
    hideDropdownIcon: {
      default: false,
      type: Boolean
    },
    showNoOption: {
      default: true,
      type: Boolean
    },
  },
  data() {
    return {
      model: null,
      filteredOptions: this.options,
    };
  },
  methods: {
    filterFn(val, update) {
      const isObjectList =
        this.options.length > 0 && typeof this.options[0] === 'object';

      if (val === '') {
        update(() => {
          this.filteredOptions = this.options;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredOptions = this.options.filter((v) => {
          const itemLabel = isObjectList ? v[this.optionLabel] : v;
          return itemLabel.toString().toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    createValue(val, done) {
      if (!this.createNewValue) {
        return;
      }
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string


      //mr kerasus : why im wrote this code?
      // if (val.length > 0) {
      //   if (!this.filteredOptions.includes(val)) {
      //     this.filteredOptions.push(val);
      //   }
      //   done(val, 'toggle');
      // }
        done(val, this.newValueMode);
    },
    test(){
      this.inputData = []
    }
  },
  computed: {
    placeholderSetter() {
      if(this.inputData === null){
        return this.placeholder
      }
      // in single select after setting value,
      // v-model type changes to string
      if (typeof this.inputData === 'string') {
        return '';
      }
      // in the multiple scenario, inputData type changes to Array!
      if (this.multiple) {
        if (this.inputData.length == 0) {
        return this.placeholder;
        }
          return '';
      }
      // be an object
      if (Object.keys(this.inputData).length === 0) {
        return this.placeholder
      }
      return '';
    },
  },

};
</script>

<style scoped></style>
