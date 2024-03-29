/**
 * @fileoverview Mongoose schema for the 'users' DB collection
 * @exports mongoose.model
 * @author Sam McRuvie
 */
// ----Mongoose package/imports
import mongoose from 'mongoose'
// ----crypto packages/imports
import crypto from 'crypto'
/**
 * @class UserSchema
 * @description Mongoose schema for 'users' DB collection
 * @type mongoose.Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  admin: {
    type: Boolean,
    default: false
  },
  age: {
    type: Number,
    required: 'Age is required',
    min: [14, 'Too young'],
    max: [150, 'Too old']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binery', 'other'],
    required: 'Gender identity is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  preferences: {
    coffee: {
      preGround: {
        type: Boolean,
        default: false
      },
      rost: {
        type: String,
        enum: ['light', 'medium', 'dark']
      }
    }
  }
})
// ---------- Password & hashed_password propertys handeling
// methodes
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}
// Validation
UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

// virtual Password property
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

export default mongoose.model('User', UserSchema)
