<template>
  <div class="row">
    <div
        v-for="(input, inputIndex) in inputData"
        :key="inputIndex"
        :class="[
        input.col ? input.col : 'col',
        getComponent(input) !== 'form-builder'
          ? 'q-pa-md'
          : getComponent(input),
        // eslint-disable-next-line vue/comma-dangle
        getComponent(input) + '-col',
      ]"
    >
      <div v-if="showGeneratorButtons">
        <q-btn size="xs"
               round
               color="primary"
               @click="edit(inputIndex)"
        >
          edit
        </q-btn>
        <q-btn
            size="xs"
            round
            class="q-ml-xs"
            color="red"
            @click="remove(inputIndex)"
        >
          x
        </q-btn>
      </div>
      <component
          :is="getComponent(input)"
          v-model:value="input.value"
          v-bind="input"
          :disable="disable"
          :readonly="readonly"
          @update:value="onValueUpdated"
          @input="change($event, inputIndex)"
          @change="change($event, inputIndex)"
          @onClick="onClick($event, input)"
      />
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';
import inputMixin from './mixins/inputMixin';

export default {
  name: 'FormBuilder',
  components: {
    FormBuilder: defineAsyncComponent(() => import('./FormBuilder.vue')),
    FormBuilderFile: defineAsyncComponent(() =>
        import('./components/FormBuilderFile')
    ),
    FormBuilderInput: defineAsyncComponent(() =>
        import('./components/FormBuilderInput')
    ),
    FormBuilderInputEditor: defineAsyncComponent(() =>
        import('./components/FormBuilderInputEditor')
    ),
    FormBuilderTiptapEditor: defineAsyncComponent(() =>
        import('./components/FormBuilderTiptapEditor')
    ),
    FormBuilderAvatar: defineAsyncComponent(() =>
        import('./components/FormBuilderAvatar')
    ),
    FormBuilderSelect: defineAsyncComponent(() =>
        import('./components/FormBuilderSelect')
    ),
    FormBuilderOptionGroup: defineAsyncComponent(() =>
        import('./components/FormBuilderOptionGroup')
    ),
    FormBuilderCheckbox: defineAsyncComponent(() =>
        import('./components/FormBuilderCheckbox')
    ),
    FormBuilderSlider: defineAsyncComponent(() =>
        import('./components/FormBuilderSlider')
    ),
    FormBuilderRangeSlider: defineAsyncComponent(() =>
        import('./components/FormBuilderRangeSlider')
    ),
    FormBuilderSpace: defineAsyncComponent(() =>
        import('./components/FormBuilderSpace')
    ),
    FormBuilderSeparator: defineAsyncComponent(() =>
        import('./components/FormBuilderSeparator')
    ),
    FormBuilderDateTime: defineAsyncComponent(() =>
        import('./components/FormBuilderDateTime')
    ),
    FormBuilderColor: defineAsyncComponent(() =>
        import('./components/FormBuilderColor.vue')
    ),
    FormBuilderToggleButton: defineAsyncComponent(() =>
        import('./components/FormBuilderToggleButton')
    ),
  },
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: Array,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    showGeneratorButtons: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['input', 'onClick'],
  data() {
    return {
      currentInput: null,
      optionGroupType: null,
      dateTime_Range: null,
      dateTime_Multiple: null,
      dateTime_Time: null,
    };
  },
  methods: {
    onClick(event, input) {
      function getEvent(data) {
        if (data.event) {
          return getEvent(data.event);
        }

        return data;
      }

      const absEvent = getEvent(event);
      this.$emit('onClick', {event: absEvent, input});
    },
    getFormData() {
      const formHasFileInput = this.formHasFileInput();
      const formData = formHasFileInput ? new FormData() : {};
      const inputs = this.getValues();
      inputs.forEach((item) => {
        if (
            item.disable ||
            typeof item.value === 'undefined' ||
            item.value === null
        ) {
          return;
        }

        if (item.type === 'file' && !this.isFile(item.value)) {
          return;
        }

        if (formHasFileInput) {
          formData.append(item.name, item.value);
        } else {
          this.createChainedObject(formData, item.name, item.value);
        }
      });

      return formData;
    },
    formHasFileInput() {
      const inputs = this.getValues();
      const target = inputs.find((item) => item.type === 'file');
      return !!target;
    },
    isFile(file) {
      return file instanceof File;
    },
    createChainedObject(formData, chainedName, value) {
      let keysArray = chainedName;
      if (typeof chainedName === 'string') {
        keysArray = chainedName.split('.');
      }
      if (keysArray.length === 1) {
        formData[keysArray[0]] = value;
      } else {
        if (typeof formData[keysArray[0]] === 'undefined') {
          formData[keysArray[0]] = {};
        }
        const newKeysArray = keysArray.filter((item, index) => index !== 0);
        this.createChainedObject(formData[keysArray[0]], newKeysArray, value);
      }
    },

    setInputValues(responseData, inputs) {
      const that = this;

      function setValueOfNestedInputData(responseData, inputs) {
        inputs.forEach((input) => {
          if (
              typeof input.responseKey === 'undefined' ||
              input.responseKey === null
          ) {
            return;
          }
          if (input.type === 'formBuilder') {
            setValueOfNestedInputData(responseData, input.value);
            return;
          }
          const validChainedObject = that.getValidChainedObject(
              responseData,
              input.responseKey
          );
          input.value = validChainedObject;
        });
      }

      if (!inputs) {
        inputs = this.inputData;
      }
      setValueOfNestedInputData(responseData, inputs);
    },
    getInputsByName(name) {
      let inputs = this.getValues();
      let founded = inputs.filter((input) => {
        if (input.name === name) {
          return input;
        }
      });
      console.log(founded);
      return founded;
    },
    setInputByName(name, value) {
      let inputs = this.getValues();
      let founded = inputs.find((input) => {
        if (input.name === name) {
          input.value = value;
        }
      });
      return founded;
    },
    getValidChainedObject(object, keys) {
      if (!Array.isArray(keys) && typeof keys !== 'string') {
        console.warn('keys must be array or string');
        return false;
      }

      if (keys === '') {
        return object;
      }

      let keysArray = keys;
      if (typeof keys === 'string') {
        keysArray = keys.split('.');
      }

      if (keysArray.length === 1) {
        if (!object || typeof object[keysArray[0]] === 'undefined') {
          return null;
        }
        return object[keysArray[0]];
      }

      if (
          typeof object[keysArray[0]] !== 'undefined' &&
          object[keysArray[0]] !== null
      ) {
        return this.getValidChainedObject(
            object[keysArray[0]],
            keysArray.splice(1)
        );
      }

      return (
          typeof object[keysArray[0]] !== 'undefined' &&
          object[keysArray[0]] !== null
      );
    },

    getComponent(input) {
      if (typeof input.type === 'object') {
        return {...input.type};
      }
      if (input.type === 'formBuilder') {
        return 'form-builder';
      }
      if (
          input.type === 'optionGroupRadio' ||
          input.type === 'optionGroupCheckbox' ||
          input.type === 'optionGroupToggle'
      ) {
        return 'form-builder-option-group';
      }
      if (
          input.type === 'dateMultipleRange' ||
          input.type === 'dateRange' ||
          input.type === 'date' ||
          input.type === 'dateTime' ||
          input.type === 'time'
      ) {
        return 'form-builder-date-time';
      }
      if (input.type === 'toggleButton') {
        return 'form-builder-toggle-button';
      }
      return 'form-builder-' + input.type;
    },
    getOptionGroupType(input) {
      if (input.type === 'optionGroupRadio') {
        return 'radio';
      } else if (input.type === 'optionGroupCheckbox') {
        return 'checkbox';
      } else if (input.type === 'optionGroupToggle') {
        return 'toggle';
      }

      return null;
    },
    isMultiple(input) {
      return input.multiple || input.type === 'dateMultipleRange';
    },
    isRange(input) {
      return input.type === 'dateMultipleRange' || input.type === 'dateRange';
    },
    isTime(input) {
      return input.type === 'time' || input.type === 'dateTime';
    },
    isDate(input) {
      return input.type === 'date' || input.type === 'dateTime';
    },
    change(event, inputIndex) {
      if (
          typeof event.target !== 'undefined' &&
          typeof event.target.files !== 'undefined' &&
          event.target.files[0]
      ) {
        this.inputData[inputIndex].value = event.target.files[0];
      } else {
        this.inputData[inputIndex].value = event;
      }

      // this.inputData.value = inputValue
      this.$emit('input', this.inputData);
    },
    onValueUpdated() {
      this.$emit('update:value', this.inputData);
    },
    remove(i) {
      this.inputData.splice(i, 1);
      this.onValueUpdated();
    },
    edit(i) {
      this.$emit('edit', i);
    },
  },
};
</script>

<style scoped>
.form-builder-hidden-col {
  display: none;
}
</style>
