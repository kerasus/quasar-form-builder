import * as shvl from 'shvl'
import { type Component } from 'vue'

export type FormBuilderGenericInputType = {
  type: string | Component;
  name: string;
  value?: unknown;
  responseKey?: string;
  tabindex?: number;
  col?: string;
  customClass: string;
  label?: string;
  disable?: boolean;
  readonly?: boolean;
  sendNull?: boolean;
  ignoreValue?: boolean;
  loading?: boolean;
  labelTranslated?: boolean | undefined;
  rules?: string | ((inputValue: string | number) => string | boolean)[];
  clearable?: boolean;
  class?: string;
};

export const FormBuilderGenericInputDefaults: FormBuilderGenericInputType = {
  type: 'input', // Default to a text input
  name: '', // Default to an empty string
  value: undefined, // Default value to undefined
  responseKey: '', // Default to an empty string
  tabindex: 0, // Default to tabindex 0
  col: 'col-12', // Default to an empty string
  customClass: '', // Default to an empty string
  label: '', // Default to an empty label
  disable: false, // Default to not disabled
  readonly: false, // Default to not readonly
  sendNull: false, // Default to false
  ignoreValue: false, // Default to false
  loading: false, // Default to false
  labelTranslated: false, // Default to false
  rules: [], // Default to an empty array
  clearable: false, // Default to false
  class: '' // Default to an empty string for additional classes
}

export const normalizeInput = (input: Required<FormBuilderGenericInputType>) => {
  const ignoreValueTypes = ['separator', 'formBuilder', 'button']
  if (typeof input.type === 'string' && ignoreValueTypes.includes(input.type)) {
    input.ignoreValue = true
  }
  return input
}

export const getFlatInputs = (
  inputData: Required<FormBuilderGenericInputType>[]
): Required<FormBuilderGenericInputType>[] => {
  const getFlatInputsInner = (inputs: Required<FormBuilderGenericInputType>[]): Required<FormBuilderGenericInputType>[] => {
    let values: Required<FormBuilderGenericInputType>[] = []
    inputs.forEach(input => {
      input = normalizeInput(input)
      if (input.type !== 'formBuilder') {
        values.push(input)
      } else {
        const formBuilderInputs = getFlatInputsInner(input.value as Required<FormBuilderGenericInputType>[])
        values = values.concat(formBuilderInputs)
      }
    })
    return values
  }

  return getFlatInputsInner(inputData)
}

export const getInputsByName = (
  inputs: Required<FormBuilderGenericInputType>[],
  name: string
): Required<FormBuilderGenericInputType> | undefined => {
  return getFlatInputs(inputs).find(input => input.name === name)
}

export const setAttributeByName = (
  inputData: Required<FormBuilderGenericInputType>[],
  name: string,
  attribute: keyof Required<FormBuilderGenericInputType>,
  value: unknown
): void => {
  const setInputAttrByName = (inputs: Required<FormBuilderGenericInputType>[]): void => {
    inputs.forEach(input => {
      input = normalizeInput(input)
      if (input.type === 'formBuilder' && Array.isArray(input.value)) {
        setInputAttrByName(input.value as Required<FormBuilderGenericInputType>[])
      } else if (input.name === name) {
        input[attribute] = value
      }
    })
  }

  setInputAttrByName(inputData)
}

export const setInputValues = (
  responseData: Record<string, unknown>,
  inputs: Required<FormBuilderGenericInputType>[]
): void => {
  const setValueOfNestedInputData = (
    responseData: Record<string, unknown>,
    inputs: Required<FormBuilderGenericInputType>[]
  ): void => {
    inputs.forEach(input => {
      if (!input.responseKey) {
        return
      }
      if (input.type === 'formBuilder') {
        setValueOfNestedInputData(responseData, input.value as Required<FormBuilderGenericInputType>[])
        return
      }
      input.value = shvl.get(responseData, input.responseKey, {})
    })
  }

  setValueOfNestedInputData(responseData, inputs)
}

export const getFormData = (
  inputs: Required<FormBuilderGenericInputType>[]
): FormData | Record<string, unknown> => {
  const isFile = (file: unknown): boolean => {
    return file instanceof File
  }

  const formHasFileInput = (inputs: Required<FormBuilderGenericInputType>[]): boolean => {
    const flatInputs = getFlatInputs(inputs).filter(
      item => !item.disable && !item.ignoreValue && typeof item.value !== 'undefined' && item.value !== null
    )
    return flatInputs.some(item => item.type === 'file' || isFile(item.value))
  }

  const formHasFileInputConst = formHasFileInput(inputs)
  const formData = new FormData()
  const jsonData = {}
  const flatInputsCanSendData = getFlatInputs(inputs).filter(item => !item.ignoreValue)

  flatInputsCanSendData.forEach(input => {
    if (
      input.type?.toString().toLowerCase() === 'file' &&
        (
          (!isFile(input.value) && !input.sendNull) ||
          (!isFile(input.value) && input.sendNull && input.value !== null)
        )
    ) {
      return
    }

    if (formHasFileInputConst) {
      if (Array.isArray(input.value)) {
        input.value.forEach(arrayValue => {
          if (arrayValue !== null && typeof arrayValue !== 'undefined') {
            formData.append(input.name + '[]', arrayValue as string | Blob)
          }
        })
      } else if (input.value !== null && typeof input.value !== 'undefined') {
        formData.append(input.name, input.value as string | Blob)
      }
    } else {
      shvl.set(jsonData, input.name, input.value, {})
    }
  })

  return formData
}
