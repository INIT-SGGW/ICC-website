import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exceptions-filter/all-exceptions-filter.filter.js';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ICC Backend')
    .setDescription('API documentation for the ICC backend')
    .setVersion('1.0.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: 204,
    });
  }

  const port = process.env.PORT || 4000;
  void (await app.listen(port));
}
void bootstrap();
