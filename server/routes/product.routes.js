/**
 * @fileoverview Express routes from product
 * @exports router
 * @author Sam McRuvie
 */
// ---- Express package/imports
import express from 'express'
// ---- Controllers imports
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'

const router = express.Router()// init express router

/**
 * @name path:'/api/products'
 * @description API routes for products collections
 * @inner
 * @function get Route retuns list of all products
 */
router.route('/api/products')
  .get(productCtrl.list)

/**
 * @name path:'/api/products/:productId/:userId'
 * @description API routes for products collections, for single product
 * @inner
 * @function get Route retuns a single product based on ':productId' URL param
 */
router.route('/api/products/:productId/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.read)
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
