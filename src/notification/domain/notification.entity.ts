import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "src//agent/domain/agent.entity";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  actionDescription: string;

  @Column({ type: "timestamp" })
  dateAction: Date;

  @Column({ nullable: true })
  dateNotif: Date;

  @Column({ nullable: true })
  agency: string;

  @Column()
  subAgencyModified: string;

  @Column()
  sended: boolean;

  /*Al eliminar agente eliminara todas las notificaciones de dicho agente.*/
  @ManyToOne((type) => Agent, (agent) => agent.notification, { onDelete: "CASCADE" })
  agent: Agent;
}
