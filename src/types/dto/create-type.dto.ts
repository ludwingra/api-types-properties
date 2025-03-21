import { ArrayUnique, IsArray, IsOptional, IsString } from "class-validator";

export class CreateTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  properties?: string[];
}
