const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controllers/product.controller");
const userAuth = require("../controllers/auth.controller");
const upload = require("../services/product.image.upload");

ProductRouter.get(
    "/listProduct",
    // userAuth.verifyToken,
    productController.listProducts
);

ProductRouter.post(
    "/newProduct",
    userAuth.verifyToken,
    upload.array("images", 10),
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

ProductRouter.get("/image/:filename", productController.viewProductImage);

module.exports = ProductRouter;
