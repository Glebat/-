import { validate } from 'class-validator';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/users/dto/update-user.dto';

describe('Users DTO', () => {
  describe('CreateUserDto', () => {
    it('should validate a valid CreateUserDto', async () => {
      const dto = new CreateUserDto();
      dto.first_name = 'John';
      dto.last_name = 'Doe';
      dto.email = 'john.doe@example.com';
      dto.phone_number = '+15551234567';
      dto.password = 'securePassword123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
    });

    it('should fail validation for missing required fields', async () => {
      const dto = new CreateUserDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(5);
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        first_name: 123,
        last_name: 456,
        email: 'invalid-email',
        phone_number: 'invalid-phone',
        password: 'short',
      };

      const dto = new CreateUserDto();
      Object.assign(dto, invalidDto);

      const errors = await validate(dto);
      expect(errors).toHaveLength(5);
    });
  });

  describe('UpdateUserDto', () => {
    it('should validate a valid UpdateUserDto', async () => {
      const dto = new UpdateUserDto();
      dto.first_name = 'Updated Name';
      dto.last_name = 'Updated Last Name';
      dto.email = 'updated.email@example.com';
      dto.phone_number = '+19876543210';
      dto.password = 'newSecurePassword123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
    });

    it('should validate optional fields in UpdateUserDto', async () => {
      const dto = new UpdateUserDto();

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        first_name: 123,
        last_name: 456,
        email: 'invalid-email',
        phone_number: 'invalid-phone',
        password: 'short',
      };

      const dto = new UpdateUserDto();
      Object.assign(dto, invalidDto);

      const errors = await validate(dto);
      expect(errors).toHaveLength(5);
    });
  });
});