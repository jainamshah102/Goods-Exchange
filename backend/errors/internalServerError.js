export default class InternalServerError extends Error {
    statusCode = 500;

    constructor(message, statusCode) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = statusCode;
    }
}
