import { OAuthClientDto } from '@/oauth-clients/dtos/oauth-client.dto';
import { ClientType } from '@/oauth-clients/enums/client-type.enum';
import { GrantType } from '@/oauth-clients/enums/grant-type.enum';

// src/seeder/seeders/oauth-clients.factory.ts
export const createOAuthClientMock = (id: number): OAuthClientDto => ({
  clientId: `client_${id}`,
  clientSecret: `secret_${id}`,
  redirectUris: [`http://localhost:3000/callback`],
  clientType: ClientType.CONFIDENTIAL,
  grantTypes: [GrantType.AUTHORIZATION_CODE],
});

export const generateOAuthClientsMockData = (count: number) => {
  return Array.from({ length: count }, (_, i) => createOAuthClientMock(i + 1));
};
