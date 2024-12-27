import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from 'src/mensajes/entities/mensaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  ) {}

  async saveMessage(payload: { mesaId: number; remitenteId: number; contenido: string }) {
    const mensaje = this.mensajeRepository.create(payload);
    return await this.mensajeRepository.save(mensaje);
  }

  async getMessages(mesaId: number) {
    return await this.mensajeRepository.find({ where: { mesaId } });
  }
}
