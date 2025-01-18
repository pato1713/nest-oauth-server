import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/entities/user.entity';
import { AuthenticationDto } from './dtos/authentication.dto';
import { AuthenticationEntity } from './entities/authentication.entity';
import { PostgresErrorCode } from '@/database/constraints/error.constraint';
import { RegistrationDto } from './dtos/registration.dto';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '@/common/decorators/transaction.decorator';
import { PasswordService } from '@/password/password.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    private readonly _userService: UserService,
    private readonly _passwordService: PasswordService,
    // TODO: find a better way to reuse transaction logic
    // data source is needed by transaction decorator
    private readonly _dataSource: DataSource,
  ) {}

  @Transaction()
  async hasValidCredentials(
    authenticationDto: AuthenticationDto,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const authentication = await this._getAuthenticationByEmail(
      authenticationDto.email,
      queryRunner,
    );

    if (!authentication) return false;

    const isValidPassword = await this._passwordService.validatePassword(
      authentication.password,
      authenticationDto.password,
    );

    return isValidPassword;
  }

  @Transaction()
  async registration(
    registrationDto: RegistrationDto,
    queryRunner?: QueryRunner,
  ): Promise<UserEntity> {
    try {
      const authentication = await this._createAuthentication(
        registrationDto,
        queryRunner,
      );

      const user = await this._userService.createUser(
        registrationDto,
        authentication,
        queryRunner,
      );
      return user;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException();
      }
      throw new InternalServerErrorException();
    }
  }

  private async _createAuthentication(
    authenticationDto: AuthenticationDto,
    queryRunner: QueryRunner,
  ): Promise<AuthenticationEntity> {
    const authentication =
      this.authenticationRepository.create(authenticationDto);
    return queryRunner.manager.save(authentication);
  }

  private async _getAuthenticationByEmail(
    email: string,
    queryRunner?: QueryRunner,
  ): Promise<AuthenticationEntity> {
    if (queryRunner) {
      return queryRunner.manager.findOneBy(AuthenticationEntity, { email });
    }
    return this.authenticationRepository.findOneBy({ email });
  }
}
