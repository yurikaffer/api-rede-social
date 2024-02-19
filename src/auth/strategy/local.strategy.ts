import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userName'});
    this.authService = authService;
  }

  async validate(userName: string, password: string) {
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException('Nome de usuário ou senha inválido.');
    }
    return user;
  }
}