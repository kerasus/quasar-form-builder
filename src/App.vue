<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            aria-label="Menu"
            icon="menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar Form Builder
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-btn color="blue" class="q-my-md full-width" @click="getData">
        get data
      </q-btn>
      <br>
      <div>
        test v-model
        data from first input: {{ inputs[0].value }}
      </div>
      <form-builder ref="formBuilder" v-model:value="inputs" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import FormBuilder from './FormBuilder'
import CustomComponent from './CustomComponent'

export default {
  name: 'LayoutDefault',

  components: {FormBuilder},

  data () {
    return {
      inputs: [
        { type: CustomComponent, props: {name: 'ali'}, name: 'ali', value: 123, label: 'شناسه', col: 'col-md-6' },
        { type: CustomComponent, props: {name: 'mostafa'}, name: 'mostafa', value: 456, label: 'شناسه', col: 'col-md-6' },

        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            { type: 'input', name: 'id1', value: null, label: 'شناسه1', col: 'col-md-6' },
            { type: 'input', name: 'id2', value: null, label: 'شناسه2', col: 'col-md-6' },
            { type: 'separator', size: '3px', separatorType: 'double', vertical: true, label: 'جدا کننده عمودی' },
            {
              type: 'formBuilder',
              name: 'formBuilderCol',
              col: 'col-md-6',
              value: [
                { type: 'input', name: 'id3', value: null, label: 'شناسه3', col: 'col-md-6' },
                { type: 'input', name: 'id4', value: null, label: 'شناسه4', col: 'col-md-6' },
              ]
            },
          ]
        },

        { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-6' },

        { type: 'date', name: 'last_modification_time', label: 'تاریخ آخرین تغییرات', calendar: 'persian', col: 'col-md-4'},
        { type: 'date', name: 'creation_time', label: 'تاریخ ایجاد', calendar: 'persian', col: 'col-md-4' },
        { type: 'dateTime', name: 'creation_time', label: 'تاریخ ایجاد', calendar: 'persian', col: 'col-md-4', value: '' },
        { type: 'file', name: 'thumbnail', label: 'تصویر', col: 'col-md-4' },
        { type: 'separator', color: 'primary', size: '5px', separatorType: 'dashed', label: 'جدا کننده افقی', col: 'col-md-12' },
        { type: 'input', name: 'url', label: 'منبع', col: 'col-md-6' },
        { type: 'color', name: 'url', label: 'رنگ', col: 'col-md-6' },
        { type: 'separator', size: '0', separatorType: 'double', label: 'جدا کننده افقی', col: 'col-md-12' },
        { type: 'separator', size: '0', label: 'لیبل', col: 'col-md-12' },
        { type: 'inputEditor', name: 'inputEditor', label: 'ادیتور ساده', col: 'col-md-12' },
        { type: 'tiptapEditor', name: 'inputEditor', label: 'ادیتور پیشرفته', options: {
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
          }, col: 'col-md-12' },
      ]
    }
  },
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  methods : {
    getData () {
      console.log('flat values: ', this.$refs.formBuilder.getValues())
    }
  }
}
</script>

<style lang="scss">
.q-field__inner{
  .q-field__control{
    background-color : white;
    .q-field__append{
      .q-icon{
        color: black;
        font-size: 20px;
        padding: 7px;
      }
    }
  }
}
</style>
