import { computed } from 'vue'
import { FormBuilderGenericInputType } from '../assist'

export function useInputComposable(props: Partial<FormBuilderGenericInputType>) {
  const customClass = computed(() => props.customClass)

  return {
    customClass
  }
}
