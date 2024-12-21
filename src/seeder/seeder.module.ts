import { Module } from '@nestjs/common';
import { SeederService } from './seeder.sevice';
import { OauthClientsSeederService } from './seeders/oauth-clients.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthClientEntity } from '@/oauth-clients/entities/oauth-client.entity';
import { getTypeOrmConfig } from '@/config/typeorm.config';
import { AuthenticationSubscriber } from '@/authentication/subscribers/authentication.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([OAuthClientEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getTypeOrmConfig(configService),
        subscribers: [AuthenticationSubscriber],
      }),
    }),
  ],
  providers: [SeederService, OauthClientsSeederService],
  exports: [SeederService],
})
export class SeederModule {}
