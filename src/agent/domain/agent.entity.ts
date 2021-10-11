import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  agencyNumber: string;

  @Column({ nullable: true })
  orden: string;

  @Column({ nullable: true })
  zone: string;

  @Column({ nullable: false })
  mail: string;

  @Column()
  active: boolean;
}
