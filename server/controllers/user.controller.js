/**
 * @fileoverview Admin controllers
 * @exports create
 * @exports userByID
 * @exports read
 * @exports remove
 * @exports update
 * @author Sam McRuvie
 */

// ----Project imports DB models
import User from '../models/user.model'
// ----Lodash package/imports
import extend from 'lodash/extend'
// ---- Helpers package/imports
import errorHandler from './../helpers/dbErrorHandler'

/**
 * @name create
 * @decription Creates a user based on 'req.body' in user document DB
 * @param {Object} req from express, is the request to server, requires property 'req.body' that the user 
 * to be created
 * @param {Object} res from express, is the response to the request, returns JSON with
 * property 'message' or property 'error'
 * @returns {Object} res object 'message' with statues '200' or 'error' with statuse '400'
 */
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    user.admin = false
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up!'
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
/**
 * @name userByID
 * @decription Gets a single user from user document DB that matches id param with id in user DB
 * @param {Object} req from express, is the request to server,'.profile' property of req will be user set
 * to user profile being accsessed.
 * attmepting to accsess profile
  * @param {Object} res from express, is the response to the request, will return only if user is
 * not found with '400' statuse and JSON w/ property 'error' that contains error message
 * @callback next() Call back method, note: Some call back method comments may be '@param' insted
 * @param {String} id User id of user information being requested.
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status('400').json({
        error: 'User not found'
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user'
    })
  }
}
/**
 * @name read
 * @decription Formsts a single user from user document DB as JSON respons
 * @param {Object} req from express, is the request to server, requires property 'req.profile' that is the profile to be returnd
 * @param {Object} res from express, is the response to the request, returns JSON of a user profile
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}
/**
 * @name update
 * @decription Update a single user from user document DB
 * @param {Object} req from express, is the request to server, requires property 'req.profile' that is the user profile
 *  to be updates and 'req.body' that is the up todate profile to be stored in user DB
 * @param {Object} res from express, is the response to the request, returns JSON of updated profile
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
const update = async (req, res) => {
  try {
    let user = req.profile
    req.body.admin = user.admin
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
/**
 * @name remove
 * @decription Removes a single user from user document DB
 * @param {Object} req from express, is the request to server, requires property 'req.profile' that is the profile to be removed
 * @param {Object} res from express, is the response to the request, returns JSON of removed profile
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
const remove = async (req, res) => {
  try {
    const user = req.profile
    const deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  userByID,
  read,
  remove,
  update
}
