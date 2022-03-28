import { IsArray, isArray, IsEmail, IsEnum, isEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";

export class CreateUsertDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  pass: string;

  @IsOptional()
  @IsEmail()
  mail: string;

  @IsString()
  @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value`,
  })
  roles: string;
}
