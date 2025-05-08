import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const { first_name, last_name, email, phone_number, password } = user;
    try {
      const newUser = await this.prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          password,
        },
      });

      return this._toUserDto(newUser);
    } catch (error: any) {
      console.error('Ошибка при создании пользователя:', error);
      throw new Error('Не удалось создать пользователя.');
    }
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private _toUserDto(user): CreateUserDto {
    const { first_name, last_name, email, phone_number, password } = user;
    return { first_name, last_name, email, phone_number, password };
  }
}
