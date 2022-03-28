import { IsNotEmpty } from "class-validator";

export class UpdateExpedientDto {
  @IsNotEmpty()
  expedientNumber: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;
}
