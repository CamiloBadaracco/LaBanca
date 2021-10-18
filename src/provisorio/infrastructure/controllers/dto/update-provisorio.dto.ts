import { IsNotEmpty } from 'class-validator';

export class UpdateProvisorioDto {
  
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;

 
}