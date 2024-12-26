import { OAuthClientEntity } from '@/oauth-clients/entities/oauth-client.entity';
import { ClientType } from '@/oauth-clients/enums/client-type.enum';
import { GrantType } from '@/oauth-clients/enums/grant-type.enum';
import { PasswordService } from '@/password/password.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const OAUTH_CLIENTS = [
  {
    clientId: '123',
    clientSecret: 'secret',
    redirectUris: ['http://localhost:3000'],
    clientType: ClientType.CONFIDENTIAL,
    grantTypes: [GrantType.AUTHORIZATION_CODE],
  },
  {
    clientId: '456',
    clientSecret: 'secret',
    redirectUris: ['http://localhost:3000'],
    clientType: ClientType.CONFIDENTIAL,
    grantTypes: [GrantType.AUTHORIZATION_CODE],
  },
  {
    clientId: '789',
    clientSecret: 'secret',
    redirectUris: ['http://localhost:3000'],
    clientType: ClientType.CONFIDENTIAL,
    grantTypes: [GrantType.AUTHORIZATION_CODE],
  },
];

@Injectable()
export class OauthClientsSeederService {
  constructor(
    @InjectRepository(OAuthClientEntity)
    private readonly _oauthClientRepository: Repository<OAuthClientEntity>,
    private readonly _passwordService: PasswordService,
  ) {}

  async seed() {
    for (const oauthClient of OAUTH_CLIENTS) {
      const existingOauthClient = await this._oauthClientRepository.findOneBy({
        clientId: oauthClient.clientId,
      });
      if (!existingOauthClient) {
        const oauthClientWithHashedSecret = {
          ...oauthClient,
          clientSecret: await this._passwordService.generateHash(
            oauthClient.clientSecret,
          ),
        };
        const newOauthClient = this._oauthClientRepository.create(
          oauthClientWithHashedSecret,
        );

        await this._oauthClientRepository.save(newOauthClient);
        console.log(`OauthClient ${oauthClient.clientId} created.`);
      } else {
        console.log(`OauthClient ${oauthClient.clientId} already exists.`);
      }
    }
  }
}
