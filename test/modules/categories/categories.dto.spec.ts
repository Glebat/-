// test/modules/categories/create-category.dto.spec.ts
import { CreateCategoryDto } from '../../../src/categories/dto/create-category.dto';

describe('CreateCategoryDto', () => {
  it('should be defined', () => {
    expect(CreateCategoryDto).toBeDefined();
  });

  it('should create a valid DTO', () => {
    const mockInput = {
      name: 'For wedding',
    };

    const dto = new CreateCategoryDto();
    dto.name = mockInput.name;

    expect(dto.name).toBe(mockInput.name);
  });

  it('should validate the "name" field as a string', () => {
    const dto = new CreateCategoryDto();
    dto.name = 'Valid Name';

    expect(typeof dto.name).toBe('string');
  });
});
