import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/database/entities/review.entity';
import { ReviewService } from './review.service';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    ProductModule,
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
