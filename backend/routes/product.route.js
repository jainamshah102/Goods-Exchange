const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controllers/product.controller");
const UserAuth = require("../controllers/auth.controller");

ProductRouter.get("/", UserAuth.verifyToken, productController.NewProduct);

module.exports = ProductRouter;
