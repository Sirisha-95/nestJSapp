// support-request.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Shift } from "./shift.entity";
import { User } from "./user.entity";
import { RequestStatus } from "src/common/enums/requeststatus";

@Entity()
export class SupportRequest {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id!: number;

  @Column("timestamp", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  @Column({ type: "int", unsigned: true, name: "max_volunteers" })
  max_volunteers: number; // Maximum capacity for volunteers

  @Column({
    default: 0,
    type: "int",
    unsigned: true,
    name: "enrolled_Volunteers",
  })
  enrolled_volunteers: number;

  @Column({ type: "enum", default: RequestStatus.OPEN })
  status: RequestStatus;

  @OneToOne(() => Shift, (shift) => shift.support_request, { cascade: true })
  @JoinColumn()
  shift: Shift;

  @ManyToMany(() => User, (volunteers) => volunteers.supportRequests)
  @JoinTable()
  volunteers: User[];
}
