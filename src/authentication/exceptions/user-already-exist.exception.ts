import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistExeption extends BadRequestException {
  constructor(error?: string) {
    super('User with that email already exists', error);
  }
}
