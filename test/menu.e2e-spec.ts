import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DbClient } from './../src/database/db.client';
import { ValidationPipe } from '@nestjs/common';

describe('MenuController (e2e)', () => {
  let app: INestApplication;
  let dbClient: DbClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dbClient = moduleFixture.get<DbClient>(DbClient);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  beforeEach(async () => {
    await dbClient.menu.createMany({
      data: [
        { menuId: 1, name: 'latte', price: 1000 },
        { menuId: 2, name: 'americano', price: 2000 },
      ],
    });
  });

  afterEach(async () => {
    await dbClient.menu.deleteMany({});
  });

  it('/menu (GET)', () => {
    const coffeMenus = [
      { menuId: 1, name: 'latte', price: 1000 },
      { menuId: 2, name: 'americano', price: 2000 },
    ];
    return request(app.getHttpServer())
      .get('/menu')
      .query({ limit: 10 })
      .expect(200)
      .expect(coffeMenus);
  });

  it('/menu/popular (GET)', () => {
    const popularCoffeMenus = [
      { menuId: 1, totalQuantity: 500 },
      { menuId: 2, totalQuantity: 100 },
      { menuId: 3, totalQuantity: 20 },
    ];
    return request(app.getHttpServer())
      .get('/menu/popular')
      .expect(200)
      .expect(popularCoffeMenus);
  });
});
