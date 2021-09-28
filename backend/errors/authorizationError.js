module.exports = class AuthorizationError extends Error {
    PrintError;
    StatusCode = 401;
    name = "AuthorizationError";

    constructor(message, PrintError) {
        super(message);
        if (!message) {
            this.message = "Authorization Error";
        } else {
            this.message = message;
        }
        this.PrintError = PrintError;
    }
};
