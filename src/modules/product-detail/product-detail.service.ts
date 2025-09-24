import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetailEntity } from 'src/database/entities/product-detail.entity';
import { ProductDetailInterface } from './interface/product-detail.interface';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { ProductService } from '../product/product.service';
import { ColorService } from '../color/color.service';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetailMapper } from './mapper/product-detail.mapper';

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
    const productDetail = await this.productDetailRepository.findOne({
      where: { id: productDetailId },
      relations: [
        'product',
        'product.subCategory',
        'product.subCategory.category',
        'product.brand',
        'color',
      ],
    });
    if (productDetail) return ProductDetailMapper.toResponse(productDetail);

    return null;
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

  async update(
    id: string,
    data: UpdateProductDetailDto,
  ): Promise<ProductDetailInterface> {
    try {
      const productDetailById = await this.findById(id);
      if (!productDetailById) {
        throw new NotFoundException(`No have product detail with id = ${id}`);
      }

      return await this.productDetailRepository.save({ id, ...data });
    } catch (error) {
      throw error;
    }
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
