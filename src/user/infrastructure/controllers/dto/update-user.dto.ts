import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AppRoles } from "src/app.roles";

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

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

  @IsString()
  @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value`,
  })
  roles: string;
}
