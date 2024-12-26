import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { PasswordService } from '@/password/password.service';

@EventSubscriber()
export class AuthenticationSubscriber
  implements EntitySubscriberInterface<AuthenticationEntity>
{
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _passwordService: PasswordService,
  ) {
    this._dataSource.subscribers.push(this);
  }

  listenTo(): Function | string {
    return AuthenticationEntity;
  }

  async beforeInsert({
    entity,
  }: InsertEvent<AuthenticationEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await this._passwordService.generateHash(
        entity.password,
      );
    }

    if (entity.email) {
      entity.email = entity.email.toLowerCase();
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<AuthenticationEntity>): Promise<void> {
    if (entity.password) {
      const password = await this._passwordService.generateHash(
        entity.password,
      );

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}
