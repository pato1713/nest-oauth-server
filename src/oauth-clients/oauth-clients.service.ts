import { CacheService } from '@/cache/cache.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OAuthAuthorizationDto } from './dtos/oauth-authorization.dto';

@Injectable()
export class OAuthClientsService {
  constructor(private readonly _cacheService: CacheService) {}

  async createAuthorizationTransaction(
    oAuthAuthorization: OAuthAuthorizationDto,
  ) {
    const transactionId = randomUUID();
    const result = await this._cacheService.set(
      transactionId,
      oAuthAuthorization,
    );

    // TODO: Replace with meaningful error
    if (!result) {
      throw new InternalServerErrorException();
    }

    return transactionId;
  }

  async getAuthorization(transactionId: string) {
    const authorization =
      await this._cacheService.get<OAuthAuthorizationDto>(transactionId);

    return authorization;
  }
}
