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
      expect(errors).toHaveLength(5); // first_name, last_name, email, phone_number, password
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        first_name: 123, // Неверный тип (ожидается строка)
        last_name: 456, // Неверный тип (ожидается строка)
        email: 'invalid-email', // Неверный формат email
        phone_number: 'invalid-phone', // Неверный формат телефона
        password: 'short', // Пароль слишком короткий (< 6 символов)
      };

      const dto = new CreateUserDto();
      Object.assign(dto, invalidDto); // Присваиваем некорректные значения

      const errors = await validate(dto);
      expect(errors).toHaveLength(5); // Ожидаем 5 ошибок (по количеству невалидных полей)
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
      expect(errors).toHaveLength(0); // Все поля опциональны
    });

    it('should fail validation for invalid types', async () => {
      const invalidDto = {
        first_name: 123, // Неверный тип (ожидается строка)
        last_name: 456, // Неверный тип (ожидается строка)
        email: 'invalid-email', // Неверный формат email
        phone_number: 'invalid-phone', // Неверный формат телефона
        password: 'short', // Пароль слишком короткий (< 6 символов)
      };

      const dto = new UpdateUserDto();
      Object.assign(dto, invalidDto); // Присваиваем некорректные значения

      const errors = await validate(dto);
      expect(errors).toHaveLength(5); // Ожидаем 5 ошибок (по количеству невалидных полей)
    });
  });
});