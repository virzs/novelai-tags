/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-08 17:54:22
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-11 10:11:12
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3200);
}
bootstrap();
