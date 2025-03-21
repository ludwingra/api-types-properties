import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Type } from "src/types/entities/type.entity";

export enum PropertyType {
  TEXTO = 'texto',
  NUMERO = 'número',
  FECHA = 'fecha',
  CHECK = 'check',
}

@Entity('properties')
export class Property {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PropertyType })
  type: PropertyType;

  @ManyToMany(() => Type, (type) => type.properties)
  types: Type[];
}
