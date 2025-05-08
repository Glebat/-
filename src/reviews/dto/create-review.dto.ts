import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Review ID (auto-generated)', required: false })
  id?: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Comment', example: 'Beautiful flowers!' })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Review Date',
    example: '2024-01-20T10:00:00.000Z',
  })
  @IsDate()
  review_date: Date;

  @ApiProperty({
    description: 'Rating of the Flowers (1-5)',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
