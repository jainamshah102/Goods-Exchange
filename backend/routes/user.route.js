const express = require("express");
const UserRouter = express.Router();
const userRegister = require("../controllers/user.controller");
const userLogin = require("../controllers/userlogin.controller");
UserRouter.post("/register", userRegister);
UserRouter.post("/login", userLogin);

module.exports = UserRouter;
