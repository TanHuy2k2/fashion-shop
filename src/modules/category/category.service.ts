import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryInterface } from './interface/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PAGE_SIZE } from 'src/constants/constant';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(
    page: number,
  ): Promise<{ data: CategoryInterface[]; total: number; totalPages: number }> {
    const [data, total] = await this.categoryRepository.findAndCount({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      order: {
        isDeleted: 'ASC',
        createdAt: 'ASC',
      },
    });

    return {
      data,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  }

  async findByName(categoryName: string): Promise<CategoryInterface | null> {
    return await this.categoryRepository.findOneBy({ name: categoryName });
  }

  async findById(id: string): Promise<CategoryInterface | null> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async create(data: CreateCategoryDto): Promise<CategoryInterface> {
    try {
      const category = await this.findByName(data.name);
      if (category) {
        throw new ConflictException(`This category name already exists!`);
      }

      return await this.categoryRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryInterface> {
    try {
      const categoryById = await this.findById(id);
      if (!categoryById) {
        throw new NotFoundException(`No have category with id = ${id}`);
      }

      const categoryByName = await this.findByName(data.name);
      if (categoryByName) {
        throw new ConflictException(`This category name already exists!`);
      }

      return await this.categoryRepository.save({ id, ...data });
    } catch (error) {
      throw error;
    }
  }

  async updateDeleteStatus(
    id: string,
    userId: string,
    isDeleted: boolean,
  ): Promise<CategoryInterface> {
    try {
      const categoryById = await this.findById(id);
      if (!categoryById) {
        throw new NotFoundException(`No have category with id = ${id}`);
      }

      return await this.categoryRepository.save({
        id,
        isDeleted: isDeleted,
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
