const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const InvalidParameters = require("../errors/invalidParameters");
const AuthenticationError = require("../errors/authenticationError");
const User = require("../models/user.model");
const UserJoi = require("../joiValidation/user.joi");
let success=false;
module.exports.userRegister = async (req, res, next) => {
    try {
        const newUser = await UserJoi.userRegisterJoi(req.body);
        const checkUser = await Promise.all([
            User.findOne({ email: newUser.email }).exec(),
            User.findOne({ contactNumber: newUser.contactNumber }).exec(),
            User.findOne({ username: newUser.username }).exec(),
        ]);

        if (checkUser[0] || checkUser[1] || checkUser[2])
            return next(new InvalidParameters("User already exists."));

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
        console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.userLogin = async (req, res, next) => {
    try {
        const { username, password } = await UserJoi.userLoginJoi(req.body);

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                },
                process.env.SERVER_SECRET_KEY
            );
            success=true;
            return res.status(200).json({ success,user, token });
        }

        return next(new AuthenticationError("Invalid Username/Password"));
    } catch (err) {
        next(new InvalidParameters("Invalid Parameters"));
    }
};
