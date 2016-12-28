class ExtError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

export default ExtError;

class HttpException extends Error {
    constructor(status=400, message) {
        super(message);
        Error.apply(this, arguments);
        Error.captureStackTrace(this, HttpError);
        this.status = status ;
        this.message = message || http.STATUS_CODES[status] || "Error";
        this.name = this.constructor.name;
    }
}

export const HttpError = HttpException;