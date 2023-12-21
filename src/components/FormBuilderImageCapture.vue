
<template>

    <div class="q-pa-md">
      <div class="text-body2">{{ name }}</div>
    <q-btn-group>

        <q-btn 
        v-show="imageSrcs.length < amount"
        icon="camera_alt"
        @click="captureImage">
    </q-btn>
    <q-btn @click="openModal = !openModal" icon="folder">

    </q-btn>
    </q-btn-group>
    <q-dialog v-model="openModal">
        <q-card class="q-pa-md">
          <q-card-section>
            <img v-if="imageSrcs.length > 0" v-for="i in imageSrcs" :src="i" />
            <div class="text-h5" v-if="imageSrcs.length == 0">Fotoğraf çekilmemiş</div>
          </q-card-section>
        </q-card>
    </q-dialog>
</div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

import inputMixin from '../mixins/inputMixin.js'


export default {
    name: 'FormBuilderImageCapture',
    mixins: [inputMixin],

    props: {
    name: {
      default: '',
      type: String
    },
    amount:{
        type: Number,
        default: 1
    },
    },
  
  setup () {
    const openModal = ref(false);
    const $q = useQuasar()
    const imageSrcs = ref([])
        function captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          imageSrcs.push(`data:image/jpeg;base64,${data}`);
        },
        () => { // on fail
          $q.notify('Could not access device camera.')
        },
        {
          //this was the broken part, while destination type is 1, the image was not able to load onto the <img>
          destinationType: 0
        }
      )
    }

    return {
      imageSrcs,
      captureImage,
        openModal
    }
  }
}
</script>