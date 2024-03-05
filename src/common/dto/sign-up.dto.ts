// signup.dto.ts

import { IsNotEmpty } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  readonly volunteerId: number;
}
