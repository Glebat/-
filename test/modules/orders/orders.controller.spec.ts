import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../../src/orders/orders.controller';
import { OrdersService } from '../../../src/orders/orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ordersService.create', async () => {
      const mockInput = {
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500 as any, // Используем any для total_amount
        status: 'Shipped',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockInput);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('findAll', () => {
    it('should call ordersService.findAll', async () => {
      const mockOrders = [
        {
          order_id: 1,
          user_id: 1,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '123 Main St',
          total_amount: 3500 as any, // Используем any для total_amount
          status: 'Shipped',
        },
        {
          order_id: 2,
          user_id: 2,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '456 Elm St',
          total_amount: 4000 as any, // Используем any для total_amount
          status: 'Processing',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });

  describe('findOne', () => {
    it('should call ordersService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 order';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call ordersService.update', async () => {
      const mockId = '1';
      const mockInput = {
        delivery_address: '789 Oak St',
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue('This action updates a #1 order');

      const result = await controller.update(mockId, mockInput);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockInput);
      expect(result).toBe('This action updates a #1 order');
    });
  });

  describe('remove', () => {
    it('should call ordersService.remove', async () => {
      const mockId = '1';

      jest
        .spyOn(service, 'remove')
        .mockReturnValue('This action removes a #1 order');

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe('This action removes a #1 order');
    });
  });
});
