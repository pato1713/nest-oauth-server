import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Render,
  UseFilters,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dtos/registration.dto';
import { UserEntity } from '@/user/entities/user.entity';
import { AuthenticationDto } from './dtos/authentication.dto';
import { SetCookie } from '@/common/decorators/set-cookie.decorator';
import { GetCookie } from '@/common/decorators/get-cookie.decorator';
import { ViewExceptionFilter } from '@/common/filters/view.exception.filter';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { ExpiredCacheException } from './exceptions/expired-cache.exception';
import { OAuthAuthorizationDto } from '@/oauth-clients/dtos/oauth-authorization.dto';
import { OAuthClientsService } from '@/oauth-clients/oauth-clients.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _oauthClientsService: OAuthClientsService,
  ) {}

  @Get('authorize')
  @Redirect('login')
  @SetCookie('oauth_transaction', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  })
  async authorize(@Query() oauthAuthorization: OAuthAuthorizationDto) {
    const transactionId =
      await this._oauthClientsService.createAuthorizationTransaction(
        oauthAuthorization,
      );

    return transactionId;
  }

  @Get('login')
  @Render('login')
  async loginPage() {}

  @Post('login')
  @Redirect() // empty so url is returned
  @UseFilters(ViewExceptionFilter)
  async login(
    @Body() authenticationDto: AuthenticationDto,
    @GetCookie('oauth_transaction') transactionId: string,
  ) {
    const isValid =
      await this._authenticationService.hasValidCredentials(authenticationDto);

    // return to login page and display error   if credentials are invalid
    if (!isValid) {
      throw new InvalidCredentialsException(authenticationDto.email);
    }

    const authorization =
      await this._oauthClientsService.getAuthorization(transactionId);

    // no authorization found - meaning the cache has expired
    if (!authorization) {
      throw new ExpiredCacheException();
    }

    return {
      url: authorization.redirectUri,
      statusCode: HttpStatus.FOUND,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    return this._authenticationService.registration(registrationDto);
  }

  @Get('register')
  @Render('register')
  async registerPage() {}
}
