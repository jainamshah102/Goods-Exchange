/**
 * FILTER FIELD NOT CHANGE TO UNDEFINED
 * BEFORE UPDATE TO MONGODB
 */

exports.loginNotChange = (newObj, originalObj) => {
  const keyValueArr = Object.entries(newObj)
  const result = keyValueArr.filter(([key, value]) => {
    return value !== originalObj[key]
  })

  return Object.fromEntries(result)
}

exports.shippingNotChange = (newObj, originalObj) => {
  const keyValueArr = Object.entries(newObj)
  const result = keyValueArr.filter(([key, value]) => {
    return value !== originalObj['shipping'][key]
  })

  return Object.fromEntries(result)
}
