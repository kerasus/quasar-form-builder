<template>
  <q-card class="q-ma-lg">
    <div class="top">
      <div class="title">Form Builder Generator</div>
      <q-btn
        v-show="state !== ''"
        class="back-btn"
        size="12px"
        rounded
        @click="back()"
        >back</q-btn
      >
    </div>
    <q-card-section>
      <p class="desc">
        Form builder is a tool for creating forms with ease and speed. Add
        inputs you want, and copy the generated json for using inside your
        project.
      </p>
      <q-btn v-if="state === ''" @click="state = 'chooseType'"
        >add new input</q-btn
      >
      <div class="controls">
        <div v-if="state === 'chooseType'">
          generating new input: <br />
          selected input: {{ type?.value }}
          <q-select
            v-model="type"
            option-value="value"
            :options="options"
            @update:model-value="newInputBuild()"
          ></q-select>
        </div>
        <div v-if="state === 'chooseConfig'">
          <!-- <div v-if="type.value === 'FormBuilderInput'"> -->
          <div>
            demo for {{ type.value }}:
            <p>
              note that <b>name</b> will be used for finding inputs, so it
              should be english and unique. <br />
              for custom css classes you can use <b>col</b> like this:
              'col-md-12 customClass' which customClass will be defined inside
              of your component, not here. <br />
              There are two options to show label in here, if you don't pass
              <b>placeholder</b> (remove it down here) label will float in style
              of material. Passing both placeholder and label to input will make
              label stick above the input. <br />
              If you use <b>select</b> and have options which will fetch from
              server, and you use <b>quasar-crud</b>, you can use
              <b>afterGetData</b> method from there to load those options to
              your input.
            </p>
            <div class="generated-element">
              <form-builder ref="formBuilder" v-model:value="newInput" />
            </div>
            <div class="q-mt-md">configs to tweak:</div>
            <div v-for="c in selectedConfig.value" :key="c">
              <q-input
                v-if="c.type === 'text'"
                :type="c.inputType"
                v-model="config[c.value]"
                :label="c.value"
              ></q-input>
              <q-toggle
                v-if="c.type === 'boolean'"
                v-model="config[c.value]"
                :label="c.value"
              />
              <q-select
                v-if="c.type === 'select'"
                v-model="config[c.value]"
                :label="c.value"
                :options="c.options"
              ></q-select>
              <div v-if="c.type === 'options'" class="options-generator">
                <div class="option-json">
                  Option Generator:
                  {{ generatedOptions }}
                </div>
                <div class="options-inputs">
                  <q-input v-model="optionLabel" label="label"></q-input>
                  <q-input v-model="optionValue" label="value"></q-input>
                  <q-btn @click="addToOptions()">add</q-btn>
                </div>
              </div>
            </div>
            <q-btn @click="submitConfig()" class="q-mt-md">submit</q-btn>
          </div>
        </div>
      </div>
      <div class="input-generator"></div>
    </q-card-section>
  </q-card>
  <q-card v-show="inputs.length" class="q-ma-lg">
    <div class="title">Generated Form</div>
    inputs : {{ inputs }}

    <form-builder v-model:value="inputs" />
    <q-card-actions>
      <q-btn flat color="primary">Show JSON</q-btn>
      <q-btn flat color="secondary">Copy JSON</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import FormBuilder from '../FormBuilder';

export default {
  name: 'FormBuilderGenerator',
  data() {
    return {
      inputs: [],
      newInput: [],
      state: '',
      options: [
        {
          label: 'simple input',
          value: 'input',
        },
        {
          label: 'select input',
          value: 'select',
        },
        {
          label: 'checkbox input',
          value: 'checkbox',
        },
        {
          label: 'range slider input',
          value: 'rangeSlider',
        },
      ],
      type: null,
      config: {
        name: 'name',
        label: 'label',
        placeholder: 'placeholder',
        col: 'col-md-12',
        inputType: 'text',
      },
      configs: [
        {
          type: 'input',
          value: [
            { type: 'text', value: 'name' },
            { type: 'text', value: 'label' },
            { type: 'text', value: 'placeholder' },
            { type: 'text', value: 'col' },
            {
              type: 'select',
              value: 'inputType',
              options: [
                'number',
                'text',
                'textarea',
                'password',
                'email',
                'tel',
                'url',
              ],
            },
            { type: 'boolean', value: 'filled' },
            { type: 'boolean', value: 'disable' },
            { type: 'boolean', value: 'outlined' },
            { type: 'boolean', value: 'rounded' },
          ],
        },
        {
          type: 'select',
          value: [
            { type: 'text', value: 'name' },
            { type: 'text', value: 'label' },
            { type: 'text', value: 'placeholder' },
            { type: 'text', value: 'col' },
            { type: 'boolean', value: 'multiple' },
            { type: 'boolean', value: 'disable' },
            { type: 'boolean', value: 'outlined' },
            { type: 'boolean', value: 'useChips' },
            {
              type: 'options',
              value: 'options',
            },
          ],
        },
        {
          type: 'checkbox',
          value: [
            { type: 'text', value: 'name' },
            { type: 'text', value: 'label' },
            { type: 'text', value: 'placeholder' },
            { type: 'text', value: 'color' },
            { type: 'text', value: 'trueValue' },
            { type: 'text', value: 'falseValue' },
            { type: 'boolean', value: 'disable' },
            { type: 'text', value: 'col' },
          ],
        },
        {
          type: 'rangeSlider',
          value: [
            { type: 'text', value: 'name' },
            { type: 'text', value: 'label' },
            { type: 'text', inputType: 'number', value: 'min' },
            { type: 'text', inputType: 'number', value: 'max' },
            { type: 'text', value: 'col' },
          ],
        },
      ],
      optionLabel: '',
      optionValue: '',
      generatedOptions: [],
    };
  },
  methods: {
    newInputBuild() {
      this.state = 'chooseConfig';
      this.newInput = [];
      this.generatedOptions = [];
      this.prepareConfig();
      this.newInput.push(this.config);
    },
    prepareConfig() {
      // finding appropriate config and set it.
      this.selectedConfig = this.configs.find((c) => c.type == this.type.value);
      // manully set type to config to load it.
      this.config.type = this.type.value;
      // this will use for select copmonent to make options dynamic.
      this.config.options = this.generatedOptions;
    },
    submitConfig() {
      this.inputs.push(...this.newInput);
      this.state = '';
      this.type = null;
      this.config = {
        name: 'name',
        label: 'label',
        placeholder: 'placeholder',
        col: 'col-md-12',
      };
    },
    addToOptions() {
      this.generatedOptions.push({
        label: this.optionLabel,
        value: this.optionValue,
      });
      this.optionLabel = '';
      this.optionValue = '';
    },
    back() {
      this.state = '';
      this.type = null;
      this.newInput = [];
      this.generatedOptions = [];
      this.config = {
        name: 'name',
        label: 'label',
        placeholder: 'placeholder',
        col: 'col-md-12',
      };
    },
  },
  components: {
    FormBuilder,
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  padding: 20px;
}
.generated-element {
  margin: 20px;
  border: 1px dashed;
  border-radius: 8px;
}
.back-btn {
  font-size: 12px;
  margin: 10px;
}
.top {
  display: flex;
  justify-content: space-between;
}
.options-inputs {
  display: flex;
  justify-content: space-between;
  label {
    width: 100%;
    margin-right: 20px;
  }
}
</style>
