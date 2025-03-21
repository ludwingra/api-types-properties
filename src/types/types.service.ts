import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { In, Repository } from 'typeorm';
import { Property } from 'src/properties/entities/property.entity';

@Injectable()
export class TypesService {
  private logger = new Logger('TypesService');

  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @InjectRepository(Property)
    private propsRepository: Repository<Property>,
  ) { }

  async create(createTypeDto: CreateTypeDto) {
    try {
      const exists = await this.typeRepository.findOne({ where: { name: createTypeDto.name } });
      if (exists) {
        this.logger.error('Type name must be unique');
        throw new ConflictException('Type name must be unique');
      }

      const properties = createTypeDto.properties
        ? await this.propsRepository.find({ where: { id: In(createTypeDto.properties) } })
        : [];

      const type = this.typeRepository.create({ ...createTypeDto, properties: properties });
      this.logger.log(`Creating type: ${JSON.stringify(createTypeDto)}`);
      return this.typeRepository.save(type);
    } catch (error) {
      this.logger.error(`Failed to create type: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to create type: ${JSON.stringify(error.message)}`);
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching types');
      return this.typeRepository.find({ relations: ['properties'] });
    } catch (error) {
      this.logger.error(`Failed to fetch types: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to fetch types: ${JSON.stringify(error.message)}`);
    }
  }

  async findOne(id: string) {
    try {
      const type = await this.typeRepository.findOne({ where: { id }, relations: ['properties'] });
      if (!type) {
        this.logger.error(`Type not found`);
        throw new NotFoundException('Type not found');
      }
      this.logger.log(`Fetching type by id ${id}`);
      return type;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      } else {
        this.logger.error(`Failed to fetch type by id ${id}: ${JSON.stringify(error.message)}`);
        throw new InternalServerErrorException(`Failed to fetch type by id ${id}: ${JSON.stringify(error.message)}`);
      }
    }
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    try {
      const type = await this.findOne(id);
      if (updateTypeDto.name && updateTypeDto.name !== type.name) {
        const exists = await this.typeRepository.findOne({ where: { name: updateTypeDto.name } });
        if (exists) {
          this.logger.error('Type name must be unique');
          throw new ConflictException('Type name must be unique');
        }
      }

      let properties = type.properties;
      if (updateTypeDto.properties) {
        properties = await this.propsRepository.find({ where: { id: In(updateTypeDto.properties) } });
      }

      const updateData = {
        ...updateTypeDto,
        properties: properties,
      }

      await this.typeRepository.update(id, updateData);
      this.logger.log(`Updating type: ${JSON.stringify(updateTypeDto)}`);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to update type: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to update type: ${JSON.stringify(error.message)}`);
    }
  }

  async remove(id: string) {
    try {
      const type = await this.findOne(id);
      this.logger.log(`Removing type by id ${id}`);
      return await this.typeRepository.remove(type);
    } catch (error) {
      this.logger.error(`Failed to remove type by id ${id}: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to remove type by id ${id}: ${JSON.stringify(error.message)}`);
    }
  }
}
