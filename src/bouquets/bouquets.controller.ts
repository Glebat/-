import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BouquetsService } from './bouquets.service';
import { CreateBouquetDto } from './dto/create-bouquet.dto';
import { UpdateBouquetDto } from './dto/update-bouquet.dto';

@Controller('bouquets')
export class BouquetsController {
  constructor(private readonly bouquetsService: BouquetsService) {}

  @Post()
  create(@Body() createBouquetDto: CreateBouquetDto) {
    return this.bouquetsService.create(createBouquetDto);
  }

  @Get()
  findAll() {
    return this.bouquetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bouquetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBouquetDto: UpdateBouquetDto) {
    return this.bouquetsService.update(+id, updateBouquetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bouquetsService.remove(+id);
  }
}
