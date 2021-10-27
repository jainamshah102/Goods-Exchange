const InvalidParameters = require("../errors/invalidParameters");
const Message = require("../models/message.model");
const ObjectId = require("mongoose").Types.ObjectId;
const Conversation = require("../models/conversation.model");

module.exports.convquery = async (req, res, next) => {
    try {
        const user1 = new ObjectId(req.user.user_id);
        const user2 = new ObjectId(req.query.userId);

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

        let messages = [];
        aggregate.exec((err, result) => {
            if (err) {
                if (process.env.MODE == "development") console.log(err);
                return err;
            }
            messages = result;
            return result;
        });

        return res.status(200).json({
            messages: messages,
            success: true,
        });
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};

module.exports.postMessage = async (req, res, next) => {
    console.log(req.body);
    let from = new ObjectId(req.user.user_id);
    let to = new ObjectId(req.body.to);

    Conversation.findOneAndUpdate(
        {
            recipients: {
                $all: [
                    { $elemMatch: { $eq: from } },
                    { $elemMatch: { $eq: to } },
                ],
            },
        },
        {
            recipients: [req.user.user_id, req.body.to],
            lastMessage: req.body.body,
            date: Date.now(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
        function (err, conversation) {
            if (err) {
                console.log(err);
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "Failure" }));
                res.sendStatus(500);
            } else {
                let message = new Message({
                    conversation: conversation._id,
                    to: req.body.to,
                    from: req.user.user_id,
                    body: req.body.body,
                });
                req.io.sockets.emit("messages", req.body.body);
                message.save((err) => {
                    if (err) {
                        console.log(err);
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ message: "Failure" }));
                        res.sendStatus(500);
                    } else {
                        res.setHeader("Content-Type", "application/json");
                        res.end(
                            JSON.stringify({
                                message: "Success",
                                conversationId: conversation._id,
                            })
                        );
                    }
                });
            }
        }
    );
};
