import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisServerService } from './redis-server.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    // ConfigModule,
    // RedisModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService): any => ({
    //     host: configService.get('redis.host'),
    //     port: configService.get('redis.port'),
    //   }),
    // }),
  ],
  providers: [RedisServerService],
  exports: [RedisServerService],
})
export class RedisServerModule {}
