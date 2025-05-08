import { PrismaClient } from '@prisma/client';

const prismaMock = {
  bouquet: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  bouquets: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  categories: {
    findMany: jest.fn(),
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Для свадьбы',
      created_at: new Date(),
    }),
    update: jest.fn(),
    delete: jest.fn(),
  },
  favorite: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  favorites: {
    findMany: jest.fn(),
    create: jest.fn().mockRejectedValue(new Error('Ошибка базы данных')),
    update: jest.fn(),
    delete: jest.fn(),
  },
  orderItem: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  order: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  orders: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      user_id: 1,
      order_date: new Date(),
      delivery_date: new Date(),
      delivery_address: 'ул. Главная, д. 123',
      total_amount: 3500,
      status: 'Отправлено',
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: 'ул. Главная, д. 123',
        total_amount: 3500,
        status: 'Отправлено',
      },
      {
        id: 2,
        user_id: 2,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: 'ул. Дубовая, д. 456',
        total_amount: 4000,
        status: 'В обработке',
      },
    ]),
  },
  review: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  reviews: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      user_id: 1,
      comment: 'Прекрасные цветы!',
      review_date: new Date(),
      rating: 5,
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        user_id: 1,
        comment: 'Прекрасные цветы!',
        review_date: new Date(),
        rating: 5,
      },
      {
        id: 2,
        user_id: 2,
        comment: 'Отличный сервис!',
        review_date: new Date(),
        rating: 4,
      },
    ]),
  },
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  users: {
    create: jest.fn().mockResolvedValue({
      user_id: 1,
      first_name: 'Иван',
      last_name: 'Иванов',
      email: 'ivan@example.com',
      phone_number: '+79991234567',
      password: 'securePassword123',
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        user_id: 1,
        first_name: 'Иван',
        last_name: 'Иванов',
        email: 'ivan@example.com',
        phone_number: '+79991234567',
        password: 'securePassword123',
      },
      {
        user_id: 2,
        first_name: 'Мария',
        last_name: 'Петрова',
        email: 'maria@example.com',
        phone_number: '+79876543210',
        password: 'anotherSecurePassword123',
      },
    ]),
  },
  order_items: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockPrisma = (): PrismaClient => {
  return prismaMock as unknown as PrismaClient;
};

export default mockPrisma;