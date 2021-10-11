const InvalidParameters = require("../errors/invalidParameters");

module.exports.NewProduct = async (req, res, next) => {
    try {
        res.send("working");
    } catch (err) {
        if (process.env.MODE == "development") console.log(err);
        next(new InvalidParameters("Invalid Parameters"));
    }
};
