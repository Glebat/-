import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}
  async create(order_item: CreateOrderItemDto): Promise<CreateOrderItemDto> {
    const { order_id, bouquet_id, quantity } = order_item;
    try {
      const newOrderItem = await this.prisma.order_items.create({
        data: {
          order_id,
          bouquet_id,
          quantity,
        },
      });

      return this._toOrderItemDto(newOrderItem);
    } catch (error: any) {
      console.error('Ошибка при создании состава заказа:', error);
      throw new Error('Не удалось создать состав заказа.');
    }
  }

  findAll() {
    return this.prisma.order_items.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
  private _toOrderItemDto(order_item): CreateOrderItemDto {
    const { order_id, bouquet_id, quantity } = order_item;
    return { order_id, bouquet_id, quantity };
  }
}
