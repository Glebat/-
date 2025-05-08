import { User } from '../../../src/users/entities/user.entity';

describe('User Entity', () => {
  it('should be defined', () => {
    const user = new User();
    expect(user).toBeDefined();
  });

  it('should create an instance of User', () => {
    const user = new User();
    expect(user).toBeInstanceOf(User);
  });
});
