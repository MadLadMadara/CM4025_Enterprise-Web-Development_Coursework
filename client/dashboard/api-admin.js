/**
 * @fileoverview api request functions for admin actions. admin auth required
 * @exports listProducts
 * @exports updateProduct
 * @exports removeProduct
 * @exports readProduct
 * @exports resetViewsProduct
 * @exports listUsers
 * @exports invertRoleUser
 * @exports createProduct
 * @author Sam McRuvie
 */

/**
 * @name listProducts
 * @description Sends request to get all product listings w/ analiytic data
 * @param {JSON} params must contain '.userId', users ID
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} all product listings w/ analiytic data
 */
const listProducts = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name createProduct
 * @description Sends request to create new preoduct
 * @param {JSON} params must contain '.userId', users ID
 * @param {JSON} credentials 'JWT' token
 * @param {JSON} product product data
 * @returns {JSON} product that has been created
 */
const createProduct = async (params, credentials, product) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name updateProduct
 * @description Sends request to updates a product
 * @param {JSON} params must contain '.userId' of the user & '.productId' that is to be updated, users ID
 * @param {JSON} credentials 'JWT' token
 * @param {JSON} product product data
 * @returns {JSON} product that has been updated
 */
const updateProduct = async (params, credentials, product) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.productId + '/' +
    params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name removeProduct
 * @description Sends request to remove a product
 * @param {JSON} params must contain '.userId' of the user & '.productId' that is the product to be remove
 * @param {JSON} credentials 'JWT' token
 * @returns {JSON} product that has been removed
 */
const removeProduct = async (params, credentials) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.productId + '/' +
    params.userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name readProduct
 * @description Sends request to get a single product w/ analiytic data
 * @param {JSON} params must contain '.userId' of the user & '.productId' that is the product to be retrived
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} product requested
 */
const readProduct = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.productId + '/' +
    params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name readProduct
 * @description Sends request to reset viewBy & views feild
 * @param {JSON} params must contain '.userId' of the user & '.productId' that is the product to be reset
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} product that has been reset
 */
const resetViewsProduct = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/admin/products/' +
    params.productId + '/' +
    params.userId, {
      method: 'PATCH',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name listUsers
 * @description Sends request to retrive list of users
 * @param {JSON} params must contain '.userId'
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} product that has been reset
 */
const listUsers = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/admin/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name invertRoleUser
 * @description Sends request to invert admin feild of user with 'id'
 * @param {JSON} params must contain '.userId'
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @param {String} id id of user
 * @returns {JSON} user thats has been updated to or form admin
 */
const invertRoleUser = async (params, credentials, signal, id) => {
  try {
    const response = await fetch('/api/admin/users' + params.userId, {
      method: 'patch',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify({ user_id: id })
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}

export {
  listProducts,
  updateProduct,
  removeProduct,
  readProduct,
  resetViewsProduct,
  listUsers,
  invertRoleUser,
  createProduct
}
