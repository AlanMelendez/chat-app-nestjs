import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Mensaje])], // Asegúrate de que esto está presente
    providers: [MensajesService],
    exports: [MensajesService],
})
export class MensajesModule {}
