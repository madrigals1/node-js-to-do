import jwt from 'jsonwebtoken';

import { ITokenDoc, TokenModel } from '../models/token-model';

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export class TokenService {
  static async generateTokens(payload: any): Promise<Tokens> {
    const accessToken: string = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || 'SECRET',
      { expiresIn: '1d' },
    );
    const refreshToken: string = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
      { expiresIn: '30d' },
    );

    return new Promise((resolve) => {
      resolve({
        accessToken,
        refreshToken,
      });
    });
  }

  static async saveToken(
    userId: any,
    refreshToken: any,
  ): Promise<string | ITokenDoc> {
    const tokenData: any = await TokenModel.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return TokenModel.create({ user: userId, refreshToken });
  }

  static async removeToken(refreshToken :string): Promise<any> {
    return TokenModel.deleteOne({ refreshToken });
  }

  static async findToken(refreshToken :string): Promise<any> {
    return TokenModel.findOne({ refreshToken });
  }

  static validateAccessToken(token: any): any {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || 'secret-megasaab',
      );
    } catch (error) {
      return null;
    }
  }

  static validateRefreshToken(token: any): any {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'refresh-mega',
      );
    } catch (error) {
      return null;
    }
  }
}
