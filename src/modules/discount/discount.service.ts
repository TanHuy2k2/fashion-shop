import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/database/entities/discount.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { DiscountInterface } from './interface/discount.interface';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private discountRepository: Repository<DiscountEntity>,
  ) {}

  async getAll(): Promise<DiscountInterface[]> {
    return await this.discountRepository.find();
  }

  async getActiveDiscount(date: Date): Promise<DiscountInterface[]> {
    return await this.discountRepository.find({
      where: {
        startDate: LessThanOrEqual(date),
        endDate: MoreThanOrEqual(date),
      },
    });
  }

  async findById(id: string): Promise<DiscountInterface | null> {
    return await this.discountRepository.findOneBy({ id });
  }

  async findByName(discountName: string): Promise<DiscountInterface | null> {
    return await this.discountRepository.findOneBy({ name: discountName });
  }

  async create(data: CreateDiscountDto): Promise<DiscountInterface> {
    try {
      const discount = await this.findByName(data.name);
      if (discount) {
        throw new ConflictException(`This discount already exists!`);
      }

      return await this.discountRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    data: UpdateDiscountDto,
  ): Promise<DiscountInterface> {
    try {
      const discountById = await this.findById(id);
      if (!discountById) {
        throw new NotFoundException(`No have discount with id = ${id}`);
      }

      const discountByName = await this.findByName(data.name);
      if (discountByName) {
        throw new ConflictException(`This discount already exists!`);
      }

      return await this.discountRepository.save({ id, ...data });
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: string, userId: string): Promise<DiscountInterface> {
    try {
      const discountById = await this.findById(id);
      if (!discountById) {
        throw new NotFoundException(`No have discount with id = ${id}`);
      }

      return await this.discountRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
