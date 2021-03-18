/**
 * 
 * @param {JSON Object} product A product document from the DB
 * @returns JSON object structured simularly to product found products.model.js 
 * bur with analytics propery.s
 */
const parseProductAnalyitic = (product) => {
  const productRespones = {
    views: product.views,
    _id: product._id,
    name: product.name,
    rost: product.rost,
    description: product.description,
    price: product.price,
    weight: product.weight,
    analytics: {
      age: [],
      gender: [],
      rost: [],
      views: product.views,
      preground: []
    }
  }
  product.viewedBy.forEach((user) => {
    productRespones.analytics.age.push(user.age)
    productRespones.analytics.rost.push(user.preferences.coffee.rost)
    productRespones.analytics.preground.push(user.preferences.coffee.preGround)
    productRespones.analytics.gender.push(user.gender)
  })
  return productRespones
}
/**
 *
 * @param {JSON} products A JSON array containing a list of products
 * @returns Same array but with '.analytics' added to each product
 * JSON Object. See 'parseProductAnalyitic()' in this file.
 */
const parseMultipleProductAnalyitic = (products) => {
  const response = []
  products.forEach((product) => {
    response.push(parseProductAnalyitic(product))
  })
  return response
}

export default {
  parseProductAnalyitic,
  parseMultipleProductAnalyitic
}
