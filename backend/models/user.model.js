const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },
    numSuccessTX: {
      type: Number,
      default: 0,
    },
    numFeedback: {
      type: Number,
      default: 0,
    },
    shipping: {
      lastName: { type: String, default: null },
      firstName: { type: String, default: null },
      phoneNumber: { type: String, default: null },
      addressNo: { type: String, default: null },
      street: { type: String, default: null },
      city: { type: String, default: null },
      province: { type: String, default: null },
      memo: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword===this.password;
}


const User = mongoose.model('User', userSchema)

module.exports = User

