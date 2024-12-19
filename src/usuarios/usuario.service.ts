import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async createUsuario(data: Partial<Usuario>) {
    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  async findByRol(rol: string, negocioId: string) {
    return await this.usuarioRepository.find({ where: { rol, negocioId } });
  }
}
