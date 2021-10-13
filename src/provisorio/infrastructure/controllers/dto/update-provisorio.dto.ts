import { IsNotEmpty } from 'class-validator';

export class UpdateProvisorioDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;

 
}