import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,JoinColumn  } from 'typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';

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

  
  @OneToMany(type => SubAgent, subAgent => subAgent.id)  
  subAgents: SubAgent[];
  
}
