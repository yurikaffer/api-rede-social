import { Injectable, Dependencies } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../entitys/users.entity';
import { compareSync } from 'bcrypt';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) {
  }

  async validateUser(userName: string, pass: string) {
    let user: UsersModel
    try {
      user = await this.usersService.findOneByUserName(userName);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(pass, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UsersModel) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}