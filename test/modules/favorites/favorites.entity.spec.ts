import { Favorite } from '../../../src/favorites/entities/favorite.entity';

describe('Favorite Entity', () => {
  it('should be defined', () => {
    expect(Favorite).toBeDefined();
  });

  it('should create a new instance', () => {
    const favorite = new Favorite();
    expect(favorite).toBeInstanceOf(Favorite);
  });
});
