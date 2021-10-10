import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expedient extends BaseEntity {
  @PrimaryColumn()
  expedientNumber: number;

  @Column({nullable: false} )
  url: string;

  @Column({ nullable: true })
  observation: string;

  @Column()
  active: boolean;
 
}
 