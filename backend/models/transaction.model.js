const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    buyer: {
      item: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        location: { type: String, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
      },
      address: {
        lastName: { type: String, default: null },
        firstName: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        addressNo: { type: String, default: null },
        street: { type: String, default: null },
        city: { type: String, default: null },
        province: { type: String, default: null },
        memo: { type: String, default: null },
      },
      shippingStatus: {
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
        time: {
          type: Date,
        },
      },
      deliveredStatus: {
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
        time: {
          type: Date,
        },
      },
      feedbackReceived: {
        rating: {
          type: Number,
          default: null,
        },
        comment: {
          type: String,
          default: null,
        },
      },
    },
    seller: {
      item: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        location: { type: String, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
      },
      address: {
        lastName: { type: String, default: null },
        firstName: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        addressNo: { type: String, default: null },
        street: { type: String, default: null },
        city: { type: String, default: null },
        province: { type: String, default: null },
        memo: { type: String, default: null },
      },
      shippingStatus: {
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
        time: {
          type: Date,
        },
      },
      deliveredStatus: {
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
        time: {
          type: Date,
        },
      },
      feedbackReceived: {
        rating: {
          type: Number,
          default: null,
        },
        comment: {
          type: String,
          default: null,
        },
      },
    },
    transactionStatus: {
      type: String,
      default: 'Pending',
      // 'Shipping'
      // 'Receiving'
      // 'Completed'
    },
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
