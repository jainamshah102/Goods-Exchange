const mongoose = require('mongoose')

commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

requestFromSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
)

tradeToSchema = mongoose.Schema({
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  title: {
    type: String,
    required: true,
    default: null,
  },
  image: {
    type: String,
    required: true,
    default: null,
  },
})

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    wishList: {
      type: String,
    },
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [commentSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: [likeSchema],
    numRequests: {
      type: Number,
      required: true,
      default: 0,
    },
    requestsFrom: [requestFromSchema],
    tradeTo: tradeToSchema,
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
