import { IsNotEmpty } from 'class-validator';

export class UpdateAgentDto {
  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  orden: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  zone: string;

  @IsNotEmpty()
  active: boolean;
}
