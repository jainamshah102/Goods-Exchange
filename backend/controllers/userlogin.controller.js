const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserRegisterJoi = require("../joiValidation/user.joi");

const userLogin = async (req,res,next) =>{
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

module.exports = userLogin;