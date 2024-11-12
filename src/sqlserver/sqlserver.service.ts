import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ResponseTimes } from './entities/responseTimes.entity';
import { CountTimes } from './entities/countTime.entity';

@Injectable()
export class SqlserverService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllResponsTimes(): Promise<ResponseTimes[]> {
    const today = new Date();
    const formedDate = `${today.getFullYear().toString().padStart(4, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;

    const result = this.dataSource.query(
      `EXEC sp_GetTodayResponseTimes @msgDate=${formedDate}`,
    );
    return result;
  }

  async getHostTransactions(): Promise<CountTimes[]> {
    const today = new Date();
    const formedDate = `${today.getFullYear().toString().padStart(4, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const result = this.dataSource.query(
      `EXEC sp_SelectMessageCountByDateEveryMinute @date=${formedDate}`,
    );
    return result;
  }
}
