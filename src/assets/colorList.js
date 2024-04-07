const mainList = [
  'primary',
  'secondary',
  'accent',
  'dark',
  'positive',
  'negative',
  'info',
  'warning'
]

const mainRangeList = [
  'red',
  'pink',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey'
]

const rangeList = mainRangeList.reduce((accumulator, currentValue) => {
  for (let i = 1; i < 15; i++) {
    accumulator.push(currentValue + '-' + i)
  }
  return accumulator
}, [])

const ColorList = [...mainList, ...rangeList]

export default {
  mainList,
  mainRangeList,
  rangeList,
  ColorList
}
