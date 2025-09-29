import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingEntity } from 'src/database/entities/shipping.entity';
import { Repository } from 'typeorm';
import { ShippingDto } from './dto/shipping.dto';
import { Status } from 'src/commons/enums/status.enum';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingEntity)
    private shippingRepository: Repository<ShippingEntity>,
  ) {}

  async create(data: ShippingDto) {
    return await this.shippingRepository.save({
      ...data,
      order: { id: data.orderId },
    });
  }
}
