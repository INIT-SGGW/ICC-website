import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces/index.js';
import type { ServerError } from '@repo/types';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let detail: string | null = null;
    let errors: { message: string }[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      detail = exception.message;
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse &&
        Array.isArray(exceptionResponse.message)
      ) {
        errors = exceptionResponse.message;
      }
    } else if (exception instanceof Error) {
      detail = exception.message;
    }

    response.status(status).json({
      title: 'Server Error',
      status: 'Wystąpił błąd po stronie serwera.',
      detail: detail || 'Wystąpił błąd po stronie serwera.',
      errors: errors ? errors : undefined,
    } as ServerError);
  }
}
