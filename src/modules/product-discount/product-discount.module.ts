import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDisountEntity } from 'src/database/entities/product-discount.entity';
import { ProductDiscountService } from './product-discount.service';
import { ProductModule } from '../product/product.module';
import { DiscountModule } from '../discount/discount.module';
import { ProductDiscountController } from './product-discount.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDisountEntity]),
    ProductModule,
    DiscountModule,
  ],
  controllers: [ProductDiscountController],
  providers: [ProductDiscountService],
})
export class ProductDiscountModule {}
