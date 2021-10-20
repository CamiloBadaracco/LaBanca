import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
   

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  streetName: string;
  
  @IsNotEmpty()
  streetNumber: string;

  @IsNotEmpty()
  apto: string;

  @IsNotEmpty()
  observation: string;
 
  @IsNotEmpty()
  active: boolean;


  //Relacion con subAgent
  @IsEmpty()
  subAgencyNumber: string;

}
