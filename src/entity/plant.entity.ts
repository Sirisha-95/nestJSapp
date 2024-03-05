import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Shift } from "./shift.entity";

Entity();
export class Plant {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id!: number;

  @Column("varchar", { nullable: false, length: 255, name: "location" })
  location!: string;

  @Column("text", { nullable: true, name: "address" })
  address?: string;

  @OneToOne(() => Shift, (shift) => shift.plant)
  @JoinColumn()
  shift: Shift;
}
