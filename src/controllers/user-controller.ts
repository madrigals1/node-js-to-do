import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import userModel from "../models/user-model";
import { userService } from "../service/user-service";

class UserController {
    async registration(req: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            };
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
            return response.json(userData);
        } catch (error) {
            next(error);
        };
    };

    async login(req: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password)
            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
            return response.json(userData);
        } catch (error) {
            next(error)
        }
    };

    async logout(req: Request, response: Response, next: NextFunction) {
        try {
            let refreshToken;
            if (req.cookies.refreshToken) {
                refreshToken = req.cookies.refreshToken;
            } else {
                refreshToken = req.body.refreshToken;
            }
            const token = await userService.logout(refreshToken);
            response.clearCookie('refreshToken');
        } catch (error) {
            next(error);
        }
    }
    async refresh(req: Request, response: Response, next: NextFunction) {
        try {
            let refreshToken;
            if (req.cookies.refreshToken) {
                refreshToken = req.cookies.refreshToken;
            } else {
                refreshToken = req.body.refreshToken;
            }
            const userData = await userService.refresh(refreshToken);
            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
            return response.json(userData);
        } catch (error) {
            next(error);
        }
    };

    async getUsers(req: Request, response: Response, next: NextFunction) {
        try {
            const users: any = await userModel.find();
            const result: any = users.map((item: any) => {
                return {
                    _id: item._id,
                    email: item.email,
                    todos: item.todos,
                    __v: item.__v
                }
            })
            return response.json(result);
        } catch (error) {
            next(error);
        }
    };
}
export const userController = new UserController();