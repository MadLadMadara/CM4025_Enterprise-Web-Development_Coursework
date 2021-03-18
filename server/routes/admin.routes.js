// ----------- imports
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'
import adminCtrl from '../controllers/admin.controllers'

// ----------- imports
const router = express.Router()

router.route('/api/admin/products/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.listProduct)

router.route('/api/admin/products/:productId/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.updateProduct)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.removeProduct)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.readProduct)
  .patch(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.resetProductViews)

router.route('/api/admin/users/:userId')
  .patch(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.invertRoleUser)
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, adminCtrl.listUsers)

router.param('userId', userCtrl.userByID)
router.param('productId', productCtrl.productByID)

export default router
