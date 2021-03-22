/**
 * @fileoverview Controller functions for products, requires user auth
 * @exports list
 * @exports productByID
 * @exports read
 * @author Sam McRuvie
 */
// ----Project imports DB models
import Product from '../models/product.model'
// ----Project imports DB helper
import errorHandler from './../helpers/dbErrorHandler'

/**
 * @name list
 * @decription Gets a all product from product document DB
 * @param {Object} req from express, is the request to server, is not used by function
 * @param {Object} res from express, is the response to the request, returns JSON of a all product w/ out analyitics
 * @returns {Object} res object
 */
const list = async (req, res) => {
  try {
    const products = await Product.find().select('views name imgUrl rost description price weight')
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
/**
 * @name productByID
 * @decription Gets a single product from product document DB that matches id param with id in product DB
 * @param {Object} req from express, is the request to server, is not used by function
 * @param {Object} res from express, is the response to the request, will return only if product
 * not found with '400' statuse and JSON w/ property 'error' that contains error message
 * @callback next() Call back method, note: Some call back method comments may be '@param' insted
 * @param {String} id Product id
 * @returns {Object} res object
 */
const productByID = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate('viewedBy', 'preferences age gender')
    if (!product) {
      return res.status('400').json({
        error: 'Product not found'
      })
    }
    req.product = product
    next()
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve product'
    })
  }
}
/**
 * @name read
 * @decription Formats a single product from product document DB as JSON respons
 * @param {Object} req from express, is the request to server, requires property 'req.product' that is the product to be returnd
 * and 'req.profile' of the user accsessing the product. 'req.profile' is used for analytic
 * @param {Object} res from express, is the response to the request, returns JSON of a product
 * @returns {Object} res object
 */
const read = async (req, res) => {
  try {
    const user = req.profile
    const product = req.product
    product.viewedBy.push(user)
    product.views = product.viewedBy.length
    await product.save()
    product.viewedBy = undefined
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  list,
  productByID,
  read
}
