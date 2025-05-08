import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber()
  order_id: number;

  @ApiProperty({ description: 'Bouquet ID', example: 2 })
  @IsNumber()
  bouquet_id: number;

  @ApiProperty({ description: 'Quantity', example: 3 })
  @IsNumber()
  quantity: number;
}
