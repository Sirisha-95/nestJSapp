import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Shift } from "./shift.entity";

Entity();
export class SupportType {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id!: number;

  @Column("varchar", { nullable: false, length: 255, name: "department" })
  department!: string;

  @Column("varchar", { nullable: false, length: 255, name: "support_type" })
  support_type!: string;

  @OneToOne(() => Shift, (shift) => shift.support_type)
  @JoinColumn()
  shift: Shift;
}
