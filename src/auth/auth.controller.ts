import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/user/entities/user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserDto) {
    console.log(user);

    if (
      user === null ||
      (Object.keys(user).length === 0 && Object.values(user).length === 0)
    )
      throw new BadRequestException();

    if (user.userName === null || user.password == null)
      throw new BadRequestException();

    const validUser = await this.authService.validateUser(user);
    if (validUser) {
      return this.authService.login(validUser);
    } else {
      throw new UnauthorizedException();
    }
  }
}
