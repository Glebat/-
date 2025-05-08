import { Test, TestingModule } from '@nestjs/testing';
import { BouquetsController } from '../../../src/bouquets/bouquets.controller';
import { BouquetsService } from '../../../src/bouquets/bouquets.service';

describe('BouquetsController', () => {
  let controller: BouquetsController;
  let service: BouquetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BouquetsController],
      providers: [
        {
          provide: BouquetsService,
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

    controller = module.get<BouquetsController>(BouquetsController);
    service = module.get<BouquetsService>(BouquetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call bouquetsService.create', async () => {
      const mockInput = {
        name: 'Red Roses',
        description: 'A beautiful arrangement of red roses.',
        price: 3500,
        image_url: 'https://example.com/red_roses.jpg',
        category_id: 1,
      };
      const mockResult = { id: 1, ...mockInput, created_at: new Date() };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call bouquetsService.findAll', async () => {
      const mockBouquets = [
        {
          id: 1,
          name: 'Red Roses',
          description: 'Beautiful',
          price: 3500,
          image_url: 'url1',
          category_id: 1,
          created_at: new Date(),
          bouquet_id: 1,
        },
        {
          id: 2,
          name: 'White Lilies',
          description: 'Elegant',
          price: 4000,
          image_url: 'url2',
          category_id: 2,
          created_at: new Date(),
          bouquet_id: 2,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockBouquets);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockBouquets);
    });
  });

  describe('findOne', () => {
    it('should call bouquetsService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 bouquet';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call bouquetsService.update', async () => {
      const mockId = '1';
      const mockData = { name: 'Updated Bouquet' };
      const mockResult = 'This action updates a #1 bouquet';

      jest.spyOn(service, 'update').mockReturnValue(mockResult);

      const result = await controller.update(mockId, mockData);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockData);
      expect(result).toBe(mockResult);
    });
  });

  describe('remove', () => {
    it('should call bouquetsService.remove', async () => {
      const mockId = '1';
      const mockResult = 'This action removes a #1 bouquet';

      jest.spyOn(service, 'remove').mockReturnValue(mockResult);

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });
});
