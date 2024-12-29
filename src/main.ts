import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CookieInterceptor } from './common/interceptors/cookie.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  // setup middleware
  app.use(cookieParser());

  // setup global pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // setup global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new CookieInterceptor(reflector),
  );

  // setup views part of the app
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(PORT);
}
bootstrap();
