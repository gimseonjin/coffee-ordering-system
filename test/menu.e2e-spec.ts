import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MenuController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/menu (GET)', () => {
    const coffeMenus = [
      { menuId: 1, name: 'latte', price: 1000 },
      { menuId: 2, name: 'americano', price: 2000 },
    ];
    return request(app.getHttpServer())
      .get('/menu')
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
