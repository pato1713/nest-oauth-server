import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';
import { CacheModule } from '@/cache/cache.module';
import { CacheService } from '@/cache/cache.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([AuthenticationEntity]),
    CacheModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
