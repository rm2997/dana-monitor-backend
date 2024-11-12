import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './entities/user.dto';
import { User } from './entities/user.entity';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RedisServerService } from 'src/redis-server/redis-server.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisServerService,
  ) {}

  @Post('register')
  async register(@Body() userData: UserDto): Promise<User> {
    return await this.userService.create(userData.userName, userData.password);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllUsers(): Promise<User[] | string> {
    const redisResult = await this.redisService.getDataFromRedis('Users');
    console.log(redisResult);

    if (redisResult !== null) return redisResult;
    return this.userService.findAll();
  }
}
