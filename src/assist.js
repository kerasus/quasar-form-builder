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

  setValueOfNestedInputData(responseData, inputs)
}

export const getFormData = (inputData) => {
  const isFile = (file) => {
    return file instanceof File
  }
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
  const getValues = (inputData) => {
    function getFlatInputs (inputs) {
      let values = []
      inputs.forEach(input => {
        input = normalizeInput(input)
        if (input.type !== 'formBuilder') {
          values.push(input)
        } else {
          const formBuilderInputs = getFlatInputs(input.value)
          values = values.concat(formBuilderInputs)
        }
      })
      return values
    }

    return getFlatInputs(inputData)
  }
  const formHasFileInput = (inputData) => {
    const inputs = getValues(inputData).filter(item => !item.disable && !item.ignoreValue && typeof item.value !== 'undefined' && item.value !== null)
    const target = inputs.find((item) => item.type === 'file' && isFile(item.value))
    return !!target
  }
  const formHasFileInputConst = formHasFileInput(inputData)
  const formData = formHasFileInputConst ? new FormData() : {}
  const inputs = getValues(inputData).filter(item => !item.disable && !item.ignoreValue)

  inputs.forEach((item) => {
    if (
      item.type.toString().toLowerCase() === 'file' &&
        (
          (!isFile(item.value) && !item.sendNull) ||
            (!isFile(item.value) && item.sendNull && item.value !== null)
        )
    ) {
      return
    }

    if (formHasFileInputConst) {
      if (Array.isArray(item.value)) {
        item.value.forEach(arrayValue => {
          if (arrayValue !== null && typeof arrayValue !== 'undefined') {
            formData.append(item.name + '[]', arrayValue)
          }
        })
      } else {
        if (item.value !== null && typeof item.value !== 'undefined') {
          formData.append(item.name, item.value)
        }
      }
    } else {
      shvl.set(formData, item.name, item.value)
    }
  })

  return formData
}
