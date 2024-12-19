import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  rol: string; // 'mesero' o 'cliente'

  @Column()
  negocioId: string; // Asociar con el identificador del negocio
}
