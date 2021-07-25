import  UserModel , { InputUser } from '../models/user-model';
import bcrypr from 'bcrypt';
import { tokenService } from './token-service';
import { ApiError } from '../exceptions/api-error';

class UserService {
    async registration(email: string, password: string): Promise<any> {
        const candidate: any = await UserModel.findOne({email});
        if (candidate) {
            throw new (ApiError.BadRequest as any)(`User with  email ${email} already exist`);
        };
        const hashPassword: string = await bcrypr.hash(password, 3);
        const user: any = await UserModel.create({email, password: hashPassword});
        const userDto = {
            email: user.email,
            id: user._id
        };
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    };

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('User with this email not found');
        };
        const isEqualPassword = await bcrypr.compare(password, user.password);
        if (!isEqualPassword) {
            throw ApiError.BadRequest('Incorrect password');
        };
        const userDto = {
            email: user.email,
            id: user._id
        };
        const tokens = await tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    };
};

export const userService = new UserService();