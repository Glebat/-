import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { PrismaService } from '../../../src/prisma.service';
import mockPrisma from '../../../test/utils/prisma-mock';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/users/dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prismaMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrisma(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaMock = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.users.create and return the created user', async () => {
      const mockInput = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+15551234567',
        password: 'securePassword123',
      };
      const mockCreatedUser = {
        id: 1,
        ...mockInput,
      };

      jest.spyOn(prismaMock.users, 'create').mockResolvedValue(mockCreatedUser);

      const result = await service.create(mockInput);

      expect(prismaMock.users.create).toHaveBeenCalledWith({
        data: mockInput,
      });
      expect(result).toEqual(mockInput);
    });

    it('should throw an error if creation fails', async () => {
      const mockInput = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+15551234567',
        password: 'securePassword123',
      };

      // Подавляем console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest
        .spyOn(prismaMock.users, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(mockInput)).rejects.toThrow(
        'Не удалось создать пользователя.',
      );

      // Восстанавливаем console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should call prisma.users.findMany and return the list of users', async () => {
      const mockUsers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone_number: '+15551234567',
          password: 'securePassword123',
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          phone_number: '+19876543210',
          password: 'anotherSecurePassword123',
        },
      ];

      jest.spyOn(prismaMock.users, 'findMany').mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(prismaMock.users.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.findOne(mockId);

      expect(result).toBe(`This action returns a #${mockId} user`);
    });
  });

  describe('update', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;
      const mockInput = {
        first_name: 'Updated Name',
        last_name: 'Updated Last Name',
        email: 'updated.email@example.com',
        phone_number: '+19876543210',
        password: 'newSecurePassword123',
      };

      const result = service.update(mockId, mockInput);

      expect(result).toBe(`This action updates a #${mockId} user`);
    });
  });

  describe('remove', () => {
    it('should return a placeholder message', () => {
      const mockId = 1;

      const result = service.remove(mockId);

      expect(result).toBe(`This action removes a #${mockId} user`);
    });
  });
});
