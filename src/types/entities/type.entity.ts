import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Property } from "src/properties/entities/property.entity";

@Entity('types')
export class Type {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Property, (property) => property.types, { cascade: true })
  @JoinTable()
  properties: Property[];
}
