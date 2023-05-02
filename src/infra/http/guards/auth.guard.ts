import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorator/auth.decorator';
import { ITokensProvider } from 'src/shared/providers/JwtProvider/model/generateTokensProvider';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: ITokensProvider,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Token missing');

    try {
      const sub = await this.jwtService.verifyToken(token);

      request.user = {
        id: sub,
      };
    } catch {
      throw new UnauthorizedException('Token invalid!');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
