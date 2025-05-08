// test/modules/categories/categories.entity.spec.ts
import { Category } from '../../../src/categories/entities/category.entity';

describe('CategoryEntity', () => {
  it('should be defined', () => {
    expect(Category).toBeDefined();
  });

  it('should create an instance of Category', () => {
    const category = new Category();
    expect(category).toBeInstanceOf(Category);
  });
});
