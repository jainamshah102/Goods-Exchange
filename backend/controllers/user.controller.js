const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const InvalidParameters = require("../errors/invalidParameters");
const AuthenticationError = require("../errors/authenticationError");
const User = require("../models/user.model");
const UserJoi = require("../joiValidation/user.joi");
require("lodash");

module.exports.verifyToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user_id, {
            email: false,
            password: false,
            _id: false,
            createdAt: false,
            updatedAt: false,
        });

        if (user)
            return res.status(200).json({
                success: true,
                user,
            });

        return res.status(404).json({
            success: false,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.userRegister = async (req, res, next) => {
    try {
        console.log(req.body);
        const newUser = await UserJoi.userRegisterJoi(req.body);
        const checkUser = await Promise.all([
            User.findOne({ email: newUser.email }).exec(),
            User.findOne({ contactNumber: newUser.contactNumber }).exec(),
        ]);

        if (checkUser[1] || checkUser[2])
            return next(new InvalidParameters("User already exists."));

        const encryptedPassword = await bcrypt.hash(newUser.password, 12);
        newUser.password = encryptedPassword;

        const user = await User.create(newUser);

        const token = jwt.sign(
            {
                user_id: user._id,
                contactNumber: user.contactNumber,
            },
            process.env.SERVER_SECRET_KEY
        );

        user.email = undefined;
        user.password = undefined;
        user._id = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;

        res.status(201).json({ user, token, success: true });
    } catch (err) {
        console.log(err);
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.userLogin = async (req, res, next) => {
    try {
        const { contactNumber, password } = await UserJoi.userLoginJoi(
            req.body
        );

        let user = await User.findOne({ contactNumber });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    contactNumber: user.contactNumber,
                },
                process.env.SERVER_SECRET_KEY
            );

            user.email = undefined;
            user.password = undefined;
            user._id = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;

            return res.status(200).json({ user, token, success: true });
        }

        return next(new AuthenticationError("Invalid Username/Password"));
    } catch (err) {
        console.log(err);
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.userUpdate = async (req, res, next) => {};

module.exports.userDelete = async (req, res, next) => {};
