// shift.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Timestamp,
  OneToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Plant } from "./plant.entity";
import { SupportType } from "./supporttype.entity";
import { SupportRequest } from "./supportrequest.entity";
import { ShiftStatus } from "src/common/enums/shiftstatus";

@Entity()
export class Shift {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id!: number;

  @Column("timestamp", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  @Column({ type: "int", unsigned: true, name: "duration" })
  duration!: number; // in hours

  @Column("text", { nullable: false, name: "type" })
  type!: string;

  @Column({ type: "enum", default: ShiftStatus.OPEN })
  status: ShiftStatus;

  @Column({ type: "int", unsigned: true, name: "max_capacity" })
  max_capacity!: number;

  @Column({ default: 0, type: "int", unsigned: true, name: "working_capacity" })
  working_capacity?: number;

  @OneToOne(() => Plant, (plant) => plant.shift, { cascade: true })
  @JoinColumn()
  plant: Plant;

  @OneToOne(() => SupportType, (support_type) => support_type.shift, {
    cascade: true,
  })
  @JoinColumn()
  support_type: SupportType;

  @OneToOne(() => SupportRequest, (support_request) => support_request.shift)
  @JoinColumn()
  support_request: SupportRequest;

  @OneToOne(() => User, (user) => user.shift)
  @JoinColumn()
  user: User;
}
