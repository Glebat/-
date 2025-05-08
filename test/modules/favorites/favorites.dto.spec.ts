import { validate } from 'class-validator';
import { CreateFavoriteDto } from '../../../src/favorites/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../../../src/favorites/dto/update-favorite.dto';

describe('Favorites DTO', () => {
  describe('CreateFavoriteDto', () => {
    it('should validate CreateFavoriteDto', async () => {
      const dto = new CreateFavoriteDto();
      dto.user_id = 1;
      dto.bouquet_id = 10;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation if user_id is missing', async () => {
      const dto = new CreateFavoriteDto();
      dto.bouquet_id = 10;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isNumber');
    });

    it('should fail validation if bouquet_id is missing', async () => {
      const dto = new CreateFavoriteDto();
      dto.user_id = 1;

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isNumber');
    });
  });

  describe('UpdateFavoriteDto', () => {
    it('should validate UpdateFavoriteDto', async () => {
      const dto = new UpdateFavoriteDto();
      dto.user_id = 1;
      dto.bouquet_id = 10;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should allow partial updates', async () => {
      const dto = new UpdateFavoriteDto();
      dto.user_id = 1;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});
