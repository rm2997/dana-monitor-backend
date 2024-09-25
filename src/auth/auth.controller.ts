import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/user/entities/user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  async loging(@Body() user: UserDto) {
    const validUser = await this.authService.validateUser(user);
    if (user) return this.authService.login(validUser);
    else throw new UnauthorizedException();
  }
}
