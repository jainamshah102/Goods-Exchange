const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const InvalidParameters = require("../errors/invalidParameters");
const User = require("../models/user.model");
const UserRegisterJoi = require("../joiValidation/user.joi");

module.exports.userRegister = async (req, res, next) => {
    try {
        const newUser = await UserRegisterJoi(req.body);
        const checkUser = await Promise.all([
            User.findOne({ email: newUser.email }).exec(),
            User.findOne({ contactNumber: newUser.contactNumber }).exec(),
            User.findOne({ username: newUser.username }).exec(),
        ]);

        if (checkUser[0] || checkUser[1] || checkUser[2])
            return next(new InvalidParameters("User already exists.", 400));

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
        next(new InvalidParameters("Invalid Parameters", 400));
    }
};


module.exports.userLogin = async (req,res,next) =>{
    try{
        const { useranme, password } =await UserRegisterJoi(req.body);
        if (!(useranme && password)) {
            res.status(400).send("All fields are required");
        }

        const user = await User.findOne({ useranme });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
      
            // save user token
            user.token = token;
      
            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch(err){
        next(err);
    }
};