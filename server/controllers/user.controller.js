// TODO:Comment
// ---------- imports
import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
// TODO: need to finish comments
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    user.admin = false
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up!'
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status('400').json({
        error: 'User not found'
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user'
    })
  }
}
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}
const update = async (req, res) => {
  try {
    let user = req.profile
    req.body.admin = user.admin
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const remove = async (req, res) => {
  try {
    const user = req.profile
    const deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  userByID,
  read,
  remove,
  update
}
