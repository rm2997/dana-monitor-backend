import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/entities/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { usename: user.userName, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(user: UserDto) {
    try {
      if (Object.keys(user).length === 0 && Object.values(user).length === 0)
        return null;
      const validUser = await this.userService.findOne(user.userName);
      if (
        validUser &&
        (await bcrypt.compare(user.password, validUser.password))
      ) {
        return validUser;
      } else return null;
    } catch (error) {
      Logger.error(error.message, 'AuthService');
    }
  }
}
