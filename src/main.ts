import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config  = new DocumentBuilder()
    .setTitle('Social Media Manager')
    .setDescription('Rest API Documentation - Social Media Manager')
    .setVersion('1.0')
    .addTag('instagram')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
