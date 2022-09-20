<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <div class="dateTime-input">
    <q-input
        v-show="show('date')"
        v-model="dateTime.date"
        :name="name"
        class="form-calender"
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
        @click="showDateMenu"
    >
      <template #prepend>
        <q-icon :name="calendarIcon" class="cursor-pointer" :class="customClass">
          <q-menu v-if="!readonly" v-model="showDate" :class="customClass">
            <q-date
                v-model="dateTime.date"
                :calendar="calendar"
                mask="YYYY-MM-DD"
                :range="range"
                :multiple="multiple"
                :disable="disable"
                :title="title ? title : label"
                :today-btn="todayBtn"
                :class="customClass"
                @update:model-value="change($event)"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="بستن" color="primary" flat />
              </div>
            </q-date>
          </q-menu>
        </q-icon>
      </template>
    </q-input>
    <q-input
        v-show="show('time')"
        v-model="dateTime.time"
        :name="name"
        class="time-input-dateTime"
        :clearable="true"
        dir="ltr"
        :disable="disable"
        :label="placeholder ? null : label"
        :stack-label="!!placeholder"
        :placeholder="placeholder"
        mask="time"
        :rules="rules"
        :lazy-rules="lazyRules"
        readonly
        :outlined="outlined"
        :class="customClass"
        :input-class="customClass"
        @click="showTimeMenu"
    >
      <template #append>
        <q-menu v-if="!readonly" v-model="showTime" :class="customClass">
          <q-time
              v-model="dateTime.time"
              mask="HH:mm:00"
              format24h
              :disable="disable"
              :title="title ? title : label"
              :now-btn="nowBtn"
              :class="customClass"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="بستن" color="primary" flat />
            </div>
          </q-time>
        </q-menu>
        <q-icon :name="clockIcon" class="cursor-pointer"> </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from 'moment-jalaali';
import inputMixin from '../mixins/inputMixin';
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
  data() {
    return {
      dateTime: {
        date: '',
        time: '',
      },
      showDate: false,
      showTime: false,
    };
  },
  props: {
    name: {
      default: '',
      type: String,
    },
    calendar: {
      default: 'persian',
      type: String,
    },
    calendarIcon: {
      default: 'event',
      type: String,
    },
    clockIcon: {
      default: 'access_time',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
    nowBtn: {
      default: false,
      type: Boolean,
    },
    todayBtn: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    dateTime: {
      handler(n) {
        if (this.type === 'dateTime') {
          this.tempValue =
              this.shamsiToMiladiDate(n.date) + ' ' + this.formatTime(n.time);
        } else {
          if (this.type === 'date') {
            this.tempValue = this.shamsiToMiladiDate(n.date);
          }
          if (this.type === 'time') {
            this.tempValue = this.formatTime(n.time);
          }
        }
        this.change(this.tempValue);
      },
      deep: true,
    },
    value(n) {
      if (n === '' || Number(n.split(' ')[0].split('-')[0]) > 2000) {
        this.dateTime.date = this.miladiToShamsiDate(n.split(' ')[0]);
        this.dateTime.time = this.formatTime(n.split(' ')[1]);
        return;
      }
      if (this.type === 'time') {
        this.dateTime.time = n;
      } else if (this.type === 'date') {
        this.dateTime.date = n;
      } else {
        let temp = n.split(' ');
        this.dateTime.date = temp[0];
        this.dateTime.time = temp[1];
      }
    },
  },
  methods: {
    showDateMenu() {
      this.showDate = true;
    },
    showTimeMenu() {
      this.showTime = true;
    },
    show(t) {
      return this.type === 'dateTime' || this.type === t;
    },
    shamsiToMiladiDate(date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    },
    miladiToShamsiDate(date) {
      return moment(date, 'YYYY/MM/DD').format('jYYYY-jMM-jDD');
    },
    formatTime(time) {
      return moment(time, 'HH:mm').format('HH:mm:00');
    },
  },
};
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
