/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-08 17:54:22
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-14 17:54:54
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DefaultDTOValidationPipe } from './utils/pipes/defautlDTOValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Stable Diffusion Tags')
    .setDescription('接口文档')
    .setVersion('0.1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, docs);

  // 全局默认参数验证
  app.useGlobalPipes(new DefaultDTOValidationPipe());

  await app.listen(3200);
}
bootstrap();
