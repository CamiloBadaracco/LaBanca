import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  
 
}
 