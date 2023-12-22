<template>
  <div class="q-pa-md"
       :class="customClass">
    <div class="text-body2">{{ label }} {{ imageSrcs.length + "/" + amount }}</div>
    <q-btn-group>
      <q-btn v-show="imageSrcs.length < amount"
             icon="camera_alt"
             @click="captureImage" />
      <q-btn icon="folder"
             @click="openModal = true" />
    </q-btn-group>
    <q-dialog v-model="openModal"
              maximized>
      <q-card class="q-pa-md">
        <q-card-section>
          <q-btn v-close-popup
                 icon="close">CLOSE</q-btn>
        </q-card-section>
        <q-card-section v-for="i in imageSrcs"
                        :key="i">
          <q-btn icon="remove"
                 @click="()=>{imageSrcs.splice(imageSrcs.indexOf(i), 1);}" />
          <img v-show="imageSrcs.length > 0"
               class="setImgWidthHeight"
               :src="i">
        </q-card-section>
        <div v-show="imageSrcs.length === 0"
             class="text-h5">No pictures are taken</div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderImageCapture',
  mixins: [inputMixin],

  props: {
    name: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    amount: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      openModal: false,
      imageSrcs: []
    }
  },

  methods: {
    captureImage () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the web camera
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(() => {
            if (!navigator.camera) {
              alert('Could not access device camera.')
              return
            }
            navigator.camera.getPicture(
              (data) => { // on success
                this.imageSrcs.value.push(`data:image/jpeg;base64,${data}`)
              },
              () => { // on fail
                this.$q.notify('Could not access device camera.')
              },
              {
                // this was the broken part, while destination type is 1, the image was not able to load onto the <img>
                destinationType: 0
              }
            )
          })
          .catch((error) => {
            alert('Error accessing the device camera:' + error)
          })
      } else {
        alert('Camera API not available.')
      }
    }
  }
}
</script>

<style scpoed>
.setImgWidthHeight{
  width: 100%;
  height: 100%;}
</style>
