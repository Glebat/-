import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from '../../../src/favorites/favorites.controller';
import { FavoritesService } from '../../../src/favorites/favorites.service';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
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

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call favoritesService.create', async () => {
      const mockInput = {
        user_id: 1,
        bouquet_id: 10,
        added_date: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockInput);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('findAll', () => {
    it('should call favoritesService.findAll', async () => {
      const mockFavorites = [
        {
          id: 1,
          user_id: 1,
          bouquet_id: 10,
          added_date: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          bouquet_id: 20,
          added_date: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockFavorites);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockFavorites);
    });
  });

  describe('findOne', () => {
    it('should call favoritesService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 favorite';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call favoritesService.update', async () => {
      const mockId = '1';
      const mockInput = {
        user_id: 2,
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue('This action updates a #1 favorite');

      const result = await controller.update(mockId, mockInput);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockInput);
      expect(result).toBe('This action updates a #1 favorite');
    });
  });

  describe('remove', () => {
    it('should call favoritesService.remove', async () => {
      const mockId = '1';

      jest
        .spyOn(service, 'remove')
        .mockReturnValue('This action removes a #1 favorite');

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe('This action removes a #1 favorite');
    });
  });
});
