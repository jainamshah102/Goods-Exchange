const {
  createRequest,
  getRequests,
} = require('../controllers/request.controller')
const { authRequired } = require('../middleware/auth.middleware')

const express = require('express')

const router = express.Router()

// GET ALL
router.get('/', authRequired, getRequests)

// CREATE NEW
router.post('/', authRequired, createRequest)

module.exports = router
