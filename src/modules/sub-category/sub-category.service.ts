import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from 'src/database/entities/sub-category.entity';
import { Repository } from 'typeorm';
import { SubCategoryInterface } from './interface/sub-category.interface';
import { CreateSubCategoryDto } from './dto/sub-category.dto';
import { CategoryService } from '../category/category.service';
import { SubCategoryMapper } from './mapper/sub-category.mapper';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    private categoryService: CategoryService,
  ) {}

  async findAll(): Promise<SubCategoryInterface[]> {
    const subCategory = await this.subCategoryRepository.find({
      relations: ['category'],
    });
    return subCategory.map((data) => SubCategoryMapper.toResponse(data));
  }

  async findDuplicate(
    subCategoryName: string,
    categoryName: string,
  ): Promise<SubCategoryInterface | null> {
    return await this.subCategoryRepository.findOneBy({
      name: subCategoryName,
      category: { name: categoryName },
    });
  }

  async findById(id: string): Promise<SubCategoryInterface | null> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (subCategory) return SubCategoryMapper.toResponse(subCategory);

    return null;
  }

  async findByCategoryId(
    categoryId: string,
  ): Promise<SubCategoryInterface[] | null> {
    const subCategory = await this.subCategoryRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
    if (subCategory)
      return subCategory.map((data) => SubCategoryMapper.toResponse(data));

    return null;
  }

  async create(data: CreateSubCategoryDto): Promise<SubCategoryInterface> {
    const { name, categoryName, createdBy, updatedBy } = data;
    try {
      let category: any = await this.categoryService.findByName(categoryName);
      if (!category) {
        category = await this.categoryService.create({
          name: categoryName,
          createdBy,
          updatedBy,
        });
      }

      const subCategory = await this.findDuplicate(name, categoryName);
      if (subCategory) {
        throw new ConflictException(
          `This sub category name already exists in category!`,
        );
      }

      return await this.subCategoryRepository.save({
        ...data,
        category,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    data: UpdateSubCategoryDto,
  ): Promise<SubCategoryInterface> {
    try {
      const subCategoryById = await this.findById(id);
      if (!subCategoryById) {
        throw new NotFoundException(`No have sub category with id = ${id}`);
      }

      const subCategoryByName = await this.findDuplicate(
        data.name,
        subCategoryById.category.name,
      );
      if (subCategoryByName && subCategoryByName?.id != id) {
        throw new ConflictException(
          `This sub category name already exists in category!`,
        );
      }

      return await this.subCategoryRepository.save({ id, ...data });
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: string, userId: string): Promise<SubCategoryInterface> {
    try {
      const subCategoryById = await this.findById(id);
      if (!subCategoryById) {
        throw new NotFoundException(`No have sub category with id = ${id}`);
      }

      return await this.subCategoryRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
