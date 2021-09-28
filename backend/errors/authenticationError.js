module.exports = class AuthenticationError extends Error {
    PrintError;
    StatusCode = 401;
    name = "AuthenticationError";

    constructor(message, PrintError) {
        super(message);
        this.PrintError = PrintError;
    }
};
