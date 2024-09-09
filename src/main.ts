import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:80',
      'http://dana-monitor-backend:4000',
    ],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: true,
  });
  Logger.log(
    `Application is listening to port [${process.env.APP_PORT}]`,
    'DANA-API',
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
