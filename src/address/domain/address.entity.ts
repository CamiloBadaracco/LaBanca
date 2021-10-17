import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';

@Entity()
export class Address extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  nullable: false })
  department: string;

  @Column({ nullable: false  })
  location: string;

  @Column({ nullable: true  })
  streetName: string;

  @Column({ nullable: true })
  streetNumber: string;

  @Column({ nullable: true })
  apto: string;

  @Column({ nullable: true })
  observationAddress: string;
 
   
  @Column()
  active: boolean;

  
 
  @ManyToOne(type => SubAgent, subAgent => subAgent.addresses)

  subAgent: SubAgent;


 
}
