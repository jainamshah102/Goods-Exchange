const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controllers/product.controller");
const userAuth = require("../controllers/auth.controller");

ProductRouter.get(
    "/listProduct",
    // userAuth.verifyToken,
    productController.listProducts
);

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

ProductRouter.get(
    "/userProducts",
    userAuth.verifyToken,
    productController.userProducts
);

module.exports = ProductRouter;
