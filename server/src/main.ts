import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: [
    //   'https://main.d34f8o8eh1m58q.amplifyapp.com','https://hireon.labonnz.club','http://localhost:3000'
    // ],
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
    // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    // allowedHeaders: ['Content-Type', 'Access'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );
  await app.listen(3001);
}
bootstrap();
