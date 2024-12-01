import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data) => {
        if (data?.cookies) {
          const response = context.switchToHttp().getResponse();

          // Set the cookies
          data.cookies.forEach((cookie) => {
            response.cookie(cookie.name, cookie.value, cookie.options);
          });

          // Return only the data, not the cookies
          return data.data;
        }
        return data;
      }),
    );
  }
}
