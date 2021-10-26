const mongoose = require("mongoose");

PRODUCT_CONDITION = [
    "Acceptable",
    "Brand New",
    "Certified Pre-Owned",
    "Damaged",
    "For Parts",
    "Good",
    "Like New",
    "Manufacturer Refurbished",
    "New",
    "New Other",
    "New With Box",
    "New With Defects",
    "New With Tags",
    "New Without Box",
    "New Without Tags",
    "Pre-Owned",
    "Remanufactured",
    "Retread",
    "Seller Refurbished",
    "Used",
    "Very Good",
];

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    condition: {
        type: String,
        required: true,
    },

    primaryImage: {
        type: String,
        required: true,
    },

    secondryImages: [String],
});

module.exports = mongoose.model("Product", ProductSchema);
