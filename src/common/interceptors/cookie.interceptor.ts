import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SET_COOKIE_KEY } from '../decorators/set-cookie.decorator';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
}

export interface CookieResponse<T> {
  data: T;
  cookies?: Array<{
    name: string;
    value: string;
    options?: CookieOptions;
  }>;
}

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
    const response = context.switchToHttp().getResponse();
    const handler = context.getHandler();
    const cookieMetadata = this.reflector.get(SET_COOKIE_KEY, handler);

    if (!cookieMetadata) {
      return next.handle();
    }

    return next.handle().pipe(
      tap((data) => {
        const { name, options } = cookieMetadata;
        // Set the cookie value based on the return value of the method
        response.cookie(name, data, options);
      }),
    );
  }
}
