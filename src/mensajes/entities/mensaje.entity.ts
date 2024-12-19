import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('mensajes')
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contenido: string;

  @Column()
  remitenteId: number;

  @Column()
  mesaId: number;

  @Column()
  negocioId: string;

  @CreateDateColumn()
  timestamp: Date;
}
