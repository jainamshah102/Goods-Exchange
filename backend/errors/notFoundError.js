module.exports = class NotFound extends Error {
    statusCode = 404;
    name = "NotFound";

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};
