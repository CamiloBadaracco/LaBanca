import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";

@Entity()
export class Expedient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  expedientNumber: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  observation: string;

  @Column()
  active: boolean;

  @Column({ type: "timestamp", default: "NOW()" })
  dateOfUpdated: Date;

  @ManyToOne((type) => SubAgent, (subAgent) => subAgent.expedient, { onDelete: "CASCADE" })
  subAgent: SubAgent;
}
