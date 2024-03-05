// volunteer.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { SupportRequest } from "./supportrequest.entity";

@Entity()
export class Volunteer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => SupportRequest,
    (supportRequest) => supportRequest.volunteers,
  )
  supportRequests: SupportRequest[];
}
