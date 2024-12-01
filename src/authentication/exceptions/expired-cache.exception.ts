import { HttpException, HttpStatus } from '@nestjs/common';

export class ExpiredCacheException extends HttpException {
  constructor() {
    super(
      {
        view: 'login-session-expired',
        model: {
          error: 'login session has expired',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
