const express = require("express");
const UserRouter = express.Router();
const userController = require("../controllers/user.controller");

UserRouter.post("/register", userController.userRegister);
UserRouter.post("/login", userController.userLogin);

module.exports = UserRouter;
