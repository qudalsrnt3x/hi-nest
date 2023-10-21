import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 아무 데코레이터도 없는 어떠한 필드의 object를 거른다.
      forbidNonWhitelisted: true, // 정의되지 않은 필드에 대해서 에러 처리
      transform: true, // 요청으로 받은 값을 자동 형변환 시켜준다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
