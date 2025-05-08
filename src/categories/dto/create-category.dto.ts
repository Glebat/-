import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category ID (auto-generated)', required: false })
  id?: number;

  @ApiProperty({ description: 'Category Name', example: 'For wedding' })
  @IsString()
  name: string;
}
