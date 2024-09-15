import { Test, TestingModule } from '@nestjs/testing';
import { SqlserverService } from './sqlserver.service';

describe('SqlserverService', () => {
  let service: SqlserverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlserverService],
    }).compile();

    service = module.get<SqlserverService>(SqlserverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
