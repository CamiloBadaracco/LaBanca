import { IsNotEmpty } from 'class-validator';

export class CreateSubAgenttDto {

  @IsNotEmpty()
  subAgencyNumber: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  passportPhoto: string;

  @IsNotEmpty()
  certificateGoodConduct: string;
 
  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  literalE: string;

  @IsNotEmpty()
  patentNumber: string;

  @IsNotEmpty()
  certificateNumber: string;

  @IsNotEmpty()
  resolutionNumber: string;
  

}
