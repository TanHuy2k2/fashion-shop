import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from 'src/database/entities/order-detail.entity';
import { OrderDetailDto } from './dto/order-detail.dto';
import { OrderDetailInterface } from './interface/order-detail.interface';
import { ProductDetailService } from '../product-detail/product-detail.service';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailRepository: Repository<OrderDetailEntity>,
    private productDetailService: ProductDetailService,
  ) {}

  async create(data: OrderDetailDto): Promise<OrderDetailInterface> {
    const productDetail = await this.productDetailService.decreaseStock(
      data.productDetailId,
      data.quantity,
    );

    return await this.orderDetailRepository.save({
      ...data,
      order: { id: data.orderId },
      productDetail: { id: data.productDetailId },
      unitPrice: productDetail.price,
      totalPrice: productDetail.price * data.quantity,
    });
  }
}
