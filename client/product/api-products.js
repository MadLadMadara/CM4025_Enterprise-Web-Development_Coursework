/**
 * @fileoverview api request functions for product, auth required for 'read'
 * @exports list
 * @exports read
 * @author Sam McRuvie
 */
/**
 * @name list
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} all product listings
 */
const list = async (signal) => {
  try {
    const response = await fetch('/api/products/', {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
/**
 * @name listProducts
 * @description Sends request to get a single product
 * @param {JSON} params must contain '.userId', users ID
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} product requested
 */
const read = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/products/' +
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
    console.log(err)
  }
}

export {
  list,
  read
}
