import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CacheModule } from './cache/cache.module';
import { SeederModule } from './seeder/seeder.module';
import { PasswordModule } from './password/password.module';
import { OAuthClientsModule } from './oauth-clients/oauth-clients.module';
import { DiscoveryModule } from './discovery/discovery.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    DatabaseModule,
    ConfigModule,
    AuthenticationModule,
    CacheModule,
    OAuthClientsModule,
    SeederModule,
    PasswordModule,
    DiscoveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
