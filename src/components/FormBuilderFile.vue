<template>
  <div class="form-builder-file"
       :class="customClass">
    <div class="outsideLabel">{{ placeholder ? label : null }}</div>
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
            :model-value="file"
            :rules="rules"
            :lazy-rules="lazyRules"
            :class="customClass"
            :input-class="customClass"
            @update:model-value="change($event)"

            @clear="onClearInputFile"
            @click="onClick" />
    <label :for="inputUid"
           class="cursor-pointer"
           @click="downloadFile()">
      <q-img v-if="previewMode === 'photo'"
             :src="imageSource"
             placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
             class="cursor-pointer"
             :class="customClass" />
      <q-icon v-if="previewMode === 'audio'"
              size="2rem"
              name="audiotrack"
              class="cursor-pointer"
              :class="customClass" />
      <q-icon v-if="previewMode === 'pdf'"
              size="100px"
              name="picture_as_pdf"
              class="cursor-pointer"
              :class="customClass" />
      <q-icon v-if="previewMode === 'office/word'"
              size="100px"
              name="description"
              class="cursor-pointer"
              :class="customClass" />
      <q-icon v-if="previewMode === 'office/excel'"
              size="100px"
              name="table_view"
              class="cursor-pointer"
              :class="customClass" />
    </label>
    <div v-if="caption"
         class="caption text-grey-8">{{ caption }}</div>
  </div>
</template>

<script>
import { uid } from 'quasar'
import { inputMixin } from 'quasar-form-builder'

export default {
  name: 'FormBuilderFile',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Object]
    },
    caption: {
      default: null,
      type: String
    },
    capture: {
      default: undefined,
      type: String
    },
    sendNull: {
      default: false,
      type: Boolean
    },
    accept: {
      default: undefined,
      type: String
    }
  },
  data() {
    return {
      file: null,
      inputUid: null,
      url: null
    }
  },
  computed: {
    imageSource() {
      if (this.isValidURL(this.inputData)) {
        return this.inputData
      } else if (this.inputData instanceof File) {
        return this.createObjectURL()
      } else if (this.inputData === null) {
        return this.url
      } else {
        return null
      }
    },
    previewMode() {
      let extension = ''
      if (this.inputData === null) {
        extension = this.getSourceExtension(this.url)
      } else {
        extension = this.getSourceExtension(this.inputData)
      }

      return extension
    }
  },
  watch: {
    value(newValue) {
      this.inputData = newValue
      if (this.isFile(newValue)) {
        this.file = newValue
      }
      if (newValue === null && this.sendNull) {
        this.url = null
        this.file = newValue
      }
    },
    inputData(newValue) {
      if (this.isValidURL(newValue) && this.getSourceExtension(newValue) === 'photo') {
        this.url = newValue
      }
    },
    file(newValue) {
      if (newValue === null) {
        this.inputData = this.url
      } else {
        this.inputData = newValue
      }
    }
  },
  created() {
    this.inputUid = this.getUid()
  },
  methods: {
    downloadFile () {
      window.open(this.value, '_blank')
    },
    onClearInputFile() {
      // this.inputData = this.url
    },
    getSourceExtension(filePath) {
      if (this.isValidURL(filePath)) {
        return this.getFileExtension(filePath)
      } else if (this.isFile(filePath)) {
        return this.getFileExtension(filePath.name)
      } else {
        return false
      }
    },
    getFileExtension(filePath) {
      if (!filePath || typeof filePath !== 'string') {
        return false
      }
      const photoExtensions = /\.(jpeg|jpg|gif|png)$/,
          audioExtensions = /\.(mp3|ogg)$/,
          officeWordExtensions = /\.(doc|docx)$/,
          officeExcelExtensions = /\.(xls|xlsx)$/,
          pdfExtensions = /\.(pdf|PDF)$/

      if (filePath.match(photoExtensions) != null) {
        return 'photo'
      } else if (filePath.match(audioExtensions) != null) {
        return 'audio'
      } else if (filePath.match(pdfExtensions) != null) {
        return 'pdf'
      } else if (filePath.match(officeWordExtensions) != null) {
        return 'office/word'
      } else if (filePath.match(officeExcelExtensions) != null) {
        return 'office/excel'
      } else {
        return false
      }
    },
    isFile(file) {
      return typeof File !== 'undefined' && file instanceof File && typeof file.type === 'string'
    },
    isValidURL(str) {
      if (!str || typeof str !== 'string' || this.isFile(str)) {
        return false
      }
      const a = document.createElement('a')
      a.href = str
      return a.host !== ''
    },
    createObjectURL() {
      return window.URL.createObjectURL(this.inputData)
    },
    getUid() {
      return uid()
    }
  }
}
</script>

<style scoped></style>
