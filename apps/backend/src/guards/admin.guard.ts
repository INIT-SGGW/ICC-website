import type { ExecutionContext } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserTokenDataDTO } from '../types/dtos.js';
import { parseCookies } from '../utils/ParseCookies.js';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.headers.cookie) {
      throw new HttpException('Brak tokenu autoryzacyjnego', StatusCodes.UNAUTHORIZED);
    }
    const token: string | undefined = parseCookies(request.headers.cookie)['jwt-init-admin'];

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
