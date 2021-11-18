require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const connection = require("./services/mongodb.connection");

const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const ChatRouter = require("./routes/chat.route");

const upload = require("./services/image.upload");

const NotFoundError = require("./errors/notFoundError");
const cors = require("cors");

const server = app.listen(PORT, () => console.log(`Serving @${PORT}`));

const io = require("socket.io")(server);

connection();
let gfs;

const conn = mongoose.connection;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/chat", ChatRouter);

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
