import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
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
