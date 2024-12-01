import * as bcrypt from 'bcrypt';

export class AuthenticationProvider {
  static async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async validatePassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
