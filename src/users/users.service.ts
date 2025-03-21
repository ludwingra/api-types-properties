import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | null | undefined> {
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      this.logger.error(error.message
        , error.stack
        , UsersService.name);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createUser(body: CreateUserDto): Promise<User | undefined> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      body.role = body.role || UserRole.USER;
      const user = this.usersRepository.create(body);
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(error.message
        , error.stack
        , UsersService.name);
      throw new InternalServerErrorException(error.message);
    }
  }
}
