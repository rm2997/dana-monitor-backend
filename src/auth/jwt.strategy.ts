import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'RezaMirasgari',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const validUser = await this.userService.findOne(payload.username);
      if (!validUser) {
        throw new UnauthorizedException();
      }
      return validUser;
    } catch (err) {
      Logger.error(err.message, 'JWTStrategy');
    }
  }
}
