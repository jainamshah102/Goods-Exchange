const {
  getProducts,
  getProductById,
  createLike,
  createComment,
  createProduct,
  updateProductById,
} = require('../controllers/product.controller')
const { authRequired } = require('../middleware/auth.middleware')

const express = require('express')

const router = express.Router()

// GET ALL
router.get('/', getProducts)

// CREATE NEW
router.post('/', authRequired, createProduct)

// GET PRODUCT BY ID
router.get('/:id', getProductById)

// DELETE PRODUCT BY ID
// router.delete('/:id', deleteProductsById)

// UPDATE PRODUCT BY ID
router.put('/:id', updateProductById)

// POST NEW LIKE
router.post('/:id/likes', authRequired, createLike)

// POST NEW COMMENT
router.post('/:id/comments', authRequired, createComment)

module.exports = router
