<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
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
      <form-builder v-model:value="inputs" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import FormBuilder from './FormBuilder';

export default {
  name: 'LayoutDefault',

  components: {FormBuilder},

  data () {
    return {
      inputs: [
        { type: 'input', name: 'id', responseKey: 'id', value: 'null', label: 'شناسه', col: 'col-md-4' },
        { type: 'date', name: 'last_modification_time', responseKey: 'last_modification_time', label: 'تاریخ آخرین تغییرات', calendar: 'persian', col: 'col-md-4'},
        { type: 'date', name: 'creation_time', responseKey: 'creation_time', label: 'تاریخ ایجاد', calendar: 'persian', col: 'col-md-4' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', label: 'تاریخ ایجاد', calendar: 'persian', col: 'col-md-4', value: '' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'تصویر', col: 'col-md-4' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'منبع', col: 'col-md-12' },
        { type: 'inputEditor', name: 'summary', responseKey: 'summary', label: 'خلاصه', col: 'col-md-12' },
        { type: 'inputEditor', name: 'text', responseKey: 'text', label: 'متن', col: 'col-md-12' },
      ]
    }
  },
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  methods : {

  }
}
</script>
