const express = require("express");
const UserRouter = express.Router();
const userController = require("../controllers/user.controller");
const userAuth = require("../controllers/auth.controller");

UserRouter.post("/register", userController.userRegister);
UserRouter.post("/login", userController.userLogin);

UserRouter.put("/update", userAuth.verifyToken, userController.userUpdate);
UserRouter.delete("/delete", userAuth.verifyToken);

module.exports = UserRouter;
