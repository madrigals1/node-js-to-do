import bcrypr from 'bcrypt';

import UserModel from '../models/user-model';
import { ApiError } from '../exceptions/api-error';

import { TokenService } from './token-service';

export class UserService {
  static async registration(email: string, password: string): Promise<any> {
    const candidate: any = await UserModel.findOne({ email });
    if (candidate) {
      throw new (ApiError.BadRequest as any)(`User with  email ${email} already exist`);
    }
    const hashPassword: string = await bcrypr.hash(password, 3);
    const user: any = await UserModel.create({ email, password: hashPassword });

    return this.returnData(user);
  }

  static async login(email: string, password: string): Promise<any> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('User with this email not found');
    }
    const isEqualPassword = await bcrypr.compare(password, user.password);
    if (!isEqualPassword) {
      throw ApiError.BadRequest('Incorrect password');
    }

    return this.returnData(user);
  }

  static async logout(refreshToken: string): Promise<any> {
    return TokenService.removeToken(refreshToken);
  }

  static async refresh(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData: any = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user: any = await UserModel.findById(userData.id);

    return this.returnData(user);
  }

  static async returnData(user: any): Promise<any> {
    const userDto = {
      email: user.email,
      id: user._id,
      todos: user.todos,
    };
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
