import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}