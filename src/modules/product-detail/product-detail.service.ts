import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetailEntity } from 'src/database/entities/product-detail.entity';
import { ProductDetailInterface } from './interface/product-detail.interface';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { ProductService } from '../product/product.service';
import { ColorService } from '../color/color.service';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetailMapper } from './mapper/product-detail.mapper';
import * as XLSX from 'xlsx';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetailEntity)
    private productDetailRepository: Repository<ProductDetailEntity>,
    private productService: ProductService,
    private colorService: ColorService,
  ) {}

  async findByProductId(productId: string): Promise<ProductDetailInterface[]> {
    const productDetail = await this.productDetailRepository.find({
      relations: [
        'product',
        'product.subCategory',
        'product.subCategory.category',
        'product.brand',
        'color',
      ],
      where: { product: { id: productId } },
      order: {
        createdAt: 'ASC',
      },
    });
    return productDetail.map((p) => ProductDetailMapper.toResponse(p));
  }

  async findById(productDetailId: string) {
    return await this.productDetailRepository.findOne({
      where: { id: productDetailId },
      relations: ['product', 'color'],
    });
  }

  async findDuplicate(
    productId: string,
    colorId: string,
    size: string,
    price: number,
  ): Promise<ProductDetailInterface | null> {
    return await this.productDetailRepository.findOne({
      where: {
        product: { id: productId },
        color: { id: colorId },
        size,
        price,
      },
    });
  }

  async create(data: CreateProductDetailDto): Promise<ProductDetailInterface> {
    try {
      const { product, color, createdBy, updatedBy } = data;
      let checkProduct: any = await this.productService.findOneByName(
        product.name,
      );
      if (!checkProduct) {
        checkProduct = await this.productService.create({
          ...product,
          createdBy,
          updatedBy,
        });
      }

      let checkColor: any = await this.colorService.findByName(color.name);
      if (!checkColor) {
        checkColor = await this.colorService.create({
          ...color,
          createdBy,
          updatedBy,
        });
      }

      const productDetail = await this.findDuplicate(
        checkProduct.id,
        checkColor.id,
        data.size,
        data.price,
      );
      if (productDetail) {
        const stock = data.stock + productDetail.stock;
        return await this.update(productDetail.id, {
          color: checkColor,
          image: data.image,
          size: data.size,
          stock,
          price: data.price,
          updatedBy,
        });
      }

      return await this.productDetailRepository.save({
        ...data,
        product: checkProduct,
        color: checkColor,
      });
    } catch (error) {
      throw error;
    }
  }

  async import(userId: string, filePath: string): Promise<void> {
    if (!filePath) {
      throw new NotFoundException(`No have file!`);
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);
    for (const row of rows) {
      try {
        await this.create({
          product: {
            brandName: row['brand'],
            categoryName: row['category'],
            subCategoryName: row['sub_category'],
            name: row['name'],
            description: row['description'],
            createdBy: userId,
            updatedBy: userId,
          },
          color: { name: row['color'], createdBy: userId, updatedBy: userId },
          size: row['size'],
          price: Number(row['price']),
          stock: Number(row['stock']),
          image: row['image'],
          createdBy: userId,
          updatedBy: userId,
        });
      } catch (err) {
        throw err;
      }
    }
  }

  async update(
    id: string,
    data: UpdateProductDetailDto,
  ): Promise<ProductDetailInterface> {
    try {
      const { color } = data;
      const productDetailById = await this.findById(id);
      if (!productDetailById) {
        throw new NotFoundException(`No have product detail with id = ${id}`);
      }

      let checkColor: any = await this.colorService.findByName(color.name);
      if (!checkColor) {
        checkColor = await this.colorService.create({
          ...color,
        });
      }

      return await this.productDetailRepository.save({
        id,
        ...data,
        color: checkColor,
      });
    } catch (error) {
      throw error;
    }
  }

  async decreaseStock(
    id: string,
    quantity: number,
  ): Promise<ProductDetailEntity> {
    const productDetail = await this.findById(id);
    if (!productDetail) {
      throw new NotFoundException('Product detail not found');
    }

    if (productDetail.stock < quantity) {
      throw new BadRequestException('Not enough stock');
    }

    productDetail.stock -= quantity;
    return await this.productDetailRepository.save(productDetail);
  }

  async softDelete(
    id: string,
    userId: string,
  ): Promise<ProductDetailInterface> {
    try {
      const productDetailById = await this.findById(id);
      if (!productDetailById) {
        throw new NotFoundException(`No have product detail with id = ${id}`);
      }

      return await this.productDetailRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
