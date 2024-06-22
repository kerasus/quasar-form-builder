import * as shvl from 'shvl'

export const normalizeInput = (input) => {
  const ignoreValueTypes = [
    'separator',
    'formBuilder',
    'button'
  ]
  if (ignoreValueTypes.includes(input.type) && typeof input.ignoreValue === 'undefined') {
    input.ignoreValue = true
  }
  return input
}

export const setAttributeByName = (inputData, name, attribute, value) => {
  function setInputAttrByName (inputs) {
    inputs.forEach(input => {
      input = normalizeInput(input)
      if (input.type === 'formBuilder') {
        setInputAttrByName(input.value)
      } else {
        if (input.name === name) {
          input[attribute] = value
        }
      }
    })
  }

  setInputAttrByName(inputData)
}

export const getFlatInputs = (inputData) => {
  function getFlatInputsInner (inputs) {
    let values = []
    inputs.forEach(input => {
      input = normalizeInput(input)
      if (input.type !== 'formBuilder') {
        values.push(input)
      } else {
        const formBuilderInputs = getFlatInputsInner(input.value)
        values = values.concat(formBuilderInputs)
      }
    })
    return values
  }

  return getFlatInputsInner(inputData)
}

export const getInputsByName = (inputs, name) => {
  return getFlatInputs(inputs).find((input) => input.name === name)
}

export const setInputValues = (responseData, inputs) => {
  function setValueOfNestedInputData(responseData, inputs) {
    inputs.forEach((input) => {
      if (
        typeof input.responseKey === 'undefined' ||
          input.responseKey === null
      ) {
        return
      }
      if (input.type === 'formBuilder') {
        setValueOfNestedInputData(responseData, input.value)
        return
      }
      input.value = shvl.get(responseData, input.responseKey)
    })
  }

  if (!inputs) {
    inputs = this.inputData
  }
  setValueOfNestedInputData(responseData, inputs)
}
