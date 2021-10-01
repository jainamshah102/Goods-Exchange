const express = require("express");
const UserRouter = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const userLogin = require("../controllers/userlogin.controller");

UserRouter.post("/register", userController.userRegister);
UserRouter.post("/login",userLogin);


module.exports = UserRouter;
