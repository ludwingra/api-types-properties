import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Role } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard.service';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER)
  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
