// ---------- imports
import User from '../models/user.model'
import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import productAnalyitic from '../helpers/productAnalyticHelper'

const createProduct = async (req, res) => {
  const product = new Product(req.body)
  try {
    await product.save()
    return res.status(200).json({
      message: 'Successfully added product!'
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const readProduct = async (req, res) => {
  try {
    const product = req.product
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const listProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('viewedBy', 'preferences age gender')
    const response = productAnalyitic.parseMultipleProductAnalyitic(products)
    res.json(response)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const resetProductViews = async (req, res) => {
  try {
    const product = req.product
    product.viewedBy = []
    product.views = 0
    await product.save()
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    let product = req.product
    product = extend(product, req.body)
    await product.save()
    product.viewedBy = undefined
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeProduct = async (req, res) => {
  try {
    const product = req.product
    const deletedProduct = await product.remove()
    deletedProduct.viewedBy = undefined
    res.json(deletedProduct)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// admin update
const invertRoleUser = async (req, res) => {
  try {
    let user = await User.findById(req.body.user_id)
    if (!user) {
      return res.status('400').json({
        error: 'User not found'
      })
    }
    user.admin = !user.admin
    user = extend(user, req.body)
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user'
    })
  }
}

const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created admin age gender preferences')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  createProduct,
  readProduct,
  listProduct,
  resetProductViews,
  updateProduct,
  removeProduct,
  invertRoleUser,
  listUsers
}
