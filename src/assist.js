const normalizeInput = (input) => {
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

const setAttributeByName = (inputData, name, attribute, value) => {
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

export {
  setAttributeByName,
  normalizeInput
}
