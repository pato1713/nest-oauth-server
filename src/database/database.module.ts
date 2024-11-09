import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategies/snake-naming.strategy';
import { NODE_ENV } from 'src/app/constants/app.constant';
import { AuthenticationSubsriber } from 'src/authentication/subscribers/authentication.subscriber';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticationEntity } from 'src/authentication/entities/authentication.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        logging: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        // extra: { charset: 'utf8mb4_unicode_ci' },
        subscribers: [AuthenticationSubsriber],
      }),
    }),
  ],
})
export class DatabaseModule {}
