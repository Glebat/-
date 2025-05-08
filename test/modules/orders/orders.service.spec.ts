import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../../src/orders/orders.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaMock = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.orders.create and return the created order', async () => {
      const mockInput = {
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'Shipped',
      };
      const mockCreatedOrder = {
        id: 1,
        ...mockInput,
      };

      jest
        .spyOn(prismaMock.orders, 'create')
        .mockResolvedValue(mockCreatedOrder);

      const result = await service.create(mockInput);

      expect(prismaMock.orders.create).toHaveBeenCalledWith({
        data: mockInput,
      });
      expect(result).toEqual(mockInput);
    });

    it('should throw an error if creation fails', async () => {
      const mockInput = {
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'Shipped',
      };

      jest
        .spyOn(prismaMock.orders, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать букет.',
      );
    });
  });

  describe('findAll', () => {
    it('should call prisma.orders.findMany and return the list of orders', async () => {
      const mockOrders = [
        {
          id: 1,
          user_id: 1,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '123 Main St',
          total_amount: 3500,
          status: 'Shipped',
        },
        {
          id: 2,
          user_id: 2,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '456 Elm St',
          total_amount: 4000,
          status: 'Processing',
        },
      ];

      jest.spyOn(prismaMock.orders, 'findMany').mockResolvedValue(mockOrders);

      const result = await service.findAll();

      expect(prismaMock.orders.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });

  describe('findOne', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.findOne(mockId);

      expect(result).toBe(`This action returns a #${mockId} order`);
    });
  });

  describe('update', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;
      const mockInput = {
        delivery_address: '789 Oak St',
      };

      const result = service.update(mockId, mockInput);

      expect(result).toBe(`This action updates a #${mockId} order`);
    });
  });

  describe('remove', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.remove(mockId);

      expect(result).toBe(`This action removes a #${mockId} order`);
    });
  });
});
