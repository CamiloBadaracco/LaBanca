import { IsNotEmpty } from "class-validator";

export class UpdateProvisorioDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  url: object;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;
}
