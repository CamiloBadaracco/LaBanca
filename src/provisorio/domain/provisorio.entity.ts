import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';

@Entity()
export class Provisorio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  observation: string;

  @Column()
  active: boolean;

  
  @ManyToOne(type => SubAgent, subAgent => subAgent.id)
  subAgent: SubAgent;
 
}
 