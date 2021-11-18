const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const InvalidParameters = require("../errors/invalidParameters");
const NotFound = require("../errors/notFoundError");
const Product = require("../models/product.model");
const ProductJoi = require("../joiValidation/product.joi");

module.exports.newProduct = async (req, res, next) => {
    try {
        const newProduct = await ProductJoi.newProductJoi(req.body);

        newProduct.user = req.user.user_id;

        const product = await Product.create(newProduct);

        return res.status(201).json({ product, success: true });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.listProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.userProducts = async (req, res, next) => {
    try {
        const { user_id } = await ProductJoi.userProducts(req.query);

        const products = await Product.find({ user: user_id });

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.viewProduct = async (req, res, next) => {
    try {
        const filters = await ProductJoi.viewProduct(req.query);

        const product = await Product.findById(filters.id);

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

let gfs;

const conn = mongoose.connection;

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);

    gfs.collection("photos");
});

module.exports.viewProductImage = async (req, res, next) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        const readStream = gfs.createReadStream(file.filename);

        readStream.pipe(res);
    } catch (error) {
        next(new NotFound("Image not found"));
    }
};
