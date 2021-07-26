import  UserModel , { InputUser } from '../models/user-model';
import bcrypr from 'bcrypt';
import { tokenService } from './token-service';
import { ApiError } from '../exceptions/api-error';
import { TokenModel } from '../models/token-model';
import { response } from 'express';

class UserService {
    async registration(email: string, password: string): Promise<any> {
        const candidate: any = await UserModel.findOne({email});
        if (candidate) {
            throw new (ApiError.BadRequest as any)(`User with  email ${email} already exist`);
        };
        const hashPassword: string = await bcrypr.hash(password, 3);
        const user: any = await UserModel.create({email, password: hashPassword});
        
        return await this.returnData(user);
    };

    async login(email: string, password: string): Promise<any> {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('User with this email not found');
        };
        const isEqualPassword = await bcrypr.compare(password, user.password);
        if (!isEqualPassword) {
            throw ApiError.BadRequest('Incorrect password');
        };
        
        return await this.returnData(user);
    };

    async logout(refreshToken: string): Promise<any> {
       return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        };

        const userData: any = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        };

        const user: any = await UserModel.findById(userData.id)

        return await this.returnData(user);
    };

   async returnData(user: any): Promise<any> {
        const userDto = {
            email: user.email,
            id: user._id
        };
        const tokens = await tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
};

export const userService = new UserService();