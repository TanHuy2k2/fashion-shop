import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Req,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() data: CreateReviewDto, @Req() req) {
    const userId = req.user.id;
    return this.reviewService.create(userId, {
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Public()
  @Get('product/:id')
  findByProduct(@Param('id') id: string) {
    return this.reviewService.findByProduct(id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() data: UpdateReviewDto) {
    return this.reviewService.update(id, { ...data, updatedBy: req.user.id });
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.reviewService.remove(id, req.user.id);
  }
}
