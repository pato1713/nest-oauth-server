import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationSubscriber } from '@/authentication/subscribers/authentication.subscriber';
import { getTypeOrmConfig } from '@/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getTypeOrmConfig(configService),
        subscribers: [AuthenticationSubscriber],
      }),
    }),
  ],
})
export class DatabaseModule {}
