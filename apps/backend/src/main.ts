import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface.js';
import { AllExceptionsFilter } from './filters/all-exception-filter.filter.js';
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
    const allowedOrigins: string[] = ['http://localhost:4000', 'http://localhost:4001'];

    const corsOptions: CorsOptions = {
      origin(origin: string, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: 204,
    };

    app.enableCors(corsOptions);
  }

  const port = process.env.PORT || 4500;
  void (await app.listen(port));
}
void bootstrap();
