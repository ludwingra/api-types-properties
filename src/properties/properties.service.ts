import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
  private logger = new Logger('PropertiesService');

  constructor(
    @InjectRepository(Property)
    private repository: Repository<Property>,
  ) { }

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const exists = await this.repository.findOne({ where: { name: createPropertyDto.name } });
      if (exists) {
        this.logger.error('Property name must be unique');
        throw new ConflictException('Property name must be unique');
      }

      this.logger.log(`Creating property: ${JSON.stringify(createPropertyDto)}`);
      return this.repository.save(createPropertyDto);
    } catch (error) {
      this.logger.error(`Failed to create property: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to create property: ${JSON.stringify(error.message)}`);
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching properties');
      return this.repository.find();
    } catch (error) {
      this.logger.error(`Failed to fetch properties: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to fetch properties: ${JSON.stringify(error.message)}`);
    }
  }

  async findOne(id: string) {
    try {
      const property = await this.repository.findOne({ where: { id } });
      if (!property) {
        this.logger.error(`Property not found`);
        throw new ConflictException('Property not found');
      }
      this.logger.log(`Fetching property by id ${id}`);
      return property;
    } catch (error) {
      if (error.status === 404) {
        throw error;
      } else {
        this.logger.error(`Failed to fetch property by id ${id}: ${JSON.stringify(error.message)}`);
        throw new InternalServerErrorException(`Failed to fetch property by id ${id}: ${JSON.stringify(error.message)}`);
      }
    }
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    try {
      const property = await this.findOne(id);
      if (updatePropertyDto.name && updatePropertyDto.name !== property.name) {
        const exists = await this.repository.findOne({ where: { name: updatePropertyDto.name } });
        if (exists) {
          this.logger.error('Property name must be unique');
          throw new ConflictException('Property name must be unique');
        }
      }

      await this.repository.update(id, updatePropertyDto);
      this.logger.log(`Updating property by id ${id}`);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to update property by id ${id}: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to update property by id ${id}: ${JSON.stringify(error.message)}`);
    }
  }

  async remove(id: string) {
    try {
      const property = await this.findOne(id);
      this.logger.log(`Removing property by id ${id}`);
      return await this.repository.remove(property);
    } catch (error) {
      this.logger.error(`Failed to remove property by id ${id}: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(`Failed to remove property by id ${id}: ${JSON.stringify(error.message)}`);
    }
  }
}
