import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthClientEntity } from './entities/oauth-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OAuthClientEntity])],
})
export class OauthClientsModule {}
