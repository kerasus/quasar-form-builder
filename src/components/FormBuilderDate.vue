<template>
  <div class="form-builder-date"
       :class="customClass">
    <div v-if="outsideLabel"
         class="outside-label">
      {{ outsideLabel }}
    </div>
    <q-input ref="input"
             v-model="displayDateTime"
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
             @clear="onClear"
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
import jMoment from '../assets/jalali-moment.browser.js'
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
    outsideLabel: {
      default: null,
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
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          this.inputData = null
          this.displayDateTime = ''
          return
        }
        this.inputData = newValue
        this.displayDateTime = this.miladiToShamsiDate(newValue.toString())
      },
      immediate: true
    }
  },
  methods: {
    onClickInput () {
      this.popupDate = true
    },
    onClear () {
      this.displayDateTime = ''
      this.inputData = null
      this.change(this.inputData)
    },
    onChangeDate (newValue) {
      let gregorianDate = newValue
      if (this.calendar === 'persian') {
        gregorianDate = this.shamsiToMiladiDate(newValue.toString())
      }
      this.updateDateTime(gregorianDate, 'date')
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
    },
    miladiToShamsiDate(date) {
      return jMoment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')
    }
  }
}
</script>
