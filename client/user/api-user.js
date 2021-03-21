/**
 * @fileoverview api request functions for user actions.
 * @exports create
 * @exports read
 * @exports update
 * @exports remove
 * @author Sam McRuvie
 */

/**
 * @name create
 * @description Sends request to create a user based on passed papameters
 * @param {JSON} user User data
 * @returns {JSON} Created user
 */
const create = async (user) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name read
 * @description Sends request to get a single users details
 * @param {JSON} params must contain '.userId', users ID
 * @param {JSON} credentials 'JWT' token
 * @param {JavascriptObject} signal Abort signal object
 * @returns {JSON} Requested user
 */
const read = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
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
/**
 * @name read
 * @description Sends request to update a single users details
 * @param {JSON} params  must contain'.userId' of user that is to be updated
 * @param {JSON} credentials 'JWT' token
 * @param {JSON} user  User updated data
 * @returns {JSON} Requested user
 */
const update = async (params, credentials, user) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    // console.log(err)
  }
}
/**
 * @name remove
 * @param {JSON} params must contain'.userId' of user to be removed
 * @param {JSON} credentials 'JWT' token
 * @returns {JSON} removed user
 */
const remove = async (params, credentials) => {
  try {
    const response = await fetch('/api/users/' + params.userId, {
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
export {
  create,
  read,
  update,
  remove
}
