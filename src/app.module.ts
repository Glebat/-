import { Module } from '@nestjs/common';
import { BouquetsModule } from './bouquets/bouquets.module';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BouquetsModule,
    CategoriesModule,
    FavoritesModule,
    OrderItemsModule,
    OrdersModule,
    ReviewsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
