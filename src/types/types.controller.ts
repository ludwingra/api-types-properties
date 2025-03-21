import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard.service';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER)
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}
