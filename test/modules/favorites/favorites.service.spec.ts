import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from '../../../src/favorites/favorites.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('Сервис избранного', () => {
  let service: FavoritesService;
  let prismaMock: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    prismaMock = module.get(PrismaService);
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  describe('создание', () => {
    it('должен вызвать prisma.favorites.create и вернуть созданное избранное', async () => {
      const mockInput = {
        user_id: 1,
        bouquet_id: 10,
        added_date: new Date(),
      };
      const mockCreatedFavorite = {
        user_id: 1,
        bouquet_id: 10,
        added_date: mockInput.added_date,
      };

      jest
        .spyOn(prismaMock.favorites, 'create')
        .mockResolvedValue(mockCreatedFavorite);

      const result = await service.create(mockInput);

      // Игнорируем разницу в миллисекундах
      expect(prismaMock.favorites.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          user_id: mockInput.user_id,
          bouquet_id: mockInput.bouquet_id,
          added_date: expect.any(Date),
        }),
      });
      expect(result).toEqual(mockCreatedFavorite);
    });

    it('должен выбросить ошибку при сбое создания', async () => {
      const mockInput = {
        user_id: 1,
        bouquet_id: 10,
        added_date: new Date(),
      };

      // Подавляем console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest
        .spyOn(prismaMock.favorites, 'create')
        .mockRejectedValue(new Error('Ошибка базы данных'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Ошибка базы данных',
      );

      // Восстанавливаем console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe('получение всех записей', () => {
    it('должен вызвать prisma.favorites.findMany и вернуть список избранных', async () => {
      const mockFavorites = [
        {
          user_id: 1,
          bouquet_id: 10,
          added_date: new Date(),
        },
        {
          user_id: 2,
          bouquet_id: 20,
          added_date: new Date(),
        },
      ];

      jest
        .spyOn(prismaMock.favorites, 'findMany')
        .mockResolvedValue(mockFavorites);

      const result = await service.findAll();

      expect(prismaMock.favorites.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockFavorites);
    });
  });

  describe('получение одной записи', () => {
    it('должен вернуть заглушку', () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 favorite');
    });
  });

  describe('обновление', () => {
    it('должен вернуть заглушку', () => {
      const result = service.update(1, { user_id: 2 });
      expect(result).toBe('This action updates a #1 favorite');
    });
  });

  describe('удаление', () => {
    it('должен вернуть заглушку', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 favorite');
    });
  });
});