import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisServerService {
  redisConnection: Redis;
  constructor(readonly redis: RedisService) {
    this.redisConnection = this.redis.getOrNil();
  }

  async getDataFromRedis(key: string): Promise<any | null> {
    if (this.redisConnection.exists(key)) {
      Logger.log(`This message[${key}] will read from Redis`, 'Redis');
      return await this.redisConnection.get(key);
    } else return null;
  }
  async putDataToRedis(key: string, value: any): Promise<boolean> {
    try {
      await this.redisConnection.set(key, value);
      await this.redisConnection.expire(key, 60);
      Logger.log(
        `This message[${key}] has benn set into Redis server`,
        'Redis',
      );
      return true;
    } catch {
      return false;
    }
  }
}
