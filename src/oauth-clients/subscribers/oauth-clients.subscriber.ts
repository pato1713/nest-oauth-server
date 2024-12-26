import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { OAuthClientEntity } from '../entities/oauth-client.entity';
import { PasswordService } from '@/password/password.service';

@EventSubscriber()
export class OAuthClientsSubscriber
  implements EntitySubscriberInterface<OAuthClientEntity>
{
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _passwordService: PasswordService,
  ) {
    this._dataSource.subscribers.push(this);
  }

  listenTo() {
    return OAuthClientEntity;
  }

  async beforeInsert({
    entity,
  }: InsertEvent<OAuthClientEntity>): Promise<void> {
    if (entity.clientSecret) {
      entity.clientSecret = await this._passwordService.generateHash(
        entity.clientSecret,
      );
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<OAuthClientEntity>): Promise<void> {
    if (entity.clientSecret) {
      const clientSecret = await this._passwordService.generateHash(
        entity.clientSecret,
      );

      if (clientSecret !== databaseEntity?.clientSecret) {
        entity.clientSecret = clientSecret;
      }
    }
  }
}
