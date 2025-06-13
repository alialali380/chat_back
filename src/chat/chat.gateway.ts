import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';


// هذا الديكوريتر يجعل هذا الكلاس بوابة WebSocket على بورت معين
@WebSocketGateway({
  cors: {
    origin: '*', // السماح لجميع النطاقات بالاتصال
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly processedMessages = new Set<string>();
  // السيرفر الخاص بـ socket.io
  @WebSocketServer()
  server: Server;

  // هذا الحدث يتم عند تهيئة الـ Gateway لأول مرة
  afterInit(server: Server) {
    console.log('✅ WebSocket Gateway Initialized');
  }

  // هذا الحدث يتم عند اتصال مستخدم جديد
  handleConnection(client: Socket) {
    console.log(`🟢 Client connected: ${client.id}`);
  }

  // هذا الحدث يتم عند قطع اتصال أحد المستخدمين
  handleDisconnect(client: Socket) {
    console.log(`🔴 Client disconnected: ${client.id}`);
  }

  // هذا الحدث يشتغل عند استقبال رسالة من أحد المستخدمين
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: {
      id: string;
      username: string;
      text: string;
    },
  ): void {
    console.log('📨 Message received:', data); // أضف هذا للتحقق
    this.server.emit('message', data);
  }
}
