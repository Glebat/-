import { validate } from 'class-validator';
import { CreateOrderDto } from '../../../src/orders/dto/create-order.dto';
import { UpdateOrderDto } from '../../../src/orders/dto/update-order.dto';

describe('Orders DTO', () => {
  describe('CreateOrderDto', () => {
    it('should validate a valid CreateOrderDto', async () => {
      const dto = new CreateOrderDto();
      dto.user_id = 1;
      dto.order_date = new Date();
      dto.delivery_date = new Date();
      dto.delivery_address = '123 Main St';
      dto.total_amount = 3500;

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
      const dto = new CreateOrderDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(5);
    });
  });

  describe('UpdateOrderDto', () => {
    it('should validate a valid UpdateOrderDto', async () => {
      const dto = new UpdateOrderDto();
      dto.delivery_address = '789 Oak St';
      dto.total_amount = 4000;
      dto.status = 'Processing';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate optional fields in UpdateOrderDto', async () => {
      const dto = new UpdateOrderDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});
