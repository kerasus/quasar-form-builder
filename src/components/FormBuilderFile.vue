<template>
  <div class="form-builder-file"
       :class="customClass">
    <div class="outsideLabel">
      {{ placeholder ? label : null }}
    </div>
    <q-file :id="inputUid"
            ref="input"
            v-model="file"
            :name="name"
            :label="placeholder ? null : label"
            :stack-label="!!placeholder"
            :placeholder="placeholder"
            :disable="disable"
            :filled="filled"
            :capture="capture"
            :error="error"
            :error-message="errorMessage"
            :accept="accept"
            :readonly="readonly"
            :loading="loading"
            clearable
            :rules="rules"
            :lazy-rules="lazyRules"
            :class="customClass"
            :input-class="customClass"
            @update:model-value="change"
            @clear="onClearInputFile"
            @click="onClick" />
    <label :for="inputUid"
           class="cursor-pointer"
           @click="downloadFile">
      <q-img v-if="previewMode === 'photo'"
             :src="imageSource"
             class="cursor-pointer"
             :class="customClass" />
      <q-icon v-else-if="previewMode"
              :name="previewIcons[previewMode]"
              size="100px"
              class="cursor-pointer"
              :class="customClass" />
    </label>
    <div v-if="caption"
         class="caption text-grey-8">
      {{ caption }}
    </div>
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from 'src/assist.ts'

export type FormBuilderFileType = FormBuilderGenericInputType & {
  value: string | File | null;
  caption?: string;
  capture?: string;
  sendNull?: boolean;
  accept?: string;
  placeholder?: string;
  disable?: boolean;
  filled?: boolean;
  error?: boolean;
  errorMessage?: string;
  readonly?: boolean;
  loading?: boolean;
  rules?: unknown[];
  lazyRules?: boolean;
};

export const FormBuilderFileDefaults: FormBuilderFileType = {
  ...FormBuilderGenericInputDefaults, // Include generic defaults
  value: null,
  caption: undefined,
  capture: undefined,
  sendNull: false,
  accept: undefined,
  placeholder: undefined,
  disable: false,
  filled: false,
  error: false,
  errorMessage: undefined,
  readonly: false,
  loading: false,
  rules: [],
  lazyRules: false
}
</script>

<script lang="ts" setup>
import { uid } from 'quasar'
import { useInputComposable } from '@/composables/useInputComposable'
import {
  ref,
  watch,
  computed,
  onMounted
} from 'vue'

const props = withDefaults(defineProps<FormBuilderFileType>(), FormBuilderFileDefaults)

const emit = defineEmits(['update:value', 'onClick'])
const { customClass } = useInputComposable(props)

const file = ref<File | null>(null)
const inputUid = ref(uid())
const url = ref<string | null>(null)

const previewIcons: Record<string, string> = {
  audio: 'audiotrack',
  pdf: 'picture_as_pdf',
  'office/word': 'description',
  'office/excel': 'table_view'
}

const imageSource = computed(() => {
  if (typeof props.value === 'string') {
    return props.value
  } else if (props.value instanceof File) {
    return URL.createObjectURL(props.value)
  }
  return null
})

const previewMode = computed(() => {
  if (typeof props.value === 'string') {
    return getFileExtension(props.value)
  } else if (props.value instanceof File) {
    return getFileExtension(props.value.name)
  }
  return ''
})

function change(val: File | null) {
  emit('update:value', val)
}

function onClick(event: Event) {
  emit('onClick', event)
}

function onClearInputFile() {
  file.value = null
  emit('update:value', props.sendNull ? null : url.value)
}

function downloadFile() {
  if (typeof props.value === 'string') {
    window.open(props.value, '_blank')
  }
}

function getFileExtension(filePath: string): string {
  const extensions: Record<string, RegExp> = {
    photo: /\.(jpeg|jpg|gif|png)$/i,
    audio: /\.(mp3|ogg)$/i,
    'office/word': /\.(doc|docx)$/i,
    'office/excel': /\.(xls|xlsx)$/i,
    pdf: /\.(pdf)$/i
  }
  return Object.keys(extensions).find((key) => extensions[key].test(filePath)) || ''
}

watch(() => props.value, (newValue) => {
  if (newValue instanceof File) {
    file.value = newValue
  } else if (typeof newValue === 'string') {
    url.value = newValue
  }
})

onMounted(() => {
  if (typeof props.value === 'string') {
    url.value = props.value
  }
})
</script>
