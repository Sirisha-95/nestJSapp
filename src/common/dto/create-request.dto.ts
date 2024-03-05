import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from "class-validator";

import { SupportRequest } from "src/entity/supportrequest.entity";

export class CreateRequestDto
  implements
    Omit<
      SupportRequest,
      "id" | "date" | "status" | "enrolled_volunteers" | "volunteers" | "shift"
    >
{
  @IsNotEmpty()
  @IsNumber()
  public max_volunteers!: number;

  @IsNotEmpty()
  @IsNumber()
  public shift_id!: number;
}
