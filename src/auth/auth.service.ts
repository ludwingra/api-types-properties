import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(authDto: AuthDto): Promise<any> {
    try {
      const user = await this.UsersService.findByEmail(authDto.email);
      if (user && (await bcrypt.compare(authDto.password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      this.logger.error(error.message, error.stack, AuthService.name);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(authDto: AuthDto) {
    try {
      const user = await this.UsersService.findByEmail(authDto.email);
      if (!user) {
        throw new UnauthorizedException("Invalid email");
      }
      const payload = { email: user.email, sub: user.id, role: user.role };
      this.logger.log(`User ${user.email} logged in`);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      this.logger.error(error.message, error.stack, AuthService.name);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
