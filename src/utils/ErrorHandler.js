class ErrorHandler extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

export default ErrorHandler;