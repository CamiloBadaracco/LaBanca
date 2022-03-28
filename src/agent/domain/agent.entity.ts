import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";
import { Notification } from "src/notification/domain/notification.entity";
import { UserAgent } from "src/userAgent/domain/userAgent.entity";

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

  @OneToMany((type) => SubAgent, (subAgent) => subAgent.id, {
    cascade: true,
  })
  subAgents: Array<SubAgent>;

  @OneToMany((type) => Notification, (notification) => notification.agent, {
    cascade: true,
  })
  notification: Array<Notification>;

  @OneToMany((type) => UserAgent, (userAgent) => userAgent.agent, {
    cascade: true,
  })
  userAgent: Array<UserAgent>;
}
