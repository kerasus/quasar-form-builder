<template>
  <div class="outsideLabel">{{placeholder? label : null}}</div>
  
  <q-select
    v-model="inputData"
    transition-show="jump-down"
    transition-hide="jump-up"
    :option-value="optionValue"
    :option-label="optionLabel"
    :option-disable="optionDisable"
    :options="filteredOptions"
    :label="placeholder? null : label"
    :stack-label="!!placeholder"
    :placeholder="!!inputData? '':placeholder"
    :rules="rules"
    :lazy-rules="lazyRules"
    :multiple="multiple"
    :use-chips="useChips"
    use-input
    input-debounce="500"
    :disable="disable"
    emit-value
    :outlined="outlined"
    map-options
    clearable
    @update:model-value="change($event)"
    @new-value="createValue"
    @filter="filterFn"
  >
    <template #no-option>
      <q-item>
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
  },
  data() {
    return {
      model: null,
      filteredOptions: this.options,
      test: null
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

      if (val.length > 0) {
        if (!this.filteredOptions.includes(val)) {
          this.filteredOptions.push(val);
        }
        done(val, 'toggle');
      }
    },
  },
};
</script>

<style scoped></style>
