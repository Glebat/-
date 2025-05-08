import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(favorite: CreateFavoriteDto): Promise<CreateFavoriteDto> {
    const { user_id, bouquet_id } = favorite;

    const newFavorite = await this.prisma.favorites.create({
      data: {
        user_id,
        bouquet_id,
        added_date: new Date(),
      },
    });

    return this._toFavoriteDto(newFavorite);
  }

  findAll() {
    return this.prisma.favorites.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
  private _toFavoriteDto(favorite): CreateFavoriteDto {
    const { user_id, bouquet_id, added_date } = favorite;
    return { user_id, bouquet_id, added_date };
  }
}
