import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";

export function middlewarePrepareException(err: ApiError, req: Request,res: Response,next: NextFunction) {
    console.log(err);
    if (err) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    };

    return res.status(500).json({message: 'Undefined Error'});
};