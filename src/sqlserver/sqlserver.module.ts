import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlserverService } from './sqlserver.service';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

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
      entities: [User],
      options: { trustServerCertificate: true },
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    }),
  ],
  providers: [SqlserverService],
  exports: [SqlserverService],
})
export class SQlServerMoudule {}
