import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateFileDto {
  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  type: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  subAgencyNumber: string;
}
