<template>
  <div>
    <div class="outsideLabel">{{ placeholder ? label : null }}</div>
    <q-file
        :id="inputUid"
        v-model="file"
        :label="placeholder? null : label"
        :stack-label="!!placeholder"
        :placeholder="placeholder"
        :disable="disable"
        :readonly="readonly"
        clearable
        :model-value="file"
        :rules="rules"
        :lazy-rules="lazyRules"
        @update:model-value="change($event)"
        @clear="onClearInputFile"
        @click="onClick"
    />
    <label :for="inputUid">
      <q-img
        v-if="previewMode === 'photo'"
        :src="imageSource"
        placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
      />
      <q-icon v-if="previewMode === 'audio'" size="2rem" name="audiotrack" />
      <q-icon v-if="previewMode === 'pdf'" size="100px" name="picture_as_pdf" />
      <q-icon
        v-if="previewMode === 'office/word'"
        size="100px"
        name="description"
      />
      <q-icon
        v-if="previewMode === 'office/excel'"
        size="100px"
        name="table_view"
      />
    </label>
  </div>
</template>

<script>
import { uid } from 'quasar';
import inputMixin from '../mixins/inputMixin';

export default {
  name: 'FormBuilderFile',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, File],
    },
  },
  data() {
    return {
      file: null,
      inputUid: null,
      url: null,
    };
  },
  computed: {
    imageSource() {
      if (this.isValidURL(this.inputData)) {
        return this.inputData;
      } else if (this.inputData instanceof File) {
        return this.createObjectURL();
      } else if (this.inputData === null) {
        return this.url;
      } else {
        return null;
      }
    },
    previewMode() {
      let extension = '';
      if (this.inputData === null) {
        extension = this.getSourceExtension(this.url);
      } else {
        extension = this.getSourceExtension(this.inputData);
      }

      return extension;
    },
  },
  watch: {
    value(newValue) {
      this.inputData = newValue;
      if (this.isFile(newValue)) {
        this.file = newValue;
      }
    },
    inputData(newValue) {
      if (
        this.isValidURL(newValue) &&
        this.getSourceExtension(newValue) === 'photo'
      ) {
        this.url = newValue;
      }
    },
    file(newValue) {
      if (newValue === null) {
        this.inputData = this.url;
      } else {
        this.inputData = newValue;
      }
    },
  },
  created() {
    this.inputUid = this.getUid();
  },
  methods: {
    onClearInputFile() {
      // this.inputData = this.url
    },
    getSourceExtension(filePath) {
      if (this.isValidURL(filePath)) {
        return this.getFileExtension(filePath);
      } else if (this.isFile(filePath)) {
        return this.getFileExtension(filePath.name);
      } else {
        return false;
      }
    },
    getFileExtension(filePath) {
      if (!filePath || typeof filePath !== 'string') {
        return false;
      }
      const photoExtensions = /\.(jpeg|jpg|gif|png)$/,
        audioExtensions = /\.(mp3|ogg)$/,
        officeWordExtensions = /\.(doc|docx)$/,
        officeExcelExtensions = /\.(xls|xlsx)$/,
        pdfExtensions = /\.(pdf)$/;

      if (filePath.match(photoExtensions) != null) {
        return 'photo';
      } else if (filePath.match(audioExtensions) != null) {
        return 'audio';
      } else if (filePath.match(pdfExtensions) != null) {
        return 'pdf';
      } else if (filePath.match(officeWordExtensions) != null) {
        return 'office/word';
      } else if (filePath.match(officeExcelExtensions) != null) {
        return 'office/excel';
      } else {
        return false;
      }
    },
    isFile(file) {
      return file instanceof File && typeof file.type === 'string';
    },
    isValidURL(str) {
      if (!str || typeof str !== 'string' || this.isFile(str)) {
        return false;
      }
      const a = document.createElement('a');
      a.href = str;
      return a.host !== '';
    },
    createObjectURL() {
      return window.URL.createObjectURL(this.inputData);
    },
    getUid() {
      return uid();
    },
  },
};
</script>

<style scoped></style>
