export class ApiError {
    errCode : number;
    message : string;
    details : Object;

    constructor(errCode : number, message : string, details : Object) {
        this.errCode = errCode;
        this.message = message;
        this.details = details;
    }
}