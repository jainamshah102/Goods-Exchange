const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/user.route");
const NotFoundError = require("./errors/notFoundError");
const cors = require('cors')
mongoose
    .connect(process.env.MONGO_URL, {})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors())

app.use(express.json());

app.use("/user", UserRouter);

app.all("*", (req, res, next) => {
    return next(new NotFoundError("Api does not exist."));
});

app.use((err, req, res, next) => {
    if (process.env.mode == "development") console.log(err);

    err.statusCode = err.status || 500;
    err.message = err.message || "Failed.";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;
