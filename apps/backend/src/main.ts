import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exceptions-filter/all-exceptions-filter.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(
      {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }
    )
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

  const port = process.env.PORT || 4000;
  void (await app.listen(port));
}
void bootstrap();
