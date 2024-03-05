// User.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { Shift } from "./shift.entity";
import { SupportRequest } from "./supportrequest.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id!: number;

  @Column("varchar", { nullable: false, length: 255, name: "first_name" })
  first_name!: string;

  @Column("varchar", { nullable: true, length: 255, name: "last_name" })
  last_name?: string;

  @Column({ unique: true })
  email?: string;

  @Column("varchar", { nullable: false, length: 255, name: "username" })
  username!: string;

  @Column("varchar", { nullable: false, length: 255, name: "password" })
  password!: string;

  @OneToOne(() => Shift, (shift) => shift.user)
  @JoinColumn()
  shift: Shift;

  @ManyToMany(
    () => SupportRequest,
    (supportRequest) => supportRequest.volunteers,
  )
  @JoinTable()
  supportRequests: SupportRequest[];
}
