import { Bouquet } from '../../../src/bouquets/entities/bouquet.entity';

describe('Bouquet Entity', () => {
  it('should be defined', () => {
    const bouquet = new Bouquet();
    expect(bouquet).toBeDefined();
  });

  it('should initialize with default values', () => {
    const bouquet = new Bouquet();
    expect(Object.keys(bouquet)).toEqual([]);
  });
});
