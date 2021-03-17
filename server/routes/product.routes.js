// ----------- imports
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'

// ----------- imports
const router = express.Router()

// user routess

router.route('/api/products')
  .get(productCtrl.list)

router.route('/api/products/:productId/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.read)

// admin product routes
router.route('/api/admin/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.read)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.listAdmin)

router.route('/api/admin/:userId/:productId')
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.remove)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.readAdmin)
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.resetVewedBy)

router.param('userId', userCtrl.userByID)
router.param('productId', productCtrl.productByID)

export default router
