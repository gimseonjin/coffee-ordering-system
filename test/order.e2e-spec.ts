import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/order (POST)', () => {
    const coffeOrders = [
      { userId: 'user', menuId: 1, quantity: 1 },
      { userId: 'user', menuId: 2, quantity: 2 },
    ];

    const expectResult = {
      orderId: 1,
      userId: 'user',
      orderItems: [
        { menuId: 1, quantity: 1, itemTotalPrice: 500 },
        { menuId: 2, quantity: 2, itemTotalPrice: 1000 },
      ],
      totalPrice: 2500,
      remainingPoints: 500,
    };

    return request(app.getHttpServer())
      .post('/order')
      .send(coffeOrders)
      .expect(201)
      .expect(expectResult);
  });
});
