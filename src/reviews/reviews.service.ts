import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(review: CreateReviewDto): Promise<CreateReviewDto> {
    const { user_id, comment, review_date, rating } = review;
    try {
      const newReview = await this.prisma.reviews.create({
        data: {
          user_id,
          comment,
          review_date,
          rating,
        },
      });

      return this._toReviewDto(newReview);
    } catch (error: any) {
      console.error('Ошибка при создании отзыва:', error);
      throw new Error('Не удалось создать отзыв.');
    }
  }

  findAll() {
    return this.prisma.reviews.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
  private _toReviewDto(review): CreateReviewDto {
    const { user_id, comment, review_date, rating } = review;
    return { user_id, comment, review_date, rating };
  }
}
