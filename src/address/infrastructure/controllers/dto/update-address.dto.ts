import { IsNotEmpty } from 'class-validator';

export class UpdateAddressDto {
 
  @IsNotEmpty()
  id: number;
 
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
}
