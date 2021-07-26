import { AnyCnameRecord } from 'dns';
import jwt from 'jsonwebtoken';
import {ITokenDoc, TokenModel, IToken } from '../models/token-model';
import { InputUser, UserModel } from '../models/user-model';

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

class TokenService {

    async generateTokens(payload: any): Promise<Tokens> {
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'SECRET', {expiresIn: '30m'});
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET', {expiresIn: '30d'})
        
        return new Promise((resolve, reject) => {
            resolve({
                accessToken,
                refreshToken
            });
        });
    };

    async saveToken(userId: any, refreshToken: any): Promise<string | ITokenDoc> {
        const tokenData: any = await TokenModel.findOne({userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        };

        return await TokenModel.create({user: userId, refreshToken});
    };

    async removeToken(refreshToken :string): Promise<any> {
        return await TokenModel.deleteOne({refreshToken});
    };

    async findToken(refreshToken :string): Promise<any> {
        return await TokenModel.findOne({refreshToken});
    };

    validateAccessToken(token: any): any {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'secret-megasaab')
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: any): any {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-mega')
        } catch (error) {
            return null;
        }
    }

};

export const tokenService = new TokenService();