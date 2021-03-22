/**
 * @fileoverview Express routes for user sign in and out
 * @exports router
 * @author Sam McRuvie
 */
// ---- Express package/imports
import express from 'express'
// ---- Controllers imports
import authCtrl from '../controllers/auth.controller'

const router = express.Router() // init express router
/**
 * @name path:'/auth/signin'
 * @description API routes usser authentication
 * @inner
 * @function post Route to authenticat user
 */
router.route('/auth/signin')
  .post(authCtrl.signin)
/**
 * @name path:'/auth/signout'
 * @description API route User signout, removes 'jwt' auth token 
 * @inner
 * @function get Route logout a user
 */
router.route('/auth/signout')
  .get(authCtrl.signout)

export default router
