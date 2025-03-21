import { IsEnum, IsString } from "class-validator";

import { PropertyType } from "../entities/property.entity";

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsEnum(PropertyType)
  type: PropertyType;
}
