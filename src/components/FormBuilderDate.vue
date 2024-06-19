<template>
  <div class="form-builder-date"
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
      <template v-slot:prepend>
        <q-icon name="event"
                class="cursor-pointer">
          <q-popup-proxy v-model="popupDate"
                         cover
                         transition-show="scale"
                         transition-hide="scale">
            <q-date v-model="dateTime.date"
                    :calendar="calendar"
                    mask="YYYY/MM/DD"
                    :range="range"
                    :multiple="multiple"
                    :disable="disable"
                    :title="title ? title : label"
                    :today-btn="todayBtn"
                    @update:model-value="onChangeDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup
                       label="بستن"
                       color="primary"
                       flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:append>
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
import jMoment from '../assets/moment-jalaali-es.js'
// NOTE: Value accepted from this component is based on Miladi format
// you should pass to it Miladi date as string
// output of this component (which name is 'value') is based on Miladi format.
// SO:
// INPUT: MILADI (STRING)
// SHOWING IN CALENDAR: JALALI (STRING)
// OUTPUT: MILADI (STRING)
export default {
  name: 'FormBuilderDate',
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
      popupDate: false,
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
      this.popupDate = true
    },
    onClear () {
      this.displayDateTime = ''
      this.inputData = null
    },
    onChangeDate (newValue) {
      this.updateDateTime(newValue)
    },
    updateDateTime (newValue) {
      this.displayDateTime = newValue.toString()
      if (this.calendar === 'persian') {
        this.inputData = this.shamsiToMiladiDate(newValue.toString())
      } else {
        this.inputData = newValue.toString()
      }

      this.change(this.inputData)
    },

    shamsiToMiladiDate(date) {
      return jMoment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    }
  }
}
</script>
