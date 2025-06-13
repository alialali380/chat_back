import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

// تعريف الموديول الخاص بالدردشة
@Module({
  providers: [ChatGateway], // تسجيل ChatGateway كمزود
})
export class ChatModule {}
