<template>
  <div>
    <div v-if="canShowTime && canShowDate">
      <div class="outsideLabel">{{ placeholder ? label : null }}</div>
      <div class="dateTime-input">
        <q-input
          v-model="dateTime.date"
          class="form-calender"
          :clearable="true"
          dir="ltr"
          :disable="disable"
          :label="placeholder ? null : label"
          :stack-label="!!placeholder"
          :placeholder="placeholder"
          :rules="rules"
          :lazy-rules="lazyRules"
          mask="date"
          readonly
          :outlined="outlined"
          @click="showingDate = true"
          @clear="clearDate"
        >
          <template #prepend>
            <q-icon :name="calendarIcon" class="cursor-pointer">
              <q-menu v-model="showingDate">
                <q-date
                  v-model="dateTime.date"
                  :calendar="calendar"
                  mask="YYYY-MM-DD"
                  :range="range"
                  :multiple="multiple"
                  :disable="disable"
                  :title="title ? title : label"
                  :today-btn="todayBtn"
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
          v-model="dateTime.time"
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
          @click="showingTime = true"
          @clear="clearDate"
        >
          <template #append>
            <q-menu v-model="showingTime">
              <q-time
                v-model="dateTime.time"
                mask="HH:mm:00"
                format24h
                :disable="disable"
                :title="title ? title : label"
                :now-btn="nowBtn"
                @update:model-value="changeTime($event)"
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
    </div>
    <div v-else>
      <div class="outsideLabel">{{ placeholder ? label : null }}</div>
      <q-input
        v-model="outputText"
        :label="placeholder ? null : label"
        :stack-label="!!placeholder"
        :placeholder="placeholder"
        :rules="rules"
        :lazy-rules="lazyRules"
        :clearable="true"
        dir="ltr"
        :disable="disable"
        readonly
        :outlined="outlined"
        @click="showing = true"
        @clear="clearDate"
      >
        <template v-if="canShowDate" #prepend>
          <q-menu v-model="showing">
            <q-date
              v-model="inputData"
              :calendar="calendar"
              :mask="mask"
              :range="range"
              :multiple="multiple"
              :disable="disable"
              :title="title ? title : label"
              :today-btn="todayBtn"
              @update:model-value="change($event)"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="بستن" color="primary" flat />
              </div>
            </q-date>
          </q-menu>
          <q-icon :name="calendarIcon" class="cursor-pointer"> </q-icon>
        </template>
        <template v-if="canShowTime" #append>
          <q-menu v-model="showing">
            <q-time
              v-model="inputData"
              :mask="mask"
              format24h
              :disable="disable"
              :title="title ? title : label"
              :now-btn="nowBtn"
              @update:model-value="change($event)"
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
  </div>
</template>

<script>
import moment from 'moment-jalaali';
import inputMixin from '../mixins/inputMixin';
import { date } from 'quasar';

export default {
  name: 'FormBuilderDateTime',
  mixins: [inputMixin],
  props: {
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
    placeholder: {
      default: '',
      type: String,
    },
    range: {
      default: false,
      type: Boolean,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '',
      type: String,
    },
    todayBtn: {
      default: false,
      type: Boolean
    },

    nowBtn: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data() {
    return {
      dateTime: {
        date: '',
        time: '',
      },
      dateTimeConcated: '',
      showing: false,
      showingDate: false,
      showingTime: false,
      value: null
    };
  },
  computed: {
    time() {
      return this.type === 'time' || this.type === 'dateTime';
    },
    date() {
      return this.type === 'date' || this.type === 'dateTime';
    },
    canShowTime() {
      return !this.range && !this.multiple && this.time;
    },
    canShowDate() {
      return this.date;
    },
    mask() {
      if (this.canShowTime && !this.canShowDate) {
        return 'HH:mm:00';
      } else if (!this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD';
      } else {
        return '';
      }
    },
    outputText() {
      if(this.canShowTime && this.canShowDate){
        
        return this.dateTimeConcated
      }
      if (!this.inputData) {
        return ;
      }
      if (Array.isArray(this.inputData)) {
        let ranges = this.inputData.map((item) => {
          if (item.from) {
            return '(' + item.from + '-' + item.to + ')';
          } else {
            return '(' + item + ')';
          }
        });
        ranges = ranges.join(', ');
        return ranges;
      } else if (this.inputData.from) {
        return '(' + this.inputData.from + '-' + this.inputData.to + ')';
      }
      if(this.inputData === 'Invalid date'){
        console.error('There is a problem on constructing date')
      }
     
      return this.inputData;
    },
  },
  watch: {
    // value(newValue) {
    //   if (!newValue) {
    //     this.inputData = newValue;
    //     return;
    //   }
    //   if (!newValue.from && this.calendar === 'persian' && this.canShowDate) {
    //     this.inputData = this.miladiToShamsiDate(newValue);
    //   } else if (newValue.from) {
    //     this.inputData.from = this.miladiToShamsiDate(newValue.from);
    //     this.inputData.to = this.miladiToShamsiDate(newValue.to);
    //   }
    //   this.dateTime.date = date.formatDate(this.inputData, 'YYYY-MM-DD');
    //   this.dateTime.time = date.formatDate(this.inputData, 'HH:mm:00');
    // },
    outputText(n){
      this.value = n;
    }
  },
  created() {
    this.dateTime.date = date.formatDate(this.inputData, 'YYYY-MM-DD');
    this.dateTime.time = date.formatDate(this.inputData, 'HH:mm:00');
  },
  methods: {
    clearDate() {
      this.inputData = null;
      this.change(null);
    },
    change(val) {
      let fullDate = val;
      if(fullDate[0] === ''){
        fullDate.shift();
      }
      if (this.canShowTime && this.canShowDate) {
        this.dateTime.date = date.formatDate(this.dateTime.date, 'YYYY-MM-DD');
        fullDate = this.dateTime.date + ' ' + this.dateTime.time;
      }

      // BUG: there is a problem in this if statement
      // which makes fullDate Invalid date in range: true multiple: true
      // but outputText is working properly
      if (
        fullDate &&
        !fullDate.from &&
        this.calendar === 'persian' &&
        this.canShowDate
      ) {
        fullDate = this.shamsiToMiladiDate(fullDate);
      }

      if (fullDate && fullDate.from) {
        fullDate.from = this.shamsiToMiladiDate(fullDate.from);
        fullDate.to = this.shamsiToMiladiDate(fullDate.to);
      }
      return fullDate;
      // this.$emit('update:value', fullDate);
    },
    changeTime(val){
      if(this.dateTime.date){
        this.dateTimeConcated = this.dateTime.date + ' ' + val
      }
    },
    miladiToShamsiDate(date) {
      if (this.canShowDate && this.canShowTime) {
        return moment(new Date(date)).format('jYYYY/jM/jD HH:mm:00');
      } else {
        return moment(new Date(date)).format('jYYYY/jM/jD');
      }
    },
    shamsiToMiladiDate(date) {
      if (this.canShowDate && this.canShowTime) {
        return moment(date, 'jYYYY/jMM/jDD HH:mm:00').format(
          'YYYY-MM-DD HH:mm:00'
        );
      } else {
        return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dateTime-input {
  display: flex;
  flex-direction: row;
  .form-calender {
    width: 50%;
  }
  .time-input-dateTime {
    width: 50%;
    .q-field__native {
      padding: 24px 0 8px !important;
    }
  }
}
</style>
<style lang="scss">
.dateTime-input {
  .time-input-dateTime {
    .q-field__native {
      padding: 24px 0 8px;
    }
  }
}
// removing dotted border for readonly fields from project
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}
.q-field--standard.q-field--readonly .q-field__control:before {
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
