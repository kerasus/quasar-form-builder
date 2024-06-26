<template>
  <div class="form-builder-date-time"
       :class="customClass">
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
                    today-btn
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
import jMoment from '../assets/moment-jalaali-es.js'
// NOTE: Value accepted from this component is based on Miladi format
// you should pass to it Miladi date as string
// output of this component (which name is 'value') is based on Miladi format.
// SO:
// INPUT: MILADI (STRING)
// SHOWING IN CALENDAR: JALALI (STRING)
// OUTPUT: MILADI (STRING)
export default {
  name: 'FormBuilderDateTime',
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
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          this.inputData = null
          this.displayDateTime = ''
          return
        }
        const newDate = jMoment(newValue.toString()).format('YYYY-MM-DD')
        const newTime = jMoment(newValue.toString()).format('HH:mm:00')
        this.updateDateTime(newDate, 'date')
        this.updateDateTime(newTime, 'time')
      },
      immediate: true
    }
  },
  methods: {
    onClickInput (event) {
      // Get input element
      const input = event.target

      // Get input element's bounding box
      const inputRect = input.getBoundingClientRect()

      // Calculate click position relative to input element
      const clickX = event.clientX - inputRect.left

      // Calculate halfway point
      const halfwayPoint = inputRect.width / 2

      // Determine which side was clicked
      if (clickX < halfwayPoint) {
        this.popupDate = true
      } else {
        this.popupTime = true
      }
    },
    onClear () {
      this.displayDateTime = ''
      this.inputData = null
      this.change(this.inputData)
    },
    onChangeDate (newValue) {
      this.updateDateTime(newValue, 'date')
    },
    onChangeTime (newValue) {
      this.updateDateTime(newValue, 'time')
    },
    updateDateTime (newValue, updateType = 'date') {
      const defaultDate = jMoment(Date.now()).format('YYYY-MM-DD')
      const defaultTime = jMoment(Date.now()).format('HH:mm:00')
      const inputData = this.inputData ? this.inputData : defaultDate + ' ' + defaultTime
      const arrValue = inputData.toString().trim().split(' ')
      let arrDisplay = new Array(arrValue)
      if (updateType === 'date') {
        arrDisplay = [newValue.toString(), arrValue[1]]
        if (this.calendar === 'persian') {
          arrValue[0] = this.shamsiToMiladiDate(newValue.toString())
        } else {
          arrValue[0] = newValue.toString()
        }
      } else if (updateType === 'time') {
        const timeWithoutSecond = arrValue[1].split(':').splice(0, 2).join(':')
        if (this.calendar === 'persian') {
          arrDisplay = [this.miladiToShamsiDate(arrValue[0]), timeWithoutSecond]
        } else {
          arrDisplay = [arrValue[0], timeWithoutSecond]
        }
        arrValue[1] = newValue.toString()
      }

      this.displayDateTime = arrDisplay.join(' ').replace(',', ' ')
      this.inputData = arrValue.join(' ').replace(',', ' ')
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
