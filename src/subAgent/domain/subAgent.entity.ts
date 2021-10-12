import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Agent } from 'src/agent/domain/agent.entity';
import { Address } from 'src/address/domain/address.entity';
import { Provisorio } from 'src/provisorio/domain/provisorio.entity';
import { Expedient } from 'src/expedient/domain/expedient.entity'; 

@Entity()
export class SubAgent extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subAgencyNumber: string;

  @Column({ nullable: false })
  documentNumber: string;

  @Column({unique: true})
  name: string;

  @Column({ nullable: true })
  passportPhoto: string;

  @Column({ nullable: true  })
  certificateGoodConduct: string;

  @Column({ nullable: true  })
  dateOfUpdate: Date;

  @Column({ nullable: true  })
  rut: string;

  @Column({ nullable: true  })
  literalE: string;

  @Column({ nullable: true  })
  patentNumber: string;

  @Column({ nullable: true  })
  certificateNumber: string;

  @Column({ nullable: true  })
  resolutionNumber: string;

  @Column({ nullable: false })
  active: boolean;



  @ManyToOne(type => Agent, agent => agent.id)
  agent: Agent;




  @OneToMany(type => Address, address => address.id)  
  addresses: Address[];
  
  @OneToMany(type => Expedient, expedient => expedient.expedientNumber)  
  expedients: Expedient[];
  
  @OneToMany(type => Provisorio, provisorio => provisorio.id)  
  provisorios: Provisorio[];
  
  
 
}
 