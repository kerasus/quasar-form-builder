<template>
  <div class="outsideLabel">{{ placeholder ? label : null }}</div>
  <q-input
    v-model="inputData"
    :name="name"
    :disable="disable"
    :label="placeholder ? null : label"
    :stack-label="!!placeholder"
    :outlined="outlined"
    :placeholder="placeholder"
    :rules="rules"
    :lazy-rules="lazyRules"
    @click="showing = true"
  >
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-menu v-if="!readonly" v-model="showing">
          <q-color
            v-model="inputData"
            square
            flat
            default-value="#4b9c70ff"
            :palette="palette"
            @update:model-value="change($event)"
            @click="onClick"
          />
        </q-menu>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import inputMixin from '../mixins/inputMixin';
export default {
  name: 'FormBuilderColor',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean],
    },
    palette: {
      default: () => [], // ['#019A9D', '#D9B801', '#E8045A', '#B2028A']
      type: Array,
    },
  },
  data() {
    return {
      showing: false,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
