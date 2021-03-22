/* eslint-disable array-callback-return */
/**
 * @fileoverview Functions to help parse produsts with populated 'viewBy' feild to generate Analyitic based on views
 * @exports parseProductAnalyitic
 * @exports parseMultipleProductAnalyitic
 * @author Sam McRuvie
 */

/**
 * @name parseProductAnalyitic
 * @description parse a single product document, converts populated 'viewedBy' feild
 * user data into fromat that the 'victory' charts lib can use
 * @param {JSON} product A product document
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
      age: [
        { x: 'Under 18', y: 0 },
        { x: '18 to 25', y: 0 },
        { x: '26 to 50', y: 0 },
        { x: 'over 50', y: 0 }],
      gender: [
        { x: 'male', y: 0 },
        { x: 'female', y: 0 },
        { x: 'non-binery', y: 0 },
        { x: 'other', y: 0 }],
      rost: [
        { x: 'light', y: 0 },
        { x: 'medium', y: 0 },
        { x: 'dark', y: 0 }],
      views: product.views,
      preground: [
        { x: 'pre-ground', y: 0 },
        { x: 'whole-bean', y: 0 }]
    }
  }
  // iterate over each user in products populated 'viewedBy' feild
  product.viewedBy.forEach((user) => {
    // iterate over each JSON object in 'productRespones.analytics.age' Array
    // and return JSON Object as 'obj'
    productRespones.analytics.age.some((obj) => {
      // increase obj.y if current obj.x is correct catagory & users age is within limits
      if (obj.x === 'Under 18' && user.age < 18) {
        obj.y += 1
        return true // breaks out of her loop
      } else if (obj.x === '18 to 25' && user.age > 18 && user.age < 26) {
        obj.y += 1
        return true // breaks out of her loop
      } else if (obj.x === '26 to 50' && user.age > 25 && user.age < 51) {
        obj.y += 1
        return true // breaks out of her loop
      } else if (obj.x === '26 to 50' && user.age > 50) {
        obj.y += 1
        return true // breaks out of her loop
      }
    })
    // iterate over each JSON object in 'productRespones.analytics.preGround' Array
    // and return JSON Object as 'obj'
    productRespones.analytics.preground.some((obj) => {
      // increase obj.y if current obj.x is correct catagory & users preGround is true
      if (obj.x === 'pre-ground' && user.preferences.coffee.preGround === true) {
        obj.y += 1
        return true // breaks out of he loop
      } else if (obj.x === 'whole-bean' && user.preferences.coffee.preGround === false) {
        obj.y += 1
        return true // breaks out of he loop
      }
    })
    // iterate over each JSON object in 'productRespones.analytics.rost' Array
    // and return JSON Object as 'obj'
    productRespones.analytics.rost.some((obj) => {
      // increase obj.y if current obj.x is equal to 'user.preferences.coffee.rost' ('light', 'medium', 'dark')
      if (obj.x === user.preferences.coffee.rost) {
        // change the value here
        obj.y += 1
        return true // breaks out of he loop
      }
    })
    // iterate over each JSON object in 'productRespones.analytics.gender' Array
    // and return JSON Object as 'obj'
    productRespones.analytics.gender.some((obj) => {
      // increase obj.y if current obj.x is equal to 'user.gender' ('male', 'female', 'non-binary', 'other')
      if (obj.x === user.gender) {
        // change the value here
        obj.y += 1
        return true // breaks out of he loop
      }
    })
  })
  return productRespones
}
/**
 * @description
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
