import { SetMetadata } from '@nestjs/common';
import { CookieOptions } from '../interceptors/cookie.interceptor';

export const SET_COOKIE_KEY = 'setCookie';
export const SetCookie = (name: string, options?: CookieOptions) =>
  SetMetadata(SET_COOKIE_KEY, { name, options });
