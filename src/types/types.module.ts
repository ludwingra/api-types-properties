import { forwardRef, Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Property } from 'src/properties/entities/property.entity';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Type, Property]),
    forwardRef(() => PropertiesModule),
  ],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService],
})
export class TypesModule { }
