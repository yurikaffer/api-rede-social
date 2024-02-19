require('dotenv/config');
import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: true,
      credentials: true,
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 3600,
      exposedHeaders: 'Authorization',
    });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
