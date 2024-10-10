import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
