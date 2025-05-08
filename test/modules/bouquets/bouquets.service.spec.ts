import { Test, TestingModule } from '@nestjs/testing';
import { BouquetsService } from '../../../src/bouquets/bouquets.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('BouquetsService', () => {
  let service: BouquetsService;
  let prismaMock: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BouquetsService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<BouquetsService>(BouquetsService);
    prismaMock = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.bouquets.create and return the created bouquet', async () => {
      const mockInput = {
        name: 'Red Roses',
        description: 'A beautiful arrangement of red roses.',
        price: 3500,
        image_url: 'https://example.com/red_roses.jpg   ',
        category_id: 1,
      };
      const mockCreatedBouquet = {
        id: 1,
        ...mockInput,
        created_at: new Date(),
      };

      jest
        .spyOn(prismaMock.bouquets, 'create')
        .mockResolvedValue(mockCreatedBouquet);

      const result = await service.create(mockInput);

      expect(prismaMock.bouquets.create).toHaveBeenCalledWith({
        data: {
          ...mockInput,
          created_at: expect.any(Date),
        },
      });
      expect(result).toEqual({
        name: mockInput.name,
        description: mockInput.description,
        price: mockInput.price,
        image_url: mockInput.image_url,
        category_id: mockInput.category_id,
      });
    });

    it('should throw an error if creation fails', async () => {
      const mockInput = {
        name: 'Red Roses',
        description: 'A beautiful arrangement of red roses.',
        price: 3500,
        image_url: 'https://example.com/red_roses.jpg   ',
        category_id: 1,
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest
        .spyOn(prismaMock.bouquets, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать букет.',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should call prisma.bouquets.findMany and return the list of bouquets', async () => {
      const mockBouquets = [
        {
          id: 1,
          name: 'Red Roses',
          description: 'Beautiful',
          price: 3500,
          image_url: 'url1',
          category_id: 1,
        },
        {
          id: 2,
          name: 'White Lilies',
          description: 'Elegant',
          price: 4000,
          image_url: 'url2',
          category_id: 2,
        },
      ];

      jest
        .spyOn(prismaMock.bouquets, 'findMany')
        .mockResolvedValue(mockBouquets);

      const result = await service.findAll();

      expect(prismaMock.bouquets.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockBouquets);
    });
  });

  describe('findOne', () => {
    it('should return a placeholder message', () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 bouquet');
    });
  });

  describe('update', () => {
    it('should return a placeholder message', () => {
      const result = service.update(1, {});
      expect(result).toBe('This action updates a #1 bouquet');
    });
  });

  describe('remove', () => {
    it('should return a placeholder message', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 bouquet');
    });
  });
});