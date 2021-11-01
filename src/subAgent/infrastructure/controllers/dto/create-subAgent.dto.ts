import { IsNotEmpty } from "class-validator";
import { Address } from "src/address/domain/address.entity";
import { Expedient } from "src/expedient/domain/expedient.entity";
import { Provisorio } from "src/provisorio/domain/provisorio.entity";

export class CreateSubAgenttDto {
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

  @IsNotEmpty()
  address: Address;

  @IsNotEmpty()
  expedient: Expedient;

  @IsNotEmpty()
  provisorio: Provisorio;
}
