const InvalidParameters = require("../errors/invalidParameters");
const NotFound = require("../errors/notFoundError");
const Product = require("../models/product.model");
const ProductJoi = require("../joiValidation/product.joi");

module.exports.newProduct = async (req, res, next) => {
    try {
        const newProduct = await ProductJoi.newProductJoi(req.body);

        const product = await Product.create(newProduct);

        return res.status(201).json({ product, success: true });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.viewProduct = async (req, res, next) => {
    try {
        const filters = await ProductJoi.viewProduct(req.params);

        const product = await Product.findOne(filters);

        if (!product) {
            if (process.env.MODE == "development") console.log(err);

            return next(new NotFound("Product not found."));
        }

        return res.status(200).json(product);
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};
