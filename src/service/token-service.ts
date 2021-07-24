import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import {ITokenDoc, TokenModel, IToken } from '../models/token-model';
import { InputUser, UserModel } from '../models/user-model';

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

class TokenService {

    async generateTokens(payload: InputUser): Promise<Tokens> {
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

};

export const tokenService = new TokenService();