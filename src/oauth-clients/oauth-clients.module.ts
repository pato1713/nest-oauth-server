import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthClientEntity } from './entities/oauth-client.entity';
import { OAuthClientsService } from './oauth-clients.service';
import { CacheModule } from '@/cache/cache.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([OAuthClientEntity])],
  providers: [OAuthClientsService],
  exports: [OAuthClientsService],
})
export class OAuthClientsModule {}
