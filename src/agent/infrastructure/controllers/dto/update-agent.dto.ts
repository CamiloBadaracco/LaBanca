import { IsNotEmpty } from "class-validator";

export class UpdateAgentDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  oldAgencyNumber: string;

  @IsNotEmpty()
  orden: string;

  @IsNotEmpty()
  zone: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  newAgencyNumber: string;
}
