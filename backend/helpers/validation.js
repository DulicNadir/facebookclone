const User = require("../models/User")

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
}
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) return false
  else return true
}
exports.validateUsername = async (username) => {
  let boolCheck = false
  do {
    let checkUsername = await User.findOne({ username })
    if (checkUsername) {
      username+=(+new Date()*Math.random()).toString().substring(0,2);
      boolCheck = true
    } else {
      boolCheck = false
    }
  } while (boolCheck)
  return username
}
