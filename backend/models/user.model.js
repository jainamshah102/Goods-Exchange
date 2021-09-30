const mongoose = require("mongoose");

GENDERS = {
    male: "M",
    female: "F",
    other: "O",
};

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        gender: {
            type: String,
            max: 1,
            min: 1,
            default: GENDERS.other,
        },
        dob: {
            type: Date,
            required: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
