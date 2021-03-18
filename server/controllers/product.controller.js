import Product from '../models/product.model'
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
    // product.analytics.ageRange.push(user.age)
    // product.analytics.ageRange.push(user.age)
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
