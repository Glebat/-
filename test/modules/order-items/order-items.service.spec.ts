import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsService } from '../../../src/order-items/order-items.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('OrderItemsService', () => {
  let service: OrderItemsService;
  let prismaMock: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemsService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
    prismaMock = module.get(PrismaService);
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  describe('создание', () => {
    it('должен вызвать prisma.order_items.create и вернуть созданный элемент заказа', async () => {
      const mockInput = {
        order_id: 1,
        bouquet_id: 2,
        quantity: 3,
      };
      const mockCreatedOrderItem = {
        id: 1,
        ...mockInput,
      };

      jest
        .spyOn(prismaMock.order_items, 'create')
        .mockResolvedValue(mockCreatedOrderItem);

      const result = await service.create(mockInput);

      expect(prismaMock.order_items.create).toHaveBeenCalledWith({
        data: mockInput,
      });
      expect(result).toEqual(mockInput);
    });

    it('должен выбросить ошибку при сбое создания', async () => {
      const mockInput = {
        order_id: 1,
        bouquet_id: 2,
        quantity: 3,
      };

      jest
        .spyOn(prismaMock.order_items, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать состав заказа.',
      );
    });
  });

  describe('получение всех записей', () => {
    it('должен вызвать prisma.order_items.findMany и вернуть список элементов заказа', async () => {
      const mockOrderItems = [
        { id: 1, order_id: 1, bouquet_id: 2, quantity: 3 },
        { id: 2, order_id: 1, bouquet_id: 3, quantity: 4 },
      ];

      jest
        .spyOn(prismaMock.order_items, 'findMany')
        .mockResolvedValue(mockOrderItems);

      const result = await service.findAll();

      expect(prismaMock.order_items.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockOrderItems);
    });
  });

  describe('получение одной записи', () => {
    it('должен вернуть заглушку', () => {
      const mockId = 1;

      const result = service.findOne(mockId);

      expect(result).toBe(`This action returns a #${mockId} orderItem`);
    });
  });

  describe('обновление', () => {
    it('должен вернуть заглушку', () => {
      const mockId = 1;
      const mockInput = {
        quantity: 5,
      };

      const result = service.update(mockId, mockInput);

      expect(result).toBe(`This action updates a #${mockId} orderItem`);
    });
  });

  describe('удаление', () => {
    it('должен вернуть заглушку', () => {
      const mockId = 1;

      const result = service.remove(mockId);

      expect(result).toBe(`This action removes a #${mockId} orderItem`);
    });
  });
});
