import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderInterface } from './interface/order.interface';
import { Status } from 'src/commons/enums/status.enum';
import { PAGE_SIZE } from 'src/constants/constant';
import { OrderMapper } from './mapper/order.mapper';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(
    page: number,
  ): Promise<{ data: OrderInterface[]; total: number; totalPages: number }> {
    const [data, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  }

  async findOne(id: string): Promise<OrderInterface | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'orderDetail',
        'orderDetail.productDetail',
        'orderDetail.productDetail.product',
        'payment',
        'shipping',
      ],
    });

    return OrderMapper.toResponse(order);
  }

  async create(data: OrderDto): Promise<OrderInterface> {
    const userId = data.userId;
    return await this.orderRepository.save({
      ...data,
      user: userId ? ({ id: userId } as any) : null,
      guestName: data.guestName ?? null,
      guestPhone: data.guestPhone ?? null,
    });
  }

  async updateStatus(
    id: string,
    status: Status,
    userId: string,
  ): Promise<OrderInterface> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Can not find order with this id.');
    }

    return await this.orderRepository.save({
      ...order,
      updateBy: userId,
      status,
    });
  }

  async softDelete(id: string, userId: string) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Can not find order with this id.');
    }

    return await this.orderRepository.save({
      id,
      updatedBy: userId,
      deletedAt: new Date(),
    });
  }
}
