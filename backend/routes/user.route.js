const express = require("express");
const UserRouter = express.Router();
const userController = require("../controllers/user.controller");
const userAuth = require("../controllers/auth.controller");
const upload = require("../services/profile.image.upload");

UserRouter.get("/", userAuth.verifyToken, userController.verifyToken);

UserRouter.post(
    "/register",
    upload.single("profilePic"),
    userController.userRegister
);

UserRouter.post("/login", userController.userLogin);

UserRouter.put("/update", userAuth.verifyToken, userController.userUpdate);

UserRouter.delete("/delete", userAuth.verifyToken);

module.exports = UserRouter;
