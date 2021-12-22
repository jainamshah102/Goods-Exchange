exports.notFoundError = (req, res, next) => {
  const error = new Error(`😱 😱 😱 Not found @ ${req.originalUrl}`)
  res.status(404)
  next(error)
}

exports.customErrorHandler = (error, req, res, next) => {
  const statusCode = error.status || 501
  res.status(statusCode)
  res.json({
    status: statusCode,
    message: error.message,
    stack: error.stack,
  })
  console.log('🔥 Err code :>> ', statusCode)
  console.log('💩 Err mess :>> ', error.message)
}

// List of common errors you should prepare for:
// 🎉 🥳 🎊  🔥 👍 💩 😵  😱
// 400 Bad Request Error:
// Used when user fails to include a field (like no credit card information in a payment form)
// Also used when user enters incorrect information (Example: Entering different passwords in a password field and password confirmation field).
// 401 Unauthorized Error: Used when user enters incorrect login information (like username, email or password).
// 403 Forbidden Error: Used when user is not allowed access the endpoint.
// 404 Not Found Error: Used when the endpoint cannot be found.
// 500 Internal Server Error: Used the request sent by the frontend is correct, but there was an error from the backend.
