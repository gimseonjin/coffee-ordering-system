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

  it('should return null when user does not exist in the database', async () => {
    const user = await repository.findBy({ userId: 'notExists' });
    expect(user).toBe(null);
  });

  it('should retrieve a user with valid userId', async () => {
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

  it("should correctly increment user's points", async () => {
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

  it('should accurately and concurrently increase user points after 10 increments', async () => {
    await dbClient.user.create({
      data: {
        userId: 'userId',
        point: 100,
      },
    });

    const pomises = [];

    for (let i = 0; i < 10; i++) {
      pomises.push(
        repository.increasePoints({
          userId: 'userId',
          point: 100,
        }),
      );
    }

    await Promise.all(pomises);

    const user = await dbClient.user.findFirst({ where: { userId: 'userId' } });

    expect(user.point).toBe(1100);
  });
});
