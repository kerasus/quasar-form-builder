<template>
  <q-layout view="lHh Lpr lFf"
            :dir="dir">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
               dense
               round
               aria-label="Menu"
               icon="menu"
               @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title> Quasar Form Builder</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <generator-panel />
      <div class="row">
        <div class="col-md-3 col-12">
          <q-btn color="blue"
                 class="full-width"
                 @click="getData">
            get data
          </q-btn>
        </div>
        <div class="col-md-3 col-12">
          <q-btn color="orange"
                 class="full-width"
                 @click="clearInputValues">clear inputs</q-btn>
        </div>
        <div class="col-md-3 col-12">
          <q-btn color="green"
                 class="full-width"
                 @click="changeScreenDirection">change screen direction
          </q-btn>
        </div>
        <div class="col-md-3 col-12">
          <q-btn color="red"
                 class="full-width"
                 @click="loading=!loading">loading</q-btn>
        </div>
        <div class="col-md-3 col-12">
          <q-btn class="full-width"
                 @click="mockDataDatePickers()">mock value for date pickers</q-btn>
        </div>
        <div class="col-md-3 col-12">
          <q-checkbox v-model="readonly"
                      label="readonly" />
        </div>
        <div class="col-md-3 col-12">
          <q-checkbox v-model="disable"
                      label="disable" />
        </div>
      </div>
      <div class="form-builder q-pa-md q-mx-sm">
        <form-builder ref="formBuilder"
                      v-model:value="inputs"
                      class="q-mx-md"
                      :readonly="readonly"
                      :disable="disable"
                      :loading="loading"
                      @onClick="onClick"
                      @keydown="onKePress" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, shallowRef } from 'vue'
import FormBuilder from './FormBuilder.vue'
import CustomComponent from './CustomComponent.vue'
import GeneratorPanel from './components/GeneratorPanel/GeneratorPanel.vue'

const CustomComponentInput = shallowRef(CustomComponent)

export default {
  name: 'LayoutDefault',
  components: {
    FormBuilder,
    GeneratorPanel
  },
  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  data() {
    return {
      readonly: false,
      disable: false,
      dir: 'ltr',
      loading: false,
      inputs: [
        {
          type: 'file',
          capture: 'user',
          accept: 'image/*',
          label: 'just capture',
          col: 'col-12'
        },
        {
          type: 'submit',
          label: 'submit btn',
          col: 'col-12'
        },
        {
          type: 'select',
          dropdownIcon: 'add',
          class: 'testCustomClass',
          name: 'question_type',
          responseKey: 'data.question_type',
          options: [{ label: 'konkur', value: 'konkur' }, {
            label: 'psychometric',
            value: 'psychometric'
          }, { label: 'descriptive', value: 'descriptive' }],
          col: 'col-12'
        },
        {
          type: 'separator',
          color: 'secondary ',
          size: '0px',
          separatorType: 'solid',
          label: 'this is hidden separator',
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          col: 'col-md-6'
        },
        {
          type: 'RangeSlider',
          name: 'ZoomRate',
          col: 'col-md-6',
          label: 'zoom rate from:',
          min: 0,
          max: 11,
          value: {
            min: 5,
            max: 7
          }
        },
        {
          type: 'separator',
          color: 'secondary  ',
          size: '3px',
          separatorType: 'solid',
          label: 'toggleButton & optionGroup & checkbox',
          col: 'col-md-12'
        },
        {
          type: 'toggleButton',
          name: 'id',
          label: 'toggleButton',
          options: [
            {
              label: 'tab1',
              value: '1'
            },
            {
              label: 'tab2',
              value: '2'
            },
            {
              label: 'tab3',
              value: '3'
            }
          ],
          col: 'col-md-3',
          color: 'red',
          textColor: 'black',
          size: '20px'
        },
        {
          type: 'optionGroup',
          name: 'id',
          inline: false,
          dense: true,
          label: 'optionGroup',
          value: [],
          options: [
            {
              label: 'tab1',
              value: '1',
              icon: 'img:https://cdn.quasar.dev/logo-v2/svg/logo.svg',
              caption: 'caption'
            },
            {
              label: 'tab2',
              icon: 'img:https://cdn.quasar.dev/logo-v2/svg/logo.svg',
              value: '2'
            },
            {
              label: 'tab3',
              caption: 'caption',
              value: '3'
            },
            {
              label: 'tab4',
              value: '4'
            }
          ],
          col: 'col-md-3',
          color: 'green',
          typeOfInput: 'checkbox',
          textColor: 'black',
          size: '20px'
        },
        {
          type: 'optionGroup',
          name: 'radioButton',
          inline: false,
          dense: true,
          label: 'radioButton',
          value: {},
          options: [
            {
              label: 'tab1',
              value: '1'
            },
            {
              label: 'tab2',
              value: '2'
            },
            {
              label: 'tab3',
              value: '3'
            }
          ],
          col: 'col-md-3',
          color: 'blue',
          textColor: 'black',
          size: '20px'
        },
        { type: 'Checkbox', name: 'enable', label: 'فعال', col: 'col-md-3' },
        {
          type: 'separator',
          color: 'secondary  ',
          size: '3px',
          separatorType: 'solid',
          col: 'col-md-12'
        },
        {
          type: 'separator',
          color: 'accent ',
          size: '3px',
          separatorType: 'solid',
          label: 'custom component',
          col: 'col-md-12'
        },
        {
          type: CustomComponentInput,
          props: { name: 'ali' },
          name: 'ali',
          value: 123,
          label: 'شناسه',
          col: 'col-md-6'
        },
        {
          type: CustomComponentInput,
          props: { name: 'mostafa' },
          name: 'mostafa',
          value: 456,
          label: 'شناسه',
          col: 'col-md-6'
        },
        {
          type: 'separator',
          color: 'accent ',
          size: '3px',
          separatorType: 'solid',
          col: 'col-md-12'
        },
        {
          type: 'separator',
          color: 'negative',
          size: '3px',
          separatorType: 'solid',
          label: 'form-builder inside a form-builder',
          col: 'col-md-12'
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          gutterSize: 'lg',
          value: [
            {
              type: 'input',
              name: 'id1',
              value: null,
              label: 'disabled input',
              col: 'col-md-6',
              disable: true
            },
            {
              type: 'input',
              name: 'id2',
              color: 'positive',
              value: 'readonly input',
              label: 'input in read only mode',
              col: 'col-md-6',
              readonly: true,
              filled: true
            },
            {
              type: 'input',
              name: 'id1',
              value: null,
              label: 'input with placeholder(test)',
              inputType: 'number',
              placeholder: 'test',
              col: 'col-md-6',
              clearable: true
            },
            {
              type: 'input',
              name: 'id2',
              value: null,
              label: 'input with placeholder(space)',
              placeholder: ' ',
              col: 'col-md-6'
            },
            {
              type: 'separator',
              size: '3px',
              separatorType: 'double',
              vertical: true,
              class: 'testCustomClass',
              label: 'vertical separator'
            },
            {
              type: 'input',
              class: 'testCustomClass',
              name: 'id',
              value: 'value',
              label: 'input with value(value)',
              col: 'col-md-6'
            },
            {
              type: 'separator',
              color: 'primary',
              size: '3px',
              separatorType: 'solid',
              label: 'form-builder inside a form-builder inside a form-builder',
              col: 'col-md-12'
            },
            {
              type: 'formBuilder',
              name: 'formBuilderCol',
              col: 'col-md-12',
              value: [
                {
                  type: 'input',
                  name: 'id4',
                  value: null,
                  label: 'input without placeholder',
                  col: 'col-md-6',
                  customLabelStyle: 'color: yellow !important;'
                },
                {
                  type: 'input',
                  name: 'id3',
                  value: 'value',
                  label: 'input with placeholder(test) & value(value)',
                  placeholder: 'test',
                  col: 'col-md-6'
                },
                {
                  type: 'input',
                  name: 'id',
                  label: 'required input',
                  outlined: true,
                  col: 'col-md-6',
                  rules: [(val) => !!val || 'field is required'],
                  lazyRules: true
                },
                { type: 'input', name: 'url', label: 'source', col: 'col-md-6' }
              ]
            }
          ]
        },
        {
          type: 'separator',
          color: 'primary',
          size: '3px',
          separatorType: 'solid',
          col: 'col-md-12'
        },
        {
          type: 'separator',
          color: 'negative',
          size: '3px',
          separatorType: 'solid',
          col: 'col-md-12'
        },
        {
          type: 'separator',
          color: 'info',
          size: '5px',
          separatorType: 'solid',
          label: 'Date & Time',
          col: 'col-md-12'
        },
        {
          type: 'dateTime',
          name: 'creation_time',
          placeholder: ' creation time ',
          label: 'date & time with label & placeholder',
          calendar: 'persian',
          col: 'col-md-6',
          value: ''
        },
        {
          type: 'dateTime',
          name: 'creation_time',
          placeholder: ' ',
          label: 'date & time with label & placeholder(space)',
          calendar: 'persian',
          col: 'col-md-6',
          value: ''
        },
        {
          type: 'date',
          name: 'last_modification_time',
          label: 'required date with label',
          calendar: 'persian',
          col: 'col-md-6',
          rules: [(val) => !!val || 'field is required']
          // lazyRules: true,
        },
        {
          type: 'dateTime',
          name: 'creation_time',
          label: 'date & time',
          calendar: 'persian',
          col: 'col-md-6',
          todayBtn: true,
          nowBtn: true,
          value: ''
        },
        {
          type: 'time',
          name: 'creation_dateTime',
          rules: [(val) => !!val || 'field is required'],
          // lazyRules: true,
          label: 'time with placeholder(Enter)',
          multiple: false,
          responseKey: 'test2',
          outlined: true,
          calendar: 'persian',
          col: 'col-md-6',
          placeholder: 'Enter',
          nowBtn: true
        },
        {
          type: 'time',
          name: 'creation_dateTime',
          rules: [(val) => !!val || 'field is required'],
          // lazyRules: true,
          label: 'time without placeholder',
          multiple: false,
          responseKey: 'test2',
          outlined: true,
          calendar: 'persian',
          col: 'col-md-6',
          nowBtn: true
        },
        {
          type: 'time',
          name: 'creation_dateTime',
          rules: [(val) => !!val || 'field is required'],
          // lazyRules: true,
          label: 'time with placeholder(space)',
          multiple: false,
          responseKey: 'test2',
          outlined: true,
          calendar: 'persian',
          placeholder: ' ',
          col: 'col-md-6'
        },
        {
          type: 'separator',
          color: 'info',
          size: '5px',
          separatorType: 'solid',
          col: 'col-md-12'
        },
        {
          type: 'separator',
          color: 'primary',
          size: '5px',
          separatorType: 'dashed',
          label: 'file & color',
          col: 'col-md-12'
        },
        { type: 'file', name: 'thumbnail', label: 'picture', col: 'col-md-6' },
        {
          type: 'file',
          name: 'thumbnail',
          label: 'required picture',
          rules: [(val) => !!val || 'field is required'],
          lazyRules: true,
          col: 'col-md-6'
        },
        {
          type: 'file',
          name: 'thumbnail',
          label: 'required picture',
          caption: 'with caption',
          col: 'col-md-6'
        },
        { type: 'color', name: 'url', label: 'color', col: 'col-md-6' },
        {
          type: 'separator',
          class: 'testCustomClass',
          size: '0',
          separatorType: 'double',
          label: 'vertical separator with size 0',
          col: 'col-md-12',
          vertical: true
        },
        {
          type: 'color',
          placeholder: 'Enter',
          name: 'url',
          label: 'required color with placeholder(Enter)',
          col: 'col-md-6',
          rules: [(val) => !!val || 'field is required'],
          clearable: true
        },
        {
          type: 'separator',
          size: '0',
          separatorType: 'double',
          label: 'horizontal separator with size 0',
          col: 'col-md-12'
        },
        // {type: 'separator', size: '0', label: 'لیبل', col: 'col-md-12'},
        {
          type: 'inputEditor',
          name: 'inputEditor',
          label: 'simple editor',
          col: 'col-md-12'
        },
        {
          type: 'tiptapEditor',
          name: 'inputEditor',
          label: 'advanced editor',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: 'imageUrl',
              instantUpload: true,
              headers: { Authorization: 'Bearer ' + '65465' }
            }
          },
          col: 'col-md-12'
        },
        {
          type: 'select',
          name: 'NewValueEventSelect',
          label: 'multiple selection non-unique',
          placeholder: 'type then Enter',
          outlined: true,
          multiple: true,
          showNoOption: false,
          createNewValue: true,
          newValueMode: 'add',
          useChips: true,
          hideDropdownIcon: true,
          col: 'col-md-12'
          // The New-Value-Event have 3 mode u that u can read on quasar.dev, and we define 'createNewValue' for turning on this feature
        },
        {
          type: 'select',
          name: 'inputMultipleSelect',
          label: 'multiple required selection',
          placeholder: 'select',
          outlined: true,
          multiple: true,
          options: ['test1', 'test2', 'test3'],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'field is required'],
          lazyRules: true
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'multiple required selection',
          placeholder: 'select',
          outlined: true,
          multiple: true,
          optionLabel: 'name',
          options: [
            {
              id: 1,
              name: 'man',
              title: 'man'
            },
            {
              id: 2,
              name: 'woman',
              title: 'woman'
            },
            {
              id: 3,
              name: 'test',
              title: 'test'
            }
          ],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'field is required'],
          lazyRules: true
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'single required selection',
          placeholder: 'select',
          outlined: true,
          multiple: false,
          optionLabel: 'name',
          options: [
            {
              id: 1,
              name: 'man',
              title: 'man'
            },
            {
              id: 2,
              name: 'woman',
              title: 'woman'
            }
          ],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'field is required'],
          lazyRules: true
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'single required selection',
          placeholder: 'select',
          outlined: true,
          multiple: false,
          optionLabel: 'name',
          options: ['test1', 'test2', 'test3', 'test4'],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'field is required'],
          lazyRules: true
        }
      ]
    }
  },
  watch: {
    readonly(newValue) {
      this.$refs.formBuilder.readonlyAllInputs(newValue)
    },
    disable(newValue) {
      this.$refs.formBuilder.disableAllInputs(newValue)
    }
  },
  created() {
    this.inputs[27].value = 'https://cdn.quasar.dev/img/parallax2.jpg'
  },
  methods: {
    onClick(data) {
      // eslint-disable-next-line
      console.log('data', data)
    },
    onKePress(data) {
      // eslint-disable-next-line
      console.log('key press', data)
    },
    getData() {
      // eslint-disable-next-line
      console.log('flat values: ', this.$refs.formBuilder.getValues())
    },
    myRule(val) {
      if (val === null) {
        return 'You must make a selection!'
      }
    },
    mockDataDatePickers() {
      // debugger; // eslint-disable-line no-debugger
      this.$refs.formBuilder.setInputValues({
        test: '2017-08-02',
        test1: '2012-08-02 21:10',
        test2: '12:25:00'
      })
    },
    clearInputValues() {
      this.$refs.formBuilder.clearFormBuilderInputValues()
    },
    changeScreenDirection() {
      this.dir = this.dir === 'rtl' ? 'ltr' : 'rtl'
    }
  }
}
</script>

<style lang="scss">
.q-field__inner {
    .q-field__control {
        background-color: white;

        .q-field__append {
            .q-icon {
                color: black;
                font-size: 20px;
                padding: 7px;
            }
        }
    }
}

.border {

}
</style>

<style>
/*.testCustomClass {*/
/*  color: red;*/
/*  background: blue;*/
/*}*/
</style>
