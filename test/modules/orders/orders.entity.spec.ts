import { Order } from '../../../src/orders/entities/order.entity';

describe('Order Entity', () => {
  it('should be defined', () => {
    const order = new Order();
    expect(order).toBeDefined();
  });

  it('should create an instance of Order', () => {
    const order = new Order();
    expect(order).toBeInstanceOf(Order);
  });
});
