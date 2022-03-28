import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 128 })
  type: string;

  @Column({ nullable: false, type: "varchar", length: 128 })
  subAgencyNumber: string;

  @Column({ nullable: false, unique: true, type: "varchar", length: 255 })
  name: string;

  @Column({ type: "timestamp", default: "NOW()" })
  dateOfUpdated: Date;

  @Column()
  active: boolean;

  CreateName(subAgencuNumber: string, type: string, id: number): string {
    try {
      return (this.name = subAgencuNumber.toString() + "_" + type.toString() + "_" + id.toString());
    } catch (error) {
      return (this.name = "");
    }
  }
}
