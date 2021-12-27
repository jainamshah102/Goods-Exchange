const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");

/**
 * @Desc   Fetch all products
 * @Route  GET /api/products
 * @Access Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
    const { keyword, userId, available } = req.query;

    let condition = {};

    // if (keyword) {
    //   condition = { title: { $regex: keyword, $options: 'i' } }
    // } else if (userId && !available) {
    //   condition = { user: userId }
    // } else if (userId && available) {
    //   condition = { user: userId, tradeTo: { status: !true } }
    // } else {
    //   condition = {}
    // }

    if (!userId & !keyword) {
        condition = {};
    } else if (keyword) {
        condition = { title: { $regex: keyword, $options: "i" } };
    } else if (userId) {
        condition = { user: userId };
    }

    condition["isTraded"] = false;

    let products = await Product.find(condition);

    if (available === "true") {
        products = products.filter((item) => item.tradeTo === undefined);
    }
    res.json(products);
});

/**
 * @Desc   Fetch single product by ID
 * @Route  GET /api/products/:id
 * @Access Public
 */
exports.getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id)
        .populate({
            path: "user",
            select: ["rating", "numSuccessTX", "numFeedback"],
        })
        .populate({
            path: "requestsFrom.item",
            select: ["title", "image", "userName", "location", "user"],
        });
    if (!product) {
        throw new Error("Product not found!");
    } else {
        res.json(product);
    }
});

/**
 * @Desc   Create new product
 * @Route  POST /api/products/:id/comments
 * @Access Private
 */
exports.createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;

    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json(newProduct);
});

/**
 * @Desc   Create new like
 * @Route  POST /api/products/:id/likes
 * @Access Private
 */
exports.createLike = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const isLiked = product.likes.find(
            (item) => item.user.toString() === req.user._id.toString()
        );
        // toString()

        if (isLiked) {
            res.status(400);
            throw new Error("You đã like rồi!");
        }

        product.likes.push({ user: req.user._id });
        product.numLikes = req.body.numLikes;
        const newProduct = await product.save();

        res.status(201).json({ product: newProduct });
    } else {
        res.status(404);
        throw new Error("Product not found!");
    }
});

/**
 * @Desc   Create new comment
 * @Route  POST /api/products/:id/comments
 * @Access Private
 */
exports.createComment = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.comments.push({
            user: req.user._id,
            name: req.user.name,
            text: req.body.text,
        });

        product.numComments = req.body.numComments;

        const updatedProduct = await product.save();

        res.status(201).json({
            product: updatedProduct,
        });
    } else {
        res.status(404);
        throw new Error("Product not found!");
    }
});

/**
 * @Desc   Update product by ID
 * @Route  PUT /api/products/:id/
 * @Access Private
 */
exports.updateProductById = asyncHandler(async (req, res) => {
    const { _id, title, description, location, wishList, image } = req.body;
    const newProduct = await Product.findOneAndUpdate(
        { _id },
        {
            $set: {
                title,
                description,
                location,
                wishList,
                image,
            },
        },
        { upsert: false, new: true }
    );

    res.status(201).json({
        product: newProduct,
    });
});
