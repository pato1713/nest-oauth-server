import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateAuthenticationDto } from './dtos/authentication.dto';
import { AuthenticationEntity } from './entities/authentication.entity';
import { PosgresErrorCode } from 'src/database/constraints/error.constraint';
import { RegistrationDto } from './dtos/registration.dto';
import { UserAlreadyExistExeption } from './exceptions/user-already-exist.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private authenticationRepository: Repository<AuthenticationEntity>,
    private readonly _userService: UserService,
    private readonly _dataSource: DataSource,
  ) {}

  async registration(registrationDto: RegistrationDto): Promise<UserEntity> {
    let user: UserEntity;
    const queryRunner = this._dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const authentication = await this._createAuthentication(
        registrationDto,
        queryRunner,
      );

      user = await this._userService.createUser(
        registrationDto,
        authentication,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.code === PosgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistExeption();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  private async _createAuthentication(
    createAuthenticationDto: CreateAuthenticationDto,
    queryRunner: QueryRunner,
  ): Promise<AuthenticationEntity> {
    const authentication = this.authenticationRepository.create(
      createAuthenticationDto,
    );
    return queryRunner.manager.save(authentication);
  }
}
