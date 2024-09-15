import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlServerConfig } from './sqlServerConfig.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SqlserverService } from './sqlserver.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.22.3', //process.env.DANA_SQL_ADDRESS,
      port: 1433, //Number.parseInt(process.env.DANA_SQL_PORT),
      database: 'DanaMonitor', //process.env.DANA_SQL_DATABASE,
      username: 'sa', //process.env.DANA_SQL_USER,
      password: 'isc@123456', //process.env.DANA_SQL_PASS,
      entities: [],
      options: { trustServerCertificate: true },
    }),
  ],
  providers: [SqlserverService],
  exports: [SqlserverService],
})
export class SQlServerMoudule {}
