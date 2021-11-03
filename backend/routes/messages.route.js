const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/message.controller");
const userAuth = require("../controllers/auth.controller");

messageRouter.get(
    "/messages",
    userAuth.verifyToken,
    messageController.fetchConversation
);

messageRouter.post(
    "/newMessage",
    userAuth.verifyToken,
    messageController.postMessage
);

module.exports = messageRouter;
