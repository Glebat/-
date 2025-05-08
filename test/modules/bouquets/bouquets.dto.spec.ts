import { CreateBouquetDto } from '../../../src/bouquets/dto/create-bouquet.dto';
import { UpdateBouquetDto } from '../../../src/bouquets/dto/update-bouquet.dto';

describe('CreateBouquetDto', () => {
  it('should validate required fields', () => {
    const dto = new CreateBouquetDto();
    dto.name = 'Red Roses';
    dto.description = 'A beautiful arrangement of red roses.';
    dto.price = 3500;
    dto.image_url = 'https://example.com/red_roses.jpg';
    dto.category_id = 1;

    expect(dto.name).toBe('Red Roses');
    expect(dto.description).toBe('A beautiful arrangement of red roses.');
    expect(dto.price).toBe(3500);
    expect(dto.image_url).toBe('https://example.com/red_roses.jpg');
    expect(dto.category_id).toBe(1);
  });
});

describe('UpdateBouquetDto', () => {
  it('should allow partial updates', () => {
    const dto = new UpdateBouquetDto();
    dto.name = 'Updated Bouquet Name';
    dto.price = 4000;

    expect(dto.name).toBe('Updated Bouquet Name');
    expect(dto.price).toBe(4000);
    expect(dto.description).toBeUndefined();
  });
});
