import { Body, Controller, Logger, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Post('register')
  async register(
    @Body() body: CreateUserDto,
  ) {
    this.logger.log(`Registering user ${body.email}`);
    return this.usersService.createUser(body);
  }

  @Post('login')
  async login(
    @Body() body: AuthDto,
  ) {
    this.logger.log(`Logging in user ${body.email}`);
    const user = await this.authService.validateUser(body);
    return this.authService.login(user);
  }
}
