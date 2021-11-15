const InvalidParameters = require("../errors/invalidParameters");
const Message = require("../models/message.model");
const ObjectId = require("mongoose").Types.ObjectId;
const Conversation = require("../models/conversation.model");
const ChatJoi = require("../joiValidation/chat.joi");

module.exports.fetchConversation = async (req, res, next) => {
    try {
        const { userId } = await ChatJoi.fetchConversation(req.query);

        const user1 = new ObjectId(req.user.user_id);
        const user2 = new ObjectId(userId);

        const aggregate = Message.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "to",
                    foreignField: "_id",
                    as: "toObj",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "from",
                    foreignField: "_id",
                    as: "fromObj",
                },
            },
        ])
            .match({
                $or: [
                    {
                        $and: [{ to: user1 }, { from: user2 }],
                    },
                    {
                        $and: [{ to: user2 }, { from: user1 }],
                    },
                ],
            })
            .project({
                "toObj.password": 0,
                "toObj.__v": 0,
                "toObj.date": 0,
                "fromObj.password": 0,
                "fromObj.__v": 0,
                "fromObj.date": 0,
            });

        const messages = await aggregate.exec();

        return res.status(200).json({
            success: true,
            messages: messages,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.postMessage = async (req, res, next) => {
    try {
        let { to, body } = await ChatJoi.postMessage(req.body);

        const from = new ObjectId(req.user.user_id);
        to = new ObjectId(to);

        const conversation = await Conversation.findOneAndUpdate(
            {
                recipients: {
                    $all: [
                        { $elemMatch: { $eq: from } },
                        { $elemMatch: { $eq: to } },
                    ],
                },
            },
            {
                recipients: [from, to],
                lastMessage: body,
                date: Date.now(),
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const message = new Message({
            conversation: conversation._id,
            to,
            from,
            body,
        });

        req.io.sockets.emit("messages", body);
        await message.save();

        return res.status(200).json({
            success: true,
            conversationId: conversation._id,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};
