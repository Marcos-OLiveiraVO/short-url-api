import '@shared/services/observability/otel.config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Shortener URL API')
    .setContact('Marcos Oliveira', 'https://www.linkedin.com/in/marcos-oliveiraaa/', 'marcosoliveira.rd@gmail.com')
    .setDescription('The Shortener URL API description')
    .setVersion('0.1.0')
    .addBearerAuth({
      description: 'Please enter token in following format: Bearer <JWT>',
      name: 'Authorization',
      type: 'http',
      bearerFormat: 'Bearer',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
