export default class InternalServerError extends Error {
    PrintError;
    StatusCode;

    constructor(message, PrintError) {
        super(message);
        this.name = "InternalServerError";
        this.PrintError = PrintError;
        this.StatusCode = 500;
    }
}
