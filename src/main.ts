import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
    new ParseIntPipe(),
  );

  await app.listen(3000);
}

bootstrap();
