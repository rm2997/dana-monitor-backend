import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ResponseTimes } from './entities/responseTimes.entity';
import { CountTimes } from './entities/countTime.entity';

@Injectable()
export class SqlserverService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllResponsTimes(): Promise<ResponseTimes[]> {
    const result = this.dataSource.query('EXEC sp_GetTodayResponseTime');
    return result;
  }

  async getHostTransactions(): Promise<CountTimes[]> {
    const today = new Date();
    const formatDate = '20240317'; /*Number.parseInt(
      `${today.getFullYear().toString().padStart(4, '0')}${today.getMonth().toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`,
    );*/
    const result = this.dataSource.query(
      `EXEC sp_SelectMessageCountByDateEveryMinute @date= ${formatDate}`,
    );
    return result;
  }
}
