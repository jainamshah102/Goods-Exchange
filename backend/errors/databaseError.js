module.exports = class DatabaseError extends Error {
    statusCode = 503;
    name = "Database Error";

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};
