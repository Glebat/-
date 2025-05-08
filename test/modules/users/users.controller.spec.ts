import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create', async () => {
      const mockInput = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+15551234567',
        password: 'securePassword123',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockInput);

      const result = await controller.create(mockInput);

      expect(service.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockInput);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', async () => {
      const mockUsers = [
        {
          user_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone_number: '+15551234567',
          password: 'securePassword123',
        },
        {
          user_id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          phone_number: '+19876543210',
          password: 'anotherSecurePassword123',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne', async () => {
      const mockId = '1';
      const mockResult = 'This action returns a #1 user';

      jest.spyOn(service, 'findOne').mockReturnValue(mockResult);

      const result = await controller.findOne(mockId);

      expect(service.findOne).toHaveBeenCalledWith(+mockId);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call usersService.update', async () => {
      const mockId = '1';
      const mockInput = {
        first_name: 'Updated Name',
        last_name: 'Updated Last Name',
        email: 'updated.email@example.com',
        phone_number: '+19876543210',
        password: 'newSecurePassword123',
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue('This action updates a #1 user');

      const result = await controller.update(mockId, mockInput);

      expect(service.update).toHaveBeenCalledWith(+mockId, mockInput);
      expect(result).toBe('This action updates a #1 user');
    });
  });

  describe('remove', () => {
    it('should call usersService.remove', async () => {
      const mockId = '1';

      jest
        .spyOn(service, 'remove')
        .mockReturnValue('This action removes a #1 user');

      const result = await controller.remove(mockId);

      expect(service.remove).toHaveBeenCalledWith(+mockId);
      expect(result).toBe('This action removes a #1 user');
    });
  });
});
