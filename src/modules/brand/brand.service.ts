import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/database/entities/brand.entity';
import { Repository } from 'typeorm';
import { BrandInterface } from './interface/brand.interface';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async findAll(): Promise<BrandInterface[]> {
    return await this.brandRepository.find();
  }

  async findByName(brandName: string): Promise<BrandInterface | null> {
    return await this.brandRepository.findOneBy({ name: brandName });
  }

  async findById(id: string): Promise<BrandInterface | null> {
    return await this.brandRepository.findOneBy({ id });
  }

  async create(data: BrandDto): Promise<BrandInterface> {
    try {
      const brand = await this.findByName(data.name);
      if (brand) {
        throw new ConflictException(`This brand name already exists!`);
      }

      return await this.brandRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: BrandDto): Promise<BrandInterface> {
    try {
      const brandById = await this.findById(id);
      if (!brandById) {
        throw new NotFoundException(`No have brand with id = ${id}`);
      }

      const brandByName = await this.findByName(data.name);
      if (brandByName) {
        throw new ConflictException(`This brand name already exists!`);
      }

      return await this.brandRepository.save({ id, ...data });
    } catch (error) {
      throw error;
    }
  }

  async updateDeleteStatus(
    id: string,
    userId: string,
    isDeleted: boolean,
  ): Promise<BrandInterface> {
    try {
      const brandById = await this.findById(id);
      if (!brandById) {
        throw new NotFoundException(`No have brand with id = ${id}`);
      }

      return await this.brandRepository.save({
        id,
        isDeleted: isDeleted,
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
