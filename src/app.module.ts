import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SocketModule.register({
      host: 'localhost',
      port: 25000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
