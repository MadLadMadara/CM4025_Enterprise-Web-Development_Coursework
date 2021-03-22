/**
 * @fileoverview Express routes for users
 * @exports router
 * @author Sam McRuvie
 */
// ---- Express package/imports
import express from 'express'
// ---- Controllers imports
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router() // init express router

/**
 * @name path:'/api/users'
 * @description API routes for user collections
 * @inner
 * @function post Route to create a new user in user collection DB
 */
router.route('/api/users')
  .post(userCtrl.create)
/**
 * @name path:'/api/users/:userId'
 * @description API routes for user collections, for single user accsesse and
 * manipulation
 * @inner
 * @function put Route updates single user based on ':userId' URL param &
 * 'req.body'
 * @function delete Route removes single user based on ':userId' URL param
 * @function get Route retuns a single user based on ':userId' URL param
 */
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

/**
 * @description resolves URL param 'userId' adds '.profile' to 'req' of user with
 * 'userId'
 * @param {String} userId A users ID in users collection DB
 */
router.param('userId', userCtrl.userByID)

export default router
