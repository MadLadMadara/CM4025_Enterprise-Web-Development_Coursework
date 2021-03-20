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
    console.log(err)
  }
}
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
    console.log(err)
  }
}
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
    console.log(err)
  }
}

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
    console.log(err)
  }
}

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
    console.log(err)
  }
}

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
    console.log(err)
  }
}

const listUsers = async (params, credentials, signal) => {
  console.log('listing the users for admin')
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
    console.log(err)
  }
}

const invertRoleUser = async (params, credentials, signal, id) => {
  console.log('listing the users for admin')
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
    console.log(err)
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
