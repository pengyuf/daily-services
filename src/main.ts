import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // 将请求传入的数据，转化为OTO的实例
    transformOptions: {
      enableImplicitConversion: true, // pipe将数据隐式转换
    }
  }))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors(); // 跨域处理


  // 判断uploads文件夹是否存在，没有就创建
  const uploadDir = join(process.cwd(), 'uploads')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir)
  }

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')))

  await app.listen(3000);
}
bootstrap();
