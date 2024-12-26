import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthClientEntity } from './entities/oauth-client.entity';
import { OauthClientsService } from './oauth-clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([OAuthClientEntity])],
  providers: [OauthClientsService],
})
export class OauthClientsModule {}
