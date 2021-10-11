import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  agencyNumber: string;

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
  observationAddress: string;
 

  @IsNotEmpty()
  active: boolean;
}