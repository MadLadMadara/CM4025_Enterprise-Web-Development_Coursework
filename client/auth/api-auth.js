/**
 * @fileoverview api request functions for users signin and out.
 * @exports signin
 * @exports signout
 * @author Sam McRuvie
 */

/**
 * @name signin
 * @description Singns in user based on email and password by sending request to server
 * @param {JSON} user users object constaining propertys name and email
 * @returns {JSON} User data containing name, gender, age. preferences
 */
const signin = async (user) => {
  try {
    const response = await fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

/**
 * @name signout
 * @descripting signs out user by sending request to server, and clearing JWT cookie
 * @returns {JSON} With with propert 'message'
 */
const signout = async () => {
  try {
    const response = await fetch('/auth/signout/', { method: 'GET' })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  signin,
  signout
}
