class ExtError extends Error {
    constructor(status=400, message, responseType=null) {
        super();
        this.responseType = responseType;
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
        this.status = status;
    }
}

export default ExtError;

class HttpException extends ExtError {
    constructor(status=400, message, responseType=null) {
        super(status, message, responseType);
        Error.apply(this, arguments);
        Error.captureStackTrace(this, HttpError);
        this.message = message || http.STATUS_CODES[status] || "Error";
        this.name = this.constructor.name;
    }
}

export const HttpError = HttpException;

class ValidationException extends ExtError {
    constructor(status=400, message, responseType=null) {
        super(status, message, responseType);
    }
}

export const ValidationError = ValidationException;
