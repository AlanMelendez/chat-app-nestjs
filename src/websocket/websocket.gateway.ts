/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MensajesService } from '../mensajes/mensajes.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Permitir conexiones desde cualquier origen
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private mensajesService: MensajesService) {
    console.log('WebSocket Gateway inicializado');

  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('test')
  handleTest(client: Socket, payload: any) {
    client.emit('testResponse', { message: 'WebSocket funciona correctamente' });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: { mesaId: number }) {
    const room = `mesa_${payload.mesaId}`;
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const room = `mesa_${payload.mesaId}`;
    const savedMessage = await this.mensajesService.saveMessage(payload);
    // this.server.to(room).emit('newMessage', savedMessage);
    this.server.emit('newMessage', savedMessage);
  }
}
