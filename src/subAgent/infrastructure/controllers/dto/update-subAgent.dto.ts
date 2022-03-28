import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSubAgentDto {
  @IsNotEmpty()
  subAgencyNumber: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  firstName: string;

  @IsString()
  secondFirstName: string;

  @IsString()
  firstLastName: string;

  @IsString()
  secondLastName: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentIdPhoto: object;

  @IsNotEmpty()
  formNineHundred: object;

  @IsNotEmpty()
  passportPhoto: object;

  @IsNotEmpty()
  certificateGoodConduct: object;

  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  documentDGI: object;

  @IsNotEmpty()
  literalE: boolean;

  @IsNotEmpty()
  patentNumber: string;

  @IsNotEmpty()
  certificateNumber: string;

  @IsNotEmpty()
  enabledDocument: object;

  @IsNotEmpty()
  cesantiaDocument: object;

  @IsNotEmpty()
  changeAddressDocument: object;
}
