import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';
import { PasswordModule } from '@/password/password.module';
import { OAuthClientsModule } from '@/oauth-clients/oauth-clients.module';
import { AuthenticationSubscriber } from './subscribers/authentication.subscriber';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    OAuthClientsModule,
    TypeOrmModule.forFeature([AuthenticationEntity]),
  ],
  providers: [AuthenticationService, AuthenticationSubscriber],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
