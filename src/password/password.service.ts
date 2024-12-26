import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
