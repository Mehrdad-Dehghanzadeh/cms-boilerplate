import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`app is ready on ${process.env.PORT}`);
}
bootstrap();
