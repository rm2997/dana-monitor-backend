import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [`http://localhost:${process.env.APP_PORT}`],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  Logger.log(
    `Application is listening to port [${process.env.APP_PORT}]`,
    'DANA-API',
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
