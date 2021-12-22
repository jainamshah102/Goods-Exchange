// IMPORTS
const path = require('path')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const {
  notFoundError,
  customErrorHandler,
} = require('./middleware/error.middleware')
const productRoutes = require('./routes/product.route')
const userRoutes = require('./routes/user.route')
const requestRoutes = require('./routes/request.route')
const transactionRoutes = require('./routes/transaction.route')

// CONFIG
dotenv.config()
connectDB()

// CONSTANTS
const PORT = process.env.PORT || 5000
const app = express()

morgan.token('custom', '🧅 🧅 :method :url => :status :total-time ms')
app.use(morgan('custom'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/transactions', transactionRoutes)

const ___dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(___dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(___dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('OK ! API is running ...')
  })
}

// Handle page not found error
app.use(notFoundError)

// Replace for express default error handler
app.use(customErrorHandler)

app.listen(
  PORT,
  console.log(
    `👍 👍 👍 ${process.env.NODE_ENV} MODE SERVER OK @: ${PORT}`.yellow.bold
  )
)
