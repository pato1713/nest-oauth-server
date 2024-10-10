import { DataSource, Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';

export class AuthenticationRepository extends Repository<AuthenticationEntity> {
  constructor(private dataSource: DataSource) {
    super(AuthenticationEntity, dataSource.createEntityManager());
  }
}
