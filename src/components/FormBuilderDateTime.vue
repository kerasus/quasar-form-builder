<template>
  <div>
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
</template>

<script>
import moment from "moment-jalaali";
import inputMixin from '../mixins/inputMixin'
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
  computed: {
    canShowTime () {
      return (!this.range && !this.multiple) && this.time
    },
    canShowDate () {
      return !this.time
    },
    mask () {
      if (this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD HH:mm:00'
      } else if (this.canShowTime && !this.canShowDate) {
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
      } else if (newValue.from){
        this.inputData.from = this.miladiToShamsiDate(newValue.from)
        this.inputData.to = this.miladiToShamsiDate(newValue.to)
      }
    }
  },
  methods: {
    clearDate () {
      this.inputData = null
      this.change(null)
    },
    change (val) {
      let date = val
      if (date && !date.from && this.calendar === 'persian' && this.canShowDate) {
        date = this.shamsiToMiladiDate(val)
      }
      if (date && date.from) {
        date.from = this.shamsiToMiladiDate(val.from)
        date.to = this.shamsiToMiladiDate(val.to)
      }
      this.$emit('update:value', date)
    },
    miladiToShamsiDate (date) {
      return moment(new Date(date)).format('jYYYY/jMM/jDD')
    },
    shamsiToMiladiDate (date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
