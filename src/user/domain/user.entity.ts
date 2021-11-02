import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcryptjs from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  userName: string;

  @Column({ nullable: true })
  pass: string;

  @Column({ nullable: false })
  mail: string;

  hashPassword(pass: string): void {
    console.log("Pass erecibida en metodo: " + pass);
    const salt = bcryptjs.genSaltSync(10);

    this.pass = bcryptjs.hashSync(pass, salt);
  }

  checkPassword(pass: string): boolean {
    console.log("Check" + pass);
    return bcryptjs.compareSync(pass, this.pass);
  }
}
