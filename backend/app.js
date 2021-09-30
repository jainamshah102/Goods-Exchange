const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserRouter = require("./routes/user.route");

mongoose
    .connect(process.env.MONGO_URL, {})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use("/user", UserRouter);

module.exports = app;
