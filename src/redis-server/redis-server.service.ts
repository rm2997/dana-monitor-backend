import { RedisService } from '@liaoliaots/nestjs-redis';
import { RedisClients } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisServerService {
  redisConnection: Redis;
  constructor(readonly redis: RedisService) {
    this.redisConnection = this.redis.getOrNil();
  }

  async getDataFromRedis(key: string): Promise<string | null> {
    if (this.redisConnection.exists(key))
      return await this.redisConnection.get(key);
    else return null;
  }
  async putDataToRedis(key: string, value: any): Promise<boolean> {
    try {
      await this.redisConnection.set(key, value);
      await this.redisConnection.expire(key, 60);
      return true;
    } catch {
      return false;
    }
  }
}
