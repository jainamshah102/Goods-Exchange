const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const Transaction = require("../models/transaction.model");

/**
 * @Desc   Create new transaction
 * @Route  POST /api/transactions/
 * @Access Private
 */
exports.createTX = asyncHandler(async (req, res) => {
    const { buyerItemId, sellerItemId } = req.body;

    const buyerItem = await Product.findById(buyerItemId)
        .select(["title", "description", "image", "location", "_id"])
        .populate({
            path: "user",
            select: ["shipping", "_id", "name"],
        });

    const sellerItem = await Product.findById(sellerItemId)
        .select(["title", "description", "image", "location", "_id"])
        .populate({
            path: "user",
            select: ["shipping", "_id", "name"],
        });

    const newTransaction = new Transaction();

    newTransaction.buyer.item = {
        title: buyerItem.title,
        description: buyerItem.description,
        image: buyerItem.image,
        location: buyerItem.location,
        _id: buyerItem._id,
    };
    newTransaction.buyer.user = {
        _id: buyerItem.user._id,
        name: buyerItem.user.name,
    };
    newTransaction.buyer.address = buyerItem.user.shipping;

    newTransaction.seller.item = {
        title: sellerItem.title,
        description: sellerItem.description,
        image: sellerItem.image,
        location: sellerItem.location,
        _id: sellerItem._id,
    };
    newTransaction.seller.user = {
        _id: sellerItem.user._id,
        name: sellerItem.user.name,
    };
    newTransaction.seller.address = sellerItem.user.shipping;

    await newTransaction.save();

    res.status(201).json(newTransaction);
});

/**
 * @Desc   Fetch all transactions
 * @Route  GET /api/transactions/
 * @Access Private
 */
exports.fetchTX = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;

    const transactionList = await Transaction.find({
        $or: [{ "seller.user._id": userId }, { "buyer.user._id": userId }],
    });
    if (!transactionList) {
        throw new Error("You don't have any transaction yet.");
    }

    res.status(201).json(transactionList);
});
