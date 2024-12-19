import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MensajesModule } from 'src/mensajes/mensajes.module';

@Module({
  imports: [MensajesModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
