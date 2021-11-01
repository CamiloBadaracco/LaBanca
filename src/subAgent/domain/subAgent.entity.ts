import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agent } from "src/agent/domain/agent.entity";
import { Address } from "src/address/domain/address.entity";
import { Provisorio } from "src/provisorio/domain/provisorio.entity";
import { Expedient } from "src/expedient/domain/expedient.entity";

@Entity()
export class SubAgent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subAgencyNumber: string;

  @Column({ nullable: false })
  documentNumber: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  documentIdPhoto: string;

  @Column({ nullable: true })
  formNineHundred: string;

  @Column({ nullable: true })
  passportPhoto: string;

  @Column({ nullable: true })
  certificateGoodConduct: string;

  @Column({ type: "timestamp", default: "NOW()" })
  dateOfUpdate: Date;

  @Column({ nullable: true })
  rut: string;

  @Column({ nullable: true })
  documentDGI: string;

  @Column({ nullable: true })
  literalE: boolean;

  @Column({ nullable: true })
  patentNumber: string;

  @Column({ nullable: true })
  certificateNumber: string;

  @Column({ nullable: true })
  enabledDocument: string;

  @Column({ nullable: true })
  cesantiaDocument: string;

  @Column({ nullable: true })
  changeAddressDocument: string;

  @Column({ nullable: true })
  active: boolean;

  @ManyToOne((type) => Agent, (agent) => agent.id)
  agent: Agent;

  @OneToMany((type) => Address, (address) => address.subAgent, {
    cascade: true,
  })
  address: Array<Address>;

  @OneToMany((type) => Expedient, (expedient) => expedient.subAgent, {
    cascade: true,
  })
  expedient: Array<Expedient>;

  @OneToMany((type) => Provisorio, (provisorio) => provisorio.subAgent, {
    cascade: true,
  })
  provisorio: Array<Provisorio>;
}
