
// ---------- Imports
import mongoose from 'mongoose'
import User from '../models/user.model'

// ---------- User model
// Product propertys
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: 'Product already exists',
    required: 'Product name is required'
  },
  imgUrl: {
    type: String,
    unique: 'Image url already in use',
    required: 'Product must have an image'
  },
  rost: {
    type: String,
    enum: ['light', 'medium', 'dark'],
    required: 'Product name is required'
  },
  description: {
    type: String,
    required: 'Product description is required'
  },
  price: {
    type: Number,
    required: 'Product name is required',
    min: [0.01, 'Price can not be below £0.01']
  },
  weight: {
    type: Number,
    max: [1000, 'Weight can not be above 1kg'],
    min: [250, 'Weight can not be below 250g']
  },
  viewedBy: [{
    type: mongoose.ObjectId,
    ref: User
  }]

})

export default mongoose.model('Product', ProductSchema)
