import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { BrandService } from '../brand/brand.service';
import { PAGE_SIZE } from 'src/constants/constant';
import { ProductInterface } from './interface/product.interface';
import { ProductMapper } from './mapper/product.mapper';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
  ) {}

  async findAll(
    page: number,
  ): Promise<{ data: ProductInterface[]; total: number; totalPages: number }> {
    const [result, total] = await this.productRepository.findAndCount({
      relations: ['brand', 'subCategory', 'subCategory.category'],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      order: {
        createdAt: 'ASC',
      },
    });
    const data = result.map((data) => ProductMapper.toResponse(data));

    return {
      data,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  }

  async findByName(productName: string): Promise<ProductInterface[] | null> {
    const product = await this.productRepository.find({
      where: { name: productName },
      relations: ['brand', 'subCategory', 'subCategory.category'],
    });
    return product.map((data) => ProductMapper.toResponse(data));
  }

  async findByBrand(brandId: string): Promise<ProductInterface[] | null> {
    const product = await this.productRepository.find({
      where: { brand: { id: brandId } },
      relations: ['brand', 'subCategory', 'subCategory.category'],
    });
    return product.map((data) => ProductMapper.toResponse(data));
  }

  async findBySubCategory(
    subCategoryId: string,
  ): Promise<ProductInterface[] | null> {
    const product = await this.productRepository.find({
      where: { subCategory: { id: subCategoryId } },
      relations: ['brand', 'subCategory', 'subCategory.category'],
    });
    return product.map((data) => ProductMapper.toResponse(data));
  }

  async findById(id: string): Promise<ProductInterface | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async findDuplicate(
    productName: string,
    subCategoryName: string,
    categoryName: string,
    brandName: string,
  ): Promise<ProductInterface | null> {
    return await this.productRepository.findOneBy({
      name: productName,
      subCategory: {
        name: subCategoryName,
        category: {
          name: categoryName,
        },
      },
      brand: {
        name: brandName,
      },
    });
  }

  async validateProductBeforeCreate(
    productName: string,
    subCategoryName: string,
    categoryName: string,
    brandName: string,
    createdBy: string,
    updatedBy: string,
  ) {
    let brand: any = await this.brandService.findByName(brandName);
    if (!brand) {
      brand = await this.brandService.create({
        name: brandName,
        createdBy,
        updatedBy,
      });
    }

    let subCategory: any =
      await this.subCategoryService.findByName(subCategoryName);
    if (!subCategory) {
      subCategory = await this.subCategoryService.create({
        name: subCategoryName,
        categoryName: categoryName,
        createdBy,
        updatedBy,
      });
    }

    const checkDuplicate = await this.findDuplicate(
      productName,
      subCategoryName,
      categoryName,
      brandName,
    );

    return { brand, subCategory, checkDuplicate };
  }

  async create(data: ProductDto): Promise<ProductInterface> {
    try {
      const {
        name,
        brandName,
        subCategoryName,
        categoryName,
        createdBy,
        updatedBy,
      } = data;
      const { brand, subCategory, checkDuplicate } =
        await this.validateProductBeforeCreate(
          name,
          subCategoryName,
          categoryName,
          brandName,
          createdBy,
          updatedBy,
        );
      if (checkDuplicate) {
        throw new ConflictException(`This product have in database`);
      }

      return await this.productRepository.save({
        ...data,
        brand: brand,
        subCategory: subCategory,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: ProductDto): Promise<ProductInterface> {
    try {
      const {
        name,
        brandName,
        subCategoryName,
        categoryName,
        createdBy,
        updatedBy,
      } = data;
      const product = await this.findById(id);
      if (!product) {
        throw new NotFoundException(`No have product with id = ${id}`);
      }

      const { brand, subCategory, checkDuplicate } =
        await this.validateProductBeforeCreate(
          name,
          subCategoryName,
          categoryName,
          brandName,
          createdBy,
          updatedBy,
        );
      if (checkDuplicate && id != product.id) {
        throw new ConflictException(`This product have in database`);
      }

      return await this.productRepository.save({
        id,
        ...data,
        brand,
        subCategory,
      });
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: string, userId: string): Promise<ProductInterface> {
    try {
      const product = await this.findById(id);
      if (!product) {
        throw new NotFoundException(`No have product with id = ${id}`);
      }

      return await this.productRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
