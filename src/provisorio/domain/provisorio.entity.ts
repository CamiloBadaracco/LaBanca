import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";

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

  @Column({ type: "timestamp", default: "NOW()" })
  dateOfUpdated: Date;

  @ManyToOne((type) => SubAgent, (subAgent) => subAgent.provisorio)
  subAgent: SubAgent;
}
