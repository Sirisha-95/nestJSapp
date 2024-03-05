import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from "class-validator";
import { Plant } from "src/entity/plant.entity";
import { Shift } from "src/entity/shift.entity";
import { SupportRequest } from "src/entity/supportrequest.entity";
import { SupportType } from "src/entity/supporttype.entity";
import { User } from "src/entity/user.entity";

export class CreateShiftDto
  implements
    Omit<
      Shift,
      | "id"
      | "date"
      | "status"
      | "user"
      | "support_request"
      | "working_capacity"
      | "plant"
      | "shift"
      | "support_type"
    >
{
  @IsNotEmpty()
  @IsNumber()
  public duration!: number;

  @IsString()
  @IsNotEmpty()
  public type!: string;

  @IsNotEmpty()
  @IsNumber()
  public max_capacity!: number;

  @IsNotEmpty()
  @IsNumber()
  public plant_id!: number;

  @IsNotEmpty()
  @IsNumber()
  public support_type_id!: number;
}
