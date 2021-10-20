import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';

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

  
  @ManyToOne(type => SubAgent, subAgent => subAgent.expedient)
  subAgent: SubAgent;
 
}
 