import { BaseEntity, Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Agent } from "src/agent/domain/agent.entity";
@Entity()
export class UserAgent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documentUser: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  firstLastName: string;

  @Column({ nullable: true })
  secondLastName: string;

  @Column({ nullable: false })
  mail: string;

  @Column({ nullable: true })
  expedientUp: string;

  @Column({ nullable: true })
  expedientDown: string;

  @Column({ nullable: true })
  patentAgent: string;

  @Column({ nullable: false })
  observation: string;

  @Column()
  active: boolean;

  @Column({ nullable: false })
  agencyNumber: string;

  @ManyToOne((type) => Agent, (agent) => agent.userAgent, { onDelete: "CASCADE" })
  agent: Agent;
}
