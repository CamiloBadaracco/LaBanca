import { IsNotEmpty } from "class-validator";

export class UpdateSubAgentDto {
  @IsNotEmpty()
  subAgencyNumber: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentIdPhoto: string;

  @IsNotEmpty()
  formNineHundred: string;

  @IsNotEmpty()
  passportPhoto: string;

  @IsNotEmpty()
  certificateGoodConduct: string;

  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  documentDGI: string;

  @IsNotEmpty()
  literalE: boolean;

  @IsNotEmpty()
  patentNumber: string;

  @IsNotEmpty()
  certificateNumber: string;

  @IsNotEmpty()
  enabledDocument: string;

  @IsNotEmpty()
  cesantiaDocument: string;

  @IsNotEmpty()
  changeAddressDocument: string;
}
