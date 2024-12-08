import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dtos/registration.dto';
import { UserEntity } from '@/user/entities/user.entity';
import { AuthorizationDto } from './dtos/authorization.dto';
import { AuthenticationDto } from './dtos/authentication.dto';
import { SetCookie } from '@/common/decorators/set-cookie.decorator';
import { GetCookie } from '@/common/decorators/get-cookie.decorator';
import { ViewExceptionFilter } from '@/common/filters/view.exception.filter';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { ExpiredCacheException } from './exceptions/expired-cache.exception';

@Controller()
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('authorize')
  @Render('login')
  @SetCookie('oauth_transaction', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 3600,
  })
  async authorize(@Body() authorization: AuthorizationDto) {
    const transactionId =
      await this._authenticationService.createAuthorizationTransaction(
        authorization,
      );

    return { transaction_id: transactionId };
  }

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
      await this._authenticationService.getAuthorization(transactionId);

    // no authorization found - meaning the cache has expired
    if (!authorization) {
      throw new ExpiredCacheException();
    }

    return {
      url: authorization.redirectUri,
      statursCode: HttpStatus.FOUND,
    };
  }

  @Get('register')
  async getRegisterPage(@Req() req, @Res() res) {
    // Check if user is already logged in
    if (req?.session?.user) {
      // Proceed directly to consent or issue authorization code
      return res.redirect(`/consent?client_id=${req.query.client_id}`);
    }
    // Render the login form
    return res.render('register', { client_id: req.query.client_id });
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    return this._authenticationService.registration(registrationDto);
  }
}
