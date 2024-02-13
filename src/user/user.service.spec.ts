import { TestBed } from '@automock/jest';
import { UserRepository } from './user.repository';
import { NotFoundUserError, UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    repository = unitRef.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an Error if user is not exists', async () => {
    repository.findBy.mockResolvedValue(null);
    await expect(
      service.chargePoints({ userId: 'userId', point: 10 }),
    ).rejects.toThrow(NotFoundUserError);
  });
});
