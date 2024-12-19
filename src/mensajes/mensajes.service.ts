import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) {}

  async saveMessage(data: Partial<Mensaje>) {
    const mensaje = this.mensajeRepository.create(data);
    return await this.mensajeRepository.save(mensaje);
  }

  async getMessagesByMesa(mesaId: number) {
    return await this.mensajeRepository.find({ where: { mesaId } });
  }
}
