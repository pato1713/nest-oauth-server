import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(clientId?: string) {
    super(
      {
        view: 'login',
        model: {
          error: 'Invalid email or password',
          client_id: clientId,
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
