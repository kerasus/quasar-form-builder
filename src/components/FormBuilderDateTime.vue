<template>
  <div>
    <div v-if="canShowTime && canShowDate" class="dateTime-input">
      <q-input v-model="dateTime.date" class="form-calender" :clearable="true" dir="ltr" :disable="disable" :label="label" mask="date" @clear="clearDate">
        <template #prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="dateTime.date" :calendar="calendar" mask="YYYY-MM-DD" :range="range" :multiple="multiple" :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="dateTime.time" class="time-input-dateTime" :clearable="true" dir="ltr" :disable="disable" mask="time" @clear="clearDate">
        <template #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="dateTime.time" mask="HH:mm:00" format24h :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div v-else>
      <q-input v-model="outputText" :clearable="true" dir="ltr" :disable="disable" :label="label" @clear="clearDate">
        <template v-if="canShowDate" #prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="inputData" :calendar="calendar" :mask="mask" :range="range" :multiple="multiple" :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-if="canShowTime" #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="inputData" :mask="mask" format24h :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali';
import inputMixin from '../mixins/inputMixin'
import { date } from 'quasar'

export default {
  name: 'FormBuilderDateTime',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Array]
    },
    calendar: {
      default: 'persian',
      type: String
    }
  },
  emits: ['update:value'],
  data () {
    return {
      dateTime: {
        date: '',
        time: ''
      }
    }
  },
  computed: {
    canShowTime () {
      return (!this.range && !this.multiple) && this.time
    },
    canShowDate () {
      return this.date
    },
    mask () {
      if (this.canShowTime && !this.canShowDate) {
        return 'HH:mm:00'
      } else if (!this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD'
      } else {
        return ''
      }
    },
    outputText () {
      if (!this.inputData) {
        return
      }
      if (Array.isArray(this.inputData)) {
        let ranges = this.inputData.map(item => {
          if (item.from) {
            return ('(' + item.from + '-' + item.to + ')')
          } else {
            return ('(' + item + ')')
          }
        })
        ranges = ranges.join(', ')
        return ranges
      } else if (this.inputData.from) {
        return ('(' + this.inputData.from + '-' + this.inputData.to + ')')
      }
      return this.inputData
    }
  },
  watch: {
    value (newValue) {
      if (!newValue) {
        this.inputData = newValue
        return
      }
      if (!newValue.from && this.calendar === 'persian' && this.canShowDate) {
        this.inputData = this.miladiToShamsiDate(newValue)
      } else if (newValue.from) {
        this.inputData.from = this.miladiToShamsiDate(newValue.from)
        this.inputData.to = this.miladiToShamsiDate(newValue.to)
      }
      this.dateTime.date = date.formatDate(this.inputData, 'YYYY-MM-DD')
      this.dateTime.time = date.formatDate(this.inputData, 'HH:mm:00')
    }
  },
  created () {
    this.dateTime.date = date.formatDate(this.inputData, 'YYYY-MM-DD')
    this.dateTime.time = date.formatDate(this.inputData, 'HH:mm:00')
  },
  methods: {
    clearDate () {
      this.inputData = null
      this.change(null)
    },
    change (val) {
      let fullDate = val
      if (this.canShowTime && this.canShowDate) {
        this.dateTime.date = date.formatDate(this.dateTime.date, 'YYYY-MM-DD')
        fullDate = this.dateTime.date + ' ' + this.dateTime.time
      }
      if (fullDate && !fullDate.from && this.calendar === 'persian' && this.canShowDate) {
        fullDate = this.shamsiToMiladiDate(fullDate)
      }
      if (fullDate && fullDate.from) {
        fullDate.from = this.shamsiToMiladiDate(fullDate.from)
        fullDate.to = this.shamsiToMiladiDate(fullDate.to)
      }
      this.$emit('update:value', fullDate)
    },
    miladiToShamsiDate (date) {
      if (this.canShowDate && this.canShowTime) {
        return moment(new Date(date)).format('jYYYY/jM/jD HH:mm:00')
      } else {
        return moment(new Date(date)).format('jYYYY/jM/jD')
      }
    },
    shamsiToMiladiDate (date) {
      if (this.canShowDate && this.canShowTime) {
        return moment(date, 'jYYYY/jMM/jDD HH:mm:00').format('YYYY-MM-DD HH:mm:00')
      } else {
        return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dateTime-input{
  display: flex;
  flex-direction: row;
  .form-calender{
    width: 50%;
  }
  .time-input-dateTime{
    width: 50%;
    .q-field__native{
      padding: 24px 0 8px !important;
    }
  }
}
</style>
<style lang="scss">
.dateTime-input{
  .time-input-dateTime{
    .q-field__native{
      padding: 24px 0 8px;
    }
  }
}
</style>

