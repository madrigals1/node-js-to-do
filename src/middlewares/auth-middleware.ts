import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../exceptions/api-error';
import { TokenService } from '../service/token-service';

export function authMiddleWare(
  req: Request | any,
  res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
