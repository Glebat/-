import { validate } from 'class-validator';
import { CreateReviewDto } from '../../../src/reviews/dto/create-review.dto';
import { UpdateReviewDto } from '../../../src/reviews/dto/update-review.dto';

describe('Reviews DTO', () => {
  describe('CreateReviewDto', () => {
    it('should validate a valid CreateReviewDto', async () => {
      const dto = new CreateReviewDto();
      dto.user_id = 1;
      dto.comment = 'Beautiful flowers!';
      dto.review_date = new Date();
      dto.rating = 5;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
      const dto = new CreateReviewDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(3);
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        user_id: 'invalid',
        comment: 123,
        review_date: 'invalid',
        rating: 'invalid',
      };

      const dto = new CreateReviewDto();
      Object.assign(dto, invalidDto);

      const errors = await validate(dto);
      expect(errors).toHaveLength(4);
    });
  });

  describe('UpdateReviewDto', () => {
    it('should validate a valid UpdateReviewDto', async () => {
      const dto = new UpdateReviewDto();
      dto.comment = 'Updated comment';
      dto.rating = 4;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate optional fields in UpdateReviewDto', async () => {
      const dto = new UpdateReviewDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        comment: 123,
        rating: 'invalid',
      };

      const dto = new UpdateReviewDto();
      Object.assign(dto, invalidDto);

      const errors = await validate(dto);
      expect(errors).toHaveLength(2);
    });
  });
});
