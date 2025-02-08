<template>
  <div class="form-builder-optionGroup"
       :class="customClass">
    <div v-if="label"
         class="outsideLabel">
      {{ label }}
    </div>
    <q-option-group ref="input"
                    v-model="inputData"
                    :name="name"
                    :options="options"
                    :color="color"
                    :inline="inline"
                    :dense="dense"
                    :type="typeOfInput"
                    :disable="disable || readonly"
                    :class="customClass"
                    @update:model-value="change"
                    @click="onClick">
      <template #label="opt">
        <q-icon v-if="opt.icon"
                :name="opt.icon"
                color="teal"
                size="1.5em"
                class="q-ml-sm" />
        <span v-if="opt.label">{{ opt.label }}</span>
        <div v-if="opt.caption"
             class="caption text-grey-8">
          {{ opt.caption }}
        </div>
      </template>
    </q-option-group>
  </div>
</template>

<script lang="ts">
export interface Option {
  label?: string;
  value: string | number | boolean;
  icon?: string;
  caption?: string;
}

export interface FormBuilderOptionGroupProps {
  name?: string;
  value?: string | number | boolean | object | Array<unknown>;
  options: Option[];
  typeOfInput?: 'radio' | 'checkbox' | 'toggle';
  color?: string;
  inline?: boolean;
  dense?: boolean;
  disable?: boolean;
  readonly?: boolean;
  label?: string;
}
</script>

<script setup lang="ts">
import { useInputComposable } from 'src/composables/useInputComposable'
import {
  ref,
  watch
} from 'vue'

const props = defineProps<FormBuilderOptionGroupProps>()
const emit = defineEmits(['update:value', 'onClick'])
const inputData = ref(props.value)
const { customClass } = useInputComposable(props)

watch(() => props.value, (newValue) => {
  inputData.value = newValue
})

const change = (val: string | number | boolean | object | Array<unknown>) => {
  emit('update:value', val)
}

const onClick = (data: Event) => {
  emit('onClick', data)
}
</script>

<style scoped></style>
