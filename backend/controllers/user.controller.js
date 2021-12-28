const asyncHandler = require("express-async-handler");
const createToken = require("../utils/createToken");
const User = require("../models/user.model");
const filter = require("../utils/filter");
/**
 * @Desc   Auth user login
 * @Route  POST /api/users/login
 * @Access Public
 */
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please fill in all the information!");
    }

    const user = await User.findOne({ email });

    if (!user) throw new Error("Email does not exist!");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Wrong password!");

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: createToken(user._id),
    });
});

/**
 * @Desc   Register new user
 * @Route  POST /api/users/register
 * @Access Public
 */
exports.registerNewUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error("Please fill in all the information!");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new Error("Email already exist!");
    }

    const user = new User({ email, name, password, shipping: {} });

    await user.save();

    if (!user) {
        throw new Error("User not valid!");
    } else {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user._id),
        });
    }
});

/**
 * @Desc   Get user profile
 * @Route  GET /api/users/profile
 * @Access Private
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).select("-password");
    if (!user) {
        throw new Error("Email không tồn tại!");
    } else {
        res.json(user);
    }
});

/**
 * @Desc   Update user profile
 * @Route  PUT /api/users/profile
 * @Access Private
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const _id = req.user._id;
    const user = await User.findById(_id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const {
        name,
        email,
        password,
        lastName,
        firstName,
        phoneNumber,
        addressNo,
        street,
        city,
        province,
        memo,
    } = req.body;

    let userUpdateProfile = filter.loginNotChange({ name, email }, user);

    const isMatch = await user.matchPassword(password);

    if (password && !isMatch) {
        userUpdateProfile.password = password;
    }

    await User.update({ _id }, userUpdateProfile, {
        upsert: true,
        omitUndefined: true,
    });

    userUpdateProfile = filter.shippingNotChange(
        {
            lastName,
            firstName,
            phoneNumber,
            addressNo,
            street,
            city,
            province,
            memo,
        },
        user
    );
    const isEmpty =
        Object.keys(userUpdateProfile).length === 0 &&
        userUpdateProfile.constructor === Object;

    if (!isEmpty) {
        await User.updateOne({ _id }, [
            { $set: { shipping: userUpdateProfile } },
        ]);
    }

    const updatedUser = await User.findOne({ _id });

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
});
