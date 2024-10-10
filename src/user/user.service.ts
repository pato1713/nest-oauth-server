import { Injectable } from '@nestjs/common';
import { UserRepository } from './respositories/user.repository';
import { CreateUserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { QueryRunner } from 'typeorm';
import { AuthenticationEntity } from 'src/authentication/entities/authentication.entity';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    authentication: AuthenticationEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto,
      authentication,
    });

    return queryRunner.manager.save(user);
  }
}
