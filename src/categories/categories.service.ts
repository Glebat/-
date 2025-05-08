import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(category: CreateCategoryDto): Promise<CreateCategoryDto> {
    const { name } = category;
    try {
      const newCategory = await this.prisma.categories.create({
        data: {
          name,
        },
      });

      return this._toCategoryDto(newCategory);
    } catch (error: any) {
      console.error('Ошибка при создании категории:', error);
      throw new Error('Не удалось создать категорию.');
    }
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
  private _toCategoryDto(category): CreateCategoryDto {
    const { name } = category;
    return { name };
  }
}
