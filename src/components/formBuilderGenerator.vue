<template>
  <q-card class="q-ma-lg">
    <div class="title">Generated Form</div>
    <div v-show="jsonShow" class="q-ma-md">
      <div class="sub-title">Generated Json:</div>
      {{JSON.stringify(inputs)}}
      <!--      <vue-json-pretty :data="inputs"/>-->
    </div>
    <div v-show="gFormShow">
      <div class="sub-title q-pl-md">Generated Form:</div>
      <form-builder
        ref="fb"
        v-model:value="inputs"
        :showGeneratorButtons="true"
        @edit="edit"
      />
    </div>
    <div v-show="setGetValue" class="q-ma-lg">
      <p>
        Here you can provide your name of input, and will get the value to the
        second input.
      </p>
      <p>If you want to set, fill both inputs.</p>
      <q-select
        v-model="searchName"
        :options="searchOptions"
        label="name of input of form to get"
        placeholder="name of input of form to get"
      ></q-select>
      <q-input
        v-model="setValue"
        placeholder="value of input of form to set"
      ></q-input>
      <q-btn class="q-mt-md" @click="getSetValue()">submit</q-btn>
    </div>
    <q-card-actions>
      <q-btn flat color="purple" @click="copyJson()">Copy JSON</q-btn>
      <q-btn flat color="primary" @click="jsonShow = !jsonShow"
      >{{ jsonShow ? 'Hide' : 'Show' }} JSON
      </q-btn
      >
      <q-btn flat color="secondary" @click="gFormShow = !gFormShow"
      >{{ gFormShow ? 'Hide' : 'Show' }} Generated Form
      </q-btn
      >
      <q-btn flat color="green" @click="setGetValue = !setGetValue"
      >{{ setGetValue ? 'Hide' : 'Show' }} get/set value
      </q-btn
      >
    </q-card-actions>
  </q-card>
  <q-card class="q-ma-lg">
    <div class="top">
      <div class="title">Form Builder Generator</div>
      <q-btn
        v-show="state !== ''"
        class="back-btn"
        size="12px"
        rounded
        @click="back()"
      >back
      </q-btn
      >
    </div>
    <q-card-section>
      <div v-if="state === ''">
        <p class="desc">
          Form builder is a great tool for creating forms with ease and speed.
          Add inputs you want, and copy the generated json for using inside your
          project.
        </p>
        <div class="sub-title">note that:</div>
        <div class="notes">
          <ul>
            <li>
              <b>name</b> will be used for finding inputs, so it should be
              english and unique.
            </li>
            <li>
              for custom css classes you can use <b>col</b> like this:
              'col-md-12 customClass' which customClass will be defined inside
              of your component, not here.
            </li>
            <li>
              There are two options to show label in here, if you don't pass
              <b>placeholder</b> (remove it down here) label will float in style
              of material. Passing both placeholder and label to input will make
              label stick above the input.
            </li>
            <li>
              If you use <b>select</b> and have options which will fetch from
              server, and you use <b>quasar-crud</b>, you can use
              <b>afterGetData</b> method from there to load those options to
              your input.
            </li>
            <li>
              <b>File input</b> has no placeholder. it's just there to show to
              options for label. try to remove placeholder to see.
            </li>
            <li>
              For <b>dateTime picker</b>, note that
              <b>user will always see shamsi date</b>, but the end result (
              which stored in <b>value</b> ) will be in <b>miladi</b> .
            </li>
            <li>
              Also note that in <b>dateTime picker</b> the final date will be in
              format of
              <b>"YYYY-MM-DD HH:mm:00"</b>
            </li>
            <li>
              For extending generator to cover new inputs and components for
              future, just add to this.configs appropriate config of the new
              comer. Generator will make a form containing your input with
              controls on the props which will be given.
            </li>
          </ul>
        </div>
        <q-btn @click="state = 'chooseType'">add new input</q-btn>
        <q-btn class="q-ml-md" @click="state = 'addJson'"
        >import json to work on
        </q-btn
        >
      </div>
      <div v-if="state === 'chooseType'" class="controls">
        <div>
          generating new input: <br/>
          selected input: {{ type?.value }}
          <q-select
            v-model="type"
            :options="showConfigs()"
            @update:model-value="newInputBuild()"
          ></q-select>
        </div>
      </div>
      <div v-if="state === 'chooseConfig'">
        <div>
          demo for {{ type.value }}:
          <div class="generated-element">
            <form-builder ref="formBuilder" v-model:value="newInput"/>
          </div>
          <div class="q-mt-md">configs to tweak:</div>
          <div v-for="c in selectedConfig.value" :key="c">
            <q-input
              v-if="c.type === 'text'"
              v-model="config[c.value]"
              :type="c.inputType"
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
          <q-btn class="q-mt-md" @click="submitConfig()">submit</q-btn>
        </div>
      </div>
      <div v-if="state === 'addJson'">
        here you can import your formbuilder json to work on it. <br/>
        Try to copy paste, not type in here.
        <q-input v-model="importJson"></q-input>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import FormBuilder from '../FormBuilder';
// import VueJsonPretty from 'vue-json-pretty';
import CustomComponent from '../CustomComponent';
// import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'FormBuilderGenerator',
  components: {
    FormBuilder,
    // VueJsonPretty,
  },
  data() {
    return {
      inputs: [],
      newInput: [],
      state: '',
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
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'text', value: 'col'},
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
            {type: 'boolean', value: 'filled'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'outlined'},
            {type: 'boolean', value: 'rounded'},
          ],
        },
        {
          type: 'select',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'filled'},
            {type: 'boolean', value: 'outlined'},
            {type: 'boolean', value: 'rounded'},
            {type: 'boolean', value: 'multiple'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'useChips'},
            {type: 'text', value: 'col'},

            {
              type: 'options',
              value: 'options',
            },
          ],
        },
        {
          type: 'checkbox',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'text', value: 'color'},
            {type: 'text', value: 'trueValue'},
            {type: 'text', value: 'falseValue'},
            {type: 'boolean', value: 'disable'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'rangeSlider',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', inputType: 'number', value: 'min'},
            {type: 'text', inputType: 'number', value: 'max'},
            {type: 'text', value: 'col'},
            {type: 'boolean', value: 'disable'},
          ],
        },
        {
          type: 'slider',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', inputType: 'number', value: 'min'},
            {type: 'text', inputType: 'number', value: 'max'},
            {type: 'text', value: 'col'},
            {type: 'boolean', value: 'disable'},
          ],
        },
        {
          type: 'color',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'outlined'},
            {type: 'boolean', value: 'rounded'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'dateTime',
          value: [
            {
              type: 'select',
              value: 'type',
              options: ['date', 'time', 'dateTime'],
            },
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'outlined'},
            {type: 'text', value: 'calendarIcon'},
            {type: 'text', value: 'clockIcon'},
            {type: 'boolean', value: 'nowBtn'},
            {type: 'boolean', value: 'todayBtn'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'date',
          value: [
            {
              type: 'select',
              value: 'type',
              options: ['date', 'time', 'dateTime'],
            },
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'outlined'},
            {type: 'text', value: 'calendarIcon'},
            {type: 'text', value: 'clockIcon'},
            {type: 'boolean', value: 'nowBtn'},
            {type: 'boolean', value: 'todayBtn'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'time',
          value: [
            {
              type: 'select',
              value: 'type',
              options: ['date', 'time', 'dateTime'],
            },
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'outlined'},
            {type: 'text', value: 'calendarIcon'},
            {type: 'text', value: 'clockIcon'},
            {type: 'boolean', value: 'nowBtn'},
            {type: 'boolean', value: 'todayBtn'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'inputEditor',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'boolean', value: 'disable'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'tiptapEditor',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'options'},
            {type: 'boolean', value: 'disable'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'file',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'placeholder'},
            {type: 'boolean', value: 'disable'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'avatar',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'size'},
            {type: 'text', value: 'fontSize'},
            {type: 'text', value: 'color'},
            {type: 'text', value: 'textColor'},
            {type: 'text', value: 'src'},

            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'optionGroup',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'color'},
            {type: 'boolean', value: 'inline'},
            {
              type: 'options',
              value: 'options',
            },
            {
              type: 'select',
              value: 'typeOfInput',
              options: ['radio', 'checkbox', 'toggle'],
            },
            {type: 'boolean', value: 'disable'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'separator',
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'borderTopStyle'},
            {type: 'text', value: 'borderLeftStyle'},
            {type: 'boolean', value: 'inset'},
            {type: 'boolean', value: 'darkMode'},
            {type: 'boolean', value: 'vertical'},
            {type: 'boolean', value: 'spaced'},
            {type: 'text', value: 'size'},
            {type: 'text', value: 'color'},
            {
              type: 'select',
              value: 'separatorType',
              options: ['dashed', 'double', 'solid'],
            },
            {type: 'text', value: 'borderSize'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'space',
          value: [
            {type: 'text', value: 'label'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: 'toggleButton',
          value: [
            {type: 'text', value: 'name'},
            {type: 'options', value: 'options'},
            {type: 'text', value: 'color'},
            {type: 'text', value: 'type'},
            {type: 'text', value: 'textColor'},
            {type: 'text', value: 'toggleColor'},
            {type: 'text', value: 'toggleTextColor'},
            {type: 'text', value: 'size'},
            {type: 'boolean', value: 'push'},
            {type: 'boolean', value: 'glossy'},
            {type: 'boolean', value: 'clearable'},
            {type: 'boolean', value: 'inline'},
            {type: 'boolean', value: 'dense'},
            {type: 'boolean', value: 'disable'},
            {type: 'boolean', value: 'unelevated'},
            {type: 'boolean', value: 'flat'},
            {type: 'boolean', value: 'outlined'},
            {type: 'boolean', value: 'rounded'},
            {type: 'boolean', value: 'ripple'},
            {type: 'boolean', value: 'noCaps'},
            {type: 'boolean', value: 'noWrap'},
            {type: 'boolean', value: 'spread'},
            {type: 'boolean', value: 'stack'},
            {type: 'boolean', value: 'stretch'},
            {type: 'text', value: 'col'},
          ],
        },
        {
          type: CustomComponent,
          isCustomComponent: true,
          value: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'label'},
            {type: 'text', value: 'col'},
            {type: 'text', value: 'value'},
            {
              type: 'options',
              value: 'props',
            },
          ],
        },
      ],
      optionLabel: '',
      optionValue: '',
      generatedOptions: [],
      jsonShow: false,
      gFormShow: false,
      setGetValue: false,
      importJson: '',
      editMode: false,
      editIndex: -1,
      searchName: '',
      setValue: '',
    };
  },
  computed: {
    searchOptions() {
      return this.getValues()
          .map((input) => {
            return input.name;
          })
          .filter((i) => i !== undefined);
    },
  },
  watch: {
    importJson(n) {
      this.inputs = eval(n);
      alert('json imported successfully');
      this.jsonShow = true;
      this.gFormShow = true;
      this.state = '';
    },
  },
  methods: {
    newInputBuild() {
      this.state = 'chooseConfig';
      this.generatedOptions = [];
      if (!this.editMode) {
        this.newInput = [];
        this.prepareConfig();
        this.newInput.push(this.config);
      }
    },
    prepareConfig() {
      // finding appropriate config and set it.
      this.selectedConfig = this.configs.find((c) => {
        if (c.isCustomComponent) {
          if (c.type.name == this.type) {
            return c;
          }
        }
        if (c.type == this.type) {
          return c;
        }
      });
      // manully set type to config to load it.
      this.config.type = this.selectedConfig.type;
      // removing indeterminate condition to false values.
      this.selectedConfig.value.forEach((v) => {
        if (v.type === 'boolean') this.config[v.value] = false;
      });
      // this will use for select copmonent to make options dynamic.
      this.config.options = this.generatedOptions;
    },
    submitConfig() {
      if (!this.editMode) {
        this.inputs.push(...this.newInput);
      } else {
        this.inputs[this.editIndex] = this.newInput[0];
      }
      this.state = '';
      this.type = null;
      this.config = {
        name: 'name',
        label: 'label',
        placeholder: 'placeholder',
        col: 'col-md-12',
      };
      this.newInput = [];
      this.editIndex = -1;
      this.editMode = false;
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
    copyJson() {
      navigator.clipboard.writeText(JSON.stringify(this.inputs));
      alert('json copied to clipboard');
    },
    edit(i) {
      this.editMode = true;
      this.editIndex = i;
      this.type = this.options.find((o) => o.value === this.inputs[i].type);
      this.selectedConfig = this.configs.find((c) => c.type == this.type.value);
      this.config = this.inputs[i];
      this.generatedOptions = this.inputs[i].options;
      this.newInput = [];
      this.newInput.push(this.config);

      this.state = 'chooseConfig';
    },
    getSetValue() {
      if (this.searchName === '') {
        alert('you have to specify the name of input');
        return;
      }
      let founded = this.$refs.fb.getInputsByName(this.searchName);
      if (founded) {
        founded.forEach((f) => {
          this.setValueOne(f);
        });
      } else {
        alert('no such name existed on this form');
      }
    },
    getValues() {
      function getFlatInputs(inputs) {
        let values = [];
        inputs.forEach((input) => {
          if (input.type !== 'formBuilder') {
            values.push(input);
          } else {
            const formBuilderInputs = getFlatInputs(input.value);
            values = values.concat(formBuilderInputs);
          }
        });
        return values;
      }

      return getFlatInputs(this.inputs);
    },
    setValueOne(founded) {
      // GET value
      if (this.setValue === '') {
        if (founded.value) {
          this.setValue = founded.value;
        } else {
          // input is present but has no value
          alert('input is present but has no value');
        }
      }
      // SET Value
      else {
        this.$refs.fb.setInputByName(this.searchName, this.setValue);
      }
    },
    showConfigs() {
      return this.configs
          .map((c) => {
            if (typeof c.type === 'string') {
              return c.type;
            } else {
              return c.type.name;
            }
          })
          .filter((c) => c !== undefined);
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  padding: 20px;
}

.sub-title {
  font-size: 16px;
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
