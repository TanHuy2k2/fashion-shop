import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
