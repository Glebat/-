import { OrderItem } from '../../../src/order-items/entities/order-item.entity';

describe('OrderItem Entity', () => {
  it('should be defined', () => {
    expect(OrderItem).toBeDefined();
  });

  it('should create an instance of OrderItem', () => {
    const entity = new OrderItem();
    expect(entity).toBeInstanceOf(OrderItem);
  });
});
