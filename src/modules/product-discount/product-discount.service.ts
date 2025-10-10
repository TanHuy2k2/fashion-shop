import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDisountEntity } from 'src/database/entities/product-discount.entity';
import { Repository } from 'typeorm';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { ProductService } from '../product/product.service';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { DiscountService } from '../discount/discount.service';
import { DiscountScope } from 'src/commons/enums/discount-scope.enum';

@Injectable()
export class ProductDiscountService {
  constructor(
    @InjectRepository(ProductDisountEntity)
    private productDiscountRepository: Repository<ProductDisountEntity>,
    private productService: ProductService,
    private discountService: DiscountService,
  ) {}

  async findById(id: string) {
    return await this.productDiscountRepository.findOneBy({ id });
  }

  async findDuplicate(productId: string, discountId: string) {
    return await this.productDiscountRepository.findOneBy({
      product: { id: productId },
      discount: { id: discountId },
    });
  }

  async create(data: CreateProductDiscountDto) {
    try {
      const { productId, discountId } = data;
      const product = await this.productService.findById(productId);
      if (!product) {
        throw new NotFoundException('Can not find this product!');
      }

      const discount = await this.discountService.findById(discountId);
      if (!discount) {
        throw new NotFoundException('Can not find this discount!');
      }

      const checkDuplicate = await this.findDuplicate(productId, discountId);
      if (checkDuplicate) {
        throw new ConflictException(`This product discount have in database!`);
      }

      if (discount.scope === DiscountScope.ALL)
        throw new BadRequestException('Invalid discount scope!');

      return await this.productDiscountRepository.save({
        product,
        discount,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateProductDiscountDto) {
    try {
      const { productId, discountId } = data;
      let product: any, discount: any;
      const productDiscountById = await this.findById(id);
      if (!productDiscountById) {
        throw new NotFoundException(`No have product discount with id = ${id}`);
      }

      if (productId) {
        product = await this.productService.findById(productId);
        if (!product) {
          throw new NotFoundException('Can not find this product!');
        }
      }

      if (discountId) {
        discount = await this.discountService.findById(discountId);
        if (!discount) {
          throw new NotFoundException('Can not find this discount!');
        }

        if (discount.scope === DiscountScope.ALL)
          throw new BadRequestException('Invalid discount scope!');
      }

      if (productId && discountId) {
        const checkDuplicate = await this.findDuplicate(productId, discountId);
        if (checkDuplicate) {
          throw new ConflictException(
            `This product discount have in database!`,
          );
        }
      }

      return await this.productDiscountRepository.save({
        id,
        ...data,
        product,
        discount,
      });
    } catch (error) {
      throw error;
    }
  }
}
