import { OAuthClientEntity } from '@/oauth-clients/entities/oauth-client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateOAuthClientsMockData } from './oauth-clients.factory';
import { Seeder } from '@/seeder/seeder.interface';

const OAUTH_CLIENTS_NO = 5;

@Injectable()
export class OAuthClientsSeederService implements Seeder {
  constructor(
    @InjectRepository(OAuthClientEntity)
    private readonly _oauthClientRepository: Repository<OAuthClientEntity>,
  ) {}

  async seed() {
    const mockData = generateOAuthClientsMockData(OAUTH_CLIENTS_NO);

    for (const oauthClient of mockData) {
      const existingOauthClient = await this._oauthClientRepository.findOneBy({
        clientId: oauthClient.clientId,
      });
      if (!existingOauthClient) {
        const newOauthClient = this._oauthClientRepository.create(oauthClient);

        await this._oauthClientRepository.save(newOauthClient);
        console.log(`OauthClient ${oauthClient.clientId} created.`);
      } else {
        console.log(`OauthClient ${oauthClient.clientId} already exists.`);
      }
    }
  }
}
