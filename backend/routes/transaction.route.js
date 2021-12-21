const { createTX, fetchTX } = require('../controllers/transaction.controller')
const { authRequired } = require('../middleware/auth.middleware')

const express = require('express')

const router = express.Router()

// GET ALL
router.get('/', authRequired, fetchTX)

// GET BY ID
// router.get('/:id', authRequired, fetchTXById)

// CREATE NEW
router.post('/', authRequired, createTX)

module.exports = router
