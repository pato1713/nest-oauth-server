import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '@/config/typeorm.config';
import { OAuthClientEntity } from '@/oauth-clients/entities/oauth-client.entity';
import { OAuthClientsSeederService } from './seeders/oauth-clients/oauth-clients.seeder';
import { UsersSeederService } from './seeders/users/users.seeder';
import { AuthenticationModule } from '@/authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    TypeOrmModule.forFeature([OAuthClientEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
  ],
  providers: [OAuthClientsSeederService, UsersSeederService],
})
export class SeederModule {}
