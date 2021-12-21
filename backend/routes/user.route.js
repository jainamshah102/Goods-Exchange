const express = require('express')
const router = express.Router()

const { authRequired } = require('../middleware/auth.middleware')
const {
  authUser,
  getUserProfile,
  registerNewUser,
  updateUserProfile,
  updateUserAddress,
} = require('../controllers/user.controller')

// AUTH USER LOGIN
router.post('/login', authUser)
// REGISTER NEW USER
router.post('/register', registerNewUser)
// GET USER PROFILE
router.get('/profile', authRequired, getUserProfile)
// UPDATE USER PROFILE
router.put('/profile', authRequired, updateUserProfile)

module.exports = router
