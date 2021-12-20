const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");

/**
 * @Desc   Create new request
 * @Route  POST /api/requests/
 * @Access Private
 */
exports.createRequest = asyncHandler(async (req, res) => {
    const {
        giveAwayItemId,
        wantedProductId,
        wantedProductImage,
        wantedProductTitle,
    } = req.body;

    const xxx = await Product.findOneAndUpdate(
        { _id: giveAwayItemId },
        {
            $set: {
                tradeTo: {
                    status: true,
                    item: wantedProductId,
                    image: wantedProductImage,
                    title: wantedProductTitle,
                },
            },
        },
        { upsert: false, new: true }
    );
    const wantedProduct = await Product.findOne({ _id: wantedProductId });

    wantedProduct.requestsFrom.push({ item: giveAwayItemId });

    wantedProduct.numRequests = wantedProduct.numRequests + 1;

    await wantedProduct.save();
    res.status(201).json(wantedProduct);
});

/**
 * @Desc   Get all requests
 * @Route  GET /api/requests/
 * @Access Private
 */
exports.getRequests = asyncHandler(async (req, res) => {
    const userLoginId = req.user._id;
    const productsList = await Product.find({
        user: userLoginId,
        tradeTo: { $exists: true },
    });

    if (!productsList.length) {
        res.status(201).json({ message: "You don not have any requests." });
    } else {
        const requestedList = productsList.filter((item) => {
            return item.tradeTo.status === true;
        });

        res.status(201).json(requestedList);
    }
});
