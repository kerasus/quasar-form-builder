<template>
  <q-card class="q-ma-lg">
    <div class="title">Form Builder Generator</div>
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
          <div v-if="type.value === 'FormBuilderInput'">
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
              label stick above the input.
            </p>
            <form-builder ref="formBuilder" v-model:value="newInput" />
            <div class="q-mt-md">configs to tweak:</div>
            <div v-for="c in selectedConfig.value" :key="c">
              <q-input
                v-if="c.type === 'text'"
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
            </div>
            <q-btn @click="submitConfig()" class="q-mt-md">submit</q-btn>
          </div>
        </div>
      </div>
      <div class="input-generator"></div>
    </q-card-section>
  </q-card>
  <q-card v-show="inputs" class="q-ma-lg">
    inputs : {{ inputs }}

    <form-builder v-model:value="inputs" />
    <q-card-actions>
      <q-btn flat color="primary">Generate JSON</q-btn>
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
          value: 'FormBuilderInput',
        },
      ],
      type: null,
      config: {
        name: 'name',
        label: 'label',
        placeholder: 'placeholder',
        col: 'col-md-12',
      },
      configs: [
        {
          type: 'input',
          value: [
            { type: 'text', value: 'name' },
            { type: 'text', value: 'label' },
            { type: 'text', value: 'placeholder' },
            { type: 'text', value: 'col' },
            { type: 'boolean', value: 'filled' },
            { type: 'boolean', value: 'disable' },
            { type: 'boolean', value: 'outlined' },
            { type: 'boolean', value: 'rounded' },
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
          ],
        },
      ],
    };
  },
  methods: {
    newInputBuild() {
      this.state = 'chooseConfig';
      // flushing newInput
      this.newInput = [];
      this.prepareConfig();
      this.newInput.push(this.config);
    },
    prepareConfig() {
      if (this.type.value === 'FormBuilderInput') {
        this.config.type = 'input';
        this.selectedConfig = this.configs.find(
          (c) => c.type == this.config.type
        );
      }
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
</style>
