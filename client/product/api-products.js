// TODO:need to comment
const create = async (product, credentials) => {
  try {
    const response = await fetch('/api/products/admin', {
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

const list = async (signal) => {
  console.log('listing the users')
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

const read = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/products/' + params.productId + '/' + params.userId, {
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

const update = async (params, credentials, user) => {
  try {
    const response = await fetch('api/products/admin/' + params.productId, {
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
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    const response = await fetch('api/products/admin/' + params.productId, {
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

export {
  create,
  list,
  read,
  update,
  remove
}
