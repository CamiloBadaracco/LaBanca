import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";

@Entity()
export class Provisorio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  observation: string;

  @Column()
  active: boolean;

  @Column({ type: "timestamp", default: "NOW()" })
  dateOfUpdated: Date;

  @ManyToOne((type) => SubAgent, (subAgent) => subAgent.provisorio, { onDelete: "CASCADE" })
  subAgent: SubAgent;
}
