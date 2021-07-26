export class ApiError extends Error {
    status: any;
    errors: any;

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    };

    static UnauthorizedError(): any {
        return new (ApiError as any)(404, 'User not authorized')
    };

    static BadRequest(message: string, errors?: any[]): any {
        return new (ApiError as any)(400, message, errors);
    };
};