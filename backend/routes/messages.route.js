const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const messageController = require("../controllers/message.controller");
const userAuth = require("../controllers/auth.controller");
// const Conversation = require('../../models/conversation.model');



// Get messages from conversation
// based on to & from
router.get('/conversations/query', userAuth.verifyToken,
messageController.convquery);

// Post private message
router.post('/', userAuth.verifyToken,messageController.postmsg);

module.exports = router;