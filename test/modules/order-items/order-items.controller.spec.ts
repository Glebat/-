import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsController } from '../../../src/order-items/order-items.controller';
import { OrderItemsService } from '../../../src/order-items/order-items.service';

describe('OrderItemsController', () => {
  let controller: OrderItemsController;
  let service: OrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [
        {
          provide: OrderItemsService,
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

    controller = module.get<OrderItemsController>(OrderItemsController);
    service = module.get<OrderItemsService>(OrderItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call orderItemsService.create', async () => {
      const mockInput = {
        order_id: 1,
        bouquet_id: 2,
        quantity: 3,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockInput);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('findAll', () => {
    it('should call orderItemsService.findAll', async () => {
      const mockOrderItems = [
        { id: 1, order_id: 1, bouquet_id: 2, quantity: 3 },
        { id: 2, order_id: 1, bouquet_id: 3, quantity: 4 },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockOrderItems);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockOrderItems);
    });
  });

  describe('findOne', () => {
    it('should call orderItemsService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 orderItem';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call orderItemsService.update', async () => {
      const mockId = '1';
      const mockInput = {
        quantity: 5,
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue('This action updates a #1 orderItem');

      const result = await controller.update(mockId, mockInput);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockInput);
      expect(result).toBe('This action updates a #1 orderItem');
    });
  });

  describe('remove', () => {
    it('should call orderItemsService.remove', async () => {
      const mockId = '1';

      jest
        .spyOn(service, 'remove')
        .mockReturnValue('This action removes a #1 orderItem');

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe('This action removes a #1 orderItem');
    });
  });
});
