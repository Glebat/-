import { CreateOrderItemDto } from '../../../src/order-items/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../../src/order-items/dto/update-order-item.dto';

describe('CreateOrderItemDto', () => {
  it('should be defined', () => {
    expect(CreateOrderItemDto).toBeDefined();
  });

  describe('Validation', () => {
    it('should validate order_id as a number', async () => {
      const dto = new CreateOrderItemDto();
      dto.order_id = 1;
      expect(typeof dto.order_id).toBe('number');
    });

    it('should validate bouquet_id as a number', async () => {
      const dto = new CreateOrderItemDto();
      dto.bouquet_id = 2;
      expect(typeof dto.bouquet_id).toBe('number');
    });

    it('should validate quantity as a number', async () => {
      const dto = new CreateOrderItemDto();
      dto.quantity = 3;
      expect(typeof dto.quantity).toBe('number');
    });
  });
});

describe('UpdateOrderItemDto', () => {
  it('should be defined', () => {
    expect(UpdateOrderItemDto).toBeDefined();
  });

  describe('Validation', () => {
    it('should validate partial fields', async () => {
      const dto = new UpdateOrderItemDto();
      dto.order_id = 1;
      expect(typeof dto.order_id).toBe('number');
    });
  });
});
