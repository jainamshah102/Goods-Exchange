const express = require("express");
const app = express();

// Global error handler
app.use((err, req, res, next) => {});

module.exports = app;
