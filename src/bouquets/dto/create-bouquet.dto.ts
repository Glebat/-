import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateBouquetDto {
  @ApiProperty({ description: 'Bouquet ID (auto-generated)', required: false })
  id?: number;

  @ApiProperty({ description: 'Bouquet Name', example: 'Red Roses' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Bouquet Description',
    example: 'A beautiful arrangement of red roses.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Bouquet Price', example: 3500 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/red_roses.jpg',
  })
  @IsNotEmpty()
  @IsString()
  image_url: string;

  @ApiProperty({
    description: 'Time when bouquet was added',
    example: '2024-10-23T15:23:45.678Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiProperty({ description: 'Category ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
