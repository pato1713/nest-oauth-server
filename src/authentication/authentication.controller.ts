import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dtos/registration.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Get('authorize')
  async getLoginPage(@Req() req, @Res() res) {
    // Check if user is already logged in
    if (req?.session?.user) {
      // Proceed directly to consent or issue authorization code
      return res.redirect(`/consent?client_id=${req.query.client_id}`);
    }
    // Render the login form
    return res.render('login', { client_id: req.query.client_id });
  }

  @Post('login')
  async login(@Req() req, @Res() res) {
    // Check if user is already logged in
    if (req?.session?.user) {
      // Proceed directly to consent or issue authorization code
      return res.redirect(`/consent?client_id=${req.query.client_id}`);
    }
    // Render the login form
    return res.render('login', { client_id: req.query.client_id });
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
