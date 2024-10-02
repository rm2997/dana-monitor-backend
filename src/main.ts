import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RawBody, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'POST,GET,HEAD,PUT,PATCH,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  Logger.log(
    `Application is listening to port [${process.env.APP_PORT}]`,
    'DANA-API',
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
