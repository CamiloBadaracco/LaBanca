import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateExpedientDto {
  @IsNotEmpty()
  expedientNumber: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;

  //Relacion con subAgent
  @IsEmpty()
  subAgencyNumber: string;
}
