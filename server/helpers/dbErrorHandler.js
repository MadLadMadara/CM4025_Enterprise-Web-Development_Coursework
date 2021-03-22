'use strict'
/**
 * @fileoverview Helper functions for handeling mongo DB errors codes, converts errors 
 * into fromated messages
 * @exports getUniqueErrorMessage
 * @exports getErrorMessage
 * @author Sam McRuvie
 */

/**
 * @name getUniqueErrorMessage
 * @description Formats Mongo DB error message to human redable string
 * @param {JSJON} err Mongo DB error object
 * @returns {String} error message
 */
const getUniqueErrorMessage = (err) => {
  let output
  try {
    const fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2,
      err.message.lastIndexOf('_1'))
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (ex) {
    output = 'Unique field already exists'
  }
  return output
}
/**
 * @name getErrorMessage
 * @description Convers Mongo DB error codes to error message
 * @param {JSJON} err Mongo DB error object
 * @returns {String} error messages
 */
const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err)
        break
      default:
        message = 'Something went wrong'
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message
    }
  }
  return message
}
export default { getErrorMessage }
