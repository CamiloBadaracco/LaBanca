import { IsNotEmpty } from 'class-validator';

export class CreateUsertDto {

  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  pass: string;

  @IsNotEmpty()
  mail: string;
}
