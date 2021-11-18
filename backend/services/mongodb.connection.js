const mongoose = require("mongoose");

const connection = async () => {
    await mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
};

module.exports = connection;
