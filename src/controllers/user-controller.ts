import { Response, Request, NextFunction } from "express";

class UserController {
    async registration(req: Request, response: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
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