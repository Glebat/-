import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../../../src/reviews/reviews.controller';
import { ReviewsService } from '../../../src/reviews/reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
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

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call reviewsService.create', async () => {
      const mockInput = {
        user_id: 1,
        comment: 'Beautiful flowers!',
        review_date: new Date(),
        rating: 5,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockInput);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('findAll', () => {
    it('should call reviewsService.findAll', async () => {
      const mockReviews = [
        {
          reviews_id: 1,
          user_id: 1,
          comment: 'Beautiful flowers!',
          review_date: new Date(),
          rating: 5,
        },
        {
          reviews_id: 2,
          user_id: 2,
          comment: 'Great service!',
          review_date: new Date(),
          rating: 4,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockReviews);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockReviews);
    });
  });

  describe('findOne', () => {
    it('should call reviewsService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 review';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call reviewsService.update', async () => {
      const mockId = '1';
      const mockInput = {
        comment: 'Updated comment',
        rating: 4,
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue('This action updates a #1 review');

      const result = await controller.update(mockId, mockInput);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockInput);
      expect(result).toBe('This action updates a #1 review');
    });
  });

  describe('remove', () => {
    it('should call reviewsService.remove', async () => {
      const mockId = '1';

      jest
        .spyOn(service, 'remove')
        .mockReturnValue('This action removes a #1 review');

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe('This action removes a #1 review');
    });
  });
});
