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
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.read)

// admin routes
router.route('/api/products/admin')
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.listWithAnalytics)

router.route('/api/products/admin/:productId')
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, productCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('productId', productCtrl.productByID)

export default router
