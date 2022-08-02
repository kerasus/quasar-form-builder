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
          color: 'red',
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
                  col: 'col-md-6',
                },
                {
                  type: 'input',
                  name: 'id4',
                  value: null,
                  label: 'شناسه4',
                  col: 'col-md-6',
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
          col: 'col-md-6',
          rules: [(val) => !!val || 'فیلد ضروری است'],
          lazyRules: true,
        },

        {
          type: 'date',
          name: 'last_modification_time',
          label: 'تاریخ آخرین تغییرات',
          calendar: 'persian',
          col: 'col-md-4',
          rules: [(val) => !!val || 'فیلد ضروری است'],
        },
        {
          type: 'date',
          name: 'creation_time',
          label: 'تاریخ ایجاد',
          calendar: 'persian',
          col: 'col-md-4',
        },
        {
          type: 'dateTime',
          name: 'creation_time',
          rules: [(val) => !!val || 'فیلد ضروری است'],

          label: 'تاریخ ایجاد',
          calendar: 'persian',
          col: 'col-md-4',
          value: '',
        },
        { type: 'file', name: 'thumbnail', label: ' تصویر ضروری', rules: [(val) => !!val || 'فیلد ضروری است'], lazyRules: true, col: 'col-md-4' },
        {
          type: 'separator',
          color: 'primary',
          size: '5px',
          separatorType: 'dashed',
          label: 'جدا کننده افقی',
          col: 'col-md-12',
        },
        { type: 'input', name: 'url', label: 'منبع', col: 'col-md-6' },
        { type: 'color', name: 'url', label: 'رنگ', col: 'col-md-6' },
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
          name: 'inputSelect',
          label: 'سلکت ضروری',
          options: ['test1', 'test2', 'test3'],
          col: 'col-md-12',
          // keep in mind that since it's a select, val is an array by default, !!val is true. so check !!val.length
          rules: [ val => !!val.length || 'فیلد ضروری است' ],
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
      console.log('flat values: ', this.$refs.formBuilder.getValues());
    },
    myRule (val) {
      if (val === null) {
        return 'You must make a selection!'        
      }
    }
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
