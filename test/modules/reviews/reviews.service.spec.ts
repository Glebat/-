import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../../../src/reviews/reviews.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prismaMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    prismaMock = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.reviews.create and return the created review', async () => {
      const mockInput = {
        user_id: 1,
        comment: 'Beautiful flowers!',
        review_date: new Date(),
        rating: 5,
      };
      const mockCreatedReview = {
        reviews_id: 1,
        ...mockInput,
      };

      jest
        .spyOn(prismaMock.reviews, 'create')
        .mockResolvedValue(mockCreatedReview);

      const result = await service.create(mockInput);

      expect(prismaMock.reviews.create).toHaveBeenCalledWith({
        data: mockInput,
      });
      expect(result).toEqual(mockInput);
    });

    it('should throw an error if creation fails', async () => {
      const mockInput = {
        user_id: 1,
        comment: 'Beautiful flowers!',
        review_date: new Date(),
        rating: 5,
      };

      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      jest
        .spyOn(prismaMock.reviews, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать отзыв.',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should call prisma.reviews.findMany and return the list of reviews', async () => {
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

      jest.spyOn(prismaMock.reviews, 'findMany').mockResolvedValue(mockReviews);

      const result = await service.findAll();

      expect(prismaMock.reviews.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockReviews);
    });
  });

  describe('findOne', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.findOne(mockId);

      expect(result).toBe(`This action returns a #${mockId} review`);
    });
  });

  describe('update', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;
      const mockInput = {
        comment: 'Updated comment',
        rating: 4,
      };

      const result = service.update(mockId, mockInput);

      expect(result).toBe(`This action updates a #${mockId} review`);
    });
  });

  describe('remove', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.remove(mockId);

      expect(result).toBe(`This action removes a #${mockId} review`);
    });
  });
});
