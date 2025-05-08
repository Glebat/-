import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../../src/categories/categories.controller';
import { CategoriesService } from '../../../src/categories/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
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

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call categoriesService.create', async () => {
      const mockInput = {
        name: 'For wedding',
      };
      const mockResult = { id: 1, ...mockInput, created_at: new Date() };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call categoriesService.findAll', async () => {
      const mockCategories = [
        {
          id: 1,
          name: 'For wedding',
          created_at: new Date(),
          categories_id: 1,
        },
        {
          id: 2,
          name: 'For birthday',
          created_at: new Date(),
          categories_id: 2,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockCategories);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });
});
