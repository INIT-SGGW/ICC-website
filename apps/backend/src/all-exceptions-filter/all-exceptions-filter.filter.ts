import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ServerError } from "@repo/types"

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      title: "Server Error",
      status: status,
      detail: exception?.message || 'Internal server error',
      errors: exception?.response?.message ? [{ message: exception.response.message }] : undefined
    } as ServerError);
  }
}
