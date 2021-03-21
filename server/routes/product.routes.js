// TODO:Comment
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

router.param('userId', userCtrl.userByID)
router.param('productId', productCtrl.productByID)

export default router
