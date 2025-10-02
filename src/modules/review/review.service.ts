import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from 'src/database/entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewInterface } from './interface/review.interface';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewMapper } from './mapper/review.mapper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async findOne(id: string): Promise<ReviewInterface | null> {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async create(
    userId: string,
    data: CreateReviewDto,
  ): Promise<ReviewInterface> {
    const product = await this.productService.findById(data.productId);
    if (!product) throw new NotFoundException('Product not found');

    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    return await this.reviewRepository.save({ ...data, product, user });
  }

  async findByProduct(productId: string): Promise<ReviewInterface[]> {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user', 'product'],
      order: {
        createdAt: 'ASC',
      },
    });

    return reviews.map((data) => ReviewMapper.toResponse(data));
  }

  async update(id: string, data: UpdateReviewDto): Promise<ReviewInterface> {
    const review = await this.findOne(id);
    if (!review) throw new NotFoundException('Review not found');

    return await this.reviewRepository.save({ id, ...data });
  }

  async remove(id: string, userId: string): Promise<ReviewInterface> {
    const review = await this.findOne(id);
    if (!review) throw new NotFoundException('Review not found');

    return await this.reviewRepository.save({
      id,
      deletedAt: new Date(),
      updatedBy: userId,
    });
  }
}
