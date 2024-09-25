import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
      const validUser = await this.userService.findOne(user.userName);
      if (validUser && bcrypt.compare(user.password, validUser.password))
        return validUser;
      throw new UnauthorizedException();
    } catch (error) {
      Logger.error(error.message, 'AuthService');
    }
  }
}
