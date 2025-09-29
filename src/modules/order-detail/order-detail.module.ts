import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/database/entities/order-detail.entity';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './order-detail.service';
import { ProductDetailModule } from '../product-detail/product-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity]), ProductDetailModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
