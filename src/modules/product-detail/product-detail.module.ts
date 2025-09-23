import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetailEntity } from 'src/database/entities/product-detail.entity';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetailService } from './product-detail.service';
import { ProductModule } from '../product/product.module';
import { ColorModule } from '../color/color.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDetailEntity]),
    ProductModule,
    ColorModule,
  ],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
