import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { AuthenticationEntity } from '@/authentication/entities/authentication.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    authentication: AuthenticationEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...createUserDto,
      authentication,
    });

    return queryRunner.manager.save(user);
  }
}
