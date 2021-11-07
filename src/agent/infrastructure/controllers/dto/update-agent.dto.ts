import { IsNotEmpty } from "class-validator";

export class UpdateAgentDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  orden: string;

  @IsNotEmpty()
  zone: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  active: boolean;
}
