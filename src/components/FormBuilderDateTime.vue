<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <div :key="rendrKey"
       class="dateTime-input">
    <q-input v-show="show('date')"
             v-model="dateTime.date"
             :name="name"
             class="form-calender"
             :clearable="clearable"
             :loading="loading"
             readonly
             mask="date"
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
             @click="showDateMenu">
      <template #prepend>
        <q-icon :name="calendarIcon"
                class="cursor-pointer"
                :class="customClass">
          <q-menu v-if="!readonly"
                  v-model="showDate"
                  :class="customClass">
            <q-date v-model="dateTime.date"
                    :calendar="calendar"
                    mask="YYYY/MM/DD"
                    :range="range"
                    :multiple="multiple"
                    :disable="disable"
                    :title="title ? title : label"
                    :today-btn="todayBtn"
                    :class="customClass"
                    @update:model-value="change($event)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup
                       label="بستن"
                       color="primary"
                       flat />
              </div>
            </q-date>
          </q-menu>
        </q-icon>
      </template>
    </q-input>
    <q-input v-show="show('time')"
             v-model="dateTime.time"
             :name="name"
             class="time-input-dateTime"
             :clearable="clearable"
             dir="ltr"
             :disable="disable"
             :stack-label="!!placeholder"
             :label="show('date') || placeholder ? null:label"
             :placeholder="!show('date') ? placeholder:null"
             mask="time"
             :rules="rules"
             :lazy-rules="lazyRules"
             readonly
             :outlined="outlined"
             :class="customClass"
             :input-class="customClass"
             @click="showTimeMenu">
      <template #append>
        <q-menu v-if="!readonly"
                v-model="showTime"
                :class="customClass">
          <q-time v-model="dateTime.time"
                  mask="HH:mm:00"
                  format24h
                  :disable="disable"
                  :title="title ? title : label"
                  :now-btn="nowBtn"
                  :class="customClass">
            <div class="row items-center justify-end">
              <q-btn v-close-popup
                     label="بستن"
                     color="primary"
                     flat />
            </div>
          </q-time>
        </q-menu>
        <q-icon :name="clockIcon"
                class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import inputMixin from '../mixins/inputMixin.js'
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
    inputData(newValue) {
      this.updateDateTime(newValue)
    },
    dateTime: {
      handler(newValue) {
        const newDate = newValue.date
        const newTime = newValue.time
        if (this.type === 'dateTime' && this.isValidShamsiDate(newDate) && this.isValidShamsiTime(newTime)) {
          this.inputData = this.shamsiToMiladiDate(newDate) + ' ' + this.getMiladiTime(newTime)
          this.change(this.inputData)
        } else if (this.type === 'date' && this.isValidShamsiDate(newDate)) {
          this.inputData = this.shamsiToMiladiDate(newDate)
          this.change(this.inputData)
        } else if (this.type === 'time' && this.isValidShamsiTime(newTime)) {
          this.inputData = this.formatTime(newTime)
          this.change(this.inputData)
        }
      },
      deep: true
    },
    value(newValue) {
      this.updateDateTime(newValue)
    }
  },
  methods: {
    updateDateTime(newMiladi) {
      this.dateTime = {
        date: '',
        time: ''
      }

      if (!newMiladi) {
        return
      }

      if (this.type === 'dateTime') {
        const miladiData = newMiladi.split(' ')[0]
        const time = newMiladi.split(' ')[1]
        if (!this.isValidMiladiDate(miladiData) || !this.isValidMiladiTime(time)) {
          return
        }
        this.dateTime.date = this.miladiToShamsiDate(miladiData)
        this.dateTime.time = this.getShamsiTime(time)
      } else if (this.type === 'time') {
        if (!this.isValidMiladiTime(newMiladi)) {
          return
        }
        this.dateTime.time = newMiladi
      } else if (this.type === 'date') {
        if (!this.isValidMiladiDate(newMiladi)) {
          return
        }
        this.dateTime.date = this.miladiToShamsiDate(newMiladi)
      }

      this.rendrKey = Date.now()
    },
    isValidMiladiDate(miladiDate) {
      // const miladiYear = Number(miladiDate.split(' ')[0].split('-')[0])
      // return miladiDate !== '' && !isNaN(miladiYear) && miladiYear > 1900
      return (/[1,2][0,9][0-9][0-9]-[0,1]{0,1}[0-9]-[0-3]{0,1}[0-9]/gm).test(miladiDate)
    },
    isValidShamsiDate(shamsiDate) {
      // const shamsiYear = Number(shamsiDate.split(' ')[0].split('/')[0])
      // return shamsiDate !== '' && !isNaN(shamsiYear) && shamsiYear > 1300 && shamsiYear < 2000
      return (/1[3,4][0-9][0-9]\/[0,1]{0,1}[0-9]\/[0-3]{0,1}[0-9]/gm).test(shamsiDate)
    },
    isValidMiladiTime(time) {
      return (/[0,1,2]{0,1}[0-9]:[0-5]{0,1}[0-9]:[0-5]{0,1}[0-9]/gm).test(time)
    },
    isValidShamsiTime(time) {
      return (/[0,1,2]{0,1}[0-9]:[0-5]{0,1}[0-9]/gm).test(time)
    },
    showDateMenu() {
      this.showDate = true
    },
    showTimeMenu() {
      this.showTime = true
    },
    show(t) {
      return this.type === 'dateTime' || this.type === t
    },
    shamsiToMiladiDate(date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    },
    miladiToShamsiDate(date) {
      return moment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')
    },
    formatTime(time) {
      return moment(time, 'HH:mm').format('HH:mm:00')
    },
    getShamsiTime(time) {
      return moment(time, 'HH:mm:ss').format('HH:mm')
    },
    getMiladiTime(time) {
      return moment(time, 'HH:mm').format('HH:mm:00')
    }
  }
}
</script>

<style scoped lang="scss">
.dateTime-input {
  display: flex;
  flex-direction: row;

  label {
    width: 100%;
  }

  .time-input-dateTime {
    .q-field__native {
      padding: 24px 0 8px;
    }
  }
}

// removing dotted border for readonly fields from project
:deep(.q-field--outlined.q-field--readonly .q-field__control:before) {
  border-style: solid;
}

:deep(.q-field--standard.q-field--readonly .q-field__control:before) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
