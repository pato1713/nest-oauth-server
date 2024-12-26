import { Injectable } from '@nestjs/common';
import { Seeder } from '@/seeder/seeder.interface';
import { AuthenticationService } from '@/authentication/authentication.service';
import { generateRegistrationMockData } from './users.factory';

const USERS_NO = 5;

@Injectable()
export class UsersSeederService implements Seeder {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  async seed() {
    const mockData = generateRegistrationMockData(USERS_NO);

    await Promise.all(
      mockData.map((user) => this._authenticationService.registration(user)),
    );
  }
}
