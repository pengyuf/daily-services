import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';

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
  await app.listen(3000);
}
bootstrap();
