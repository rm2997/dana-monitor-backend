import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './entities/user.dto';
import { User } from './entities/user.entity';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: UserDto): Promise<User> {
    return await this.userService.create(userData.userName, userData.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
