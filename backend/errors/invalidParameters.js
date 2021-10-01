module.exports = class InvalidParameters extends Error {
    statusCode = 400;
    name = "Invalid Parameters";

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};
