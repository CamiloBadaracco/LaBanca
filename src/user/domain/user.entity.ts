import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcryptjs from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 128 })
  name: string;

  @Column({ nullable: false, type: "varchar", length: 128 })
  lastName: string;

  @Column({ nullable: false, unique: true, type: "varchar", length: 128 })
  userName: string;

  @Column({ nullable: true, type: "varchar", length: 128 /*, select: false*/ }) // selected false no muestra campo al hacer get
  pass: string;

  @Column({ nullable: true, type: "varchar", length: 128 })
  mail: string;

  @Column({ type: "simple-array" })
  roles: string[];

  //Antes de insertar o actualizar quiero que se haga el hash
  /*@BeforeInsert()
  @BeforeUpdate()*/
  hashPassword(pass: string): void {
    console.log("Pass ENCRIPT  en metodo: " + pass);
    const salt = bcryptjs.genSaltSync(10);

    this.pass = bcryptjs.hashSync(pass, salt);
  }

  checkPassword(pass: string): boolean {
    console.log("Check" + pass);
    return bcryptjs.compareSync(pass, this.pass);
  }
}
