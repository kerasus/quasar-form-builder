<template>
  <q-btn ref="input"
         :label="label"
         :align="align"
         :flat="flat"
         :color="color"
         :text-color="textColor"
         :size="size"
         :padding="padding"
         :icon="icon"
         :stack="stack"
         :stretch="stretch"
         :icon-right="iconRight"
         :no-wrap="noWrap"
         :unelevated="unelevated"
         :dense="dense"
         :rounded="rounded"
         :push="push"
         :square="square"
         :glossy="glossy"
         :outline="outline"
         :loading="loading"
         :disable="disable"
         :percentage="percentage"
         :class="customClass"
         @click="onClick"
         @keypress="onKeyPress" />
</template>

<script lang="ts">
export type FormBuilderButtonProps = {
  label?: string;
  align?: 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly';
  size?: string;
  padding?: string;
  color?: string;
  textColor?: string;
  icon?: string;
  iconRight?: string;
  dense?: boolean;
  outline?: boolean;
  flat?: boolean;
  unelevated?: boolean;
  rounded?: boolean;
  push?: boolean;
  square?: boolean;
  glossy?: boolean;
  noWrap?: boolean;
  stack?: boolean;
  stretch?: boolean;
  percentage?: number;
  loading?: boolean;
  disable?: boolean;
};
</script>

<script lang="ts" setup>
import { useInputComposable } from '@/composables/useInputComposable'

const props = withDefaults(defineProps<FormBuilderButtonProps>(), {
  color: 'primary',
  percentage: 0,
  dense: false,
  outline: false,
  flat: false,
  unelevated: false,
  rounded: false,
  push: false,
  square: false,
  glossy: false,
  noWrap: false,
  stack: false,
  stretch: false,
  loading: false,
  disable: false
})

const emit = defineEmits(['onClick', 'onKeyPress'])

const { customClass } = useInputComposable(props)

function onClick(event: Event) {
  emit('onClick', event)
}

function onKeyPress(event: Event) {
  emit('onKeyPress', event)
}
</script>
