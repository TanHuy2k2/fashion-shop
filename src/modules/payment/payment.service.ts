import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { PaymentMethod } from 'src/commons/enums/payment-method.enum';
import { Status } from 'src/commons/enums/status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(data: PaymentDto) {
    return await this.paymentRepository.save({
      ...data,
      paymentMethod: data.paymentMethod,
      paymentDate: new Date(),
      order: { id: data.orderId },
    });
  }

  async updatePayment(id: string, paymentMethod: PaymentMethod) {
    return await this.paymentRepository.save({
      id,
      paymentMethod,
    });
  }

  async updateStatus(id: string, status: Status) {
    return await this.paymentRepository.save({
      id,
      status,
    });
  }
}
