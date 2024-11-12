import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { SQlServerMoudule } from './sqlserver/sqlserver.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import redisConfig from './config/redis.config';
import { RedisServerModule } from './redis-server/redis-server.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
    }),
    SocketModule.register({
      host: process.env.DANA_SEREVR_ADDRESS,
      port: Number.parseInt(process.env.DANA_SEREVR_PORT),
      maxAttemps: Number.parseInt(process.env.Max_RECONNECT_ATTEMPS),
    }),
    SQlServerMoudule,
    AuthModule,
    UserModule,
    RedisServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
