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
