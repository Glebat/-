import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Order ID (auto-generated)', required: false })
  id?: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Order Date',
    example: '2024-01-20T10:00:00.000Z',
  })
  @IsDate()
  order_date: Date;

  @ApiProperty({
    description: 'Delivery Date',
    example: '2024-01-22T14:00:00.000Z',
  })
  @IsDate()
  delivery_date: Date;

  @ApiProperty({ description: 'Delivery Address', example: '123 Main St' })
  @IsString()
  delivery_address: string;

  @ApiProperty({ description: 'Total Amount', example: 3500 })
  @IsInt()
  total_amount: number;

  @ApiProperty({
    description: 'Order Status',
    example: 'Shipped',
    required: false,
  })
  @IsOptional()
  @IsString()
  status: string;
}
