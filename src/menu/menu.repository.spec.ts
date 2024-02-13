import { Test, TestingModule } from '@nestjs/testing';
import { MenuRepository } from './menu.repository';
import { DatabaseModule } from '../database/database.module';
import { DbClient } from '../database/db.client';

describe('MenuRepository', () => {
  let repository: MenuRepository;
  let dbClient: DbClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [MenuRepository],
    }).compile();

    dbClient = module.get<DbClient>(DbClient);
    repository = module.get<MenuRepository>(MenuRepository);
  });

  beforeEach(async () => {
    const menus = [];
    for (let i = 1; i <= 20; i++) {
      menus.push({
        menuId: i,
        name: `coffee${i}`,
        price: 100,
      });
    }
    await dbClient.menu.createMany({ data: menus });
  });

  afterEach(async () => {
    await dbClient.menu.deleteMany({});
  });

  it('should return the first page of items correctly', async () => {
    const expects = [];
    for (let i = 1; i <= 10; i++) {
      expects.push({
        menuId: i,
        name: `coffee${i}`,
        price: 100,
      });
    }

    const menus = await repository.getCoffeMenu({ limit: 10 });
    expect(menus.length).toBe(10);
    expect(menus).toMatchObject(expects);
  });

  it('should return the correct items for a given cursor based on the limit', async () => {
    const cursor = 8;
    const expects = [];
    for (let i = cursor + 1; i <= cursor + 10; i++) {
      expects.push({
        menuId: i,
        name: `coffee${i}`,
        price: 100,
      });
    }

    const menus = await repository.getCoffeMenu({ cursor, limit: 10 });
    expect(menus.length).toBe(10);
    expect(menus).toMatchObject(expects);
  });

  it('should handle requests for pages beyond the dataset correctly', async () => {
    const cursor = 21;
    const menus = await repository.getCoffeMenu({ cursor, limit: 10 });
    expect(menus.length).toBe(0);
  });
});
