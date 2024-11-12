import { Test, TestingModule } from '@nestjs/testing';
import { RedisServerService } from './redis-server.service';

describe('RedisServerService', () => {
  let service: RedisServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisServerService],
    }).compile();

    service = module.get<RedisServerService>(RedisServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
