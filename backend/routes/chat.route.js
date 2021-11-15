const express = require("express");
const chatRouter = express.Router();
const chatController = require("../controllers/chat.controller");
const userAuth = require("../controllers/auth.controller");

chatRouter.get(
    "/messages",
    userAuth.verifyToken,
    chatController.fetchConversation
);

chatRouter.post(
    "/newMessage",
    userAuth.verifyToken,
    chatController.postMessage
);

module.exports = chatRouter;
