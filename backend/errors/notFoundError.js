module.exports = class NotFound extends Error {
    PrintError;
    StatusCode = 404;
    name = "NotFound";

    constructor(message, PrintError) {
        super(message);
        this.PrintError = PrintError;
    }
};
