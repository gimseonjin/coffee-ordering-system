import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { DbClient } from '../database/db.client';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;
  let dbClient: DbClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserRepository],
    }).compile();

    dbClient = module.get<DbClient>(DbClient);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    await dbClient.user.deleteMany({});
  });

  it('should return null if user is not exists', async () => {
    const user = await repository.findBy({ userId: 'notExists' });
    expect(user).toBe(null);
  });

  it('should return the correct user', async () => {
    await dbClient.user.create({
      data: {
        userId: 'userId',
        point: 100,
      },
    });

    const user = await repository.findBy({ userId: 'userId' });

    expect(user).toMatchObject({
      userId: 'userId',
      point: 100,
    });
  });

  it('should increase user point', async () => {
    await dbClient.user.create({
      data: {
        userId: 'userId',
        point: 100,
      },
    });

    const user = await repository.increasePoints({
      userId: 'userId',
      point: 100,
    });

    expect(user.point).toBe(200);
  });
});
