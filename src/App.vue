<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Quasar Form Builder </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-btn color="blue" class="q-my-md full-width" @click="getData">
        get data
      </q-btn>
      <q-btn @click="mockDataDatePickers()">mock value for date pickers</q-btn>

      <br />
      <div>test v-model data from first input: {{ inputs[0].value }}</div>

      <form-builder ref="formBuilder" v-model:value="inputs" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import FormBuilder from './FormBuilder';
import CustomComponent from './CustomComponent';

export default {
  name: 'LayoutDefault',
  components: { FormBuilder },
  data() {
    return {
      inputs: [
        {
          type: 'toggleButton',
          name: 'id',
          options: [
            {
              label: 'tab111',
              value: '1',
            },
            {
              label: 'tab222',
              value: '2',
            },
            {
              label: 'tab333',
              value: '3',
            },
          ],
          col: 'col-md-6',
          color: 'red',
          textColor: 'black',
          size: '20px',
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
            },
            {
              label: 'tab2',
              value: '2',
            },
            {
              label: 'tab3',
              value: '3',
            },
          ],
          col: 'col-md-6',
          color: 'green',
          typeOfInput: 'checkbox',
          textColor: 'black',
          size: '20px',
        },

        {
          type: CustomComponent,
          props: { name: 'ali' },
          name: 'ali',
          value: 123,
          label: 'شناسه',
          col: 'col-md-6',
        },
        {
          type: CustomComponent,
          props: { name: 'mostafa' },
          name: 'mostafa',
          value: 456,
          label: 'شناسه',
          col: 'col-md-6',
        },

        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'input',
              name: 'id1',
              value: null,
              label: 'شناسه1',
              inputType: 'number',
              placeholder: 'salam',
              col: 'col-md-6',
            },
            {
              type: 'input',
              name: 'id2',
              value: null,
              label: 'شناسه2',
              col: 'col-md-6',
            },
            {
              type: 'separator',
              size: '3px',
              separatorType: 'double',
              vertical: true,
              label: 'جدا کننده عمودی',
            },
            {
              type: 'formBuilder',
              name: 'formBuilderCol',
              col: 'col-md-6',
              value: [
                {
                  type: 'input',
                  name: 'id3',
                  value: null,
                  label: 'شناسه3',
                  placeholder: 'test',
                  col: 'col-md-6',
                },
                {
                  type: 'input',
                  name: 'id4',
                  value: null,
                  label: 'شناسه4',
                  col: 'col-md-6',
                  customLabelStyle: 'color: yellow !important;',
                },
              ],
            },
          ],
        },

        {
          type: 'input',
          name: 'id',
          value: null,
          label: 'شناسه ضروری',
          outlined: true,
          col: 'col-md-6',
          rules: [(val) => !!val || 'فیلد ضروری است'],
          lazyRules: true,
          placeholder: 'test',
        },
        {
          type: 'date',
          name: 'last_modification_time',
          label: 'تاریخ آخرین تغییرات',
          responseKey: 'test',
          // value: '1401-07-24',
          placeholder: 'وارد کنید',
          todayBtn: true,
          title: 'عنوان فرعی',
          calendar: 'persian',
          col: 'col-md-4',
          rules: [(val) => !!val || 'فیلد ضروری است'],
        },
        {
          type: 'dateTime',
          name: 'creation_time',
          range: false,
          multiple: false,
          todayBtn: true,
          responseKey: 'test1',
          label: 'تاریخ ایجاد',
          calendar: 'persian',
          col: 'col-md-4',
        },
        {
          type: 'time',
          name: 'creation_dateTime',
          rules: [(val) => !!val || 'فیلد ضروری است'],
          label: 'تاریخ ایجاد',
          multiple: false,
          responseKey: 'test2',
          outlined: true,
          calendar: 'persian',
          col: 'col-md-4',
          placeholder: 'وارد نمایید',
        },
        // {
        //   type: 'dateTime',
        //   name: 'creation_dateTime',
        //   label: 'تاریخ امتحان',
        //   responseKey: 'test1',
        //   calendar: 'persian',
        //   col: 'col-md-4',
        //   placeholder: 'وارد نمایید',
        // },
        // {
        //   type: 'time',
        //   name: 'creation_time',
        //   nowBtn: true,
        //   rules: [(val) => !!val || 'فیلد ضروری است'],
        //   outlined: true,
        //   label: 'زمان ایجاد',
        //   responseKey: 'test2',
        //   calendar: 'persian',
        //   col: 'col-md-4',
        //   placeholder: 'وارد نمایید',
        // },
        {
          type: 'file',
          name: 'thumbnail',
          label: ' تصویر ضروری',
          rules: [(val) => !!val || 'فیلد ضروری است'],
          lazyRules: true,
          col: 'col-md-4',
        },
        {
          type: 'separator',
          color: 'primary',
          size: '5px',
          separatorType: 'dashed',
          label: 'جدا کننده افقی',
          col: 'col-md-12',
        },
        { type: 'input', name: 'url', label: 'منبع', col: 'col-md-6' },
        {
          type: 'color',
          placeholder: 'وارد نمایید',
          name: 'url',
          label: 'رنگ',
          col: 'col-md-6',
          rules: [(val) => !!val || 'فیلد ضروری است'],
        },
        {
          type: 'separator',
          size: '0',
          separatorType: 'double',
          label: 'جدا کننده افقی',
          col: 'col-md-12',
        },
        { type: 'separator', size: '0', label: 'لیبل', col: 'col-md-12' },
        {
          type: 'inputEditor',
          name: 'inputEditor',
          label: 'ادیتور ساده',
          col: 'col-md-12',
        },
        {
          type: 'tiptapEditor',
          name: 'inputEditor',
          label: 'ادیتور پیشرفته',
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
              headers: { Authorization: 'Bearer ' + '65465' },
            },
          },
          col: 'col-md-12',
        },
        {
          type: 'select',
          name: 'NewValueEventSelect',
          label: ' سلکت  چندتایی اینپوت غیر یونیک',
          placeholder: 'تایپ کنین سپس اینتر را بزنین',
          outlined: true,
          multiple: true,
          showNoOption: false,
          createNewValue: true,
          newValueMode: 'add',
          useChips: true,
          hideDropdownIcon: true,
          col: 'col-md-12',
          // The New-Value-Event have 3 mode u that u can read on quasar.dev, and we define 'createNewValue' for turning on this feature
        },
        {
          type: 'select',
          name: 'inputMultipleSelect',
          label: 'سلکت ضروری چند تایی',
          placeholder: 'انتخاب نمایید',
          outlined: true,
          multiple: true,
          options: ['test1', 'test2', 'test3'],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'فیلد ضروری است'],
          lazyRules: true,
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'سلکت ضروری چندتایی',
          placeholder: 'انتخاب نمایید',
          outlined: true,
          multiple: true,
          optionLabel: 'name',
          options: [
            {
              id: 1,
              name: 'آقا',
              title: 'آقا',
            },
            {
              id: 2,
              name: 'خانم',
              title: 'خانم',
            },
            {
              id: 3,
              name: 'تست',
              title: 'تست',
            },
          ],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'فیلد ضروری است'],
          lazyRules: true,
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'سلکت ضروری تکی',
          placeholder: 'انتخاب نمایید',
          outlined: true,
          multiple: false,
          optionLabel: 'name',
          options: [
            {
              id: 1,
              name: 'آقا',
              title: 'آقا',
            },
            {
              id: 2,
              name: 'خانم',
              title: 'خانم',
            },
          ],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'فیلد ضروری است'],
          lazyRules: true,
        },
        {
          type: 'select',
          name: 'inputSingleSelect',
          label: 'سلکت ضروری تکی',
          placeholder: 'انتخاب نمایید',
          outlined: true,
          multiple: false,
          optionLabel: 'name',
          options: ['test1', 'test2', 'test3', 'test4'],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [(val) => val.length !== 0 || 'فیلد ضروری است'],
          lazyRules: true,
        },
      ],
    };
  },
  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
  methods: {
    getData() {
      console.log(
        'flat values: ',
        this.$refs.formBuilder.getValues()[10].value
      );
      console.log(
        'flat values: ',
        this.$refs.formBuilder.getValues()[11].value
      );
      console.log(
        'flat values: ',
        this.$refs.formBuilder.getValues()[12].value
      );
    },
    myRule(val) {
      if (val === null) {
        return 'You must make a selection!';
      }
    },
    mockDataDatePickers() {
      // debugger; // eslint-disable-line no-debugger
      this.$refs.formBuilder.setInputValues({
        test: '1400/02/05',
        test1: '1401/02/05 12:30',
        test2: '12:25:00',
      });
    },
  },
};
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
</style>
