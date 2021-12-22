const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')

exports.authRequired = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Error('Token failed!')
  }

  const token = req.headers.authorization.split(' ')[1]
  const { id } = await jwt.verify(token, process.env.SECRET_KEY)

  if (!id) {
    throw new Error('Token not valid!')
  }

  req.user = await User.findById(id).select('-password')
  next()
})
