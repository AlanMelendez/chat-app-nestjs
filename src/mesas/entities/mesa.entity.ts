import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  negocioId: string;
}
