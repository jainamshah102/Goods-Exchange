const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserRegisterJoi = require("../joiValidation/user.joi");

const userRegister = async (req, res, next) => {
    try {
        const newUser = await UserRegisterJoi(req.body);
        const checkUser = await Promise.all([
            User.findOne({ email: newUser.email }).exec(),
            User.findOne({ contactNumber: newUser.contactNumber }).exec(),
            User.findOne({ username: newUser.username }).exec(),
        ]);

        if (checkUser[0] || checkUser[1] || checkUser[2])
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });

        const encryptedPassword = await bcrypt.hash(newUser.password, 12);
        newUser.password = encryptedPassword;

        const user = await User.create(newUser);

        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.SERVER_SECRET_KEY
        );

        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
};

module.exports = userRegister;
