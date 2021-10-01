module.exports = class AuthenticationError extends Error {
    statusCode = 401;
    name = "Authentication Error";

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};
