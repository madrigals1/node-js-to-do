import { Response, Request, NextFunction } from "express";
import { userService } from "../service/user-service";

class UserController {
    async registration(req: Request, response: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return response.json(userData);
        } catch (error) {
            console.log(error);
        };
    };

    async login(req: Request, response: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    };

    async logout(req: Request, response: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    };

    async refresh(req: Request, response: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    };

    async getUsers(req: Request, response: Response, next: NextFunction) {
        try {
            response.json([1,2,3])
        } catch (error) {
            
        }
    };
}
export const userController = new UserController();