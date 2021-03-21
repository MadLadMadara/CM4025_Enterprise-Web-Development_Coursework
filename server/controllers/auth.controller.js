/**
 * @fileoverview Controller functions for authentication all users
 * @exports signin
 * @exports signout
 * @exports requireSignin
 * @exports hasAuthorization
 * @exports hasAdminAuthorization
 * @author Sam McRuvie
 */

// ----Express package/imports
import expressJwt from 'express-jwt'
// ----jsonwebtoken package/imports
import jwt from 'jsonwebtoken'
// ----Project imports DB models
import User from '../models/user.model'
// ----Project imports server config
import config from './../../config/config'

// gloabal varable name for JWT cookie
const JWTCookieNames = 't'

/**
 * @name signin
 * @decription Sines in user, needs 'req.body.email' & 'req.body.email'
 *  propertys that are check against the user DB
 * @param {Object} req from express, is the request to server, has property 'body.email' and 'body.password'
 * @param {Object} res from express, is the response to th request
 * @returns {Object} res object
 */
const signin = async (req, res) => {
  try {
    // find user
    const user = await User.findOne({
      email: req.body.email
    })
    // check if user existes
    if (!user) {
      return res.status('401').json({
        error: 'User not found'
      })
    }
    // chech password match
    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }
    // construct auth token
    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)
    res.cookie(JWTCookieNames, token, {
      expire: new Date() + 9999
    })
    // respond w/ token and user information
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        admin: user.admin
      }
    })
  } catch (err) {
    return res.status('401').json({
      error: 'Could not sign in'
    })
  }
}
/**
 * @name signout
 * @description responds by requesing that browser cookie 'JWTCookieNames' is cleared
 * @param {Object} req from express, is the request to server
 * @param {Object} res from express, is the response to th request
 * @returns 
 */
const signout = (req, res) => {
  res.clearCookie(JWTCookieNames)
  return res.status('200').json({
    message: 'signed out'
  })
}
/**
 * @name requireSignin
 * @description creates expressJwt
 */
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
})
/**
 * @name hasAuthorization
 * @param {Object} req from express, is the request to server, needs 'profile' & 'auth' property
 * @param {Object} res from express, is the response to th request
 * @param {Function} next callback, executes if users is athenticated
 * @returns res object with statuse '403' executes if user has no authentication
 */
const hasAuthorization = (req, res, next) => {
  // checks propfile data agenst users auth
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: 'User is not authorized'
    })
  }
  next()
}
/**
 * @name hasAdminAuthorization
 * @param {Object} req from express, is the request to server, needs 'profile' & 'auth' property
 * @param {Object} res from express, is the response to the request
 * @param {Function} next callback, executes if users is athenticated and is and Admin
 * @returns res object with statuse '403' executes if user has no authentication
 */
const hasAdminAuthorization = (req, res, next) => {
  // checks propfile data agenst users auth, includes admin check
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id && req.profile.admin == true
  if (!(authorized)) {
    return res.status('403').json({
      error: 'User is not authorized for admin'
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  hasAdminAuthorization
}
