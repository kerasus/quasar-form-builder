<template>
  <div class="form-builder-time"
       :class="customClass">
    <q-input v-model="displayDateTime"
             :name="name"
             :loading="loading"
             :filled="filled"
             readonly
             dir="ltr"
             :disable="disable"
             :label="placeholder ? null : label"
             :stack-label="!!placeholder"
             :placeholder="placeholder"
             :rules="rules"
             :lazy-rules="lazyRules"
             :outlined="outlined"
             :class="customClass"
             :input-class="customClass"
             @click="onClickInput">
      <template v-slot:append>
        <q-icon name="access_time"
                class="cursor-pointer">
          <q-popup-proxy v-model="popupTime"
                         cover
                         transition-show="scale"
                         transition-hide="scale">
            <q-time v-model="dateTime.time"
                    mask="HH:mm:00"
                    format24h
                    :disable="disable"
                    :title="title ? title : label"
                    :now-btn="nowBtn"
                    @update:model-value="onChangeTime">
              <div class="row items-center justify-end">
                <q-btn v-close-popup
                       label="بستن"
                       color="primary"
                       flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
        <q-btn v-if="clearable"
               icon="close"
               flat
               round
               class="cursor-pointer"
               @click="onClear" />
      </template>
    </q-input>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
// NOTE: Value accepted from this component is based on Miladi format
// you should pass to it Miladi date as string
// output of this component (which name is 'value') is based on Miladi format.
// SO:
// INPUT: MILADI (STRING)
// SHOWING IN CALENDAR: JALALI (STRING)
// OUTPUT: MILADI (STRING)
export default {
  name: 'FormBuilderTime',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    calendar: {
      default: 'persian',
      type: String
    },
    calendarIcon: {
      default: 'event',
      type: String
    },
    clockIcon: {
      default: 'access_time',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: String
    },
    nowBtn: {
      default: false,
      type: Boolean
    },
    todayBtn: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      displayDateTime: '',
      popupTime: false,
      dateTime: {
        date: '',
        time: ''
      },
      rendrKey: Date.now(),
      showDate: false,
      showTime: false
    }
  },
  methods: {
    onClickInput () {
      this.popupTime = true
    },
    onClear () {
      this.displayDateTime = ''
      this.inputData = null
    },
    onChangeTime (newValue) {
      this.updateDateTime(newValue)
    },
    updateDateTime (newValue) {
      const timeWithoutSecond = newValue ? newValue.split(':').splice(0, 2).join(':') : null
      this.displayDateTime = timeWithoutSecond
      this.inputData = newValue ? newValue.toString() : newValue
      this.change(this.inputData)
    }
  }
}
</script>
