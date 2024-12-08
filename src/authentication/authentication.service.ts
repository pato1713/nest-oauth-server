import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/entities/user.entity';
import { AuthenticationDto } from './dtos/authentication.dto';
import { AuthenticationEntity } from './entities/authentication.entity';
import { PosgresErrorCode } from '@/database/constraints/error.constraint';
import { RegistrationDto } from './dtos/registration.dto';
import { UserAlreadyExistExeption } from './exceptions/user-already-exist.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationDto } from './dtos/authorization.dto';
import { Transaction } from '@/common/decorators/transaction.decorator';
import { AuthenticationProvider } from './providers/authentication.provider';
import { randomUUID } from 'crypto';
import { CacheService } from '@/cache/cache.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    private readonly _userService: UserService,
    private readonly _cacheService: CacheService,
  ) {}

  async createAuthorizationTransaction(authorization: AuthorizationDto) {
    const transactionId = randomUUID();
    const result = await this._cacheService.set(transactionId, authorization);

    // TODO: Replace with meaningful error
    if (!result) {
      throw new InternalServerErrorException();
    }

    return transactionId;
  }

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

    const isValidPassword = await AuthenticationProvider.validatePassword(
      authentication.password,
      authenticationDto.password,
    );

    return isValidPassword;
  }

  async getAuthorization(transactionId: string) {
    const authorization =
      await this._cacheService.get<AuthorizationDto>(transactionId);

    return authorization;
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
      if (error?.code === PosgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistExeption();
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
