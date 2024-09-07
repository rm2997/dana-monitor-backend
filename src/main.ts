import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://dana-monitor-front/'],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['content-type'],
  });
  Logger.log(
    `Application is listening to port [${process.env.APP_PORT}]`,
    'DANA-API',
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
