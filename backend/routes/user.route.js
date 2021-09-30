const express = require("express");
const UserRouter = express.Router();
const userRegister = require("../controllers/user.controller");

UserRouter.post("/register", userRegister);

module.exports = UserRouter;
