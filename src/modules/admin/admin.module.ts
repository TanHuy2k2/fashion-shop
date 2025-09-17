import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AdminController],
})
export class AdminModule {}
