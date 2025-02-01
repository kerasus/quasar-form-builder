<template>
  <div class="form-builder-time"
       :class="customClass">
    <q-input ref="input"
             v-model="displayDateTime"
             :name="name"
             :loading="loading"
             :filled="filled"
             :error="error"
             :error-message="errorMessage"
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
      <template #append>
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

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderTimeType = FormBuilderGenericInputType & {
  value: string;
  calendar: string;
  calendarIcon: string;
  clockIcon: string;
  title: string;
  placeholder: string;
  nowBtn: boolean;
  todayBtn: boolean;
}

export const FormBuilderTimeDefaults: FormBuilderTimeType = {
  value: '',
  calendar: 'persian',
  calendarIcon: 'event',
  clockIcon: 'access_time',
  title: '',
  placeholder: '',
  nowBtn: false,
  todayBtn: false
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useInputComposable } from '@/composables/useInputComposable'

const props = withDefaults(
  defineProps<FormBuilderTimeType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderTimeDefaults
  }
)

const emit = defineEmits(['update:value', 'input', 'change', 'onClick'])

const displayDateTime = ref('')
const popupTime = ref(false)
const dateTime = ref({
  date: '',
  time: ''
})
const inputData = ref(props.value)

const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  if (!newValue) {
    inputData.value = null
    displayDateTime.value = ''
    return
  }
  updateDateTime(newValue)
}, { immediate: true })

function onClickInput() {
  popupTime.value = true
}

function onClear() {
  displayDateTime.value = ''
  inputData.value = null
  emit('update:value', null)
  emit('change', null)
}

function onChangeTime(newValue: string) {
  updateDateTime(newValue)
}

function updateDateTime(newValue: string) {
  const timeWithoutSecond = newValue ? newValue.split(':').splice(0, 2).join(':') : null
  displayDateTime.value = timeWithoutSecond || ''
  inputData.value = newValue || null
  emit('update:value', inputData.value)
  emit('change', inputData.value)
}
</script>
