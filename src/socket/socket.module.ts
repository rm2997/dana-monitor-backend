import { DynamicModule, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketConfig } from './entities/socketConfig.entity';

@Module({})
export class SocketModule {
  static register(options: SocketConfig): DynamicModule {
    return {
      module: SocketModule,
      providers: [
        {
          provide: 'SOCKET_CONFIG_OPTIONS',
          useValue: options,
        },
        SocketService,
      ],
      exports: [SocketService],
    };
  }
}
