/**
 * @fileoverview Admin controllers
 * @exports createProduct
 * @exports readProduct
 * @exports listProduct
 * @exports resetProductViews
 * @exports updateProduct
 * @exports removeProduct
 * @exports invertRoleUser
 * @exports listUsers
 * @author Sam McRuvie
 */

// ----Project imports DB models
import User from '../models/user.model'
import Product from '../models/product.model'
// ----DB package/imports
import extend from 'lodash/extend'
// ---- Helpers package/imports
import errorHandler from './../helpers/dbErrorHandler'
import productAnalyitic from '../helpers/productAnalyticHelper'

/**
 * @name createProduct
 * @decription Creates a product based on 'req.body' in product document DB
 * @param {Object} req from express, is the request to server, requires property 'req.body' that the product
 * @param {Object} res from express, is the response to the request, returns JSON 'message' or 'error'
 * @returns {Object} res object 'message' with statues '200' or 'error' with statuse '400'
 */
const createProduct = async (req, res) => {
  const product = new Product(req.body)
  try {
    await product.save()
    return res.status(200).json({
      message: 'Successfully added product!'
    })
  } catch (err) {
    // console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
/**
 * @name readProduct
 * @decription Formats a single product from product document DB as JSON respons
 * @param {Object} req from express, is the request to server, requires property 'req.product' that is the product to be returnd
 * @param {Object} res from express, is the response to the request, returns JSON of a product
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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
/**
 * @name listProduct
 * @decription Gets a all product from product document DB
 * @param {Object} req from express, is the request to server, is not used by function
 * @param {Object} res from express, is the response to the request, returns JSON of a all product /w Analyitic data
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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
/**
 * @name resetProductViews
 * @decription Resets a single product 'viewBy' & 'views' feild from product document DB
 * @param {Object} req from express, is the request to server, requires property 'req.product' that is the product to be reset
 * @param {Object} res from express, is the response to the request, returns JSON of product reset
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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
/**
 * @name updateProduct
 * @decription Update a single product from product document DB
 * @param {Object} req from express, is the request to server, requires property 'req.product' that is the product to be updates
 * @param {Object} res from express, is the response to the request, returns JSON of updated product
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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
/**
 * @name removeProduct
 * @decription Removes a single product from product document DB
 * @param {Object} req from express, is the request to server, requires property 'req.product' that is the product to be removed
 * @param {Object} res from express, is the response to the request, returns JSON of removed product
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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

/**
 * @name invertRoleUser
 * @decription Inverts a user admin Boolean feild in user document DB
 * @param {Object} req from express, is the request to server, requires property 'req.body.user_id' that is the user to be affected
 * @param {Object} res from express, is the response to the request, returns JSON of user affected
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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

/**
 * @name listUsers
 * @decription Get all users in user document DB
 * @param {Object} req from express, is the request to server, not used in function
 * @param {Object} res from express, is the response to the request, returns JSON of user all users
 * @returns {Object} res object if error ocuress with statuse '400' and JSON with property 'error'
 */
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
