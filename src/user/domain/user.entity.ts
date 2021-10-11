import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({nullable: false,unique: true})
  userName: string;

  @Column({ nullable: true })
  pass: string;

  @Column({ nullable: false })
  mail: string;
}
 