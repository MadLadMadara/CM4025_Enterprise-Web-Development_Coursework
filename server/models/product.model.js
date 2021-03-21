
// TODO:Comment
// ---------- Imports
import mongoose from 'mongoose'
import User from '../models/user.model'

// ---------- User model
// Product propertys
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Product name is required'
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
    min: [250, 'Weight can not be below 250g'],
    required: 'Product name is required'
  },
  viewedBy: [{
    type: mongoose.ObjectId,
    ref: User
  }],
  views: {
    type: Number,
    min: [0, 'Negitivew views are not alloweds'],
    default: 0
  }
})

export default mongoose.model('Product', ProductSchema)
