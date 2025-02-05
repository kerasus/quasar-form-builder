<template>
  <div class="form-builder-separator"
       :class="customClass">
    <b v-if="label">
      {{ label }}
    </b>
    <q-separator v-if="hasSize"
                 class="separator-default-style"
                 :name="name"
                 :style="{ 'border-top': borderTopStyle, 'border-left': borderLeftStyle }"
                 :class="[customClass, vertical ? 'separator-vertical' : 'separator-horizontal']"
                 :vertical="vertical"
                 :inset="inset"
                 :spaced="spaced"
                 :size="size"
                 :dark="darkMode" />
  </div>
</template>

<script lang="ts">
import { FormBuilderGenericInputType, FormBuilderGenericInputDefaults } from '@/assist.ts'

// Define the extended type with additional properties.
export type FormBuilderSeparatorType = FormBuilderGenericInputType & {
  color?: string;
  size?: string;
  darkMode?: boolean;
  vertical?: boolean;
  label?: string;
  spaced?: string | boolean;
  separatorType?: string;
  borderSize?: string;
  inset?: string | boolean;
}

const FormBuilderSeparatorDefaults: FormBuilderSeparatorType = {
  color: 'dark',
  size: '1px',
  darkMode: false,
  vertical: false,
  label: '',
  spaced: false,
  separatorType: 'solid',
  borderSize: '',
  inset: false
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useInputComposable } from '@/composables/useInputComposable'

const props = withDefaults(
  defineProps<FormBuilderSeparatorType>(),
  {
    ...FormBuilderGenericInputDefaults,
    ...FormBuilderSeparatorDefaults
  }
)

const { customClass } = useInputComposable(props)

const colorTypes = ['#', 'rgb', 'rgba']

const hasSize = computed(() => props.size && props.size !== '0' && props.size !== '0px')

const getSeparatorColor = computed(() => {
  if (colorTypes.some((item) => props.color.includes(item))) {
    return props.color
  }
  return `var(--q-${props.color})`
})

const borderTopStyle = computed(() => getBorderStyle('top'))
const borderLeftStyle = computed(() => getBorderStyle('left'))

function getBorderStyle(type: 'top' | 'left'): string {
  let style = ''
  if (
    ((type === 'top' && !props.vertical) || (type === 'left' && props.vertical)) &&
      props.separatorType &&
      props.size
  ) {
    style = `${props.size} ${props.separatorType} ${getSeparatorColor.value}`
  }
  return style
}
</script>

<style scoped lang="scss">
.separator-default-style {
  background: none;
}
.separator-horizontal {
  min-height: 0 !important;
  height: 0 !important;
}
.separator-vertical {
  min-width: 1px !important;
}
</style>
