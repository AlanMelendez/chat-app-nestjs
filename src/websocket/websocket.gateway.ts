/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MensajesService } from '../mensajes/mensajes.service';
import { Mensaje } from 'src/mensajes/entities/mensaje.entity';

@WebSocketGateway({
  cors: {
    origin: '*' // Permitir conexiones desde cualquier origen
  }
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private mensajesService: MensajesService) {
    console.log('✅ WebSocket Gateway inicializado');
  }

  /**
   * Evento cuando un cliente se conecta
   */
  handleConnection(client: Socket) {
    console.log(`🟢 Cliente conectado: ${client.id}`);
  }

  /**
   * Evento cuando un cliente se desconecta
   */
  handleDisconnect(client: Socket) {
    console.log(`🔴 Cliente desconectado: ${client.id}`);
  }

  /**
   * Prueba de conexión WebSocket
   */
  @SubscribeMessage('test')
  handleTest(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log('Evento test recibido');
    client.emit('testResponse', {
      message: '✅ WebSocket funciona correctamente'
    });

    this.server.emit('testResponse', {message:'✅ Hola a todos :)'}); // Difundir a todos los clientes
  }

  
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { mesaId: number }
  ) {
      const room:string = `mesa_${payload.mesaId}`;      
      client.join(room);
      console.log(`🟢 Cliente ${client.id} se unió a la sala ${room}`);
      client.emit('joinedRoom', { room });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Partial<Mensaje>
  ) {
    
    const room = `mesa_${payload.mesaId}`;
    const message = {
      room,
      contenido: payload.contenido,
      timestamp: new Date().toISOString(),
      remitenteId: payload.remitenteId
    };

    // Guardar en la base de datos
    const savedMessage = await this.mensajesService.saveMessage(payload);

  

    this.server.to(room).emit('newMessage', message); // Difundir mensaje a la sala
  }
}
