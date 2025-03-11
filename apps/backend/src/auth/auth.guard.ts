import type { ExecutionContext } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TaskParts } from '@repo/types';
import type { UserTokenDataDTO } from '../types/dtos.js';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = request.headers.cookie?.split('jwt=')[1];
    if (!token) {
      throw new HttpException('Brak tokenu autoryzacyjnego', StatusCodes.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify<UserTokenDataDTO>(token, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException('Nieważny token autoryzacyjny', StatusCodes.UNAUTHORIZED);
    }
  }
}

@Injectable()
export class BPartAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const path = request.url.split('/');
    const part = path[path.length - 1] as TaskParts;
    if (part === TaskParts.B) {
      const token: string | undefined = request.headers.cookie?.split('jwt=')[1];
      if (!token) {
        throw new HttpException('Brak tokenu autoryzacyjnego', StatusCodes.UNAUTHORIZED);
      }

      try {
        const payload = this.jwtService.verify<UserTokenDataDTO>(token, {
          secret: process.env.JWT_SECRET,
          algorithms: ['HS256'],
        });
        request.user = payload;
        return true;
      } catch (error) {
        throw new HttpException('Nieważny token autoryzacyjny', StatusCodes.UNAUTHORIZED);
      }
    } else {
      return true;
    }
  }
}

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = request.headers.cookie?.split('jwt-init-admin=')[1];

    if (!token) {
      throw new HttpException('Brak tokenu autoryzacyjnego', StatusCodes.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify<UserTokenDataDTO>(token, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException('Nieważny token autoryzacyjny', StatusCodes.UNAUTHORIZED);
    }
  }
}
