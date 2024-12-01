import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsException } from '../../authentication/exceptions/invalid-credentials.exception';
import { ExpiredCacheException } from '../../authentication/exceptions/expired-cache.exception';

@Catch(InvalidCredentialsException, ExpiredCacheException)
export class ViewExceptionFilter implements ExceptionFilter {
  catch(
    exception: InvalidCredentialsException | ExpiredCacheException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as {
      view: string;
      model: any;
    };

    response.render(exceptionResponse.view, exceptionResponse.model);
  }
}
