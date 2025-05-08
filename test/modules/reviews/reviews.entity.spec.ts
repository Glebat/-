import { Review } from '../../../src/reviews/entities/review.entity';

describe('Review Entity', () => {
  it('should be defined', () => {
    const review = new Review();
    expect(review).toBeDefined();
  });

  it('should create an instance of Review', () => {
    const review = new Review();
    expect(review).toBeInstanceOf(Review);
  });
});
