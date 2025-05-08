import { Module } from '@nestjs/common';
import { BouquetsService } from './bouquets.service';
import { BouquetsController } from './bouquets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BouquetsController],
  providers: [BouquetsService, PrismaService],
})
export class BouquetsModule {}
