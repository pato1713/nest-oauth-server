import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';
import { OauthClientsModule } from '@/oauth-clients/oauth-clients.module';
import { PasswordModule } from '@/password/password.module';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    OauthClientsModule,
    TypeOrmModule.forFeature([AuthenticationEntity]),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
