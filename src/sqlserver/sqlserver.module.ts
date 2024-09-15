import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlServerConfig } from './sqlServerConfig.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SqlserverService } from './sqlserver.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DANA_SQL_ADDRESS, //'192.168.22.3',
      port: Number.parseInt(process.env.DANA_SQL_PORT), //1433,
      database: process.env.DANA_SQL_DATABASE, //'DanaMonitor',
      username: process.env.DANA_SQL_USER, //'sa',
      password: process.env.DANA_SQL_PASS, //'isc@123456',
      entities: [],
      options: { trustServerCertificate: true },
    }),
  ],
  providers: [SqlserverService],
  exports: [SqlserverService],
})
export class SQlServerMoudule {}
