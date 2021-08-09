import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../exceptions/api-error';
import userModel from '../models/user-model';
import { UserService } from '../service/user-service';

export class UserController {
  static async registration(
    req: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      response.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true },
      );
      return response.json(userData);
    } catch (error) {
      return next(error);
    }
  }

  static async login(
    req: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      response.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true },
      );
      return response.json(userData);
    } catch (error) {
      return next(error);
    }
  }

  static async logout(
    req: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let refreshToken;
      if (req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
      } else {
        refreshToken = req.body.refreshToken;
      }
      await UserService.logout(refreshToken);
      response.clearCookie('refreshToken');
    } catch (error) {
      next(error);
    }
  }

  static async refresh(
    req: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      let refreshToken;
      if (req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
      } else {
        refreshToken = req.body.refreshToken;
      }
      const userData = await UserService.refresh(refreshToken);
      response.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true },
      );
      return response.json(userData);
    } catch (error) {
      return next(error);
    }
  }

  static async getUsers(
    req: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const users: any = await userModel.find();
      const result: any = users.map((item: any) => ({
        _id: item._id,
        email: item.email,
        todos: item.todos,
        __v: item.__v,
      }));
      return response.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
