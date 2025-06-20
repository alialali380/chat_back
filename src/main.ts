// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // تأكد من تفعيل CORS
  await app.listen(3000, '0.0.0.0'); // استمع على جميع الواجهات
}
// تنفيذ الدالة
bootstrap();
