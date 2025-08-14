import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';

export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role;

    return userRole === 'admin';
  }
}
