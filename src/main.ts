import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(`Application is listening ${process.env.APP_PORT}`, 'DANA-API');
  await app.listen(process.env.APP_PORT);
}
bootstrap();
