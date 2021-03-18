// TODO:need to comment

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
