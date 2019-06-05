module.exports = function (values, directions) {
  if (Array.isArray(values)) {
    if (validDirections(values, 'value')) return values
    throw new Error('invalid values')
  }
  if (typeof values !== 'object') {
    throw new Error('invalid values')
  }
  if (directions) {
    if (!validDirections(directions)) {
      throw new Error('invalid directions')
    }
    var returned = []
    Object.keys(values).forEach(function (key) {
      var value = values[key]
      directions.forEach(function (direction) {
        if (direction.label === key) {
          returned.push({
            value: value,
            blank: direction.blank
          })
        }
      })
    })
    return returned
  } else {
    throw new Error('missing directions')
  }
}

function validDirections (argument, stringKey) {
  stringKey = stringKey || 'label'
  /* istanbul ignore if */
  if (!Array.isArray(argument)) return false
  return argument.every(function (element) {
    if (!element) return false
    if (typeof element !== 'object') return false
    return (
      element.hasOwnProperty(stringKey) &&
      typeof element[stringKey] === 'string' &&
      element[stringKey].length !== 0 &&
      element.hasOwnProperty('blank') &&
      Array.isArray(element.blank) &&
      element.blank.length !== 0 &&
      validBlank(element.blank)
    )
  })
}

function validBlank (blank) {
  console.log('%s is %j', 'blank', blank)
  return (
    Array.isArray(blank) &&
    blank.length !== 0 &&
    blank.every(function (element, index) {
      var mod = index % 3
      console.log('%s is %j', 'mod', mod)
      console.log('%s is %j', 'element', element)
      if (mod === 0) return element === 'content'
      if (mod === 1) {
        return (
          Number.isSafeInteger(element) &&
          element >= 0
        )
      }
      return element === 'form'
    })
  )
}
