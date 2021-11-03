const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controllers/product.controller");
const userAuth = require("../controllers/auth.controller");

ProductRouter.post(
    "/newProduct",
    userAuth.verifyToken,
    productController.newProduct
);

ProductRouter.get(
    "/viewProduct",
    userAuth.verifyToken,
    productController.viewProduct
);

module.exports = ProductRouter;
