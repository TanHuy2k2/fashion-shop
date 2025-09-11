import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { AuthGuard } from 'src/commons/gaurds/auth.guard';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
