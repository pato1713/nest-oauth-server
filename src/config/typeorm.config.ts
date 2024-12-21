import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from '@/database/strategies/snake-naming.strategy';
import { OAuthClientEntity } from '@/oauth-clients/entities/oauth-client.entity';
import { AuthenticationEntity } from '@/authentication/entities/authentication.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '@/app/constants/app.constant';

/**
 * Single source of truth for your TypeORM configuration that's used both for:
 *
 * 1. CLI migrations (through typeorm.config.ts)
 * 2. Runtime database connection (through database.module.ts)
 * 3. Seeding (through seeds/oauth-clients.seeder.ts)
 *
 */

config();

export const getTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService ? configService.get('POSTGRES_HOST') : 'localhost', // Use localhost for CLI migrations
  port: configService
    ? configService.get('POSTGRES_PORT')
    : parseInt(process.env.POSTGRES_PORT),
  username: configService
    ? configService.get('POSTGRES_USER')
    : process.env.POSTGRES_USER,
  password: configService
    ? configService.get('POSTGRES_PASSWORD')
    : process.env.POSTGRES_PASSWORD,
  database: configService
    ? configService.get('POSTGRES_DB')
    : process.env.POSTGRES_DB,
  entities: [OAuthClientEntity, AuthenticationEntity, UserEntity],
  migrations: ['src/database/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: configService
    ? configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT
    : false,
  logging: configService
    ? configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT
    : false,
});

export default new DataSource(getTypeOrmConfig(null));
