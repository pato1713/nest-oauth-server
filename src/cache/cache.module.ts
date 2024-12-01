import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secondary = new KeyvRedis({
          url: configService.get('REDIS_URL'),
        });
        return new Cacheable({ secondary, ttl: '4h' });
      },
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}
