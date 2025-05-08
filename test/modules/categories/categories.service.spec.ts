import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/categories/categories.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaMock: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaMock = module.get(PrismaService);
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('должен вызвать prisma.categories.create и вернуть созданную категорию', async () => {
      const mockInput = {
        name: 'Для свадьбы',
      };
      const mockCreatedCategory = {
        id: 1,
        ...mockInput,
        created_at: new Date(),
      };

      jest
        .spyOn(prismaMock.categories, 'create')
        .mockResolvedValue(mockCreatedCategory);

      const result = await service.create(mockInput);

      expect(prismaMock.categories.create).toHaveBeenCalledWith({
        data: mockInput,
      });
      expect(result).toEqual({
        name: mockInput.name,
      });
    });

    it('должен выбросить ошибку при сбое создания', async () => {
      const mockInput = {
        name: 'Для свадьбы',
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest
        .spyOn(prismaMock.categories, 'create')
        .mockRejectedValue(new Error('Ошибка базы данных'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать категорию.',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('должен вызвать prisma.categories.findMany и вернуть список категорий', async () => {
      const mockCategories = [
        {
          id: 1,
          name: 'Для свадьбы',
          created_at: new Date(),
        },
        {
          id: 2,
          name: 'Для дня рождения',
          created_at: new Date(),
        },
      ];

      jest
        .spyOn(prismaMock.categories, 'findMany')
        .mockResolvedValue(mockCategories);

      const result = await service.findAll();

      expect(prismaMock.categories.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });
});