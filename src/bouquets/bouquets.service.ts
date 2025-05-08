import { Injectable } from '@nestjs/common';
import { CreateBouquetDto } from './dto/create-bouquet.dto';
import { UpdateBouquetDto } from './dto/update-bouquet.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class BouquetsService {
  constructor(private prisma: PrismaService) {}

  async create(bouquet: CreateBouquetDto): Promise<CreateBouquetDto> {
    const { name, description, price, image_url, category_id } = bouquet;
    try {
      const newBouquet = await this.prisma.bouquets.create({
        data: {
          name,
          description,
          price,
          image_url,
          created_at: new Date(),
          category_id,
        },
      });

      return this._toBouquetDto(newBouquet);
    } catch (error: any) {
      console.error('Ошибка при создании букета:', error);
      throw new Error('Не удалось создать букет.');
    }
  }

  findAll() {
    return this.prisma.bouquets.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} bouquet`;
  }

  update(id: number, updateBouquetDto: UpdateBouquetDto) {
    return `This action updates a #${id} bouquet`;
  }

  remove(id: number) {
    return `This action removes a #${id} bouquet`;
  }
  private _toBouquetDto(bouquet): CreateBouquetDto {
    const { name, description, price, image_url, category_id } = bouquet;
    return { name, description, price, image_url, category_id };
  }
}
