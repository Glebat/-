import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(order: CreateOrderDto): Promise<CreateOrderDto> {
    const {
      user_id,
      order_date,
      delivery_date,
      delivery_address,
      total_amount,
      status,
    } = order;
    try {
      const newOrder = await this.prisma.orders.create({
        data: {
          user_id,
          order_date,
          delivery_date,
          delivery_address,
          total_amount,
          status,
        },
      });

      return this._toOrderDto(newOrder);
    } catch (error: any) {
      console.error('Ошибка при создании букета:', error);
      throw new Error('Не удалось создать букет.');
    }
  }

  findAll() {
    return this.prisma.orders.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  private _toOrderDto(order): CreateOrderDto {
    const {
      user_id,
      order_date,
      delivery_date,
      delivery_address,
      total_amount,
      status,
    } = order;
    return {
      user_id,
      order_date,
      delivery_date,
      delivery_address,
      total_amount,
      status,
    };
  }
}
