module.exports = class InvalidParameters extends Error {
    PrintError;
    StatusCode = 400;
    name = "InvalidParameters";

    constructor(message, PrintError) {
        super(message);
        if (!message) {
            this.message = "Invalid Parameters";
        } else {
            this.message = message;
        }
        this.PrintError = PrintError;
    }
};
