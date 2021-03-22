/**
 * @fileoverview Express routes for Admin user
 * @exports router
 * @author Sam McRuvie
 */
// ---- Express package/imports
import express from 'express'
// ---- Controllers imports
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'
import adminCtrl from '../controllers/admin.controllers'

const router = express.Router() // init express router

/**
 * @name path:'/api/admin/products/:userId'
 * @description Admin API routes for products collections
 * @inner
 * @function get Route retuns list of all products w/ Analytices
 * @function post Route to create a new product in products collection DB
 */
router.route('/api/admin/products/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.listProduct)
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.createProduct)

/**
 * @name path:'/api/admin/products/:productId/:userId'
 * @description Admin API routes for products collections, for single product accsess and
 * manipulation
 * @inner
 * @function put Route updates single product based on ':productId' URL param &
 * 'req.body'
 * @function delete Route removes single product based on ':productId' URL param
 * @function get Route retuns a single product based on ':productId' URL param
 * @function patch Route resets 'viewBy' & 'views' feild of a single product based on ':productId' URL param
 */
router.route('/api/admin/products/:productId/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updateProduct)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.removeProduct)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.readProduct)
  .patch(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.resetProductViews)

/**
 * @name path:'/api/admin/users/:userId'
 * @description Admin API routes for user collections, for single product accsess and
 * manipulation
 * @inner
 * @function patch Route changes inverts user Admin privalages on 'req.body.user_id' of
 * user
 * @function get Route retuns a list of all users
 */
router.route('/api/admin/users/:userId')
  .patch(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.invertRoleUser)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.listUsers)

/**
 * @description resolves URL param 'userId' adds '.profile' to 'req' of user with
 * 'userId'
 * @param {String} userId A users ID in users collection DB
 */
router.param('userId', userCtrl.userByID)
/**
 * @description resolves URL param 'productId' adds '.product' to 'req' of product with
 * 'productId'
 * @param {String} userId A product ID in product collection DB
 */
router.param('productId', productCtrl.productByID)

export default router
