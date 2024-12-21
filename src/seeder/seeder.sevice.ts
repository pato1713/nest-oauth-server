import { Injectable } from '@nestjs/common';
import { OauthClientsSeederService } from './seeders/oauth-clients.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly oauthClientsSeederService: OauthClientsSeederService,
  ) {}

  async seed() {
    console.log('Starting seeding...');
    await this.oauthClientsSeederService.seed();
    console.log('Seeding completed!');
  }
}
