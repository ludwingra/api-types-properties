import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class RolesGuard {
  constructor(private reflactor: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflactor.getAllAndOverride<string>(
      ROLE_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    );
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return user.role === requiredRole;
  }
}
