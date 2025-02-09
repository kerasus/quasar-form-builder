import { FormBuilderGenericInputDefaults } from 'src/assist'
import { type FormBuilderToggleButtonType } from 'src/types'

export const FormBuilderToggleButtonDefaults: FormBuilderToggleButtonType = {
  ...FormBuilderGenericInputDefaults,
  value: '',
  name: '',
  toggleTextColor: 'black',
  toggleColor: 'primary',
  push: false,
  glossy: false,
  clearable: false,
  unelevated: false,
  stretch: false,
  stack: false,
  spread: false,
  noWrap: false,
  noCaps: false,
  options: [],
  color: '',
  inline: false,
  dense: false,
  toggleType: '',
  textColor: '',
  flat: false,
  outlined: false,
  rounded: false,
  size: '',
  ripple: false
}
