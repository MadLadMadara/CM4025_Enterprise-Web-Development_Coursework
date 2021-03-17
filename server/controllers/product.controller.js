import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

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

const remove = async (req, res) => {
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
const update = async (req, res) => {
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
// admin controlls
const create = async (req, res) => {
  const product = new Product(req.body)

  try {
    await product.save()
    return res.status(200).json({
      message: 'Successfully added product up!'
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const readAdmin = async (req, res) => {
  try {
    const product = req.product
    res.json(product)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const listAdmin = async (req, res) => {
  try {
    const products = await Product.find().populate('viewedBy', 'preferences age gender')
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const resetVewedBy = async (req, res) => {
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

export default {
  create,
  list,
  productByID,
  read,
  remove,
  update,
  readAdmin,
  listAdmin,
  resetVewedBy
}
