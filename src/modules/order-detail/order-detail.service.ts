import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from 'src/database/entities/order-detail.entity';
import { OrderDetailDto } from './dto/order-detail.dto';
import { OrderDetailInterface } from './interface/order-detail.interface';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(data: OrderDetailDto): Promise<OrderDetailInterface> {
    return await this.orderDetailRepository.save({
      ...data,
      order: { id: data.orderId },
      productDetail: { id: data.productDetailId },
    });
  }
}
