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
             :error="error"
             :error-message="errorMessage"
             :stack-label="!!placeholder"
             :placeholder="placeholder"
             :rules="rules"
             :lazy-rules="lazyRules"
             :outlined="outlined"
             :class="customClass"
             :input-class="customClass"
             @clear="onClear"
             @click="onClickInput">
      <template #prepend>
        <q-icon :name="calendarIcon"
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
                    :title="title || label"
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
      <template #append>
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

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from '@/assist.ts'

export type FormBuilderDateType = FormBuilderGenericInputType & {
  value: string;
  outsideLabel?: string;
  calendar?: 'persian' | 'gregorian';
  calendarIcon?: string;
  title?: string;
  todayBtn?: boolean;
};

export const FormBuilderDateDefaults: FormBuilderDateType = {
  ...FormBuilderGenericInputDefaults, // Include generic defaults
  value: '',
  outsideLabel: '',
  calendar: 'persian',
  calendarIcon: 'event',
  todayBtn: false
}
</script>

<script lang="ts" setup>
import jMoment from '../../assets/jalali-moment.browser.js'
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  onMounted
} from 'vue'

const props = withDefaults(defineProps<FormBuilderDateType>(), FormBuilderDateDefaults)

const emit = defineEmits(['update:value', 'input', 'change', 'clear'])

const displayDateTime = ref('')
const popupDate = ref(false)
const dateTime = ref({ date: '' })
const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  if (!newValue) {
    displayDateTime.value = ''
    return
  }
  displayDateTime.value = miladiToShamsiDate(newValue)
}, { immediate: true })

function onClickInput() {
  popupDate.value = true
}

function onClear() {
  displayDateTime.value = ''
  emit('update:value', '')
}

function onChangeDate(newValue: string) {
  const gregorianDate = props.calendar === 'persian' ? shamsiToMiladiDate(newValue) : newValue
  updateDateTime(gregorianDate)
}

function updateDateTime(newValue: string) {
  displayDateTime.value = newValue
  emit('update:value', newValue)
}

function shamsiToMiladiDate(date: string) {
  return jMoment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
}

function miladiToShamsiDate(date: string) {
  return jMoment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')
}

onMounted(() => {
  displayDateTime.value = props.value ? miladiToShamsiDate(props.value) : ''
})
</script>
