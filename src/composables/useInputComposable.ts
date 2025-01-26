import { computed } from 'vue'
import { FormBuilderGenericInputType } from 'src/assist.ts'

export function useInputComposable(props: Partial<FormBuilderGenericInputType>) {
  const customClass = computed(() => props.customClass)

  return {
    customClass
  }
}
